#!/usr/bin/env node
/**
 * Catalog image QC (static). Fails on banned IDs, missing galleries,
 * locked-primary drift, and the same /images/I/{id} on two different brands.
 *
 *   npm run qc:images
 *
 * Live Amazon colorImages compare is optional (network, may be rate-limited):
 *   npm run qc:images -- --scrape
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { qcCatalogImages, loadCatalogProducts, ROOT } from './lib/catalog-image-qc.mjs'
import { extractColorImages, amazonImageId } from './lib/amazon-image-ids.mjs'

const SCRAPE = process.argv.includes('--scrape')

function printReport(report) {
  console.log(`Checked ${report.checked} catalog products`)
  if (report.banned.length) {
    console.error('BANNED image IDs:')
    for (const row of report.banned) {
      console.error(`  ${row.slug} ${row.asin} → ${row.imageId}`)
    }
  }
  if (report.missingImages.length) {
    console.error('Missing Amazon images:', report.missingImages.join(', '))
  }
  if (report.lockedPrimary.length) {
    console.error('Locked primary mismatch:')
    for (const row of report.lockedPrimary) {
      console.error(`  ${row.slug}: expected ${row.expected}, got ${row.actual}`)
    }
  }
  if (report.crossBrand.length) {
    console.error('Cross-brand shared image IDs:')
    for (const row of report.crossBrand) {
      console.error(`  ${row.imageId}: ${row.slugs.join(' + ')} (${row.brands.join(' / ')})`)
    }
  }
  if (report.sameBrandShare.length) {
    console.log('Same-brand shared image IDs (allowed, listed for review):')
    for (const row of report.sameBrandShare) {
      console.log(`  ${row.imageId}: ${row.slugs.join(' + ')}`)
    }
  }
}

async function scrapeCompare(products) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const diffs = []
  let n = 0
  for (const p of products) {
    n += 1
    process.stdout.write(`  [${n}/${products.length}] ${p.asin} ${p.slug} `)
    try {
      const res = await fetch(`https://www.amazon.com/dp/${p.asin}?th=1&psc=1`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(25_000),
        redirect: 'follow',
      })
      if (!res.ok) {
        console.log(`http ${res.status}`)
        diffs.push({ slug: p.slug, error: `HTTP ${res.status}` })
        await sleep(400)
        continue
      }
      const html = await res.text()
      if (/Dog page|Enter the characters|Type the characters/i.test(html)) {
        console.log('captcha')
        diffs.push({ slug: p.slug, error: 'captcha' })
        await sleep(800)
        continue
      }
      const scraped = extractColorImages(html).map(amazonImageId).filter(Boolean)
      const catalog = new Set(p.imageIds)
      const overlap = scraped.filter((id) => catalog.has(id))
      if (!scraped.length) {
        console.log('no colorImages')
        diffs.push({ slug: p.slug, error: 'no colorImages' })
      } else if (!overlap.length) {
        console.log(`no overlap catalog=${p.imageIds[0]} scrape=${scraped[0]}`)
        diffs.push({
          slug: p.slug,
          catalogPrimary: p.imageIds[0],
          scrapePrimary: scraped[0],
        })
      } else {
        console.log(`ok overlap=${overlap.length}`)
      }
    } catch (e) {
      console.log(`fail ${e.message}`)
      diffs.push({ slug: p.slug, error: e.message })
    }
    await sleep(350)
  }
  return diffs
}

const products = loadCatalogProducts()
const report = qcCatalogImages(products)
printReport(report)

mkdirSync(join(ROOT, 'tmp'), { recursive: true })
const out = { ...report, scraped: null }
if (SCRAPE) {
  console.log('\nScraping Amazon colorImages…')
  out.scraped = await scrapeCompare(products)
}
writeFileSync(join(ROOT, 'tmp/catalog-image-qc.json'), JSON.stringify(out, null, 2))
console.log('Wrote tmp/catalog-image-qc.json')

if (!report.ok) process.exit(1)
