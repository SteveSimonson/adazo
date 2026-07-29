/**
 * Category fashion reels — Amazon insert size (4:5 product-card well).
 * Inserted into product grids via ProductGrid / interleaveReelInserts
 * (cross-promo other categories). See docs/amazon-insert-video.md.
 */
import type { Category } from './types'
import { CATEGORY_LABELS } from './catalog'
import { HEROES } from './categoryHeroes'

export type CategoryReel = {
  category: Category
  title: string
  blurb: string
  /** 4:5 / 3:4 insert clip */
  video: string
  /** Poster still (category hero or reel first frame) */
  poster: string
  /** One-line motion note for a11y / captions */
  motionLabel: string
}

/** Shop categories that get a fashion insert reel (all catalog rooms). */
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

const MOTION: Record<Category, string> = {
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

export const CATEGORY_REELS: CategoryReel[] = REEL_CATEGORIES.map((category) => {
  const hero = HEROES[category]
  return {
    category,
    title: hero?.title ?? CATEGORY_LABELS[category],
    blurb: hero?.blurb ?? CATEGORY_LABELS[category],
    video: `/brand/videos/reels/${category}.mp4`,
    /** Fashion still used as first frame / poster (Amazon insert 4:5 crop) */
    poster: `/brand/videos/reels/posters/${category}.jpg`,
    motionLabel: MOTION[category],
  }
})

export function reelForCategory(cat: Category | string | null | undefined) {
  if (!cat) return null
  return CATEGORY_REELS.find((r) => r.category === cat) ?? null
}
