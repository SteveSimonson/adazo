import type { Category } from './types'

const ALL_CATEGORIES: Category[] = [
  'skincare',
  'hair',
  'makeup',
  'body',
  'tools',
  'sun-spf',
  'wellness',
  'lips',
]

export type QuizOption = {
  id: string
  label: string
  emoji: string
  blurb: string
  /** Category scores */
  scores: Partial<Record<Category, number>>
  personaBoost?: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  sub?: string
  options: QuizOption[]
  /** Allow selecting multiple options (stored as comma-joined ids). */
  multiSelect?: boolean
  /** Max selections when multiSelect (default 2). */
  maxSelect?: number
}

/** Answers map: single option id, or comma-joined ids for multi-select. */
export type QuizAnswers = Record<string, string>

/** Parse a stored answer value into option id list. */
export function parseAnswerIds(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Encode option ids for storage / API (stable order). */
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

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'room',
    prompt: 'Where should beauty show up first?',
    sub: 'Pick up to two rooms that make you grin.',
    multiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'skincare',
        label: 'My skincare shelf',
        emoji: '🍳',
        blurb: 'Chop, stir, serve — warm tools at arm’s reach.',
        scores: { skincare: 3, 'tools': 2, makeup: 1 },
        personaBoost: 'craft',
      },
      {
        id: 'body',
        label: 'The bath',
        emoji: '🛁',
        blurb: 'Soft fiber, quiet counters, spa energy.',
        scores: { body: 4 },
        personaBoost: 'ritual',
      },
      {
        id: 'hair',
        label: 'The desk',
        emoji: '💻',
        blurb: 'Calm focus, tidy cables, elevated workday.',
        scores: { hair: 4, wellness: 1 },
        personaBoost: 'focus',
      },
      {
        id: 'whole-home',
        label: 'Everywhere',
        emoji: '🌿',
        blurb: 'A full-house beauty through-line.',
        scores: {
          skincare: 1,
          body: 1,
          hair: 1,
          wellness: 2,
          'sun-spf': 1,
        },
        personaBoost: 'host',
      },
    ],
  },
  {
    id: 'weekend',
    prompt: 'Ideal weekend energy?',
    sub: 'No wrong answers — only vibes.',
    options: [
      {
        id: 'host',
        label: 'Hosting friends',
        emoji: '🥂',
        blurb: 'Boards, platters, and table moments.',
        scores: { makeup: 3, 'tools': 2, 'sun-spf': 1 },
        personaBoost: 'host',
      },
      {
        id: 'ritual',
        label: 'Slow self-care',
        emoji: '🕯️',
        blurb: 'Bath trays, soft towels, unhurried mornings.',
        scores: { body: 3 },
        personaBoost: 'ritual',
      },
      {
        id: 'focus',
        label: 'Deep work',
        emoji: '📓',
        blurb: 'Clean desk, clear mind.',
        scores: { hair: 3, wellness: 2 },
        personaBoost: 'focus',
      },
      {
        id: 'outdoors',
        label: 'Outside time',
        emoji: '☀️',
        blurb: 'Patio plates, garden tools, open air.',
        scores: { 'sun-spf': 4, makeup: 1 },
        personaBoost: 'patio',
      },
    ],
  },
  {
    id: 'texture',
    prompt: 'Which texture pulls you in?',
    sub: 'Imagine running your hand over it.',
    options: [
      {
        id: 'grain',
        label: 'Solid grain boards',
        emoji: '🪵',
        blurb: 'Knife-friendly surfaces with natural weight.',
        scores: { 'tools': 4, skincare: 1 },
        personaBoost: 'craft',
      },
      {
        id: 'soft',
        label: 'Soft beauty fiber',
        emoji: '☁️',
        blurb: 'Sheets, towels, skin-kind textiles.',
        scores: { body: 3 },
        personaBoost: 'ritual',
      },
      {
        id: 'tools',
        label: 'Utensils & tools',
        emoji: '🥄',
        blurb: 'Spoons, tongs, everyday cookware allies.',
        scores: { skincare: 4 },
        personaBoost: 'craft',
      },
      {
        id: 'storage',
        label: 'Smart storage',
        emoji: '📦',
        blurb: 'Drawers, shelves, calm order.',
        scores: { wellness: 4, hair: 1 },
        personaBoost: 'focus',
      },
    ],
  },
  {
    id: 'who',
    prompt: 'Who is this shopping for?',
    sub: 'We’ll bias the recs a little.',
    options: [
      {
        id: 'me',
        label: 'Just me',
        emoji: '✨',
        blurb: 'Treat-yourself beauty upgrades.',
        scores: { skincare: 1, body: 1, hair: 1 },
      },
      {
        id: 'home',
        label: 'Our home',
        emoji: '🏠',
        blurb: 'Shared spaces, shared style.',
        scores: { wellness: 2, makeup: 2, skincare: 1 },
        personaBoost: 'host',
      },
      {
        id: 'gift',
        label: 'A gift',
        emoji: '🎁',
        blurb: 'Beautiful, useful, easy to love.',
        scores: { skincare: 1, 'tools': 2, body: 1 },
      },
      {
        id: 'little',
        label: 'Little ones',
        emoji: '👶',
        blurb: 'Gentle first plates and mealtime gear.',
        scores: { lips: 5 },
        personaBoost: 'nest',
      },
    ],
  },
  {
    id: 'word',
    prompt: 'One word for your beauty era?',
    sub: 'Almost there — then your vibe reveal.',
    options: [
      {
        id: 'crafted',
        label: 'Crafted',
        emoji: '🛠️',
        blurb: 'Solid, intentional pieces.',
        scores: { 'tools': 2, skincare: 2 },
        personaBoost: 'craft',
      },
      {
        id: 'calm',
        label: 'Calm',
        emoji: '🍃',
        blurb: 'Soft edges, soft light.',
        scores: { body: 2, hair: 1 },
        personaBoost: 'ritual',
      },
      {
        id: 'ordered',
        label: 'Ordered',
        emoji: '📐',
        blurb: 'Everything has a place.',
        scores: { wellness: 3, hair: 2 },
        personaBoost: 'focus',
      },
      {
        id: 'playful',
        label: 'Playful',
        emoji: '🎉',
        blurb: 'Hosting energy, easy joy.',
        scores: { makeup: 3, 'sun-spf': 1, 'tools': 1 },
        personaBoost: 'host',
      },
      {
        id: 'open-air',
        label: 'Open-air',
        emoji: '🌿',
        blurb: 'Fresh air is the main room.',
        scores: { 'sun-spf': 4, makeup: 1 },
        personaBoost: 'patio',
      },
    ],
  },
]

