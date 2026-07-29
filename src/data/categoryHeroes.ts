import type { Category } from './types'
import { CATEGORY_LABELS } from './catalog'

export type CategoryHeroContent = {
  title: string
  blurb: string
  /** Public path under /brand/ */
  image: string
  /** CSS object-position for crop */
  objectPosition?: string
  alt: string
}

/**
 * Lifestyle heroes for every shop category (photo + copy).
 * Each category has a unique JPG — no shared promo reuse across rooms.
 */
export const HEROES: Record<Category, CategoryHeroContent> = {
  skincare: {
    title: 'Skincare',
    blurb: 'Cleansers, serums, and moisturizers for real skin concerns.',
    image: '/brand/categories/skincare.jpg',
    objectPosition: 'center 40%',
    alt: 'Soft skincare bottles on a marble vanity',
  },
  hair: {
    title: 'Hair',
    blurb: 'Treatments, oils, and refresh essentials for healthier-feeling hair.',
    image: '/brand/categories/hair.jpg',
    objectPosition: 'center 45%',
    alt: 'Hair care oil and brush on a warm vanity',
  },
  makeup: {
    title: 'Makeup',
    blurb: 'Everyday color and finish staples without the noise.',
    image: '/brand/categories/makeup.jpg',
    objectPosition: 'center 40%',
    alt: 'Makeup essentials on soft blush silk',
  },
  body: {
    title: 'Body',
    blurb: 'Lotions, mists, and body care that make the routine feel intentional.',
    image: '/brand/categories/body.jpg',
    objectPosition: 'center 45%',
    alt: 'Body lotion and mist on a clean spa tray',
  },
  tools: {
    title: 'Tools',
    blurb: 'Stylers, dryers, and devices that earn counter space.',
    image: '/brand/categories/tools.jpg',
    objectPosition: 'center 40%',
    alt: 'Premium beauty tools on cool marble',
  },
  'sun-spf': {
    title: 'Sun & SPF',
    blurb: 'Daily SPF that wears well under makeup and real life.',
    image: '/brand/categories/sun-spf.jpg',
    objectPosition: 'center 40%',
    alt: 'Sunscreen bottles in soft daylight',
  },
  wellness: {
    title: 'Wellness',
    blurb: 'Beauty-adjacent wellness picks like collagen and daily support.',
    image: '/brand/categories/wellness.jpg',
    objectPosition: 'center 45%',
    alt: 'Wellness jar and glass in morning light',
  },
  lips: {
    title: 'Lips',
    blurb: 'Masks, balms, and soft-finish lip care.',
    image: '/brand/categories/lips.jpg',
    objectPosition: 'center 40%',
    alt: 'Lip mask jar and balm on blush silk',
  },
  luxury: {
    title: 'Luxury Beauty',
    blurb:
      'Prestige skincare and makeup — the highest Amazon Associates commission tier (~10%).',
    image: '/brand/categories/luxury.jpg',
    objectPosition: 'center 40%',
    alt: 'Prestige cream jars on a champagne marble vanity',
  },
  fragrance: {
    title: 'Fragrance',
    blurb: 'Perfume and fine fragrance with gift-ready cart size.',
    image: '/brand/categories/fragrance.jpg',
    objectPosition: 'center 45%',
    alt: 'Crystal perfume bottles with soft violet light',
  },
  jewelry: {
    title: 'Luxury Jewelry',
    blurb:
      'Fine jewelry $1,000+ — diamonds, designer pieces, and pre-loved polish.',
    image: '/brand/categories/jewelry-diamonds.jpg',
    objectPosition: 'center 40%',
    alt: 'Diamond earrings, tennis bracelet, and pendant on dark silk',
  },
  handbags: {
    title: 'Luxury Handbags',
    blurb:
      'Designer bags $900+ — Louis Vuitton, Gucci, Prada, and more. Big-ticket fashion finish.',
    image: '/brand/categories/handbags-black.jpg',
    objectPosition: 'center 45%',
    alt: 'Black structured designer handbag on white marble',
  },
  watches: {
    title: 'Luxury Watches',
    blurb:
      'Luxury watches $1,000+ — Swiss and designer timepieces for the finished look.',
    image: '/brand/categories/watches-steel.jpg',
    objectPosition: 'center 35%',
    alt: 'Steel luxury watch on blue velvet',
  },
  gold: {
    title: 'Gold',
    blurb:
      'Solid gold jewelry $500+ — 14K & 18K chains, bands, and fine gold polish.',
    image: '/brand/categories/gold-cuban.jpg',
    objectPosition: 'center 30%',
    alt: 'Solid yellow gold cuban chain and signet ring',
  },
}

export function getCategoryHero(cat: Category | string | null | undefined) {
  if (!cat || !(cat in HEROES)) return null
  return HEROES[cat as Category]
}

export function categoryHeroTitle(cat: Category) {
  return HEROES[cat]?.title ?? CATEGORY_LABELS[cat]
}
