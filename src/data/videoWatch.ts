/**
 * Short-form video gallery catalog — every public brand clip we ship.
 * Muted visual feed only; not the product-grid insert pool (see reels.ts).
 */
import {
  CATEGORY_REELS,
  REELS_GEN1,
  REELS_GEN2,
  REELS_JETSET,
  reelCtaLabel,
  reelHref,
  type CategoryReel,
} from './reels'
import { VIBE_LIST } from './vibes'

export type WatchAspect = 'portrait' | 'landscape'

export type WatchClip = {
  id: string
  title: string
  subtitle: string
  video: string
  poster?: string
  aspect: WatchAspect
  /** Filter chip */
  group: 'category' | 'carpet' | 'cafe' | 'jetset' | 'all'
  /** Optional deep link */
  href?: string
  hrefLabel?: string
}

function fromReel(reel: CategoryReel): WatchClip {
  const isPersona = Boolean(reel.vibeId)
  return {
    id: reel.id,
    title: reel.title,
    subtitle: reel.motionLabel,
    video: reel.video,
    poster: reel.poster,
    aspect: 'portrait',
    group: isPersona ? 'jetset' : 'category',
    href: reelHref(reel),
    hrefLabel: reelCtaLabel(reel),
  }
}

/** Persona carpet premiere clips (16:9) */
const CARPET_CLIPS: WatchClip[] = VIBE_LIST.map((v) => {
  const carpet = v.campaigns.find(
    (c) =>
      Boolean(c.video) &&
      (/carpet/i.test(c.season) || /carpet/i.test(c.title)),
  )
  const video = carpet?.video ?? `/brand/videos/${v.id}-carpet-premiere.mp4`
  return {
    id: `carpet-${v.id}`,
    title: `${v.avatar.name} · Carpet`,
    subtitle: carpet?.title ?? `${v.title} premiere`,
    video,
    poster: carpet?.image ?? v.avatar.image,
    aspect: 'landscape' as const,
    group: 'carpet' as const,
    href: `/vibe/${v.id}`,
    hrefLabel: `Meet ${v.avatar.name}`,
  }
})

/** Persona café lifestyle films (16:9) — Amazon scroll energy */
const CAFE_CLIPS: WatchClip[] = VIBE_LIST.flatMap((v) => {
  const cafe = v.campaigns.find(
    (c) =>
      Boolean(c.video) &&
      (/café|cafe/i.test(c.season) || /café|cafe/i.test(c.title)),
  )
  if (!cafe?.video) return []
  return [
    {
      id: `cafe-${v.id}`,
      title: `${v.avatar.name} · Café`,
      subtitle: `${cafe.destination ?? 'Café'} · ${cafe.title}`,
      video: cafe.video,
      poster: cafe.image,
      aspect: 'landscape' as const,
      group: 'cafe' as const,
      href: `/vibe/${v.id}`,
      hrefLabel: `Meet ${v.avatar.name}`,
    },
  ]
})

/**
 * Full watch feed: category + jet-set + carpet + café films.
 */
export const WATCH_CLIPS: WatchClip[] = [
  ...CATEGORY_REELS.map(fromReel),
  ...CARPET_CLIPS,
  ...CAFE_CLIPS,
]

export const WATCH_CATEGORY_CLIPS = WATCH_CLIPS.filter((c) => c.group === 'category')
export const WATCH_JETSET_CLIPS = WATCH_CLIPS.filter((c) => c.group === 'jetset')
export const WATCH_CARPET_CLIPS = WATCH_CLIPS.filter((c) => c.group === 'carpet')
export const WATCH_CAFE_CLIPS = WATCH_CLIPS.filter((c) => c.group === 'cafe')

export function watchClipCount() {
  return {
    total: WATCH_CLIPS.length,
    category: WATCH_CATEGORY_CLIPS.length,
    jetset: WATCH_JETSET_CLIPS.length,
    carpet: WATCH_CARPET_CLIPS.length,
    cafe: WATCH_CAFE_CLIPS.length,
    gen1: REELS_GEN1.length,
    gen2: REELS_GEN2.length,
    jetsetPool: REELS_JETSET.length,
  }
}
