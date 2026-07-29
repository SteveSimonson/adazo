import type { Category } from './types'
import { PERSONAS, type Persona } from './quiz'

export type VibeStat = { label: string; value: number; max?: number }

export type VibeAvatar = {
  name: string
  role: string
  ageBand: string
  hometown: string
  quote: string
  /** Portrait path under /public */
  image: string
  alt: string
}

export type VibeScene = {
  image: string
  alt: string
  caption: string
}

/** Full-page fashion ad still for the persona page (Fashionista-style campaign). */
export type VibeCampaign = {
  /** Campaign title (house name, not a real brand) */
  title: string
  /** Season / series line */
  season: string
  /** Short concept line under the title */
  concept: string
  /** One-line creative direction credit (inspiration, not affiliation) */
  direction: string
  image: string
  alt: string
  /** Optional destination pin for travel series */
  destination?: string
}

export type VibeProfile = Persona & {
  typeLabel: string
  rarity: string
  emoji: string
  flavor: string
  traits: string[]
  powers: { name: string; detail: string }[]
  benefits: string[]
  catchphrase: string
  stats: VibeStat[]
  gradient: string
  cardBg: string
  shopHint: string
  /** Real person energy — lifestyle avatar */
  avatar: VibeAvatar
  /** Lived-in room scene for the hero */
  scene: VibeScene
  /**
   * Fashionista-inspired house campaign ads starring the persona.
   * Ordered portfolio: house fashion first, then world-travel series, etc.
   */
  campaigns: VibeCampaign[]
  /** Concrete day moments that ground the persona */
  dayInTheLife: string[]
  /** Product / beauty truths, not fluff */
  materialTruths: string[]
  /** How this vibe shows up in real life */
  signatureSetup: string
  /** What they buy most often */
  shoppingList: string[]
  /** Friendly peer vibes they often blend with */
  blendsWith: string[]
}

/**
 * Adazo house personas — luxury beauty, fragrance, fashion finish.
 * IDs must match PERSONAS in quiz.ts: luxe · muse · sillage · atelier · dew · gilded
 */
