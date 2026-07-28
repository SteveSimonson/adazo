/**
 * Email-safe vibe copy for the post-quiz welcome message.
 * Kept moderate for deliverability (see ghlWelcomeEmail notes in index.ts).
 * Mirror of key fields from src/data/vibes.ts — intentional duplication so the
 * Worker stays a single entry without bundling the SPA data graph.
 */

export type VibeEmailProfile = {
  id: string
  title: string
  tagline: string
  story: string
  catchphrase: string
  traits: string[]
  avatarName: string
  avatarQuote: string
  /** Absolute HTTPS image on first-party domain */
  avatarImageUrl: string
  /** Primary shop room for secondary CTA */
  shopPath: string
  shopLabel: string
}

const BASE = 'https://adazo.com'
const DEFAULT_AVATAR = `${BASE}/brand/vibes/default-avatar.svg`

export const VIBE_EMAIL: Record<string, VibeEmailProfile> = {
  luxe: {
    id: 'luxe',
    title: 'The Quiet Luxe',
    tagline: 'Prestige beauty. Soft power. Nothing loud.',
    story:
      'You collect presence, not trends. Adazo’s Luxury Beauty shelf is your language — weighty jars, considered formulas, vanity that feels like a private gallery.',
    catchphrase: 'Soft power. Prestige only.',
    traits: [
      'Quiet luxury instinct',
      'Collects presence, not trends',
      'Vanity as private gallery',
    ],
    avatarName: 'Vivienne',
    avatarQuote:
      'If it doesn’t feel expensive in the hand, it doesn’t stay on my shelf.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=luxury',
    shopLabel: 'Browse Luxury Beauty',
  },
  muse: {
    id: 'muse',
    title: 'The Soft Glam Muse',
    tagline: 'Color, light, and confidence in the mirror.',
    story:
      'Getting ready is a ritual worth dressing for. Soft glam lips, flush, and finish that photograph expensive — polished, never costume.',
    catchphrase: 'Mirror first. Soft glam always.',
    traits: [
      'Playlist-ready glam',
      'Lip-first decision maker',
      'Polished, never costume',
    ],
    avatarName: 'Camille',
    avatarQuote:
      'If the lip is wrong, nothing else matters. Soft glam is a full decision.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=makeup',
    shopLabel: 'Browse soft glam makeup',
  },
  sillage: {
    id: 'sillage',
    title: 'The Signature Scent',
    tagline: 'You arrive before you speak.',
    story:
      'Fragrance is memory and identity. Build a wardrobe of sillage — day, night, gift — with bottles that earn vanity real estate.',
    catchphrase: 'The trail is the introduction.',
    traits: [
      'Loyal to a signature',
      'Builds a scent wardrobe',
      'Full bottles, never samples only',
    ],
    avatarName: 'Noor',
    avatarQuote:
      'I don’t wear a sample energy. The bottle is the signature — and people remember the trail.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=fragrance',
    shopLabel: 'Browse fragrance',
  },
  atelier: {
    id: 'atelier',
    title: 'The Fashion Finisher',
    tagline: 'Bags, gold, the last perfect piece.',
    story:
      'Beauty alone isn’t the look — the finish is. Handbags and jewelry that complete the glow: structure, light, silhouette.',
    catchphrase: 'The finish makes the look.',
    traits: [
      'Bag-as-architecture thinker',
      'Gold that catches collarbone light',
      'Fashion with beauty-house taste',
    ],
    avatarName: 'Margot',
    avatarQuote:
      'The bag and the gold are not extras. They’re the sentence that ends the look.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=handbags',
    shopLabel: 'Browse fashion finish',
  },
  dew: {
    id: 'dew',
    title: 'The Glow Ritualist',
    tagline: 'Barrier, dew, and daylight discipline.',
    story:
      'Your face is the long game. Cleanse, treat, SPF, soft lips — skin-first shelves without the noise. Luxury when it earns it.',
    catchphrase: 'Barrier first. Dew always.',
    traits: [
      'Barrier-first loyalist',
      'SPF as non-negotiable',
      'Glow without the drama',
    ],
    avatarName: 'Isla',
    avatarQuote:
      'The five minutes of cleanse and treat are the only ones that fully belong to my face.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=skincare',
    shopLabel: 'Browse skincare & glow',
  },
  gilded: {
    id: 'gilded',
    title: 'The Full Adazo Edit',
    tagline: 'Beauty elevated. Fashion finished. All of it.',
    story:
      'You want the house — prestige beauty, fragrance, a bag, a flash of gold. Adazo is your private showroom for the complete elevated cart.',
    catchphrase: 'Beauty elevated. Fashion finished.',
    traits: [
      'Whole-house shopper',
      'Beauty + fashion in one cart',
      'Private showroom energy',
    ],
    avatarName: 'Aurelia',
    avatarQuote:
      'I don’t shop one category. I shop the feeling — beauty, scent, and the piece that finishes the night.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop?cat=luxury',
    shopLabel: 'Browse the full Adazo edit',
  },
}

export function isKnownVibeId(id: string | undefined): boolean {
  return Boolean(id && id in VIBE_EMAIL)
}

export function getVibeEmailProfile(
  personaId: string | undefined,
  personaLabel?: string,
): VibeEmailProfile {
  if (personaId && VIBE_EMAIL[personaId]) return VIBE_EMAIL[personaId]
  const label = String(personaLabel || '').trim()
  return {
    id: personaId && /^[a-z0-9-]+$/i.test(personaId) ? personaId : 'explorer',
    title: label || 'Adazo explorer',
    tagline: 'Luxury beauty. Fashion finish. Your edit awaits.',
    story:
      'Thanks for taking the Adazo Vibe Check. Your full house energy is ready when you are — prestige beauty, fragrance, and fashion finish.',
    catchphrase: 'Discover on Adazo. Buy on Amazon.',
    traits: ['Curious about elevated beauty', 'Values a considered cart'],
    avatarName: 'Adazo',
    avatarQuote: 'Discover on Adazo. Buy on Amazon when you are ready.',
    avatarImageUrl: DEFAULT_AVATAR,
    shopPath: '/shop',
    shopLabel: 'Browse the collection',
  }
}

/** Light UTM set — one campaign, no fingerprint soup */
export function utm(path: string, content: string) {
  const url = new URL(path.startsWith('http') ? path : `${BASE}${path}`)
  url.searchParams.set('utm_source', 'email')
  url.searchParams.set('utm_medium', 'ghl')
  url.searchParams.set('utm_campaign', 'vibe_welcome')
  url.searchParams.set('utm_content', content)
  return url.toString()
}
