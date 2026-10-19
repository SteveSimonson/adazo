/**
 * Per-route SEO descriptors — single source of truth shared by the React
 * pages (client hydration via <Seo>) and the build-time route-meta generator
 * (scripts/route-meta.ts) that feeds the Worker's raw-HTML head injection.
 * Pure and isomorphic: no DOM access.
 */

import {
 CATEGORY_LABELS,
 CATEGORY_OPTIONS,
 categoryLabel,
 filterProducts,
 getProduct,
 limitedTimeCopy,
 productGalleryThumbs,
 productImageChain,
} from '../data/catalog'
import { LOOKBOOK_SLIDES } from '../data/lookbook'
import { VIBE_LIST } from '../data/vibes'
import { getCategoryHero } from '../data/categoryHeroes'
import { BRAND } from '../data/brand'
import { giftGuides } from '../data/giftGuides'
import { buyerGuides } from '../data/buyerGuides'
import type {
 BuyerGuide,
 Category,
 GiftGuide,
 Product,
 ProductEnrichment,
} from '../data/types'
import type { VibeProfile } from '../data/vibes'
import { isQuietPlaceholder } from './productImages'
import {
 DEFAULT_DESCRIPTION,
 DEFAULT_TITLE,
 absoluteUrl,
 breadcrumbJsonLd,
 clipMeta,
 faqPageJsonLd,
 itemListJsonLd,
 pageTitle,
 productJsonLd,
 type CrawlerBody,
 type CrawlerSection,
 type PageSeo,
} from './seo'

/** Footer one-liner — crawler disclosure only; Associate tag stays in hrefs. */
export const AFFILIATE_DISCLOSURE = BRAND.affiliateDisclosure

function collapseWs(s: string): string {
 return s.replace(/\s+/g, ' ').trim()
}

/** Keep crawler judgment in the 2–6 paragraph / ~400-word band. */
export function takeCrawlerParagraphs(
 parts: string[],
 maxWords = 400,
 maxParagraphs = 6,
): string[] {
 const out: string[] = []
 let used = 0
 for (const raw of parts) {
  const text = collapseWs(raw)
  if (!text) continue
  if (out.length >= maxParagraphs || used >= maxWords) break
  const words = text.split(' ')
  if (used + words.length <= maxWords) {
   out.push(text)
   used += words.length
   continue
  }
  const remain = maxWords - used
  if (remain >= 20) {
   out.push(`${words.slice(0, remain).join(' ')}…`)
  }
  break
 }
 return out
}

