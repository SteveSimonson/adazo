import type { Category } from './types'

const ALL_CATEGORIES: Category[] = [
  'luxury',
  'fragrance',
  'skincare',
  'hair',
  'makeup',
  'body',
  'tools',
  'sun-spf',
  'wellness',
  'lips',
  'jewelry',
  'handbags',
  'watches',
  'gold',
]

export type QuizOption = {
  id: string
  label: string
  emoji: string
  blurb: string
  scores: Partial<Record<Category, number>>
  personaBoost?: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  sub?: string
  options: QuizOption[]
  multiSelect?: boolean
  maxSelect?: number
}

export type QuizAnswers = Record<string, string>

export function parseAnswerIds(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function encodeAnswerIds(ids: string[]): string {
  return [...new Set(ids)].filter(Boolean).join(',')
}

export type Persona = {
  id: string
  title: string
  tagline: string
  story: string
  categories: Category[]
  accent: string
}

/**
 * Core vibe check — Adazo luxury, fragrance, fashion finish.
 * Persona IDs: luxe · muse · sillage · atelier · dew · gilded
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'desire',
    prompt: 'What are you craving from Adazo right now?',
    sub: 'Pick up to two. No wrong answers — this is your edit.',
    multiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'prestige',
        label: 'Prestige beauty',
        emoji: '✨',
        blurb: 'Quiet luxury on the vanity — serums that feel like jewels.',
        scores: { luxury: 4, skincare: 2 },
        personaBoost: 'luxe',
      },
      {
        id: 'glam',
        label: 'Soft glam color',
        emoji: '💄',
        blurb: 'Lips, flush, lashes — polished without costume energy.',
        scores: { makeup: 4, lips: 2, luxury: 1 },
        personaBoost: 'muse',
      },
      {
        id: 'scent',
        label: 'A signature scent',
        emoji: '🌸',
        blurb: 'The trail you leave in a room — fragrance first.',
        scores: { fragrance: 4, luxury: 1 },
        personaBoost: 'sillage',
      },
      {
        id: 'finish',
        label: 'Fashion finish',
        emoji: '👜',
        blurb: 'Bags, gold, the last piece that makes the look land.',
        scores: { handbags: 3, jewelry: 3 },
        personaBoost: 'atelier',
      },
    ],
  },
  {
    id: 'evening',
    prompt: 'Your ideal evening energy?',
    sub: 'Where Adazo meets real life.',
    options: [
      {
        id: 'velvet',
        label: 'Velvet & candlelight',
        emoji: '🕯️',
        blurb: 'Slow, expensive-feeling calm — skin glassed, scent low.',
        scores: { luxury: 2, fragrance: 2, skincare: 1 },
        personaBoost: 'luxe',
      },
      {
        id: 'mirror',
        label: 'Mirror & playlist',
        emoji: '🪞',
        blurb: 'Getting ready is the event — color, glow, confidence.',
        scores: { makeup: 3, lips: 2, hair: 1 },
        personaBoost: 'muse',
      },
      {
        id: 'entrance',
        label: 'Out the door',
        emoji: '🌆',
        blurb: 'Bag, heels optional, scent unforgettable.',
        scores: { handbags: 2, fragrance: 2, jewelry: 2 },
        personaBoost: 'atelier',
      },
      {
        id: 'reset',
        label: 'Skincare sanctuary',
        emoji: '💧',
        blurb: 'Cleanse, treat, dew — the ritual is the reward.',
        scores: { skincare: 3, 'sun-spf': 1, wellness: 1, lips: 1 },
        personaBoost: 'dew',
      },
    ],
  },
  {
    id: 'gift',
    prompt: 'You’re buying a gift for yourself. What feels right?',
    options: [
      {
        id: 'jar',
        label: 'A prestige jar',
        emoji: '🫙',
        blurb: 'Something weighty and beautiful on the vanity.',
        scores: { luxury: 4, skincare: 1 },
        personaBoost: 'luxe',
      },
      {
        id: 'bottle',
        label: 'A full bottle of perfume',
        emoji: '💎',
        blurb: 'Not a sample — the real signature.',
        scores: { fragrance: 4 },
        personaBoost: 'sillage',
      },
      {
        id: 'gold',
        label: 'Something that catches light',
        emoji: '✨',
        blurb: 'Hoops, a pendant, a stack that finishes the neckline.',
        scores: { jewelry: 4, handbags: 1 },
        personaBoost: 'atelier',
      },
      {
        id: 'kit',
        label: 'The whole Adazo moment',
        emoji: '🎁',
        blurb: 'Beauty + fashion + scent — an edit, not a single SKU.',
        scores: { luxury: 2, fragrance: 2, handbags: 1, jewelry: 1, makeup: 1 },
        personaBoost: 'gilded',
      },
    ],
  },
  {
    id: 'style',
    prompt: 'How do you want Adazo to feel when you open the site?',
    options: [
      {
        id: 'gallery',
        label: 'Like a private gallery',
        emoji: '🖼️',
        blurb: 'Fewer pieces. Higher stakes. Nothing loud.',
        scores: { luxury: 3, fragrance: 1 },
        personaBoost: 'luxe',
      },
      {
        id: 'vanity',
        label: 'Like your dream vanity',
        emoji: '💋',
        blurb: 'Color, light, and products that perform on camera.',
        scores: { makeup: 3, lips: 2, tools: 1 },
        personaBoost: 'muse',
      },
      {
        id: 'closet',
        label: 'Like the perfect closet corner',
        emoji: '👗',
        blurb: 'Bags and jewels that make getting dressed a ceremony.',
        scores: { handbags: 3, jewelry: 2 },
        personaBoost: 'atelier',
      },
      {
        id: 'spa',
        label: 'Like a five-star bath floor',
        emoji: '🛁',
        blurb: 'Barrier-first skincare, soft light, no rush.',
        scores: { skincare: 3, body: 2, wellness: 1 },
        personaBoost: 'dew',
      },
    ],
  },
  {
    id: 'priority',
    prompt: 'If Adazo only kept three shelves for you, which matter most?',
    sub: 'Pick up to two priorities.',
    multiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'lux-shelf',
        label: 'Luxury Beauty',
        emoji: '👑',
        blurb: 'Prestige skincare & makeup — the elevated vanity.',
        scores: { luxury: 4 },
        personaBoost: 'luxe',
      },
      {
        id: 'frag-shelf',
        label: 'Fragrance',
        emoji: '🌺',
        blurb: 'Sillage that announces you before you speak.',
        scores: { fragrance: 4 },
        personaBoost: 'sillage',
      },
      {
        id: 'fashion-shelf',
        label: 'Fashion finish',
        emoji: '💍',
        blurb: 'Handbags & jewelry — the polish after the glow.',
        scores: { handbags: 3, jewelry: 3 },
        personaBoost: 'atelier',
      },
      {
        id: 'skin-shelf',
        label: 'Skin & ritual',
        emoji: '🌿',
        blurb: 'Everyday skincare that still feels luxurious.',
        scores: { skincare: 3, 'sun-spf': 2, lips: 1 },
        personaBoost: 'dew',
      },
    ],
  },
]

const BRANCH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'luxe-priority',
    prompt: 'Within luxury — what pulls you first?',
    options: [
      {
        id: 'luxe-skin',
        label: 'Prestige skincare',
        emoji: '💧',
        blurb: 'Creams and essences with weight and reputation.',
        scores: { luxury: 3, skincare: 2 },
        personaBoost: 'luxe',
      },
      {
        id: 'luxe-color',
        label: 'Prestige color',
        emoji: '💋',
        blurb: 'Lipsticks and complexion that photograph expensive.',
        scores: { luxury: 2, makeup: 3, lips: 1 },
        personaBoost: 'muse',
      },
    ],
  },
  {
    id: 'muse-priority',
    prompt: 'Your soft glam starts where?',
    options: [
      {
        id: 'muse-lips',
        label: 'Lips first',
        emoji: '👄',
        blurb: 'The right nude or rose changes everything.',
        scores: { lips: 3, makeup: 2 },
        personaBoost: 'muse',
      },
      {
        id: 'muse-face',
        label: 'Full face polish',
        emoji: '✨',
        blurb: 'Skin, flush, lashes — the complete mirror moment.',
        scores: { makeup: 3, skincare: 1, tools: 1 },
        personaBoost: 'muse',
      },
    ],
  },
  {
    id: 'sillage-priority',
    prompt: 'How do you wear fragrance?',
    options: [
      {
        id: 'sillage-signature',
        label: 'One signature forever',
        emoji: '🔏',
        blurb: 'Loyal to a bottle people recognize as you.',
        scores: { fragrance: 4 },
        personaBoost: 'sillage',
      },
      {
        id: 'sillage-wardrobe',
        label: 'A whole wardrobe',
        emoji: '📚',
        blurb: 'Day, night, season — scent as collection.',
        scores: { fragrance: 3, luxury: 1 },
        personaBoost: 'sillage',
      },
    ],
  },
  {
    id: 'atelier-priority',
    prompt: 'Fashion finish — what’s the hero?',
    options: [
      {
        id: 'atelier-bag',
        label: 'The bag',
        emoji: '👜',
        blurb: 'Structure, silhouette, the piece that carries the look.',
        scores: { handbags: 4 },
        personaBoost: 'atelier',
      },
      {
        id: 'atelier-gold',
        label: 'The gold',
        emoji: '📿',
        blurb: 'Earrings, layers, light on the collarbone.',
        scores: { jewelry: 4 },
        personaBoost: 'atelier',
      },
    ],
  },
  {
    id: 'dew-priority',
    prompt: 'Your skin ritual is really about…',
    options: [
      {
        id: 'dew-barrier',
        label: 'Barrier & calm',
        emoji: '🛡️',
        blurb: 'Gentle, consistent, no drama on the face.',
        scores: { skincare: 3, body: 1 },
        personaBoost: 'dew',
      },
      {
        id: 'dew-glow',
        label: 'Dew & light',
        emoji: '🌅',
        blurb: 'Glass skin energy — SPF and glow as non-negotiables.',
        scores: { skincare: 2, 'sun-spf': 3, lips: 1 },
        personaBoost: 'dew',
      },
    ],
  },
  {
    id: 'gilded-priority',
    prompt: 'Your complete look should lean…',
    options: [
      {
        id: 'gilded-beauty',
        label: 'Beauty-led luxury',
        emoji: '👑',
        blurb: 'Fragrance + prestige skin first; fashion as the encore.',
        scores: { luxury: 2, fragrance: 2, makeup: 1 },
        personaBoost: 'gilded',
      },
      {
        id: 'gilded-fashion',
        label: 'Fashion-led luxury',
        emoji: '💎',
        blurb: 'Bags and jewels first; beauty as the glow around them.',
        scores: { handbags: 2, jewelry: 2, fragrance: 1, luxury: 1 },
        personaBoost: 'gilded',
      },
    ],
  },
]

const BRANCH_BY_PERSONA: Record<string, string> = {
  luxe: 'luxe-priority',
  muse: 'muse-priority',
  sillage: 'sillage-priority',
  atelier: 'atelier-priority',
  dew: 'dew-priority',
  gilded: 'gilded-priority',
}

export function getBranchQuestion(personaId: string): QuizQuestion | null {
  const id = BRANCH_BY_PERSONA[personaId]
  if (!id) return null
  return BRANCH_QUESTIONS.find((q) => q.id === id) || null
}

export function questionsForScoring(answers: QuizAnswers): QuizQuestion[] {
  const list = [...QUIZ_QUESTIONS]
  for (const b of BRANCH_QUESTIONS) {
    if (answers[b.id]) list.push(b)
  }
  return list
}

export const PERSONAS: Record<string, Persona> = {
  luxe: {
    id: 'luxe',
    title: 'The Quiet Luxe',
    tagline: 'Prestige beauty. Soft power. Nothing loud.',
    story:
      'You don’t chase trends — you collect presence. Adazo’s Luxury Beauty shelf is your language: weighty jars, considered formulas, vanity that looks like a private gallery. Discover here. Buy on Amazon.',
    categories: ['luxury', 'skincare', 'fragrance'],
    accent: '#9a6b2f',
  },
  muse: {
    id: 'muse',
    title: 'The Soft Glam Muse',
    tagline: 'Color, light, and confidence in the mirror.',
    story:
      'Getting ready is a ritual worth dressing for. You want lips, flush, and finish that photograph expensive — polished, never costume. Adazo curates the soft glam edit; Amazon completes the cart.',
    categories: ['makeup', 'lips', 'luxury'],
    accent: '#b76e79',
  },
  sillage: {
    id: 'sillage',
    title: 'The Signature Scent',
    tagline: 'You arrive before you speak.',
    story:
      'Fragrance is memory and identity. You build a wardrobe of sillage — day, night, gift — and Adazo points you to the bottles worth the vanity real estate. Discover here. Buy on Amazon.',
    categories: ['fragrance', 'luxury', 'body'],
    accent: '#7a4a8a',
  },
  atelier: {
    id: 'atelier',
    title: 'The Fashion Finisher',
    tagline: 'Bags, gold, the last perfect piece.',
    story:
      'Beauty alone isn’t the look — the finish is. You shop Adazo for handbags and jewelry that complete the glow: structure, light, silhouette. Fashion energy with beauty-editor taste.',
    categories: ['handbags', 'jewelry', 'fragrance'],
    accent: '#5c3a2e',
  },
  dew: {
    id: 'dew',
    title: 'The Glow Ritualist',
    tagline: 'Barrier, dew, and daylight discipline.',
    story:
      'Your face is the long game. Cleanse, treat, SPF, soft lips — Adazo’s skin-first shelves without the noise. Luxury when it earns it; everyday when it’s honest.',
    categories: ['skincare', 'sun-spf', 'lips', 'wellness'],
    accent: '#1e5a52',
  },
  gilded: {
    id: 'gilded',
    title: 'The Gilded Collector',
    tagline: 'Prestige, scent, and finish — the complete look.',
    story:
      'You don’t shop one shelf — you build the whole moment. Prestige beauty, a signature fragrance, a bag, a flash of gold. Curated here; completed on Amazon.',
    categories: ['luxury', 'fragrance', 'handbags', 'jewelry', 'makeup'],
    accent: '#8b4513',
  },
}

export type QuizPickSlot = {
  role: string
  categories: Category[]
  why: string
}

export const PERSONA_PICK_SLOTS: Record<string, QuizPickSlot[]> = {
  luxe: [
    {
      role: 'Prestige jar',
      categories: ['luxury', 'skincare'],
      why: 'Weighty, beautiful, and worthy of permanent vanity space.',
    },
    {
      role: 'Signature treatment',
      categories: ['luxury'],
      why: 'The step that makes the whole routine feel expensive.',
    },
    {
      role: 'Quiet luxury color',
      categories: ['luxury', 'makeup', 'lips'],
      why: 'Color that reads rich, not loud.',
    },
    {
      role: 'Fragrance encore',
      categories: ['fragrance', 'luxury'],
      why: 'Sillage to match the prestige skin story.',
    },
    {
      role: 'Gift-ready prestige',
      categories: ['luxury'],
      why: 'Easy to love as a self-gift or hostess moment.',
    },
  ],
  muse: [
    {
      role: 'Hero lip',
      categories: ['lips', 'luxury', 'makeup'],
      why: 'The shade that finishes the mirror check.',
    },
    {
      role: 'Soft flush',
      categories: ['makeup'],
      why: 'Color that looks like better blood flow, not costume.',
    },
    {
      role: 'Lash lift',
      categories: ['makeup'],
      why: 'Open eyes, soft drama, camera-ready.',
    },
    {
      role: 'Skin prep',
      categories: ['skincare', 'luxury'],
      why: 'Makeup sits better on a considered base.',
    },
    {
      role: 'Tool upgrade',
      categories: ['tools', 'makeup'],
      why: 'Application that feels intentional.',
    },
  ],
  sillage: [
    {
      role: 'Day signature',
      categories: ['fragrance'],
      why: 'The trail people notice at noon.',
    },
    {
      role: 'Night signature',
      categories: ['fragrance', 'luxury'],
      why: 'Deeper, warmer, made for after dark.',
    },
    {
      role: 'Body layer',
      categories: ['body', 'fragrance'],
      why: 'Mist and moisture that extend the scent story.',
    },
    {
      role: 'Gift bottle',
      categories: ['fragrance'],
      why: 'Full size — not a sample energy.',
    },
    {
      role: 'Prestige pair',
      categories: ['luxury', 'fragrance'],
      why: 'Beauty that matches the perfume’s attitude.',
    },
  ],
  atelier: [
    {
      role: 'Hero bag',
      categories: ['handbags'],
      why: 'Silhouette and structure that finish the outfit.',
    },
    {
      role: 'Everyday gold',
      categories: ['jewelry'],
      why: 'Light on the ear and collarbone — daily polish.',
    },
    {
      role: 'Layer stack',
      categories: ['jewelry'],
      why: 'Necklaces that build presence without noise.',
    },
    {
      role: 'Scent bridge',
      categories: ['fragrance'],
      why: 'Fragrance that walks with the fashion finish.',
    },
    {
      role: 'Night bag',
      categories: ['handbags'],
      why: 'Compact, intentional, made for after six.',
    },
  ],
  dew: [
    {
      role: 'Gentle cleanse',
      categories: ['skincare'],
      why: 'Barrier-first — no strip, no drama.',
    },
    {
      role: 'Treatment step',
      categories: ['skincare', 'luxury'],
      why: 'The serum or cream that earns its place.',
    },
    {
      role: 'Daylight discipline',
      categories: ['sun-spf', 'skincare'],
      why: 'SPF as non-negotiable finish.',
    },
    {
      role: 'Soft lips',
      categories: ['lips'],
      why: 'Mask or balm for the last gentle step.',
    },
    {
      role: 'Wellness support',
      categories: ['wellness', 'body'],
      why: 'Inside-out care that still feels beautiful.',
    },
  ],
  gilded: [
    {
      role: 'Prestige anchor',
      categories: ['luxury'],
      why: 'The luxury piece the whole cart orbits.',
    },
    {
      role: 'Signature scent',
      categories: ['fragrance'],
      why: 'Sillage for the complete elevated moment.',
    },
    {
      role: 'Fashion finish',
      categories: ['handbags', 'jewelry'],
      why: 'Bag or gold — the look leaves the vanity.',
    },
    {
      role: 'Soft glam accent',
      categories: ['makeup', 'lips'],
      why: 'Color that bridges beauty and fashion.',
    },
    {
      role: 'Skin insurance',
      categories: ['skincare', 'sun-spf'],
      why: 'Glow that holds under the whole edit.',
    },
  ],
}

export type QuizPick = {
  product: import('./types').Product
  role: string
  why: string
}

export type QuizScoreResult = {
  persona: Persona
  secondaryPersona: Persona | null
  confidence: number
  categoryScores: Record<string, number>
  topCategories: Category[]
  interestTags: string[]
  answerLabels: string[]
  answerSummary: string
  personaVotes: Record<string, number>
}

function personaFromCategoryLeader(
  categoryScores: Record<string, number>,
): string {
  const topCat = Object.entries(categoryScores).sort((a, b) => b[1] - a[1])[0]
  if (!topCat) return 'luxe'
  const c = topCat[0]
  if (c === 'luxury') return 'luxe'
  if (c === 'fragrance') return 'sillage'
  if (c === 'handbags' || c === 'jewelry') return 'atelier'
  if (c === 'makeup' || c === 'lips') return 'muse'
  if (c === 'skincare' || c === 'sun-spf' || c === 'wellness' || c === 'body')
    return 'dew'
  if (c === 'hair' || c === 'tools') return 'muse'
  return 'gilded'
}

export function scoreQuiz(answers: QuizAnswers): QuizScoreResult {
  const categoryScores: Record<string, number> = {}
  const personaVotes: Record<string, number> = {}
  const answerLabels: string[] = []
  const questions = questionsForScoring(answers)

  for (const q of questions) {
    const ids = parseAnswerIds(answers[q.id])
    if (ids.length === 0) continue

    const scale = ids.length > 1 ? 0.75 : 1
    const labels: string[] = []

    for (const id of ids) {
      const opt = q.options.find((o) => o.id === id)
      if (!opt) continue
      labels.push(opt.label)
      for (const [cat, n] of Object.entries(opt.scores)) {
        categoryScores[cat] =
          (categoryScores[cat] || 0) + (n || 0) * scale
      }
      if (opt.personaBoost) {
        personaVotes[opt.personaBoost] =
          (personaVotes[opt.personaBoost] || 0) + scale
      }
    }

    if (labels.length === 1) answerLabels.push(labels[0])
    else if (labels.length > 1) answerLabels.push(labels.join(' + '))
  }

  const ranked = Object.entries(personaVotes).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]
    return a[0].localeCompare(b[0])
  })
  let personaId = ranked[0]?.[0] || 'luxe'
  let best = ranked[0]?.[1] ?? 0
  const hadPersonaVotes = best > 0

  if (!hadPersonaVotes) {
    personaId = personaFromCategoryLeader(categoryScores)
  } else if (ranked.length >= 2 && ranked[1][1] === ranked[0][1]) {
    const tiedIds = ranked
      .filter(([, n]) => n === best)
      .map(([id]) => id)
    const fromCats = personaFromCategoryLeader(categoryScores)
    personaId = tiedIds.includes(fromCats) ? fromCats : tiedIds[0]
  }

  const persona = PERSONAS[personaId] || PERSONAS.luxe

  let secondaryPersona: Persona | null = null
  const others = ranked.filter(([id]) => id !== personaId)
  if (others.length >= 1 && hadPersonaVotes) {
    const [secondId, secondVotes] = others[0]
    if (secondVotes > 0 && secondVotes >= best * 0.4) {
      secondaryPersona = PERSONAS[secondId] || null
    }
  }

  const totalVotes = ranked.reduce((s, [, n]) => s + n, 0)
  const confidence = hadPersonaVotes
    ? Math.min(1, Math.max(0, best / (totalVotes || 1)))
    : 0.3

  const topCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c as Category)
    .filter((c) => ALL_CATEGORIES.includes(c))
    .slice(0, 3)

  const secondaryCats = secondaryPersona?.categories || []
  const interestTags = [
    ...new Set([
      ...persona.categories.map((c) => `interest:${c}`),
      ...topCategories.map((c) => `interest:${c}`),
      ...secondaryCats.map((c) => `interest:${c}`),
    ]),
  ].slice(0, 8)

  const answerSummary =
    answerLabels.length > 0
      ? `${answerLabels.join(' · ')} → ${persona.title}`
      : persona.title

  return {
    persona,
    secondaryPersona,
    confidence,
    categoryScores,
    topCategories,
    interestTags,
    answerLabels,
    answerSummary,
    personaVotes,
  }
}

export function buildQuizPicks(
  products: import('./types').Product[],
  personaId: string,
  topCategories: Category[],
  limit = 5,
): QuizPick[] {
  const slots = PERSONA_PICK_SLOTS[personaId] || PERSONA_PICK_SLOTS.luxe
  const preferredCats = [
    ...new Set([...slots.flatMap((s) => s.categories), ...topCategories]),
  ]

  const pool = products.filter(
    (p) =>
      preferredCats.includes(p.category) ||
      topCategories.includes(p.category),
  )

  const usedIds = new Set<string>()
  const usedCats = new Map<Category, number>()
  const picks: QuizPick[] = []

  function scoreCandidate(
    p: import('./types').Product,
    slot: QuizPickSlot,
    requireSlotCat: boolean,
  ): number {
    const inSlot = slot.categories.includes(p.category)
    if (requireSlotCat && !inSlot) return -999
    let s = 0
    if (inSlot) s += 10
    else if (topCategories.includes(p.category)) s += 4
    if (p.limitedTime) s += 3
    if (p.badge) s += 1
    if (p.bsrRank != null && p.bsrRank <= 50) s += 2
    if ((p.images || []).some((u) => /media-amazon\.com\/images\/I\//i.test(u)))
      s += 2
    const catCount = usedCats.get(p.category) || 0
    s -= catCount * 6
    if (p.rating) s += Math.min(p.rating, 5) * 0.3
    return s
  }

  for (const slot of slots) {
    if (picks.length >= limit) break
    const hasInSlot = pool.some(
      (p) => !usedIds.has(p.id) && slot.categories.includes(p.category),
    )
    const candidates = pool
      .filter((p) => !usedIds.has(p.id))
      .map((p) => ({ p, score: scoreCandidate(p, slot, hasInSlot) }))
      .filter((c) => c.score > -20)
      .sort((a, b) => b.score - a.score)

    const best = candidates[0]?.p
    if (!best) continue
    usedIds.add(best.id)
    usedCats.set(best.category, (usedCats.get(best.category) || 0) + 1)
    const inSlot = slot.categories.includes(best.category)
    picks.push({
      product: best,
      role: inSlot ? slot.role : 'Adazo pick',
      why: inSlot
        ? slot.why
        : best.tagline || 'Chosen for your Adazo persona.',
    })
  }

  if (picks.length < Math.min(3, limit)) {
    const fallback = products
      .filter((p) => !usedIds.has(p.id))
      .sort((a, b) => {
        const la = a.limitedTime ? 1 : 0
        const lb = b.limitedTime ? 1 : 0
        return lb - la
      })
    for (const p of fallback) {
      if (picks.length >= limit) break
      usedIds.add(p.id)
      picks.push({
        product: p,
        role: 'Adazo pick',
        why: p.tagline || 'Chosen for your Adazo persona.',
      })
    }
  }

  return picks
}

export function shopLinkForCategories(cats: Category[]): string {
  if (cats[0]) return `/shop?cat=${cats[0]}`
  return '/shop?cat=luxury'
}
