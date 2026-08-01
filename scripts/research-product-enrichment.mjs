#!/usr/bin/env node
/**
 * TinyFish research pass for product enrichment (skill template).
 *
 * Install into a target affiliate repo:
 *   cp ~/.grok/skills/product-page-enrichment/scripts/research-product-enrichment.mjs \
 *      $REPO/scripts/
 *
 * Free: search + fetch. Writes tmp/enrichment-raw/{slug}.json
 *
 * Prerequisites:
 *   - TINYFISH_API_KEY env or ~/.grok/tinyfish_api_key
 *   - Catalog JSON at tmp/*-catalog.json or tmp/kyasi-catalog.json
 *     shape: [{ id, slug, name, asin, brand?, category?, rating?, reviewCount? }, ...]
 *
 * Usage:
 *   node scripts/research-product-enrichment.mjs
 *   node scripts/research-product-enrichment.mjs --only some-slug
 *   node scripts/research-product-enrichment.mjs --force
 *   node scripts/research-product-enrichment.mjs --catalog=/path/to/catalog.json
 *
 * Then synthesize ORIGINAL prose into productEnrichments data.
 * Never paste fetched text into the site.
 * Skill: ~/.grok/skills/product-page-enrichment/SKILL.md
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'tmp', 'enrichment-raw')

function loadKey() {
  if (process.env.TINYFISH_API_KEY) return process.env.TINYFISH_API_KEY.trim()
  const p = join(process.env.HOME || '', '.grok', 'tinyfish_api_key')
  if (existsSync(p)) return readFileSync(p, 'utf8').trim()
  throw new Error('Set TINYFISH_API_KEY or create ~/.grok/tinyfish_api_key')
}

const KEY = loadKey()

async function search(query, purpose) {
  const qs = new URLSearchParams({
    query,
    purpose,
    location: 'US',
    language: 'en',
    exclude_domains: 'pinterest.com,quora.com,facebook.com',
  })
  const res = await fetch(`https://api.search.tinyfish.ai/?${qs}`, {
    headers: { 'X-API-Key': KEY },
  })
  if (!res.ok) throw new Error(`search ${res.status}: ${await res.text()}`)
  return res.json()
}

async function fetchUrls(urls, purpose) {
  const res = await fetch('https://api.fetch.tinyfish.ai/', {
    method: 'POST',
    headers: {
      'X-API-Key': KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      urls: urls.slice(0, 10),
      purpose,
      format: 'markdown',
      per_url_timeout_ms: 45000,
    }),
  })
  if (!res.ok) throw new Error(`fetch ${res.status}: ${await res.text()}`)
  return res.json()
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

const PREFER = [
  'rtings.com',
  'wirecutter.com',
  'nytimes.com',
  'cnet.com',
  'theverge.com',
  'pcmag.com',
  'soundguys.com',
  'techradar.com',
  'tomsguide.com',
  'androidauthority.com',
  'wired.com',
  'engadget.com',
  'reviewed.com',
]

async function loadCatalog() {
  const arg = process.argv.find((a) => a.startsWith('--catalog='))
  if (arg) return JSON.parse(readFileSync(arg.split('=')[1], 'utf8'))

  const candidates = [
    join(root, 'tmp', 'catalog.json'),
    join(root, 'tmp', 'kyasi-catalog.json'),
    join(root, 'tmp', 'products-catalog.json'),
  ]
  for (const dump of candidates) {
    if (existsSync(dump)) {
      console.log('catalog', dump)
      return JSON.parse(readFileSync(dump, 'utf8'))
    }
  }
  throw new Error(
    'Missing catalog JSON. Export products to tmp/catalog.json, e.g.\n' +
      '  npx tsx -e \'import {products} from "./src/data/products.ts"; import {mkdirSync,writeFileSync} from "fs"; mkdirSync("tmp",{recursive:true}); writeFileSync("tmp/catalog.json", JSON.stringify(products.map(p=>({id:p.id,slug:p.slug,name:p.name,asin:p.asin,brand:p.brand,category:p.category,rating:p.rating,reviewCount:p.reviewCount}))))\'\n' +
      'Or pass --catalog=/path/to.json',
  )
}

const only = (() => {
  const i = process.argv.indexOf('--only')
  return i >= 0 ? process.argv[i + 1] : null
})()

mkdirSync(outDir, { recursive: true })
const catalog = await loadCatalog()
const products = only
  ? catalog.filter((p) => p.slug === only || p.id === only)
  : catalog

if (!products.length) {
  console.error('No products matched')
  process.exit(1)
}

for (const p of products) {
  const outPath = join(outDir, `${p.slug}.json`)
  if (existsSync(outPath) && !process.argv.includes('--force')) {
    const st = readFileSync(outPath, 'utf8')
    if (st.length > 2000) {
      console.log('SKIP', p.slug)
      continue
    }
  }
  const name = p.name
  const purpose = `Research buyer sentiment and expert review themes for ${name} to write original affiliate product page content`
  console.log('===', p.slug, '===')
  const searches = {}
  for (const [label, q] of [
    ['reviews', `${name} review pros cons worth buying`],
    ['expert', `${name} expert review lab test comparison`],
    ['amazon_themes', `${name} common complaints praise buyers say`],
  ]) {
    try {
      searches[label] = await search(q, purpose)
      console.log('  search', label, searches[label].results?.length || 0)
      await sleep(350)
    } catch (e) {
      searches[label] = { error: String(e) }
      console.log('  search FAIL', label, e.message)
    }
  }

  const urls = []
  const seen = new Set()
  for (const data of Object.values(searches)) {
    for (const r of data.results || []) {
      const u = r.url || ''
      if (!u || seen.has(u)) continue
      if (/youtube\.com|reddit\.com|quora\.com|tiktok\.com/.test(u)) continue
      seen.add(u)
      let score = 0
      PREFER.forEach((d, i) => {
        if (u.includes(d)) score = 100 - i
      })
      urls.push([score, u])
    }
  }
  urls.sort((a, b) => b[0] - a[0])
  let fetchList = urls.slice(0, 6).map((x) => x[1])
  if (p.asin) fetchList.push(`https://www.amazon.com/dp/${p.asin}`)
  fetchList = [...new Set(fetchList)].slice(0, 8)

  let fetched = { results: [], errors: [] }
  try {
    console.log('  fetch', fetchList.length)
    fetched = await fetchUrls(fetchList, purpose)
  } catch (e) {
    console.log('  fetch FAIL', e.message)
    fetched = { results: [], errors: [{ error: String(e) }] }
  }

  const results = (fetched.results || []).map((item) => {
    const text = item.text || ''
    return {
      url: item.url,
      final_url: item.final_url,
      title: item.title,
      text: text.slice(0, 10000),
      text_len: text.length,
    }
  })

  const payload = {
    product: p,
    searchedAt: new Date().toISOString(),
    searches: Object.fromEntries(
      Object.entries(searches).map(([k, v]) => [
        k,
        v.results
          ? {
              query: v.query,
              results: (v.results || []).slice(0, 8).map((r) => ({
                title: r.title,
                url: r.url,
                snippet: r.snippet,
                site: r.site_name,
              })),
            }
          : v,
      ]),
    ),
    fetched: results,
    fetch_errors: fetched.errors || [],
  }
  writeFileSync(outPath, JSON.stringify(payload, null, 2))
  console.log('  saved', p.slug, 'ok=', results.length)
}

console.log('Done. Synthesize into src/data/productEnrichments.ts — do not paste raw text.')
