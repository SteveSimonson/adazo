import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Sparkles } from 'lucide-react'
import {
  bsrLeaders,
  CATEGORY_OPTIONS,
  formatExpiry,
  limitedProducts,
  limitedTimeCopy,
  shopProducts,
} from '../data/catalog'
import { HEROES } from '../data/categoryHeroes'
import { VIBE_LIST, vibePath } from '../data/vibes'
import { ProductCard } from '../components/ProductCard'
import { Seo } from '../components/Seo'
import { homeSeo } from '../lib/seoData'

const featured = [
  ...shopProducts.filter((p) => p.badge),
  ...shopProducts,
]
  .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
  .slice(0, 8)

const newArrivals = shopProducts.slice().reverse().slice(0, 4)

/** High-impact navigational promos — luxury / fashion brand energy */
const PROMO_TILES = [
  {
    to: '/shop?cat=luxury',
    kicker: 'Highest commission tier',
    title: 'Luxury Beauty',
    blurb: 'Prestige skincare & makeup — the elevated edit.',
    image: '/brand/promo/nav-luxury.jpg',
    alt: 'Luxury beauty vanity still life',
  },
  {
    to: '/shop?cat=fragrance',
    kicker: 'Gift-ready AOV',
    title: 'Fragrance',
    blurb: 'Signature scents for gifting and everyday polish.',
    image: '/brand/promo/nav-fragrance.jpg',
    alt: 'Fragrance campaign still life',
  },
  {
    to: '/shop?cat=handbags',
    kicker: 'Fashion & finish',
    title: 'Handbags',
    blurb: 'Bags that complete the look and lift cart size.',
    image: '/brand/promo/nav-fashion.jpg',
    alt: 'Fashion handbag editorial still life',
  },
  {
    to: '/shop?cat=jewelry',
    kicker: 'Everyday sparkle',
    title: 'Jewelry',
    blurb: 'Hoops, layers, and gift-ready pieces.',
    image: '/brand/promo/nav-jewelry.jpg',
    alt: 'Gold jewelry on silk',
  },
] as const

export function Home() {
  const limited = limitedTimeCopy()
  const weekLeaders = bsrLeaders(8)
  const limitedAll = limitedProducts()
  const until = formatExpiry(limited.expiresAt ?? undefined)

  return (
    <>
      <Seo {...homeSeo()} />
      <section className="relative min-h-[min(92vh,52rem)] flex items-end overflow-hidden bg-charcoal">
        <img
          src="/brand/promo/hero-luxury.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/45 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full pb-14 sm:pb-20 pt-28 sm:pt-36">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md text-white border border-white/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] mb-6">
              <Clock3 className="size-3.5 text-gold" />
              Luxury · fragrance · fashion beauty
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-semibold text-white leading-[1.05] text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              Beauty elevated. Fashion finished.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-lg leading-relaxed font-light">
              Curated Amazon Best Sellers across prestige beauty, fragrance,
              jewelry, and bags — plus everyday skincare that actually earns a
              place in your routine. Discover here. Buy on Amazon.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop?cat=luxury"
                className="btn-primary !bg-white !text-moss hover:!bg-cream !shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
              >
                Shop luxury beauty <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/shop?limited=1"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/18 transition"
              >
                This week’s drop
              </Link>
            </div>
            {until && (
              <p className="mt-6 text-sm text-white/60">
                Edit refreshes {until}
                {limited.count > 0
                  ? ` · ${limited.count} limited options live`
                  : ''}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Luxury + fashion promo navigation */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="label-micro mb-2 inline-flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Prestige & fashion
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
                Shop the elevated shelves
              </h2>
              <p className="text-ink-soft mt-2 max-w-xl font-light">
                Luxury Beauty for prestige commission yield, plus fragrance and
                fashion finishes that raise cart size.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMO_TILES.map((tile) => (
              <Link
                key={tile.to}
                to={tile.to}
                className="group relative overflow-hidden rounded-3xl border border-line aspect-[3/4] bg-charcoal shadow-[0_12px_40px_-24px_rgba(26,20,24,0.35)]"
              >
                <img
                  src={tile.image}
                  alt={tile.alt}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold mb-2">
                    {tile.kicker}
                  </p>
                  <p className="font-display text-2xl font-semibold text-white">
                    {tile.title}
                  </p>
                  <p className="text-white/75 text-sm mt-1.5 font-light">
                    {tile.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {weekLeaders.length > 0 && (
        <section className="border-b border-line bg-[#fff5f7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a3412] mb-2">
                  {limited.headline}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
                  This week’s Amazon Best Sellers
                </h2>
                <p className="text-ink-soft mt-2 max-w-xl font-light">
                  Ranked placements from Amazon’s public Best Sellers
                  lists—curated for women’s beauty on Adazo.
                </p>
              </div>
              <Link
                to="/shop?limited=1"
                className="btn-secondary text-sm"
              >
                View all {limitedAll.length || ''} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {weekLeaders.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="label-micro mb-2">Shop by category</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Find your category
            </h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-bamboo hover:underline">
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORY_OPTIONS.map((c) => {
            const hero = HEROES[c.id]
            return (
              <Link
                key={c.id}
                to={`/shop?cat=${c.id}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-card aspect-[4/5] sm:aspect-[5/4]"
              >
                {hero?.image ? (
                  <img
                    src={hero.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    style={{ objectPosition: hero.objectPosition || 'center' }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-paper-2 to-leaf/30 group-hover:scale-105 transition duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white">
                    {hero?.title || c.label}
                  </p>
                  <p className="text-white/75 text-xs sm:text-sm mt-1 line-clamp-2">
                    {hero?.blurb}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-cream border-y border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="label-micro mb-2">Editor picks</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">
                Curated for confidence
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <p className="label-micro mb-2">Vibe check</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">
          What’s your beauty energy?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIBE_LIST.map((v) => (
            <Link
              key={v.id}
              to={vibePath(v.id)}
              className={`card-soft p-5 bg-gradient-to-br ${v.gradient}`}
            >
              <p className="text-2xl mb-2">{v.emoji}</p>
              <p className="font-display text-xl font-semibold">{v.title}</p>
              <p className="text-sm text-ink-soft mt-1">{v.tagline}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/quiz" className="btn-primary">
            Take the vibe check <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
            <h2 className="font-display text-3xl font-semibold mb-8">
              More from the house
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
