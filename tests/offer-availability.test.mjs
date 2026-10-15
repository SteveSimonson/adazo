import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { mapCreatorsItem } from '../scripts/bsr/creators-client.mjs'
import { refreshCatalogOffers } from '../scripts/bsr/refresh-catalog-offers.mjs'
import { renderShell } from '../worker/renderShell.ts'
import {
  catalogOfferFields,
  isNewerOffer,
  normalizeCatalogOffer,
  offerFromLibraryItem,
  patchCatalogOfferFields,
} from '../scripts/lib/catalog-offers.mjs'
import {
  OFFER_AVAILABILITY_MAX_AGE_MS,
  productJsonLd,
} from '../src/lib/seo.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const NOW = Date.parse('2026-10-12T15:00:00.000Z')
const FRESH = '2026-10-12T14:00:00.000Z'
const STALE = '2026-10-11T14:59:59.999Z'

function baseItem(listing) {
  return {
    asin: 'B01MSSDEPK',
    itemInfo: { title: { displayValue: 'CeraVe Hydrating Facial Cleanser' } },
    offersV2: { listings: listing ? [listing] : [] },
  }
}

test('mapCreatorsItem keeps availability.type, checkedAt, and listing price', () => {
  const before = Date.now()
  const mapped = mapCreatorsItem(
    baseItem({
      isBuyBoxWinner: true,
      availability: { type: ' IN_STOCK ' },
      price: {
        money: { amount: 16.99, currency: 'USD', displayAmount: '$16.99' },
        savingBasis: { money: { amount: 19.99 } },
      },
    }),
    { price: 1, priceHint: 99 },
  )
  const after = Date.now()

  assert.equal(mapped.availability, 'IN_STOCK')
  assert.equal(mapped.price, 16.99)
  assert.equal(mapped.listPrice, 19.99)
  assert.equal(mapped.priceHint, undefined)
  const checked = Date.parse(mapped.checkedAt)
  assert.ok(checked >= before && checked <= after, mapped.checkedAt)
  assert.match(mapped.checkedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
})

test('mapCreatorsItem uses the buy box listing and does not invent a price', () => {
  const mapped = mapCreatorsItem(
    {
      asin: 'B000000000',
      itemInfo: { title: { displayValue: 'No offer' } },
      offersV2: {
        listings: [
          {
            isBuyBoxWinner: false,
            availability: { type: 'OUT_OF_STOCK' },
            price: { money: { amount: 1 } },
          },
          {
            isBuyBoxWinner: true,
            availability: { type: 'PREORDER' },
            price: { money: { amount: '24.5' } },
          },
        ],
      },
    },
    { priceHint: 50, price: 40 },
  )
  assert.equal(mapped.availability, 'PREORDER')
  assert.equal(mapped.price, 24.5)

  const empty = mapCreatorsItem(
    { asin: 'B000000001', itemInfo: { title: { displayValue: 'Empty' } } },
    { price: 12, priceHint: 12 },
  )
  assert.equal(empty.price, undefined)
  assert.equal(empty.availability, undefined)
  assert.equal(empty.listPrice, undefined)
  assert.match(empty.checkedAt, /Z$/)

  const unknown = mapCreatorsItem(
    baseItem({
      availability: { type: 'UNKNOWN' },
      price: { money: { displayAmount: '$9.99' } },
    }),
  )
  assert.equal(unknown.availability, 'UNKNOWN')
  assert.equal(unknown.price, undefined)
})

test('catalog offer fields require a real check and ignore a static price', () => {
  assert.deepEqual(catalogOfferFields({ price: 16.99, priceHint: 16.99 }), {})
  assert.deepEqual(
    catalogOfferFields({
      price: 16.99,
      availability: 'IN_STOCK',
      checkedAt: FRESH,
    }),
    { price: 16.99, availability: 'IN_STOCK', checkedAt: FRESH },
  )
  assert.deepEqual(
    catalogOfferFields({
      price: 0,
      availability: 'OUT_OF_STOCK',
      checkedAt: FRESH,
    }),
    { availability: 'OUT_OF_STOCK', checkedAt: FRESH },
  )
  assert.equal(normalizeCatalogOffer({ checkedAt: 'yesterday', price: 5 }), null)
})

test('library offer is read from attributes and only replaces an older check', () => {
  const offer = offerFromLibraryItem({
    price: 18,
    attributes: { availability: 'BACKORDER', checkedAt: FRESH },
  })
  assert.deepEqual(offer, {
    price: 18,
    availability: 'BACKORDER',
    checkedAt: FRESH,
  })
  assert.equal(isNewerOffer(undefined, FRESH), true)
  assert.equal(isNewerOffer(FRESH, FRESH), false)
  assert.equal(isNewerOffer(STALE, FRESH), true)
  assert.equal(isNewerOffer(FRESH, STALE), false)
})

const CATALOG = `import type { Product } from './types'

export const products: Product[] = [
  {
    id: 'ad-001',
    slug: 'cerave-hydrating-facial-cleanser',
    name: 'CeraVe',
    description: 'A note with a {brace} inside.',
    specs: [
      { label: 'Skin type', value: 'Normal to dry' },
    ],
    priceHint: 16.99,
    asin: 'B01MSSDEPK',
  },
  {
    id: 'ad-002',
    slug: 'other',
    priceHint: 22.99,
    price: 22.99,
    availability: 'IN_STOCK',
    checkedAt: '${STALE}',
    asin: 'B01N9SPQHQ',
  },
]
`

test('patchCatalogOfferFields writes the check and drops the static price hint', () => {
  const { src, changed } = patchCatalogOfferFields(CATALOG, {
    B01MSSDEPK: {
      price: 15.5,
      availability: 'IN_STOCK',
      checkedAt: FRESH,
    },
    B01N9SPQHQ: {
      availability: 'OUT_OF_STOCK',
      checkedAt: FRESH,
    },
  })
  assert.equal(changed, 2)
  assert.match(src, /priceHint: 15\.5,\n\s+price: 15\.5,\n\s+availability: 'IN_STOCK',\n\s+checkedAt: '2026-10-12T14:00:00\.000Z',/)
  assert.match(src, /description: 'A note with a \{brace\} inside\.'/)
  assert.match(src, /label: 'Skin type'/)
  const second = src.slice(src.indexOf("id: 'ad-002'"))
  assert.doesNotMatch(second, /(?<![A-Za-z])price:/)
  assert.doesNotMatch(second, /IN_STOCK/)
  assert.match(
    src,
    /priceHint: 22\.99,\n\s+availability: 'OUT_OF_STOCK',\n\s+checkedAt: '2026-10-12T14:00:00\.000Z',/,
  )

  const again = patchCatalogOfferFields(src, {
    B01MSSDEPK: {
      price: 15.5,
      availability: 'IN_STOCK',
      checkedAt: FRESH,
    },
  })
  assert.equal(again.changed, 0)
  assert.equal(again.src, src)
})

function offerLd(extra) {
  const data = productJsonLd({
    name: 'CeraVe',
    description: 'Cleanser',
    path: '/product/cerave-hydrating-facial-cleanser',
    images: ['/brand/social.png'],
    asin: 'B01MSSDEPK',
    now: NOW,
    ...extra,
  })
  return data.offers
}

test('productJsonLd maps a fresh offers check and never guesses', () => {
  const cases = [
    ['IN_STOCK', 'https://schema.org/InStock'],
    ['OUT_OF_STOCK', 'https://schema.org/OutOfStock'],
    ['PREORDER', 'https://schema.org/PreOrder'],
    ['BACKORDER', 'https://schema.org/BackOrder'],
  ]
  for (const [availability, url] of cases) {
    const offers = offerLd({ price: 16.99, availability, checkedAt: FRESH })
    assert.equal(offers.availability, url)
    assert.equal(offers.price, '16.99')
    assert.equal(offers.priceCurrency, 'USD')
  }

  assert.equal(offerLd({ price: 16.99, availability: 'IN_STOCK', checkedAt: STALE }), undefined)
  assert.equal(
    offerLd({
      price: 16.99,
      availability: 'IN_STOCK',
      checkedAt: new Date(NOW - OFFER_AVAILABILITY_MAX_AGE_MS).toISOString(),
    }).availability,
    'https://schema.org/InStock',
  )
  assert.equal(
    offerLd({
      price: 16.99,
      availability: 'IN_STOCK',
      checkedAt: new Date(NOW - OFFER_AVAILABILITY_MAX_AGE_MS - 1).toISOString(),
    }),
    undefined,
  )
  assert.equal(offerLd({ price: 16.99, availability: 'UNKNOWN', checkedAt: FRESH }), undefined)
  assert.equal(offerLd({ price: 16.99, availability: 'in_stock', checkedAt: FRESH }), undefined)
  assert.equal(offerLd({ price: 16.99, checkedAt: FRESH }), undefined)
  assert.equal(offerLd({ price: 16.99, availability: 'IN_STOCK' }), undefined)
  assert.equal(offerLd({ availability: 'IN_STOCK', checkedAt: FRESH }), undefined)
  assert.equal(offerLd({ price: 0, availability: 'IN_STOCK', checkedAt: FRESH }), undefined)
  assert.equal(
    offerLd({
      price: 16.99,
      availability: 'IN_STOCK',
      checkedAt: '2026-10-12T15:00:00.001Z',
    }),
    undefined,
  )

  const seoData = readFileSync(join(ROOT, 'src/lib/seoData.ts'), 'utf8')
  const call = seoData.slice(seoData.indexOf('productJsonLd({'), seoData.indexOf('productJsonLd({') + 600)
  assert.match(call, /price:\s*p\.price\b/)
  assert.doesNotMatch(call, /p\.priceHint/)
  assert.match(call, /availability:\s*p\.availability/)
  assert.match(call, /checkedAt:\s*p\.checkedAt/)
})

const SHELL = `<!doctype html><html><head><title>t</title>
<meta name="description" content="d" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="https://adazo.com/product/x" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://adazo.com/product/x" />
<meta property="og:title" content="x" />
<meta property="og:description" content="d" />
<meta property="og:image" content="https://adazo.com/brand/social.png" />
<meta name="twitter:title" content="x" />
<meta name="twitter:description" content="d" />
<meta name="twitter:image" content="https://adazo.com/brand/social.png" />
</head><body><div id="root"></div></body></html>`

function shellMeta(offerCheckedAt) {
  return {
    title: 'CeraVe',
    description: 'd',
    canonical: 'https://adazo.com/product/x',
    robots: 'index,follow',
    ogType: 'product',
    offerCheckedAt,
    jsonLd: [
      {
        '@type': 'Product',
        name: 'CeraVe',
        offers: {
          '@type': 'Offer',
          price: '16.99',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  }
}

function offersInShell(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  return blocks.flatMap((match) => {
    const data = JSON.parse(match[1])
    return data['@type'] === 'Product' && data.offers ? [data.offers] : []
  })
}

test('renderShell evaluates offer freshness at request time', () => {
  const fresh = shellMeta(FRESH)
  const freshHtml = renderShell(SHELL, fresh, 'https://adazo.com/brand/social.png', [], NOW)
  assert.equal(offersInShell(freshHtml)[0].availability, 'https://schema.org/InStock')
  assert.equal(fresh.jsonLd[0].offers.availability, 'https://schema.org/InStock')

  const staleHtml = renderShell(
    SHELL,
    shellMeta(STALE),
    'https://adazo.com/brand/social.png',
    [],
    NOW,
  )
  assert.deepEqual(offersInShell(staleHtml), [])
  assert.match(staleHtml, /"@type":"Product"/)

  const untimedHtml = renderShell(
    SHELL,
    shellMeta(undefined),
    'https://adazo.com/brand/social.png',
    [],
    NOW,
  )
  assert.deepEqual(offersInShell(untimedHtml), [])
})

test('offer refresh names missing Creators env vars and does not write the catalog', async () => {
  const catalogPath = join(ROOT, 'src/data/products.ts')
  const before = readFileSync(catalogPath, 'utf8')
  const keys = [
    'AMAZON_CREATORS_CREDENTIAL_ID',
    'AMAZON_CREATORS_CREDENTIAL_SECRET',
    'AMAZON_CREATORS_PARTNER_TAG',
    'VITE_AMAZON_ASSOCIATE_TAG',
  ]
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  for (const key of keys) delete process.env[key]
  try {
    await assert.rejects(
      () => refreshCatalogOffers(),
      /AMAZON_CREATORS_CREDENTIAL_ID[\s\S]*AMAZON_CREATORS_CREDENTIAL_SECRET[\s\S]*AMAZON_CREATORS_PARTNER_TAG or VITE_AMAZON_ASSOCIATE_TAG/,
    )
  } finally {
    for (const key of keys) {
      if (saved[key] == null) delete process.env[key]
      else process.env[key] = saved[key]
    }
  }
  assert.equal(readFileSync(catalogPath, 'utf8'), before)
})
