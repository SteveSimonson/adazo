#!/usr/bin/env node
/**
 * Refresh Amazon product images for the current Adazo catalog.
 *
 * Prefer Creators API GetItems. On AssociateNotEligible, fall back to
 * product-page scrape for /images/I/… CDN URLs.
 *
 *   npm run refresh:images
 *   npm run refresh:images -- --creators-only
 *   npm run refresh:images -- --scrape-only
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnvFile } from 'node:process'
import {
  createCreatorsClient,
  mapCreatorsItem,
} from './creators-client.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const PRODUCT_FILES = [
  join(ROOT, 'src/data/products.ts'),
  join(ROOT, 'src/data/products.bsr.generated.ts'),
]

const args = new Set(process.argv.slice(2))
const CREATORS_ONLY = args.has('--creators-only')
const SCRAPE_ONLY = args.has('--scrape-only')

try {
  loadEnvFile(join(ROOT, '.env'))
} catch {
  /* optional */
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function upgradeAmazonImage(url) {
  if (!url) return null
  let u = String(url).replace(/^http:\/\//i, 'https://').replace(/\\u002F/g, '/')
  if (
    !/media-amazon\.com\/images\/I\//i.test(u) &&
    !/ssl-images-amazon\.com\/images\/I\//i.test(u)
  ) {
    return null
  }
  return u
    .replace(/\._AC_UL\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_UX\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_UY\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_SL\d+_/i, '._AC_SL1000_')
    .replace(/\._SX\d+_/i, '._SL1000_')
    .replace(/\._SY\d+_/i, '._SL1000_')
}

function collectAsinsFromFile(path) {
  const src = readFileSync(path, 'utf8')
  const asins = []
  for (const m of src.matchAll(/\basin\s*:\s*['"]([A-Z0-9]{10})['"]/gi)) {
    asins.push(m[1].toUpperCase())
  }
  return [...new Set(asins)]
}

function formatImagesArray(images) {
  if (!images.length) return 'images: []'
  const inner = images
    .map((u) => `      '${String(u).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`)
    .join('\n')
  return `images: [\n${inner}\n    ]`
}

/**
 * Split products.ts-style array into object chunks using brace depth,
 * then patch images inside the chunk that owns this ASIN.
 */
function patchFileImages(src, imageMap) {
  // Prefer the value array after `= [` — not TypeScript `Product[]` annotation.
  const assign = src.search(/export const \w[\w]*\s*(?::[^=]+)?=\s*\[/)
  if (assign < 0) return { src, changed: 0 }
  const arrStart = src.indexOf('[', assign)
  if (arrStart < 0) return { src, changed: 0 }

  const prefix = src.slice(0, arrStart + 1)
  const rest = src.slice(arrStart + 1)
  // find matching close of top-level array
  let depth = 1
  let i = 0
  for (; i < rest.length; i++) {
    const ch = rest[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) break
    }
  }
  const arrayBody = rest.slice(0, i)
  const suffix = rest.slice(i)

  // split into top-level objects
  const objects = []
  let start = -1
  depth = 0
  for (let j = 0; j < arrayBody.length; j++) {
    const ch = arrayBody[j]
    if (ch === '{') {
      if (depth === 0) start = j
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start >= 0) {
        objects.push(arrayBody.slice(start, j + 1))
        start = -1
      }
    }
  }

  let changed = 0
  const nextObjects = objects.map((obj) => {
    const am = obj.match(/\basin\s*:\s*['"]([A-Z0-9]{10})['"]/i)
    if (!am) return obj
    const asin = am[1].toUpperCase()
    const images = imageMap.get(asin)
    if (!images?.length) return obj

    const imagesRe = /images\s*:\s*\[[\s\S]*?\]/
    if (!imagesRe.test(obj)) return obj
    const patched = obj.replace(imagesRe, formatImagesArray(images))
    if (patched !== obj) changed += 1
    return patched
  })

  // reassemble with commas between objects
  let body = ''
  let cursor = 0
  // rebuild preserving separators between objects
  // simpler: join objects with original-style ",\n  "
  if (objects.length === 0) return { src, changed: 0 }

  // find separators by walking original arrayBody
  const parts = []
  let objIdx = 0
  let pos = 0
  while (objIdx < objects.length) {
    const obj = objects[objIdx]
    const at = arrayBody.indexOf(obj, pos)
    if (at > pos) parts.push(arrayBody.slice(pos, at))
    parts.push(nextObjects[objIdx])
    pos = at + obj.length
    objIdx++
  }
  if (pos < arrayBody.length) parts.push(arrayBody.slice(pos))

  const next = prefix + parts.join('') + suffix
  return { src: next, changed }
}

async function scrapeImages(asin) {
  const url = `https://www.amazon.com/dp/${asin}?th=1&psc=1`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(25_000),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  if (/Dog page|Enter the characters|Type the characters/i.test(html)) {
    throw new Error('blocked/captcha')
  }
  const images = []
  const push = (raw) => {
    const u = upgradeAmazonImage(raw)
    if (u && !images.includes(u)) images.push(u)
  }
  const landing = html.match(/data-old-hires="(https:\/\/[^"]+)"/)
  if (landing) push(landing[1])
  for (const m of html.matchAll(
    /"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
  )) {
    push(m[1])
  }
  for (const m of html.matchAll(
    /"large"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
  )) {
    push(m[1])
  }
  return images.slice(0, 6)
}

async function fetchViaCreators(asins) {
  const client = createCreatorsClient()
  console.log(
    `Creators API v${client.config.credentialVersion} · tag ${client.config.partnerTag} · ${client.config.marketplace}`,
  )
  await client.getAccessToken()
  console.log('Access token OK')
  const { items, errors } = await client.getItems(asins)
  if (errors?.length) {
    console.warn('GetItems errors:', JSON.stringify(errors).slice(0, 400))
  }
  const byAsin = new Map()
  for (const item of items || []) {
    const mapped = mapCreatorsItem(item)
    const imgs = (mapped.images || []).map(upgradeAmazonImage).filter(Boolean)
    if (mapped.asin && imgs.length) byAsin.set(mapped.asin.toUpperCase(), imgs)
  }
  return byAsin
}

async function main() {
  const allAsins = [
    ...new Set(PRODUCT_FILES.flatMap((f) => collectAsinsFromFile(f))),
  ]
  console.log(`Catalog ASINs: ${allAsins.length}`)

  /** @type {Map<string, string[]>} */
  let imageMap = new Map()
  let creatorsEligible = false

  if (!SCRAPE_ONLY) {
    try {
      imageMap = await fetchViaCreators(allAsins)
      creatorsEligible = true
      console.log(`Creators returned images for ${imageMap.size} ASINs`)
    } catch (e) {
      console.error(`\nCreators GetItems failed: ${e.message}`)
      if (e.body?.reason === 'AssociateNotEligible') {
        console.error(`
Amazon returned AssociateNotEligible.
Credential auth works, but this Associates account cannot call catalog APIs yet
(qualifying sales / review). Falling back to product-page scrape.
`)
      }
      if (CREATORS_ONLY) process.exit(1)
    }
  }

  if (!creatorsEligible && !CREATORS_ONLY) {
    console.log('\nScraping product pages…')
    let n = 0
    for (const asin of allAsins) {
      n += 1
      process.stdout.write(`  [${n}/${allAsins.length}] ${asin} `)
      try {
        const imgs = await scrapeImages(asin)
        if (imgs.length) {
          imageMap.set(asin, imgs)
          console.log(`ok ${imgs.length}`)
        } else {
          console.log('no images')
        }
      } catch (e) {
        console.log(`fail ${e.message}`)
      }
      await sleep(450 + Math.floor(Math.random() * 250))
    }
  }

  if (!imageMap.size) {
    console.error('No images resolved.')
    process.exit(1)
  }

  let totalChanged = 0
  for (const file of PRODUCT_FILES) {
    const src = readFileSync(file, 'utf8')
    const { src: next, changed } = patchFileImages(src, imageMap)
    if (changed) {
      // sanity: must still contain export
      if (!/export const /.test(next) || next.includes(';;;;')) {
        console.error(`Refusing to write corrupted ${file}`)
        process.exit(1)
      }
      writeFileSync(file, next)
      console.log(`Wrote ${changed} products in ${file}`)
      totalChanged += changed
    } else {
      console.log(`No image patches in ${file}`)
    }
  }

  console.log(
    `\nDone. Updated ${totalChanged} product image sets (source: ${
      creatorsEligible ? 'Creators API' : 'scrape fallback'
    }).`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