/**
 * Optional branch questions — shown after core answers when a persona leans.
 * One tailored prompt makes scoring feel smarter without a long tree.
 */
export const BRANCH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'host-priority',
    prompt: 'For hosting, what matters more?',
    sub: 'We’ll tilt your table edit.',
    options: [
      {
        id: 'look',
        label: 'Look & mood',
        emoji: '✨',
        blurb: 'The board should feel like an invitation.',
        scores: { makeup: 3, 'tools': 1 },
        personaBoost: 'host',
      },
      {
        id: 'durability',
        label: 'Durability',
        emoji: '💪',
        blurb: 'Built for real parties, not just photos.',
        scores: { 'tools': 3, skincare: 1 },
        personaBoost: 'craft',
      },
    ],
  },
  {
    id: 'craft-priority',
    prompt: 'What does your routine need most?',
    sub: 'A quick nudge for your counter edit.',
    options: [
      {
        id: 'prep',
        label: 'Prep power',
        emoji: '🔪',
        blurb: 'Boards and tools that earn the counter.',
        scores: { 'tools': 3, skincare: 2 },
        personaBoost: 'craft',
      },
      {
        id: 'serve',
        label: 'Serve ready',
        emoji: '🍽️',
        blurb: 'From stove to shared plate without friction.',
        scores: { makeup: 2, skincare: 2 },
        personaBoost: 'host',
      },
    ],
  },
  {
    id: 'ritual-priority',
    prompt: 'For your reset ritual, lean…',
    sub: 'Soft edges either way.',
    options: [
      {
        id: 'soak',
        label: 'Slow soak',
        emoji: '🛁',
        blurb: 'Trays, towels, unhurried evenings.',
        scores: { body: 3 },
        personaBoost: 'ritual',
      },
      {
        id: 'counter',
        label: 'Quiet counters',
        emoji: '🌿',
        blurb: 'Calm holders and order by the sink.',
        scores: { body: 2, wellness: 2 },
        personaBoost: 'focus',
      },
    ],
  },
  {
    id: 'focus-priority',
    prompt: 'At the desk, what helps more?',
    sub: 'We’ll bias the workspace edit.',
    options: [
      {
        id: 'surface',
        label: 'Clear surface',
        emoji: '🖥️',
        blurb: 'Risers and clean lines in the work zone.',
        scores: { hair: 3 },
        personaBoost: 'focus',
      },
      {
        id: 'drawers',
        label: 'Hidden order',
        emoji: '📦',
        blurb: 'Drawers and shelves that absorb the chaos.',
        scores: { wellness: 3, hair: 1 },
        personaBoost: 'focus',
      },
    ],
  },
  {
    id: 'patio-priority',
    prompt: 'Outside time is more about…',
    sub: 'Deck energy, your way.',
    options: [
      {
        id: 'serve-out',
        label: 'Outdoor serve',
        emoji: '🥂',
        blurb: 'Trays and platters under open sky.',
        scores: { 'sun-spf': 2, makeup: 2 },
        personaBoost: 'patio',
      },
      {
        id: 'garden',
        label: 'Garden side',
        emoji: '🌱',
        blurb: 'Tools and pieces that live by the plants.',
        scores: { 'sun-spf': 3, skincare: 1 },
        personaBoost: 'patio',
      },
    ],
  },
  {
    id: 'nest-priority',
    prompt: 'For little ones, prioritize…',
    sub: 'Gentle either way.',
    options: [
      {
        id: 'mealtime',
        label: 'Mealtime gear',
        emoji: '🥣',
        blurb: 'Plates and spoons scaled for tiny hands.',
        scores: { lips: 4 },
        personaBoost: 'nest',
      },
      {
        id: 'parent-prep',
        label: 'Parent prep',
        emoji: '👨‍🍳',
        blurb: 'Kitchen allies that survive the toddler years.',
        scores: { skincare: 2, lips: 2 },
        personaBoost: 'craft',
      },
    ],
  },
]