export const VIBES: Record<string, VibeProfile> = {
  luxe: {
    ...PERSONAS.luxe,
    typeLabel: 'Prestige · Quiet Power',
    rarity: 'House Classic',
    emoji: '✨',
    flavor:
      'You don’t decorate a vanity — you curate one. Weight, light, and formulas that feel like private-gallery beauty.',
    catchphrase: 'Soft power. Prestige only.',
    traits: [
      'Quiet luxury instinct',
      'Collects presence, not trends',
      'Jar weight matters as much as claim',
      'Vanity as private gallery',
    ],
    powers: [
      {
        name: 'Prestige Aura',
        detail:
          'You spot the piece that photographs expensive before it leaves the shelf — cream, serum, or set.',
      },
      {
        name: 'Gallery Edit',
        detail:
          'Fewer products, higher stakes. Every bottle earns permanent vanity real estate.',
      },
      {
        name: 'Soft Authority',
        detail:
          'People notice the glow and the restraint — never costume energy, always polish.',
      },
    ],
    benefits: [
      'Luxury Beauty picks with presence',
      'Prestige skincare that feels considered',
      'A vanity story worth showing',
      'Gift-ready jars without the noise',
    ],
    stats: [
      { label: 'Prestige', value: 96 },
      { label: 'Glam', value: 55 },
      { label: 'Sillage', value: 70 },
      { label: 'Finish', value: 65 },
    ],
    gradient: 'from-[#6b4a1f] via-[#9a6b2f] to-[#d4a84b]',
    cardBg: 'from-[#faf6ef] via-[#f3ebe0] to-[#e8dcc8]',
    shopHint: 'Luxury Beauty, prestige skin, and quiet fragrance.',
    avatar: {
      name: 'Vivienne',
      role: 'Quiet luxe editor · Prestige skin',
      ageBand: 'Late 30s',
      hometown: 'Candlelit vanity suite',
      quote:
        'If it doesn’t feel expensive in the hand, it doesn’t stay on my shelf.',
      image: '/brand/vibes/luxe-avatar.jpg',
      alt: 'Vivienne, a Black woman in cream cashmere at a candlelit vanity',
    },
    scene: {
      image: '/brand/vibes/luxe-scene.jpg',
      alt: 'Marble vanity with gold-capped prestige jars, soft candlelight, silk robe',
      caption: '7:40 p.m. — tray set, scent low, mirror still kind.',
    },
    campaigns: [
      {
        title: 'Soft Power',
        season: 'House Campaign · Prestige',
        concept:
          'Full-length quiet-luxury editorial — ivory silk column gown and champagne cape on a grand marble hotel staircase at dusk. Pose: standing, hand on rail.',
        direction:
          'Fashionista-inspired house campaign. Face locked to Vivienne. Wardrobe and pose must never repeat across portfolio slots.',
        image: '/brand/vibes/portfolio/luxe-ad.jpg',
        alt: 'ADAZO Soft Power campaign — Vivienne in an ivory silk gown on a marble staircase',
      },
      {
        title: 'Paris at Dusk',
        season: 'World Edit · Travel',
        destination: 'Paris',
        concept:
          'Travel editorial — charcoal wool coat, crimson gloves, looking back while walking the Seine quay at blue hour. Not cream; not a static frontal coat portrait.',
        direction:
          'World Edit. Face locked to Vivienne. Distinct from Soft Power gown (color, silhouette, motion).',
        image: '/brand/vibes/portfolio/luxe-paris-v2.jpg',
        alt: 'ADAZO World Edit — Vivienne in a charcoal coat with red gloves on the Seine',
      },
      {
        title: 'Savanna Light',
        season: 'Wild Edit · On Location',
        destination: 'Botswana',
        concept:
          'Luxury safari editorial — seated on an open vehicle in ochre silk jumpsuit, gold jewelry, elephants in the golden savanna beyond.',
        direction:
          'Wild Edit. Face locked to Vivienne. Pose seated-on-vehicle (not stairs stand, not Seine walk); wardrobe ochre jumpsuit (not ivory gown, not charcoal coat).',
        image: '/brand/vibes/portfolio/luxe-wild-safari.jpg',
        alt: 'ADAZO Wild Edit — Vivienne on safari with elephants in Botswana',
      },
    ],
    dayInTheLife: [
      'Morning: one prestige serum, no twelve-step circus',
      'Midday: reapply the cream that photographs like glass',
      'Evening: fragrance and a slow face reset by candlelight',
      'Weekend: gift a jar that feels like a private gallery piece',
    ],
    materialTruths: [
      'Prestige formulas often win on texture and finish, not just marketing',
      'Weighty packaging signals care — and lasts as vanity décor',
      'Prestige formulas and packaging that earn vanity real estate',
      'Quiet color and scent complete the prestige story',
    ],
    signatureSetup:
      'Marble tray, two prestige jars, one signature scent, silk light, zero clutter.',
    shoppingList: [
      'Prestige cream or essence',
      'Signature luxury treatment',
      'Quiet prestige color',
      'Fragrance encore for the vanity',
    ],
    blendsWith: ['sillage', 'gilded'],
  },
  muse: {
    ...PERSONAS.muse,
    typeLabel: 'Soft Glam · Mirror',
    rarity: 'Editor’s Darling',
    emoji: '💄',
    flavor:
      'Getting ready is the main event. You want lips, flush, and light that look polished — never costume.',
    catchphrase: 'Mirror first. Soft glam always.',
    traits: [
      'Playlist-ready glam',
      'Lip-first decision maker',
      'Camera-aware color',
      'Polished, never costume',
    ],
    powers: [
      {
        name: 'Mirror Moment',
        detail:
          'You build a face that holds under lights, photos, and the walk to the door.',
      },
      {
        name: 'Hero Lip',
        detail:
          'The right nude or rose changes the whole edit — you never leave without it.',
      },
      {
        name: 'Soft Drama',
        detail:
          'Lashes, flush, and glow that read expensive without looking like a costume party.',
      },
    ],
    benefits: [
      'Soft glam color that photographs well',
      'Lips and flush with intention',
      'Skin prep that lets makeup sit better',
      'Tools that make application feel deliberate',
    ],
    stats: [
      { label: 'Prestige', value: 60 },
      { label: 'Glam', value: 97 },
      { label: 'Sillage', value: 45 },
      { label: 'Finish', value: 75 },
    ],
    gradient: 'from-[#7a3d48] via-[#b76e79] to-[#e8a0ab]',
    cardBg: 'from-[#fdf6f7] via-[#f8e8eb] to-[#f0d4da]',
    shopHint: 'Makeup, lips, and soft prestige color.',
    avatar: {
      name: 'Camille',
      role: 'Soft glam muse · Mirror lead',
      ageBand: 'Early 30s',
      hometown: 'Backlit vanity with playlist on',
      quote:
        'If the lip is wrong, nothing else matters. Soft glam is a full decision.',
      image: '/brand/vibes/muse-avatar.jpg',
      alt: 'Camille, an East Asian woman with soft glam makeup at a vanity mirror',
    },
    scene: {
      image: '/brand/vibes/muse-scene.jpg',
      alt: 'Vanity with lipsticks, blush, lashes, and warm mirror light',
      caption: '6:18 p.m. — playlist on, lip liner drawn, door still optional.',
    },
    campaigns: [
      {
        title: 'Mirror First',
        season: 'House Campaign · Soft Glam',
        concept:
          'Bold beauty fashion studio — rose satin cocktail dress on seamless cherry-red paper, hero lip and hand-in-hair cover pose.',
        direction:
          'Fashionista-inspired house campaign. Model portfolio still — new scene, face locked to Camille.',
        image: '/brand/vibes/portfolio/muse-mirror-first-ad.jpg',
        alt: 'ADAZO Mirror First campaign — Camille in rose satin against a red studio backdrop',
      },
      {
        title: 'Tokyo Nights',
        season: 'World Edit · Travel',
        destination: 'Tokyo',
        concept:
          'Night-city travel editorial — fuchsia trench over black satin mini, neon Shinjuku alley, cosmopolitan soft glam on the move.',
        direction:
          'Fashionista-inspired world-travel campaign. Face locked to Camille — destination nightlife energy.',
        image: '/brand/vibes/portfolio/muse-travel-tokyo.jpg',
        alt: 'ADAZO World Edit — Camille in Tokyo nights fashion street style',
      },
      {
        title: 'Palace Peacocks',
        season: 'Wild Edit · On Location',
        destination: 'Rajasthan',
        concept:
          'Kneeling palace-courtyard editorial — emerald silk with gold border, loose waves, peacocks in a sandstone Rajasthan courtyard.',
        direction:
          'Wild Edit. Face locked to Camille. Kneeling (not vanity, studio hand-in-hair, or Tokyo walk); emerald sari-inspired gown (not rose/fuchsia/black mini).',
        image: '/brand/vibes/portfolio/camille-peacocks.jpg',
        alt: 'ADAZO Wild Edit — Camille kneeling in emerald silk with peacocks in Rajasthan',
      },
    ],
    dayInTheLife: [
      'Morning: skin prep that makes color sit like silk',
      'Lunch: lip refresh — the shade that finishes the check',
      'Evening: full soft glam — flush, lashes, light',
      'Night out: tool upgrade and a prestige color encore',
    ],
    materialTruths: [
      'Hero lips convert because they complete the mirror check',
      'Soft flush beats heavy contour for everyday polish',
      'Skin prep is half of soft glam — makeup is the other half',
      'Tools change the finish as much as the product',
    ],
    signatureSetup:
      'Lit mirror, hero lip front and center, blush and mascara within reach, playlist ready.',
    shoppingList: [
      'Hero lip shade',
      'Soft flush / blush',
      'Lash lift mascara',
      'Skin prep + one tool upgrade',
    ],
    blendsWith: ['luxe', 'atelier'],
  },
  sillage: {
    ...PERSONAS.sillage,
    typeLabel: 'Fragrance · Trail',
    rarity: 'Scent Legend',
    emoji: '🌸',
    flavor:
      'You arrive before you speak. Fragrance is identity — day signature, night wardrobe, full bottles only.',
    catchphrase: 'The trail is the introduction.',
    traits: [
      'Loyal to a signature',
      'Builds a scent wardrobe',
      'Body layer for lasting trail',
      'Gift bottles, never samples only',
    ],
    powers: [
      {
        name: 'Signature Lock',
        detail:
          'People recognize your scent as you — one bottle that becomes identity.',
      },
      {
        name: 'Wardrobe Scent',
        detail:
          'Day, night, season: you rotate like a collector, not a one-note sprayer.',
      },
      {
        name: 'Sillage Bloom',
        detail:
          'Body mists and moisture that extend the story past the first hour.',
      },
    ],
    benefits: [
      'Fragrance with full-bottle presence',
      'Day and night signatures',
      'Body layers that extend the trail',
      'Gift-ready full bottles',
    ],
    stats: [
      { label: 'Prestige', value: 75 },
      { label: 'Glam', value: 50 },
      { label: 'Sillage', value: 98 },
      { label: 'Finish', value: 55 },
    ],
    gradient: 'from-[#4a2a58] via-[#7a4a8a] to-[#b88bc4]',
    cardBg: 'from-[#f8f4fa] via-[#efe6f4] to-[#e2d4ea]',
    shopHint: 'Fragrance first — prestige bottles and body layers.',
    avatar: {
      name: 'Noor',
      role: 'Signature scent · Trail architect',
      ageBand: 'Mid-30s',
      hometown: 'Perfume wardrobe wall',
      quote:
        'I don’t wear a sample energy. The bottle is the signature — and people remember the trail.',
      image: '/brand/vibes/sillage-avatar.jpg',
      alt: 'Noor, a South Asian woman misting perfume in violet light',
    },
    scene: {
      image: '/brand/vibes/sillage-scene.jpg',
      alt: 'Crystal perfume bottles on a vanity with soft purple light and silk',
      caption: '8:02 p.m. — pulse points, one mist in the air, door open.',
    },
    campaigns: [
      {
        title: 'The Trail',
        season: 'House Campaign · Fragrance',
        concept:
          'Night rooftop fashion editorial — black evening jumpsuit, sheer violet organza coat, city skyline bokeh. No product — pure atmosphere.',
        direction:
          'Fashionista-inspired house campaign. Model portfolio still — new scene, face locked to Noor.',
        image: '/brand/vibes/portfolio/sillage-ad.jpg',
        alt: 'ADAZO The Trail campaign — Noor on a night rooftop in violet organza',
      },
      {
        title: 'Marrakech Gold',
        season: 'World Edit · Travel',
        destination: 'Marrakech',
        concept:
          'Riad courtyard at golden hour — flowing black-and-violet silk with gold embroidery, lantern light, scent-of-place without a bottle.',
        direction:
          'Fashionista-inspired world-travel campaign. Face locked to Noor — trail that travels.',
        image: '/brand/vibes/portfolio/noor-marrakech.jpg',
        alt: 'ADAZO World Edit — Noor in a Marrakech riad at golden hour',
      },
      {
        title: 'Desert Falcon',
        season: 'Wild Edit · On Location',
        destination: 'Empty Quarter',
        concept:
          'Desert falconry editorial — ruby coat in dune wind, falcon on glove under dramatic sky. Trail as atmosphere and power.',
        direction:
          'Wild Edit. Face locked to Noor. Profile-with-falcon (not perfume mist, rooftop walk, or Marrakech standing kaftan); ruby coat (not black/violet).',
        image: '/brand/vibes/portfolio/sillage-wild-falcon.jpg',
        alt: 'ADAZO Wild Edit — Noor with a falcon in the desert dunes',
      },
    ],
    dayInTheLife: [
      'Morning: day signature on wrists and neck',
      'Afternoon: body layer to keep the trail honest',
      'Evening: deeper night bottle for after six',
      'Gifting: full size only — never a lonely sample',
    ],
    materialTruths: [
      'Full bottles convert better than discovery kits for loyal wearers',
      'Body care extends sillage past the first hour',
      'Fragrance pairs beautifully with prestige skin and fashion finish',
      'A signature scent is wearable identity',
    ],
    signatureSetup:
      'Two hero bottles front row, body mist beside them, one empty slot for the next obsession.',
    shoppingList: [
      'Day signature eau de parfum',
      'Night / deeper bottle',
      'Body mist or cream layer',
      'Prestige pair for the vanity',
    ],
    blendsWith: ['luxe', 'atelier'],
  },
  atelier: {
    ...PERSONAS.atelier,
    typeLabel: 'Fashion · Finish',
    rarity: 'Runway Edit',
    emoji: '👜',
    flavor:
      'Beauty alone isn’t the look — the finish is. Bags, gold, silhouette: the last piece that makes everything land.',
    catchphrase: 'The finish makes the look.',
    traits: [
      'Bag-as-architecture thinker',
      'Gold that catches collarbone light',
      'Outfit ceremony energy',
      'Fashion with beauty-editor taste',
    ],
    powers: [
      {
        name: 'Silhouette Lock',
        detail:
          'You choose structure and proportion — the bag that finishes the outfit, not the afterthought tote.',
      },
      {
        name: 'Gold Light',
        detail:
          'Earrings, layers, and hoops that catch light where the face and neckline meet.',
      },
      {
        name: 'Fashion Bridge',
        detail:
          'You pair scent and soft glam so the look leaves the vanity complete.',
      },
    ],
    benefits: [
      'Handbags that lift polish and presence',
      'Jewelry that finishes the neckline',
      'Scent that walks with the fashion finish',
      'Gift-ready fashion energy',
    ],
    stats: [
      { label: 'Prestige', value: 70 },
      { label: 'Glam', value: 65 },
      { label: 'Sillage', value: 60 },
      { label: 'Finish', value: 98 },
    ],
    gradient: 'from-[#3d261c] via-[#5c3a2e] to-[#a67c52]',
    cardBg: 'from-[#faf7f4] via-[#f0e8e0] to-[#e4d5c8]',
    shopHint: 'Handbags, jewelry, and the scent that walks with them.',
    avatar: {
      name: 'Margot',
      role: 'Fashion finisher · Closet ceremony',
      ageBand: 'Late 30s',
      hometown: 'Walk-in with gold light',
      quote:
        'The bag and the gold are not extras. They’re the sentence that ends the look.',
      image: '/brand/vibes/atelier-avatar.jpg',
      alt: 'Margot, a Latina woman in a blazer with gold hoops and a structured bag',
    },
    scene: {
      image: '/brand/vibes/atelier-scene.jpg',
      alt: 'Structured handbag, gold hoops, layered necklaces on linen and marble',
      caption: '7:05 p.m. — bag chosen, gold stacked, scent already on.',
    },
    campaigns: [
      {
        title: 'The Finish',
        season: 'House Campaign · Fashion',
        concept:
          'Museum power editorial — black sculptural one-shoulder gown, standing profile looking over shoulder, gold architecture cuff. Not a walking suit.',
        direction:
          'House campaign. Face locked to Margot. Pose/wardrobe deliberately opposed to control blazer and to Milan café seat.',
        image: '/brand/vibes/portfolio/atelier-house-v2.jpg',
        alt: 'ADAZO The Finish campaign — Margot in a black one-shoulder gown in a museum',
      },
      {
        title: 'Milan Caffè',
        season: 'World Edit · Travel',
        destination: 'Milan',
        concept:
          'Seated café editorial at the Duomo — ivory trench, crossed legs, espresso and sunglasses, looking off-camera. Not walking, not a pantsuit.',
        direction:
          'World Edit. Face locked to Margot. Completely different pose and wardrobe from house gown and control closet blazer.',
        image: '/brand/vibes/portfolio/atelier-milan-v2.jpg',
        alt: 'ADAZO World Edit — Margot seated at a Milan café in an ivory trench',
      },
      {
        title: 'White Horse',
        season: 'Wild Edit · On Location',
        destination: 'Andalucía',
        concept:
          'Andalusian ranch editorial — standing with a white horse, hand on its neck, burgundy velvet riding jacket and tall boots.',
        direction:
          'Wild Edit. Face locked to Margot. Horse-side stand (not closet blazer, museum look-back gown, or café seat); burgundy riding (not black gown or ivory trench).',
        image: '/brand/vibes/portfolio/atelier-wild-andalucia.jpg',
        alt: 'ADAZO Wild Edit — Margot with a white Andalusian horse',
      },
    ],
    dayInTheLife: [
      'Morning: everyday gold before the first meeting',
      'Commute: hero crossbody or tote that carries the look',
      'Evening: mini bag + layer stack for after six',
      'Gift season: jewelry that finishes someone else’s neckline',
    ],
    materialTruths: [
      'Handbags complete the look the way a final piece of jewelry does',
      'Hoops and layers convert as everyday polish gifts',
      'Fragrance bridges vanity beauty and the walk out the door',
      'Structure and light matter more than logo shouting',
    ],
    signatureSetup:
      'Hero bag on the hook, everyday gold by the mirror, night mini ready, scent last.',
    shoppingList: [
      'Hero bag (tote, crossbody, or mini)',
      'Everyday gold hoops or studs',
      'Layer necklace stack',
      'Scent bridge for the finish',
    ],
    blendsWith: ['muse', 'gilded'],
  },
  dew: {
    ...PERSONAS.dew,
    typeLabel: 'Glow · Ritual',
    rarity: 'Glass Skin Edition',
    emoji: '💧',
    flavor:
      'Your face is the long game. Barrier, dew, SPF, soft lips — luxury when it earns it, honesty when it doesn’t.',
    catchphrase: 'Barrier first. Dew always.',
    traits: [
      'Barrier-first loyalist',
      'SPF as non-negotiable',
      'Slow sanctuary energy',
      'Glow without the drama',
    ],
    powers: [
      {
        name: 'Barrier Guard',
        detail:
          'You choose gentle, consistent care — no strip, no circus, no irritated skin story.',
      },
      {
        name: 'Daylight Discipline',
        detail:
          'SPF is the finish of every morning. Glow holds because you protect it.',
      },
      {
        name: 'Sanctuary Reset',
        detail:
          'Evening cleanse and treat feel like a five-star bath floor — calm, lit, intentional.',
      },
    ],
    benefits: [
      'Skincare that still feels luxurious',
      'SPF and dew as daily polish',
      'Soft lips as the last gentle step',
      'Wellness that supports the face story',
    ],
    stats: [
      { label: 'Prestige', value: 55 },
      { label: 'Glam', value: 40 },
      { label: 'Sillage', value: 35 },
      { label: 'Glow', value: 97 },
    ],
    gradient: 'from-[#0f3d3a] via-[#1e5a52] to-[#4a9b8c]',
    cardBg: 'from-[#eef6f4] via-[#e4f0ed] to-[#d5e8e4]',
    shopHint: 'Skincare, SPF, lips, and calm wellness.',
    avatar: {
      name: 'Isla',
      role: 'Glow ritualist · Barrier lead',
      ageBand: 'Early 30s',
      hometown: 'Steam-soft bath sanctuary',
      quote:
        'The five minutes of cleanse and treat are the only ones that fully belong to my face.',
      image: '/brand/vibes/dew-avatar.jpg',
      alt: 'Isla, a freckled redhead with dewy skin using a jade roller',
    },
    scene: {
      image: '/brand/vibes/dew-scene.jpg',
      alt: 'Skincare ritual tray with serum, SPF, lip balm, and soft steam',
      caption: '6:12 a.m. — cleanse done, SPF next, phone still outside.',
    },
    campaigns: [
      {
        title: 'Barrier First',
        season: 'House Campaign · Glow',
        concept:
          'Seated greenhouse editorial — sage silk slip dress, hair fully down, low among tropical plants. Not white linen; not standing tourist three-quarter.',
        direction:
          'House campaign. Face locked to Isla. Wardrobe and pose distinct from Santorini standing white linen.',
        image: '/brand/vibes/portfolio/dew-house-v2.jpg',
        alt: 'ADAZO Barrier First campaign — Isla seated in a sage silk slip among greenhouse plants',
      },
      {
        title: 'Santorini Light',
        season: 'World Edit · Travel',
        destination: 'Santorini',
        concept:
          'Standing caldera travel editorial — white linen dress, straw hat in hand, blue domes and sea. Standing vs house seated; white vs sage.',
        direction:
          'World Edit. Face locked to Isla. Must stay opposite house (standing + white vs seated + sage).',
        image: '/brand/vibes/portfolio/dew-travel-santorini.jpg',
        alt: 'ADAZO World Edit — Isla in Santorini white linen overlooking the caldera',
      },
      {
        title: 'Lagoon Flock',
        season: 'Wild Edit · On Location',
        destination: 'Yucatán',
        concept:
          'Standing knee-deep in a turquoise lagoon at sunrise — coral maxi dress, windblown hair, pink flamingos behind her.',
        direction:
          'Wild Edit. Face locked to Isla. In-water look-back (not spa close-up, seated sage slip, or Santorini white stand); coral maxi (not white/sage).',
        image: '/brand/vibes/portfolio/dew-wild-flamingos.jpg',
        alt: 'ADAZO Wild Edit — Isla in a coral dress among flamingos in the Yucatán',
      },
    ],
    dayInTheLife: [
      'Morning: cleanse, treat, SPF — no skip, no drama',
      'Midday: lip balm and water, not another harsh product',
      'Evening: barrier-first reset with soft light',
      'Weekend: longer sanctuary — dew and light as the reward',
    ],
    materialTruths: [
      'Barrier-first routines beat aggressive trends for long-term glow',
      'SPF is the highest-ROI step most people skip',
      'Soft lips finish every ritual without adding noise',
      'Luxury skincare earns its place when texture and results match the price',
    ],
    signatureSetup:
      'Clean tray: cleanser, treatment, SPF, lip balm, soft towel, one botanical stem.',
    shoppingList: [
      'Gentle cleanser',
      'Treatment serum or cream',
      'Daily SPF',
      'Soft lip balm or mask',
    ],
    blendsWith: ['luxe', 'muse'],
  },
  gilded: {
    ...PERSONAS.gilded,
    typeLabel: 'Collector · Full Spectrum',
    rarity: 'Private Showroom',
    emoji: '👑',
    flavor:
      'You don’t want a single shelf — you want the whole look. Prestige beauty, fragrance, a bag, a flash of gold. Everything that makes the night feel finished.',
    catchphrase: 'Beauty elevated. Fashion finished.',
    traits: [
      'Collector of complete looks',
      'Beauty and fashion in one edit',
      'Gift-stack instinct',
      'Private showroom energy',
    ],
    powers: [
      {
        name: 'Full Look Aura',
        detail:
          'You build a moment: prestige anchor, scent, finish, soft glam — never a lonely single product.',
      },
      {
        name: 'Gift Architecture',
        detail:
          'You know how to stack a present that feels like a private showroom visit.',
      },
      {
        name: 'Spectrum Edit',
        detail:
          'Luxury beauty, fragrance, handbags, jewelry — you let curation do the hard work.',
      },
    ],
    benefits: [
      'The complete elevated experience',
      'Beauty and fashion finish together',
      'Gift-ready multi-category edits',
      'One path from vanity to closet',
    ],
    stats: [
      { label: 'Prestige', value: 88 },
      { label: 'Glam', value: 80 },
      { label: 'Sillage', value: 82 },
      { label: 'Finish', value: 90 },
    ],
    gradient: 'from-[#5c2e0a] via-[#8b4513] to-[#c9a227]',
    cardBg: 'from-[#fbf7f0] via-[#f5ead8] to-[#e8d5b0]',
    shopHint: 'Luxury, fragrance, handbags, jewelry — the full spectrum.',
    avatar: {
      name: 'Aurelia',
      role: 'Collector · Private showroom',
      ageBand: 'Mid-40s',
      hometown: 'Private showroom at home',
      quote:
        'I don’t shop one category. I shop the feeling — beauty, scent, and the piece that finishes the night.',
      image: '/brand/vibes/gilded-avatar.jpg',
      alt: 'Aurelia, a mature woman with silver-streaked hair in gold jewelry and bronze silk',
    },
    scene: {
      image: '/brand/vibes/gilded-scene.jpg',
      alt: 'Styled flat lay of luxury beauty, fragrance bottle, handbag, and gold jewelry',
      caption: 'Friday 7:30 p.m. — full edit laid out, door in twenty minutes.',
    },
    campaigns: [
      {
        title: 'Private Showroom',
        season: 'House Campaign · Collector',
        concept:
          'Opera staircase editorial — sleeveless liquid bronze gown, opera gloves, hand on gold rail, looking up. Static grandeur.',
        direction:
          'House campaign. Face locked to Aurelia. Bronze gown stays house-only — travel must not reuse this silhouette.',
        image: '/brand/vibes/portfolio/gilded-ad.jpg',
        alt: 'ADAZO Private Showroom campaign — Aurelia in a bronze gown on an opera staircase',
      },
      {
        title: 'Venice Grand Tour',
        season: 'World Edit · Travel',
        destination: 'Venice',
        concept:
          'Walking a foggy Venice calle at blue hour — black velvet coat, gold buttons, champagne blouse, clutch. Not bronze gown; not static stairs.',
        direction:
          'World Edit. Face locked to Aurelia. Black velvet motion vs house bronze static gown.',
        image: '/brand/vibes/portfolio/gilded-venice-v2.jpg',
        alt: 'ADAZO World Edit — Aurelia walking a Venice alley in a black velvet coat',
      },
      {
        title: 'White Peacock',
        season: 'Wild Edit · On Location',
        destination: 'Jaipur',
        concept:
          'Seated palace-terrace editorial — emerald velvet jacket, gold trousers, dramatic emerald jewelry, white peacock beside her.',
        direction:
          'Wild Edit. Face locked to Aurelia. Seated terrace with peacock (not jewelry-table seat, opera bronze stand, or Venice walk); emerald/gold (not bronze gown or black velvet coat).',
        image: '/brand/vibes/portfolio/gilded-wild-jaipur.jpg',
        alt: 'ADAZO Wild Edit — Aurelia with a white peacock on a Jaipur palace terrace',
      },
    ],
    dayInTheLife: [
      'Morning: prestige skin + day scent',
      'Work: everyday gold and a bag with architecture',
      'Evening: soft glam, night fragrance, mini bag',
      'Weekend: gift the whole moment — not a single lonely piece',
    ],
    materialTruths: [
      'Beauty and fashion finish feel complete together',
      'Fragrance bridges the vanity and the walk out the door',
      'A considered multi-shelf edit beats a random single product',
      'The look lands when glow, scent, and finish all agree',
    ],
    signatureSetup:
      'Vanity prestige + perfume front, bag and gold by the door, soft glam ready for night.',
    shoppingList: [
      'Prestige beauty anchor',
      'Signature fragrance',
      'Fashion finish (bag or gold)',
      'Soft glam accent + skin insurance',
    ],
    blendsWith: ['luxe', 'atelier'],
  },
}

