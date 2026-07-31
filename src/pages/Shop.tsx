import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock3, Search, X } from 'lucide-react'
import { trackShopFilter } from '../lib/analytics'
import {
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  filterProducts,
  formatExpiry,
  limitedTimeCopy,
  shopProducts,
  type Category,
} from '../data/catalog'
import { getCategoryHero } from '../data/categoryHeroes'
import { resolveCollectionToCategory } from '../data/collectionRedirect'
import { ProductGrid } from '../components/ProductGrid'
import { CategoryHero } from '../components/CategoryHero'
import { CategoryVibeCheck } from '../components/CategoryVibeCheck'
import { Seo } from '../components/Seo'
import { shopSeo } from '../lib/seoData'

export function Shop() {
  const [params, setParams] = useSearchParams()

  // Legacy ?collection= → room category (P0: single browse spine)
  useEffect(() => {
    const legacy = params.get('collection')
    if (!legacy) return
    const next = new URLSearchParams(params)
    next.delete('collection')
    const mapped = resolveCollectionToCategory(legacy)
    if (mapped && !next.get('cat')) next.set('cat', mapped)
    setParams(next, { replace: true })
  }, [params, setParams])

  const cat = (params.get('cat') as Category | '') || ''
  const q = params.get('q') || ''
  const limited = params.get('limited') === '1'

  // Track filter/search changes (debounced for typing)
  const filterKey = `${cat}|${limited ? 1 : 0}|${q}`
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      trackShopFilter({
        category: cat || undefined,
        limited,
        query: q || undefined,
      })
    }, q ? 450 : 0)
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current)
    }
  }, [filterKey, cat, limited, q])

  const filtered = useMemo(
    () => filterProducts({ cat, q, limited }),
    [cat, q, limited],
  )
  const drop = limitedTimeCopy()
  const until = formatExpiry(drop.expiresAt ?? undefined)
  const categoryHero = getCategoryHero(cat || null)
  const showCategoryHero = Boolean(cat && categoryHero)
  const houseTotal = shopProducts.length
  const catLabel = cat ? CATEGORY_LABELS[cat as Category] : null

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(params)
    next.delete('collection') // never reintroduce dual filter
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === '') next.delete(key)
      else next.set(key, value)
    }
    setParams(next, { replace: true })
  }

  function clearAllFilters() {
    setParams({}, { replace: true })
  }

  const hasFilters = Boolean(cat || q || limited)

  return (
    <div className="pb-28">
      <Seo {...shopSeo({ cat, limited, q })} />
      {showCategoryHero && categoryHero ? (
        <CategoryHero
          content={categoryHero}
          limited={limited}
          productCount={filtered.length}
        />
      ) : null}

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 pb-12 ${
          showCategoryHero ? 'pt-8 sm:pt-10' : 'pt-12'
        }`}
      >
        {!showCategoryHero && (
          <>
            <p className="label-micro mb-2">Shop</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              {limited ? 'This week’s selection' : 'The collection'}
            </h1>
            <p className="text-ink-soft mt-3 max-w-xl text-lg font-light leading-relaxed">
              {limited
                ? `You’re viewing a short weekly list — ${filtered.length} of ${houseTotal} pieces in the house.`
                : 'Every room of the house — for treating yourself, or for the woman you love. Discover here; complete your purchase on Amazon.'}
            </p>
          </>
        )}

        {/* Unmistakable limited-mode banner — always when ?limited=1 */}
        {limited && (
          <div
            role="status"
            aria-live="polite"
            className={`${showCategoryHero ? 'mt-0' : 'mt-6'} rounded-2xl border-2 border-[#c2410c] bg-[#fff7ed] px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 shadow-[0_8px_30px_-16px_rgba(154,52,18,0.35)]`}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9a3412] text-white">
                <Clock3 className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a3412]">
                  Filter on · This week only
                </p>
                <p className="mt-1 text-sm text-[#9a3412]/95 leading-snug">
                  Showing{' '}
                  <strong className="font-semibold">
                    {filtered.length}{' '}
                    {filtered.length === 1 ? 'piece' : 'pieces'}
                  </strong>
                  {catLabel ? (
                    <>
                      {' '}
                      in <strong className="font-semibold">{catLabel}</strong>
                    </>
                  ) : null}
                  {' '}
                  — not the full house ({houseTotal}).
                  {until ? ` Rotates ${until}.` : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateParams({ limited: null })}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#9a3412] text-white px-4 py-2.5 text-sm font-bold hover:bg-[#7c2d12] transition"
            >
              <X className="size-3.5" aria-hidden />
              Show full collection
            </button>
          </div>
        )}

        {/* Active filter chips */}
        {hasFilters && (
          <div
            className={`${limited || !showCategoryHero ? 'mt-4' : 'mt-0'} flex flex-wrap items-center gap-2`}
            aria-label="Active filters"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted mr-1">
              Filtering
            </span>
            {limited && (
              <FilterChip
                label="This week only"
                tone="limited"
                onRemove={() => updateParams({ limited: null })}
              />
            )}
            {catLabel && (
              <FilterChip
                label={catLabel}
                onRemove={() => updateParams({ cat: null })}
              />
            )}
            {q && (
              <FilterChip
                label={`“${q}”`}
                onRemove={() => updateParams({ q: null })}
              />
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-sm font-semibold text-bamboo hover:underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        <div
          className={`mb-6 flex flex-wrap gap-3 items-center ${
            hasFilters || limited ? 'mt-5' : showCategoryHero ? '' : 'mt-8'
          }`}
        >
          <label className="sr-only" htmlFor="search">
            Search
          </label>
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted"
              aria-hidden
            />
            <input
              id="search"
              type="search"
              value={q}
              onChange={(e) => updateParams({ q: e.target.value || null })}
              placeholder="Search the house…"
              className="w-full rounded-2xl border border-line bg-card pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:border-bamboo focus:ring-2 focus:ring-bamboo/15"
            />
          </div>
          <button
            type="button"
            aria-pressed={limited}
            onClick={() => updateParams({ limited: limited ? null : '1' })}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition inline-flex items-center gap-1.5 border-2 ${
              limited
                ? 'bg-[#9a3412] border-[#9a3412] text-white shadow-sm ring-2 ring-[#9a3412]/25'
                : 'bg-card border-line text-[#9a3412] hover:border-[#9a3412]/50'
            }`}
          >
            <Clock3 className="size-3.5" aria-hidden />
            {limited ? 'This week · On' : 'This week only'}
          </button>
        </div>

        {/* Single room taxonomy */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => updateParams({ cat: null })}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !cat
                ? 'bg-ink text-paper'
                : 'bg-card border border-line hover:border-bamboo/40'
            }`}
          >
            All rooms
          </button>
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                updateParams({
                  cat: cat === c.id ? null : c.id,
                })
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                cat === c.id
                  ? 'bg-ink text-paper'
                  : 'bg-card border border-line hover:border-bamboo/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm font-semibold text-ink-soft">
            {limited ? (
              <>
                <span className="text-[#9a3412]">This week</span>
                {catLabel ? ` · ${catLabel}` : ''}
                {q ? ` · “${q}”` : ''}
                {' · '}
                {filtered.length} of {houseTotal} in the house
              </>
            ) : (
              <>
                {catLabel || 'All rooms'}
                {q ? ` · “${q}”` : ''}
                {' · '}
                {filtered.length}{' '}
                {filtered.length === 1 ? 'product' : 'products'}
                {!hasFilters ? ` · ${houseTotal} in the house` : ''}
              </>
            )}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-sm font-semibold text-bamboo hover:underline underline-offset-2"
            >
              Clear filters · full house
            </button>
          )}
        </div>

        {/* Room → vibe engagement (quiz / registration funnel) */}
        {cat ? (
          <CategoryVibeCheck category={cat as Category} placement="mid" />
        ) : null}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card p-14 text-center">
            <p className="font-display text-2xl font-semibold">No matches</p>
            <p className="text-ink-soft mt-2 max-w-md mx-auto">
              {limited
                ? 'Nothing in this week’s list matches. Turn off “This week” or clear filters to see the full house.'
                : 'Try another room or clear search.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {limited && (
                <button
                  type="button"
                  onClick={() => updateParams({ limited: null })}
                  className="btn-primary"
                >
                  Turn off This week
                </button>
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className={limited ? 'btn-secondary' : 'btn-primary'}
              >
                Show full collection
              </button>
            </div>
          </div>
        ) : (
          <ProductGrid
            products={filtered}
            listName={
              cat
                ? `shop_${cat}`
                : limited
                  ? 'shop_limited'
                  : 'shop_all'
            }
            excludeCategory={cat || null}
            minGap={2}
            maxGap={6}
            maxInserts={10}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          />
        )}

        {/* Second touch after browsing — stronger CTA */}
        {cat ? (
          <CategoryVibeCheck category={cat as Category} placement="end" />
        ) : null}
      </div>
    </div>
  )
}

function FilterChip({
  label,
  onRemove,
  tone = 'default',
}: {
  label: string
  onRemove: () => void
  tone?: 'default' | 'limited'
}) {
  const limited = tone === 'limited'
  return (
    <button
      type="button"
      onClick={onRemove}
      className={`inline-flex items-center gap-1.5 rounded-full pl-3 pr-2 py-1.5 text-xs font-bold transition ${
        limited
          ? 'bg-[#9a3412] text-white hover:bg-[#7c2d12]'
          : 'bg-ink text-paper hover:bg-charcoal'
      }`}
      aria-label={`Remove filter: ${label}`}
    >
      {limited && <Clock3 className="size-3" aria-hidden />}
      <span className="max-w-[14rem] truncate">{label}</span>
      <span
        className={`flex size-5 items-center justify-center rounded-full ${
          limited ? 'bg-white/20' : 'bg-white/15'
        }`}
      >
        <X className="size-3" aria-hidden />
      </span>
    </button>
  )
}
