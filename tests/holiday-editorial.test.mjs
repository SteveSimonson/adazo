import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmpDir = join(ROOT, 'node_modules/.tmp')
mkdirSync(tmpDir, { recursive: true })
const bundlePath = join(tmpDir, 'holiday-editorial.bundle.mjs')

const bundled = await build({
  stdin: {
    contents: `
export { products } from './src/data/catalog.ts'
export { getProductEnrichment } from './src/data/productEnrichments.ts'
export { AFFILIATE_DISCLOSURE, productSeo } from './src/lib/seoData.ts'
`,
    resolveDir: ROOT,
    sourcefile: 'holiday-editorial-entry.ts',
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
const { products, getProductEnrichment, AFFILIATE_DISCLOSURE, productSeo } =
  await import(`${pathToFileURL(bundlePath).href}?v=${Date.now()}`)

const TEMPLATE = 'You only want the absolute cheapest unit'

test('every shoppable Adazo product has specific editorial on the crawler path', () => {
  const verdicts = new Set()
  const caveatBlocks = new Set()
  assert.ok(products.length >= 60)
  for (const p of products) {
    const enrichment = getProductEnrichment(p.slug)
    assert.ok(enrichment, p.slug)
    const verdict = enrichment.reviewSnapshot.verdict
    assert.ok(verdict.length > 40, p.slug)
    assert.equal(verdicts.has(verdict), false, p.slug)
    verdicts.add(verdict)
    const caveats = JSON.stringify(enrichment.reviewSnapshot.caveats)
    assert.ok(enrichment.reviewSnapshot.caveats.length >= 2, p.slug)
    assert.equal(caveatBlocks.has(caveats), false, p.slug)
    caveatBlocks.add(caveats)
    assert.ok(enrichment.blog.sections.length >= 3, p.slug)
    assert.ok(enrichment.faq.length >= 4, p.slug)
    const blob = JSON.stringify(enrichment)
    assert.equal(blob.includes(TEMPLATE), false, p.slug)
    assert.equal(blob.includes('random Amazon tabs'), false, p.slug)
    assert.equal(blob.includes('iu0e3'), false, p.slug)
    const crawler = productSeo(p, enrichment).crawler
    assert.equal(crawler.disclosure, AFFILIATE_DISCLOSURE)
    const text = crawler.paragraphs.join('\n')
    assert.ok(text.includes(verdict), p.slug)
    assert.equal(text.includes(TEMPLATE), false, p.slug)
    assert.ok(crawler.faq.length >= 4, p.slug)
  }
})
