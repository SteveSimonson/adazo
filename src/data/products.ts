/**
 * Adazo curated catalog — women\'s health & beauty Amazon Associates picks.
 * Purchase fulfillment via Amazon (see src/lib/amazon.ts).
 * Amazon product imagery used where ASINs are linked (authorized Associate use).
 *
 * Seed set: well-known high-demand ASINs for launch. Expand via BSR import + editorial.
 */
import type { Product } from './types'

export const products: Product[] = [
  {
    id: 'ad-001',
    slug: 'cerave-hydrating-facial-cleanser',
    name: 'CeraVe Hydrating Facial Cleanser',
    tagline: 'Gentle cleanse with ceramides — barrier-friendly daily starter.',
    description:
      'A dermatologist-developed hydrating cleanser for normal to dry skin.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'CeraVe',
    material: 'Cleanser · ceramides + hyaluronic acid',
    features: [
      'Non-foaming hydrating formula for normal to dry skin',
      'Ceramides help support the skin barrier',
      'Fragrance-free daily face wash',
      'Widely recommended drugstore staple',
    ],
    specs: [
      { label: 'Skin type', value: 'Normal to dry' },
      { label: 'Key actives', value: 'Ceramides, hyaluronic acid' },
      { label: 'Fragrance', value: 'Fragrance-free' },
    ],
    priceHint: 16.99,
    asin: 'B01MSSDEPK',
    searchKeywords: 'CeraVe Hydrating Facial Cleanser',
    badge: 'Editor pick',
    images: [
      'https://m.media-amazon.com/images/I/71V-hFCug0L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/813wb7pa79L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71kRZaBDv-L._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 90000,
    hue: 200,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 1,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-002',
    slug: 'la-roche-posay-toleriane-double-repair',
    name: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
    tagline: 'Ceramide moisturizer for a calm, resilient barrier.',
    description:
      'Oil-free daily moisturizer with ceramides and niacinamide.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'La Roche-Posay',
    material: 'Moisturizer · ceramides + niacinamide',
    features: [
      'Lightweight daily face moisturizer',
      'Niacinamide + ceramides',
      'Suitable for sensitive skin routines',
      'Oil-free finish',
    ],
    specs: [
      { label: 'Skin type', value: 'Normal to dry / sensitive-friendly' },
      { label: 'Key actives', value: 'Ceramides, niacinamide' },
      { label: 'Finish', value: 'Oil-free' },
    ],
    priceHint: 22.99,
    asin: 'B01N9SPQHQ',
    searchKeywords: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
    badge: 'Bestseller',
    images: [
      'https://m.media-amazon.com/images/I/51x78epntaL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/9116IeFE79L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91kSK0n-FnL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/716zIMHh+hL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 50000,
    hue: 210,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 2,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-003',
    slug: 'neutrogena-hydro-boost-water-gel',
    name: 'Neutrogena Hydro Boost Water Gel',
    tagline: 'Hyaluronic hydration that feels like water, not weight.',
    description:
      'Oil-free hyaluronic acid water gel moisturizer.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'Neutrogena',
    material: 'Gel moisturizer · hyaluronic acid',
    features: [
      'Hyaluronic acid hydration',
      'Oil-free water gel texture',
      'Popular everyday moisturizer',
    ],
    specs: [
      { label: 'Texture', value: 'Water gel' },
      { label: 'Key actives', value: 'Hyaluronic acid' },
    ],
    priceHint: 19.97,
    asin: 'B00NR1YQHM',
    searchKeywords: 'Neutrogena Hydro Boost Water Gel',
    images: [
      'https://m.media-amazon.com/images/I/61fhuufzENL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81FKUL-0--L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81-Y9hO-fiL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71v+phL5DoL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 80000,
    hue: 195,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 3,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-004',
    slug: 'the-ordinary-niacinamide-10-zinc-1',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    tagline: 'Targeted serum for oil balance and look of pores.',
    description:
      'High-strength niacinamide serum for blemish-prone and oily skin concerns.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'The Ordinary',
    material: 'Serum · niacinamide + zinc',
    features: [
      '10% niacinamide + 1% zinc',
      'Lightweight water-based serum',
      'Budget-friendly treatment step',
    ],
    specs: [
      { label: 'Format', value: 'Serum' },
      { label: 'Key actives', value: 'Niacinamide 10%, zinc 1%' },
    ],
    priceHint: 6.5,
    asin: 'B01MDTVZTZ',
    searchKeywords: 'The Ordinary Niacinamide 10% + Zinc 1%',
    badge: 'Value pick',
    images: [
      'https://m.media-amazon.com/images/I/612NxRjAoCL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81TtdjfUduL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71gT5-W8WEL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Y6JkQW6dL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Q0SoLNrzL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71GGYOOrm1L._SL1500_.jpg',
    ],
    rating: 4.5,
    reviewCount: 100000,
    hue: 45,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 4,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-005',
    slug: 'elf-holy-hydration-makeup-melting-cleansing-balm',
    name: 'e.l.f. Holy Hydration! Makeup Melting Cleansing Balm',
    tagline: 'Melt makeup without stripping — gentle first cleanse.',
    description:
      'Budget-friendly cleansing balm for dissolving makeup and SPF.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'e.l.f.',
    material: 'Cleansing balm',
    features: [
      'Melts makeup and sunscreen',
      'Hydrating balm texture',
      'Accessible price point',
    ],
    specs: [
      { label: 'Step', value: 'First cleanse / balm' },
      { label: 'Best for', value: 'Makeup wearers' },
    ],
    priceHint: 10.0,
    asin: 'B0CX35NT6Y',
    searchKeywords: 'elf Holy Hydration Makeup Melting Cleansing Balm',
    images: [
      'https://m.media-amazon.com/images/I/61Nj6idynDL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41vjccLp-uL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71RBLun-lOL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71i1o-pO2VL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 20000,
    hue: 320,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 5,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-006',
    slug: 'olaplex-no3-hair-perfector',
    name: 'Olaplex No.3 Hair Perfector',
    tagline: 'The pre-shampoo treatment you rinse out.',
    description:
      'A rinse-out treatment for before shampoo. Olaplex’s current bottle in this step is Nº.3PLUS, which replaces original No.3. This listing has shown both names. It is not the No.7 oil.',
    category: 'hair',
    collection: 'Hair',
    brand: 'Olaplex',
    material: 'Hair treatment',
    features: [
      'Rinse-out treatment before shampoo',
      'Listing has shown No.3 and No.3PLUS',
      'Not the No.7 leave-in oil',
    ],
    specs: [
      { label: 'Use', value: 'Pre-shampoo, then rinse' },
      { label: 'Name', value: 'No.3 or No.3PLUS on the bottle' },
    ],
    priceHint: 30.0,
    asin: 'B00SNM5US4',
    searchKeywords: 'Olaplex No.3 Hair Perfector No.3PLUS treatment',
    badge: 'Hair hero',
    images: [
      'https://m.media-amazon.com/images/I/61J1mJhNJfL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81SIzpaN1aL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71csjsqSm0L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Xh2y7NuaL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 70000,
    hue: 280,
    materialFamily: 'haircare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 6,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-007',
    slug: 'living-proof-dry-shampoo',
    name: 'Living Proof Perfect Hair Day Dry Shampoo',
    tagline: 'The original aerosol, in the 9.9 oz can.',
    description:
      'Original Perfect Hair Day dry shampoo, an aerosol. This listing is the 9.9 oz. Advanced Clean is a different can. Sheer Clean is a non-aerosol mist.',
    category: 'hair',
    collection: 'Hair',
    brand: 'Living Proof',
    material: 'Dry shampoo',
    features: [
      'Original Perfect Hair Day aerosol',
      '9.9 oz on this listing',
      'Not Advanced Clean',
    ],
    specs: [
      { label: 'Format', value: 'Aerosol dry shampoo' },
      { label: 'Best for', value: 'Day-two hair' },
    ],
    priceHint: 29.0,
    asin: 'B0BQ3YFRC5',
    searchKeywords: 'Living Proof Perfect Hair Day Dry Shampoo original 9.9 oz',
    images: [
      'https://m.media-amazon.com/images/I/51AJlfCjZKL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91Sm3Bx2BnL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71smaRkb4TL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81KitQoUtGL._AC_SL1000_.jpg',
    ],
    rating: 4.4,
    reviewCount: 25000,
    hue: 0,
    materialFamily: 'haircare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 7,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-008',
    slug: 'maybelline-lash-sensational-sky-high-mascara',
    name: 'Maybelline Lash Sensational Sky High Mascara, Cosmic Black',
    tagline: 'Washable Sky High in Cosmic Black.',
    description:
      'Washable mascara in Cosmic Black, about 7.2 ml. Waterproof Sky High, Very Black, and Sky Tubes are other products.',
    category: 'makeup',
    collection: 'Makeup',
    brand: 'Maybelline',
    material: 'Mascara',
    features: [
      'Washable Cosmic Black',
      'Not waterproof',
      'Not Very Black',
    ],
    specs: [
      { label: 'Finish', value: 'Length + volume' },
      { label: 'Type', value: 'Mascara' },
    ],
    priceHint: 11.97,
    asin: 'B09J5HRNTM',
    searchKeywords: 'Maybelline Lash Sensational Sky High washable mascara Cosmic Black',
    badge: 'Makeup pick',
    images: [
      'https://m.media-amazon.com/images/I/71P6TqIG5AL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91LnDGXxJ-L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91cij58+yJL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81wrB2+4QlL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 90000,
    hue: 350,
    materialFamily: 'makeup',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 8,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-009',
    slug: 'rare-beauty-soft-pinch-liquid-blush',
    name: 'Rare Beauty Soft Pinch Liquid Blush, Grace',
    tagline: 'Liquid blush in Grace. A dot is enough.',
    description:
      'Soft Pinch liquid blush in Grace. The US listing describes it as matte. Other shades are other listings.',
    category: 'makeup',
    collection: 'Makeup',
    brand: 'Rare Beauty',
    material: 'Liquid blush',
    features: [
      'Shade Grace',
      'Liquid blush',
      'US listing describes it as matte',
    ],
    specs: [
      { label: 'Shade', value: 'Grace' },
      { label: 'Format', value: 'Liquid blush' },
    ],
    priceHint: 23.0,
    asin: 'B08KFMXXJS',
    searchKeywords: 'Rare Beauty Soft Pinch Liquid Blush Grace',
    images: [
      'https://m.media-amazon.com/images/I/41ax7Vh+ikL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/31VNbm0bdEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61VGfshzZ1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41ESlTfvJvL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 15000,
    hue: 340,
    materialFamily: 'makeup',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 9,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-010',
    slug: 'eos-shea-better-body-lotion',
    name: 'eos Shea Better Body Lotion',
    tagline: '24-hour moisture with a soft, non-greasy feel.',
    description:
      'Shea body lotion for daily softness.',
    category: 'body',
    collection: 'Body',
    brand: 'eos',
    material: 'Body lotion · shea',
    features: [
      '24-hour moisture claim on many listings',
      'Shea butter formula',
      'Popular everyday body care',
    ],
    specs: [
      { label: 'Area', value: 'Body' },
      { label: 'Key ingredient', value: 'Shea butter' },
    ],
    priceHint: 10.98,
    asin: 'B0DVMLK1MG',
    searchKeywords: 'eos Shea Better Body Lotion',
    images: [
      'https://m.media-amazon.com/images/I/71-kfz9RkXL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81PLCyuF8yL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ktIwsTU1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/611NkDRs-PL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 60000,
    hue: 30,
    materialFamily: 'skincare',
    source: 'curated',
    limitedTime: true,
    weekOf: "2026-07-27",
    expiresAt: "2026-08-03T14:00:00Z",
    bsrRank: 10,
    bsrCategory: "Editor limited edit",
  },
  {
    id: 'ad-011',
    slug: 'sol-de-janeiro-brazilian-crush-body-mist',
    name: 'Sol de Janeiro Cheirosa 59 Hair and Body Fragrance Mist',
    tagline: 'Woody gourmand. Cheirosa 59.',
    description:
      'Cheirosa 59, a hair and body mist. The listing describes plum, vanilla orchid, and sandalwood. Not Cheirosa 62 or 71. Confirm the ounces.',
    category: 'body',
    collection: 'Body',
    brand: 'Sol de Janeiro',
    material: 'Body mist',
    features: [
      'Cheirosa 59',
      'Woody gourmand on the listing',
      'Hair and body mist',
    ],
    specs: [
      { label: 'Scent', value: 'Cheirosa 59' },
      { label: 'Format', value: 'Hair and body mist' },
    ],
    priceHint: 20.0,
    asin: 'B0CN3TNZCV',
    searchKeywords: 'Sol de Janeiro Cheirosa 59 hair body fragrance mist',
    badge: 'Cult favorite',
    images: [
      'https://m.media-amazon.com/images/I/51nYScuryUL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61HDQEbU54L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/813LhgNORZL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81-0+D65OzL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 40000,
    hue: 15,
    materialFamily: 'other',
    source: 'curated',
  },
  {
    id: 'ad-012',
    slug: 'supergoop-unseen-sunscreen-spf-40',
    name: 'Supergoop! Unseen Sunscreen Stick SPF 40',
    tagline: 'The clear SPF 40 stick, for a swipe over makeup.',
    description:
      'A clear unscented stick, SPF 40, about 0.7 oz. The Unseen gel is a different product. Supergoop’s current gel page is SPF 50. Follow the drug facts.',
    category: 'sun-spf',
    collection: 'SPF',
    brand: 'Supergoop!',
    material: 'Sunscreen stick · SPF 40',
    features: [
      'Clear stick, about 0.7 oz',
      'SPF 40',
      'Not the Unseen gel',
    ],
    specs: [
      { label: 'SPF', value: '40' },
      { label: 'Format', value: 'Stick' },
    ],
    priceHint: 38.0,
    asin: 'B0DMWVG4G6',
    searchKeywords: 'Supergoop Unseen Sunscreen Stick SPF 40',
    badge: 'SPF staple',
    images: [
      'https://m.media-amazon.com/images/I/61Z17MeYsaL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/615kr5VebZL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71yFb5IdAvL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81isMDTEV0L._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 30000,
    hue: 50,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-013',
    slug: 'biore-uv-aqua-rich-watery-essence',
    name: 'Biore UV Aqua Rich SPF 50',
    tagline: 'Read the brand on the bottle before you buy the legend.',
    description:
      'The live listing for this ASIN has shown a hydrating moisturizer SPF 50 under a brand that was not Bioré. The Japanese Watery Essence is a different sunscreen. Confirm the brand and the drug facts.',
    category: 'sun-spf',
    collection: 'SPF',
    brand: 'Biore',
    material: 'Sunscreen',
    features: [
      'Confirm the brand is Bioré',
      'SPF belongs on the drug facts',
      'Japanese Watery Essence is a different product',
    ],
    specs: [
      { label: 'Check', value: 'Brand and drug facts on the listing' },
    ],
    priceHint: 15.0,
    asin: 'B0H6G7LZ15',
    searchKeywords: 'Biore UV Aqua Rich SPF 50 sunscreen',
    images: [
      'https://m.media-amazon.com/images/I/7183WGELcyL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/7191WtHE6qL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51yssoA1NEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61OcTtDZyiL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 20000,
    hue: 190,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-014',
    slug: 'dyson-airwrap-multi-styler',
    name: 'Dyson Airwrap Co-anda2x Multi-styler, Straight+Wavy',
    tagline: 'The Co-anda2x for straight and wavy hair.',
    description:
      'Ceramic Pink Straight+Wavy Co-anda2x. Older Airwrap barrels do not fit. Confirm the attachments in the title. About $599 is a typical recent street price. Dyson.com lists this colorway at $749.99.',
    category: 'tools',
    collection: 'Tools',
    brand: 'Dyson',
    material: 'Hair styling tool',
    features: [
      'Co-anda2x Straight+Wavy',
      'Older Airwrap barrels do not fit',
      'Confirm the attachment list in the title',
    ],
    specs: [
      { label: 'Model', value: 'Airwrap Co-anda2x Straight+Wavy' },
      { label: 'Color', value: 'Ceramic Pink' },
    ],
    priceHint: 599.0,
    asin: 'B0F9679PP3',
    searchKeywords: 'Dyson Airwrap Co-anda2x Straight Wavy Ceramic Pink',
    badge: 'Investment tool',
    images: [
      'https://m.media-amazon.com/images/I/61ULqKtcJlL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71pcs8WQMdL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61Sba9b+I7L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/612kzX-CJ7L._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 10000,
    hue: 220,
    materialFamily: 'device',
    source: 'curated',
  },
  {
    id: 'ad-015',
    slug: 'revlon-one-step-volumizer-plus',
    name: 'REVLON One-Step Volumizer Hair Dryer and Hot Air Brush',
    tagline: 'The 2.8-inch fixed-head brush, not the Plus 2.0.',
    description:
      'The earlier One-Step, with a 2.8-inch fixed oval head. The Plus 2.0 is a smaller detachable brush and a different listing. About $50.',
    category: 'tools',
    collection: 'Tools',
    brand: 'REVLON',
    material: 'Hot air brush',
    features: [
      '2.8-inch fixed oval head',
      'Not the 2.4-inch Plus 2.0',
      'Blowout brush',
    ],
    specs: [
      { label: 'Head', value: '2.8-inch fixed oval' },
      { label: 'Use', value: 'Blowout / volume' },
    ],
    priceHint: 49.99,
    asin: 'B01LSUQSB0',
    searchKeywords: 'REVLON One-Step Volumizer Hair Dryer Hot Air Brush',
    images: [
      'https://m.media-amazon.com/images/I/61SrWfdHa1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91SSk4c0N0L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81OclohsgML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81tpvVqQ4UL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/713w3-vBTgL._AC_SL1000_.jpg',
    ],
    rating: 4.4,
    reviewCount: 100000,
    hue: 10,
    materialFamily: 'device',
    source: 'curated',
  },
  {
    id: 'ad-016',
    slug: 'laneige-lip-sleeping-mask',
    name: 'LANEIGE Lip Sleeping Mask, Berry Duo',
    tagline: 'Clear Berry mask, a full jar plus a mini.',
    description:
      'Overnight lip mask in Berry, clear, sold here as a full size plus a mini. Not Vanilla. Not a tinted day balm. Confirm the count and the live price.',
    category: 'lips',
    collection: 'Lips',
    brand: 'LANEIGE',
    material: 'Lip mask',
    features: [
      'Berry duo, full jar plus a mini',
      'Clear, not a tint',
      'Overnight mask',
    ],
    specs: [
      { label: 'Scent', value: 'Berry' },
      { label: 'Count', value: 'Full jar plus mini' },
    ],
    priceHint: 24.0,
    asin: 'B0G4XXCP1D',
    searchKeywords: 'LANEIGE Lip Sleeping Mask Berry Duo',
    badge: 'Lip care',
    images: [
      'https://m.media-amazon.com/images/I/51Fc6wlC+oL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51QmAq7IboL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51UvAtF10pL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/517CInowiyL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 80000,
    hue: 330,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-017',
    slug: 'vital-proteins-collagen-peptides',
    name: 'Vital Proteins Collagen Peptides',
    tagline: 'Unflavored collagen for coffee, smoothies, and daily routines.',
    description:
      'Popular collagen peptide powder. Wellness-adjacent pick (verify claims on Amazon).',
    category: 'wellness',
    collection: 'Wellness',
    brand: 'Vital Proteins',
    material: 'Collagen peptides powder',
    features: [
      'Unflavored collagen powder',
      'Mixes into hot or cold drinks',
      'High-demand wellness SKU',
    ],
    specs: [
      { label: 'Format', value: 'Powder' },
      { label: 'Type', value: 'Collagen peptides' },
    ],
    priceHint: 27.0,
    asin: 'B00K6JUG4K',
    searchKeywords: 'Vital Proteins Collagen Peptides',
    images: [
      'https://m.media-amazon.com/images/I/71dh8ovfnrL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81OiRmRmMKL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81Fb68e4XjL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71A7F3NxvML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/711lJus8l-L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/616plnvWMvL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 90000,
    hue: 40,
    materialFamily: 'supplement',
    source: 'curated',
  },
  {
    id: 'ad-018',
    slug: 'the-inkey-list-retinol-eye-cream',
    name: 'The INKEY List Retinol Eye Cream',
    tagline: 'Approachable retinol eye care for night routines.',
    description:
      'Budget retinol eye cream for experienced retinol users. Patch test and follow label guidance.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'The INKEY List',
    material: 'Eye cream · retinol',
    features: [
      'Retinol eye cream',
      'Accessible price',
      'Night-routine friendly',
    ],
    specs: [
      { label: 'Actives', value: 'Retinol' },
      { label: 'Area', value: 'Eye contour' },
    ],
    priceHint: 14.99,
    asin: 'B0CBT1K3L6',
    searchKeywords: 'The INKEY List Retinol Eye Cream',
    images: [
      'https://m.media-amazon.com/images/I/41zHVXUSFVL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/8145ZHdX7PL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61wkpGVM9BL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61AjTPlE0LL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71BxbIlp6TL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71gU0X36xqL._SL1000_.jpg',
    ],
    rating: 4.3,
    reviewCount: 15000,
    hue: 260,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-019',
    slug: 'gisou-honey-infused-hair-oil',
    name: 'Gisou Honey Infused Hair Oil',
    tagline: 'Shine oil for ends, frizz, and soft-finish styling.',
    description:
      'Honey-infused hair oil for shine and softness.',
    category: 'hair',
    collection: 'Hair',
    brand: 'Gisou',
    material: 'Hair oil',
    features: [
      'Leave-in hair oil',
      'Shine and softness focus',
      'Social-favorite hair care',
    ],
    specs: [
      { label: 'Format', value: 'Hair oil' },
      { label: 'Use', value: 'Ends / styling' },
    ],
    priceHint: 36.0,
    asin: 'B0FM7YZVY3',
    searchKeywords: 'Gisou Honey Infused Hair Oil',
    images: [
      'https://m.media-amazon.com/images/I/61j6HOdl7NL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71OCMOKdK1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61qYG3s+1kL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71JeYsrrzKL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 10000,
    hue: 45,
    materialFamily: 'haircare',
    source: 'curated',
  },
  {
    id: 'ad-020',
    slug: 'tatcha-the-dewy-skin-cream',
    name: 'Tatcha The Dewy Skin Cream',
    tagline: 'Rich, plush cream for dry skin that wants a dewy finish.',
    description:
      'Prestige moisturizer often sold in Luxury Beauty.',
    category: 'luxury',
    collection: 'Luxury Beauty',
    brand: 'Tatcha',
    material: 'Rich cream moisturizer',
    features: [
      'Rich cream texture',
      'Dewy finish',
      'Prestige beauty — top-shelf selection',
    ],
    specs: [
      { label: 'Skin type', value: 'Dry / dehydrated' },
      { label: 'Finish', value: 'Dewy' },
      { label: 'Shelf', value: 'Prestige · top shelf' },
    ],
    priceHint: 72.0,
    asin: 'B0GFQ5QGP5',
    searchKeywords: 'Tatcha The Dewy Skin Cream',
    badge: 'Prestige',
    images: [
      'https://m.media-amazon.com/images/I/61hBZFTi8qL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Cvbr4JY3L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Z+pUE2l2L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ZtJ+-YMgL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 12000,
    hue: 160,
    materialFamily: 'luxury',
    source: 'curated',
  },
  {
    id: 'ad-021',
    slug: 'sk-ii-facial-treatment-essence',
    name: 'SK-II Facial Treatment Essence',
    tagline: 'Cult prestige essence — signature Pitera step.',
    description:
      'Iconic luxury essence for the prestige skincare shelf.',
    category: 'luxury',
    collection: 'Luxury Beauty',
    brand: 'SK-II',
    material: 'Facial essence',
    features: [
      'Prestige treatment essence',
      'Prestige skincare',
      'Prestige beauty — top-shelf selection',
    ],
    specs: [
      { label: 'Step', value: 'Essence / treatment' },
      { label: 'Shelf', value: 'Prestige · top shelf' },
    ],
    priceHint: 99.0,
    asin: 'B0FL9S44DL',
    searchKeywords: 'SK-II Facial Treatment Essence',
    badge: 'Prestige',
    images: [
      'https://m.media-amazon.com/images/I/61oNY3CSJQL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71-kdayjHyL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71w7rf6GHOL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71w6UYir6mL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 8000,
    hue: 50,
    materialFamily: 'luxury',
    source: 'curated',
  },
  {
    id: 'ad-022',
    slug: 'drunk-elephant-protini-polypeptide-cream',
    name: 'Drunk Elephant Protini Polypeptide Cream',
    tagline: 'Peptide-forward prestige moisturizer.',
    description:
      'Clean-luxury moisturizer favorite.',
    category: 'luxury',
    collection: 'Luxury Beauty',
    brand: 'Drunk Elephant',
    material: 'Polypeptide cream',
    features: [
      'Prestige moisturizer',
      'Peptide-focused formula story',
      'Prestige beauty — top-shelf selection',
    ],
    specs: [
      { label: 'Type', value: 'Face cream' },
      { label: 'Shelf', value: 'Prestige · top shelf' },
    ],
    priceHint: 68.0,
    asin: 'B08KWRN54G',
    searchKeywords: 'Drunk Elephant Protini Polypeptide Cream',
    badge: 'Prestige',
    images: [
      'https://m.media-amazon.com/images/I/51HzPP4D9KL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/810sD5jm8zL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/819qaN1COTL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61zl1Q2yk6L._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 15000,
    hue: 320,
    materialFamily: 'luxury',
    source: 'curated',
  },
  {
    id: 'ad-023',
    slug: 'charlotte-tilbury-pillow-talk-lipstick',
    name: 'Charlotte Tilbury Matte Revolution Lipstick in Pillow Talk Medium',
    tagline: 'The deeper Pillow Talk, not the original nude-pink.',
    description:
      'Matte Revolution in Pillow Talk Medium. The original Pillow Talk is a lighter nude-pink and a different lipstick. Confirm Medium on the tube before you gift it.',
    category: 'luxury',
    collection: 'Luxury Beauty',
    brand: 'Charlotte Tilbury',
    material: 'Matte lipstick',
    features: [
      'Pillow Talk Medium',
      'Not original Pillow Talk',
      'Matte Revolution',
    ],
    specs: [
      { label: 'Shade', value: 'Pillow Talk Medium' },
      { label: 'Finish', value: 'Matte' },
    ],
    priceHint: 35.0,
    asin: 'B0848Y5D4B',
    searchKeywords: 'Charlotte Tilbury Matte Revolution Pillow Talk Medium',
    badge: 'Prestige',
    images: [
      'https://m.media-amazon.com/images/I/61TM3BeC7iL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81pnOt+8GqL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/712y7Dtu9XL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81hzmMCFBkL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 20000,
    hue: 340,
    materialFamily: 'luxury',
    source: 'curated',
  },
  {
    id: 'ad-024',
    slug: 'la-mer-creme-de-la-mer',
    name: 'La Mer Crème de la Mer Moisturizing Cream',
    tagline: 'Ultra-prestige cream for the high-ticket skincare cart.',
    description:
      'Flagship luxury cream.',
    category: 'luxury',
    collection: 'Luxury Beauty',
    brand: 'La Mer',
    material: 'Moisturizing cream',
    features: [
      'Ultra-prestige moisturizer',
      'Collector piece',
      'Prestige beauty — top-shelf selection',
    ],
    specs: [
      { label: 'Tier', value: 'Prestige / Luxury Beauty' },
      { label: 'Shelf', value: 'Prestige · top shelf' },
    ],
    priceHint: 190.0,
    asin: 'B0D1T4FF37',
    searchKeywords: 'La Mer Creme de la Mer moisturizing cream',
    badge: 'Prestige',
    images: [
      'https://m.media-amazon.com/images/I/61YFx9myqPL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/618WTN5PlML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61OPY-ycB1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61QJRXq29GL._AC_SL1000_.jpg',
    ],
    rating: 4.5,
    reviewCount: 5000,
    hue: 200,
    materialFamily: 'luxury',
    source: 'curated',
  },
  {
    id: 'ad-025',
    slug: 'ysl-libre-eau-de-parfum',
    name: 'Yves Saint Laurent Libre Eau de Parfum',
    tagline: 'Modern floral-lavender fragrance with gift energy.',
    description:
      'Best-selling prestige women\'s fragrance.',
    category: 'fragrance',
    collection: 'Fragrance',
    brand: 'Yves Saint Laurent',
    material: 'Eau de parfum',
    features: [
      'Prestige women\'s fragrance',
      'Gift-ready',
      'Prestige fragrance selection',
    ],
    specs: [
      { label: 'Concentration', value: 'Eau de Parfum' },
      { label: 'Audience', value: 'Women' },
    ],
    priceHint: 98.0,
    asin: 'B07X1YGWSX',
    searchKeywords: 'Yves Saint Laurent Libre Eau de Parfum',
    badge: 'Fragrance',
    images: [
      'https://m.media-amazon.com/images/I/51v0HbffdGL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61P4VIdN9ZL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61DXbJw27rL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61ikQK0DdIL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 10000,
    hue: 280,
    materialFamily: 'fragrance',
    source: 'curated',
  },
  {
    id: 'ad-026',
    slug: 'viktor-rolf-flowerbomb',
    name: "Viktor&Rolf Flowerbomb Eau de Parfum",
    tagline: 'Explosive floral — perennial fragrance gift.',
    description:
      'Cult women\'s fragrance with strong Amazon demand.',
    category: 'fragrance',
    collection: 'Fragrance',
    brand: 'Viktor&Rolf',
    material: 'Eau de parfum',
    features: [
      'Floral eau de parfum',
      'Gift-friendly bottle story',
      'Signature fragrance',
    ],
    specs: [
      { label: 'Concentration', value: 'Eau de Parfum' },
      { label: 'Family', value: 'Floral' },
    ],
    priceHint: 120.0,
    asin: 'B00BEG4QH2',
    searchKeywords: 'Viktor Rolf Flowerbomb Eau de Parfum',
    badge: 'Fragrance',
    images: [
      'https://m.media-amazon.com/images/I/61ZR3eNks5L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81i39nBxCyL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81yowewHG6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81RmHu8-TWL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 15000,
    hue: 320,
    materialFamily: 'fragrance',
    source: 'curated',
  },
  {
    id: 'ad-027',
    slug: 'chanel-chance-eau-tendre',
    name: 'CHANEL Chance Eau Tendre Eau de Toilette',
    tagline: 'Soft floral-fruity CHANEL classic.',
    description:
      'Prestige fragrance with brand recognition and gift demand.',
    category: 'fragrance',
    collection: 'Fragrance',
    brand: 'CHANEL',
    material: 'Eau de toilette',
    features: [
      'Designer fragrance',
      'High brand search volume',
      'Gift-ready',
    ],
    specs: [
      { label: 'Concentration', value: 'Eau de Toilette' },
      { label: 'Brand', value: 'CHANEL' },
    ],
    priceHint: 105.0,
    asin: 'B00B0ZLF9Y',
    searchKeywords: 'Chanel Chance Eau Tendre Eau de Toilette',
    badge: 'Fragrance',
    images: [
      'https://m.media-amazon.com/images/I/713iNaGYSsL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71vwTu8tFeL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51qGlYvQqqL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 8000,
    hue: 300,
    materialFamily: 'fragrance',
    source: 'curated',
  },
  {
    id: 'ad-028',
    slug: 'paco-rabanne-olympea',
    name: 'Rabanne Olympéa Absolu Intense Eau de Parfum',
    tagline: 'The Absolu Intense, 80 ml. Not the original Olympéa.',
    description:
      'Olympéa Absolu Intense eau de parfum, 80 ml. The original Olympéa is a different bottle. The house site says Rabanne. The listing may still say Paco Rabanne.',
    category: 'fragrance',
    collection: 'Fragrance',
    brand: 'Paco Rabanne',
    material: 'Eau de parfum',
    features: [
      'Olympéa Absolu Intense',
      '80 ml eau de parfum',
      'Not the original Olympéa',
    ],
    specs: [
      { label: 'Concentration', value: 'Eau de Parfum, Absolu Intense, 80 ml' },
    ],
    priceHint: 85.0,
    asin: 'B0F9FPRM4C',
    searchKeywords: 'Rabanne Olympéa Absolu Intense Eau de Parfum 80 ml',
    images: [
      'https://m.media-amazon.com/images/I/41Sps7mEVaL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51OkztwqabL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61-BR01BolL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61wPGXJ+7CL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 12000,
    hue: 45,
    materialFamily: 'fragrance',
    source: 'curated',
  },
  {
    id: 'ad-029',
    slug: 'cerave-resurfacing-retinol-serum',
    name: 'CeraVe Resurfacing Retinol Serum',
    tagline: 'A face retinol for a first routine — not an eye cream.',
    description:
      'Encapsulated retinol serum for the face, with ceramides and niacinamide. Fragrance-free. CeraVe does not print a simple percent on the front of the bottle.',
    category: 'skincare',
    collection: 'Skincare',
    brand: 'CeraVe',
    material: 'Serum · encapsulated retinol',
    features: [
      'Face serum, not an eye cream',
      'Encapsulated retinol with ceramides',
      'Fragrance-free',
      'Built for post-mark texture more than a strong peel',
    ],
    specs: [
      { label: 'Area', value: 'Face' },
      { label: 'Key actives', value: 'Encapsulated retinol, ceramides, niacinamide' },
      { label: 'Fragrance', value: 'Fragrance-free' },
    ],
    priceHint: 18.68,
    asin: 'B07VWSN95S',
    searchKeywords: 'CeraVe Resurfacing Retinol Serum',
    badge: 'Editor pick',
    images: [
      'https://m.media-amazon.com/images/I/71zvPJqU7FL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71zg4Osiq2L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/710Bu5Yik-L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71riAk3JuaL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    reviewCount: 54000,
    hue: 200,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-030',
    slug: 'olaplex-no7-bonding-oil',
    name: 'Olaplex No.7 Bonding Oil',
    tagline: 'A few drops of shine oil, sold as lighter than a scented honey oil.',
    description:
      'Concentrated bonding oil for mids and ends. The brand says two or three drops. About $30 on a typical recent listing.',
    category: 'hair',
    collection: 'Hair',
    brand: 'Olaplex',
    material: 'Hair oil · bonding oil',
    features: [
      'Leave-in oil, not a rinse-out treatment',
      'Sold as a few drops, not a palmful',
      'Heat protectant claim up to 450°F on the listing',
      'Less of a perfume than a honey hair oil',
    ],
    specs: [
      { label: 'Size', value: '1 fl oz' },
      { label: 'Use', value: 'Mids and ends, wet or dry' },
      { label: 'Amount', value: '2–3 drops' },
    ],
    priceHint: 30,
    asin: 'B07VR1NDSQ',
    searchKeywords: 'Olaplex No.7 Bonding Oil',
    badge: 'Editor pick',
    images: [
      'https://m.media-amazon.com/images/I/71LK2tkaqBL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71OxzsFl0qL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71sh7YOocwL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81CJi8zGdpL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 57000,
    hue: 30,
    materialFamily: 'haircare',
    source: 'curated',
  },
  {
    id: 'ad-031',
    slug: 'summer-fridays-lip-butter-balm',
    name: 'Summer Fridays Lip Butter Balm, Pink Sugar',
    tagline: 'A thin day balm with a sheer pink — the other lip, not the night jar.',
    description:
      'Shea and murumuru lip butter balm in Pink Sugar, a sheer pink. About $24. Confirm the shade on the listing before you gift it.',
    category: 'lips',
    collection: 'Lips',
    brand: 'Summer Fridays',
    material: 'Lip balm · shea and murumuru',
    features: [
      'Day balm, thin layer',
      'Sheer pink, not a neutral',
      'Sold as smooth rather than a heavy sleeping mask',
      'About $24',
    ],
    specs: [
      { label: 'Shade', value: 'Pink Sugar' },
      { label: 'Size', value: '0.5 oz' },
      { label: 'Use', value: 'Day, thin layer' },
    ],
    priceHint: 24,
    asin: 'B0C42HJRBF',
    searchKeywords: 'Summer Fridays Lip Butter Balm Pink Sugar',
    badge: 'Editor pick',
    images: [
      'https://m.media-amazon.com/images/I/51d8K2j9shL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41YZkveViYL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/715KBzNyUFL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61a9vm0uy8L._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 6700,
    hue: 340,
    materialFamily: 'makeup',
    source: 'curated',
  },
  {
    id: 'ad-032',
    slug: 'cerave-moisturizing-cream',
    name: 'CeraVe Moisturizing Cream',
    tagline: 'The unscented tub for winter legs when a scented lotion is the problem.',
    description:
      'Fragrance-free ceramide cream for face and body. The 19 oz tub is the size that makes sense on legs. About $19.',
    category: 'body',
    collection: 'Body',
    brand: 'CeraVe',
    material: 'Cream · ceramides',
    features: [
      'Fragrance-free',
      '19 oz tub for body, not a travel lotion',
      'Ceramides and hyaluronic acid',
      'The unscented alternative to a shea body lotion',
    ],
    specs: [
      { label: 'Size', value: '19 oz' },
      { label: 'Fragrance', value: 'Fragrance-free' },
      { label: 'Use', value: 'Face and body' },
    ],
    priceHint: 18.96,
    asin: 'B00TTD9BRC',
    searchKeywords: 'CeraVe Moisturizing Cream 19 oz',
    badge: 'Editor pick',
    images: [
      'https://m.media-amazon.com/images/I/61EidjXUBrL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61-Ut3jOyyL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91cwHnwUVEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71-J8bHp1nL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviewCount: 148000,
    hue: 210,
    materialFamily: 'skincare',
    source: 'curated',
  },
  {
    id: 'ad-jew-01',
    slug: 'dazzlingrock-necklace-lk8m',
    name: 'Dazzlingrock Collection 18K Solid White Gold Marquise with Pear & Round White Diamond Festoo…',
    tagline: 'Fine necklace — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'Dazzlingrock',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'Dazzlingrock piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Necklace' },
      { label: 'Brand', value: 'Dazzlingrock' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 70396,
    asin: 'B0DZNFLK8M',
    searchKeywords: 'Dazzlingrock Necklace luxury jewelry women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71ax-LIoDIL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81fWTSwXUCL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81P4P5-L6WL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81pzRDEDQxL._AC_SL1000_.jpg',
    ],
    rating: 4,
    hue: 45,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-02',
    slug: 'affy-necklace-dzs3',
    name: 'AFFY Rose-Cut Antique-Cut Diamond Chain Necklace IN 18k Solid Gold (16.29 cttw) - 27&#34; L',
    tagline: 'Fine necklace — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'AFFY',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'AFFY piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Necklace' },
      { label: 'Brand', value: 'AFFY' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 59648,
    asin: 'B07DGXDZS3',
    searchKeywords: 'AFFY Necklace luxury jewelry women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/51FqEuAG1iL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51BDevTx-7L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61+R7pcpYmL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41nwzQXSrbL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 47,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-03',
    slug: 'chow-sang-sang-necklace-29s8',
    name: 'CHOW SANG SANG 999.9 24K Pure Gold Cultural Blessings Diamond Steed Atop Hollow Clouds Neckl…',
    tagline: 'Fine necklace — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'CHOW SANG SANG',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'CHOW SANG SANG piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Necklace' },
      { label: 'Brand', value: 'CHOW SANG SANG' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 4890,
    asin: 'B0GKHL29S8',
    searchKeywords: 'CHOW SANG SANG Necklace luxury jewelry women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/813A3SsQ6rL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/610BD1TdCVL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61bOhFjJ5WL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61oHDLh2DXL._AC_SL1000_.jpg',
    ],
    rating: 1,
    hue: 49,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-04',
    slug: 'houston-diamond-tennis-bracelet-9g2k',
    name: 'Houston Diamond District 2 to 50 CT Lab Grown Diamond Tennis Bracelet | 14K White Gold Round…',
    tagline: 'Fine tennis bracelet — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'Houston Diamond',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'Houston Diamond piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Tennis bracelet' },
      { label: 'Brand', value: 'Houston Diamond' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 1306,
    asin: 'B0C3N79G2K',
    searchKeywords: 'Houston Diamond Tennis bracelet luxury jewelry women',
    badge: 'Luxury jewelry',
    images: [
      'https://m.media-amazon.com/images/I/61ywE32t-gL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61ugeBKHTYL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61OhGLa4dXL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61fcP9xZxzL._AC_SL1000_.jpg',
    ],
    rating: 4.1,
    hue: 51,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-05',
    slug: 'fine-jewelry-necklace-jzkd',
    name: 'IGI Certified 1/4 to 4 Carat Round Lab Grown Diamond Solitaire Pendant Necklace for Women in…',
    tagline: 'Fine necklace — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'Fine Jewelry',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'Fine Jewelry piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Necklace' },
      { label: 'Brand', value: 'Fine Jewelry' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 1329,
    asin: 'B0D24HJZKD',
    searchKeywords: 'Fine Jewelry Necklace luxury jewelry women',
    badge: 'Luxury jewelry',
    images: [
      'https://m.media-amazon.com/images/I/61QzBt6j2aL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71EoOn7DPkL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/911FRmuUblL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/711Ta4tYddL._AC_SL1000_.jpg',
    ],
    rating: 4.6,
    hue: 53,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-06',
    slug: 'fine-jewelry-tennis-bracelet-5cxp',
    name: 'IGI Certified 3.00-10.00 Carat Lab Grown Diamond Tennis Bracelet for Women 14K / 18K Solid W…',
    tagline: 'Fine tennis bracelet — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'Fine Jewelry',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'Fine Jewelry piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Tennis bracelet' },
      { label: 'Brand', value: 'Fine Jewelry' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 3360,
    asin: 'B0DWNJ5CXP',
    searchKeywords: 'Fine Jewelry Tennis bracelet luxury jewelry women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/61f6ppbZb5L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61sXyiN6giL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/513Q16A7qML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61x+okSocpL._AC_SL1000_.jpg',
    ],
    rating: 4.9,
    hue: 55,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-07',
    slug: 'le-vian-bracelet-2r3q',
    name: 'LE VIAN 2 or 3 Carat Chocolate Diamond Bolo Bracelet for Women I 14k Gold Bracelet for Her (…',
    tagline: 'Fine bracelet — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'LE VIAN',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'LE VIAN piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Bracelet' },
      { label: 'Brand', value: 'LE VIAN' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 2700,
    asin: 'B0DQ2M2R3Q',
    searchKeywords: 'LE VIAN Bracelet luxury jewelry women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71yczyN9ZBL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/713cBtogL1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81hB5sVaTvL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71eRDwUwVRL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 57,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-jew-08',
    slug: 'jewels-by-lux-tennis-bracelet-wqkb',
    name: 'Jewels By Lux 14K Yellow Or White Gold 3 Ctw Round Natural Gem Multi Color Sapphire Tennis B…',
    tagline: 'Fine tennis bracelet — big-ticket polish above $1,000.',
    description:
      'Elevated fine jewelry from Amazon luxury selection ($1,000+). Verify metal, carat, and seller details on Amazon.',
    category: 'jewelry',
    collection: 'Luxury Jewelry',
    brand: 'Jewels By Lux',
    material: 'Fine jewelry',
    features: [
      'Big-ticket luxury jewelry',
      'Jewels By Lux piece',
      'Fine jewelry finish',
      'Pairs with handbags and fragrance',
    ],
    specs: [
      { label: 'Type', value: 'Tennis bracelet' },
      { label: 'Brand', value: 'Jewels By Lux' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 1380,
    asin: 'B0G7FVWQKB',
    searchKeywords: 'Jewels By Lux Tennis bracelet luxury jewelry women',
    badge: 'Luxury jewelry',
    images: [
      'https://m.media-amazon.com/images/I/61fQqTmNS4L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61LmG7U7e7L._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 59,
    materialFamily: 'jewelry',
    source: 'curated',
  },
  {
    id: 'ad-bag-01',
    slug: 'louis-vuitton-pochette-4blf',
    name: 'Louis Vuitton Women\'s Pre-Loved Monogram Pochette Accessoires',
    tagline: 'Designer pochette — authenticated pre-loved luxury.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Pre-loved pieces vary by condition — verify details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Louis Vuitton',
    material: 'Pre-loved designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Louis Vuitton designer piece',
      'Pre-loved / resale market',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Pochette' },
      { label: 'Brand', value: 'Louis Vuitton' },
      { label: 'Condition', value: 'Pre-loved (verify listing)' },
    ],
    priceHint: 1190,
    asin: 'B08MB94BLF',
    searchKeywords: 'Louis Vuitton Pochette luxury handbag women',
    badge: 'Luxury bag',
    images: [
      'https://m.media-amazon.com/images/I/7133PRPVmxL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71HRBhnUjIL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71gfZaDBApL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71MQ2DtO3zL._AC_SL1000_.jpg',
    ],
    rating: 3.2,
    hue: 25,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-02',
    slug: 'gucci-tote-kfwh',
    name: 'Gucci Women\'s Pre-Loved Supreme Tote Bag',
    tagline: 'Designer tote — authenticated pre-loved luxury.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Pre-loved pieces vary by condition — verify details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Gucci',
    material: 'Pre-loved designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Gucci designer piece',
      'Pre-loved / resale market',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Tote' },
      { label: 'Brand', value: 'Gucci' },
      { label: 'Condition', value: 'Pre-loved (verify listing)' },
    ],
    priceHint: 1145,
    asin: 'B0G4NHKFWH',
    searchKeywords: 'Gucci Tote luxury handbag women',
    badge: 'Luxury bag',
    images: [
      'https://m.media-amazon.com/images/I/718sIzwZOxL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81Iu1KUbtwL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/715TqhOzmSL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81PuNs-YALL._AC_SL1000_.jpg',
    ],
    rating: 3,
    hue: 28,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-03',
    slug: 'louis-vuitton-tote-k56m',
    name: 'Louis Vuitton Women\'s Pre-Loved Luco Monogram Tote Bag',
    tagline: 'Designer tote — authenticated pre-loved luxury.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Pre-loved pieces vary by condition — verify details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Louis Vuitton',
    material: 'Pre-loved designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Louis Vuitton designer piece',
      'Pre-loved / resale market',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Tote' },
      { label: 'Brand', value: 'Louis Vuitton' },
      { label: 'Condition', value: 'Pre-loved (verify listing)' },
    ],
    priceHint: 1695,
    asin: 'B08TSYK56M',
    searchKeywords: 'Louis Vuitton Tote luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71nMgBmpQhL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81ajSjGG5oL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71oVdNxJvPL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71jCip0+WcL._AC_SL1000_.jpg',
    ],
    rating: 3.4,
    hue: 31,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-04',
    slug: 'prada-tote-hpwg',
    name: 'Prada Women\'s Black Nylon Shopping Tote 1BG189',
    tagline: 'Designer tote — statement luxury finish.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Verify authenticity, size, and seller details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Prada',
    material: 'Designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Prada designer piece',
      'Luxury handbag finish',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Tote' },
      { label: 'Brand', value: 'Prada' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 2450,
    asin: 'B07HCQHPWG',
    searchKeywords: 'Prada Tote luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/51PwlF0w3KL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/510DB8IImPL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41QvRqj+llS._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/31KgnHFAkdS._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 34,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-05',
    slug: 'prada-crossbody-ctjd',
    name: 'Prada Midnight Black Tessuto Nylon & Saffian Leather Designer Crossbody Messenger Trave…',
    tagline: 'Designer crossbody — statement luxury finish.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Verify authenticity, size, and seller details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Prada',
    material: 'Designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Prada designer piece',
      'Luxury handbag finish',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Crossbody' },
      { label: 'Brand', value: 'Prada' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 2200,
    asin: 'B07F19CTJD',
    searchKeywords: 'Prada Crossbody luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71sOAuXLrkL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61TfJr1AUwL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ZrChPYMSL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/816Y6FvX1jL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 37,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-06',
    slug: 'prada-crossbody-pggj',
    name: 'Prada Blue Black Glace Leather Studded Trim Crossbody Handbag 1BD147',
    tagline: 'Designer crossbody — statement luxury finish.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Verify authenticity, size, and seller details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Prada',
    material: 'Designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Prada designer piece',
      'Luxury handbag finish',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Crossbody' },
      { label: 'Brand', value: 'Prada' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 2995,
    asin: 'B089CQPGGJ',
    searchKeywords: 'Prada Crossbody luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/719P2jAy+xL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71FuJbqOdwL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81CoorZ6w2L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61xmk2uGAKL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 40,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-07',
    slug: 'gucci-belt-bag-76kr',
    name: 'Gucci Women\'s Pre-Loved GG Canvas Belt Bag, Brown, One Size',
    tagline: 'Designer belt bag — authenticated pre-loved luxury.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Pre-loved pieces vary by condition — verify details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Gucci',
    material: 'Pre-loved designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Gucci designer piece',
      'Pre-loved / resale market',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Belt bag' },
      { label: 'Brand', value: 'Gucci' },
      { label: 'Condition', value: 'Pre-loved (verify listing)' },
    ],
    priceHint: 995,
    asin: 'B09CLK76KR',
    searchKeywords: 'Gucci Belt bag luxury handbag women',
    badge: 'Luxury bag',
    images: [
      'https://m.media-amazon.com/images/I/71b3KXIxhUL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71LxT64uNwL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71me4t3a4tL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81WsHdSLagL._AC_SL1000_.jpg',
    ],
    rating: 3.7,
    hue: 43,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-08',
    slug: 'jacquemus-handbag-sx9c',
    name: 'Jacquemus Women\'s The Bambimou Bag',
    tagline: 'Designer handbag — statement luxury finish.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Verify authenticity, size, and seller details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Jacquemus',
    material: 'Designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Jacquemus designer piece',
      'Luxury handbag finish',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Handbag' },
      { label: 'Brand', value: 'Jacquemus' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 971,
    asin: 'B0BZZXSX9C',
    searchKeywords: 'Jacquemus Handbag luxury handbag women',
    badge: 'Luxury bag',
    images: [
      'https://m.media-amazon.com/images/I/61NbgCEmwqL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/719z7Cu2fcL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61SlGU99EjL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ujH88yPHL._AC_SL1000_.jpg',
    ],
    rating: 2,
    hue: 26,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-09',
    slug: 'prada-top-handle-g1d4',
    name: 'Prada Bianco White Saffiano Leather Monochrome Top Handle Handbag Purse New | Detachabl…',
    tagline: 'Designer top handle — statement luxury finish.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Verify authenticity, size, and seller details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Prada',
    material: 'Designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Prada designer piece',
      'Luxury handbag finish',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Top handle' },
      { label: 'Brand', value: 'Prada' },
      { label: 'Condition', value: 'New (verify listing)' },
    ],
    priceHint: 3750,
    asin: 'B0FBSNG1D4',
    searchKeywords: 'Prada Top handle luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/619tBqVWH6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61KnXHqSH6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61U2xepOF1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ePlHFHMeL._AC_SL1000_.jpg',
    ],
    rating: 4.8,
    hue: 29,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-bag-10',
    slug: 'louis-vuitton-handbag-qvp3',
    name: 'Louis Vuitton Women\'s Pre-Loved Babylone, Monogram',
    tagline: 'Designer handbag — authenticated pre-loved luxury.',
    description:
      'Elevated designer handbag from Amazon\'s luxury fashion selection. Pre-loved pieces vary by condition — verify details on Amazon.',
    category: 'handbags',
    collection: 'Luxury Handbags',
    brand: 'Louis Vuitton',
    material: 'Pre-loved designer handbag',
    features: [
      'Big-ticket luxury fashion',
      'Louis Vuitton designer piece',
      'Pre-loved / resale market',
      'Pairs with fragrance and jewelry edits',
    ],
    specs: [
      { label: 'Type', value: 'Handbag' },
      { label: 'Brand', value: 'Louis Vuitton' },
      { label: 'Condition', value: 'Pre-loved (verify listing)' },
    ],
    priceHint: 1890,
    asin: 'B08NFDQVP3',
    searchKeywords: 'Louis Vuitton Handbag luxury handbag women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71gjCEjEMdL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71LNVgE1spL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71MWbDVY0VL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81McPZ9hClL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 32,
    materialFamily: 'handbag',
    source: 'curated',
  },
  {
    id: 'ad-watch-01',
    slug: 'rado-quartz-watch-8pg4',
    name: 'Rado - Florence - Women\'s Quartz Swiss Watch - 30mm White Dial with Date - Silver & Rose Gol…',
    tagline: 'Quartz watch — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Rado',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Rado timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Quartz watch' },
      { label: 'Brand', value: 'Rado' },
    ],
    priceHint: 1350,
    asin: 'B0B9T98PG4',
    searchKeywords: 'Rado luxury watch women',
    badge: 'Luxury watch',
    images: [
      'https://m.media-amazon.com/images/I/61l1zRU7VnL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61OvQmOrRcL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61ofuGnrVLL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 210,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-watch-02',
    slug: 'tissot-automatic-watch-dfk5',
    name: 'Tissot Ballade Powermatic 48 COSC 30mm, Swiss Automatic Watch for Women, Stainless Steel Cas…',
    tagline: 'Automatic watch — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Tissot',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Tissot timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Automatic watch' },
      { label: 'Brand', value: 'Tissot' },
    ],
    priceHint: 1225,
    asin: 'B0FSG1DFK5',
    searchKeywords: 'Tissot luxury watch women',
    badge: 'Luxury watch',
    images: [
      'https://m.media-amazon.com/images/I/71ZMCmxnWaL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61pjgMLcX-L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81vXeQpIHlL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/9153n84848L._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 213,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-watch-03',
    slug: 'versace-chronograph-g8ck',
    name: 'Versace Classic Round Chrono Bracelet Watch',
    tagline: 'Chronograph — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Versace',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Versace timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Chronograph' },
      { label: 'Brand', value: 'Versace' },
    ],
    priceHint: 1085,
    asin: 'B0GJ69G8CK',
    searchKeywords: 'Versace luxury watch women',
    badge: 'Luxury watch',
    images: [
      'https://m.media-amazon.com/images/I/71mi-3+kqnL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61lBKSfMVOL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Vd+Tbqm5L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71tr-PG+AkL._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 216,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-watch-04',
    slug: 'rado-automatic-watch-z2m1',
    name: 'Rado - Centrix - Women\'s Automatic Swiss Watch - 30mm Silver-White Dial with Date - White & …',
    tagline: 'Automatic watch — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Rado',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Rado timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Automatic watch' },
      { label: 'Brand', value: 'Rado' },
    ],
    priceHint: 3000,
    asin: 'B0C7ZKZ2M1',
    searchKeywords: 'Rado luxury watch women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/61HZ7b+umZL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71ZB12tMmPL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Sf1UilFML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71YfKF6ZaoL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 219,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-watch-05',
    slug: 'versace-luxury-watch-m7s1',
    name: 'Versace Antlia Leather Watch',
    tagline: 'Luxury watch — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Versace',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Versace timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Luxury watch' },
      { label: 'Brand', value: 'Versace' },
    ],
    priceHint: 1015,
    asin: 'B0GWX6M7S1',
    searchKeywords: 'Versace luxury watch women',
    badge: 'Luxury watch',
    images: [
      'https://m.media-amazon.com/images/I/61KgjULiqEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51DTCG2VBmL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71tQHG0ccgL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61SDBrg5XAL._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 222,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-watch-06',
    slug: 'rado-automatic-watch-341n',
    name: 'Rado - DiaStar Original Open Heart - Women\'s Automatic Swiss Watch - 30mm Oval Yellow Dial -…',
    tagline: 'Automatic watch — luxury timepiece above $1,000.',
    description:
      'Elevated luxury watch from Amazon ($1,000+). Verify authenticity, size, and seller details on Amazon.',
    category: 'watches',
    collection: 'Luxury Watches',
    brand: 'Rado',
    material: 'Luxury watch',
    features: [
      'Big-ticket luxury watch',
      'Rado timepiece',
      'Fashion finish for the wrist',
      'Pairs with handbags and jewelry',
    ],
    specs: [
      { label: 'Type', value: 'Automatic watch' },
      { label: 'Brand', value: 'Rado' },
    ],
    priceHint: 1800,
    asin: 'B0F44V341N',
    searchKeywords: 'Rado luxury watch women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71imnW8JpNL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71m9ZWBAgdL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81zpLyipKcL._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 225,
    materialFamily: 'watch',
    source: 'curated',
  },
  {
    id: 'ad-gold-01',
    slug: '18k-gold-chain-necklace-2l6g',
    name: 'Real 18k Gold Heart Necklace for Women, Fine Cubic Zirconia Love Jewelry Gifts for Her (18kt…',
    tagline: '18K gold chain necklace — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '18K gold',
    features: [
      'Solid gold $500+',
      '18K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Gold chain necklace' },
      { label: 'Karat', value: '18K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 699,
    asin: 'B07Q9Z2L6G',
    searchKeywords: '18K Gold chain necklace solid gold women',
    badge: 'Gold $500+',
    images: [
      'https://m.media-amazon.com/images/I/611bdJjqKQL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51Lzpjpqi6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61gNNgZ+SxL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/816S-G4brVL._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 48,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-02',
    slug: '18k-rope-chain-1g9x',
    name: 'Nuragold 18k Real Yellow Gold Rope Chain Diamond Cut Italian Necklace - 3mm',
    tagline: '18K rope chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '18K gold',
    features: [
      'Solid gold $500+',
      '18K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Rope chain' },
      { label: 'Karat', value: '18K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 1039,
    asin: 'B0BFLT1G9X',
    searchKeywords: '18K Rope chain solid gold women',
    badge: 'Gold $500+',
    images: [
      'https://m.media-amazon.com/images/I/71Lb75zPJhL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81XFp1yTupL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71XyQICodbL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71Pc7la3p1L._AC_SL1000_.jpg',
    ],
    rating: 3.1,
    hue: 49,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-03',
    slug: '14k-box-chain-fvcq',
    name: 'Jewelry Affairs 14k Yellow Gold Round Box Chain Necklace, 3.4mm',
    tagline: '14K box chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Box chain' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 2952,
    asin: 'B00URTFVCQ',
    searchKeywords: '14K Box chain solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71B4qH26dxL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71HK24TbM1L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61SeAZmYM8L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71fmTH58BrL._AC_SL1000_.jpg',
    ],
    rating: 4.8,
    hue: 50,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-04',
    slug: '14k-herringbone-chain-lf26',
    name: 'Jewelry Affairs 14k Yellow Solid Gold Imperial Herringbone Chain Necklace, 4.7mm',
    tagline: '14K herringbone chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Herringbone chain' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 2946,
    asin: 'B003YTLF26',
    searchKeywords: '14K Herringbone chain solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71YOyLB6wEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61omt3U+dXL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71DY43zOY8L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71n4nKDzzuL._AC_SL1000_.jpg',
    ],
    rating: 4.1,
    hue: 51,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-05',
    slug: '18k-rope-chain-7g3j',
    name: 'Nuragold 18k Real Yellow Gold Rope Chain Diamond Cut Italian Necklace - 2mm',
    tagline: '18K rope chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '18K gold',
    features: [
      'Solid gold $500+',
      '18K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Rope chain' },
      { label: 'Karat', value: '18K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 530,
    asin: 'B0BFK67G3J',
    searchKeywords: '18K Rope chain solid gold women',
    badge: 'Gold $500+',
    images: [
      'https://m.media-amazon.com/images/I/71RZ3RV5DHL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81bYVims+HL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71exJPEV58L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71EZR0boXdL._AC_SL1000_.jpg',
    ],
    rating: 3.9,
    hue: 52,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-06',
    slug: '14k-herringbone-chain-gmpg',
    name: 'Jewelry Affairs 14k Yellow Solid Gold Imperial Herringbone Chain Necklace, 6.0mm',
    tagline: '14K herringbone chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Herringbone chain' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 3793,
    asin: 'B07F7GGMPG',
    searchKeywords: '14K Herringbone chain solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71YOyLB6wEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71NmITqpkXL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81EZ3u2JnRL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71m-OiLMp7L._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 53,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-07',
    slug: '18k-cuban-link-chain-3gdl',
    name: 'Nuragold 18K Real Yellow Gold Solid Miami Cuban Link Chain Italian Necklace',
    tagline: '18K cuban link chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '18K gold',
    features: [
      'Solid gold $500+',
      '18K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Cuban link chain' },
      { label: 'Karat', value: '18K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 4257,
    asin: 'B0DD1Y3GDL',
    searchKeywords: '18K Cuban link chain solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/81n463vdjQL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71kEezeZM6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/91qsXZ9fsYL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/81NNmTeNr8L._AC_SL1000_.jpg',
    ],
    rating: 4,
    hue: 54,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-08',
    slug: '14k-herringbone-chain-ffhw',
    name: 'Jewelry Affairs 14k Yellow Solid Gold Imperial Herringbone Chain Necklace, 3.0mm',
    tagline: '14K herringbone chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Herringbone chain' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 1511,
    asin: 'B003YTFFHW',
    searchKeywords: '14K Herringbone chain solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/71MscxU0xrL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71+xGW7FgEL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71k18TYAzxL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61Irwe5aRJL._AC_SL1000_.jpg',
    ],
    rating: 4.2,
    hue: 55,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-09',
    slug: '10k-wedding-band-y5tz',
    name: '10k Yellow Gold 10mm Half Round Wedding Band for Men or Unisex - Wide Solid Gold Ring with S…',
    tagline: '10K wedding band — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '10K gold',
    features: [
      'Solid gold $500+',
      '10K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Wedding band' },
      { label: 'Karat', value: '10K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 963,
    asin: 'B085PYY5TZ',
    searchKeywords: '10K Wedding band solid gold women',
    badge: 'Gold $500+',
    images: [
      'https://m.media-amazon.com/images/I/71TlC0zLn6L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51jJsd+mWsL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61FTQycfZBL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71dOaJk+E6L._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 56,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-10',
    slug: '14k-wedding-band-g5z2',
    name: 'Womens 14k White Gold Rolling Ring Three Interlocking Polished Bands Russian Style Wedding B…',
    tagline: '14K wedding band — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Wedding band' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 1664,
    asin: 'B085T5G5Z2',
    searchKeywords: '14K Wedding band solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/711am5WYwiL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61FTQycfZBL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71dOaJk+E6L._AC_SL1000_.jpg',
    ],
    rating: 4.3,
    hue: 57,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-11',
    slug: '14k-gold-pendant-fpww',
    name: 'Houston Diamond District 0.5 to 10 CT Lab Grown Diamond Solitaire Pendant | 14K White Gold R…',
    tagline: '14K gold pendant — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Gold pendant' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 1706,
    asin: 'B0F749FPWW',
    searchKeywords: '14K Gold pendant solid gold women',
    badge: 'Big ticket',
    images: [
      'https://m.media-amazon.com/images/I/41nawlyqrnS._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41X8XDGkqML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41krV7XMFCL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/318lh+n8BlL._AC_SL1000_.jpg',
    ],
    rating: 5,
    hue: 58,
    materialFamily: 'gold',
    source: 'curated',
  },
  {
    id: 'ad-gold-12',
    slug: '14k-box-chain-2aaa',
    name: 'Jewelry Affairs 14k Yellow Real Gold Adjustable Box Chain Necklace, 1.15mm, 22&#34;',
    tagline: '14K box chain — solid gold polish $500+.',
    description:
      'Elevated solid-gold jewelry from Amazon (\$500+ focus). Verify karat, weight, and seller details on Amazon.',
    category: 'gold',
    collection: 'Gold',
    brand: 'Fine Gold',
    material: '14K gold',
    features: [
      'Solid gold $500+',
      '14K gold piece',
      'Big-ticket gold polish',
      'Pairs with handbags and watches',
    ],
    specs: [
      { label: 'Type', value: 'Box chain' },
      { label: 'Karat', value: '14K' },
      { label: 'Metal', value: 'Gold (verify listing)' },
    ],
    priceHint: 1016,
    asin: 'B004EU2AAA',
    searchKeywords: '14K Box chain solid gold women',
    badge: 'Gold $500+',
    images: [
      'https://m.media-amazon.com/images/I/71-AL35GIML._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61w5KbT7-iL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51FDd8fjLpL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71KXutDYxUL._AC_SL1000_.jpg',
    ],
    rating: 4.4,
    hue: 59,
    materialFamily: 'gold',
    source: 'curated',
  },
{
  "id": "ad-101",
  "slug": "medicube-medicube-capsule-cream-salmon-dna-pdrn",
  "name": "medicube Capsule Cream with Salmon DNA PDRN",
  "tagline": "1.94 oz (55 g); all skin types",
  "description": "medicube Capsule Cream with Salmon DNA PDRN. 1.94 oz (55 g); all skin types",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "medicube",
  "material": "Formula",
  "features": [
    "1.94 oz (55 g); all skin types",
    "Listed around $20 on the product page",
    "medicube skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.94 oz (55 g); all skin types"
    },
    {
      "label": "Price seen",
      "value": "about $20"
    },
    {
      "label": "Brand",
      "value": "medicube"
    }
  ],
  "priceHint": 20,
  "asin": "B0DTKCN3Z4",
  "searchKeywords": "medicube medicube Capsule Cream with Salmon DNA PDRN",
  "badge": "New",
  "images": [],
  "hue": 40,
  "source": "curated",
},
{
  "id": "ad-102",
  "slug": "revlon-revlon-colorstay-overtime-lipcolor-350-bare-maximum",
  "name": "Revlon ColorStay Overtime Lipcolor, 350 Bare Maximum",
  "tagline": "0.07 fl oz (2 ml); available in 30 shades",
  "description": "Revlon ColorStay Overtime Lipcolor, 350 Bare Maximum. 0.07 fl oz (2 ml); available in 30 shades",
  "category": "lips",
  "collection": "Lips",
  "brand": "Revlon",
  "material": "Formula",
  "features": [
    "0.07 fl oz (2 ml); available in 30 shades",
    "Listed around $9 on the product page",
    "Revlon lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.07 fl oz (2 ml); available in 30 shades"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "Revlon"
    }
  ],
  "priceHint": 9,
  "asin": "B001P2JZBC",
  "searchKeywords": "Revlon Revlon ColorStay Overtime Lipcolor, 350 Bare Maximum",
  "badge": "New",
  "images": [],
  "hue": 336,
  "source": "curated",
},
{
  "id": "ad-103",
  "slug": "vanicream-vanicream-daily-facial-moisturizer-lightweight-non-greasy",
  "name": "Vanicream Daily Facial Moisturizer, Lightweight, Non-Greasy, 3 Fl",
  "tagline": "3 fl oz; fragrance-free formula for sensitive skin",
  "description": "Vanicream Daily Facial Moisturizer, Lightweight, Non-Greasy, 3 Fl. 3 fl oz; fragrance-free formula for sensitive skin",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "Vanicream",
  "material": "Formula",
  "features": [
    "3 fl oz; fragrance-free formula for sensitive skin",
    "Listed around $18 on the product page",
    "Vanicream skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3 fl oz; fragrance-free formula for sensitive skin"
    },
    {
      "label": "Price seen",
      "value": "about $18"
    },
    {
      "label": "Brand",
      "value": "Vanicream"
    }
  ],
  "priceHint": 18,
  "asin": "B08BW46XXK",
  "searchKeywords": "Vanicream Vanicream Daily Facial Moisturizer, Lightweight, Non-Greasy, 3 Fl",
  "badge": "New",
  "images": [],
  "hue": 128,
  "source": "curated",
},
{
  "id": "ad-104",
  "slug": "olay-olay-face-moisturizer-regenerist-micro-sculpting-cream",
  "name": "Olay Face Moisturizer, Regenerist Micro-Sculpting Cream for Women,",
  "tagline": "1.7 oz, fragrance-free",
  "description": "Olay Face Moisturizer, Regenerist Micro-Sculpting Cream for Women,. 1.7 oz, fragrance-free",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "Olay",
  "material": "Formula",
  "features": [
    "1.7 oz, fragrance-free",
    "Listed around $24 on the product page",
    "Olay skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 oz, fragrance-free"
    },
    {
      "label": "Price seen",
      "value": "about $24"
    },
    {
      "label": "Brand",
      "value": "Olay"
    }
  ],
  "priceHint": 24,
  "asin": "B007M81B4M",
  "searchKeywords": "Olay Olay Face Moisturizer, Regenerist Micro-Sculpting Cream for Women,",
  "badge": "New",
  "images": [],
  "hue": 166,
  "source": "curated",
},
{
  "id": "ad-105",
  "slug": "medicube-medicube-jelly-cream-hyaluronic-acid-long-lasting",
  "name": "medicube Jelly Cream with Hyaluronic Acid for Long-lasting",
  "tagline": "medicube Jelly Cream with Hyaluronic Acid for Long-lasting — 1.69 fl.oz (50 ml)",
  "description": "medicube Jelly Cream with Hyaluronic Acid for Long-lasting. 1.69 fl.oz (50 ml)",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "medicube",
  "material": "Formula",
  "features": [
    "1.69 fl.oz (50 ml)",
    "Listed around $15 on the product page",
    "medicube skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.69 fl.oz (50 ml)"
    },
    {
      "label": "Price seen",
      "value": "about $15"
    },
    {
      "label": "Brand",
      "value": "medicube"
    }
  ],
  "priceHint": 15,
  "asin": "B0FPQ3Z16S",
  "searchKeywords": "medicube medicube Jelly Cream with Hyaluronic Acid for Long-lasting",
  "badge": "New",
  "images": [],
  "hue": 100,
  "source": "curated",
},
{
  "id": "ad-106",
  "slug": "aestura-aestura-atobarrier365-cream-ceramides-80-ml",
  "name": "AESTURA ATOBARRIER365 Cream with Ceramides, 80 ML",
  "tagline": "AESTURA ATOBARRIER365 Cream with Ceramides, 80 ML — 80 mL / 2.70 fl oz",
  "description": "AESTURA ATOBARRIER365 Cream with Ceramides, 80 ML. 80 mL / 2.70 fl oz",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "AESTURA",
  "material": "Formula",
  "features": [
    "80 mL / 2.70 fl oz",
    "Listed around $32 on the product page",
    "AESTURA skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "80 mL / 2.70 fl oz"
    },
    {
      "label": "Price seen",
      "value": "about $32"
    },
    {
      "label": "Brand",
      "value": "AESTURA"
    }
  ],
  "priceHint": 32,
  "asin": "B09YDCCJBJ",
  "searchKeywords": "AESTURA AESTURA ATOBARRIER365 Cream with Ceramides, 80 ML",
  "badge": "New",
  "images": [],
  "hue": 55,
  "source": "curated",
},
{
  "id": "ad-107",
  "slug": "revlon-revlon-colorstay-pencil-waterproof-eyeliner-202-black",
  "name": "Revlon ColorStay Pencil Waterproof Eyeliner, 202 Black Brown",
  "tagline": "0.01 oz (0.28 ml) pencil; waterproof, smudge-proof formula, available in 13 shades",
  "description": "Revlon ColorStay Pencil Waterproof Eyeliner, 202 Black Brown. 0.01 oz (0.28 ml) pencil; waterproof, smudge-proof formula, available in 13 shades",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Revlon",
  "material": "Formula",
  "features": [
    "0.01 oz (0.28 ml) pencil; waterproof, smudge-proof formula, available in 13 shades",
    "Listed around $8 on the product page",
    "Revlon makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.01 oz (0.28 ml) pencil; waterproof, smudge-proof formula, available in 13 shad"
    },
    {
      "label": "Price seen",
      "value": "about $8"
    },
    {
      "label": "Brand",
      "value": "Revlon"
    }
  ],
  "priceHint": 8,
  "asin": "B000H3I2JG",
  "searchKeywords": "Revlon Revlon ColorStay Pencil Waterproof Eyeliner, 202 Black Brown",
  "badge": "New",
  "images": [],
  "hue": 196,
  "source": "curated",
},
{
  "id": "ad-108",
  "slug": "l-oreal-paris-l-oreal-paris-revitalift-triple",
  "name": "L'Oreal Paris Revitalift Triple Power Anti-Aging Face Moisturizer, Pro",
  "tagline": "1.7 oz / 50 ml jar; scented (fragrance) formula",
  "description": "L'Oreal Paris Revitalift Triple Power Anti-Aging Face Moisturizer, Pro. 1.7 oz / 50 ml jar; scented (fragrance) formula",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "L'Oreal Paris",
  "material": "Formula",
  "features": [
    "1.7 oz / 50 ml jar; scented (fragrance) formula",
    "Listed around $21 on the product page",
    "L'Oreal Paris skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 oz / 50 ml jar; scented (fragrance) formula"
    },
    {
      "label": "Price seen",
      "value": "about $21"
    },
    {
      "label": "Brand",
      "value": "L'Oreal Paris"
    }
  ],
  "priceHint": 21,
  "asin": "B008EKY8VK",
  "searchKeywords": "L'Oreal Paris L'Oreal Paris Revitalift Triple Power Anti-Aging Face Moisturizer, Pro",
  "badge": "New",
  "images": [],
  "hue": 56,
  "source": "curated",
},
{
  "id": "ad-109",
  "slug": "purito-purito-oat-calming-gel-cream-sensitive-skin",
  "name": "PURITO Oat Calming Gel Cream for Sensitive Skin,",
  "tagline": "PURITO Oat Calming Gel Cream for Sensitive Skin, — 100 ml / 3.38 fl.oz",
  "description": "PURITO Oat Calming Gel Cream for Sensitive Skin,. 100 ml / 3.38 fl.oz",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "PURITO",
  "material": "Formula",
  "features": [
    "100 ml / 3.38 fl.oz",
    "Listed around $17 on the product page",
    "PURITO skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "100 ml / 3.38 fl.oz"
    },
    {
      "label": "Price seen",
      "value": "about $17"
    },
    {
      "label": "Brand",
      "value": "PURITO"
    }
  ],
  "priceHint": 17,
  "asin": "B09C1LW874",
  "searchKeywords": "PURITO PURITO Oat Calming Gel Cream for Sensitive Skin,",
  "badge": "New",
  "images": [],
  "hue": 40,
  "source": "curated",
},
{
  "id": "ad-110",
  "slug": "terra-lotus-terra-lotus-organic-grass-fed-beef",
  "name": "Terra Lotus Organic Grass-Fed Beef Tallow Balm with Raw",
  "tagline": "2 Oz (56 g), Unscented",
  "description": "Terra Lotus Organic Grass-Fed Beef Tallow Balm with Raw. 2 Oz (56 g), Unscented",
  "category": "skincare",
  "collection": "Skincare",
  "brand": "Terra Lotus",
  "material": "Formula",
  "features": [
    "2 Oz (56 g), Unscented",
    "Listed around $20 on the product page",
    "Terra Lotus skincare",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "2 Oz (56 g), Unscented"
    },
    {
      "label": "Price seen",
      "value": "about $20"
    },
    {
      "label": "Brand",
      "value": "Terra Lotus"
    }
  ],
  "priceHint": 20,
  "asin": "B0FFW9SQRW",
  "searchKeywords": "Terra Lotus Terra Lotus Organic Grass-Fed Beef Tallow Balm with Raw",
  "badge": "New",
  "images": [],
  "hue": 140,
  "source": "curated",
},
{
  "id": "ad-111",
  "slug": "maybelline-maybelline-color-sensational-lipstick-lip-makeup-cream",
  "name": "Maybelline Color Sensational Lipstick, Lip Makeup, Cream Finish,",
  "tagline": "0.15 oz; 22-shade range (Pink Wink is a cool-toned medium pink)",
  "description": "Maybelline Color Sensational Lipstick, Lip Makeup, Cream Finish,. 0.15 oz; 22-shade range (Pink Wink is a cool-toned medium pink)",
  "category": "lips",
  "collection": "Lips",
  "brand": "Maybelline",
  "material": "Formula",
  "features": [
    "0.15 oz; 22-shade range (Pink Wink is a cool-toned medium pink)",
    "Listed around $6 on the product page",
    "Maybelline lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.15 oz; 22-shade range (Pink Wink is a cool-toned medium pink)"
    },
    {
      "label": "Price seen",
      "value": "about $6"
    },
    {
      "label": "Brand",
      "value": "Maybelline"
    }
  ],
  "priceHint": 6,
  "asin": "B002LFNOVY",
  "searchKeywords": "Maybelline Maybelline Color Sensational Lipstick, Lip Makeup, Cream Finish,",
  "badge": "New",
  "images": [],
  "hue": 286,
  "source": "curated",
},
{
  "id": "ad-112",
  "slug": "covergirl-covergirl-outlast-all-day-lip-color-moisturizing",
  "name": "COVERGIRL Outlast All-Day Lip Color with Moisturizing Topcoat,",
  "tagline": "New Neutrals Shade Collection (7 shades); shade Good Mauve 140",
  "description": "COVERGIRL Outlast All-Day Lip Color with Moisturizing Topcoat,. New Neutrals Shade Collection (7 shades); shade Good Mauve 140",
  "category": "lips",
  "collection": "Lips",
  "brand": "COVERGIRL",
  "material": "Formula",
  "features": [
    "New Neutrals Shade Collection (7 shades); shade Good Mauve 140",
    "Listed around $9 on the product page",
    "COVERGIRL lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "New Neutrals Shade Collection (7 shades); shade Good Mauve 140"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "COVERGIRL"
    }
  ],
  "priceHint": 9,
  "asin": "B08Q1L93C3",
  "searchKeywords": "COVERGIRL COVERGIRL Outlast All-Day Lip Color with Moisturizing Topcoat,",
  "badge": "New",
  "images": [],
  "hue": 219,
  "source": "curated",
},
{
  "id": "ad-113",
  "slug": "maybelline-maybelline-serum-lipstick-hydrating-lip-makeup-8hrs",
  "name": "Maybelline Serum Lipstick, Hydrating Lip Makeup with 8HRs",
  "tagline": "0.12 oz; 16 shades total (8 matte, 8 satin)",
  "description": "Maybelline Serum Lipstick, Hydrating Lip Makeup with 8HRs. 0.12 oz; 16 shades total (8 matte, 8 satin)",
  "category": "lips",
  "collection": "Lips",
  "brand": "Maybelline",
  "material": "Formula",
  "features": [
    "0.12 oz; 16 shades total (8 matte, 8 satin)",
    "Listed around $8 on the product page",
    "Maybelline lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.12 oz; 16 shades total (8 matte, 8 satin)"
    },
    {
      "label": "Price seen",
      "value": "about $8"
    },
    {
      "label": "Brand",
      "value": "Maybelline"
    }
  ],
  "priceHint": 8,
  "asin": "B0FTT9WMD9",
  "searchKeywords": "Maybelline Maybelline Serum Lipstick, Hydrating Lip Makeup with 8HRs",
  "badge": "New",
  "images": [],
  "hue": 189,
  "source": "curated",
},
{
  "id": "ad-114",
  "slug": "evpct-evpct-3pcs-dark-red-purple-plum-matte",
  "name": "evpct 3Pcs Dark Red Purple Plum Matte Liquid",
  "tagline": "3 x 0.21 fl oz (0.63 fl oz total)",
  "description": "evpct 3Pcs Dark Red Purple Plum Matte Liquid. 3 x 0.21 fl oz (0.63 fl oz total)",
  "category": "lips",
  "collection": "Lips",
  "brand": "evpct",
  "material": "Formula",
  "features": [
    "3 x 0.21 fl oz (0.63 fl oz total)",
    "Listed around $8 on the product page",
    "evpct lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3 x 0.21 fl oz (0.63 fl oz total)"
    },
    {
      "label": "Price seen",
      "value": "about $8"
    },
    {
      "label": "Brand",
      "value": "evpct"
    }
  ],
  "priceHint": 8,
  "asin": "B0CCDG5NHJ",
  "searchKeywords": "evpct evpct 3Pcs Dark Red Purple Plum Matte Liquid",
  "badge": "New",
  "images": [],
  "hue": 343,
  "source": "curated",
},
{
  "id": "ad-115",
  "slug": "lip-bar-lip-bar-nonstop-liquid-matte-lipstick",
  "name": "The Lip Bar Nonstop Liquid Matte Lipstick, Bawse Lady",
  "tagline": "0.24 fl oz liquid matte lipstick; full-coverage, cool deep-red shade",
  "description": "The Lip Bar Nonstop Liquid Matte Lipstick, Bawse Lady. 0.24 fl oz liquid matte lipstick; full-coverage, cool deep-red shade",
  "category": "lips",
  "collection": "Lips",
  "brand": "The Lip Bar",
  "material": "Formula",
  "features": [
    "0.24 fl oz liquid matte lipstick; full-coverage, cool deep-red shade",
    "Listed around $13 on the product page",
    "The Lip Bar lips",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.24 fl oz liquid matte lipstick; full-coverage, cool deep-red shade"
    },
    {
      "label": "Price seen",
      "value": "about $13"
    },
    {
      "label": "Brand",
      "value": "The Lip Bar"
    }
  ],
  "priceHint": 13,
  "asin": "B07CKFQXNZ",
  "searchKeywords": "The Lip Bar The Lip Bar Nonstop Liquid Matte Lipstick, Bawse Lady",
  "badge": "New",
  "images": [],
  "hue": 287,
  "source": "curated",
},
{
  "id": "ad-116",
  "slug": "marc-anthony-marc-anthony-grow-long-detangling-leave",
  "name": "Marc Anthony Grow Long, Detangling Leave-In Hair Conditioner Spray",
  "tagline": "8.4 fl oz / 250 ml bottle; sulfate-free leave-in spray for dry, damaged hair",
  "description": "Marc Anthony Grow Long, Detangling Leave-In Hair Conditioner Spray. 8.4 fl oz / 250 ml bottle; sulfate-free leave-in spray for dry, damaged hair",
  "category": "hair",
  "collection": "Hair",
  "brand": "Marc Anthony",
  "material": "Formula",
  "features": [
    "8.4 fl oz / 250 ml bottle; sulfate-free leave-in spray for dry, damaged hair",
    "Listed around $9 on the product page",
    "Marc Anthony hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "8.4 fl oz / 250 ml bottle; sulfate-free leave-in spray for dry, damaged hair"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "Marc Anthony"
    }
  ],
  "priceHint": 9,
  "asin": "B076FHJ3K5",
  "searchKeywords": "Marc Anthony Marc Anthony Grow Long, Detangling Leave-In Hair Conditioner Spray",
  "badge": "New",
  "images": [],
  "hue": 293,
  "source": "curated",
},
{
  "id": "ad-117",
  "slug": "essence-essence-lash-princess-false-lash-effect-mascara",
  "name": "essence Lash Princess False Lash Effect Mascara",
  "tagline": "0.4 fl oz, shade Black, wrong for those who want a waterproof mascara",
  "description": "essence Lash Princess False Lash Effect Mascara. 0.4 fl oz, shade Black, wrong for those who want a waterproof mascara",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "essence",
  "material": "Formula",
  "features": [
    "0.4 fl oz, shade Black, wrong for those who want a waterproof mascara",
    "Listed around $5 on the product page",
    "essence makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.4 fl oz, shade Black, wrong for those who want a waterproof mascara"
    },
    {
      "label": "Price seen",
      "value": "about $5"
    },
    {
      "label": "Brand",
      "value": "essence"
    }
  ],
  "priceHint": 5,
  "asin": "B00T0C9XRK",
  "searchKeywords": "essence essence Lash Princess False Lash Effect Mascara",
  "badge": "New",
  "images": [],
  "hue": 56,
  "source": "curated",
},
{
  "id": "ad-118",
  "slug": "native-native-coconut-vanilla-shampoo-conditioner",
  "name": "Native Coconut & Vanilla Shampoo and Conditioner",
  "tagline": "16.5 fl oz each (2-pack), scent Coconut & Vanilla, wrong for those who dislike sweet cocon",
  "description": "Native Coconut & Vanilla Shampoo and Conditioner. 16.5 fl oz each (2-pack), scent Coconut & Vanilla, wrong for those who dislike sweet coconut-vanilla scents",
  "category": "hair",
  "collection": "Hair",
  "brand": "Native",
  "material": "Formula",
  "features": [
    "16.5 fl oz each (2-pack), scent Coconut & Vanilla, wrong for those who dislike sweet coc",
    "Listed around $22 on the product page",
    "Native hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "16.5 fl oz each (2-pack), scent Coconut & Vanilla, wrong for those who dislike s"
    },
    {
      "label": "Price seen",
      "value": "about $22"
    },
    {
      "label": "Brand",
      "value": "Native"
    }
  ],
  "priceHint": 22,
  "asin": "B0BBBSMV94",
  "searchKeywords": "Native Native Coconut & Vanilla Shampoo and Conditioner",
  "badge": "New",
  "images": [],
  "hue": 328,
  "source": "curated",
},
{
  "id": "ad-119",
  "slug": "wavytalk-wavytalk-thermal-brush-1-5-heated-round",
  "name": "Wavytalk Thermal Brush 1.5″ Heated Round Brush for",
  "tagline": "1.5 inch barrel, 5 heat settings (300-420°F), dry hair only",
  "description": "Wavytalk Thermal Brush 1.5″ Heated Round Brush for. 1.5 inch barrel, 5 heat settings (300-420°F), dry hair only",
  "category": "tools",
  "collection": "Tools",
  "brand": "Wavytalk",
  "material": "Formula",
  "features": [
    "1.5 inch barrel, 5 heat settings (300-420°F), dry hair only",
    "Listed around $50 on the product page",
    "Wavytalk tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.5 inch barrel, 5 heat settings (300-420°F), dry hair only"
    },
    {
      "label": "Price seen",
      "value": "about $50"
    },
    {
      "label": "Brand",
      "value": "Wavytalk"
    }
  ],
  "priceHint": 50,
  "asin": "B0CQSNXLJR",
  "searchKeywords": "Wavytalk Wavytalk Thermal Brush 1.5″ Heated Round Brush for",
  "badge": "New",
  "images": [],
  "hue": 135,
  "source": "curated",
},
{
  "id": "ad-120",
  "slug": "tresemm-tresemm-rich-moisture-shampoo-conditioner-set",
  "name": "TRESemmé Rich Moisture Shampoo & Conditioner Set",
  "tagline": "16.5 oz each (2-pack), Rich Moisture with hyaluronic acid, scented — wrong for those who w",
  "description": "TRESemmé Rich Moisture Shampoo & Conditioner Set. 16.5 oz each (2-pack), Rich Moisture with hyaluronic acid, scented — wrong for those who want a fragrance-free formula",
  "category": "hair",
  "collection": "Hair",
  "brand": "TRESemmé",
  "material": "Formula",
  "features": [
    "16.5 oz each (2-pack), Rich Moisture with hyaluronic acid, scented — wrong for those who",
    "Listed around $11 on the product page",
    "TRESemmé hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "16.5 oz each (2-pack), Rich Moisture with hyaluronic acid, scented — wrong for t"
    },
    {
      "label": "Price seen",
      "value": "about $11"
    },
    {
      "label": "Brand",
      "value": "TRESemmé"
    }
  ],
  "priceHint": 11,
  "asin": "B0DXQFGJBJ",
  "searchKeywords": "TRESemmé TRESemmé Rich Moisture Shampoo & Conditioner Set",
  "badge": "New",
  "images": [],
  "hue": 343,
  "source": "curated",
},
{
  "id": "ad-121",
  "slug": "pantene-pantene-shampoo-conditioner-set-daily-moisture-renewal",
  "name": "Pantene Shampoo & Conditioner Set, Daily Moisture Renewal",
  "tagline": "52.8 fl oz total, for dry, color-treated, straight-to-curly hair",
  "description": "Pantene Shampoo & Conditioner Set, Daily Moisture Renewal. 52.8 fl oz total, for dry, color-treated, straight-to-curly hair",
  "category": "hair",
  "collection": "Hair",
  "brand": "Pantene",
  "material": "Formula",
  "features": [
    "52.8 fl oz total, for dry, color-treated, straight-to-curly hair",
    "Listed around $19 on the product page",
    "Pantene hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "52.8 fl oz total, for dry, color-treated, straight-to-curly hair"
    },
    {
      "label": "Price seen",
      "value": "about $19"
    },
    {
      "label": "Brand",
      "value": "Pantene"
    }
  ],
  "priceHint": 19,
  "asin": "B0GPDP1NQ1",
  "searchKeywords": "Pantene Pantene Shampoo & Conditioner Set, Daily Moisture Renewal",
  "badge": "New",
  "images": [],
  "hue": 1,
  "source": "curated",
},
{
  "id": "ad-122",
  "slug": "e-l-f-e-l-f-instant-lift",
  "name": "e.l.f. Instant Lift Brow Pencil",
  "tagline": "0.01 oz, shade Blonde, wrong for dark brown or black hair",
  "description": "e.l.f. Instant Lift Brow Pencil. 0.01 oz, shade Blonde, wrong for dark brown or black hair",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "e.l.f.",
  "material": "Formula",
  "features": [
    "0.01 oz, shade Blonde, wrong for dark brown or black hair",
    "Listed around $4 on the product page",
    "e.l.f. makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.01 oz, shade Blonde, wrong for dark brown or black hair"
    },
    {
      "label": "Price seen",
      "value": "about $4"
    },
    {
      "label": "Brand",
      "value": "e.l.f."
    }
  ],
  "priceHint": 4,
  "asin": "B07PBQZ3KF",
  "searchKeywords": "e.l.f. e.l.f. Instant Lift Brow Pencil",
  "badge": "New",
  "images": [],
  "hue": 303,
  "source": "curated",
},
{
  "id": "ad-123",
  "slug": "l-oreal-paris-l-oreal-paris-elvive-hyaluron",
  "name": "L'Oreal Paris Elvive Hyaluron Plump Shampoo and Conditioner Set",
  "tagline": "53 Fl Oz, for dry/dehydrated hair, wrong for those who dislike a lightweight non-greasy fi",
  "description": "L'Oreal Paris Elvive Hyaluron Plump Shampoo and Conditioner Set. 53 Fl Oz, for dry/dehydrated hair, wrong for those who dislike a lightweight non-greasy finish",
  "category": "hair",
  "collection": "Hair",
  "brand": "L'Oreal Paris",
  "material": "Formula",
  "features": [
    "53 Fl Oz, for dry/dehydrated hair, wrong for those who dislike a lightweight non-greasy ",
    "Listed around $17 on the product page",
    "L'Oreal Paris hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "53 Fl Oz, for dry/dehydrated hair, wrong for those who dislike a lightweight non"
    },
    {
      "label": "Price seen",
      "value": "about $17"
    },
    {
      "label": "Brand",
      "value": "L'Oreal Paris"
    }
  ],
  "priceHint": 17,
  "asin": "B0BJNX6R5X",
  "searchKeywords": "L'Oreal Paris L'Oreal Paris Elvive Hyaluron Plump Shampoo and Conditioner Set",
  "badge": "New",
  "images": [],
  "hue": 213,
  "source": "curated",
},
{
  "id": "ad-124",
  "slug": "l-or-al-paris-l-or-al-paris",
  "name": "L'Oréal Paris Voluminous Original Mascara",
  "tagline": "0.28 fl. oz., Blackest Black shade",
  "description": "L'Oréal Paris Voluminous Original Mascara. 0.28 fl. oz., Blackest Black shade",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "L'Oréal Paris",
  "material": "Formula",
  "features": [
    "0.28 fl. oz., Blackest Black shade",
    "Listed around $9 on the product page",
    "L'Oréal Paris makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.28 fl. oz., Blackest Black shade"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "L'Oréal Paris"
    }
  ],
  "priceHint": 9,
  "asin": "B004BIZ0PM",
  "searchKeywords": "L'Oréal Paris L'Oréal Paris Voluminous Original Mascara",
  "badge": "New",
  "images": [],
  "hue": 346,
  "source": "curated",
},
{
  "id": "ad-125",
  "slug": "l-oreal-paris-l-oreal-paris-everpure-moisture",
  "name": "L'Oreal Paris EverPure Moisture Shampoo and Conditioner Set",
  "tagline": "17 fl oz set, rosemary botanicals scent",
  "description": "L'Oreal Paris EverPure Moisture Shampoo and Conditioner Set. 17 fl oz set, rosemary botanicals scent",
  "category": "hair",
  "collection": "Hair",
  "brand": "L'Oreal Paris",
  "material": "Formula",
  "features": [
    "17 fl oz set, rosemary botanicals scent",
    "Listed around $18 on the product page",
    "L'Oreal Paris hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "17 fl oz set, rosemary botanicals scent"
    },
    {
      "label": "Price seen",
      "value": "about $18"
    },
    {
      "label": "Brand",
      "value": "L'Oreal Paris"
    }
  ],
  "priceHint": 18,
  "asin": "B07QC43BXB",
  "searchKeywords": "L'Oreal Paris L'Oreal Paris EverPure Moisture Shampoo and Conditioner Set",
  "badge": "New",
  "images": [],
  "hue": 263,
  "source": "curated",
},
{
  "id": "ad-126",
  "slug": "ouai-ouai-fine-hair-shampoo-conditioner-set",
  "name": "OUAI Fine Hair Shampoo and Conditioner Set",
  "tagline": "10 oz, Fine Hair (volumizing) formula, sulfate-free, wrong for thick/coily hair types",
  "description": "OUAI Fine Hair Shampoo and Conditioner Set. 10 oz, Fine Hair (volumizing) formula, sulfate-free, wrong for thick/coily hair types",
  "category": "hair",
  "collection": "Hair",
  "brand": "OUAI",
  "material": "Formula",
  "features": [
    "10 oz, Fine Hair (volumizing) formula, sulfate-free, wrong for thick/coily hair types",
    "Listed around $64 on the product page",
    "OUAI hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "10 oz, Fine Hair (volumizing) formula, sulfate-free, wrong for thick/coily hair "
    },
    {
      "label": "Price seen",
      "value": "about $64"
    },
    {
      "label": "Brand",
      "value": "OUAI"
    }
  ],
  "priceHint": 64,
  "asin": "B084ZWKJ8S",
  "searchKeywords": "OUAI OUAI Fine Hair Shampoo and Conditioner Set",
  "badge": "New",
  "images": [],
  "hue": 100,
  "source": "curated",
},
{
  "id": "ad-127",
  "slug": "grande-cosmetics-grande-cosmetics-grandelash-md-lash-enhancing",
  "name": "Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum",
  "tagline": "1 mL, 6-week starter supply, wrong for those wanting the full-size 3-month supply",
  "description": "Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum. 1 mL, 6-week starter supply, wrong for those wanting the full-size 3-month supply",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Grande Cosmetics",
  "material": "Formula",
  "features": [
    "1 mL, 6-week starter supply, wrong for those wanting the full-size 3-month supply",
    "Listed around $36 on the product page",
    "Grande Cosmetics makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1 mL, 6-week starter supply, wrong for those wanting the full-size 3-month suppl"
    },
    {
      "label": "Price seen",
      "value": "about $36"
    },
    {
      "label": "Brand",
      "value": "Grande Cosmetics"
    }
  ],
  "priceHint": 36,
  "asin": "B082WZTJV5",
  "searchKeywords": "Grande Cosmetics Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum",
  "badge": "New",
  "images": [],
  "hue": 257,
  "source": "curated",
},
{
  "id": "ad-128",
  "slug": "wet-n-wild-wet-n-wild-mega-last",
  "name": "wet n wild Mega Last Breakup Proof Waterproof Retractable Gel",
  "tagline": "Blackest Black shade, 16-hour wear, waterproof satin gel finish, wrong for those wanting a",
  "description": "wet n wild Mega Last Breakup Proof Waterproof Retractable Gel. Blackest Black shade, 16-hour wear, waterproof satin gel finish, wrong for those wanting a fine liquid brush tip",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "wet n wild",
  "material": "Formula",
  "features": [
    "Blackest Black shade, 16-hour wear, waterproof satin gel finish, wrong for those wanting",
    "Listed around $2 on the product page",
    "wet n wild makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "Blackest Black shade, 16-hour wear, waterproof satin gel finish, wrong for those"
    },
    {
      "label": "Price seen",
      "value": "about $2"
    },
    {
      "label": "Brand",
      "value": "wet n wild"
    }
  ],
  "priceHint": 2,
  "asin": "B082YPRCMM",
  "searchKeywords": "wet n wild wet n wild Mega Last Breakup Proof Waterproof Retractable Gel",
  "badge": "New",
  "images": [],
  "hue": 238,
  "source": "curated",
},
{
  "id": "ad-129",
  "slug": "dyson-dyson-supersonic-origin-hair-dryer",
  "name": "Dyson Supersonic Origin Hair Dryer",
  "tagline": "1600 W, 4 heat settings up to 212°F, includes only 1 styling concentrator attachment, wron",
  "description": "Dyson Supersonic Origin Hair Dryer. 1600 W, 4 heat settings up to 212°F, includes only 1 styling concentrator attachment, wrong for those who want a diffuser",
  "category": "tools",
  "collection": "Tools",
  "brand": "Dyson",
  "material": "Formula",
  "features": [
    "1600 W, 4 heat settings up to 212°F, includes only 1 styling concentrator attachment, wr",
    "Listed around $400 on the product page",
    "Dyson tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1600 W, 4 heat settings up to 212°F, includes only 1 styling concentrator attach"
    },
    {
      "label": "Price seen",
      "value": "about $400"
    },
    {
      "label": "Brand",
      "value": "Dyson"
    }
  ],
  "priceHint": 400,
  "asin": "B0CF391P2L",
  "searchKeywords": "Dyson Dyson Supersonic Origin Hair Dryer",
  "badge": "New",
  "images": [],
  "hue": 309,
  "source": "curated",
},
{
  "id": "ad-130",
  "slug": "mielle-organics-mielle-organics-rosemary-mint-hair-oil",
  "name": "Mielle Organics Rosemary Mint Hair Oil with Biotin",
  "tagline": "2 oz, rosemary mint scent, wrong for those who dislike herbal mint fragrance",
  "description": "Mielle Organics Rosemary Mint Hair Oil with Biotin. 2 oz, rosemary mint scent, wrong for those who dislike herbal mint fragrance",
  "category": "hair",
  "collection": "Hair",
  "brand": "Mielle Organics",
  "material": "Formula",
  "features": [
    "2 oz, rosemary mint scent, wrong for those who dislike herbal mint fragrance",
    "Listed around $9 on the product page",
    "Mielle Organics hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "2 oz, rosemary mint scent, wrong for those who dislike herbal mint fragrance"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "Mielle Organics"
    }
  ],
  "priceHint": 9,
  "asin": "B07N7PK9QK",
  "searchKeywords": "Mielle Organics Mielle Organics Rosemary Mint Hair Oil with Biotin",
  "badge": "New",
  "images": [],
  "hue": 308,
  "source": "curated",
},
{
  "id": "ad-131",
  "slug": "chi-chi-original-1-ceramic-hair-straightener-flat",
  "name": "CHI Original 1\" Ceramic Hair Straightener Flat Iron",
  "tagline": "1 inch ceramic floating plates, fixed heat setting with analog on/off switch, wrong for th",
  "description": "CHI Original 1\" Ceramic Hair Straightener Flat Iron. 1 inch ceramic floating plates, fixed heat setting with analog on/off switch, wrong for those who need adjustable temperature",
  "category": "tools",
  "collection": "Tools",
  "brand": "CHI",
  "material": "Formula",
  "features": [
    "1 inch ceramic floating plates, fixed heat setting with analog on/off switch, wrong for ",
    "Listed around $44 on the product page",
    "CHI tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1 inch ceramic floating plates, fixed heat setting with analog on/off switch, wr"
    },
    {
      "label": "Price seen",
      "value": "about $44"
    },
    {
      "label": "Brand",
      "value": "CHI"
    }
  ],
  "priceHint": 44,
  "asin": "B0009V1YR8",
  "searchKeywords": "CHI CHI Original 1\" Ceramic Hair Straightener Flat Iron",
  "badge": "New",
  "images": [],
  "hue": 116,
  "source": "curated",
},
{
  "id": "ad-132",
  "slug": "babylisspro-babylisspro-nano-titanium-mini-flat-iron-hair",
  "name": "BaBylissPRO Nano Titanium Mini Flat Iron Hair Straightener",
  "tagline": "0.5-inch plates, single 430°F heat setting, wrong for long thick hair",
  "description": "BaBylissPRO Nano Titanium Mini Flat Iron Hair Straightener. 0.5-inch plates, single 430°F heat setting, wrong for long thick hair",
  "category": "tools",
  "collection": "Tools",
  "brand": "BaBylissPRO",
  "material": "Formula",
  "features": [
    "0.5-inch plates, single 430°F heat setting, wrong for long thick hair",
    "Listed around $45 on the product page",
    "BaBylissPRO tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.5-inch plates, single 430°F heat setting, wrong for long thick hair"
    },
    {
      "label": "Price seen",
      "value": "about $45"
    },
    {
      "label": "Brand",
      "value": "BaBylissPRO"
    }
  ],
  "priceHint": 45,
  "asin": "B075LMF5NF",
  "searchKeywords": "BaBylissPRO BaBylissPRO Nano Titanium Mini Flat Iron Hair Straightener",
  "badge": "New",
  "images": [],
  "hue": 339,
  "source": "curated",
},
{
  "id": "ad-133",
  "slug": "eos-eos-cashmere-body-mist-vanilla",
  "name": "eos Cashmere Body Mist- Vanilla",
  "tagline": "6 fl oz, Vanilla Cashmere scent, wrong for those who dislike sweet gourmand vanilla",
  "description": "eos Cashmere Body Mist- Vanilla. 6 fl oz, Vanilla Cashmere scent, wrong for those who dislike sweet gourmand vanilla",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "eos",
  "material": "Formula",
  "features": [
    "6 fl oz, Vanilla Cashmere scent, wrong for those who dislike sweet gourmand vanilla",
    "Listed around $13 on the product page",
    "eos fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "6 fl oz, Vanilla Cashmere scent, wrong for those who dislike sweet gourmand vani"
    },
    {
      "label": "Price seen",
      "value": "about $13"
    },
    {
      "label": "Brand",
      "value": "eos"
    }
  ],
  "priceHint": 13,
  "asin": "B0FM2CCBS1",
  "searchKeywords": "eos eos Cashmere Body Mist- Vanilla",
  "badge": "New",
  "images": [],
  "hue": 289,
  "source": "curated",
},
{
  "id": "ad-134",
  "slug": "sol-de-janeiro-sol-de-janeiro-cheirosa-40",
  "name": "Sol de Janeiro Cheirosa 40 Hair & Body Fragrance Mist",
  "tagline": "240 ml/8.1 fl oz, scent Cheirosa 40 (amber plum, jasmine & vanilla), wrong for those who d",
  "description": "Sol de Janeiro Cheirosa 40 Hair & Body Fragrance Mist. 240 ml/8.1 fl oz, scent Cheirosa 40 (amber plum, jasmine & vanilla), wrong for those who dislike warm floral gourmand scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Sol de Janeiro",
  "material": "Formula",
  "features": [
    "240 ml/8.1 fl oz, scent Cheirosa 40 (amber plum, jasmine & vanilla), wrong for those who",
    "Listed around $39 on the product page",
    "Sol de Janeiro fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "240 ml/8.1 fl oz, scent Cheirosa 40 (amber plum, jasmine & vanilla), wrong for t"
    },
    {
      "label": "Price seen",
      "value": "about $39"
    },
    {
      "label": "Brand",
      "value": "Sol de Janeiro"
    }
  ],
  "priceHint": 39,
  "asin": "B099T9WLZX",
  "searchKeywords": "Sol de Janeiro Sol de Janeiro Cheirosa 40 Hair & Body Fragrance Mist",
  "badge": "New",
  "images": [],
  "hue": 213,
  "source": "curated",
},
{
  "id": "ad-135",
  "slug": "bella-vita-luxury-bellavita-luxury-honey-oud-eau",
  "name": "Bella Vita Luxury Bellavita Luxury Honey Oud Eau de Parfum",
  "tagline": "100 ml (3.4 fl oz), scent Honey Oud, wrong for those who dislike sweet gourmand oud scents",
  "description": "Bella Vita Luxury Bellavita Luxury Honey Oud Eau de Parfum. 100 ml (3.4 fl oz), scent Honey Oud, wrong for those who dislike sweet gourmand oud scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Bella Vita Luxury",
  "material": "Formula",
  "features": [
    "100 ml (3.4 fl oz), scent Honey Oud, wrong for those who dislike sweet gourmand oud scen",
    "Listed around $21 on the product page",
    "Bella Vita Luxury fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "100 ml (3.4 fl oz), scent Honey Oud, wrong for those who dislike sweet gourmand "
    },
    {
      "label": "Price seen",
      "value": "about $21"
    },
    {
      "label": "Brand",
      "value": "Bella Vita Luxury"
    }
  ],
  "priceHint": 21,
  "asin": "B09X5BQ969",
  "searchKeywords": "Bella Vita Luxury Bella Vita Luxury Bellavita Luxury Honey Oud Eau de Parfum",
  "badge": "New",
  "images": [],
  "hue": 9,
  "source": "curated",
},
{
  "id": "ad-136",
  "slug": "bodycology-bodycology-long-lasting-fragrance-body-mist-cherry",
  "name": "Bodycology Long-Lasting Fragrance Body Mist, Cherry Blossom, 8",
  "tagline": "8 fl oz, Cherry Blossom floral scent, wrong for those who dislike sweet floral fragrances",
  "description": "Bodycology Long-Lasting Fragrance Body Mist, Cherry Blossom, 8. 8 fl oz, Cherry Blossom floral scent, wrong for those who dislike sweet floral fragrances",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Bodycology",
  "material": "Formula",
  "features": [
    "8 fl oz, Cherry Blossom floral scent, wrong for those who dislike sweet floral fragrance",
    "Listed around $5 on the product page",
    "Bodycology fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "8 fl oz, Cherry Blossom floral scent, wrong for those who dislike sweet floral f"
    },
    {
      "label": "Price seen",
      "value": "about $5"
    },
    {
      "label": "Brand",
      "value": "Bodycology"
    }
  ],
  "priceHint": 5,
  "asin": "B0D23654ZR",
  "searchKeywords": "Bodycology Bodycology Long-Lasting Fragrance Body Mist, Cherry Blossom, 8",
  "badge": "New",
  "images": [],
  "hue": 351,
  "source": "curated",
},
{
  "id": "ad-137",
  "slug": "dossier-dossier-ambery-saffron-inspired-by-baccarat-rouge",
  "name": "Dossier Ambery Saffron - Inspired by Baccarat Rouge",
  "tagline": "1.7 fl oz (50 ml), scent Ambery Saffron, unisex amber-woody (saffron, amber wood, leather,",
  "description": "Dossier Ambery Saffron - Inspired by Baccarat Rouge. 1.7 fl oz (50 ml), scent Ambery Saffron, unisex amber-woody (saffron, amber wood, leather, warm vanilla) — wrong for those who ",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Dossier",
  "material": "Formula",
  "features": [
    "1.7 fl oz (50 ml), scent Ambery Saffron, unisex amber-woody (saffron, amber wood, leathe",
    "Listed around $39 on the product page",
    "Dossier fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 fl oz (50 ml), scent Ambery Saffron, unisex amber-woody (saffron, amber wood"
    },
    {
      "label": "Price seen",
      "value": "about $39"
    },
    {
      "label": "Brand",
      "value": "Dossier"
    }
  ],
  "priceHint": 39,
  "asin": "B0BZD3PQVZ",
  "searchKeywords": "Dossier Dossier Ambery Saffron - Inspired by Baccarat Rouge",
  "badge": "New",
  "images": [],
  "hue": 215,
  "source": "curated",
},
{
  "id": "ad-138",
  "slug": "victoria-s-secret-victoria-s-secret-body-fragrance",
  "name": "Victoria's Secret Body Fragrance Mist, Pure Seduction",
  "tagline": "8.4 fl oz, scent Pure Seduction (fruity floral: casaba melon, red plum, freesia, sheer mus",
  "description": "Victoria's Secret Body Fragrance Mist, Pure Seduction. 8.4 fl oz, scent Pure Seduction (fruity floral: casaba melon, red plum, freesia, sheer musk)",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Victoria's Secret",
  "material": "Formula",
  "features": [
    "8.4 fl oz, scent Pure Seduction (fruity floral: casaba melon, red plum, freesia, sheer m",
    "Listed around $17 on the product page",
    "Victoria's Secret fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "8.4 fl oz, scent Pure Seduction (fruity floral: casaba melon, red plum, freesia,"
    },
    {
      "label": "Price seen",
      "value": "about $17"
    },
    {
      "label": "Brand",
      "value": "Victoria's Secret"
    }
  ],
  "priceHint": 17,
  "asin": "B0HGHFP1JC",
  "searchKeywords": "Victoria's Secret Victoria's Secret Body Fragrance Mist, Pure Seduction",
  "badge": "New",
  "images": [],
  "hue": 48,
  "source": "curated",
},
{
  "id": "ad-139",
  "slug": "victoria-s-secret-victoria-s-secret-bombshell-summer",
  "name": "Victoria's Secret Bombshell Summer Scented Fragrance Mist",
  "tagline": "8.4 fl oz, scent Bombshell Summer, wrong for those who dislike fruity floral body mists",
  "description": "Victoria's Secret Bombshell Summer Scented Fragrance Mist. 8.4 fl oz, scent Bombshell Summer, wrong for those who dislike fruity floral body mists",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Victoria's Secret",
  "material": "Formula",
  "features": [
    "8.4 fl oz, scent Bombshell Summer, wrong for those who dislike fruity floral body mists",
    "Listed around $68 on the product page",
    "Victoria's Secret fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "8.4 fl oz, scent Bombshell Summer, wrong for those who dislike fruity floral bod"
    },
    {
      "label": "Price seen",
      "value": "about $68"
    },
    {
      "label": "Brand",
      "value": "Victoria's Secret"
    }
  ],
  "priceHint": 68,
  "asin": "B0C2PRWWRJ",
  "searchKeywords": "Victoria's Secret Victoria's Secret Bombshell Summer Scented Fragrance Mist",
  "badge": "New",
  "images": [],
  "hue": 127,
  "source": "curated",
},
{
  "id": "ad-140",
  "slug": "dime-beauty-dime-beauty-7-summers-perfume-women",
  "name": "DIME Beauty 7 Summers Perfume for Women",
  "tagline": "1.7 oz / 50 ml, Eau de Toilette (EDT), hypoallergenic",
  "description": "DIME Beauty 7 Summers Perfume for Women. 1.7 oz / 50 ml, Eau de Toilette (EDT), hypoallergenic",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "DIME Beauty",
  "material": "Formula",
  "features": [
    "1.7 oz / 50 ml, Eau de Toilette (EDT), hypoallergenic",
    "Listed around $43 on the product page",
    "DIME Beauty fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 oz / 50 ml, Eau de Toilette (EDT), hypoallergenic"
    },
    {
      "label": "Price seen",
      "value": "about $43"
    },
    {
      "label": "Brand",
      "value": "DIME Beauty"
    }
  ],
  "priceHint": 43,
  "asin": "B0B1LC8W79",
  "searchKeywords": "DIME Beauty DIME Beauty 7 Summers Perfume for Women",
  "badge": "New",
  "images": [],
  "hue": 117,
  "source": "curated",
},
{
  "id": "ad-141",
  "slug": "dossier-dossier-ambery-vanilla-women-edp",
  "name": "Dossier Ambery Vanilla - Women EDP",
  "tagline": "1.7 fl oz (50 ml), scent Ambery Vanilla, wrong for those who dislike sweet gourmand vanill",
  "description": "Dossier Ambery Vanilla - Women EDP. 1.7 fl oz (50 ml), scent Ambery Vanilla, wrong for those who dislike sweet gourmand vanilla-coffee scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Dossier",
  "material": "Formula",
  "features": [
    "1.7 fl oz (50 ml), scent Ambery Vanilla, wrong for those who dislike sweet gourmand vani",
    "Listed around $23 on the product page",
    "Dossier fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 fl oz (50 ml), scent Ambery Vanilla, wrong for those who dislike sweet gourm"
    },
    {
      "label": "Price seen",
      "value": "about $23"
    },
    {
      "label": "Brand",
      "value": "Dossier"
    }
  ],
  "priceHint": 23,
  "asin": "B0BZDZJDTG",
  "searchKeywords": "Dossier Dossier Ambery Vanilla - Women EDP",
  "badge": "New",
  "images": [],
  "hue": 52,
  "source": "curated",
},
{
  "id": "ad-142",
  "slug": "phlur-phlur-body-mist-discovery-set-of-5",
  "name": "PHLUR Body Mist Discovery Set of 5",
  "tagline": "1 fl oz each, 5 scents: Vanilla Skin, Beach Skin, Heavy Cream, Matcha Milk & Paradise Nect",
  "description": "PHLUR Body Mist Discovery Set of 5. 1 fl oz each, 5 scents: Vanilla Skin, Beach Skin, Heavy Cream, Matcha Milk & Paradise Nectar",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "PHLUR",
  "material": "Formula",
  "features": [
    "1 fl oz each, 5 scents: Vanilla Skin, Beach Skin, Heavy Cream, Matcha Milk & Paradise Ne",
    "Listed around $42 on the product page",
    "PHLUR fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1 fl oz each, 5 scents: Vanilla Skin, Beach Skin, Heavy Cream, Matcha Milk & Par"
    },
    {
      "label": "Price seen",
      "value": "about $42"
    },
    {
      "label": "Brand",
      "value": "PHLUR"
    }
  ],
  "priceHint": 42,
  "asin": "B0H46JTHT9",
  "searchKeywords": "PHLUR PHLUR Body Mist Discovery Set of 5",
  "badge": "New",
  "images": [],
  "hue": 261,
  "source": "curated",
},
{
  "id": "ad-143",
  "slug": "k18-k18-leave-in-molecular-repair-hair-mask",
  "name": "K18 Leave-In Molecular Repair Hair Mask",
  "tagline": "1.7 Fl Oz (50 ml), 4-minute leave-in peptide treatment that repairs bleach, color, chemica",
  "description": "K18 Leave-In Molecular Repair Hair Mask. 1.7 Fl Oz (50 ml), 4-minute leave-in peptide treatment that repairs bleach, color, chemical and heat damage, wrong for those expecting inst",
  "category": "hair",
  "collection": "Hair",
  "brand": "K18",
  "material": "Formula",
  "features": [
    "1.7 Fl Oz (50 ml), 4-minute leave-in peptide treatment that repairs bleach, color, chemi",
    "Listed around $29 on the product page",
    "K18 hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 Fl Oz (50 ml), 4-minute leave-in peptide treatment that repairs bleach, colo"
    },
    {
      "label": "Price seen",
      "value": "about $29"
    },
    {
      "label": "Brand",
      "value": "K18"
    }
  ],
  "priceHint": 29,
  "asin": "B0961ZS96M",
  "searchKeywords": "K18 K18 Leave-In Molecular Repair Hair Mask",
  "badge": "New",
  "images": [],
  "hue": 22,
  "source": "curated",
},
{
  "id": "ad-144",
  "slug": "cerave-cerave-gentle-hydrating-shampoo-hyaluronic-acid-hair",
  "name": "CeraVe Gentle Hydrating Shampoo with Hyaluronic Acid for",
  "tagline": "12 fl oz, fragrance-free/unscented formula, wrong for those who want a scented shampoo",
  "description": "CeraVe Gentle Hydrating Shampoo with Hyaluronic Acid for. 12 fl oz, fragrance-free/unscented formula, wrong for those who want a scented shampoo",
  "category": "hair",
  "collection": "Hair",
  "brand": "CeraVe",
  "material": "Formula",
  "features": [
    "12 fl oz, fragrance-free/unscented formula, wrong for those who want a scented shampoo",
    "Listed around $9 on the product page",
    "CeraVe hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "12 fl oz, fragrance-free/unscented formula, wrong for those who want a scented s"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "CeraVe"
    }
  ],
  "priceHint": 9,
  "asin": "B0DV42H38H",
  "searchKeywords": "CeraVe CeraVe Gentle Hydrating Shampoo with Hyaluronic Acid for",
  "badge": "New",
  "images": [],
  "hue": 161,
  "source": "curated",
},
{
  "id": "ad-145",
  "slug": "herbal-essences-herbal-essences-shampoo-conditioner-set-rose",
  "name": "Herbal Essences Shampoo & Conditioner Set, Rose Hips -",
  "tagline": "29.2 fl oz each (2-pack), rose hips scent, wrong for those who dislike floral rose fragran",
  "description": "Herbal Essences Shampoo & Conditioner Set, Rose Hips -. 29.2 fl oz each (2-pack), rose hips scent, wrong for those who dislike floral rose fragrances",
  "category": "hair",
  "collection": "Hair",
  "brand": "Herbal Essences",
  "material": "Formula",
  "features": [
    "29.2 fl oz each (2-pack), rose hips scent, wrong for those who dislike floral rose fragr",
    "Listed around $21 on the product page",
    "Herbal Essences hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "29.2 fl oz each (2-pack), rose hips scent, wrong for those who dislike floral ro"
    },
    {
      "label": "Price seen",
      "value": "about $21"
    },
    {
      "label": "Brand",
      "value": "Herbal Essences"
    }
  ],
  "priceHint": 21,
  "asin": "B086S4Q7JH",
  "searchKeywords": "Herbal Essences Herbal Essences Shampoo & Conditioner Set, Rose Hips -",
  "badge": "New",
  "images": [],
  "hue": 341,
  "source": "curated",
},
{
  "id": "ad-146",
  "slug": "conair-conair-curling-iron-brush-short-hair-nylon",
  "name": "Conair Curling Iron Brush for Short Hair, Nylon",
  "tagline": "¾-in barrel, 25 heat settings, wrong for those wanting a 1.25-in barrel for long hair",
  "description": "Conair Curling Iron Brush for Short Hair, Nylon. ¾-in barrel, 25 heat settings, wrong for those wanting a 1.25-in barrel for long hair",
  "category": "tools",
  "collection": "Tools",
  "brand": "Conair",
  "material": "Formula",
  "features": [
    "¾-in barrel, 25 heat settings, wrong for those wanting a 1.25-in barrel for long hair",
    "Listed around $16 on the product page",
    "Conair tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "¾-in barrel, 25 heat settings, wrong for those wanting a 1.25-in barrel for long"
    },
    {
      "label": "Price seen",
      "value": "about $16"
    },
    {
      "label": "Brand",
      "value": "Conair"
    }
  ],
  "priceHint": 16,
  "asin": "B08B4G79VN",
  "searchKeywords": "Conair Conair Curling Iron Brush for Short Hair, Nylon",
  "badge": "New",
  "images": [],
  "hue": 275,
  "source": "curated",
},
{
  "id": "ad-147",
  "slug": "salt-stone-salt-stone-hair-body-mist-women",
  "name": "Salt & Stone Hair & Body Mist for Women &",
  "tagline": "3.4 fl oz (100 ml), Saffron & Cedar scent, sweet ambery woody — wrong for those who dislik",
  "description": "Salt & Stone Hair & Body Mist for Women &. 3.4 fl oz (100 ml), Saffron & Cedar scent, sweet ambery woody — wrong for those who dislike warm woody/gourmand scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Salt & Stone",
  "material": "Formula",
  "features": [
    "3.4 fl oz (100 ml), Saffron & Cedar scent, sweet ambery woody — wrong for those who disl",
    "Listed around $45 on the product page",
    "Salt & Stone fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3.4 fl oz (100 ml), Saffron & Cedar scent, sweet ambery woody — wrong for those "
    },
    {
      "label": "Price seen",
      "value": "about $45"
    },
    {
      "label": "Brand",
      "value": "Salt & Stone"
    }
  ],
  "priceHint": 45,
  "asin": "B0H2G28G12",
  "searchKeywords": "Salt & Stone Salt & Stone Hair & Body Mist for Women &",
  "badge": "New",
  "images": [],
  "hue": 110,
  "source": "curated",
},
{
  "id": "ad-148",
  "slug": "lattafa-lattafa-angham-eau-de-parfum",
  "name": "Lattafa Angham Eau de Parfum",
  "tagline": "100 ml, unisex EDP, wrong for those who dislike sweet praline and cacao gourmand scents",
  "description": "Lattafa Angham Eau de Parfum. 100 ml, unisex EDP, wrong for those who dislike sweet praline and cacao gourmand scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Lattafa",
  "material": "Formula",
  "features": [
    "100 ml, unisex EDP, wrong for those who dislike sweet praline and cacao gourmand scents",
    "Listed around $25 on the product page",
    "Lattafa fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "100 ml, unisex EDP, wrong for those who dislike sweet praline and cacao gourmand"
    },
    {
      "label": "Price seen",
      "value": "about $25"
    },
    {
      "label": "Brand",
      "value": "Lattafa"
    }
  ],
  "priceHint": 25,
  "asin": "B0DF85K4N5",
  "searchKeywords": "Lattafa Lattafa Angham Eau de Parfum",
  "badge": "New",
  "images": [],
  "hue": 329,
  "source": "curated",
},
{
  "id": "ad-149",
  "slug": "lattafa-lattafa-angham-second-song-eau-de-parfum",
  "name": "Lattafa Angham Second Song Eau de Parfum 100ml",
  "tagline": "100 ml, scent Angham Second Song (unisex oriental vanilla), wrong for those who dislike sw",
  "description": "Lattafa Angham Second Song Eau de Parfum 100ml. 100 ml, scent Angham Second Song (unisex oriental vanilla), wrong for those who dislike sweet creamy gourmand scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Lattafa",
  "material": "Formula",
  "features": [
    "100 ml, scent Angham Second Song (unisex oriental vanilla), wrong for those who dislike ",
    "Listed around $41 on the product page",
    "Lattafa fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "100 ml, scent Angham Second Song (unisex oriental vanilla), wrong for those who "
    },
    {
      "label": "Price seen",
      "value": "about $41"
    },
    {
      "label": "Brand",
      "value": "Lattafa"
    }
  ],
  "priceHint": 41,
  "asin": "B0GKPLFC7S",
  "searchKeywords": "Lattafa Lattafa Angham Second Song Eau de Parfum 100ml",
  "badge": "New",
  "images": [],
  "hue": 280,
  "source": "curated",
},
{
  "id": "ad-150",
  "slug": "lattafa-lattafa-angham-citrus-spicy-gourmand-musky-perfume",
  "name": "Lattafa Angham – Citrus, Spicy, Gourmand, Musky –",
  "tagline": "250 ml / 8.45 fl oz, scent Angham (sandalwood, coffee & whiskey, spiced vanilla), wrong fo",
  "description": "Lattafa Angham – Citrus, Spicy, Gourmand, Musky –. 250 ml / 8.45 fl oz, scent Angham (sandalwood, coffee & whiskey, spiced vanilla), wrong for those who dislike gourmand scents",
  "category": "fragrance",
  "collection": "Fragrance",
  "brand": "Lattafa",
  "material": "Formula",
  "features": [
    "250 ml / 8.45 fl oz, scent Angham (sandalwood, coffee & whiskey, spiced vanilla), wrong ",
    "Listed around $15 on the product page",
    "Lattafa fragrance",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "250 ml / 8.45 fl oz, scent Angham (sandalwood, coffee & whiskey, spiced vanilla)"
    },
    {
      "label": "Price seen",
      "value": "about $15"
    },
    {
      "label": "Brand",
      "value": "Lattafa"
    }
  ],
  "priceHint": 15,
  "asin": "B0FHBRTBFK",
  "searchKeywords": "Lattafa Lattafa Angham – Citrus, Spicy, Gourmand, Musky –",
  "badge": "New",
  "images": [],
  "hue": 56,
  "source": "curated",
},
{
  "id": "ad-151",
  "slug": "maybelline-maybelline-instant-age-rewind-eraser-dark-circles",
  "name": "Maybelline Instant Age Rewind Eraser Dark Circles Multi-Use",
  "tagline": "0.2 fl oz, shade 110, up to 12HR wear natural finish — wrong for those wanting full covera",
  "description": "Maybelline Instant Age Rewind Eraser Dark Circles Multi-Use. 0.2 fl oz, shade 110, up to 12HR wear natural finish — wrong for those wanting full coverage",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Maybelline",
  "material": "Formula",
  "features": [
    "0.2 fl oz, shade 110, up to 12HR wear natural finish — wrong for those wanting full cove",
    "Listed around $10 on the product page",
    "Maybelline makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.2 fl oz, shade 110, up to 12HR wear natural finish — wrong for those wanting f"
    },
    {
      "label": "Price seen",
      "value": "about $10"
    },
    {
      "label": "Brand",
      "value": "Maybelline"
    }
  ],
  "priceHint": 10,
  "asin": "B004Y9GTOO",
  "searchKeywords": "Maybelline Maybelline Instant Age Rewind Eraser Dark Circles Multi-Use",
  "badge": "New",
  "images": [],
  "hue": 96,
  "source": "curated",
},
{
  "id": "ad-152",
  "slug": "maybelline-maybelline-fit-me-matte-poreless-pressed-face",
  "name": "Maybelline Fit Me Matte + Poreless Pressed Face",
  "tagline": "Shade 120 Classic Ivory, matte poreless finish for normal-to-oily skin, wrong for those wa",
  "description": "Maybelline Fit Me Matte + Poreless Pressed Face. Shade 120 Classic Ivory, matte poreless finish for normal-to-oily skin, wrong for those wanting a dewy finish",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Maybelline",
  "material": "Formula",
  "features": [
    "Shade 120 Classic Ivory, matte poreless finish for normal-to-oily skin, wrong for those ",
    "Listed around $9 on the product page",
    "Maybelline makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "Shade 120 Classic Ivory, matte poreless finish for normal-to-oily skin, wrong fo"
    },
    {
      "label": "Price seen",
      "value": "about $9"
    },
    {
      "label": "Brand",
      "value": "Maybelline"
    }
  ],
  "priceHint": 9,
  "asin": "B00PFCSO1U",
  "searchKeywords": "Maybelline Maybelline Fit Me Matte + Poreless Pressed Face",
  "badge": "New",
  "images": [],
  "hue": 66,
  "source": "curated",
},
{
  "id": "ad-153",
  "slug": "e-l-f-e-l-f-power-grip",
  "name": "e.l.f. Power Grip Primer",
  "tagline": "0.811 fl oz, translucent gel finish",
  "description": "e.l.f. Power Grip Primer. 0.811 fl oz, translucent gel finish",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "e.l.f.",
  "material": "Formula",
  "features": [
    "0.811 fl oz, translucent gel finish",
    "Listed around $11 on the product page",
    "e.l.f. makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.811 fl oz, translucent gel finish"
    },
    {
      "label": "Price seen",
      "value": "about $11"
    },
    {
      "label": "Brand",
      "value": "e.l.f."
    }
  ],
  "priceHint": 11,
  "asin": "B09XMYFTB7",
  "searchKeywords": "e.l.f. e.l.f. Power Grip Primer",
  "badge": "New",
  "images": [],
  "hue": 331,
  "source": "curated",
},
{
  "id": "ad-154",
  "slug": "t3-t3-switch-kit-classic-trio-interchangeable-curling",
  "name": "T3 Switch Kit Classic Trio Interchangeable Curling Iron",
  "tagline": "3 ceramic clip barrels, 9 adjustable heat settings",
  "description": "T3 Switch Kit Classic Trio Interchangeable Curling Iron. 3 ceramic clip barrels, 9 adjustable heat settings",
  "category": "tools",
  "collection": "Tools",
  "brand": "T3",
  "material": "Formula",
  "features": [
    "3 ceramic clip barrels, 9 adjustable heat settings",
    "Listed around $350 on the product page",
    "T3 tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3 ceramic clip barrels, 9 adjustable heat settings"
    },
    {
      "label": "Price seen",
      "value": "about $350"
    },
    {
      "label": "Brand",
      "value": "T3"
    }
  ],
  "priceHint": 350,
  "asin": "B0CRG6S7W8",
  "searchKeywords": "T3 T3 Switch Kit Classic Trio Interchangeable Curling Iron",
  "badge": "New",
  "images": [],
  "hue": 152,
  "source": "curated",
},
{
  "id": "ad-155",
  "slug": "t3-t3-curlwrap-automatic-rotating-curling-iron-longer",
  "name": "T3 CurlWrap Automatic Rotating Curling Iron with Longer",
  "tagline": "1\" barrel, 9 heat settings, 2 timer settings, auto-rotating ceramic barrel",
  "description": "T3 CurlWrap Automatic Rotating Curling Iron with Longer. 1\" barrel, 9 heat settings, 2 timer settings, auto-rotating ceramic barrel",
  "category": "tools",
  "collection": "Tools",
  "brand": "T3",
  "material": "Formula",
  "features": [
    "1\" barrel, 9 heat settings, 2 timer settings, auto-rotating ceramic barrel",
    "Listed around $168 on the product page",
    "T3 tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1\" barrel, 9 heat settings, 2 timer settings, auto-rotating ceramic barrel"
    },
    {
      "label": "Price seen",
      "value": "about $168"
    },
    {
      "label": "Brand",
      "value": "T3"
    }
  ],
  "priceHint": 168,
  "asin": "B0DCW1WQYH",
  "searchKeywords": "T3 T3 CurlWrap Automatic Rotating Curling Iron with Longer",
  "badge": "New",
  "images": [],
  "hue": 233,
  "source": "curated",
},
{
  "id": "ad-156",
  "slug": "hot-tools-hot-tools-professional-1-25-extended",
  "name": "Hot Tools Professional 1.25\" Extended Barrel Curling Iron",
  "tagline": "1.25 inch barrel, 6-inch extended 24K gold barrel, 450°F max heat — wrong for those wantin",
  "description": "Hot Tools Professional 1.25\" Extended Barrel Curling Iron. 1.25 inch barrel, 6-inch extended 24K gold barrel, 450°F max heat — wrong for those wanting a clamp-free wand",
  "category": "tools",
  "collection": "Tools",
  "brand": "Hot Tools",
  "material": "Formula",
  "features": [
    "1.25 inch barrel, 6-inch extended 24K gold barrel, 450°F max heat — wrong for those want",
    "Listed around $54 on the product page",
    "Hot Tools tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.25 inch barrel, 6-inch extended 24K gold barrel, 450°F max heat — wrong for th"
    },
    {
      "label": "Price seen",
      "value": "about $54"
    },
    {
      "label": "Brand",
      "value": "Hot Tools"
    }
  ],
  "priceHint": 54,
  "asin": "B0CW7M1Y96",
  "searchKeywords": "Hot Tools Hot Tools Professional 1.25\" Extended Barrel Curling Iron",
  "badge": "New",
  "images": [],
  "hue": 114,
  "source": "curated",
},
{
  "id": "ad-157",
  "slug": "hot-tools-hot-tools-24k-gold-professional-1",
  "name": "Hot Tools 24K Gold Professional 1/2\" Extended Barrel Curling",
  "tagline": "1/2\" barrel, tight curls; wrong for those who want loose waves",
  "description": "Hot Tools 24K Gold Professional 1/2\" Extended Barrel Curling. 1/2\" barrel, tight curls; wrong for those who want loose waves",
  "category": "tools",
  "collection": "Tools",
  "brand": "Hot Tools",
  "material": "Formula",
  "features": [
    "1/2\" barrel, tight curls; wrong for those who want loose waves",
    "Listed around $56 on the product page",
    "Hot Tools tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1/2\" barrel, tight curls; wrong for those who want loose waves"
    },
    {
      "label": "Price seen",
      "value": "about $56"
    },
    {
      "label": "Brand",
      "value": "Hot Tools"
    }
  ],
  "priceHint": 56,
  "asin": "B0CW6MK8Z5",
  "searchKeywords": "Hot Tools Hot Tools 24K Gold Professional 1/2\" Extended Barrel Curling",
  "badge": "New",
  "images": [],
  "hue": 41,
  "source": "curated",
},
{
  "id": "ad-158",
  "slug": "hot-tools-hot-tools-professional-3-4-extended",
  "name": "Hot Tools Professional 3/4\" Extended Barrel Curling Iron",
  "tagline": "3/4 inch barrel, 450 °F max heat, ideal for defined curls, wrong for loose waves",
  "description": "Hot Tools Professional 3/4\" Extended Barrel Curling Iron. 3/4 inch barrel, 450 °F max heat, ideal for defined curls, wrong for loose waves",
  "category": "tools",
  "collection": "Tools",
  "brand": "Hot Tools",
  "material": "Formula",
  "features": [
    "3/4 inch barrel, 450 °F max heat, ideal for defined curls, wrong for loose waves",
    "Listed around $56 on the product page",
    "Hot Tools tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3/4 inch barrel, 450 °F max heat, ideal for defined curls, wrong for loose waves"
    },
    {
      "label": "Price seen",
      "value": "about $56"
    },
    {
      "label": "Brand",
      "value": "Hot Tools"
    }
  ],
  "priceHint": 56,
  "asin": "B0CW7J7F4M",
  "searchKeywords": "Hot Tools Hot Tools Professional 3/4\" Extended Barrel Curling Iron",
  "badge": "New",
  "images": [],
  "hue": 94,
  "source": "curated",
},
{
  "id": "ad-159",
  "slug": "ghd-ghd-platinum-styler-1-flat-iron-hair",
  "name": "ghd Platinum+ Styler 1\" Flat Iron Hair Straightener,",
  "tagline": "1 inch plates, locked at 365°F with no dial — wrong for those who want adjustable heat set",
  "description": "ghd Platinum+ Styler 1\" Flat Iron Hair Straightener,. 1 inch plates, locked at 365°F with no dial — wrong for those who want adjustable heat settings",
  "category": "tools",
  "collection": "Tools",
  "brand": "ghd",
  "material": "Formula",
  "features": [
    "1 inch plates, locked at 365°F with no dial — wrong for those who want adjustable heat s",
    "Listed around $223 on the product page",
    "ghd tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1 inch plates, locked at 365°F with no dial — wrong for those who want adjustabl"
    },
    {
      "label": "Price seen",
      "value": "about $223"
    },
    {
      "label": "Brand",
      "value": "ghd"
    }
  ],
  "priceHint": 223,
  "asin": "B07F7Q4PTN",
  "searchKeywords": "ghd ghd Platinum+ Styler 1\" Flat Iron Hair Straightener,",
  "badge": "New",
  "images": [],
  "hue": 347,
  "source": "curated",
},
{
  "id": "ad-160",
  "slug": "bio-ionic-bio-ionic-twist-3-in-1",
  "name": "Bio Ionic Twist 3-in-1 Interchangeable Curling Iron & Wand",
  "tagline": "0.5\" wand, 1\" tapered, 1.25\" clip barrels; 6 heat settings up to 430°F, wrong for those wh",
  "description": "Bio Ionic Twist 3-in-1 Interchangeable Curling Iron & Wand. 0.5\" wand, 1\" tapered, 1.25\" clip barrels; 6 heat settings up to 430°F, wrong for those who want a single fixed-barrel i",
  "category": "tools",
  "collection": "Tools",
  "brand": "Bio Ionic",
  "material": "Formula",
  "features": [
    "0.5\" wand, 1\" tapered, 1.25\" clip barrels; 6 heat settings up to 430°F, wrong for those ",
    "Listed around $199 on the product page",
    "Bio Ionic tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.5\" wand, 1\" tapered, 1.25\" clip barrels; 6 heat settings up to 430°F, wrong fo"
    },
    {
      "label": "Price seen",
      "value": "about $199"
    },
    {
      "label": "Brand",
      "value": "Bio Ionic"
    }
  ],
  "priceHint": 199,
  "asin": "B0GTRNWPHK",
  "searchKeywords": "Bio Ionic Bio Ionic Twist 3-in-1 Interchangeable Curling Iron & Wand",
  "badge": "New",
  "images": [],
  "hue": 200,
  "source": "curated",
},
{
  "id": "ad-161",
  "slug": "imissiu-imissiu-tourmaline-3-in-1-curling-wand",
  "name": "iMissiu Tourmaline 3 in 1 Curling Wand Set",
  "tagline": "20-25 mm, 9-19 mm and 25 mm ceramic barrels, 302-410°F heat, wrong for those wanting a sin",
  "description": "iMissiu Tourmaline 3 in 1 Curling Wand Set. 20-25 mm, 9-19 mm and 25 mm ceramic barrels, 302-410°F heat, wrong for those wanting a single fixed-barrel wand",
  "category": "tools",
  "collection": "Tools",
  "brand": "iMissiu",
  "material": "Formula",
  "features": [
    "20-25 mm, 9-19 mm and 25 mm ceramic barrels, 302-410°F heat, wrong for those wanting a s",
    "Listed around $26 on the product page",
    "iMissiu tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "20-25 mm, 9-19 mm and 25 mm ceramic barrels, 302-410°F heat, wrong for those wan"
    },
    {
      "label": "Price seen",
      "value": "about $26"
    },
    {
      "label": "Brand",
      "value": "iMissiu"
    }
  ],
  "priceHint": 26,
  "asin": "B071ZGFB7Y",
  "searchKeywords": "iMissiu iMissiu Tourmaline 3 in 1 Curling Wand Set",
  "badge": "New",
  "images": [],
  "hue": 142,
  "source": "curated",
},
{
  "id": "ad-162",
  "slug": "dyson-dyson-corrale-hair-straightener",
  "name": "Dyson Corrale™ Hair Straightener",
  "tagline": "4 Piece Set, 410°F max heat, cordless up to 30 minutes",
  "description": "Dyson Corrale™ Hair Straightener. 4 Piece Set, 410°F max heat, cordless up to 30 minutes",
  "category": "tools",
  "collection": "Tools",
  "brand": "Dyson",
  "material": "Formula",
  "features": [
    "4 Piece Set, 410°F max heat, cordless up to 30 minutes",
    "Listed around $540 on the product page",
    "Dyson tools",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "4 Piece Set, 410°F max heat, cordless up to 30 minutes"
    },
    {
      "label": "Price seen",
      "value": "about $540"
    },
    {
      "label": "Brand",
      "value": "Dyson"
    }
  ],
  "priceHint": 540,
  "asin": "B0C7FZB9Q9",
  "searchKeywords": "Dyson Dyson Corrale™ Hair Straightener",
  "badge": "New",
  "images": [],
  "hue": 225,
  "source": "curated",
},
{
  "id": "ad-163",
  "slug": "eltamd-eltamd-uv-clear-face-sunscreen-zinc-oxide",
  "name": "EltaMD UV Clear Face Sunscreen with Zinc Oxide,",
  "tagline": "1.7 oz, SPF 46, oil-free and fragrance-free, wrong for those who want a matte finish",
  "description": "EltaMD UV Clear Face Sunscreen with Zinc Oxide,. 1.7 oz, SPF 46, oil-free and fragrance-free, wrong for those who want a matte finish",
  "category": "sun-spf",
  "collection": "Sun Spf",
  "brand": "EltaMD",
  "material": "Formula",
  "features": [
    "1.7 oz, SPF 46, oil-free and fragrance-free, wrong for those who want a matte finish",
    "Listed around $46 on the product page",
    "EltaMD sun spf",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1.7 oz, SPF 46, oil-free and fragrance-free, wrong for those who want a matte fi"
    },
    {
      "label": "Price seen",
      "value": "about $46"
    },
    {
      "label": "Brand",
      "value": "EltaMD"
    }
  ],
  "priceHint": 46,
  "asin": "B00ZPWR0N8",
  "searchKeywords": "EltaMD EltaMD UV Clear Face Sunscreen with Zinc Oxide,",
  "badge": "New",
  "images": [],
  "hue": 116,
  "source": "curated",
},
{
  "id": "ad-164",
  "slug": "blue-lizard-blue-lizard-sensitive-mineral-sunscreen-spf",
  "name": "Blue Lizard Sensitive Mineral Sunscreen SPF 50 Sunscreen Lotion",
  "tagline": "5 fl oz, SPF 50, 100% mineral actives (zinc oxide/titanium dioxide), fragrance-free, wrong",
  "description": "Blue Lizard Sensitive Mineral Sunscreen SPF 50 Sunscreen Lotion. 5 fl oz, SPF 50, 100% mineral actives (zinc oxide/titanium dioxide), fragrance-free, wrong for those who want a she",
  "category": "sun-spf",
  "collection": "Sun Spf",
  "brand": "Blue Lizard",
  "material": "Formula",
  "features": [
    "5 fl oz, SPF 50, 100% mineral actives (zinc oxide/titanium dioxide), fragrance-free, wro",
    "Listed around $13 on the product page",
    "Blue Lizard sun spf",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "5 fl oz, SPF 50, 100% mineral actives (zinc oxide/titanium dioxide), fragrance-f"
    },
    {
      "label": "Price seen",
      "value": "about $13"
    },
    {
      "label": "Brand",
      "value": "Blue Lizard"
    }
  ],
  "priceHint": 13,
  "asin": "B084ZP848Y",
  "searchKeywords": "Blue Lizard Blue Lizard Sensitive Mineral Sunscreen SPF 50 Sunscreen Lotion",
  "badge": "New",
  "images": [
    "https://m.media-amazon.com/images/I/61+tKVVtVAL._SX679_.jpg"
  ],
  "hue": 322,
  "source": "curated",
},
{
  "id": "ad-165",
  "slug": "neutrogena-neutrogena-ultra-sheer-dry-touch-sunscreen-lotion",
  "name": "Neutrogena Ultra Sheer Dry Touch Sunscreen Lotion, SPF",
  "tagline": "3 fl. oz, SPF 70, dry-touch matte finish, water-resistant up to 80 minutes",
  "description": "Neutrogena Ultra Sheer Dry Touch Sunscreen Lotion, SPF. 3 fl. oz, SPF 70, dry-touch matte finish, water-resistant up to 80 minutes",
  "category": "sun-spf",
  "collection": "Sun Spf",
  "brand": "Neutrogena",
  "material": "Formula",
  "features": [
    "3 fl. oz, SPF 70, dry-touch matte finish, water-resistant up to 80 minutes",
    "Listed around $10 on the product page",
    "Neutrogena sun spf",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "3 fl. oz, SPF 70, dry-touch matte finish, water-resistant up to 80 minutes"
    },
    {
      "label": "Price seen",
      "value": "about $10"
    },
    {
      "label": "Brand",
      "value": "Neutrogena"
    }
  ],
  "priceHint": 10,
  "asin": "B005IHT94S",
  "searchKeywords": "Neutrogena Neutrogena Ultra Sheer Dry Touch Sunscreen Lotion, SPF",
  "badge": "New",
  "images": [],
  "hue": 316,
  "source": "curated",
},
{
  "id": "ad-166",
  "slug": "ogx-ogx-renewing-argan-oil-of-morocco-shampoo",
  "name": "OGX Renewing + Argan Oil of Morocco Shampoo",
  "tagline": "13 fl oz, Moroccan Oil scent, sulfate-free surfactants, wrong for those who dislike argan ",
  "description": "OGX Renewing + Argan Oil of Morocco Shampoo. 13 fl oz, Moroccan Oil scent, sulfate-free surfactants, wrong for those who dislike argan oil",
  "category": "hair",
  "collection": "Hair",
  "brand": "OGX",
  "material": "Formula",
  "features": [
    "13 fl oz, Moroccan Oil scent, sulfate-free surfactants, wrong for those who dislike arga",
    "Listed around $5 on the product page",
    "OGX hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "13 fl oz, Moroccan Oil scent, sulfate-free surfactants, wrong for those who disl"
    },
    {
      "label": "Price seen",
      "value": "about $5"
    },
    {
      "label": "Brand",
      "value": "OGX"
    }
  ],
  "priceHint": 5,
  "asin": "B0048F5ATO",
  "searchKeywords": "OGX OGX Renewing + Argan Oil of Morocco Shampoo",
  "badge": "New",
  "images": [],
  "hue": 276,
  "source": "curated",
},
{
  "id": "ad-167",
  "slug": "nexxus-nexxus-keraphix-repair-shampoo-damaged-hair",
  "name": "Nexxus KERAPHIX Repair Shampoo for Damaged Hair",
  "tagline": "13.5 fl oz, KRT Keratin Resistance Therapy, for damaged hair",
  "description": "Nexxus KERAPHIX Repair Shampoo for Damaged Hair. 13.5 fl oz, KRT Keratin Resistance Therapy, for damaged hair",
  "category": "hair",
  "collection": "Hair",
  "brand": "Nexxus",
  "material": "Formula",
  "features": [
    "13.5 fl oz, KRT Keratin Resistance Therapy, for damaged hair",
    "Listed around $17 on the product page",
    "Nexxus hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "13.5 fl oz, KRT Keratin Resistance Therapy, for damaged hair"
    },
    {
      "label": "Price seen",
      "value": "about $17"
    },
    {
      "label": "Brand",
      "value": "Nexxus"
    }
  ],
  "priceHint": 17,
  "asin": "B079LXH68Z",
  "searchKeywords": "Nexxus Nexxus KERAPHIX Repair Shampoo for Damaged Hair",
  "badge": "New",
  "images": [],
  "hue": 107,
  "source": "curated",
},
{
  "id": "ad-168",
  "slug": "luseta-luseta-rosemary-mint-shampoo-conditioner-set-hair",
  "name": "Luseta Rosemary Mint Shampoo and Conditioner Set for",
  "tagline": "16.9 oz x 2, rosemary mint scent, wrong for those who dislike minty/herbal scents",
  "description": "Luseta Rosemary Mint Shampoo and Conditioner Set for. 16.9 oz x 2, rosemary mint scent, wrong for those who dislike minty/herbal scents",
  "category": "hair",
  "collection": "Hair",
  "brand": "Luseta",
  "material": "Formula",
  "features": [
    "16.9 oz x 2, rosemary mint scent, wrong for those who dislike minty/herbal scents",
    "Listed around $25 on the product page",
    "Luseta hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "16.9 oz x 2, rosemary mint scent, wrong for those who dislike minty/herbal scent"
    },
    {
      "label": "Price seen",
      "value": "about $25"
    },
    {
      "label": "Brand",
      "value": "Luseta"
    }
  ],
  "priceHint": 25,
  "asin": "B0CGTW78F9",
  "searchKeywords": "Luseta Luseta Rosemary Mint Shampoo and Conditioner Set for",
  "badge": "New",
  "images": [],
  "hue": 189,
  "source": "curated",
},
{
  "id": "ad-169",
  "slug": "hask-hask-monoi-coconut-oil-nourishing-shampoo",
  "name": "HASK Monoi Coconut Oil Nourishing Shampoo",
  "tagline": "355 ml, scent Coconut/Monoi, wrong for those who dislike coconut scents",
  "description": "HASK Monoi Coconut Oil Nourishing Shampoo. 355 ml, scent Coconut/Monoi, wrong for those who dislike coconut scents",
  "category": "hair",
  "collection": "Hair",
  "brand": "HASK",
  "material": "Formula",
  "features": [
    "355 ml, scent Coconut/Monoi, wrong for those who dislike coconut scents",
    "Listed around $11 on the product page",
    "HASK hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "355 ml, scent Coconut/Monoi, wrong for those who dislike coconut scents"
    },
    {
      "label": "Price seen",
      "value": "about $11"
    },
    {
      "label": "Brand",
      "value": "HASK"
    }
  ],
  "priceHint": 11,
  "asin": "B00IDD0A92",
  "searchKeywords": "HASK HASK Monoi Coconut Oil Nourishing Shampoo",
  "badge": "New",
  "images": [],
  "hue": 326,
  "source": "curated",
},
{
  "id": "ad-170",
  "slug": "kitsch-kitsch-rice-water-solid-shampoo-conditioner-set",
  "name": "Kitsch Rice Water Solid Shampoo and Conditioner Set",
  "tagline": "6.5 oz total (2 bars), rice water scent, wrong for those who want a liquid shampoo",
  "description": "Kitsch Rice Water Solid Shampoo and Conditioner Set. 6.5 oz total (2 bars), rice water scent, wrong for those who want a liquid shampoo",
  "category": "hair",
  "collection": "Hair",
  "brand": "Kitsch",
  "material": "Formula",
  "features": [
    "6.5 oz total (2 bars), rice water scent, wrong for those who want a liquid shampoo",
    "Listed around $28 on the product page",
    "Kitsch hair",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "6.5 oz total (2 bars), rice water scent, wrong for those who want a liquid shamp"
    },
    {
      "label": "Price seen",
      "value": "about $28"
    },
    {
      "label": "Brand",
      "value": "Kitsch"
    }
  ],
  "priceHint": 28,
  "asin": "B0GP9GNJVB",
  "searchKeywords": "Kitsch Kitsch Rice Water Solid Shampoo and Conditioner Set",
  "badge": "New",
  "images": [],
  "hue": 191,
  "source": "curated",
},
{
  "id": "ad-171",
  "slug": "grande-cosmetics-grande-cosmetics-grandelash-md-lash-enhanci-2",
  "name": "Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum",
  "tagline": "1 ml, 6-week supply, wrong for those who want a larger multi-month size",
  "description": "Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum. 1 ml, 6-week supply, wrong for those who want a larger multi-month size",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Grande Cosmetics",
  "material": "Formula",
  "features": [
    "1 ml, 6-week supply, wrong for those who want a larger multi-month size",
    "Listed around $36 on the product page",
    "Grande Cosmetics makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "1 ml, 6-week supply, wrong for those who want a larger multi-month size"
    },
    {
      "label": "Price seen",
      "value": "about $36"
    },
    {
      "label": "Brand",
      "value": "Grande Cosmetics"
    }
  ],
  "priceHint": 36,
  "asin": "B00325D0WK",
  "searchKeywords": "Grande Cosmetics Grande Cosmetics GrandeLASH-MD Lash Enhancing Serum",
  "badge": "New",
  "images": [],
  "hue": 236,
  "source": "curated",
},
{
  "id": "ad-172",
  "slug": "julep-julep-eyeshadow-101-cr-me-to-powder",
  "name": "Julep Eyeshadow 101 Crème-to-Powder Eyeshadow Stick, Champagne Shimmer",
  "tagline": "Champagne Shimmer shade, shimmer finish — wrong for those who prefer a matte eyeshadow",
  "description": "Julep Eyeshadow 101 Crème-to-Powder Eyeshadow Stick, Champagne Shimmer. Champagne Shimmer shade, shimmer finish — wrong for those who prefer a matte eyeshadow",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Julep",
  "material": "Formula",
  "features": [
    "Champagne Shimmer shade, shimmer finish — wrong for those who prefer a matte eyeshadow",
    "Listed around $20 on the product page",
    "Julep makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "Champagne Shimmer shade, shimmer finish — wrong for those who prefer a matte eye"
    },
    {
      "label": "Price seen",
      "value": "about $20"
    },
    {
      "label": "Brand",
      "value": "Julep"
    }
  ],
  "priceHint": 20,
  "asin": "B01LW1983J",
  "searchKeywords": "Julep Julep Eyeshadow 101 Crème-to-Powder Eyeshadow Stick, Champagne Shimmer",
  "badge": "New",
  "images": [],
  "hue": 55,
  "source": "curated",
},
{
  "id": "ad-173",
  "slug": "thrive-causemetics-thrive-causemetics-liquid-lash-extensions-mascara",
  "name": "Thrive Causemetics Liquid Lash Extensions Mascara",
  "tagline": "0.38 oz, shade Brynn (Rich Black), wrong for those who want a waterproof rather than water",
  "description": "Thrive Causemetics Liquid Lash Extensions Mascara. 0.38 oz, shade Brynn (Rich Black), wrong for those who want a waterproof rather than water-resistant mascara",
  "category": "makeup",
  "collection": "Makeup",
  "brand": "Thrive Causemetics",
  "material": "Formula",
  "features": [
    "0.38 oz, shade Brynn (Rich Black), wrong for those who want a waterproof rather than wat",
    "Listed around $26 on the product page",
    "Thrive Causemetics makeup",
    "Confirm the live Amazon page before you buy"
  ],
  "specs": [
    {
      "label": "Limit",
      "value": "0.38 oz, shade Brynn (Rich Black), wrong for those who want a waterproof rather "
    },
    {
      "label": "Price seen",
      "value": "about $26"
    },
    {
      "label": "Brand",
      "value": "Thrive Causemetics"
    }
  ],
  "priceHint": 26,
  "asin": "B0F566TFJN",
  "searchKeywords": "Thrive Causemetics Thrive Causemetics Liquid Lash Extensions Mascara",
  "badge": "New",
  "images": [],
  "hue": 59,
  "source": "curated",
}
]