export const VIBE_LIST = Object.values(VIBES)

export function getVibe(id: string | undefined): VibeProfile | undefined {
  if (!id) return undefined
  return VIBES[id]
}

export function vibePath(id: string) {
  return `/vibe/${id}`
}

export const VIBE_STORAGE_KEY = 'adazo-vibe-id'

export function readStoredVibeId(): string | null {
  try {
    return localStorage.getItem(VIBE_STORAGE_KEY)
  } catch {
    return null
  }
}

export function writeStoredVibeId(id: string) {
  try {
    localStorage.setItem(VIBE_STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}

export function roomLinks(categories: Category[]) {
  return categories.map((c) => ({ cat: c }))
}

/**
 * Primary vibe most associated with a shop room (stable default / SEO).
 * Prefer `pickVibeForCategory` for UI — it randomizes within a related pool.
 */
export const CATEGORY_PRIMARY_VIBE: Partial<Record<Category, string>> = {
  luxury: 'luxe',
  fragrance: 'sillage',
  skincare: 'dew',
  makeup: 'muse',
  lips: 'muse',
  hair: 'muse',
  tools: 'muse',
  body: 'sillage',
  'sun-spf': 'dew',
  wellness: 'dew',
  jewelry: 'atelier',
  handbags: 'atelier',
  watches: 'atelier',
  gold: 'gilded',
}

/**
 * Related personas for category vibe-check CTAs.
 * Pools include a primary + peers so the graphic rotates instead of always
 * showing the same face on every category visit.
 */
export const CATEGORY_VIBE_POOL: Partial<Record<Category, string[]>> = {
  luxury: ['luxe', 'gilded', 'muse', 'sillage'],
  fragrance: ['sillage', 'luxe', 'gilded', 'atelier'],
  skincare: ['dew', 'luxe', 'muse'],
  makeup: ['muse', 'luxe', 'gilded'],
  lips: ['muse', 'dew', 'luxe'],
  hair: ['muse', 'atelier', 'dew'],
  tools: ['muse', 'atelier', 'dew'],
  body: ['sillage', 'dew', 'luxe'],
  'sun-spf': ['dew', 'muse', 'sillage'],
  wellness: ['dew', 'luxe', 'muse'],
  jewelry: ['atelier', 'gilded', 'luxe', 'muse'],
  handbags: ['atelier', 'gilded', 'sillage', 'luxe'],
  watches: ['atelier', 'gilded', 'luxe', 'sillage'],
  gold: ['gilded', 'atelier', 'luxe', 'muse'],
}

const CAT_VIBE_SESSION_PREFIX = 'adazo-cat-vibe:'

function vibePoolForCategory(cat: Category): string[] {
  const pool = CATEGORY_VIBE_POOL[cat]
  if (pool?.length) return pool.filter((id) => Boolean(getVibe(id)))
  const primary = CATEGORY_PRIMARY_VIBE[cat]
  if (primary && getVibe(primary)) return [primary]
  return VIBE_LIST.map((v) => v.id)
}

/**
 * Stable random pick for a category within the current browser session
 * (mid + end CTAs on the same shop page share one face).
 * Call again after session clear / new visit for a new graphic.
 */
export function pickVibeForCategory(
  cat: string | null | undefined,
): VibeProfile | undefined {
  if (!cat) return undefined
  const category = cat as Category
  const pool = vibePoolForCategory(category)
  if (!pool.length) return undefined

  const key = `${CAT_VIBE_SESSION_PREFIX}${category}`
  try {
    const existing = sessionStorage.getItem(key)
    if (existing && pool.includes(existing)) {
      const vibe = getVibe(existing)
      if (vibe) return vibe
    }
  } catch {
    /* ignore */
  }

  const id = pool[Math.floor(Math.random() * pool.length)]
  try {
    sessionStorage.setItem(key, id)
  } catch {
    /* ignore */
  }
  return getVibe(id)
}

/** @deprecated Prefer pickVibeForCategory for rotating CTAs */
export function vibeForCategory(
  cat: string | null | undefined,
): VibeProfile | undefined {
  if (!cat) return undefined
  const id = CATEGORY_PRIMARY_VIBE[cat as Category]
  return id ? getVibe(id) : pickVibeForCategory(cat)
}

/** Portrait or scene art for the category vibe CTA (randomized per session). */
export function pickVibeGraphic(vibe: VibeProfile): {
  src: string
  alt: string
  kind: 'avatar' | 'scene'
} {
  let useScene = false
  try {
    const key = `adazo-cat-vibe-graphic:${vibe.id}`
    const existing = sessionStorage.getItem(key)
    if (existing === 'scene' || existing === 'avatar') {
      useScene = existing === 'scene'
    } else {
      useScene = Math.random() < 0.45
      sessionStorage.setItem(key, useScene ? 'scene' : 'avatar')
    }
  } catch {
    useScene = Math.random() < 0.45
  }

  if (useScene && vibe.scene?.image) {
    return {
      src: vibe.scene.image,
      alt: vibe.scene.alt || vibe.title,
      kind: 'scene',
    }
  }
  return {
    src: vibe.avatar.image,
    alt: vibe.avatar.alt || vibe.avatar.name,
    kind: 'avatar',
  }
}
