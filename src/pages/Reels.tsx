import { Link } from 'react-router-dom'
import { ExternalLink, Play } from 'lucide-react'
import { Seo } from '../components/Seo'
import { CATEGORY_REELS } from '../data/reels'
import { reelsSeo } from '../lib/seoData'
import { useEffect, useRef } from 'react'

/**
 * Product Reels — Amazon-insert-sized (4:5) fashion clips per shop category.
 * Later: randomizer injects these into product grids; this page is the full set.
 */
export function ReelsPage() {
  return (
    <>
      <Seo {...reelsSeo()} />
      <section className="border-b border-line bg-gradient-to-b from-paper-2/80 to-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bamboo">
            Product reels
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight max-w-2xl">
            Fashion in the scroll
          </h1>
          <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">
            Short category clips in the same portrait size as product cards
            (4:5 Amazon insert). Browse every room here — later these will
            appear randomly in the shop grid.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop all
            </Link>
            <Link to="/quiz" className="btn-ghost">
              Vibe check
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_REELS.map((reel) => (
            <ReelCard key={reel.category} reel={reel} />
          ))}
        </div>
      </section>
    </>
  )
}

function ReelCard({
  reel,
}: {
  reel: (typeof CATEGORY_REELS)[number]
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const shopTo = `/shop?cat=${reel.category}`

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
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm border border-line/80">
          <Play className="size-3 fill-current" aria-hidden />
          Insert size
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
        <div className="mt-auto pt-2 flex flex-col gap-2">
          <Link
            to={shopTo}
            className="btn-primary !w-full !py-2.5 !text-xs text-center"
          >
            Shop {reel.title}
          </Link>
          <Link
            to={shopTo}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-bamboo hover:underline underline-offset-2"
          >
            Open category <ExternalLink className="size-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
