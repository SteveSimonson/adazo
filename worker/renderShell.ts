/**
 * SPA shell transforms: per-route head + crawler-visible body.
 * Kept separate from the Worker fetch handler so unit tests can import it.
 *
 * Product offers in route meta are a build snapshot. Freshness is decided
 * here on each request from `offerCheckedAt`, so a deploy cannot keep
 * serving availability after the 24h Creators check expires.
 */

import {
  isFreshOfferCheck,
  type CrawlerBody,
  type CrawlerLink,
  type CrawlerSection,
} from '../src/lib/seo.ts'

export type { CrawlerBody }

export type RouteMeta = {
  title: string
  description: string
  canonical: string
  robots: string
  ogType: 'website' | 'product'
  jsonLd: Record<string, unknown>[] | null
  /** ISO Creators check time for product offers in `jsonLd`. */
  offerCheckedAt?: string
  preloadImage?: string
  crawler?: CrawlerBody
}

/** Drop product offers when the Creators check is missing or older than 24h. */
export function jsonLdForRequest(
  meta: RouteMeta | null,
  now = Date.now(),
): Record<string, unknown>[] | null {
  const jsonLd = meta?.jsonLd
  if (!jsonLd?.length) return jsonLd ?? null
  const hasOffers = jsonLd.some(
    (block) => block['@type'] === 'Product' && block.offers != null,
  )
  if (!hasOffers) return jsonLd
  if (isFreshOfferCheck(meta?.offerCheckedAt, now)) return jsonLd
  return jsonLd.map((block) => {
    if (block['@type'] !== 'Product' || block.offers == null) return block
    const next = { ...block }
    delete next.offers
    return next
  })
}

export function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function escapeHtmlText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function setMetaContent(
  html: string,
  attr: 'name' | 'property',
  key: string,
  value: string,
): string {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  return html.replace(re, `$1${escapeHtmlAttr(value)}$2`)
}

function jsonLdScript(data: unknown): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/** DESIGN.md Riviera tokens for no-JS readers; visually hidden when html.js. */
const CRAWLER_HEAD = `<style>#aeo-main{font-family:"DM Sans",ui-sans-serif,system-ui,sans-serif;color:#1a1418;background:#faf7f8;max-width:42rem;margin:0 auto;padding:24px 16px 40px;line-height:1.6}#aeo-main h1,#aeo-main h2,#aeo-main h3{font-family:"Cormorant Garamond",ui-serif,Georgia,serif;font-weight:600;color:#1a1418}#aeo-main p,#aeo-main dd{color:#4a3f45}html.js #aeo-main{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style><script>document.documentElement.classList.add('js')</script>`

function renderLinkList(links: CrawlerLink[] | undefined): string {
  if (!links?.length) return ''
  const items = links
    .filter(
      (link) =>
        link.label.trim() &&
        link.href.startsWith('/') &&
        !link.href.startsWith('//'),
    )
    .map(
      (link) =>
        `<li><a href="${escapeHtmlAttr(link.href)}">${escapeHtmlText(link.label)}</a></li>`,
    )
    .join('')
  return items ? `<ul>${items}</ul>` : ''
}

function renderSections(sections: CrawlerSection[] | undefined): string {
  if (!sections?.length) return ''
  return sections
    .map((section) => {
      const paras = (section.paragraphs ?? [])
        .map((p) => `<p>${escapeHtmlText(p)}</p>`)
        .join('')
      return `<section><h2>${escapeHtmlText(section.h2)}</h2>${paras}${renderLinkList(section.links)}</section>`
    })
    .join('')
}

function houseNav(): string {
  const house = renderLinkList([
    { href: '/shop', label: 'Shop' },
    { href: '/guides', label: 'Guides' },
    { href: '/gifts', label: 'Gifts' },
    { href: '/quiz', label: 'Vibe' },
    { href: '/watch', label: 'Watch' },
    { href: '/reels', label: 'Films' },
  ])
  const about = renderLinkList([
    { href: '/about', label: 'About' },
    { href: '/why', label: 'Our story' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ])
  return `<nav aria-label="The house"><h2>The house</h2>${house}</nav><nav aria-label="About"><h2>About</h2>${about}</nav>`
}

export function renderCrawlerArticle(crawler: CrawlerBody): string {
  const paras = crawler.paragraphs
    .map((p) => `<p>${escapeHtmlText(p)}</p>`)
    .join('')
  const image =
    crawler.image?.src && crawler.image.alt.trim()
      ? `<img src="${escapeHtmlAttr(crawler.image.src)}" alt="${escapeHtmlAttr(crawler.image.alt)}">`
      : ''
  const faq =
    crawler.faq.length > 0
      ? `<section><h2>FAQ</h2><dl>${crawler.faq
          .map(
            (item) =>
              `<dt><h3>${escapeHtmlText(item.q)}</h3></dt><dd>${escapeHtmlText(item.a)}</dd>`,
          )
          .join('')}</dl></section>`
      : ''
  return `<article id="aeo-main"><h1>${escapeHtmlText(crawler.h1)}</h1>${image}${paras}${crawler.html ?? ''}${renderSections(crawler.sections)}${faq}${houseNav()}<p>${escapeHtmlText(crawler.disclosure)}</p></article>`
}

function injectCrawler(html: string, crawler: CrawlerBody): string {
  let out = html.includes('</head>')
    ? html.replace('</head>', `${CRAWLER_HEAD}</head>`)
    : html
  const article = renderCrawlerArticle(crawler)
  if (out.includes('<div id="root"')) {
    return out.replace('<div id="root"', `${article}<div id="root"`)
  }
  return out.replace('</body>', `${article}</body>`)
}

export function renderShell(
  html: string,
  meta: RouteMeta | null,
  ogImage: string,
  globalJsonLd: Record<string, unknown>[] = [],
  now = Date.now(),
): string {
  let out = html
  if (meta) {
    out = out.replace(
      /<title>[^<]*<\/title>/,
      `<title>${escapeHtmlText(meta.title)}</title>`,
    )
    out = setMetaContent(out, 'name', 'description', meta.description)
    out = setMetaContent(out, 'name', 'robots', meta.robots)
    out = out.replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${escapeHtmlAttr(meta.canonical)}$2`,
    )
    out = setMetaContent(out, 'property', 'og:type', meta.ogType)
    out = setMetaContent(out, 'property', 'og:url', meta.canonical)
    out = setMetaContent(out, 'property', 'og:title', meta.title)
    out = setMetaContent(out, 'property', 'og:description', meta.description)
    out = setMetaContent(out, 'property', 'og:image', ogImage)
    out = setMetaContent(out, 'name', 'twitter:title', meta.title)
    out = setMetaContent(out, 'name', 'twitter:description', meta.description)
    out = setMetaContent(out, 'name', 'twitter:image', ogImage)
  } else {
    out = setMetaContent(out, 'name', 'robots', 'noindex,nofollow')
  }
  const schemas = [...globalJsonLd, ...(jsonLdForRequest(meta, now) ?? [])]
  const preloadType = meta?.preloadImage?.endsWith('.webp')
    ? ' type="image/webp"'
    : ''
  const preload = meta?.preloadImage
    ? `<link rel="preload" as="image" href="${escapeHtmlAttr(meta.preloadImage)}"${preloadType} fetchpriority="high">`
    : ''
  out = out.replace(
    '</head>',
    `${preload}${schemas.map(jsonLdScript).join('')}</head>`,
  )
  if (meta?.crawler) {
    out = injectCrawler(out, meta.crawler)
  }
  return out
}