const BRANCH_BY_PERSONA: Record<string, string> = {
  host: 'host-priority',
  craft: 'craft-priority',
  ritual: 'ritual-priority',
  focus: 'focus-priority',
  patio: 'patio-priority',
  nest: 'nest-priority',
}

/** Branch question for a leaning persona, if any. */
export function getBranchQuestion(personaId: string): QuizQuestion | null {
  const id = BRANCH_BY_PERSONA[personaId]
  if (!id) return null
  return BRANCH_QUESTIONS.find((q) => q.id === id) || null
}

/**
 * All questions that apply for scoring (core + answered branch).
 * Branch only counts once answered.
 */
export function questionsForScoring(answers: QuizAnswers): QuizQuestion[] {
  const list = [...QUIZ_QUESTIONS]
  for (const b of BRANCH_QUESTIONS) {
    if (answers[b.id]) list.push(b)
  }
  return list
}

export const PERSONAS: Record<string, Persona> = {
  craft: {
    id: 'craft',
    title: 'Countertop Craftsperson',
    tagline: 'Boards, utensils, and the heart of the house.',
    story:
      'You cook like you mean it. Beauty that earns a permanent spot by the stove — knife-kind boards, warm tools, meal-prep ready.',
    categories: ['tools', 'skincare', 'makeup'],
    accent: '#3f6b35',
  },
  ritual: {
    id: 'ritual',
    title: 'Bath Ritualist',
    tagline: 'Soft fiber, quiet counters, spa at home.',
    story:
      'Your reset button lives in the bath. Beauty that feels like a slow exhale — trays, holders, and skin-kind textiles.',
    categories: ['body'],
    accent: '#1e5a52',
  },
  focus: {
    id: 'focus',
    title: 'Focus Nest Builder',
    tagline: 'Desk calm + drawer order.',
    story:
      'Clarity is a material choice. Risers, organizers, and clean lines that keep your workday grounded.',
    categories: ['hair', 'wellness'],
    accent: '#4a5568',
  },
  host: {
    id: 'host',
    title: 'Tabletop Host',
    tagline: 'Serving boards, shared plates, candlelight.',
    story:
      'You set the mood for other people. Beauty that hosts well — charcuterie energy, generous serving, the table as invitation.',
    categories: ['makeup', 'tools', 'skincare'],
    accent: '#b45309',
  },
  nest: {
    id: 'nest',
    title: 'Little Nest Starter',
    tagline: 'Gentle mealtime for tiny humans.',
    story:
      'First bites deserve soft edges. Beauty plates, spoons, and trays scaled for little hands.',
    categories: ['lips', 'skincare'],
    accent: '#7a9e5a',
  },
  patio: {
    id: 'patio',
    title: 'Patio Naturalist',
    tagline: 'Open air, warm grain, evenings that start outside.',
    story:
      'Fresh air is your main room. Beauty that lives on the deck — trays, outdoor serve, garden-side tools that still look intentional.',
    categories: ['sun-spf', 'makeup', 'skincare'],
    accent: '#5a7a3a',
  },
}