function shellCrawler(
 body: Omit<CrawlerBody, 'faq' | 'disclosure'> & {
  faq?: CrawlerBody['faq']
 },
): CrawlerBody {
 return {
  ...body,
  faq: body.faq ?? [],
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function shelfLinks(): CrawlerSection {
 return {
  h2: 'Choose your shelf',
  links: CATEGORY_OPTIONS.map((c) => ({
   href: `/shop?cat=${c.id}`,
   label: c.label,
  })),
 }
}

function productCrawler(p: Product, enrichment?: ProductEnrichment): CrawlerBody {
 if (enrichment) {
  return {
   h1: p.name,
   paragraphs: takeCrawlerParagraphs([
    enrichment.reviewSnapshot.verdict,
    ...enrichment.blog.sections.slice(0, 3).map((s) => s.body),
   ]),
   faq: enrichment.faq.map(({ q, a }) => ({ q, a })),
   disclosure: AFFILIATE_DISCLOSURE,
  }
 }
 return {
  h1: p.name,
  paragraphs: [p.tagline, p.description]
   .map((s) => (s ? collapseWs(s) : ''))
   .filter(Boolean),
  faq: [],
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function firstSentence(s: string, maxWords = 26): string {
 const text = collapseWs(s)
 const sentence = text.split(/(?<=[.!?])\s/)[0] || text
 const words = sentence.split(' ')
 if (words.length <= maxWords) return sentence
 return `${words.slice(0, maxWords).join(' ')}…`
}

function namedPicks(
 entries: { productSlug: string; pickWhy?: string; giftWhy?: string }[],
): string {
 const bits: string[] = []
 for (const entry of entries) {
  const product = getProduct(entry.productSlug)
  if (!product) continue
  const why = firstSentence(entry.pickWhy || entry.giftWhy || '')
  bits.push(why ? `${product.name}: ${why}` : product.name)
 }
 return bits.join(' ')
}

function guideCrawler(g: BuyerGuide): CrawlerBody {
 const pair = g.pairWith?.length
  ? `Pair it with, not ranked as the answer: ${namedPicks(g.pairWith)}`
  : ''
 return {
  h1: g.title,
  paragraphs: takeCrawlerParagraphs(
   [
    g.dek,
    g.intro,
    g.hardNo || '',
    namedPicks(g.productEntries),
    pair,
    ...g.sections.map((s) => `${s.heading}. ${s.body}`),
   ],
   720,
   8,
  ),
  faq: g.faq.map(({ q, a }) => ({ q, a })),
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function guidesHubCrawler(): CrawlerBody {
 const title = 'Buyer guides — skin, SPF, hair, tools'
 const description = clipMeta(
  `${buyerGuides.length} high-intent Adazo guides: retinol starts, SPF under makeup, sensitive cleansers, travel stacks, hair oil, winter body, lips, prestige creams, heat tools. Catalog-backed.`,
 )
 const intro =
  'High-intent beauty guides — retinol starts, SPF under makeup, sensitive cleansers, travel stacks, hair oil, winter body, lips, scalp habits, prestige creams, heat tools. Catalog-backed. Bought on Amazon.'
 const roster = buyerGuides.map((g) => `${g.title}. ${g.dek}`).join(' ')
 const footnote =
  'Gift listicles live under /gifts. These pages are job searches — not avatars. Editorial only; not medical advice.'
 const faq = buyerGuides[0]
  ? buyerGuides[0].faq.filter(
    (f) =>
     f.q === 'Why does checkout go to Amazon?' ||
     f.q === 'Is this medical advice?',
   )
  : []
 return {
  h1: title,
  paragraphs: takeCrawlerParagraphs([description, intro, roster, footnote]),
  faq,
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function giftsHubCrawler(): CrawlerBody {
 const title = 'Beauty gift guides'
 const description = clipMeta(
  `Christmas beauty gifts, plus edits for her, mom, wife, self-care, and under $50 — ${giftGuides.length} Adazo guides. Chosen here; buy on Amazon.`,
 )
 const roster = giftGuides.map((g) => `${g.title}. ${g.dek}`).join(' ')
 const footnote =
  'These are gift listicles, separate from the job guides under /guides. Editorial shopping notes. Bought on Amazon.'
 return {
  h1: title,
  paragraphs: takeCrawlerParagraphs([description, roster, footnote]),
  faq: giftGuides[0]?.faq.slice(0, 2) ?? [],
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function giftCrawler(g: GiftGuide): CrawlerBody {
 return {
  h1: g.title,
  paragraphs: takeCrawlerParagraphs(
   [
    g.dek,
    g.intro,
    g.decision ? `${g.decision.title}. ${g.decision.body}` : '',
    namedPicks(g.productEntries),
    ...g.sections.map((s) => s.body),
   ],
   560,
   8,
  ),
  faq: g.faq.map(({ q, a }) => ({ q, a })),
  disclosure: AFFILIATE_DISCLOSURE,
 }
}

function homeCrawler(): CrawlerBody {
 const lead = LOOKBOOK_SLIDES[0]
 return shellCrawler({
  h1: BRAND.mottoEn,
  paragraphs: [DEFAULT_DESCRIPTION, BRAND.footerBlurb, BRAND.promise],
  image: lead
   ? {
      src: '/brand/promo/lookbook-handbags.webp',
      alt: lead.alt,
     }
   : undefined,
  sections: [
   {
    h2: 'For you — or for her',
    paragraphs: [
     'The bag that finishes the exit. Gold at the collarbone. Fragrance that arrives before you do.',
    ],
    links: LOOKBOOK_SLIDES.map((slide) => ({
     href: slide.to,
     label: slide.cta,
    })),
   },
   {
    h2: 'Gifts worth unwrapping',
    paragraphs: [
     'For her, mom, wife, self-care, and under $50. Listicles from the Adazo shelf only.',
    ],
    links: [{ href: '/gifts', label: 'All gift guides' }],
   },
   shelfLinks(),
   {
    h2: 'Which woman are you today?',
    links: [
     ...VIBE_LIST.map((vibe) => ({
      href: `/vibe/${vibe.id}`,
      label: vibe.title,
     })),
     { href: '/quiz', label: 'Find your persona' },
    ],
   },
  ],
 })
}

export function homeSeo(): PageSeo {
 return {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.webp',
  crawler: homeCrawler(),
 }
}

export function shopSeo(opts: {
 cat?: string
 limited?: boolean
 q?: string
}): PageSeo {
 const rawCat = opts.cat || ''
 const cat = rawCat && rawCat in CATEGORY_LABELS ? (rawCat as Category) : ''
 const limited = opts.limited === true && limitedTimeCopy().active
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

 const shopParagraphs = [description]
 if (!cat && !limited) {
  shopParagraphs.push(
   'Every room of the house — for treating yourself, or for the woman you love. Discover the collection here.',
  )
 }
 return {
  title,
  description,
  path,
  image: categoryHero?.image || '/brand/social.png',
  preloadImage: cat && categoryHero ? categoryHero.image : undefined,
  jsonLd: breadcrumbJsonLd(crumbs),
  crawler: shellCrawler({
   h1: categoryHero?.title || title,
   paragraphs: shopParagraphs,
   sections: [shelfLinks()],
  }),
 }
}

export function productSeo(
 p: Product,
 enrichment?: ProductEnrichment,
): PageSeo {
 const productPath = `/product/${p.slug}`
 // SL1000: og/schema images should be high-res (PDP-grade), not card thumbs
 const thumbs = productGalleryThumbs(p, 1000)
 const mainChain = productImageChain(p, 1000)
 const images = (thumbs.length ? thumbs : mainChain).filter(
  (u) => u && !isQuietPlaceholder(u) && !u.startsWith('data:'),
 )
 const ogImage = images[0] || '/brand/social.png'

 const descBase = enrichment
  ? `${p.tagline} ${enrichment.reviewSnapshot.verdict}`
  : `${p.tagline} ${p.description} ${categoryLabel(p.category).toLowerCase()} on Adazo — buy on Amazon.`

 const jsonLd: Record<string, unknown>[] = [
  productJsonLd({
   name: p.name,
   description: enrichment
    ? `${p.description} ${enrichment.reviewSnapshot.verdict}`
    : p.description || p.tagline,
   path: productPath,
   images,
   price: p.price,
   availability: p.availability,
   checkedAt: p.checkedAt,
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
 ]

 if (enrichment?.faq?.length) {
  const faqLd = faqPageJsonLd(enrichment.faq, productPath)
  if (faqLd) jsonLd.push(faqLd)
 }

 return {
  title: p.name,
  description: clipMeta(descBase.replace(/\s+/g, ' ')),
  path: productPath,
  image: ogImage,
  type: 'product',
  jsonLd,
  ...(p.checkedAt ? { offerCheckedAt: p.checkedAt } : {}),
  crawler: productCrawler(p, enrichment),
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
  crawler: shellCrawler({
   h1: vibe.title,
   paragraphs: takeCrawlerParagraphs([
    vibe.tagline,
    vibe.story,
    vibe.flavor,
    vibe.signatureSetup,
   ]),
   sections: vibe.campaigns.slice(0, 2).map((campaign) => ({
    h2: campaign.title,
    paragraphs: [campaign.season, campaign.concept].filter(Boolean),
   })),
  }),
 }
}

export function whySeo(): PageSeo {
 const description =
  'The founding legend of Adazo: Ada Zoppi in the Brianza hills, 1726. Beauty is not taught. It is passed down. Luxury for treating yourself — or the woman you love.'
 return {
  title: 'Our story — Ada Zoppi, 1726',
  description,
  path: '/why',
  image: '/brand/social.png',
  preloadImage: '/brand/social.png',
  type: 'article',
  crawler: shellCrawler({
   h1: 'The founding legend',
   paragraphs: [
    description,
    BRAND.mottoIt,
    BRAND.mottoEn,
    'As it has been told, in the Brianza hills north of Milan, for three hundred years.',
   ],
   sections: [
    {
     h2: 'Chapter one · The alchemist’s atelier',
     paragraphs: [
      `In the summer of ${BRAND.founded}, in a stone house at the edge of a hill town between Milan and the lake, a young woman named ${BRAND.founder} kept a small room off her family’s kitchen where she mixed oils.`,
     ],
    },
   ],
  }),
 }
}


export function buyerGuidesHubSeo(): PageSeo {
 const title = 'Buyer guides — skin, SPF, hair, tools'
 const description = clipMeta(
  `${buyerGuides.length} high-intent Adazo guides: retinol starts, SPF under makeup, sensitive cleansers, travel stacks, hair oil, winter body, lips, prestige creams, heat tools. Catalog-backed.`,
 )
 return {
  title,
  description,
  path: '/guides',
  image: '/brand/social.png',
  jsonLd: [
   breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
   ]),
   itemListJsonLd({
    name: 'Adazo buyer guides',
    path: '/guides',
    items: buyerGuides.map((g, i) => ({
     name: g.title,
     path: `/guides/${g.slug}`,
     position: i + 1,
    })),
   }),
  ],
  crawler: guidesHubCrawler(),
 }
}

export function buyerGuideSeo(g: BuyerGuide): PageSeo {
 const path = `/guides/${g.slug}`
 const products = g.productEntries
  .map((e) => getProduct(e.productSlug))
  .filter(Boolean) as Product[]

 const jsonLd: Record<string, unknown>[] = [
  breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Guides', path: '/guides' },
   { name: g.title, path },
  ]),
  itemListJsonLd({
   name: g.title,
   path,
   items: products.map((p, i) => ({
    name: p.name,
    path: `/product/${p.slug}`,
    position: g.productEntries[i]?.rank ?? i + 1,
   })),
  }),
 ]

 if (g.faq.length) {
  const faqLd = faqPageJsonLd(g.faq, path)
  if (faqLd) jsonLd.push(faqLd)
 }

 return {
  title: g.title,
  description: clipMeta(
   `${g.dek} ${g.productEntries.length} picks on Adazo. Updated ${g.updatedAt.slice(0, 4)}.`,
  ),
  path,
  type: 'article',
  image: g.heroImage || products[0]?.images?.[0] || '/brand/social.png',
  jsonLd,
  crawler: guideCrawler(g),
 }
}

export function quizSeo(): PageSeo {
 const description =
  'A few quiet questions. Discover which house persona you wear today — then shop the selection made for her.'
 return {
  title: 'Find your Adazo persona',
  description,
  path: '/quiz',
  crawler: shellCrawler({
   h1: 'Which woman are you today?',
   paragraphs: [
    description,
    'Tap through. Meet your house persona. Leave with a selection made for her — for you, or for the woman you love.',
   ],
   sections: [
    {
     h2: 'The house personas',
     links: VIBE_LIST.map((vibe) => ({
      href: `/vibe/${vibe.id}`,
      label: vibe.title,
     })),
    },
   ],
  }),
 }
}

export function reelsSeo(): PageSeo {
 const description =
  'Short fashion films from every room of the house — beauty, fragrance, gold, and the bag that finishes the exit.'
 return {
  title: 'Moving pictures',
  description,
  path: '/reels',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.jpg',
  jsonLd: breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Films', path: '/reels' },
  ]),
  crawler: shellCrawler({
   h1: 'Moving pictures',
   paragraphs: [
    description,
    'Riviera summer, ski holidays, jet-set arrivals — and short films from every room. They appear in the shop scroll so the house finds you.',
   ],
   sections: [
    {
     h2: 'Riviera',
     paragraphs: [
      'Six house faces on the Mediterranean — Cap Ferrat, Mykonos, Positano, Portofino, Santorini, Saint-Tropez. Tap any film for the vibe check.',
     ],
     links: [{ href: '/quiz', label: 'Find your persona' }],
    },
    {
     h2: 'Ski holiday',
     paragraphs: [
      'Alpine extravagance — Courchevel, St. Moritz, Aspen, Gstaad, Zermatt, Verbier.',
     ],
     links: [{ href: '/shop', label: 'Enter the house' }],
    },
   ],
  }),
 }
}

export function watchSeo(): PageSeo {
 const description =
  'Muted short films from Adazo: the atelier, the carpet, the café. Scroll to watch. Sound off by design.'
 return {
  title: 'Watch — the house on film',
  description,
  path: '/watch',
  image: '/brand/promo/lookbook-handbags.jpg',
  preloadImage: '/brand/promo/lookbook-handbags.jpg',
  jsonLd: breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Watch', path: '/watch' },
  ]),
  crawler: shellCrawler({
   h1: 'The house on film',
   paragraphs: [
    description,
    'Scroll to play. Sound stays off until you invite it.',
   ],
  }),
 }
}

export function giftsHubSeo(): PageSeo {
 return {
  title: 'Beauty gift guides',
  description: clipMeta(
   `Christmas beauty gifts, plus edits for her, mom, wife, self-care, and under $50 — ${giftGuides.length} Adazo guides. Chosen here; buy on Amazon.`,
  ),
  path: '/gifts',
  image: '/brand/social.png',
  jsonLd: [
   breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Gifts', path: '/gifts' },
   ]),
   itemListJsonLd({
    name: 'Adazo beauty gift guides',
    path: '/gifts',
    items: giftGuides.map((g, i) => ({
     name: g.title,
     path: `/gifts/${g.slug}`,
     position: i + 1,
    })),
   }),
  ],
  crawler: giftsHubCrawler(),
 }
}

export function giftGuideSeo(g: GiftGuide): PageSeo {
 const path = `/gifts/${g.slug}`
 const products = g.productEntries
  .map((e) => getProduct(e.productSlug))
  .filter(Boolean) as Product[]

 const jsonLd: Record<string, unknown>[] = [
  breadcrumbJsonLd([
   { name: 'Home', path: '/' },
   { name: 'Gifts', path: '/gifts' },
   { name: g.title, path },
  ]),
  itemListJsonLd({
   name: g.title,
   path,
   items: products.map((p, i) => ({
    name: p.name,
    path: `/product/${p.slug}`,
    position: g.productEntries[i]?.rank ?? i + 1,
   })),
  }),
 ]

 if (g.faq.length) {
  const faqLd = faqPageJsonLd(g.faq, path)
  if (faqLd) jsonLd.push(faqLd)
 }

 return {
  title: g.title,
  description: clipMeta(
   `${g.dek} ${g.productEntries.length} beauty picks on Adazo. Updated ${g.updatedAt.slice(0, 4)}.`,
  ),
  path,
  type: 'article',
  image: g.heroImage || products[0]?.images?.[0] || '/brand/social.png',
  jsonLd,
  crawler: giftCrawler(g),
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
 /** ISO Creators check time. The Worker drops product offers 24h after this. */
 offerCheckedAt?: string
 /** Same-origin LCP image the Worker preloads; absent when the route has none */
 preloadImage?: string
 crawler?: CrawlerBody
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
  ...(seo.offerCheckedAt ? { offerCheckedAt: seo.offerCheckedAt } : {}),
  preloadImage: seo.preloadImage,
  ...(seo.crawler ? { crawler: seo.crawler } : {}),
 }
}
