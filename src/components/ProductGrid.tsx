import type { Product } from '../data/types'
import type { Category } from '../data/types'
import { ProductCard } from './ProductCard'
import { ReelInsertCard } from './ReelInsertCard'
import {
  interleaveReelInserts,
  type ReelInsertOptions,
} from '../lib/reelInserts'
import { useMemo } from 'react'

const DEFAULT_COLS =
  'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'

type Props = {
  products: Product[]
  listName: string
  /** Current shop room — reels from this category are excluded (cross-promo) */
  excludeCategory?: Category | string | null
  className?: string
  compact?: boolean
  every?: number
  maxInserts?: number
  minProducts?: number
  /** When false, pure product grid (default true) */
  inserts?: boolean
  pickLabel?: (p: Product) => string | undefined
  whyLine?: (p: Product) => string | undefined
}

/**
 * Product card grid with optional randomized fashion reel inserts.
 * Insert density scales as CATEGORY_REELS grows.
 */
export function ProductGrid({
  products,
  listName,
  excludeCategory,
  className = DEFAULT_COLS,
  compact = false,
  every,
  maxInserts,
  minProducts,
  inserts = true,
  pickLabel,
  whyLine,
}: Props) {
  const items = useMemo(() => {
    if (!inserts) {
      return products.map((product) => ({
        kind: 'product' as const,
        product,
      }))
    }
    const opts: ReelInsertOptions = {
      listName,
      excludeCategory,
      every,
      maxInserts,
      minProducts,
    }
    return interleaveReelInserts(products, opts)
  }, [
    products,
    listName,
    excludeCategory,
    every,
    maxInserts,
    minProducts,
    inserts,
  ])

  return (
    <div className={className}>
      {items.map((item) => {
        if (item.kind === 'reel') {
          return (
            <ReelInsertCard
              key={`reel-${item.reel.id}-${item.slot}-${listName}`}
              reel={item.reel}
              listName={listName}
              compact={compact}
            />
          )
        }
        return (
          <ProductCard
            key={item.product.id}
            product={item.product}
            listName={listName}
            compact={compact}
            pickLabel={pickLabel?.(item.product)}
            whyLine={whyLine?.(item.product)}
          />
        )
      })}
    </div>
  )
}