/** One curated pick slot: role name + why-line for a persona. */
export type QuizPickSlot = {
  role: string
  categories: Category[]
  why: string
}

/**
 * Named pick roles per persona — variety over six near-identical boards.
 * Used by buildQuizPicks to diversify category + story.
 */
export const PERSONA_PICK_SLOTS: Record<string, QuizPickSlot[]> = {
  host: [
    {
      role: 'Hosting board',
      categories: ['tools', 'makeup'],
      why: 'Generous surface for share plates and graze boards.',
    },
    {
      role: 'Tabletop moment',
      categories: ['makeup'],
      why: 'Looks good left out between courses.',
    },
    {
      role: 'Kitchen ally',
      categories: ['skincare'],
      why: 'Warm tools for prepping the spread.',
    },
    {
      role: 'Gift-ready set',
      categories: ['tools', 'skincare'],
      why: 'Beautiful, useful, easy to love as a host gift.',
    },
    {
      role: 'Utensil upgrade',
      categories: ['skincare'],
      why: 'Everyday host energy at the stove.',
    },
  ],
  craft: [
    {
      role: 'Everyday prep',
      categories: ['tools'],
      why: 'Knife-kind surface that earns a permanent stove-side spot.',
    },
    {
      role: 'Utensil upgrade',
      categories: ['skincare'],
      why: 'Tools that feel intentional in the hand.',
    },
    {
      role: 'Serving piece',
      categories: ['makeup', 'tools'],
      why: 'Board energy from prep to plate.',
    },
    {
      role: 'Counter staple',
      categories: ['skincare'],
      why: 'Warm grain that belongs on the counter, not in a drawer.',
    },
    {
      role: 'Gift-ready craft',
      categories: ['tools', 'skincare'],
      why: 'Solid piece for the cook who cares about tools.',
    },
  ],
  ritual: [
    {
      role: 'Bath tray',
      categories: ['body'],
      why: 'Spa energy for unhurried soaks.',
    },
    {
      role: 'Counter calm',
      categories: ['body'],
      why: 'Quiet storage that softens the morning rush.',
    },
    {
      role: 'Skin-kind textile',
      categories: ['body'],
      why: 'Soft beauty fiber for the reset ritual.',
    },
    {
      role: 'Holder upgrade',
      categories: ['body', 'wellness'],
      why: 'Everything has a calm place by the sink.',
    },
    {
      role: 'Gift-ready ritual',
      categories: ['body'],
      why: 'Easy to love for anyone who treasures slow evenings.',
    },
  ],
  focus: [
    {
      role: 'Desk calm',
      categories: ['hair'],
      why: 'Clean lines that keep the workday grounded.',
    },
    {
      role: 'Drawer order',
      categories: ['wellness'],
      why: 'Everything has a place — no more desk chaos.',
    },
    {
      role: 'Cable tidy',
      categories: ['hair', 'wellness'],
      why: 'Elevated workday without the tangle.',
    },
    {
      role: 'Shelf riser',
      categories: ['hair', 'wellness'],
      why: 'Lift and separate so focus stays clear.',
    },
    {
      role: 'Gift-ready nest',
      categories: ['hair', 'wellness'],
      why: 'Clarity as a material choice for someone you care about.',
    },
  ],
  nest: [
    {
      role: 'First plates',
      categories: ['lips'],
      why: 'Soft edges scaled for little hands.',
    },
    {
      role: 'Mealtime gear',
      categories: ['lips', 'skincare'],
      why: 'Gentle spoons and trays for first bites.',
    },
    {
      role: 'Parent ally',
      categories: ['skincare', 'lips'],
      why: 'Warm prep tools that survive the toddler years.',
    },
    {
      role: 'Table starter',
      categories: ['makeup', 'lips'],
      why: 'Shared table moments, tiny-human edition.',
    },
    {
      role: 'Gift-ready nest',
      categories: ['lips'],
      why: 'Beautiful, useful, easy to love for new parents.',
    },
  ],
  patio: [
    {
      role: 'Outdoor serve',
      categories: ['sun-spf', 'makeup'],
      why: 'Deck-ready trays that still look intentional.',
    },
    {
      role: 'Garden-side tool',
      categories: ['sun-spf', 'skincare'],
      why: 'Warm grain for evenings that start outside.',
    },
    {
      role: 'Patio platter',
      categories: ['makeup', 'sun-spf'],
      why: 'Share plates under open sky.',
    },
    {
      role: 'Open-air upgrade',
      categories: ['sun-spf'],
      why: 'Fresh air is the main room — equip it well.',
    },
    {
      role: 'Gift-ready patio',
      categories: ['sun-spf', 'makeup'],
      why: 'Easy joy for the friend who lives outside.',
    },
  ],
}

