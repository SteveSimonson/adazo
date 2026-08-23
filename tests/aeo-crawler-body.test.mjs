import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { build } from 'esbuild'

import {
  renderCrawlerArticle,
  renderShell,
} from '../worker/renderShell.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmpDir = join(ROOT, 'node_modules/.tmp')
mkdirSync(tmpDir, { recursive: true })
const bundlePath = join(tmpDir, 'aeo-crawler-seo.bundle.mjs')

const bundled = await build({
  stdin: {
    contents: `
export { getProduct } from './src/data/catalog.ts'
export { getProductEnrichment } from './src/data/productEnrichments.ts'
export { buyerGuides } from './src/data/buyerGuides.ts'
export {
  AFFILIATE_DISCLOSURE,
  buyerGuideSeo,
  buyerGuidesHubSeo,
  finalizeRouteMeta,
  homeSeo,
  productSeo,
} from './src/lib/seoData.ts'
`,
    resolveDir: ROOT,
    sourcefile: 'aeo-crawler-seo-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
  define: {
    'import.meta.env.VITE_AMAZON_ASSOCIATE_TAG': '""',
    'import.meta.env.VITE_GA_MEASUREMENT_ID': '""',
  },
})
writeFileSync(bundlePath, bundled.outputFiles[0].text)
const {
  AFFILIATE_DISCLOSURE,
  buyerGuideSeo,
  buyerGuidesHubSeo,
  buyerGuides,
  finalizeRouteMeta,
  getProduct,
  getProductEnrichment,
  homeSeo,
  productSeo,
} = await import(`${pathToFileURL(bundlePath).href}?v=${Date.now()}`)

const SLUG = 'cerave-hydrating-facial-cleanser'

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta name="description" content="d" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://adazo.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://adazo.com/" />
    <meta property="og:title" content="x" />
    <meta property="og:description" content="d" />
    <meta property="og:image" content="https://adazo.com/brand/social.png" />
    <meta name="twitter:title" content="x" />
    <meta name="twitter:description" content="d" />
    <meta name="twitter:image" content="https://adazo.com/brand/social.png" />
    <title>Adazo</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

const OG = 'https://adazo.com/brand/social.png'

test('product crawler HTML includes h1 + a real FAQ from enrichment', () => {
  const p = getProduct(SLUG)
  assert.ok(p)
  const enrichment = getProductEnrichment(p.slug)
  assert.ok(enrichment)
  assert.ok(enrichment.faq[0]?.q)
  const meta = finalizeRouteMeta(productSeo(p, enrichment))
  assert.equal(meta.crawler?.h1, p.name)
  assert.ok(meta.crawler?.faq.some((item) => item.q === enrichment.faq[0].q))
  assert.equal(meta.crawler?.disclosure, AFFILIATE_DISCLOSURE)
  const words = meta.crawler.paragraphs.join(' ').split(/\s+/).length
  assert.ok(words >= 80, `expected substantial judgment, got ${words} words`)
  assert.ok(words <= 400, `expected ~400 word cap, got ${words} words`)
  assert.ok(meta.crawler.paragraphs.length >= 2)
  assert.ok(meta.crawler.paragraphs.length <= 6)

  const article = renderCrawlerArticle(meta.crawler)
  assert.match(article, /<article id="aeo-main">/)
  assert.match(article, new RegExp(`<h1>${p.name}</h1>`))
  assert.ok(article.includes(enrichment.faq[0].q))
  assert.match(article, /<h2>FAQ<\/h2>/)
  assert.match(article, /<dl>/)
  assert.match(article, /<h3>/)
})

test('renderShell injects crawler article before #root for a product', () => {
  const p = getProduct(SLUG)
  const enrichment = getProductEnrichment(p.slug)
  const meta = finalizeRouteMeta(productSeo(p, enrichment))
  const html = renderShell(SHELL, meta, OG)

  assert.match(html, /<article id="aeo-main">/)
  assert.match(html, new RegExp(`<h1>${p.name}</h1>`))
  assert.ok(html.includes(enrichment.faq[0].q))
  assert.ok(html.includes(AFFILIATE_DISCLOSURE))
  assert.ok(html.includes("document.documentElement.classList.add('js')"))
  assert.ok(html.includes('html.js #aeo-main'))
  assert.equal(html.includes('display:none'), false)

  const articleAt = html.indexOf('<article id="aeo-main">')
  const rootAt = html.indexOf('<div id="root"')
  assert.ok(articleAt > 0 && rootAt > articleAt)

  assert.equal(
    html.includes('iu0e3-20'),
    false,
    'Associate tag must not appear in visible crawler HTML',
  )
})

test('renderShell skips crawler article on routes without crawler meta', () => {
  const meta = finalizeRouteMeta(homeSeo())
  assert.equal(meta.crawler, undefined)
  const html = renderShell(SHELL, meta, OG)
  assert.equal(html.includes('id="aeo-main"'), false)
  assert.equal(html.includes("classList.add('js')"), false)
})

test('buyer guide and hub populate crawler from existing copy', () => {
  const g = buyerGuides[0]
  const guideMeta = finalizeRouteMeta(buyerGuideSeo(g))
  assert.equal(guideMeta.crawler?.h1, g.title)
  assert.ok(
    guideMeta.crawler?.paragraphs.some((p) => p.includes(g.dek.slice(0, 40))),
  )
  assert.ok(guideMeta.crawler?.faq.some((item) => item.q === g.faq[0].q))

  const hub = finalizeRouteMeta(buyerGuidesHubSeo())
  assert.equal(hub.crawler?.h1, 'Buyer guides — skin, SPF, hair, tools')
  assert.ok(hub.crawler?.faq.length >= 1)
  assert.ok(
    hub.crawler?.faq.some((item) => item.q === 'Why does checkout go to Amazon?'),
  )
  assert.ok(hub.crawler?.paragraphs[0])
})

test('product without enrichment uses tagline and description only', () => {
  const p = getProduct(SLUG)
  const meta = finalizeRouteMeta(productSeo(p, undefined))
  assert.equal(meta.crawler?.h1, p.name)
  assert.equal(meta.crawler?.faq.length, 0)
  assert.ok(meta.crawler?.paragraphs.includes(p.tagline))
  assert.ok(
    meta.crawler?.paragraphs.some((para) =>
      para.includes(p.description.slice(0, 20)),
    ),
  )
})
