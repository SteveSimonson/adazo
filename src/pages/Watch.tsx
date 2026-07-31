import { Link } from 'react-router-dom'
import { Play, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Seo } from '../components/Seo'
import {
  WATCH_CAFE_CLIPS,
  WATCH_CARPET_CLIPS,
  WATCH_CATEGORY_CLIPS,
  WATCH_CLIPS,
  WATCH_JETSET_CLIPS,
  WATCH_RIVIERA_CLIPS,
  WATCH_SKI_CLIPS,
  watchClipCount,
  type WatchClip,
} from '../data/videoWatch'
import { watchSeo } from '../lib/seoData'

type Filter = 'all' | 'category' | 'jetset' | 'ski' | 'riviera' | 'carpet' | 'cafe'

/**
 * Visual short-film gallery — muted autoplay from the house library.
 */
export function WatchPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const counts = watchClipCount()

  const clips = useMemo(() => {
    if (filter === 'category') return WATCH_CATEGORY_CLIPS
    if (filter === 'jetset') return WATCH_JETSET_CLIPS
    if (filter === 'ski') return WATCH_SKI_CLIPS
    if (filter === 'riviera') return WATCH_RIVIERA_CLIPS
    if (filter === 'carpet') return WATCH_CARPET_CLIPS
    if (filter === 'cafe') return WATCH_CAFE_CLIPS
    return WATCH_CLIPS
  }, [filter])

  return (
    <>
      <Seo {...watchSeo()} />
      <section className="border-b border-line bg-gradient-to-b from-paper-2/80 to-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bamboo">
            Watch
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight max-w-2xl">
            The house on film
          </h1>
          <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">
            {counts.total} short films — Riviera summer, ski holidays, jet-set,
            the rooms. Scroll to play. Sound stays off until you invite it.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-xs font-semibold text-ink-soft">
            <VolumeX className="size-3.5" aria-hidden />
            Sound off by design
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ['all', `All (${counts.total})`],
                ['riviera', `Riviera (${counts.riviera})`],
                ['ski', `Ski holiday (${counts.ski})`],
                ['jetset', `Jet set (${counts.jetset})`],
                ['category', `The rooms (${counts.category})`],
                ['carpet', `The Carpet (${counts.carpet})`],
                ['cafe', `The Café (${counts.cafe})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === id
                    ? 'bg-ink text-paper'
                    : 'border border-line bg-card text-ink-soft hover:bg-paper-2'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/reels" className="btn-primary">
              All films
            </Link>
            <Link to="/shop" className="btn-ghost">
              Enter the house
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {clips.map((clip) => (
            <WatchTile key={clip.id} clip={clip} />
          ))}
        </div>
        {clips.length === 0 ? (
          <p className="text-center text-ink-soft py-16">No clips in this filter.</p>
        ) : null}
      </section>
    </>
  )
}

function WatchTile({ clip }: { clip: WatchClip }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const portrait = clip.aspect === 'portrait'

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void el.play().catch(() => {})
          } else {
            el.pause()
          }
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const groupLabel =
    clip.group === 'carpet'
      ? 'The Carpet'
      : clip.group === 'cafe'
        ? 'The Café'
        : clip.group === 'jetset'
          ? 'Jet set'
          : clip.group === 'ski'
            ? 'Ski holiday'
            : clip.group === 'riviera'
              ? 'Riviera'
              : 'The rooms'

  const body = (
    <>
      <div
        className={`relative bg-charcoal overflow-hidden border-b border-line/70 ${
          portrait ? 'aspect-[4/5]' : 'aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={clip.video}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${clip.title}: ${clip.subtitle}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/50 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 backdrop-blur-sm">
          <Play className="size-3 fill-current" aria-hidden />
          Film
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {groupLabel}
          </p>
          <p className="mt-0.5 font-display font-semibold text-white leading-snug line-clamp-2 text-base sm:text-lg">
            {clip.title}
          </p>
        </div>
      </div>
      <div className="p-3.5 sm:p-4 flex flex-col gap-2 flex-1">
        <p className="text-sm text-ink-soft line-clamp-2 leading-snug">
          {clip.subtitle}
        </p>
        {clip.href && clip.hrefLabel ? (
          <p className="mt-auto pt-1 text-[11px] font-semibold text-bamboo">
            {clip.hrefLabel} →
          </p>
        ) : null}
      </div>
    </>
  )

  return (
    <article className="card-soft group flex flex-col overflow-hidden">
      {clip.href ? (
        <Link to={clip.href} className="flex flex-col flex-1 min-h-0">
          {body}
        </Link>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">{body}</div>
      )}
    </article>
  )
}
