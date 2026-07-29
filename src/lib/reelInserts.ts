/**
 * Interleave fashion reels into product lists for cross-category promo.
 * Pool grows as CATEGORY_REELS grows — no hard cap beyond density rules.
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
   * Insert roughly after every N products (default 5).
   * Lower = denser fashion inserts.
   */
  every?: number
  /** Hard cap on inserts for this grid (default: unlimited up to density) */
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
 * Build a mixed list of products + reel insert tiles.
 * Prefer reels from *other* categories so inserts cross-promote rooms.
 */
export function interleaveReelInserts(
  products: Product[],
  opts: ReelInsertOptions,
): ProductGridItem[] {
  const every = Math.max(3, opts.every ?? 5)
  const minProducts = opts.minProducts ?? 3
  const exclude = opts.excludeCategory || null

  if (products.length < minProducts) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  const pool = CATEGORY_REELS.filter((r) => r.category !== exclude)
  if (pool.length === 0) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  const productKey = products.map((p) => p.id).join(',')
  const seedStr =
    opts.seed ??
    `${opts.listName}|${exclude ?? ''}|${dayKey()}|${productKey}`
  const rand = mulberry32(hashSeed(seedStr))

  const reels = shuffleInPlace([...pool], rand)
  const maxByDensity = Math.floor(products.length / every)
  const maxInserts = Math.min(
    reels.length,
    maxByDensity,
    opts.maxInserts ?? maxByDensity,
  )

  if (maxInserts <= 0) {
    return products.map((product) => ({ kind: 'product' as const, product }))
  }

  // Spread insert slots across the list (not all stacked at the end)
  const slots: number[] = []
  for (let i = 0; i < maxInserts; i++) {
    // After every-th product, with a small deterministic jitter 0..1
    const base = (i + 1) * every
    const jitter = Math.floor(rand() * 2) // 0 or 1 product
    const at = Math.min(products.length, base + jitter)
    if (!slots.includes(at)) slots.push(at)
  }
  slots.sort((a, b) => a - b)

  const out: ProductGridItem[] = []
  let reelIdx = 0
  let slotPtr = 0

  for (let i = 0; i < products.length; i++) {
    out.push({ kind: 'product', product: products[i] })
    // Insert after product index i when (i+1) matches a planned slot count
    while (
      slotPtr < slots.length &&
      slots[slotPtr] === i + 1 &&
      reelIdx < maxInserts
    ) {
      out.push({
        kind: 'reel',
        reel: reels[reelIdx % reels.length],
        slot: reelIdx,
      })
      reelIdx++
      slotPtr++
    }
  }

  return out
}
