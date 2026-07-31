/**
 * Per-route SEO descriptors — single source of truth shared by the React
 * pages (client hydration via <Seo>) and the build-time route-meta generator
 * (scripts/route-meta.ts) that feeds the Worker's raw-HTML head injection.
 * Pure and isomorphic: no DOM access.
 */

import {
 CATEGORY_LABELS,
 categoryLabel,
 filterProducts,
 productGalleryThumbs,
 productImageChain,
} from '../data/catalog'
import { getCategoryHero } from '../data/categoryHeroes'
import type { Category, Product } from '../data/types'
import type { VibeProfile } from '../data/vibes'
import { isQuietPlaceholder } from './productImages'
import {
 DEFAULT_DESCRIPTION,
 DEFAULT_TITLE,
 absoluteUrl,
 breadcrumbJsonLd,
 clipMeta,
 pageTitle,
 productJsonLd,
 type PageSeo,
} from './seo'

export function homeSeo(): PageSeo {
 return {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.jpg',
 }
}

export function shopSeo(opts: {
 cat?: string
 limited?: boolean
 q?: string
}): PageSeo {
 const rawCat = opts.cat || ''
 const cat = rawCat && rawCat in CATEGORY_LABELS ? (rawCat as Category) : ''
 const limited = opts.limited === true
 const q = opts.q || ''
 const categoryHero = getCategoryHero(cat || null)
 const count = filterProducts({ cat, q, limited }).length

 const path = cat
  ? `/shop?cat=${cat}${limited ? '&limited=1' : ''}`
  : limited
   ? '/shop?limited=1'
   : q
    ? `/shop?q=${encodeURIComponent(q)}`
    : '/shop'

 const title = cat
  ? `${CATEGORY_LABELS[cat]}`
  : limited
   ? 'This week’s selection'
   : 'The collection'

 const description =
  cat && categoryHero
   ? clipMeta(
     `${categoryHero.blurb} ${count} pieces on Adazo — for you, or for her. Complete your purchase on Amazon.`,
    )
   : limited
    ? 'A short house selection this week. Discover the selection on Adazo.'
    : 'Luxury beauty, fragrance, gold, and fashion finish. Discover Adazo.'

 const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
 ]
 if (cat) {
  crumbs.push({
   name: CATEGORY_LABELS[cat],
   path: `/shop?cat=${cat}`,
  })
 } else if (limited) {
  crumbs.push({ name: 'This week', path: '/shop?limited=1' })
 }

 return {
  title,
  description,
  path,
  image: categoryHero?.image || '/brand/social.png',
  preloadImage: cat && categoryHero ? categoryHero.image : undefined,
  jsonLd: breadcrumbJsonLd(crumbs),
 }
}

export function productSeo(p: Product): PageSeo {
 const productPath = `/product/${p.slug}`
 // SL1000: og/schema images should be high-res (PDP-grade), not card thumbs
 const thumbs = productGalleryThumbs(p, 1000)
 const mainChain = productImageChain(p, 1000)
 const ogImage =
  thumbs[0] ||
  mainChain.find((u) => !isQuietPlaceholder(u) && !u.startsWith('data:')) ||
  '/brand/social.png'

 return {
  title: p.name,
  description: clipMeta(
   `${p.tagline} ${p.description} ${categoryLabel(p.category).toLowerCase()} on Adazo — buy on Amazon.`,
  ),
  path: productPath,
  image: ogImage,
  type: 'product',
  jsonLd: [
   productJsonLd({
    name: p.name,
    description: p.description || p.tagline,
    path: productPath,
    images: (thumbs.length ? thumbs : mainChain).filter(
     (u) => !isQuietPlaceholder(u),
    ),
    price: p.priceHint,
    asin: p.asin,
    brand: p.brand,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: categoryLabel(p.category),
   }),
   breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    {
     name: categoryLabel(p.category),
     path: `/shop?cat=${p.category}`,
    },
    { name: p.name, path: productPath },
   ]),
  ],
 }
}

export function vibeSeo(vibe: VibeProfile): PageSeo {
 const path = `/vibe/${vibe.id}`
 return {
  title: `${vibe.title} — Adazo persona card`,
  description: clipMeta(
   `${vibe.tagline} ${vibe.story} Meet ${vibe.avatar.name} and shop luxury beauty, fragrance, and fashion finish that match the ${vibe.title} on Adazo.`,
  ),
  path,
  image: vibe.avatar.image,
  preloadImage: vibe.scene.image,
  jsonLd: [
   {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: vibe.title,
    description: vibe.tagline,
    url: absoluteUrl(path),
   },
   breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Vibe check', path: '/quiz' },
    { name: vibe.title, path },
   ]),
  ],
 }
}

export function whySeo(): PageSeo {
 return {
  title: 'Our story — Ada Zoppi, 1726',
  description:
   'The founding legend of Adazo: Ada Zoppi in the Brianza hills, 1726. Beauty is not taught. It is passed down. Luxury for treating yourself — or the woman you love.',
  path: '/why',
  image: '/brand/social.png',
  preloadImage: '/brand/social.png',
  type: 'article',
 }
}

export function quizSeo(): PageSeo {
 return {
  title: 'Find your Adazo persona',
  description:
   'A few quiet questions. Discover which house persona you wear today — then shop the selection made for her.',
  path: '/quiz',
 }
}

export function reelsSeo(): PageSeo {
 return {
  title: 'Moving pictures',
  description:
   'Short fashion films from every room of the house — beauty, fragrance, gold, and the bag that finishes the exit.',
  path: '/reels',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.jpg',
  jsonLd: breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Films', path: '/reels' },
  ]),
 }
}

export function watchSeo(): PageSeo {
 return {
  title: 'Watch — the house on film',
  description:
   'Muted short films from Adazo: the atelier, the carpet, the café. Scroll to watch. Sound off by design.',
  path: '/watch',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.jpg',
  jsonLd: breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Watch', path: '/watch' },
  ]),
 }
}

/** Rendered head values for one route (pageTitle/clipMeta applied, absolute URLs). */
export type RouteMeta = {
 title: string
 description: string
 canonical: string
 robots: string
 ogType: 'website' | 'product'
 jsonLd: Record<string, unknown>[] | null
 /** Same-origin LCP image the Worker preloads; absent when the route has none */
 preloadImage?: string
}

/**
 * Final head values exactly as src/components/Seo.tsx computes them at runtime.
 * Used by the route-meta generator; og:image is handled separately (sitewide).
 */
export function finalizeRouteMeta(seo: PageSeo): RouteMeta {
 const jsonLd = seo.jsonLd
  ? Array.isArray(seo.jsonLd)
   ? seo.jsonLd
   : [seo.jsonLd]
  : null
 return {
  title: pageTitle(seo.title || DEFAULT_TITLE),
  description: clipMeta(seo.description || DEFAULT_DESCRIPTION),
  canonical: absoluteUrl(seo.path || '/'),
  robots: seo.noindex ? 'noindex,nofollow' : 'index,follow',
  ogType: seo.type === 'product' ? 'product' : 'website',
  jsonLd,
  // undefined keys drop out of routeMeta.json on JSON.stringify
  preloadImage: seo.preloadImage,
 }
}
