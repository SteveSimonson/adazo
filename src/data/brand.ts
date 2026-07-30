/**
 * Adazo brand canon — founding legend & voice.
 * Full narrative: docs/brand-origin.md
 */

export const BRAND = {
  name: 'Adazo',
  founder: 'Ada Zoppi',
  founded: 1726,
  place: 'the Brianza hills north of Milan',
  mottoIt: 'La bellezza non si insegna. Si tramanda.',
  mottoEn: 'Beauty is not taught. It is passed down.',
  /** Short mark line for UI */
  mark: 'Since 1726',
  tagline: 'Beauty is not taught. It is passed down.',
  /** One-line site positioning */
  promise:
    'Luxury for treating yourself — or for the woman you love.',
  /** Footer / about blurb */
  footerBlurb:
    'Since 1726, beauty as inheritance. Discover the house here; complete your purchase on Amazon.',
  affiliateDisclosure:
    'As an Amazon Associate, Adazo earns from qualifying purchases. Prices and availability are set by Amazon and may change.',
} as const

/** Elegant series names — never show technical “Edit / Campaign / Gen” labels. */
export const SERIES_LABELS = {
  house: { title: 'The Atelier', kicker: 'Volume I · The house' },
  world: { title: 'Abroad', kicker: 'Volume II · Travel' },
  wild: { title: 'The Wild', kicker: 'Volume III · On location' },
  carpet: { title: 'The Carpet', kicker: 'Volume IV · Night light' },
  cafe: { title: 'The Café', kicker: 'Volume V · Daylight' },
} as const
