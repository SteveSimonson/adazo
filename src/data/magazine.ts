import { VIBE_LIST, vibePath, type VibeCampaign, type VibeProfile } from './vibes'

export type MagazineSeries = 'house' | 'world' | 'wild'

export type MagazinePage = {
  id: string
  kind: 'cover' | 'divider' | 'spread'
  series?: MagazineSeries
  /** Display title on chrome / divider */
  title: string
  kicker: string
  /** Full-bleed campaign image (spread pages) */
  image?: string
  alt?: string
  personaId?: string
  personaName?: string
  personaTitle?: string
  destination?: string
  concept?: string
  /** Link under the page */
  to?: string
}

function seriesOf(campaign: VibeCampaign): MagazineSeries {
  const s = campaign.season.toLowerCase()
  if (s.includes('wild')) return 'wild'
  if (s.includes('world')) return 'world'
  return 'house'
}

function seriesLabel(series: MagazineSeries): { title: string; kicker: string } {
  switch (series) {
    case 'house':
      return { title: 'House Campaign', kicker: 'Volume One · Fashion finish' }
    case 'world':
      return { title: 'World Edit', kicker: 'Volume Two · Travel' }
    case 'wild':
      return { title: 'Wild Edit', kicker: 'Volume Three · On location' }
  }
}

/** Build the Adazo house magazine page stack from persona campaigns. */
export function buildMagazinePages(): MagazinePage[] {
  const pages: MagazinePage[] = [
    {
      id: 'cover',
      kind: 'cover',
      title: 'ADAZO',
      kicker: 'The House Book · Fashion Destination',
    },
  ]

  const bySeries: Record<MagazineSeries, { vibe: VibeProfile; campaign: VibeCampaign }[]> = {
    house: [],
    world: [],
    wild: [],
  }

  for (const vibe of VIBE_LIST) {
    for (const campaign of vibe.campaigns) {
      bySeries[seriesOf(campaign)].push({ vibe, campaign })
    }
  }

  const order: MagazineSeries[] = ['house', 'world', 'wild']
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
  { id: 'house', label: 'House' },
  { id: 'world', label: 'World' },
  { id: 'wild', label: 'Wild' },
]
