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
  magazineSpread,
  seriesBlurb,
  upcomingSpreads,
  type MagazinePage,
  type MagazineSeries,
} from '../data/magazine'

const TURN_MS = 480

/**
 * Adazo House Book — flippable fashion magazine on the home page.
 * Mobile: single 3:4 leaf. Desktop (lg+): open two-page spread.
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
  const { left: page, right: nextPage, index: safeIndex } = magazineSpread(
    filtered,
    index,
  )

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
      className="relative border-b border-white/10 bg-charcoal outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
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
        <div className="mb-8 sm:mb-10">
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
          <div
            className="mt-5 flex flex-wrap gap-2 min-w-0"
            role="tablist"
            aria-label="Magazine series"
          >
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

        <div className="relative mx-auto w-full">
          <div className="absolute -inset-x-6 -bottom-4 h-14 rounded-[100%] bg-charcoal/80 blur-2xl pointer-events-none" />

          <div
            className="magazine-book magazine-book-shell relative mx-auto w-full max-w-xl aspect-[3/4] lg:max-w-none lg:aspect-[16/10] select-none rounded-sm"
            style={{ perspective: '2200px' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Bound edge / board thickness */}
            <div className="pointer-events-none absolute -left-[5px] inset-y-2 w-[5px] rounded-l-sm bg-gradient-to-b from-wood via-gold to-wood" />
            <div className="pointer-events-none absolute inset-y-2 -right-[4px] w-[4px] rounded-r-sm bg-gradient-to-b from-paper-2 via-cream to-paper-2 shadow-inner" />

            <div
              key={`${filter}-${safeIndex}-${page.id}`}
              className={`${pageClass} absolute inset-0 origin-left overflow-hidden rounded-sm`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Mobile — single leaf */}
              <div className="absolute inset-0 lg:hidden">
                <PageFace page={page} />
              </div>

              {/* Desktop — open magazine: verso + recto */}
              <div className="hidden lg:flex absolute inset-0">
                <div className="relative h-full w-1/2 overflow-hidden">
                  <PageFace page={page} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink/15 to-transparent" />
                </div>
                <div className="magazine-gutter relative z-10 w-[3px] shrink-0" />
                <div className="relative h-full w-1/2 overflow-hidden bg-paper">
                  <RectoPage
                    page={page}
                    nextPage={nextPage}
                    contents={upcomingSpreads(filtered, safeIndex)}
                    folio={safeIndex + 1}
                    total={n}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/10 to-transparent" />
                </div>
              </div>
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
            <div className="mt-6 text-center sm:text-left max-w-xl lg:hidden">
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
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-cream to-paper-2 flex flex-col p-7 sm:p-9 lg:p-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Vol. 01 · Fashion
          </p>
          <div className="mt-5 h-px w-12 bg-gold/70" />
        </div>
        <div className="flex-1 flex flex-col justify-center py-6">
          <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink tracking-[0.12em] leading-none">
            ADAZO
          </p>
          <p className="mt-4 font-display text-xl sm:text-2xl text-ink-soft italic font-light">
            The House Book
          </p>
          <p className="mt-4 text-xs text-muted uppercase tracking-[0.2em] font-semibold max-w-[16rem] leading-relaxed">
            House · World · Wild · Carpet
          </p>
        </div>
        <div className="flex items-end justify-between gap-4 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Fashion destination
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
            Flip →
          </p>
        </div>
        <div className="pointer-events-none absolute top-6 right-6 size-16 border border-gold/35 rounded-tl-3xl" />
        <div className="pointer-events-none absolute bottom-6 left-6 size-10 border border-ink/10 rounded-br-2xl" />
      </div>
    )
  }

  if (page.kind === 'divider') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-paper to-paper-2 flex flex-col items-center justify-center text-center px-8 sm:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold mb-4">
          {page.kicker}
        </p>
        <h3 className="font-display text-4xl sm:text-5xl font-semibold text-ink">
          {page.title}
        </h3>
        <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <p className="mt-6 text-sm text-ink-soft font-light max-w-xs leading-relaxed">
          {seriesBlurb(page.series)}
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

function RectoPage({
  page,
  nextPage,
  contents,
  folio,
  total,
}: {
  page: MagazinePage
  nextPage?: MagazinePage
  contents: MagazinePage[]
  folio: number
  total: number
}) {
  // Chapter openings face the first campaign plate — a real magazine pair.
  if (page.kind === 'divider' && nextPage?.image) {
    return (
      <div className="absolute inset-0 bg-charcoal">
        <img
          src={nextPage.image}
          alt={nextPage.alt || nextPage.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper via-paper/92 to-transparent pt-20 pb-7 px-7 xl:px-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
            Next · {nextPage.kicker}
            {nextPage.destination ? ` · ${nextPage.destination}` : ''}
          </p>
          <p className="font-display text-2xl xl:text-3xl font-semibold text-ink mt-1">
            {nextPage.title}
          </p>
          {nextPage.personaName && (
            <p className="text-sm text-ink-soft mt-1">
              {nextPage.personaName}
              {nextPage.personaTitle ? ` · ${nextPage.personaTitle}` : ''}
            </p>
          )}
        </div>
      </div>
    )
  }

  const blurb =
    page.kind === 'cover'
      ? 'The atelier, abroad, the wild, the carpet — every house face, one volume. Turn the leaf; the room changes, the finish stays.'
      : seriesBlurb(page.series)

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-paper via-cream to-paper-2 px-8 py-9 xl:px-12 xl:py-12">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          {page.kind === 'cover' ? 'Contents' : page.kicker}
          {page.destination ? ` · ${page.destination}` : ''}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted tabular-nums">
          {String(folio).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>

      <div className="max-w-md min-w-0">
        <h3 className="font-display text-4xl xl:text-5xl font-semibold text-ink leading-[1.05] text-balance">
          {page.kind === 'cover' ? 'The House Book' : page.title}
        </h3>
        {page.kind === 'cover' && (
          <ul className="mt-6 space-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {MAGAZINE_SERIES_FILTERS.filter((f) => f.id !== 'all').map((f) => (
              <li key={f.id} className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold/70" />
                {f.label}
              </li>
            ))}
          </ul>
        )}
        {page.kind === 'divider' && contents.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {contents.slice(0, 6).map((item) => (
              <li
                key={item.id}
                className="text-[12px] text-ink-soft leading-snug"
              >
                <span className="font-semibold text-ink">{item.title}</span>
                {item.personaName ? ` · ${item.personaName}` : ''}
              </li>
            ))}
          </ul>
        )}
        {page.personaName && (
          <p className="mt-3 text-sm text-ink-soft">
            {page.personaName}
            {page.personaTitle ? ` · ${page.personaTitle}` : ''}
          </p>
        )}
        {blurb && (
          <p className="mt-5 text-sm xl:text-base text-ink-soft font-light leading-relaxed">
            {blurb}
          </p>
        )}
        {page.to && (
          <Link
            to={page.to}
            className="relative z-40 mt-7 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2.5 text-xs font-semibold text-ink hover:border-gold hover:text-moss transition"
          >
            Meet {page.personaName ?? 'persona'}{' '}
            <Maximize2 className="size-3.5" />
          </Link>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 pt-6 border-t border-line">
        {nextPage ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted min-w-0">
            <span className="text-gold">Next · </span>
            <span className="truncate">{nextPage.title}</span>
          </p>
        ) : (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            End of volume
          </p>
        )}
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold shrink-0">
          {page.kind === 'cover' ? 'Open →' : 'Flip →'}
        </p>
      </div>
    </div>
  )
}
