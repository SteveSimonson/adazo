#!/usr/bin/env node
/**
 * Pad limited-time catalog to ≥20 products per Adazo category.
 * Uses latest raw BSR snapshot + house-edit fillers (brand images + Amazon search keywords).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
/**
 * Default 0: do not invent ASIN-less “house edit” pads that create ugly
 * identical-card category pages. Set CATEGORY_QUOTA>0 only for experiments.
 */
const QUOTA = Number(process.env.CATEGORY_QUOTA || 0)

/**
 * ASIN-less house-edit pads: do not reuse busy brand flatlays.
 * Empty images[] → storefront shows unique quiet monogram placeholders.
 */
function fillerImages() {
  return []
}

const collectionFor = {
  skincare: 'Skincare',
  hair: 'Hair',
  makeup: 'Makeup',
  body: 'Body',
  tools: 'Tools',
  'sun-spf': 'SPF',
  wellness: 'Wellness',
  lips: 'Lips',
}

const fillers = {
  skincare: [['Gentle Ceramide Cleanser', 'Barrier-first daily cleanse.']],
  hair: [['Bond Repair Treatment', 'Weekly strength for tired hair.']],
  makeup: [['Everyday Length Mascara', 'Soft definition without clumps.']],
  body: [['Shea Body Lotion', 'Soft skin, non-greasy finish.']],
  tools: [['Hot Air Styler Brush', 'Blowout energy at home.']],
  'sun-spf': [['Invisible Daily SPF', 'Light finish under makeup.']],
  wellness: [['Collagen Peptides', 'Unflavored daily scoop.']],
  lips: [['Overnight Lip Mask', 'Softer mornings.']],
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 70)
}

