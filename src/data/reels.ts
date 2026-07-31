/**
 * Fashion reels for product-grid inserts and /reels.
 *
 * Pool includes category room clips + persona series (jet-set, ski, Riviera).
 * Product grids interleave unique reels with random 2–6 product gaps
 * (see lib/reelInserts.ts).
 *
 * Video gen rate limit: grok-imagine-video is **2 RPS** — always sequential.
 */
import type { Category } from './types'
import { CATEGORY_LABELS } from './catalog'
import { HEROES } from './categoryHeroes'
import { VIBE_LIST } from './vibes'

/** Creative wave — 1–2 rooms, 3 jet-set, 4 ski, 5 Riviera */
export type ReelGeneration = 1 | 2 | 3 | 4 | 5

/** Persona / room series for filters and badges */
export type ReelSeries = 'room' | 'jetset' | 'ski' | 'riviera'

export type CategoryReel = {
  /** Stable id for keys / analytics */
  id: string
  /**
   * Shop room for category reels. Omitted for persona series inserts
   * (those link to the vibe check, not a shop category).
   */
  category?: Category
  /** Persona id when this is a house-model film */
  vibeId?: string
  /** Series for UI filters (default room if category set) */
  series?: ReelSeries
  /** Generation wave (1, 2, 3, …) */
  generation: ReelGeneration
  title: string
  blurb: string
  /** 4:5 / 3:4 insert clip */
  video: string
  /** Poster still (first frame) */
  poster: string
  /** One-line motion note for a11y / captions */
  motionLabel: string
  /** Deep link override (default: shop category or /quiz) */
  href?: string
  /** CTA label for insert card */
  hrefLabel?: string
  /** Kicker above the title */
  kicker?: string
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
export const REEL_LATEST_GENERATION: ReelGeneration = 5

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
    series: 'room',
    generation,
    title: hero?.title ?? CATEGORY_LABELS[category],
    blurb: hero?.blurb ?? CATEGORY_LABELS[category],
    video: `/brand/videos/reels/${category}${suffix}.mp4`,
    poster: `/brand/videos/reels/posters/${category}${suffix}.jpg`,
    motionLabel: motion,
    href: `/shop?cat=${category}`,
    hrefLabel: `Shop ${hero?.title ?? CATEGORY_LABELS[category]}`,
    kicker: 'From the house',
  }
}

/** Generation 1 (launch) — one clip per category */
export const REELS_GEN1: CategoryReel[] = REEL_CATEGORIES.map((category) =>
  buildReel(category, 1, MOTION_G1[category]),
)

/** Generation 2 (second wave) — full set, one clip per category */
export const REELS_GEN2: CategoryReel[] = REEL_CATEGORIES.map((category) =>
  buildReel(category, 2, MOTION_G2[category]),
)

/**
 * Persona jet-set inserts — house models abroad in extravagance.
 * Link to the vibe check (/quiz), not a shop category.
 */
const JETSET: {
  vibeId: string
  destination: string
  motionLabel: string
  blurb: string
}[] = [
  {
    vibeId: 'luxe',
    destination: 'Private Alps',
    motionLabel: 'Champagne over the Alps',
    blurb:
      'Quiet luxe at altitude — Vivienne between cities, gold low, light expensive.',
  },
  {
    vibeId: 'muse',
    destination: 'Dubai night',
    motionLabel: 'Helipad soft glam',
    blurb:
      'Camille above the skyline — fuchsia silk, night flash, the room already hers.',
  },
  {
    vibeId: 'sillage',
    destination: 'Capri yacht',
    motionLabel: 'Scent on the sea',
    blurb:
      'Noor on deck at golden hour — a trail that arrives before the boat does.',
  },
  {
    vibeId: 'atelier',
    destination: 'Milan tarmac',
    motionLabel: 'Jet stairs, gold bag',
    blurb:
      'Margot finishes the exit — ivory trench, architecture bag, fashion week dusk.',
  },
  {
    vibeId: 'dew',
    destination: 'Maldives dawn',
    motionLabel: 'Seaplane to glass water',
    blurb:
      'Isla in white linen at sunrise — barrier glow that holds under travel light.',
  },
  {
    vibeId: 'gilded',
    destination: 'Monaco harbor',
    motionLabel: 'Emerald night arrival',
    blurb:
      'Aurelia at the harbor — bronze silk, emerald armor, collector energy.',
  },
]

export const REELS_JETSET: CategoryReel[] = JETSET.map((j) => {
  const vibe = VIBE_LIST.find((v) => v.id === j.vibeId)
  const name = vibe?.avatar.name ?? j.vibeId
  const personaTitle = vibe?.title ?? 'House persona'
  return {
    id: `jetset-${j.vibeId}`,
    vibeId: j.vibeId,
    series: 'jetset' as ReelSeries,
    generation: 3 as ReelGeneration,
    title: `${name} · ${j.destination}`,
    blurb: j.blurb,
    video: `/brand/videos/reels/jetset-${j.vibeId}.mp4`,
    poster: `/brand/videos/reels/posters/jetset-${j.vibeId}.jpg`,
    motionLabel: j.motionLabel,
    href: '/quiz',
    hrefLabel: 'Find your persona',
    kicker: `${personaTitle} · Jet set`,
  }
})

/**
 * Persona ski-holiday inserts — house models on extravagant alpine holidays.
 * Link to the vibe check (/quiz).
 */
