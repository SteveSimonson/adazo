/**
 * Adazo catalog — curated house + weekly Amazon BSR limited drop.
 */
export type { Category, Product, ProductSpec } from './types'
export { products as curatedProducts } from './products'
export {
  bsrProducts,
  bsrWeekOf,
  bsrFetchedAt,
  bsrExpiresAt,
  bsrMarketing,
} from './products.bsr.generated'

import {
  galleryThumbImages,
  isAmazonCdnImage,
  primaryDisplayImage,
  resolveProductImages,
} from '../lib/productImages'
import { products as curated } from './products'
import {
  bsrProducts,
  bsrWeekOf,
  bsrExpiresAt,
  bsrMarketing,
} from './products.bsr.generated'
import { withProductMedia } from './productMedia'
import type { Category, Product } from './types'

/**
 * Storefront-ready product: real Amazon listing (ASIN required).
 * Excludes house-edit pads (fill-*, no ASIN) that produce identical busy cards.
 */
export function isMerchandisableProduct(p: Product): boolean {
  // Explicit house-edit filler ids from fill-quota (never shop-ready)
  if (p.id.startsWith('fill-') || p.slug.startsWith('fill-')) return false
  // Prefer real ASIN product pages
  if (p.asin && /^[A-Z0-9]{10}$/i.test(p.asin)) return true
  // Curated fashion/gift rows may use keyword affiliate search until ASINs verified
  if (p.source === 'curated' && (p.searchKeywords || '').trim().length > 2) {
    return true
  }
  return false
}

/** Prefer products that already have a real Amazon CDN photo in catalog data. */
export function hasAmazonCatalogImage(p: Product): boolean {
  return (p.images || []).some((u) => isAmazonCdnImage(u))
}

/** Merged storefront catalog: limited BSR drop first, then curated (deduped by ASIN). */
export const products: Product[] = mergeCatalog(bsrProducts, curated)

/** Shop/home grids — merchandisable only (no ASIN-less house-edit walls). */
export const shopProducts: Product[] = products.filter(isMerchandisableProduct)

function mergeCatalog(bsr: Product[], base: Product[]): Product[] {
  const seenAsin = new Set<string>()
  const seenSlug = new Set<string>()
  const out: Product[] = []

  for (const p of [...bsr, ...base]) {
    // Drops house-edit pads; allows curated keyword rows without ASIN.
    if (!isMerchandisableProduct(p)) continue
    // ASIN dedupe only when present — do not collapse all ASIN-less rows on `undefined`.
    if (p.asin) {
      const asinKey = p.asin.toUpperCase()
      if (seenAsin.has(asinKey)) continue
      seenAsin.add(asinKey)
    }
    let slug = p.slug
    if (seenSlug.has(slug)) slug = `${slug}-${p.id}`
    seenSlug.add(slug)
    const merged = slug === p.slug ? p : { ...p, slug }
    out.push(withProductMedia(merged))
  }
  return out
}

export const CATEGORY_LABELS: Record<Category, string> = {
  luxury: 'Luxury Beauty',
  fragrance: 'Fragrance',
  skincare: 'Skincare',
  hair: 'Hair',
  makeup: 'Makeup',
  body: 'Body',
  tools: 'Tools',
  'sun-spf': 'Sun & SPF',
  lips: 'Lips',
  jewelry: 'Jewelry',
  handbags: 'Handbags',
  wellness: 'Wellness',
}

export const CATEGORY_OPTIONS = (
  Object.entries(CATEGORY_LABELS) as [Category, string][]
).map(([id, label]) => ({ id, label }))

export const collections = Array.from(
  new Map(
    shopProducts.map((p) => [
      p.collection.toLowerCase().replace(/\s+/g, '-'),
      {
        id: p.collection.toLowerCase().replace(/\s+/g, '-'),
        label: p.collection,
        count: 0,
      },
    ]),
  ).values(),
).map((c) => ({
  ...c,
  count: shopProducts.filter(
    (p) => p.collection.toLowerCase().replace(/\s+/g, '-') === c.id,
  ).length,
  blurb: collectionBlurb(c.label),
}))

