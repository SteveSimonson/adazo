/**
 * High-fashion lookbook slides for the home hero.
 * Each concept links to a shop category and rotates on a timer.
 */
export type LookbookSlide = {
  id: string
  kicker: string
  title: string
  blurb: string
  cta: string
  to: string
  image: string
  alt: string
  /** CSS object-position for crop */
  objectPosition?: string
}

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'carry',
    kicker: 'Look 01 · The carry',
    title: 'The structured handbag',
    blurb:
      'Architecture you wear. Designer bags $900+ — the piece that finishes every exit.',
    cta: 'Shop luxury handbags',
    to: '/shop?cat=handbags',
    image: '/brand/promo/lookbook-handbags.jpg',
    alt: 'High fashion designer handbag editorial still life',
    objectPosition: 'center 40%',
  },
  {
    id: 'sparkle',
    kicker: 'Look 02 · The sparkle',
    title: 'Diamonds & designer polish',
    blurb:
      'Light on the collarbone. Fine jewelry above $1,000 — statement without costume.',
    cta: 'Shop luxury jewelry',
    to: '/shop?cat=jewelry',
    image: '/brand/promo/lookbook-jewelry.jpg',
    alt: 'High fashion diamond jewelry campaign still life',
    objectPosition: 'center 35%',
  },
  {
    id: 'time',
    kicker: 'Look 03 · The wrist',
    title: 'Luxury timepieces',
    blurb:
      'Swiss and designer watches $1,000+ — the quiet flex on the cuff.',
    cta: 'Shop luxury watches',
    to: '/shop?cat=watches',
    image: '/brand/promo/lookbook-watches.jpg',
    alt: 'High fashion luxury watch campaign still life',
    objectPosition: 'center 45%',
  },
  {
    id: 'gold',
    kicker: 'Look 04 · The gold',
    title: 'Solid gold light',
    blurb:
      '14K and 18K chains, bands, and weight you can feel — gold polish $500+.',
    cta: 'Shop gold',
    to: '/shop?cat=gold',
    image: '/brand/promo/lookbook-gold.jpg',
    alt: 'High fashion solid gold chains editorial still life',
    objectPosition: 'center 40%',
  },
  {
    id: 'vanity',
    kicker: 'Look 05 · The vanity',
    title: 'Prestige beauty gallery',
    blurb:
      'Quiet luxury on the marble tray — prestige skincare and makeup that photograph expensive.',
    cta: 'Shop luxury beauty',
    to: '/shop?cat=luxury',
    image: '/brand/promo/lookbook-luxury.jpg',
    alt: 'High fashion prestige beauty vanity still life',
    objectPosition: 'center 35%',
  },
  {
    id: 'sillage',
    kicker: 'Look 06 · The trail',
    title: 'Signature fragrance',
    blurb:
      'You arrive before you speak. Full bottles, gift-ready sillage, the scent wardrobe.',
    cta: 'Shop fragrance',
    to: '/shop?cat=fragrance',
    image: '/brand/promo/lookbook-fragrance.jpg',
    alt: 'High fashion fragrance campaign still life',
    objectPosition: 'center 40%',
  },
]

/** Auto-advance interval for the home lookbook hero (ms). */
export const LOOKBOOK_ROTATE_MS = 6500
