import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Seo } from '../components/Seo'
import {
  REELS_GEN1,
  REELS_GEN2,
  REELS_JETSET,
  REELS_SKI,
  reelCtaLabel,
  reelHref,
  reelSeries,
  type CategoryReel,
} from '../data/reels'
import { reelsSeo } from '../lib/seoData'
import { useEffect, useRef } from 'react'

/**
 * Short fashion films — rooms + persona series (ski, jet-set).
 */
export function ReelsPage() {
  return (
    <>
      <Seo {...reelsSeo()} />
      <section className="border-b border-line bg-gradient-to-b from-paper-2/80 to-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bamboo">
            Films
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight max-w-2xl">
            Moving pictures
          </h1>
          <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">
            Ski holidays, jet-set arrivals, and short films from every room.
            They appear in the shop scroll so the house finds you. Scroll to
            watch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/quiz" className="btn-primary">
              Find your persona
            </Link>
            <Link to="/shop" className="btn-ghost">
              Enter the house
            </Link>
          </div>
        </div>
      </section>

      <GenerationSection
        label="Ski holiday"
        blurb="Six house faces on extravagant alpine holidays — Courchevel, St. Moritz, Aspen, Gstaad, Zermatt, Verbier. Tap any film for the vibe check."
        reels={REELS_SKI}
        featured
      />
      <GenerationSection
        label="Jet set"
        blurb="Private jets, yachts, helipads — the house between cities."
        reels={REELS_JETSET}
      />
      <GenerationSection
        label="The rooms · new wave"
        blurb="Fresh light, new wardrobe, the shelves as they feel now."
        reels={REELS_GEN2}
      />
      <GenerationSection
        label="From the archive"
        blurb="Earlier studies of the same rooms — still worth a look."
        reels={REELS_GEN1}
      />
    </>
  )
}

function GenerationSection({
  label,
  blurb,
  reels,
  featured = false,
}: {
  label: string
  blurb: string
  reels: CategoryReel[]
  featured?: boolean
}) {
  if (reels.length === 0) return null
  return (
    <section
      className={`mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 ${
        featured ? '' : 'border-t border-line'
      }`}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-bamboo">
            {label}
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-ink">
            {reels.length} films
          </h2>
          <p className="mt-2 text-sm text-ink-soft max-w-lg">{blurb}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  )
}

function ReelCard({ reel }: { reel: CategoryReel }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const to = reelHref(reel)
  const cta = reelCtaLabel(reel)

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
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <article className="card-soft group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/5] bg-charcoal overflow-hidden border-b border-line/70">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${reel.title}: ${reel.motionLabel}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-90" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm border border-line/80">
            <Play className="size-3 fill-current" aria-hidden />
            {reelSeries(reel) === 'ski'
              ? 'Ski'
              : reelSeries(reel) === 'jetset'
                ? 'Persona'
                : 'Film'}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {reel.title}
          </p>
          <p className="mt-0.5 text-sm font-display font-semibold text-white leading-snug line-clamp-2">
            {reel.motionLabel}
          </p>
        </div>
      </div>
      <div className="p-3.5 sm:p-4 flex flex-col gap-2 flex-1">
        <p className="text-sm text-ink-soft line-clamp-2 leading-snug">
          {reel.blurb}
        </p>
        <div className="mt-auto pt-2">
          <Link
            to={to}
            className="btn-primary !w-full !py-2.5 !text-xs text-center"
          >
            {cta}
          </Link>
        </div>
      </div>
    </article>
  )
}