function collectionBlurb(label: string): string {
  const map: Record<string, string> = {
    'Luxury Beauty':
      'Prestige skincare and makeup — highest Associates commission tier (~10%).',
    Fragrance: 'Perfume and fine fragrance with gift-ready AOV.',
    Skincare: 'Cleansers, serums, moisturizers, and barrier care.',
    Hair: 'Treatments, oils, and refresh essentials.',
    Makeup: 'Everyday color and finish staples.',
    Body: 'Lotions, mists, and body care rituals.',
    Tools: 'Stylers, dryers, and high-utility devices.',
    SPF: 'Daily sun protection that wears well under makeup.',
    Wellness: 'Collagen and beauty-adjacent wellness picks.',
    Lips: 'Masks, balms, and soft-finish lip care.',
    Jewelry: 'Fashion and fine jewelry for gifting and everyday polish.',
    Handbags: 'Bags and fashion accessories with high cart value.',
  }
  return map[label] ?? 'Curated women\'s health and beauty for real routines.'
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** Best display image: Amazon CDN first, then ASIN attempts, then quiet monogram. */
export function primaryImage(p: Product): string | undefined {
  return primaryDisplayImage(p)
}

/** Full gallery chain for PDP main viewer / onError fallbacks. */
export function productImageChain(
  p: Product,
  size: 500 | 1000 = 500,
): string[] {
  return resolveProductImages(p, size)
}

/** Thumbnail strip only — reliable Amazon listing photos (hide if ≤1). */
export function productGalleryThumbs(
  p: Product,
  size: 500 | 1000 = 500,
): string[] {
  return galleryThumbImages(p, size)
}

export function formatMoney(n: number) {
  if (n == null || Number.isNaN(n) || n <= 0) return 'See Amazon'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(n)
}

export function categoryLabel(c: Category) {
  return CATEGORY_LABELS[c]
}

export function filterProducts(opts: {
  cat?: string
  collection?: string
  q?: string
  limited?: boolean
  bsr?: boolean
  /** Include ASIN-less pads (default false — prevents house-edit walls) */
  includePads?: boolean
}) {
  let list = opts.includePads ? products.slice() : shopProducts.slice()
  if (opts.cat && opts.cat in CATEGORY_LABELS) {
    list = list.filter((p) => p.category === opts.cat)
  }
  if (opts.collection) {
    list = list.filter(
      (p) =>
        p.collection.toLowerCase().replace(/\s+/g, '-') === opts.collection ||
        p.collection === opts.collection,
    )
  }
  if (opts.limited) list = list.filter((p) => p.limitedTime)
  if (opts.bsr) {
    list = list.filter(
      (p) => p.source === 'amazon-bsr' || p.source === 'amazon-search',
    )
  }
  if (opts.q) {
    const q = opts.q.toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.bsrCategory?.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q)),
    )
  }
  return list
}

export function limitedProducts(): Product[] {
  return shopProducts.filter((p) => p.limitedTime)
}

export function bsrLeaders(limit = 12): Product[] {
  return shopProducts
    .filter((p) => p.limitedTime && p.bsrRank != null)
    .sort((a, b) => (a.bsrRank ?? 999) - (b.bsrRank ?? 999))
    .slice(0, limit)
}

/** Same category + collection first, then same category. */
export function similarProducts(product: Product, limit = 4): Product[] {
  const rest = shopProducts.filter((p) => p.id !== product.id)
  const sameCollection = rest.filter(
    (p) =>
      p.collection === product.collection && p.category === product.category,
  )
  const sameCategory = rest.filter(
    (p) =>
      p.category === product.category &&
      !sameCollection.some((s) => s.id === p.id),
  )
  return [...sameCollection, ...sameCategory].slice(0, limit)
}

export function youMayAlsoLike(product: Product, limit = 4): Product[] {
  const adjacent: Record<Category, Category[]> = {
    luxury: ['fragrance', 'skincare', 'makeup', 'lips'],
    fragrance: ['luxury', 'body', 'handbags'],
    skincare: ['luxury', 'sun-spf', 'lips', 'makeup'],
    hair: ['tools', 'wellness', 'luxury'],
    makeup: ['luxury', 'skincare', 'lips', 'tools'],
    body: ['fragrance', 'skincare', 'wellness'],
    tools: ['hair', 'makeup', 'luxury'],
    'sun-spf': ['skincare', 'makeup', 'luxury'],
    wellness: ['skincare', 'hair', 'body'],
    lips: ['luxury', 'skincare', 'makeup'],
    jewelry: ['handbags', 'fragrance', 'luxury'],
    handbags: ['jewelry', 'fragrance', 'luxury'],
  }

  const cats = new Set([product.category, ...(adjacent[product.category] ?? [])])
  const lo = (product.priceHint || 20) * 0.45
  const hi = (product.priceHint || 20) * 2.4

  const scored = shopProducts
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0
      if (cats.has(p.category)) score += 3
      if (p.collection === product.collection) score += 2
      if (p.priceHint >= lo && p.priceHint <= hi) score += 2
      if (p.limitedTime) score += 2
      if (p.badge) score += 1
      if ((p.rating ?? 0) >= 4.3) score += 1
      if (p.category !== product.category) score += 1
      return { p, score }
    })
    .sort((a, b) => b.score - a.score)

  const picked: Product[] = []
  const usedCats = new Set<string>()
  for (const { p } of scored) {
    if (picked.length >= limit) break
    if (usedCats.has(p.category) && picked.length < limit - 1) continue
    picked.push(p)
    usedCats.add(p.category)
  }
  for (const { p } of scored) {
    if (picked.length >= limit) break
    if (!picked.some((x) => x.id === p.id)) picked.push(p)
  }
  return picked
}

export function formatRating(n?: number) {
  if (n == null) return null
  return n.toFixed(1)
}

export function limitedTimeCopy() {
  return {
    headline: bsrMarketing.headline,
    subhead: bsrMarketing.subhead,
    weekOf: bsrWeekOf || null,
    expiresAt: bsrExpiresAt || null,
    count: limitedProducts().length,
  }
}

export function formatExpiry(iso?: string) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return null
  }
}