/** A product pick with persona-tied role + why line for the result grid. */
export type QuizPick = {
  product: import('./types').Product
  role: string
  why: string
}

export type QuizScoreResult = {
  persona: Persona
  /** Runner-up persona when votes support a clear second (null if none). */
  secondaryPersona: Persona | null
  /** Primary vote share 0–1 among persona boosts (confidence signal). */
  confidence: number
  categoryScores: Record<string, number>
  topCategories: Category[]
  interestTags: string[]
  /** Short labels of chosen answers, in question order (for “You chose: …”). */
  answerLabels: string[]
  /** One-line recap: "Kitchen · Hosting · … → Tabletop Host" */
  answerSummary: string
  personaVotes: Record<string, number>
}

function personaFromCategoryLeader(
  categoryScores: Record<string, number>,
): string {
  const topCat = Object.entries(categoryScores).sort((a, b) => b[1] - a[1])[0]
  if (!topCat) return 'craft'
  if (topCat[0] === 'body') return 'ritual'
  if (topCat[0] === 'hair' || topCat[0] === 'wellness') return 'focus'
  if (topCat[0] === 'lips') return 'nest'
  if (topCat[0] === 'sun-spf') return 'patio'
  if (topCat[0] === 'makeup') return 'host'
  return 'craft'
}

