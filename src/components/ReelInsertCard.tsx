import { Link } from 'react-router-dom'
import { Play, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import {
  reelCtaLabel,
  reelHref,
  type CategoryReel,
} from '../data/reels'
import { trackEvent } from '../lib/analytics'

/**
 * Fashion film tile in product grids (same 4:5 well as ProductCard).
 * Muted autoplay when in view.
 * Category reels → shop room; persona jet-set → vibe check (/quiz).
 */
export function ReelInsertCard({
  reel,
  listName,
  compact = false,
}: {
  reel: CategoryReel
  listName: string
  compact?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const to = reelHref(reel)
  const cta = reelCtaLabel(reel)
  const isPersona = Boolean(reel.vibeId)
  const kicker = reel.kicker ?? (isPersona ? 'House persona' : 'From the house')

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
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <article className="card-soft group flex flex-col overflow-hidden ring-1 ring-bamboo/25">
      <Link
        to={to}
        className="flex flex-col flex-1 min-h-0"
        onClick={() =>
          trackEvent('reel_insert_click', {
            reel_id: reel.id,
            reel_category: reel.category ?? 'persona',
            vibe_id: reel.vibeId,
            list_name: listName,
            engagement_type: isPersona ? 'persona_jetset' : 'cross_promo',
          })
        }
      >
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
            aria-label={`${reel.title} film: ${reel.motionLabel}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/20" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm border border-line/80">
              <Sparkles className="size-3 text-bamboo" aria-hidden />
              {isPersona ? 'Persona' : 'Discover'}
            </span>
          </span>
          <span className="absolute top-3 right-3 inline-flex items-center justify-center size-8 rounded-full bg-black/45 text-white backdrop-blur-sm">
            <Play className="size-3.5 fill-current ml-0.5" aria-hidden />
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
              {reel.title}
            </p>
            <p className="mt-0.5 font-display font-semibold text-white leading-snug line-clamp-2 text-base sm:text-lg">
              {reel.motionLabel}
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col flex-1 ${compact ? 'p-3.5 gap-1' : 'p-4 gap-1.5'}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-bamboo">
            {kicker}
          </p>
          <h3
            className={`font-display font-semibold leading-snug text-ink group-hover:text-bamboo transition ${
              compact ? 'text-lg' : 'text-xl'
            }`}
          >
            {isPersona ? 'Which woman are you today?' : cta}
          </h3>
          <p className="text-sm text-ink-soft line-clamp-2 leading-relaxed">
            {reel.blurb}
          </p>
          <div className="mt-auto pt-3 flex items-end justify-between gap-2 border-t border-line/70">
            <span className="text-xs font-semibold text-bamboo">{cta}</span>
            <span className="text-[11px] font-semibold text-bamboo opacity-0 group-hover:opacity-100 transition">
              Open
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link
          to={to}
          className="btn-primary !w-full !py-2.5 !text-xs text-center"
          onClick={() =>
            trackEvent('reel_insert_click', {
              reel_id: reel.id,
              reel_category: reel.category ?? 'persona',
              vibe_id: reel.vibeId,
              list_name: listName,
              engagement_type: isPersona
                ? 'persona_jetset_cta'
                : 'cross_promo_cta',
            })
          }
        >
          {cta}
        </Link>
      </div>
    </article>
  )
}
