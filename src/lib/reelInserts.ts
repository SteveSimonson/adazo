/**
 * Interleave fashion reels into product lists.
 *
 * Rules:
 * - Pool = full CATEGORY_REELS (category waves + persona jet-set)
 * - Never repeat the same reel id on one page
 * - Gap between inserts is random 2–6 products (immersive / unpredictable)
 * - Daily seed keeps order stable for a given list within a day
 *
 * See docs/amazon-insert-video.md.
 */
import type { Product } from '../data/types'
import type { Category } from '../data/types'
import {
  CATEGORY_REELS,
  type CategoryReel,
} from '../data/reels'

export type ProductGridItem =
  | { kind: 'product'; product: Product }
  | { kind: 'reel'; reel: CategoryReel; slot: number }

export type ReelInsertOptions = {
  /** GA / seed namespace, e.g. shop_handbags */
  listName: string
  /** Skip reels for the room the shopper is already in (cross-promo only) */
  excludeCategory?: Category | string | null
  /**
   * Minimum products between inserts (inclusive). Default 2.
   */
  minGap?: number
  /**
   * Maximum products between inserts (inclusive). Default 6.
   */
  maxGap?: number
  /**
   * @deprecated Use minGap/maxGap. Kept for callers that pass `every` —
   * maps to both min and max when set alone.
   */
  every?: number
  /** Hard cap on inserts for this grid */
  maxInserts?: number
  /**
   * Minimum product count before any insert (default 3).
   * Tiny grids stay product-only.
   */
  minProducts?: number
  /**
   * Optional seed override. Default: listName + day + product ids
   * so order is stable for a given catalog/filter within a day.
   */
  seed?: string
}

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Mulberry32 — deterministic PRNG from a 32-bit seed */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleInPlace<T>(arr: T[], rand: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function dayKey() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Random integer in [min, max] inclusive using rand ∈ [0,1).
 */
function randInt(rand: () => number, min: number, max: number): number {
  const lo = Math.min(min, max)
  const hi = Math.max(min, max)
  return lo + Math.floor(rand() * (hi - lo + 1))
}

/**
 * Build a mixed list of products + reel insert tiles.
 * Same video never appears twice on one page.
 * Inserts land after random gaps of minGap–maxGap products (default 2–6).
 */
export function interleaveReelInserts(
  products: Product[],
  opts: ReelInsertOptions,
): ProductGridItem[] {
  const minProducts = opts.minProducts ?? 3
  // Prefer minGap/maxGap; legacy `every` collapses the range
  const minGap = Math.max(
    2,
    opts.minGap ?? (opts.every != null ? opts.every : 2),
  )
  const maxGap = Math.max(
    minGap,
    opts.maxGap ?? (opts.every != null ? opts.every : 6),
  )
  const exclude = opts.excludeCategory || null

  if (products.length < minProducts) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  // Category reels from other rooms + all persona jet-set (no category)
  const pool = CATEGORY_REELS.filter(
    (r) => !r.category || r.category !== exclude,
  )
  if (pool.length === 0) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  const productKey = products.map((p) => p.id).join(',')
  const seedStr =
    opts.seed ??
    `${opts.listName}|${exclude ?? ''}|${dayKey()}|${productKey}`
  const rand = mulberry32(hashSeed(seedStr))

  // Unique reels only — shuffle full pool, never reuse an id
  const reels = shuffleInPlace([...pool], rand)
  const seen = new Set<string>()
  const uniqueReels: CategoryReel[] = []
  for (const r of reels) {
    if (seen.has(r.id)) continue
    seen.add(r.id)
    uniqueReels.push(r)
  }

  // How many inserts fit with average gap ≈ mid of range
  const avgGap = (minGap + maxGap) / 2
  const maxByDensity = Math.max(0, Math.floor(products.length / avgGap))
  const maxInserts = Math.min(
    uniqueReels.length,
    maxByDensity,
    opts.maxInserts ?? uniqueReels.length,
  )

  if (maxInserts <= 0) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  // Place slots: first after a random lead-in gap, then random 2–6 gaps
  const slots: number[] = []
  let pos = 0
  for (let i = 0; i < maxInserts; i++) {
    const gap = randInt(rand, minGap, maxGap)
    pos += gap
    if (pos > products.length) break
    // Avoid stacking two inserts at the exact same product index
    if (slots.length && slots[slots.length - 1] === pos) {
      pos = Math.min(products.length, pos + 1)
    }
    if (pos > products.length) break
    slots.push(pos)
  }

  const out: ProductGridItem[] = []
  let reelIdx = 0
  let slotPtr = 0

  for (let i = 0; i < products.length; i++) {
    out.push({ kind: 'product', product: products[i] })
    while (
      slotPtr < slots.length &&
      slots[slotPtr] === i + 1 &&
      reelIdx < uniqueReels.length &&
      reelIdx < maxInserts
    ) {
      out.push({
        kind: 'reel',
        reel: uniqueReels[reelIdx],
        slot: reelIdx,
      })
      reelIdx++
      slotPtr++
    }
  }

  return out
}
