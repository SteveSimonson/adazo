/**
 * R2 media: public GET/HEAD under /media/* + HMAC-signed PUT for Imagine ZDR.
 *
 * Imagine image_to_video (Zero Data Retention) needs output.upload_url — a public
 * HTTPS URL that accepts a PUT of the finished MP4. Mint one via:
 *   POST /api/media/upload-url  Authorization: Bearer $MEDIA_UPLOAD_SECRET
 * then pass the returned upload_url to image_to_video. The finished file is
 * readable at public_url (/media/...).
 */

export type MediaEnv = {
  MEDIA: R2Bucket
  MEDIA_UPLOAD_SECRET?: string
}

const MEDIA_PREFIX = '/media/'
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024 // 100 MB (Imagine clips are tiny)
const DEFAULT_TTL_SECONDS = 3600
const MAX_TTL_SECONDS = 6 * 3600

const CORS_GET = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range',
  'Access-Control-Expose-Headers':
    'Content-Range, Accept-Ranges, Content-Length, ETag',
}

const CORS_PUT = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Content-Length',
  'Access-Control-Max-Age': '86400',
}

function mediaHeaders(object: R2Object): Headers {
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('accept-ranges', 'bytes')
  headers.set('cache-control', 'public, max-age=86400')
  for (const [k, v] of Object.entries(CORS_GET)) headers.set(k, v)
  return headers
}

function parseRange(value: string, size: number) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value)
  if (!match) return null

  const rawStart = match[1]
  const rawEnd = match[2]
  if (!rawStart && !rawEnd) return null

  let start: number
  let end: number

  if (!rawStart) {
    const suffixLength = Number(rawEnd)
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) return null
    start = Math.max(0, size - suffixLength)
    end = size - 1
  } else {
    start = Number(rawStart)
    end = rawEnd ? Number(rawEnd) : size - 1
  }

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return null
  }

  return { start, end: Math.min(end, size - 1) }
}

/** Safe object keys: video/… or image/… with simple path segments. */
export function isSafeMediaKey(key: string): boolean {
  if (!key || key.includes('..') || key.startsWith('/') || key.includes('//')) {
    return false
  }
  return /^(video|image)\/[A-Za-z0-9._/-]+$/.test(key) && !key.endsWith('/')
}

function keyFromPath(pathname: string): string | null {
  if (!pathname.startsWith(MEDIA_PREFIX)) return null
  let key: string
  try {
    key = decodeURIComponent(pathname.slice(MEDIA_PREFIX.length))
  } catch {
    return null
  }
  return isSafeMediaKey(key) ? key : null
}

function guessContentType(key: string, fallback?: string | null): string {
  const lower = key.toLowerCase()
  if (lower.endsWith('.mp4')) return 'video/mp4'
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.mov')) return 'video/quicktime'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (fallback && fallback !== 'application/octet-stream') return fallback
  return 'application/octet-stream'
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let out = 0
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return out === 0
}

function randomId(bytes = 12): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return [...arr].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function publicOrigin(request: Request): string {
  const host = new URL(request.url).hostname.toLowerCase()
  if (host === 'adazo.com' || host === 'www.adazo.com') return 'https://adazo.com'
  return new URL(request.url).origin
}

/** GET/HEAD/OPTIONS /media/* — stream objects from R2 with Range support. */
export async function serveMedia(
  request: Request,
  env: MediaEnv,
): Promise<Response | null> {
  const url = new URL(request.url)
  if (!url.pathname.startsWith(MEDIA_PREFIX)) return null

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { ...CORS_GET, 'Access-Control-Max-Age': '86400' },
    })
  }

  const key = keyFromPath(url.pathname)
  if (!key) return new Response('Not found', { status: 404 })

  const metadata = await env.MEDIA.head(key)
  if (!metadata) return new Response('Not found', { status: 404 })

  const headers = mediaHeaders(metadata)
  if (request.method === 'HEAD') {
    headers.set('content-length', String(metadata.size))
    return new Response(null, { status: 200, headers })
  }

  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  const rangeHeader = request.headers.get('range')
  if (rangeHeader) {
    const range = parseRange(rangeHeader, metadata.size)
    if (!range) {
      headers.set('content-range', `bytes */${metadata.size}`)
      return new Response(null, { status: 416, headers })
    }

    const length = range.end - range.start + 1
    const object = await env.MEDIA.get(key, {
      range: { offset: range.start, length },
    })
    if (!object) return new Response('Not found', { status: 404 })

    headers.set(
      'content-range',
      `bytes ${range.start}-${range.end}/${metadata.size}`,
    )
    headers.set('content-length', String(length))
    return new Response(object.body, { status: 206, headers })
  }

  const object = await env.MEDIA.get(key)
  if (!object) return new Response('Not found', { status: 404 })
  headers.set('content-length', String(metadata.size))
  return new Response(object.body, { status: 200, headers })
}

type UploadUrlBody = {
  key?: string
  /** video (default) | image */
  kind?: string
  contentType?: string
  /** seconds until the PUT URL expires (default 3600, max 21600) */
  ttlSeconds?: number
  /** optional filename stem used when key is auto-generated */
  name?: string
}

/**
 * POST /api/media/upload-url
 * Authorization: Bearer $MEDIA_UPLOAD_SECRET
 *
 * Returns { upload_url, public_url, key, expires_at } for Imagine ZDR.
 */
