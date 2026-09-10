import assert from 'node:assert/strict'
import test from 'node:test'

import {
  BANNED_AMAZON_IMAGE_IDS,
  LOCKED_PRIMARY_IMAGE_IDS,
  amazonImageId,
} from '../scripts/lib/amazon-image-ids.mjs'
import { qcCatalogImages, loadCatalogProducts } from '../scripts/lib/catalog-image-qc.mjs'

test('catalog products have Amazon /images/I/ galleries', () => {
  const products = loadCatalogProducts()
  assert.ok(products.length >= 60, `expected a real catalog, got ${products.length}`)
  for (const p of products) {
    assert.ok(p.images.length, `${p.slug} has no Amazon images`)
    assert.ok(p.imageIds.length, `${p.slug} has no /images/I/ stems`)
    assert.match(p.asin, /^[A-Z0-9]{10}$/, `${p.slug} ASIN`)
  }
})

test('primary image cannot silently point at a banned kitchen/home asset', () => {
  const report = qcCatalogImages()
  assert.deepEqual(report.banned, [], JSON.stringify(report.banned, null, 2))
  assert.ok(BANNED_AMAZON_IMAGE_IDS.has('81IC5+bWDgL'))
})

test('the same /images/I/ stem cannot attach to two different brands', () => {
  const report = qcCatalogImages()
  assert.deepEqual(report.crossBrand, [], JSON.stringify(report.crossBrand, null, 2))
})

test('locked beauty primaries stay on the verified ASIN art', () => {
  const products = loadCatalogProducts()
  const bySlug = new Map(products.map((p) => [p.slug, p]))
  for (const [slug, imageId] of Object.entries(LOCKED_PRIMARY_IMAGE_IDS)) {
    const p = bySlug.get(slug)
    assert.ok(p, `missing locked SKU ${slug}`)
    assert.equal(
      p.imageIds[0],
      imageId,
      `${slug} primary must be ${imageId}, got ${p.imageIds[0]}`,
    )
    assert.ok(
      p.images.every((u) => !BANNED_AMAZON_IMAGE_IDS.has(amazonImageId(u))),
      `${slug} still has a banned image`,
    )
  }
})

test('qc helper reports ok on the current catalog', () => {
  const report = qcCatalogImages()
  assert.equal(report.ok, true, JSON.stringify({
    banned: report.banned,
    missingImages: report.missingImages,
    lockedPrimary: report.lockedPrimary,
    crossBrand: report.crossBrand,
  }, null, 2))
})