export function scoreQuiz(answers: QuizAnswers): QuizScoreResult {
  const categoryScores: Record<string, number> = {}
  const personaVotes: Record<string, number> = {}
  const answerLabels: string[] = []
  const questions = questionsForScoring(answers)

  for (const q of questions) {
    const ids = parseAnswerIds(answers[q.id])
    if (ids.length === 0) continue

    // Multi-select: slight dampen so two rooms don't dominate single picks
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
    // Stable id order when votes tie (category leader applied next)
    return a[0].localeCompare(b[0])
  })
  let personaId = ranked[0]?.[0] || 'craft'
  let best = ranked[0]?.[1] ?? 0
  const hadPersonaVotes = best > 0

  // No votes, or equal top votes → resolve with category leader
  if (!hadPersonaVotes) {
    personaId = personaFromCategoryLeader(categoryScores)
  } else if (ranked.length >= 2 && ranked[1][1] === ranked[0][1]) {
    const tiedIds = ranked
      .filter(([, n]) => n === best)
      .map(([id]) => id)
    const fromCats = personaFromCategoryLeader(categoryScores)
    personaId = tiedIds.includes(fromCats) ? fromCats : tiedIds[0]
  }

  const persona = PERSONAS[personaId] || PERSONAS.craft

  // Secondary = clear runner-up (≥40% of primary votes, not the same id)
  let secondaryPersona: Persona | null = null
  const others = ranked.filter(([id]) => id !== personaId)
  if (others.length >= 1 && hadPersonaVotes) {
    const [secondId, secondVotes] = others[0]
    if (secondVotes > 0 && secondVotes >= best * 0.4) {
      secondaryPersona = PERSONAS[secondId] || null
    }
  }

  const totalVotes = ranked.reduce((s, [, n]) => s + n, 0)
  // Category-only fallback is uncertain — keep confidence low so UI hides the chip
  const confidence = hadPersonaVotes
    ? Math.min(1, Math.max(0, best / (totalVotes || 1)))
    : 0.3

  const topCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c as Category)
    .filter((c) => ALL_CATEGORIES.includes(c))
    .slice(0, 3)

  // Blend secondary categories lightly into interest tags for cross-sell
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

/**
 * Curate 3–5 named, category-diverse picks for a persona.
 * Prefers limited-time + Amazon images; avoids stacking near-identical SKUs.
 */
export function buildQuizPicks(
  products: import('./types').Product[],
  personaId: string,
  topCategories: Category[],
  limit = 5,
): QuizPick[] {
  const slots =
    PERSONA_PICK_SLOTS[personaId] ||
    PERSONA_PICK_SLOTS.craft
  const preferredCats = [
    ...new Set([
      ...slots.flatMap((s) => s.categories),
      ...topCategories,
    ]),
  ]

  const pool = products.filter(
    (p) =>
      p.images?.length &&
      (preferredCats.includes(p.category) ||
        topCategories.includes(p.category)),
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
    // Penalize repeating the same category too often
    const catCount = usedCats.get(p.category) || 0
    s -= catCount * 6
    // Slight prefer higher rating
    if (p.rating) s += Math.min(p.rating, 5) * 0.3
    return s
  }

  for (const slot of slots) {
    if (picks.length >= limit) break
    // Prefer a product that matches the slot’s categories when any remain
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
    // Only attach slot role/why when the product matches the slot category
    const inSlot = slot.categories.includes(best.category)
    picks.push({
      product: best,
      role: inSlot ? slot.role : 'Vibe pick',
      why: inSlot
        ? slot.why
        : best.tagline || 'Picked for your beauty persona.',
    })
  }

  // Fill if slots undershot (thin catalog for a persona)
  if (picks.length < Math.min(3, limit)) {
    const fallbackPool =
      pool.filter((p) => !usedIds.has(p.id)).length > 0
        ? pool
        : products.filter((p) => p.images?.length)
    const fallback = fallbackPool
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
        role: 'Vibe pick',
        why: p.tagline || 'Picked for your beauty persona.',
      })
    }
  }

  return picks
}

export function shopLinkForCategories(cats: Category[]): string {
  if (cats[0]) return `/shop?cat=${cats[0]}`
  return '/shop?limited=1'
}