export async function handleUploadUrl(
  request: Request,
  env: MediaEnv,
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405)
  }

  const secret = env.MEDIA_UPLOAD_SECRET
  if (!secret) {
    return json(
      { ok: false, error: 'MEDIA_UPLOAD_SECRET is not configured' },
      503,
    )
  }

  const auth = request.headers.get('Authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  // Length-equalize before XOR so short/long tokens don't short-circuit on length alone.
  const a = token.padEnd(secret.length, '\0')
  const b = secret.padEnd(token.length, '\0')
  let tokenOk = token.length === secret.length ? 0 : 1
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    tokenOk |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  if (!token || tokenOk !== 0) {
    return json({ ok: false, error: 'Unauthorized' }, 401)
  }

  let body: UploadUrlBody = {}
  try {
    const text = await request.text()
    if (text) body = JSON.parse(text) as UploadUrlBody
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400)
  }

  const kind =
    body.kind === 'image' || body.kind === 'video'
      ? body.kind
      : body.key?.startsWith('image/')
        ? 'image'
        : 'video'

  let key = (body.key || '').trim().replace(/^\/+/, '')
  if (!key) {
    const stem = (body.name || randomId())
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 64)
    const ext = kind === 'image' ? 'jpg' : 'mp4'
    const day = new Date().toISOString().slice(0, 10)
    key = `${kind}/${day}/${stem}.${ext}`
  }

  if (!isSafeMediaKey(key)) {
    return json(
      {
        ok: false,
        error:
          'Invalid key. Use video/… or image/… with [A-Za-z0-9._/-] only.',
      },
      400,
    )
  }

  let ttl = Number(body.ttlSeconds ?? DEFAULT_TTL_SECONDS)
  if (!Number.isFinite(ttl) || ttl < 60) ttl = DEFAULT_TTL_SECONDS
  if (ttl > MAX_TTL_SECONDS) ttl = MAX_TTL_SECONDS

  const exp = Math.floor(Date.now() / 1000) + Math.floor(ttl)
  const contentType =
    (body.contentType || '').trim() ||
    guessContentType(key, kind === 'image' ? 'image/jpeg' : 'video/mp4')

  const payload = `PUT\n${key}\n${exp}\n${contentType}`
  const sig = await hmacHex(secret, payload)

  const origin = publicOrigin(request)
  const upload = new URL(`${origin}/api/media/put`)
  upload.searchParams.set('key', key)
  upload.searchParams.set('exp', String(exp))
  upload.searchParams.set('ct', contentType)
  upload.searchParams.set('sig', sig)

  return json({
    ok: true,
    upload_url: upload.toString(),
    public_url: `${origin}/media/${key}`,
    key,
    content_type: contentType,
    expires_at: new Date(exp * 1000).toISOString(),
    expires_in: Math.floor(ttl),
  })
}

/**
 * PUT /api/media/put?key=&exp=&ct=&sig=
 * Body: raw bytes (video/mp4 for Imagine).
 */
export async function handleMediaPut(
  request: Request,
  env: MediaEnv,
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_PUT })
  }

  if (request.method !== 'PUT') {
    return json({ ok: false, error: 'Method not allowed' }, 405)
  }

  const secret = env.MEDIA_UPLOAD_SECRET
  if (!secret) {
    return json(
      { ok: false, error: 'MEDIA_UPLOAD_SECRET is not configured' },
      503,
    )
  }

  const url = new URL(request.url)
  const key = url.searchParams.get('key') || ''
  const expRaw = url.searchParams.get('exp') || ''
  const ct = url.searchParams.get('ct') || 'application/octet-stream'
  const sig = url.searchParams.get('sig') || ''

  if (!isSafeMediaKey(key)) {
    return json({ ok: false, error: 'Invalid key' }, 400)
  }

  const exp = Number(expRaw)
  if (!Number.isInteger(exp) || exp < Math.floor(Date.now() / 1000)) {
    return json({ ok: false, error: 'Upload URL expired' }, 403)
  }

  const expected = await hmacHex(secret, `PUT\n${key}\n${exp}\n${ct}`)
  if (!sig || !timingSafeEqualHex(sig, expected)) {
    return json({ ok: false, error: 'Invalid signature' }, 403)
  }

  const contentLength = Number(request.headers.get('content-length') || '0')
  if (contentLength > MAX_UPLOAD_BYTES) {
    return json({ ok: false, error: 'Payload too large' }, 413)
  }

  if (!request.body) {
    return json({ ok: false, error: 'Empty body' }, 400)
  }

  // Prefer client Content-Type when present; fall back to signed ct.
  const headerCt = request.headers.get('content-type')
  const contentType = guessContentType(key, headerCt || ct)

  try {
    const object = await env.MEDIA.put(key, request.body, {
      httpMetadata: {
        contentType,
        cacheControl: 'public, max-age=86400',
      },
      customMetadata: {
        uploadedVia: 'imagine-upload-url',
        uploadedAt: new Date().toISOString(),
      },
    })

    const origin = publicOrigin(request)
    return json({
      ok: true,
      key: object.key,
      etag: object.httpEtag,
      size: object.size,
      public_url: `${origin}/media/${object.key}`,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed'
    return json({ ok: false, error: msg }, 500)
  }
}
