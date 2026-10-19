/** Site-wide SEO constants and helpers (canonical host: apex). */

export const SITE_URL = 'https://adazo.com'
export const SITE_NAME = 'Adazo'
export const DEFAULT_TITLE = 'Adazo — Beauty is passed down'
export const DEFAULT_DESCRIPTION =
  'A founding legend, 1726. Luxury beauty, fragrance, and fashion finish for treating yourself — or the woman you love. Discover Adazo.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/social.png`
export const TWITTER_HANDLE = '' // set if brand X account exists

export type CrawlerFaq = { q: string; a: string }

export type CrawlerLink = { href: string; label: string }

export type CrawlerSection = {
  h2: string
  paragraphs?: string[]
  links?: CrawlerLink[]
}

/** Visible HTML body for raw-fetch crawlers / answer engines (Worker injection). */
export type CrawlerBody = {
  h1: string
  paragraphs: string[]
  faq: CrawlerFaq[]
  disclosure: string
  sections?: CrawlerSection[]
  /** Page markup already published in the repo (About, Privacy, Terms). */
  html?: string
  image?: { src: string; alt: string }
}

export type PageSeo = {
  title: string
  description: string
  /** Path starting with / (no origin) */
  path: string
  image?: string
  /** Same-origin LCP image the Worker preloads in the raw HTML head */
  preloadImage?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /**
   * ISO time of the Creators offers check baked into `jsonLd`.
   * The Worker re-checks this on each request and drops offers after 24h.
   */
  offerCheckedAt?: string
  crawler?: CrawlerBody
}

export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  if (pathOrUrl.startsWith('data:')) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

export function pageTitle(title: string): string {
  const t = title.trim()
  if (!t) return DEFAULT_TITLE
  if (/adazo/i.test(t)) return t
  // Keep titles under ~60 chars when possible
  const combined = `${t} | ${SITE_NAME}`
  return combined.length > 65 ? t.slice(0, 60) : combined
}

export function clipMeta(text: string, max = 160): string {
  const s = text.replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return `${s.slice(0, max - 1).trim()}…`
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/brand/logo-color.svg'),
    description: DEFAULT_DESCRIPTION,
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Schema.org Offer.availability URLs for Creators `availability.type` values. */
const SCHEMA_OFFER_AVAILABILITY: Record<string, string> = {
  IN_STOCK: 'https://schema.org/InStock',
  OUT_OF_STOCK: 'https://schema.org/OutOfStock',
  PREORDER: 'https://schema.org/PreOrder',
  BACKORDER: 'https://schema.org/BackOrder',
}

/**
 * Offers older than this are omitted.
 * `productJsonLd` applies the cutoff for the live React render.
 * Route meta is a build snapshot, so the Worker applies the same cutoff
 * again at request time (`renderShell`) using `offerCheckedAt`.
 */
export const OFFER_AVAILABILITY_MAX_AGE_MS = 24 * 60 * 60 * 1000

export function schemaOfferAvailability(
  availability: string | undefined,
): string | undefined {
  if (!availability) return undefined
  return SCHEMA_OFFER_AVAILABILITY[availability]
}

/** True when `checkedAt` is a real timestamp no older than 24h and not in the future. */
export function isFreshOfferCheck(
  checkedAt: string | undefined,
  now = Date.now(),
): boolean {
  if (!checkedAt) return false
  const checked = Date.parse(checkedAt)
  if (!Number.isFinite(checked)) return false
  const age = now - checked
  return age >= 0 && age <= OFFER_AVAILABILITY_MAX_AGE_MS
}

export function productJsonLd(opts: {
  name: string
  description: string
  path: string
  images: string[]
  /** Offer price from the same check as `availability` / `checkedAt`. */
  price?: number
  availability?: string
  /** ISO timestamp of the offers check. */
  checkedAt?: string
  /** Clock for the 24h freshness check. Defaults to `Date.now()`. */
  now?: number
  asin?: string
  brand?: string
  rating?: number
  reviewCount?: number
  category?: string
}) {
  const images = opts.images
    .filter((u) => u && !u.startsWith('data:'))
    .map((u) => absoluteUrl(u))
    .slice(0, 8)

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: clipMeta(opts.description, 5000),
    url: absoluteUrl(opts.path),
    image: images.length ? images : [DEFAULT_OG_IMAGE],
    brand: {
      '@type': 'Brand',
      name: opts.brand || SITE_NAME,
    },
    category: opts.category,
  }

  if (opts.asin) {
    data.sku = opts.asin
    data.gtin = undefined
  }

  const availabilityUrl = schemaOfferAvailability(opts.availability)
  const fresh = isFreshOfferCheck(opts.checkedAt, opts.now)
  // Unknown, unmapped, or stale checks omit offers entirely. Never guess InStock.
  if (opts.price != null && opts.price > 0 && availabilityUrl && fresh) {
    const asin =
      opts.asin && /^[A-Z0-9]{10}$/i.test(opts.asin) ? opts.asin : ''
    data.offers = {
      '@type': 'Offer',
      url: asin
        ? `https://www.amazon.com/dp/${asin}?tag=iu0e3-20`
        : absoluteUrl(opts.path),
      priceCurrency: 'USD',
      price: opts.price.toFixed(2),
      availability: availabilityUrl,
      seller: { '@type': 'Organization', name: 'Amazon' },
    }
  }

  if (
    opts.rating != null &&
    opts.reviewCount != null &&
    opts.reviewCount > 0 &&
    opts.reviewCount % 1000 !== 0
  ) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: opts.rating,
      reviewCount: opts.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return data
}

export function faqPageJsonLd(
  faqs: { q: string; a: string }[],
  pagePath: string,
) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
    url: absoluteUrl(pagePath),
  }
}

export function itemListJsonLd(opts: {
  name: string
  path: string
  items: { name: string; path: string; position: number }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    url: absoluteUrl(opts.path),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  }
}