/** Upgrade Amazon list thumbs and de-dupe by /images/I/{id} stem. */
function upgradeAmazonImageUrl(url) {
  if (!url || typeof url !== 'string') return null
  let u = url.trim().replace(/&amp;/g, '&')
  if (u.startsWith('/')) return u
  if (/\/images\/G\//i.test(u) || /pixel|sprite|transparent/i.test(u)) return null
  if (
    !/media-amazon\.com\/images\//i.test(u) &&
    !/ssl-images-amazon\.com\/images\//i.test(u)
  ) {
    return null
  }
  u = u.replace(/^http:\/\//i, 'https://')
  u = u
    .replace(/\._AC_UL\d+(?:_SR\d+,\d+)?(?:_QL\d+)?_\./i, '._AC_SL1000_.')
    .replace(/\._AC_UL[^.]+\./i, '._AC_SL1000_.')
    .replace(/\._AC_UX\d+_.*?\./i, '._AC_SL1000_.')
    .replace(/\._AC_UY\d+_.*?\./i, '._AC_SL1000_.')
    .replace(/\._SX\d+_\./i, '._SL1000_.')
    .replace(/\._SY\d+_\./i, '._SL1000_.')
    .replace(/\._US\d+_\./i, '._SL1000_.')
    .replace(/\._SS\d+_\./i, '._SL1000_.')
  // Keep P/{ASIN} as last-resort candidate (storefront walks onError)
  return u
}

function normalizeProductImages(images) {
  const out = []
  const seenStems = new Set()
  for (const raw of images || []) {
    const u = upgradeAmazonImageUrl(raw) || (String(raw).startsWith('/') ? raw : null)
    if (!u) continue
    const m = String(u).match(/\/images\/I\/([^./]+)/i)
    const stem = m ? m[1].toLowerCase() : null
    if (stem) {
      if (seenStems.has(stem)) continue
      seenStems.add(stem)
    } else if (out.includes(u)) {
      continue
    }
    out.push(u)
  }
  return out
}

/** Soften misleading BSR wording on search-sourced products already in snapshot. */
function sanitizeSearchProduct(p) {
  if (p.source !== 'amazon-search') return p
  const next = { ...p }
  delete next.bsrRank
  if (Array.isArray(next.features)) {
    next.features = next.features.map((f) =>
      String(f).replace(/Amazon Best Sellers · #\d+ in /i, 'Amazon beauty search · '),
    )
  }
  if (Array.isArray(next.specs)) {
    next.specs = next.specs.filter(
      (s) => !/best sellers rank|list position/i.test(s.label || ''),
    )
  }
  // Always rewrite search taglines — residual "#N in … · This week's list" is not a real BSR rank
  next.tagline = "This week's Amazon beauty picks · Limited-time options"
  if (next.description) {
    next.description = String(next.description)
      .replace(
        /selected from Amazon Best Sellers/i,
        'selected from Amazon beauty search',
      )
      .replace(
        /#\d+\s+in\s+[^·.]+(?:\s*·\s*This week's list)?/gi,
        'Limited-time options',
      )
  }
  return next
}

/** De-dupe specs by label (list-path BSR used to double-add rank rows). */
function dedupeSpecs(p) {
  if (!Array.isArray(p.specs)) return p
  const seen = new Set()
  const specs = []
  for (const s of p.specs) {
    const label = s?.label || ''
    if (seen.has(label)) continue
    seen.add(label)
    specs.push(s)
  }
  return { ...p, specs }
}

/**
 * Prefer the snapshot the importer just wrote (src/data/bsr-snapshot.json),
 * then the newest raw snapshot by filename timestamp — never "largest wins"
 * (that can rehydrate a stale larger dump after a thinner fresh import).
 */
function loadBestSnapshot() {
  const livePath = join(ROOT, 'src/data/bsr-snapshot.json')
  try {
    const live = JSON.parse(readFileSync(livePath, 'utf8'))
    if (live?.products?.length) {
      console.log(`Using live snapshot: src/data/bsr-snapshot.json (${live.products.length} products)`)
      return live
    }
  } catch {
    /* fall through to raw */
  }

  const dir = join(ROOT, 'data/bsr/raw')
  const files = readdirSync(dir)
    .filter((f) => f.startsWith('snapshot-') && f.endsWith('.json'))
    .sort()
    .reverse() // newest ISO timestamp name first

  for (const f of files) {
    try {
      const j = JSON.parse(readFileSync(join(dir, f), 'utf8'))
      const snap = j.snapshot || j
      const list = snap.products || []
      if (list.length > 0) {
        console.log(`Using newest raw snapshot: ${f} (${list.length} products)`)
        return snap
      }
    } catch {
      /* skip corrupt */
    }
  }
  throw new Error('No BSR snapshot found in src/data/bsr-snapshot.json or data/bsr/raw')
}

const snap = loadBestSnapshot()
// Strip prior house-edit pads so re-runs are idempotent (import:bsr chains fill-quota)
const products = structuredClone(snap.products)
  .filter((p) => p.source !== 'curated' || p.asin)
  .map((p) => sanitizeSearchProduct(p))
  .map((p) => dedupeSpecs(p))
  .map((p) => {
    // Keep Amazon CDN images; strip busy brand lifestyle fallbacks from catalog data
    const cleaned = normalizeProductImages(p.images).filter(
      (u) =>
        !String(u).startsWith('/brand/products-flatlay') &&
        !String(u).startsWith('/brand/products-hero') &&
        !String(u).startsWith('/brand/soho-collection') &&
        !String(u).startsWith('/brand/landing-forest') &&
        !String(u).startsWith('/brand/hero'),
    )
    // If no Amazon photo left but we have an ASIN, keep ASIN image attempts for the client
    if (cleaned.length === 0 && p.asin) {
      const a = String(p.asin).toUpperCase()
      cleaned.push(
        `https://m.media-amazon.com/images/P/${a}.01._SCLZZZZZZZ_SX500_.jpg`,
        `https://images-na.ssl-images-amazon.com/images/P/${a}.01.LZZZZZZZ.jpg`,
      )
    }
    return { ...p, images: cleaned }
  })
const weekOf = snap.weekOf
const expiresAt = snap.expiresAt
const fetchedAt = snap.fetchedAt || new Date().toISOString()
const usedSlug = new Set(products.map((p) => p.slug))

const multiUlLeft = products.filter(
  (p) => (p.images || []).filter((u) => /_AC_UL/i.test(u)).length > 1,
).length
console.log(
  `Loaded ${products.length} Amazon-sourced products (prior house-edit pads removed; multi-UL leftovers: ${multiUlLeft})`,
)

if (QUOTA <= 0) {
  console.log('CATEGORY_QUOTA=0 — skipping house-edit pads (shop shows real Amazon listings only)')
}

for (const cat of Object.keys(fillers)) {
  let n = products.filter((p) => p.category === cat).length
  let i = 0
  while (QUOTA > 0 && n < QUOTA && i < fillers[cat].length) {
    const [name, tagline] = fillers[cat][i++]
    const slug = `fill-${slugify(name)}`
    if (usedSlug.has(slug)) continue
    // ASIN-less merchandising pads: no synthetic stars, review counts, or prices.
    // priceHint 0 → UI shows "See Amazon"; omit rating so StarRating hides.
    products.push({
      id: `fill-${cat}-${i}`,
      slug,
      name,
      tagline,
      description: `${name} — women's beauty pick. Limited-time Adazo edit; complete purchase on Amazon.`,
      category: cat,
      collection: collectionFor[cat],
      material: 'Bamboo (confirm on Amazon listing)',
      features: [
        'Bamboo household essential',
        'Limited-time placement on Adazo this week',
        'Buy on Amazon — availability set by Amazon',
      ],
      specs: [
        { label: 'Material', value: 'Bamboo (confirm listing)' },
        { label: 'Placement', value: 'Adazo weekly house edit' },
      ],
      priceHint: 0,
      searchKeywords: `${name} beauty`,
      badge: 'House edit',
      images: fillerImages(),
      hue: 80 + i * 3,
      limitedTime: true,
      weekOf,
      expiresAt,
      // No synthetic BSR rank — PDP must not claim Best Sellers placement
      materialFamily:
        cat === 'bath' && /sheet|towel|wash/i.test(name)
          ? 'skincare'
          : 'other',
      source: 'curated',
    })
    usedSlug.add(slug)
    n++
  }
}

const by = {}
for (const p of products) by[p.category] = (by[p.category] || 0) + 1
console.log('Per-category counts:', by)
console.log('Total:', products.length)
console.log(
  'All images:',
  products.every((p) => p.images?.length > 0),
  'min:',
  Math.min(...Object.values(by)),
)

const marketing = {
  headline: 'OPTIONS ONLY AVAILABLE FOR A LIMITED TIME',
  subhead:
    "This week's beauty edit — Amazon Best Sellers plus fills to 20+ per category. Lists refresh weekly.",
  refreshCadence: 'weekly',
}

writeFileSync(
  join(ROOT, 'src/data/bsr-snapshot.json'),
  JSON.stringify(
    {
      weekOf,
      fetchedAt,
      expiresAt,
      associateTag: 'iu0e3-20',
      productCount: products.length,
      products,
      marketing,
      categories: by,
    },
    null,
    2,
  ),
)

writeFileSync(
  join(ROOT, 'src/data/products.bsr.generated.ts'),
  `/**
 * AUTO-GENERATED — weekly limited-time drop (≥${QUOTA} per category).
 * Week of ${weekOf} · expires ${expiresAt}
 * Run: npm run import:bsr  (or npm run fill:quota alone)
 */
import type { Product } from './types'

export const bsrWeekOf = ${JSON.stringify(weekOf)} as const
export const bsrFetchedAt = ${JSON.stringify(fetchedAt)} as const
export const bsrExpiresAt = ${JSON.stringify(expiresAt)} as const
export const bsrMarketing = ${JSON.stringify(marketing, null, 2)} as const

export const bsrProducts: Product[] = ${JSON.stringify(products, null, 2)}
`,
)

console.log('Wrote bsr-snapshot.json + products.bsr.generated.ts')
