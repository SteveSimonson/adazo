/**
 * Static catalog image integrity checks (no network).
 *
 * Catches the failure mode from the 2026 scrape: an /images/I/{id} stem
 * belonging to a different brand/ASIN silently attached to a beauty SKU.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  amazonImageId,
  BANNED_AMAZON_IMAGE_IDS,
  LOCKED_PRIMARY_IMAGE_IDS,
} from './amazon-image-ids.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const PRODUCT_FILES = [
  join(ROOT, 'src/data/products.ts'),
  join(ROOT, 'src/data/products.bsr.generated.ts'),
]

function parseProductObjects(src) {
  const assign = src.search(/export const \w[\w]*\s*(?::[^=]+)?=\s*\[/)
  if (assign < 0) return []
  // Skip the TypeScript `Product[]` annotation — take the `[` after `=`.
  const eq = src.indexOf('=', assign)
  const arrStart = eq >= 0 ? src.indexOf('[', eq) : -1
  if (arrStart < 0) return []
  const rest = src.slice(arrStart + 1)
  let depth = 1
  let i = 0
  for (; i < rest.length; i++) {
    if (rest[i] === '[') depth++
    else if (rest[i] === ']') {
      depth--
      if (depth === 0) break
    }
  }
  const arrayBody = rest.slice(0, i)
  const objects = []
  let start = -1
  depth = 0
  for (let j = 0; j < arrayBody.length; j++) {
    const ch = arrayBody[j]
    if (ch === '{') {
      if (depth === 0) start = j
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start >= 0) {
        objects.push(arrayBody.slice(start, j + 1))
        start = -1
      }
    }
  }
  return objects
}

function field(obj, name) {
  const m = obj.match(new RegExp(`${name}\\s*:\\s*'([^']*)'`))
  return m ? m[1] : null
}

export function loadCatalogProducts(files = PRODUCT_FILES) {
  const products = []
  for (const file of files) {
    let src
    try {
      src = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    for (const obj of parseProductObjects(src)) {
      const slug = field(obj, 'slug')
      const asin = field(obj, 'asin')
      if (!slug || !asin) continue
      const images = [
        ...obj.matchAll(/https:\/\/[^\s'"\\]+(?:media-amazon|ssl-images-amazon)[^\s'"\\]*/g),
      ].map((m) => m[0])
      products.push({
        file,
        slug,
        name: field(obj, 'name'),
        brand: field(obj, 'brand') || '',
        asin: asin.toUpperCase(),
        images,
        imageIds: images.map(amazonImageId).filter(Boolean),
      })
    }
  }
  return products
}

export function qcCatalogImages(products = loadCatalogProducts()) {
  const banned = []
  const missingImages = []
  const lockedPrimary = []
  const byId = new Map()

  for (const p of products) {
    if (!p.images.length) missingImages.push(p.slug)
    for (const id of p.imageIds) {
      if (BANNED_AMAZON_IMAGE_IDS.has(id)) {
        banned.push({ slug: p.slug, asin: p.asin, imageId: id })
      }
      if (!byId.has(id)) byId.set(id, [])
      byId.get(id).push(p)
    }
    const locked = LOCKED_PRIMARY_IMAGE_IDS[p.slug]
    if (locked && p.imageIds[0] !== locked) {
      lockedPrimary.push({
        slug: p.slug,
        expected: locked,
        actual: p.imageIds[0] || null,
      })
    }
  }

  const crossBrand = []
  const sameBrandShare = []
  for (const [imageId, owners] of byId) {
    const unique = []
    const seen = new Set()
    for (const o of owners) {
      const key = `${o.asin}|${o.slug}`
      if (seen.has(key)) continue
      seen.add(key)
      unique.push(o)
    }
    if (unique.length < 2) continue
    const brands = new Set(unique.map((o) => o.brand.toLowerCase()))
    const entry = {
      imageId,
      slugs: unique.map((o) => o.slug),
      brands: unique.map((o) => o.brand),
      asins: unique.map((o) => o.asin),
    }
    if (brands.size > 1) crossBrand.push(entry)
    else sameBrandShare.push(entry)
  }

  return {
    checked: products.length,
    slugs: products.map((p) => p.slug),
    banned,
    missingImages,
    lockedPrimary,
    crossBrand,
    sameBrandShare,
    ok:
      banned.length === 0 &&
      missingImages.length === 0 &&
      lockedPrimary.length === 0 &&
      crossBrand.length === 0,
  }
}

export { PRODUCT_FILES, ROOT }
