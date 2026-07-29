/**
 * Category fashion reels — Amazon insert size (4:5 product-card well).
 *
 * Multiple **generations** per category grow the insert pool. Product grids
 * pick from the full pool via ProductGrid / interleaveReelInserts (cross-promo).
 * See docs/amazon-insert-video.md.
 */
import type { Category } from './types'
import { CATEGORY_LABELS } from './catalog'
import { HEROES } from './categoryHeroes'

/** Creative wave — gen 1 = launch set, gen 2 = second campaign wave, … */
export type ReelGeneration = 1 | 2

export type CategoryReel = {
  /** Stable id for keys / analytics: e.g. handbags-g1 */
  id: string
  category: Category
  /** Generation wave (1, 2, …) */
  generation: ReelGeneration
  title: string
  blurb: string
  /** 4:5 / 3:4 insert clip */
  video: string
  /** Poster still (first frame) */
  poster: string
  /** One-line motion note for a11y / captions */
  motionLabel: string
}

/** Shop categories that get fashion insert reels (all catalog rooms). */
export const REEL_CATEGORIES: Category[] = [
  'handbags',
  'jewelry',
  'watches',
  'gold',
  'luxury',
  'fragrance',
  'skincare',
  'hair',
  'makeup',
  'body',
  'tools',
  'sun-spf',
  'lips',
  'wellness',
]

/** Latest generation number in the catalog (bump when adding a wave). */
export const REEL_LATEST_GENERATION: ReelGeneration = 2

const MOTION_G1: Record<Category, string> = {
  handbags: 'Soft light glide across structured leather',
  jewelry: 'Diamond sparkle with a slow push-in',
  watches: 'Second-hand tick energy, cool steel gleam',
  gold: 'Warm gold catch-light, gentle rotate feel',
  luxury: 'Prestige cream jar in champagne light',
  fragrance: 'Perfume mist drift in violet light',
  skincare: 'Serum drop catch, dewy marble calm',
  hair: 'Hair oil sheen, slow fabric sway',
  makeup: 'Blush silk and soft brush motion',
  body: 'Lotion pearl, spa-steam softness',
  tools: 'Tool chrome glint, precise tilt',
  'sun-spf': 'Daylight SPF bottle, sun-flare drift',
  lips: 'Lip balm gloss, blush silk shimmer',
  wellness: 'Morning glass pour, quiet wellness beat',
}

/** Gen 2 — new scenes / motion for each room */
const MOTION_G2: Record<Category, string> = {
  handbags: 'City-step stride, bag at hip in golden hour',
  jewelry: 'Necklace flash as she turns toward window light',
  watches: 'Cuff adjust, dial catches cool side light',
  gold: 'Layered chains sway with a slow shoulder turn',
  luxury: 'Jar lid lift, cream light on fingertips',
  fragrance: 'Bottle tilt, scent trail in rose haze',
  skincare: 'Pat-in serum, dewy cheek in soft daylight',
  hair: 'Brush through shine, hair falls in warm backlight',
  makeup: 'Lip color glide, soft glam mirror light',
  body: 'Mist spray arc, spa steam softens the frame',
  tools: 'Dryer sweep, chrome arcs in studio light',
  'sun-spf': 'SPF tap on cheek, beach linen breeze',
  lips: 'Balm press, soft smile in blush light',
  wellness: 'Steam from mug, quiet morning window glow',
}

function buildReel(
  category: Category,
  generation: ReelGeneration,
  motion: string,
): CategoryReel {
  const hero = HEROES[category]
  const suffix = generation === 1 ? '' : `-g${generation}`
  return {
    id: `${category}-g${generation}`,
    category,
    generation,
    title: hero?.title ?? CATEGORY_LABELS[category],
    blurb: hero?.blurb ?? CATEGORY_LABELS[category],
    video: `/brand/videos/reels/${category}${suffix}.mp4`,
    poster: `/brand/videos/reels/posters/${category}${suffix}.jpg`,
    motionLabel: motion,
  }
}

/** Generation 1 (launch) — one clip per category */
export const REELS_GEN1: CategoryReel[] = REEL_CATEGORIES.map((category) =>
  buildReel(category, 1, MOTION_G1[category]),
)

/**
 * Generation 2 — new creative wave.
 * Only categories with shipped mp4s (expand as gen-2 files land).
 */
const GEN2_SHIPPED: Category[] = [
  'handbags',
  'jewelry',
  'watches',
  'gold',
  'luxury',
  'fragrance',
]

/** Generation 2 (second wave) — new creative per category */
export const REELS_GEN2: CategoryReel[] = GEN2_SHIPPED.map((category) =>
  buildReel(category, 2, MOTION_G2[category]),
)

/**
 * Full insert + /reels catalog (all generations).
 * Product-grid randomizer uses this entire pool.
 */
export const CATEGORY_REELS: CategoryReel[] = [...REELS_GEN1, ...REELS_GEN2]

export function reelsForGeneration(gen: ReelGeneration): CategoryReel[] {
  return CATEGORY_REELS.filter((r) => r.generation === gen)
}

export function reelsForCategory(cat: Category | string | null | undefined) {
  if (!cat) return []
  return CATEGORY_REELS.filter((r) => r.category === cat)
}

/** Prefer latest generation for a category; fall back to any. */
export function reelForCategory(cat: Category | string | null | undefined) {
  const list = reelsForCategory(cat)
  if (list.length === 0) return null
  return (
    list.find((r) => r.generation === REEL_LATEST_GENERATION) ??
    list[list.length - 1]
  )
}