const SKI: {
  vibeId: string
  destination: string
  motionLabel: string
  blurb: string
}[] = [
  {
    vibeId: 'luxe',
    destination: 'Courchevel',
    motionLabel: 'Chalet champagne glow',
    blurb:
      'Vivienne on the terrace — cream cashmere, gold low, Alps lit like a private gallery.',
  },
  {
    vibeId: 'muse',
    destination: 'St. Moritz',
    motionLabel: 'Pink jacket, village lights',
    blurb:
      'Camille at blue hour — soft glam against snow and chalet windows. The mountain dresses up.',
  },
  {
    vibeId: 'sillage',
    destination: 'Aspen lodge',
    motionLabel: 'Fireplace trail',
    blurb:
      'Noor by the fire — perfume mist, violet wrap, snow beyond the glass. Sillage holds in the cold.',
  },
  {
    vibeId: 'atelier',
    destination: 'Gstaad gondola',
    motionLabel: 'Ivory suit, gold bag',
    blurb:
      'Margot finishes the mountain — structured bag, gold zippers, the lift as runway.',
  },
  {
    vibeId: 'dew',
    destination: 'Zermatt powder',
    motionLabel: 'Glass skin in snow light',
    blurb:
      'Isla in white on the powder morning — barrier glow that photographs expensive in thin air.',
  },
  {
    vibeId: 'gilded',
    destination: 'Verbier night',
    motionLabel: 'Emerald chalet arrival',
    blurb:
      'Aurelia at the chalet door — bronze silk, fur, emerald armor. Collector winter.',
  },
]

export const REELS_SKI: CategoryReel[] = SKI.map((j) => {
  const vibe = VIBE_LIST.find((v) => v.id === j.vibeId)
  const name = vibe?.avatar.name ?? j.vibeId
  const personaTitle = vibe?.title ?? 'House persona'
  return {
    id: `ski-${j.vibeId}`,
    vibeId: j.vibeId,
    series: 'ski' as ReelSeries,
    generation: 4 as ReelGeneration,
    title: `${name} · ${j.destination}`,
    blurb: j.blurb,
    video: `/brand/videos/reels/ski-${j.vibeId}.mp4`,
    poster: `/brand/videos/reels/posters/ski-${j.vibeId}.jpg`,
    motionLabel: j.motionLabel,
    href: '/quiz',
    hrefLabel: 'Find your persona',
    kicker: `${personaTitle} · Ski holiday`,
  }
})

/**
 * Persona Riviera inserts — summer Mediterranean extravagance.
 * Link to the vibe check (/quiz).
 */
const RIVIERA: {
  vibeId: string
  destination: string
  motionLabel: string
  blurb: string
}[] = [
  {
    vibeId: 'luxe',
    destination: 'Cap Ferrat',
    motionLabel: 'Infinity pool, cream silk',
    blurb:
      'Vivienne at the villa edge — gold low, sea glass calm, summer that never shouts.',
  },
  {
    vibeId: 'muse',
    destination: 'Mykonos night',
    motionLabel: 'Fuchsia satin, island lights',
    blurb:
      'Camille in the whitewashed lane — soft glam against the Aegean after dark.',
  },
  {
    vibeId: 'sillage',
    destination: 'Positano sunset',
    motionLabel: 'Cliff scent, violet silk',
    blurb:
      'Noor on the terrace — perfume first, pastel cliffs second. The trail holds in salt air.',
  },
  {
    vibeId: 'atelier',
    destination: 'Portofino harbor',
    motionLabel: 'Ivory linen, gold bag',
    blurb:
      'Margot finishes the dock — Riva wood, structured gold, the harbor as runway.',
  },
  {
    vibeId: 'dew',
    destination: 'Santorini morning',
    motionLabel: 'White linen, caldera light',
    blurb:
      'Isla on the terrace steps — barrier glow, blue domes, glass skin in thin sea air.',
  },
  {
    vibeId: 'gilded',
    destination: 'Saint-Tropez night',
    motionLabel: 'Emerald on the jetty',
    blurb:
      'Aurelia at the yacht lights — bronze silk, emerald armor, collector summer.',
  },
]

export const REELS_RIVIERA: CategoryReel[] = RIVIERA.map((j) => {
  const vibe = VIBE_LIST.find((v) => v.id === j.vibeId)
  const name = vibe?.avatar.name ?? j.vibeId
  const personaTitle = vibe?.title ?? 'House persona'
  return {
    id: `riviera-${j.vibeId}`,
    vibeId: j.vibeId,
    series: 'riviera' as ReelSeries,
    generation: 5 as ReelGeneration,
    title: `${name} · ${j.destination}`,
    blurb: j.blurb,
    video: `/brand/videos/reels/riviera-${j.vibeId}.mp4`,
    poster: `/brand/videos/reels/posters/riviera-${j.vibeId}.jpg`,
    motionLabel: j.motionLabel,
    href: '/quiz',
    hrefLabel: 'Find your persona',
    kicker: `${personaTitle} · Riviera`,
  }
})

/**
 * Full insert + /reels catalog (rooms + persona series).
 * Product-grid randomizer uses this entire pool — unique per page.
 */
export const CATEGORY_REELS: CategoryReel[] = [
  ...REELS_GEN1,
  ...REELS_GEN2,
  ...REELS_JETSET,
  ...REELS_SKI,
  ...REELS_RIVIERA,
]

/** Resolve series for filters / badges */
export function reelSeries(reel: CategoryReel): ReelSeries {
  if (reel.series) return reel.series
  if (reel.vibeId) return 'jetset'
  return 'room'
}

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

/** Resolved deep link for an insert card */
export function reelHref(reel: CategoryReel): string {
  if (reel.href) return reel.href
  if (reel.category) return `/shop?cat=${reel.category}`
  return '/quiz'
}

export function reelCtaLabel(reel: CategoryReel): string {
  if (reel.hrefLabel) return reel.hrefLabel
  if (reel.category) {
    return `Shop ${CATEGORY_LABELS[reel.category] ?? reel.title}`
  }
  return 'Find your persona'
}
