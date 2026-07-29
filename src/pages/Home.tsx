import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  bigTicketProducts,
  bsrLeaders,
  CATEGORY_OPTIONS,
  limitedProducts,
  limitedTimeCopy,
  shopProducts,
} from '../data/catalog'
import { HEROES } from '../data/categoryHeroes'
import { VIBE_LIST, vibePath } from '../data/vibes'
import { ProductCard } from '../components/ProductCard'
import { LookbookHero } from '../components/LookbookHero'
import { Seo } from '../components/Seo'
import { homeSeo } from '../lib/seoData'

/** Editor picks: badge first, then highest price (big tickets lead). */
const featured = [
  ...shopProducts.filter((p) => p.badge === 'Big ticket' || p.badge === 'Luxury bag'),
  ...shopProducts.filter((p) => p.badge && p.badge !== 'Big ticket' && p.badge !== 'Luxury bag'),
  ...shopProducts.slice().sort((a, b) => (b.priceHint || 0) - (a.priceHint || 0)),
]
  .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
  .slice(0, 8)

const bigTickets = bigTicketProducts(8)

const newArrivals = shopProducts.slice().reverse().slice(0, 4)

/** High-impact navigational promos — luxury / fashion brand energy */
const PROMO_TILES = [
  {
    to: '/shop?cat=handbags',
    kicker: 'Big ticket · $900+',
    title: 'Luxury Handbags',
    blurb: 'Designer bags — LV, Gucci, Prada, and more.',
    image: '/brand/promo/nav-handbags-black.jpg',
    alt: 'Black structured designer handbag on marble',
  },
  {
    to: '/shop?cat=jewelry',
    kicker: 'Big ticket · $1,000+',
    title: 'Luxury Jewelry',
    blurb: 'Diamonds, designer pieces, and polish above $1k.',
    image: '/brand/promo/nav-jewelry-diamonds.jpg',
    alt: 'Diamond earrings bracelet and pendant on dark silk',
  },
  {
    to: '/shop?cat=watches',
    kicker: 'Big ticket · $1,000+',
    title: 'Luxury Watches',
    blurb: 'Swiss and designer timepieces for the finish.',
    image: '/brand/promo/nav-watches-steel.jpg',
    alt: 'Steel luxury watch on blue velvet',
  },
  {
    to: '/shop?cat=gold',
    kicker: 'Solid gold · $500+',
    title: 'Gold',
    blurb: '14K & 18K chains, bands, and fine gold polish.',
    image: '/brand/promo/nav-gold-cuban.jpg',
    alt: 'Solid yellow gold cuban chain and signet ring',
  },
] as const

export function Home() {
  const limited = limitedTimeCopy()
  const weekLeaders = bsrLeaders(8)
  const limitedAll = limitedProducts()

  return (
    <>
      <Seo {...homeSeo()} />
      <LookbookHero />

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
                Big-ticket designer handbags first, then prestige beauty,
                fragrance, and jewelry to finish the look.
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

      {bigTickets.length > 0 && (
        <section className="border-b border-line bg-[#1a1410] text-paper">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold mb-2">
                  Big ticket · $900+
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                  Handbags, jewelry & watches
                </h2>
                <p className="text-white/70 mt-2 max-w-xl font-light">
                  Highest-ticket fashion finish first — designer bags, fine
                  jewelry, and luxury timepieces from Amazon.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/shop?cat=handbags"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-5 py-2.5 text-sm font-bold hover:bg-cream transition"
                >
                  Handbags
                </Link>
                <Link
                  to="/shop?cat=jewelry"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-5 py-2.5 text-sm font-bold hover:bg-white/10 transition"
                >
                  Jewelry
                </Link>
                <Link
                  to="/shop?cat=watches"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-5 py-2.5 text-sm font-bold hover:bg-white/10 transition"
                >
                  Watches
                </Link>
                <Link
                  to="/shop?cat=gold"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-5 py-2.5 text-sm font-bold hover:bg-white/10 transition"
                >
                  Gold
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {bigTickets.map((p) => (
                <ProductCard key={p.id} product={p} listName="home_big_ticket" />
              ))}
            </div>
          </div>
        </section>
      )}

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
        <p className="label-micro mb-2">Adazo vibe check</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">
          What’s your luxury persona?
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
              More from Adazo
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
