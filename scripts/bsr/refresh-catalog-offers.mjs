#!/usr/bin/env node
/**
 * Write Creators offersV2 availability, checkedAt, and price into
 * src/data/products.ts. Does not invent a price or an InStock value.
 *
 *   npm run refresh:offers
 *
 * Requires AMAZON_CREATORS_CREDENTIAL_ID, AMAZON_CREATORS_CREDENTIAL_SECRET,
 * and AMAZON_CREATORS_PARTNER_TAG (or VITE_AMAZON_ASSOCIATE_TAG).
 * AMAZON_CREATORS_CREDENTIAL_VERSION defaults to 3.1.
 * AMAZON_CREATORS_MARKETPLACE defaults to www.amazon.com.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  createCreatorsClient,
  loadCreatorsEnv,
  mapCreatorsItem,
} from './creators-client.mjs'
import { patchCatalogOfferFields } from '../lib/catalog-offers.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')

/**
 * @param {{ root?: string, creators?: ReturnType<typeof createCreatorsClient> }} [options]
 */
export async function refreshCatalogOffers(options = {}) {
  const root = options.root || ROOT
  if (!options.creators) loadCreatorsEnv(join(root, '.env'))
  const creators = options.creators || createCreatorsClient()
  const file = join(root, 'src/data/products.ts')
  if (!existsSync(file)) {
    throw new Error(`Missing catalog file ${file}`)
  }
  const src = readFileSync(file, 'utf8')
  const asins = [
    ...new Set(
      [...src.matchAll(/\basin\s*:\s*['"]([A-Z0-9]{10})['"]/gi)].map((m) =>
        m[1].toUpperCase(),
      ),
    ),
  ]
  if (!asins.length) throw new Error('No ASINs in src/data/products.ts')

  console.log(`Creators offer refresh · ${asins.length} ASINs`)
  const { items, errors } = await creators.getItems(asins)
  if (errors?.length) {
    console.warn(`Creators API returned ${errors.length} item errors`)
  }
  const byAsin = new Map()
  for (const item of items || []) {
    const mapped = mapCreatorsItem(item)
    if (!mapped?.asin || !mapped.checkedAt) continue
    byAsin.set(String(mapped.asin).toUpperCase(), {
      availability: mapped.availability,
      checkedAt: mapped.checkedAt,
      price: mapped.price,
    })
  }
  const { src: next, changed } = patchCatalogOfferFields(src, byAsin)
  if (!changed) {
    throw new Error(
      'Creators offers refresh updated 0 products. Catalog left unchanged.',
    )
  }
  if (!/export const products/.test(next)) {
    throw new Error('Refusing to write products.ts without products export')
  }
  writeFileSync(file, next)
  console.log(`Updated offers on ${changed} curated products`)
  return { changed, requested: asins.length }
}

function isDirectRun() {
  const entry = process.argv[1]
  if (!entry) return false
  return import.meta.url === pathToFileURL(entry).href
}

if (isDirectRun()) {
  refreshCatalogOffers().catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })
}
