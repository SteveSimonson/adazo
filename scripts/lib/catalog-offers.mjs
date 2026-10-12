/**
 * Offer fields from a Creators offersV2 check.
 * `price` is the listing amount from that call. `priceHint` is never copied in.
 */

const AVAILABILITY_TOKEN = /^[A-Z][A-Z0-9_]*$/

/** Positive money amount. Zero, blanks, and display strings are not an offer price. */
export function finiteAmount(amount) {
  let n
  if (typeof amount === 'number') n = amount
  else if (typeof amount === 'string' && amount.trim() !== '') n = Number(amount)
  else return undefined
  if (!Number.isFinite(n) || n <= 0) return undefined
  return Math.round(n * 100) / 100
}

function formatPrice(n) {
  const rounded = Math.round(n * 100) / 100
  return String(rounded)
}

/**
 * Normalize one offers check for the catalog.
 * Returns null when `checkedAt` is missing or not a real timestamp.
 * @param {{ price?: unknown, availability?: unknown, checkedAt?: unknown } | null | undefined} input
 */
export function normalizeCatalogOffer(input) {
  if (!input || typeof input !== 'object') return null
  const checkedRaw = typeof input.checkedAt === 'string' ? input.checkedAt.trim() : ''
  const parsed = Date.parse(checkedRaw)
  if (!checkedRaw || !Number.isFinite(parsed)) return null
  const checkedAt = new Date(parsed).toISOString()
  const availabilityRaw =
    typeof input.availability === 'string' ? input.availability.trim() : ''
  const availability = AVAILABILITY_TOKEN.test(availabilityRaw)
    ? availabilityRaw
    : undefined
  const price = finiteAmount(input.price)
  return {
    checkedAt,
    ...(availability ? { availability } : {}),
    ...(price != null ? { price } : {}),
  }
}

/** Fields to spread onto a generated Product. Empty when this row was not an offers check. */
export function catalogOfferFields(enriched) {
  return (
    normalizeCatalogOffer({
      price: enriched?.price,
      availability: enriched?.availability,
      checkedAt: enriched?.checkedAt,
    }) || {}
  )
}

/** Library item → catalog offer. Reads top-level price plus attributes from sync write-back. */
export function offerFromLibraryItem(lib) {
  if (!lib || typeof lib !== 'object') return null
  const attrs =
    lib.attributes && typeof lib.attributes === 'object' ? lib.attributes : {}
  return normalizeCatalogOffer({
    price: lib.price ?? attrs.price,
    availability: attrs.availability ?? lib.availability,
    checkedAt: attrs.checkedAt ?? lib.checkedAt,
  })
}

/** Incoming check replaces the catalog check only when it is strictly newer. */
export function isNewerOffer(currentCheckedAt, incomingCheckedAt) {
  const incoming = Date.parse(incomingCheckedAt || '')
  if (!Number.isFinite(incoming)) return false
  const current = Date.parse(currentCheckedAt || '')
  if (!Number.isFinite(current)) return true
  return incoming > current
}

function stripOfferField(obj, key) {
  return obj.replace(
    new RegExp(`\\n[ \\t]*${key}(?![A-Za-z0-9_])\\s*:[^\\n]*`, 'g'),
    '',
  )
}

function applyOffer(obj, offer) {
  let next = stripOfferField(obj, 'price')
  next = stripOfferField(next, 'availability')
  next = stripOfferField(next, 'checkedAt')

  if (offer.price != null) {
    next = next.replace(
      /^([ \t]*)priceHint(?![A-Za-z0-9_])\s*:\s*[^,\n]+,?/m,
      `$1priceHint: ${formatPrice(offer.price)},`,
    )
  }

  const anchor = next.match(/^([ \t]*)priceHint(?![A-Za-z0-9_])\s*:[^\n]*/m)
  const indent = anchor ? anchor[1] : '    '
  const lines = []
  if (offer.price != null) lines.push(`${indent}price: ${formatPrice(offer.price)},`)
  if (offer.availability) {
    lines.push(`${indent}availability: '${offer.availability}',`)
  }
  lines.push(`${indent}checkedAt: '${offer.checkedAt}',`)
  const block = lines.join('\n')

  if (anchor) {
    return next.replace(anchor[0], `${anchor[0]}\n${block}`)
  }
  return next.replace(/\n([ \t]*)\}$/, `\n${block}\n$1}`)
}

function splitTopLevelObjects(arrayBody) {
  const objects = []
  let start = -1
  let depth = 0
  let quote = null
  let escape = false
  for (let j = 0; j < arrayBody.length; j++) {
    const ch = arrayBody[j]
    if (quote) {
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      continue
    }
    if (ch === '{') {
      if (depth === 0) start = j
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start >= 0) {
        objects.push({ text: arrayBody.slice(start, j + 1), start, end: j + 1 })
        start = -1
      }
    }
  }
  return objects
}

/**
 * Write availability, checkedAt, and price into a products.ts-style catalog.
 * A live price replaces priceHint. A check with no amount leaves priceHint alone
 * and does not invent `price`.
 * @param {string} src
 * @param {Map<string, { price?: number, availability?: string, checkedAt?: string }> | Record<string, { price?: number, availability?: string, checkedAt?: string }>} offersByAsin
 */
export function patchCatalogOfferFields(src, offersByAsin) {
  const map =
    offersByAsin instanceof Map
      ? offersByAsin
      : new Map(Object.entries(offersByAsin || {}))
  const assign = src.search(/export const \w[\w]*\s*(?::[^=]+)?=\s*\[/)
  if (assign < 0) return { src, changed: 0 }
  const eq = src.indexOf('=', assign)
  const arrStart = eq >= 0 ? src.indexOf('[', eq) : -1
  if (arrStart < 0) return { src, changed: 0 }

  let depth = 1
  let i = arrStart + 1
  let quote = null
  let escape = false
  for (; i < src.length; i++) {
    const ch = src[i]
    if (quote) {
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      continue
    }
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) break
    }
  }
  if (depth !== 0) return { src, changed: 0 }

  const arrayBody = src.slice(arrStart + 1, i)
  const objects = splitTopLevelObjects(arrayBody)
  let changed = 0
  let nextBody = ''
  let cursor = 0
  for (const obj of objects) {
    nextBody += arrayBody.slice(cursor, obj.start)
    const am = obj.text.match(/\basin\s*:\s*['"]([A-Z0-9]{10})['"]/i)
    const asin = am ? am[1].toUpperCase() : ''
    const offer = asin ? normalizeCatalogOffer(map.get(asin)) : null
    if (offer) {
      const patched = applyOffer(obj.text, offer)
      if (patched !== obj.text) changed += 1
      nextBody += patched
    } else {
      nextBody += obj.text
    }
    cursor = obj.end
  }
  nextBody += arrayBody.slice(cursor)
  return { src: src.slice(0, arrStart + 1) + nextBody + src.slice(i), changed }
}
