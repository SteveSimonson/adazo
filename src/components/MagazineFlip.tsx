import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react'
import {
  MAGAZINE_PAGES,
  MAGAZINE_SERIES_FILTERS,
  type MagazinePage,
  type MagazineSeries,
} from '../data/magazine'

const TURN_MS = 480

/**
 * Adazo House Book — flippable fashion magazine on the home page.
 * Controls: chevrons, edge zones, keyboard (when focused), swipe.
 */
export function MagazineFlip({
  pages = MAGAZINE_PAGES,
}: {
  pages?: MagazinePage[]
}) {
  const [filter, setFilter] = useState<'all' | MagazineSeries>('all')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [dir, setDir] = useState<1 | -1>(1)
  const busyRef = useRef(false)
  const indexRef = useRef(0)
  const timerRef = useRef<number | null>(null)
  const touchX = useRef<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return pages
    return pages.filter(
      (p) => p.kind === 'cover' || p.series === filter,
    )
  }, [pages, filter])

  const n = filtered.length
  const safeIndex = n === 0 ? 0 : Math.min(index, n - 1)
  const page = filtered[safeIndex] ?? filtered[0]

  useEffect(() => {
    indexRef.current = safeIndex
  }, [safeIndex])

  useEffect(() => {
    setIndex(0)
    indexRef.current = 0
    setPhase('idle')
    busyRef.current = false
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [filter])

  useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current)
    }
  }, [])

  // Preload neighbors for snappy flips
  useEffect(() => {
    if (!n) return
    for (const i of [safeIndex - 1, safeIndex + 1]) {
      if (i < 0 || i >= n) continue
      const img = filtered[i]?.image
      if (!img) continue
      const el = new Image()
      el.src = img
    }
  }, [filtered, safeIndex, n])

  const go = useCallback(
    (d: 1 | -1) => {
      if (busyRef.current || n <= 1) return
      const i = indexRef.current
      const next = i + d
      if (next < 0 || next >= n) return

      busyRef.current = true
      setDir(d)
      setPhase('out')
      if (timerRef.current != null) window.clearTimeout(timerRef.current)

      timerRef.current = window.setTimeout(() => {
        indexRef.current = next
        setIndex(next)
        setPhase('in')
        timerRef.current = window.setTimeout(() => {
          setPhase('idle')
          busyRef.current = false
          timerRef.current = null
        }, Math.round(TURN_MS * 0.55))
      }, Math.round(TURN_MS * 0.45))
    },
    [n],
  )

  // Keyboard only while magazine section (or child) is focused
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [go])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const x = e.changedTouches[0]?.clientX
    if (x == null) return
    const dx = x - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  if (!page || n === 0) return null

  const canPrev = safeIndex > 0 && phase === 'idle'
  const canNext = safeIndex < n - 1 && phase === 'idle'
  const progress = n > 1 ? ((safeIndex + 1) / n) * 100 : 100

  const pageClass =
    phase === 'out'
      ? dir === 1
        ? 'magazine-page is-turning-next'
        : 'magazine-page is-turning-prev-out'
      : phase === 'in'
        ? 'magazine-page is-turning-in'
        : 'magazine-page'

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative overflow-hidden border-b border-white/10 bg-[#120e12] outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120e12]"
      aria-label="Adazo house fashion magazine"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,160,122,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(183,110,121,0.08), transparent), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(255,255,255,0.04), transparent)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-micro text-gold mb-2 inline-flex items-center gap-1.5">
              <BookOpen className="size-3.5" /> The House Book
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              The house book
            </h2>
            <p className="mt-3 text-white/55 font-light max-w-xl text-sm sm:text-base leading-relaxed">
              The atelier, abroad, the wild, the carpet — every house face, one
              volume. Use the arrows or swipe.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Magazine series">
            {MAGAZINE_SERIES_FILTERS.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition border ${
                    active
                      ? 'bg-white text-ink border-white'
                      : 'border-white/20 text-white/70 hover:border-gold/50 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto max-w-xl lg:max-w-2xl">
          <div className="absolute -inset-x-8 -bottom-6 h-16 rounded-[100%] bg-black/50 blur-2xl pointer-events-none" />

          <div
            className="magazine-book relative mx-auto aspect-[3/4] w-full select-none"
            style={{ perspective: '2200px' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute -inset-y-1 -left-1 w-3 rounded-l-sm bg-gradient-to-b from-[#2a2226] via-[#1a1418] to-[#0c0a0c] shadow-inner pointer-events-none" />
            <div className="absolute inset-0 rounded-r-sm rounded-l-[2px] bg-[#0a0809] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)] pointer-events-none" />
            <div className="pointer-events-none absolute inset-y-3 right-0 w-[3px] bg-gradient-to-b from-gold/10 via-gold/45 to-gold/10 rounded-r-sm" />

            <div
              key={`${filter}-${safeIndex}-${page.id}`}
              className={`${pageClass} absolute inset-0 origin-left rounded-r-sm overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <PageFace page={page} />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/20 to-transparent" />
            </div>

            {/* Edge hit targets — only when idle so they don't steal mid-turn */}
            <button
              type="button"
              aria-label="Previous page"
              disabled={!canPrev}
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              className="absolute inset-y-0 left-0 z-30 w-[28%] cursor-w-resize disabled:cursor-default disabled:pointer-events-none bg-transparent"
            />
            <button
              type="button"
              aria-label="Next page"
              disabled={!canNext}
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              className="absolute inset-y-0 right-0 z-30 w-[28%] cursor-e-resize disabled:cursor-default disabled:pointer-events-none bg-transparent"
            />
          </div>

          {/* Explicit controls — outside the book, always clickable */}
          <div className="relative z-40 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={!canPrev}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 text-white transition hover:border-gold hover:text-gold disabled:opacity-35 disabled:hover:border-white/25 disabled:hover:text-white"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-5" />
                <span className="text-xs font-semibold hidden sm:inline">Prev</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={!canNext}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 text-white transition hover:border-gold hover:text-gold disabled:opacity-35 disabled:hover:border-white/25 disabled:hover:text-white"
                aria-label="Next page"
              >
                <span className="text-xs font-semibold hidden sm:inline">Next</span>
                <ChevronRight className="size-5" />
              </button>
            </div>

            <div className="flex-1 min-w-[10rem] max-w-xs">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 mb-1.5">
                <span>Page {String(safeIndex + 1).padStart(2, '0')}</span>
                <span>{String(n).padStart(2, '0')}</span>
              </div>
              <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {page.to ? (
              <Link
                to={page.to}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/85 hover:border-gold hover:text-gold transition"
              >
                Meet {page.personaName ?? 'persona'}{' '}
                <Maximize2 className="size-3.5" />
              </Link>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 hidden sm:inline">
                Focus book · ← → keys
              </span>
            )}
          </div>

          {page.kind === 'spread' && (
            <div className="mt-6 text-center sm:text-left max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                {page.kicker}
                {page.destination ? ` · ${page.destination}` : ''}
              </p>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1">
                {page.title}
              </p>
              {page.personaName && (
                <p className="text-sm text-white/50 mt-1">
                  {page.personaName}
                  {page.personaTitle ? ` · ${page.personaTitle}` : ''}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PageFace({ page }: { page: MagazinePage }) {
  if (page.kind === 'cover') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1619] via-[#120e12] to-[#0a0809] flex flex-col justify-between p-8 sm:p-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Vol. 01 · Fashion
          </p>
          <div className="mt-6 h-px w-12 bg-gold/60" />
        </div>
        <div>
          <p className="font-display text-5xl sm:text-6xl font-semibold text-white tracking-[0.12em]">
            ADAZO
          </p>
          <p className="mt-3 font-display text-xl sm:text-2xl text-white/70 italic font-light">
            The House Book
          </p>
          <p className="mt-4 text-xs text-white/40 uppercase tracking-[0.2em] font-semibold max-w-[16rem] leading-relaxed">
            House · World · Wild · Carpet
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
            Fashion destination
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold/80">
            Flip →
          </p>
        </div>
        <div className="pointer-events-none absolute top-6 right-6 size-16 border border-gold/20 rounded-tl-3xl" />
        <div className="pointer-events-none absolute bottom-6 left-6 size-10 border border-white/10 rounded-br-2xl" />
      </div>
    )
  }

  if (page.kind === 'divider') {
    const tint =
      page.series === 'carpet'
        ? 'from-[#1a1014] via-[#140c10] to-[#0a0809]'
        : page.series === 'wild'
          ? 'from-[#142018] via-[#0e1410] to-[#0a0c0a]'
          : page.series === 'world'
            ? 'from-[#141820] via-[#0e1218] to-[#0a0c10]'
            : 'from-[#1a1418] via-[#120e12] to-[#0a0809]'
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tint} flex flex-col items-center justify-center text-center px-10`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold mb-4">
          {page.kicker}
        </p>
        <h3 className="font-display text-4xl sm:text-5xl font-semibold text-white">
          {page.title}
        </h3>
        <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <p className="mt-6 text-sm text-white/45 font-light max-w-xs leading-relaxed">
          {page.series === 'house' &&
            'The faces you return to — the house, season after season.'}
          {page.series === 'world' &&
            'New cities. The same quiet authority.'}
          {page.series === 'wild' &&
            'Beauty that holds when the ground is uneven.'}
          {page.series === 'carpet' &&
            'Night light, jewels free, the room already hers.'}
        </p>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-charcoal">
      {page.image && (
        <img
          src={page.image}
          alt={page.alt || page.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          decoding="async"
        />
      )}
    </div>
  )
}
