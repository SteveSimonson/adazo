import type { Category } from './types'
import { CATEGORY_LABELS } from './catalog'

export type CategoryHeroContent = {
  title: string
  blurb: string
  /** Public path under /brand/categories/ */
  image: string
  /** CSS object-position for crop */
  objectPosition?: string
  alt: string
}

/** Lifestyle heroes for every shop category (photo + copy). */
export const HEROES: Record<Category, CategoryHeroContent> = {
  skincare: {
    title: 'Skincare',
    blurb: 'Cleansers, serums, and moisturizers for real skin concerns.',
    image: '/brand/categories/skincare.svg',
    objectPosition: 'center 40%',
    alt: 'Soft skincare bottles on a marble vanity',
  },
  hair: {
    title: 'Hair',
    blurb: 'Treatments, oils, and refresh essentials for healthier-feeling hair.',
    image: '/brand/categories/hair.svg',
    objectPosition: 'center 45%',
    alt: 'Hair care bottles and a soft brush',
  },
  makeup: {
    title: 'Makeup',
    blurb: 'Everyday color and finish staples without the noise.',
    image: '/brand/categories/makeup.svg',
    objectPosition: 'center 40%',
    alt: 'Makeup essentials on a soft blush surface',
  },
  body: {
    title: 'Body',
    blurb: 'Lotions, mists, and body care that make the routine feel intentional.',
    image: '/brand/categories/body.svg',
    objectPosition: 'center 45%',
    alt: 'Body lotion and mist on a clean bathroom shelf',
  },
  tools: {
    title: 'Tools',
    blurb: 'Stylers, dryers, and devices that earn counter space.',
    image: '/brand/categories/tools.svg',
    objectPosition: 'center 40%',
    alt: 'Beauty tools and a hot air brush',
  },
  'sun-spf': {
    title: 'Sun & SPF',
    blurb: 'Daily SPF that wears well under makeup and real life.',
    image: '/brand/categories/sun-spf.svg',
    objectPosition: 'center 40%',
    alt: 'Sunscreen bottles in soft daylight',
  },
  wellness: {
    title: 'Wellness',
    blurb: 'Beauty-adjacent wellness picks like collagen and daily support.',
    image: '/brand/categories/wellness.svg',
    objectPosition: 'center 45%',
    alt: 'Wellness jar on a kitchen counter',
  },
  lips: {
    title: 'Lips',
    blurb: 'Masks, balms, and soft-finish lip care.',
    image: '/brand/categories/lips.svg',
    objectPosition: 'center 40%',
    alt: 'Lip mask jar and balm',
  },
  luxury: {
    title: 'Luxury Beauty',
    blurb:
      'Prestige skincare and makeup — the highest Amazon Associates commission tier (~10%).',
    image: '/brand/categories/luxury.svg',
    objectPosition: 'center 40%',
    alt: 'Luxury beauty bottles on marble',
  },
  fragrance: {
    title: 'Fragrance',
    blurb: 'Perfume and fine fragrance with gift-ready cart size.',
    image: '/brand/categories/fragrance.svg',
    objectPosition: 'center 45%',
    alt: 'Perfume bottle in soft light',
  },
  jewelry: {
    title: 'Jewelry',
    blurb: 'Fashion and fine jewelry for everyday polish and gifting.',
    image: '/brand/categories/jewelry.svg',
    objectPosition: 'center 40%',
    alt: 'Gold jewelry on soft fabric',
  },
  handbags: {
    title: 'Handbags',
    blurb: 'Bags and fashion accessories that lift average order value.',
    image: '/brand/categories/handbags.svg',
    objectPosition: 'center 45%',
    alt: 'Structured handbag on a clean surface',
  },
}

export function getCategoryHero(cat: Category | string | null | undefined) {
  if (!cat || !(cat in HEROES)) return null
  return HEROES[cat as Category]
}

export function categoryHeroTitle(cat: Category) {
  return HEROES[cat]?.title ?? CATEGORY_LABELS[cat]
}
