import type { Category } from './types'

/**
 * Map merch "collection" query values → category.
 */
const COLLECTION_TO_CAT: Record<string, Category> = {
  skincare: 'skincare',
  hair: 'hair',
  makeup: 'makeup',
  body: 'body',
  tools: 'tools',
  spf: 'sun-spf',
  'sun-spf': 'sun-spf',
  sun: 'sun-spf',
  wellness: 'wellness',
  lips: 'lips',
  luxury: 'luxury',
  'luxury-beauty': 'luxury',
  prestige: 'luxury',
  fragrance: 'fragrance',
  perfume: 'fragrance',
  jewelry: 'jewelry',
  jewellery: 'jewelry',
  handbags: 'handbags',
  bags: 'handbags',
  accessories: 'handbags',
}

export function resolveCollectionToCategory(
  collectionId: string | null | undefined,
): Category | null {
  if (!collectionId) return null
  const key = collectionId.toLowerCase().replace(/\s+/g, '-')
  return COLLECTION_TO_CAT[key] ?? null
}
