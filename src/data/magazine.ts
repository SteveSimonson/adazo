import { VIBE_LIST, vibePath, type VibeCampaign, type VibeProfile } from './vibes'

export type MagazineSeries = 'house' | 'world' | 'wild' | 'carpet'

export type MagazinePage = {
  id: string
  kind: 'cover' | 'divider' | 'spread'
  series?: MagazineSeries
  title: string
  kicker: string
  image?: string
  alt?: string
  personaId?: string
  personaName?: string
  personaTitle?: string
  destination?: string
  concept?: string
  to?: string
}

function seriesOf(campaign: VibeCampaign): MagazineSeries | null {
  const s = campaign.season.toLowerCase()
  // Café films are 16:9 lifestyle — not still magazine spreads
  if (s.includes('café') || s.includes('cafe')) return null
  if (s.includes('carpet') || s.includes('oscar') || s.includes('cannes')) {
    return 'carpet'
  }
  if (s.includes('wild')) return 'wild'
  if (s.includes('world') || s.includes('abroad')) return 'world'
  return 'house'
}

function seriesLabel(series: MagazineSeries): { title: string; kicker: string } {
  switch (series) {
    case 'house':
      return { title: 'The Atelier', kicker: 'Volume I · The house' }
    case 'world':
      return { title: 'Abroad', kicker: 'Volume II · Travel' }
    case 'wild':
      return { title: 'The Wild', kicker: 'Volume III · On location' }
    case 'carpet':
      return { title: 'The Carpet', kicker: 'Volume IV · Night light' }
  }
}

/** Build the Adazo house magazine page stack from persona campaigns. */
export function buildMagazinePages(): MagazinePage[] {
  const pages: MagazinePage[] = [
    {
      id: 'cover',
      kind: 'cover',
      title: 'ADAZO',
      kicker: 'The House Book · Since 1726',
    },
  ]

  const bySeries: Record<
    MagazineSeries,
    { vibe: VibeProfile; campaign: VibeCampaign }[]
  > = {
    house: [],
    world: [],
    wild: [],
    carpet: [],
  }

  for (const vibe of VIBE_LIST) {
    for (const campaign of vibe.campaigns) {
      const series = seriesOf(campaign)
      if (!series) continue
      bySeries[series].push({ vibe, campaign })
    }
  }

  const order: MagazineSeries[] = ['house', 'world', 'wild', 'carpet']
  for (const series of order) {
    const entries = bySeries[series]
    if (!entries.length) continue
    const label = seriesLabel(series)
    pages.push({
      id: `divider-${series}`,
      kind: 'divider',
      series,
      title: label.title,
      kicker: label.kicker,
    })
    for (const { vibe, campaign } of entries) {
      pages.push({
        id: `${vibe.id}-${campaign.image}`,
        kind: 'spread',
        series,
        title: campaign.title,
        kicker: campaign.season,
        image: campaign.image,
        alt: campaign.alt,
        personaId: vibe.id,
        personaName: vibe.avatar.name,
        personaTitle: vibe.title,
        destination: campaign.destination,
        concept: campaign.concept,
        to: vibePath(vibe.id),
      })
    }
  }

  return pages
}

export const MAGAZINE_PAGES = buildMagazinePages()

export const MAGAZINE_SERIES_FILTERS: {
  id: 'all' | MagazineSeries
  label: string
}[] = [
  { id: 'all', label: 'Full issue' },
  { id: 'house', label: 'The Atelier' },
  { id: 'world', label: 'Abroad' },
  { id: 'wild', label: 'The Wild' },
  { id: 'carpet', label: 'The Carpet' },
]

export const SERIES_BLURB: Record<MagazineSeries, string> = {
  house: 'The faces you return to — the house, season after season.',
  world: 'New cities. The same quiet authority.',
  wild: 'Beauty that holds when the ground is uneven.',
  carpet: 'Night light, jewels free, the room already hers.',
}

export function seriesBlurb(series?: MagazineSeries): string | undefined {
  if (!series) return undefined
  return SERIES_BLURB[series]
}

/** Open-spread pairing for desktop: left = current face, right = next leaf. */
export function magazineSpread(
  pages: MagazinePage[],
  index: number,
): {
  left: MagazinePage | undefined
  right: MagazinePage | undefined
  index: number
} {
  if (pages.length === 0) {
    return { left: undefined, right: undefined, index: 0 }
  }
  const safe = Math.min(Math.max(index, 0), pages.length - 1)
  return {
    left: pages[safe],
    right: pages[safe + 1],
    index: safe,
  }
}
