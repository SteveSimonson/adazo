# Imagine videos via R2 (ZDR `upload_url`)

xAI Imagine **`image_to_video`** (and related video tools) run under **Zero Data Retention** in this environment. That requires a public HTTPS **`output.upload_url`** that accepts a **PUT** of the finished MP4. Adazo stores those bytes in the **`adazo-media`** R2 bucket and serves them at **`/media/*`**.

## Pieces

| Piece | Detail |
|-------|--------|
| R2 bucket | `adazo-media` |
| Worker binding | `MEDIA` (`wrangler.jsonc` → `r2_buckets`) |
| Mint upload URL | `POST https://adazo.com/api/media/upload-url` |
| Upload target | signed `PUT https://adazo.com/api/media/put?…` |
| Public read | `GET https://adazo.com/media/{key}` (Range supported) |
| Auth secret | `MEDIA_UPLOAD_SECRET` (Worker secret) |

Keys must match: `video/…` or `image/…` with `[A-Za-z0-9._/-]` only.

## One-time setup

```bash
# Bucket (once)
npx wrangler r2 bucket create adazo-media

# Secret used as Bearer when minting upload URLs
openssl rand -hex 32 | npx wrangler secret put MEDIA_UPLOAD_SECRET
```

Local dev: put the same value in `.dev.vars` (never commit):

```
MEDIA_UPLOAD_SECRET=…
```

## Mint an upload URL

```bash
export MEDIA_UPLOAD_SECRET='…'   # same as wrangler secret

curl -sS -X POST 'https://adazo.com/api/media/upload-url' \
  -H "Authorization: Bearer $MEDIA_UPLOAD_SECRET" \
  -H 'Content-Type: application/json' \
  -d '{
    "kind": "video",
    "name": "luxe-carpet-premiere",
    "contentType": "video/mp4",
    "ttlSeconds": 3600
  }'
```

Response:

```json
{
  "ok": true,
  "upload_url": "https://adazo.com/api/media/put?key=video%2F…&exp=…&ct=video%2Fmp4&sig=…",
  "public_url": "https://adazo.com/media/video/2026-07-28/luxe-carpet-premiere.mp4",
  "key": "video/2026-07-28/luxe-carpet-premiere.mp4",
  "content_type": "video/mp4",
  "expires_at": "2026-07-28T…",
  "expires_in": 3600
}
```

Optional body fields:

- `key` — full object key (must start with `video/` or `image/`)
- `kind` — `video` (default) or `image` when auto-naming
- `name` — stem for auto key (`video/YYYY-MM-DD/{name}.mp4`)
- `contentType` — signed content type (default `video/mp4` / `image/jpeg`)
- `ttlSeconds` — 60–21600 (default 3600)

## Full generative video (required path)

The Grok Build agent tool `image_to_video` does **not** currently expose `upload_url`.
On ZDR teams the API rejects the call without it. Use the Adazo helper instead — it
mints R2 dynamically and calls the xAI Video API:

```bash
# One clip
python3 scripts/imagine-video.py \
  --image 'https://adazo.com/brand/videos/reels/posters/handbags.jpg' \
  --name handbags-reel \
  --prompt 'Slow gentle camera push-in, soft fabric motion' \
  --out public/brand/videos/reels/handbags.mp4 \
  --duration 6 --resolution 720p --aspect-ratio 3:4

# All category product reels
python3 scripts/generate-category-reels.py
# optional: only some cats
python3 scripts/generate-category-reels.py handbags jewelry
```

Auth:

- `MEDIA_UPLOAD_SECRET` — from `.dev.vars` or env (same as Worker secret)
- `XAI_API_KEY` **or** logged-in Grok Build (`~/.grok/auth.json` OIDC token)

What the script sends to xAI:

```json
{
  "model": "grok-imagine-video",
  "prompt": "…",
  "image": { "url": "https://…" },
  "duration": 6,
  "resolution": "720p",
  "output": { "upload_url": "https://adazo.com/api/media/put?…" }
}
```

xAI PUTs the finished MP4 to our Worker → R2. We then download `public_url` into
`public/brand/videos/…` for static deploy.

### Manual smoke test (no Imagine)

```bash
# After minting JSON into $UPLOAD_URL / $PUBLIC_URL
curl -sS -X PUT "$UPLOAD_URL" \
  -H 'Content-Type: video/mp4' \
  --data-binary @./clip.mp4

curl -sI "$PUBLIC_URL"   # expect 200, video/mp4
```

## Agent / session checklist

When generating Adazo campaign video later:

1. Ensure deploy is live with `MEDIA` + `MEDIA_UPLOAD_SECRET`.
2. Mint a key under `video/campaigns/…` or `video/carpet/…`.
3. Pass that `upload_url` into Imagine so ZDR succeeds.
4. Verify `public_url` with Range (video seeking).
5. Prefer copying into `public/brand/videos/` for production persona pages so the SPA does not depend on a cold R2 object for LCP.

## Security notes

- **Do not** put `MEDIA_UPLOAD_SECRET` in the SPA or client bundles.
- Upload URLs expire (`exp` + HMAC). Anyone with a live URL can PUT once until expiry.
- Max body size: **100 MB** (far above Imagine clip sizes).
- Public GETs are open by design (campaign media). Do not store secrets or private assets under `/media/`.

## Related

- Awesomers uses the same R2 + `/media/*` pattern for podcast audio (`awesomers-media`).
- Static brand videos today: `public/brand/videos/*-carpet-premiere.mp4`.
- Persona rules: [`persona-portfolio-rules.md`](./persona-portfolio-rules.md).
