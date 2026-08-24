import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  LOOKBOOK_ROTATE_MS,
  LOOKBOOK_SLIDES,
  type LookbookSlide,
} from '../data/lookbook'

/**
 * Fashion lookbook hero.
 * Mobile: stacked 4:5 band. Desktop: 16:9 cinematic plate.
 * Type overlays the band (header is opaque in-flow — no fake overlay pad).
 * Thumbs sit on the band so in-flow copy cannot stretch the photo.
 */
export function LookbookHero({
  slides = LOOKBOOK_SLIDES,
  intervalMs = LOOKBOOK_ROTATE_MS,
}: {
  slides?: LookbookSlide[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length
  const slide = slides[index] ?? slides[0]

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  const goTo = useCallback((i: number) => {
    setIndex(((i % n) + n) % n)
  }, [n])

  useEffect(() => {
    if (paused || n <= 1) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, intervalMs)
    return () => clearInterval(t)
  }, [paused, n, intervalMs, index])

  if (!slide) return null

  return (
    <section
      className="relative bg-charcoal"
      aria-roledescription="carousel"
      aria-label="Adazo fashion lookbook"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
    >
      <div className="relative w-full overflow-hidden aspect-[4/5] md:aspect-video bg-charcoal">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            aria-hidden={i !== index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectPosition: s.objectPosition || 'center' }}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding={i === 0 ? 'sync' : 'async'}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent md:via-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/20 to-transparent md:from-charcoal/50 md:via-charcoal/10" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full pb-5 sm:pb-6 pt-5">
            <div className="max-w-xl lg:max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                Lookbook · {String(index + 1).padStart(2, '0')} /{' '}
                {String(n).padStart(2, '0')}
              </p>
              <p
                key={`kicker-${slide.id}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-2 animate-in"
              >
                {slide.kicker}
              </p>
              <h1
                key={`title-${slide.id}`}
                className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-white leading-[1.08] text-balance drop-shadow-[0_2px_28px_rgba(26,18,22,0.45)] max-w-[16ch]"
              >
                {slide.title}
              </h1>
              <p
                key={`blurb-${slide.id}`}
                className="mt-3 text-base sm:text-lg text-white/85 max-w-md leading-relaxed font-light"
              >
                {slide.blurb}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to={slide.to}
                  className="btn-primary !bg-white !text-moss hover:!bg-cream !shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] !px-6 !py-3"
                >
                  {slide.cta} <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/18 transition"
                >
                  Find your persona
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2" role="tablist" aria-label="Lookbook looks">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`${s.kicker}: ${s.title}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index
                        ? 'w-10 bg-gold'
                        : 'w-4 bg-white/35 hover:bg-white/55'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous look"
                  onClick={() => go(-1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next look"
                  onClick={() => go(1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 hidden md:grid grid-cols-6 gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={`thumb-${s.id}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`group relative overflow-hidden rounded-lg aspect-video border transition ${
                    i === index
                      ? 'border-gold ring-1 ring-gold/50'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                  aria-label={`Show ${s.title}`}
                >
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    style={{ objectPosition: s.objectPosition || 'center' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] font-bold uppercase tracking-wider text-white/90 truncate">
                    {s.kicker.replace(/^Look 0\d · /i, '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
