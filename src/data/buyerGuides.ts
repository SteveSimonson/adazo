/**
 * Buyer-intent job guides — money keywords, catalog-backed.
 * Warm Riviera editorial. Concern-first. Not clinical. Not gift listicles (/gifts).
 */
import type { BuyerGuide } from './types'

const U = '2026-08-06'
const P = '2026-08-06'

const AMAZON = {
  q: 'Why does checkout go to Amazon?',
  a: 'Adazo curates and explains fit. Amazon handles live price, Prime eligibility, shipping, and returns for that listing. Confirm ingredients and directions on Amazon before you buy.',
}

const NOT_MEDICAL = {
  q: 'Is this medical advice?',
  a: 'No. Adazo is editorial shopping guidance. For rashes, diagnosed conditions, pregnancy questions, or prescriptions, talk to a clinician or dermatologist who knows you.',
}

export const buyerGuides: BuyerGuide[] = [
  {
    slug: 'retinol-first-timers',
    title: 'Retinol for First-Timers Without the Panic',
    dek: 'Start gentle, buffer with barrier care, and treat “more” as a rumor — not a routine.',
    primaryQuery: 'retinol for beginners sensitive skin',
    category: 'skincare',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 7,
    heroImage:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80',
    intro:
      'First retinol weeks fail when you treat the bottle like a personality. Skin peels, you quit, you swear off the whole ingredient class. The job is slower: cleanse kindly, introduce a mild retinoid-style product, and keep moisturizer non-negotiable. This is shopping guidance — not a prescription.',
    hardNo:
      'Hard no: stacking three acids with a strong retinoid on night one, using eye product as a full-face free-for-all without reading the label, and skipping SPF the next morning.',
    productEntries: [
      {
        productSlug: 'the-inkey-list-retinol-eye-cream',
        rank: 1,
        badge: 'Gentle entry',
        pickWhy:
          'A retinol-style eye cream is a smaller canvas than a face serum when you are nervous. Follow the jar’s directions; eyes are not a place to freestyle. If irritation shows up, pause and simplify.',
      },
      {
        productSlug: 'the-ordinary-niacinamide-10-zinc-1',
        rank: 2,
        badge: 'Texture support',
        pickWhy:
          'Many first-timers want texture help without jumping straight into strong retinoids. Niacinamide sits in a different lane — confirm how you layer with any retinoid on the labels you own.',
      },
      {
        productSlug: 'cerave-hydrating-facial-cleanser',
        rank: 3,
        pickWhy:
          'Harsh cleanser plus new actives is how barriers throw a fit. A hydrating cleanse keeps the routine boring in the best way.',
      },
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        rank: 4,
        pickWhy:
          'Moisturizer is not optional during retinoid weeks. A repair-leaning cream is the buffer between “trying something new” and “why is my face shiny and tight.”',
      },
      {
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        rank: 5,
        pickWhy:
          'Daytime SPF is part of the retinol story. A makeup-friendly texture means you will actually wear it.',
      },
    ],
    sections: [
      {
        heading: 'What “first-timer” actually means',
        body: 'It means your barrier has not practiced this ingredient class yet. Frequency beats intensity. If the label says every other night, that is not a dare to go nightly by Wednesday.',
      },
      {
        heading: 'Buffer, don’t battle',
        body: 'Moisturizer before or after (sandwich methods vary by product — follow the one you bought). Peeling that feels like a sunburn is a stop sign, not a badge. Editorial sites cannot diagnose; a clinician can.',
      },
      {
        heading: 'Daytime is half the routine',
        body: 'Retinoid nights without SPF days is how progress undoes itself. Keep sunscreen as automatic as toothpaste.',
      },
    ],
    faq: [
      AMAZON,
      NOT_MEDICAL,
      {
        q: 'How long until I “see results”?',
        a: 'Texture and tone stories take weeks to months, not weekend makeovers. Consistency and gentle use beat heroic dosing.',
      },
      {
        q: 'Can I use acids the same night?',
        a: 'Many people separate strong exfoliants from retinoid nights. When unsure, simplify — fewer bottles, calmer skin.',
      },
    ],
  },
  {
    slug: 'spf-under-makeup',
    title: 'SPF Under Makeup That Doesn’t Pill',
    dek: 'Texture match, wait time, and the primers that fight your foundation.',
    primaryQuery: 'sunscreen under makeup no pilling',
    category: 'sun-spf',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80',
    intro:
      'SPF under makeup fails as a chemistry fight: silicone vs water, impatient layering, too much product. The job is a sunscreen you will reapply logic for, that plays with your base, and that does not ball up at the jaw by 10 a.m.',
    hardNo:
      'Hard no: rubbing foundation into wet sunscreen like frosting, and skipping SPF entirely because “your foundation has SPF 15.”',
    productEntries: [
      {
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        rank: 1,
        badge: 'Makeup primer lane',
        pickWhy:
          'Unseen-style textures are built for under makeup days. Still: wait a minute, use a light hand, and confirm the current formula on the listing.',
      },
      {
        productSlug: 'biore-uv-aqua-rich-watery-essence',
        rank: 2,
        badge: 'Sheer essence feel',
        pickWhy:
          'Watery essence SPF suits people who hate greasy films. Check finish with your foundation brand — some pairings love it, some pill. Return policies are part of the product.',
      },
      {
        productSlug: 'rare-beauty-soft-pinch-liquid-blush',
        rank: 3,
        pickWhy:
          'Once base sits, cream-to-liquid blush rewards a set canvas. Not SPF — the reward for getting sunscreen right.',
      },
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        rank: 4,
        pickWhy:
          'If morning moisturizer is too rich under SPF, swap weight before blaming the sunscreen. Layer order matters.',
      },
    ],
    sections: [
      {
        heading: 'Wait time is free',
        body: 'Thirty to sixty seconds between SPF and base saves more makeup than another primer. Pilling is often impatience wearing a white cast of product.',
      },
      {
        heading: 'Match texture families',
        body: 'Heavy cream + silicone SPF + silicone foundation can stack into pills. If two layers fight, change one — not all three at once.',
      },
      {
        heading: 'Reapplication reality',
        body: 'Full-face reapply over full glam is hard. Powder SPF, spray habits, or honest midday touch-ups matter more than lab talk. Editorial preference: morning SPF you actually wear.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Does foundation SPF replace sunscreen?',
        a: 'Usually not for the amount people apply. Treat dedicated SPF as the base layer; foundation SPF as a bonus.',
      },
      {
        q: 'Why does it pill only around my nose?',
        a: 'Often product buildup, dry texture, or rubbing. Less product, more patting, occasional exfoliation schedule — not a full routine overhaul overnight.',
      },
      {
        q: 'Mineral or chemical?',
        a: 'Preference and formula quality matter more than tribe wars. Choose the texture you will use daily.',
      },
    ],
  },
  {
    slug: 'sensitive-skin-cleanser',
    title: 'Sensitive Skin Cleanser That Still Cleans',
    dek: 'Strip vs soothe — when “squeaky” is a warning, and balms vs cream cleansers.',
    primaryQuery: 'best cleanser for sensitive skin',
    category: 'skincare',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Sensitive cleansers fail when “clean” means tight. The job is makeup and SPF off without leaving your face begging for a truce. Fragrance-forward foams can be lovely for someone else and a headache for you.',
    hardNo:
      'Hard no: scrubbing twice daily with a harsh gel “to get used to it,” and using hot water as an exfoliant.',
    productEntries: [
      {
        productSlug: 'cerave-hydrating-facial-cleanser',
        rank: 1,
        badge: 'Daily default',
        pickWhy:
          'Creamy cleanse that does not try to win a squeak contest. Good first swap if drugstore foams leave you shiny-tight.',
      },
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        rank: 2,
        pickWhy:
          'Not a cleanser — the partner cream after. Sensitive routines are systems; cleanser alone does not finish the job.',
      },
      {
        productSlug: 'elf-holy-hydration-makeup-melting-cleansing-balm',
        rank: 3,
        badge: 'Makeup nights',
        pickWhy:
          'Balm first on mascara-and-SPF evenings, then a gentle second cleanse if you like double cleanse. Less rubbing, more melt.',
      },
      {
        productSlug: 'neutrogena-hydro-boost-water-gel',
        rank: 4,
        pickWhy:
          'Light gel moisturizer for days cream feels heavy. Patch-test if fragrance or gel textures have bothered you before.',
      },
    ],
    sections: [
      {
        heading: 'Clean is not squeaky',
        body: 'If your face feels drum-tight, the cleanser won and your barrier lost. Look for comfort after towel-dry, not foam volume.',
      },
      {
        heading: 'Double cleanse without drama',
        body: 'Oil or balm for sunscreen and makeup; gentle cream cleanse after if needed. Skipping the second step is fine on bare-skin days.',
      },
      {
        heading: 'When to see someone',
        body: 'Burning, swelling, or lasting rash is not a “push through” moment. Editorial shelves are not clinics.',
      },
    ],
    faq: [
      AMAZON,
      NOT_MEDICAL,
      {
        q: 'Morning cleanse required?',
        a: 'Many people rinse or use a light cleanse in the morning and save the fuller cleanse for night. Listen to your skin, not a rigid rule.',
      },
      {
        q: 'Is micellar enough alone?',
        a: 'Sometimes for light days. Heavy SPF and long-wear makeup often want a proper cleanse or balm step.',
      },
    ],
  },
  {
    slug: 'travel-skincare-311',
    title: 'Travel Skincare Under 3-1-1',
    dek: 'Decant rules, multi-taskers, and the bottles that never earn a quart bag slot.',
    primaryQuery: 'travel skincare liquids bag',
    category: 'skincare',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Travel routines fail as suitcase maximalism. The job is a short stack that survives TSA, hotel hard water, and three-day skin mood swings — not a full vanity in miniature.',
    hardNo:
      'Hard no: seven serums “just in case,” and full-size glass jars that punish your carry-on weight.',
    productEntries: [
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 1,
        badge: 'Tiny hero',
        pickWhy:
          'Lip mask that moonlights as emergency cuticle help on dry flights. Small jar, high utility.',
      },
      {
        productSlug: 'biore-uv-aqua-rich-watery-essence',
        rank: 2,
        pickWhy:
          'SPF essence textures often travel kinder than heavy creams. Confirm size against 3-1-1; decant if needed.',
      },
      {
        productSlug: 'elf-holy-hydration-makeup-melting-cleansing-balm',
        rank: 3,
        pickWhy:
          'Balm cleansers handle airplane makeup and hotel water without a second suitcase of foams.',
      },
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        rank: 4,
        pickWhy:
          'Body mist for “I feel human again” moments. Not skincare medicine — mood and scent finish.',
      },
      {
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        rank: 5,
        pickWhy:
          'If Unseen is your home SPF, travel with a decant or travel size rather than skipping sunny walking days.',
      },
    ],
    sections: [
      {
        heading: 'The quart-bag audit',
        body: 'If it does not earn use three days in a row at home, it does not earn the bag. Multi-task or leave it.',
      },
      {
        heading: 'Decant with honesty',
        body: 'Label decants. Mystery jars at security and at midnight hotel sinks are how routines die.',
      },
      {
        heading: 'Climate shift',
        body: 'Dry flights want richer lips and simpler faces. Humid destinations may want lighter gel. Pack for the forecast, not your winter vanity.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Solid bars instead of liquids?',
        a: 'Great when they actually clean for you. Test at home first so travel is not the experiment.',
      },
      {
        q: 'How many products is “enough”?',
        a: 'Cleanse, moisturize, SPF, lip — then one treat. Everything else is optional theater.',
      },
      {
        q: 'Can I buy on arrival?',
        a: 'Yes for basics. Not ideal for a sunscreen texture you already know plays with your makeup.',
      },
    ],
  },
  {
    slug: 'hair-oil-no-grease',
    title: 'Hair Oil Without Greasy Roots',
    dek: 'Where to put it, how much is “two drops,” and dry shampoo as the peace treaty.',
    primaryQuery: 'hair oil without greasy roots',
    category: 'hair',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Hair oil fails when you treat ends and scalp as the same surface. The job is slip and shine on lengths, not a midday pizza-root look. Technique is half the bottle.',
    hardNo:
      'Hard no: dumping oil at the roots “for growth myths,” and stacking oil + heavy cream + skipping wash day forever.',
    productEntries: [
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 1,
        badge: 'Mid-lengths & ends',
        pickWhy:
          'Scent and slip many people love — still apply mid-length down, warm between palms, and start with less than you think.',
      },
      {
        productSlug: 'olaplex-no3-hair-perfector',
        rank: 2,
        badge: 'Treatment night',
        pickWhy:
          'Not a leave-in oil — a treatment step when hair feels fried from heat or color. Follow time-on-hair directions; more minutes is not always more magic.',
      },
      {
        productSlug: 'living-proof-dry-shampoo',
        rank: 3,
        pickWhy:
          'Root reset between washes when oil migrated or humidity won. Apply before oil on day-two hair if roots need help first.',
      },
      {
        productSlug: 'dyson-airwrap-multi-styler',
        rank: 4,
        pickWhy:
          'Heat tools change how oil behaves. If you style often, oil placement after heat can look cleaner than oil under maximum heat — test your order.',
      },
    ],
    sections: [
      {
        heading: 'Placement map',
        body: 'Roots: usually skip. Mids: light. Ends: where dryness lives. Fine hair needs almost insultingly small amounts.',
      },
      {
        heading: 'Wash rhythm',
        body: 'Oil is not a substitute for cleansing when product builds up. Dry shampoo bridges days; it does not erase a week of layering.',
      },
      {
        heading: 'Scent is a feature',
        body: 'If fragrance bothers you, patch a wrist first. Beautiful oils that give you a headache are not luxury — they are clutter.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Oil on wet or dry hair?',
        a: 'Both exist. Wet for distribution help; dry for shine touch-ups. Pick one method for a week so you can judge.',
      },
      {
        q: 'Will oil fix damage?',
        a: 'It can improve feel and look. Severely compromised hair may need trims and less heat — shopping is not a salon diagnosis.',
      },
      {
        q: 'Can I sleep in oil?',
        a: 'Some people do on ends with a protector. Pillows and roots may disagree. Start conservative.',
      },
    ],
  },
  {
    slug: 'winter-body-lotion',
    title: 'Body Lotion for Winter Legs That You’ll Reapply',
    dek: 'Texture you’ll use after showers, mist vs cream, and when “rich” is just greasy.',
    primaryQuery: 'best body lotion for dry winter skin',
    category: 'body',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 5,
    heroImage:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Winter body care fails as a bottle that lives unopened because it feels sticky under jeans. The job is something you apply on damp skin in under a minute and forget — except that your legs stop ash-flaking on black pants.',
    hardNo:
      'Hard no: scalding showers that strip you, then wondering why lotion cannot keep up.',
    productEntries: [
      {
        productSlug: 'eos-shea-better-body-lotion',
        rank: 1,
        badge: 'Daily legs',
        pickWhy:
          'Approachable shea lotion people actually finish. Apply on damp skin; a little goes further than dry-skin panic layering.',
      },
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        rank: 2,
        badge: 'Scent finish',
        pickWhy:
          'Mist is not a moisturizer replacement — it is the “I still feel put together” layer after lotion. Fun, not clinical.',
      },
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 3,
        pickWhy:
          'Winter is a full-body dryness season. Lips crack while you obsess over legs — keep a jar by the bed.',
      },
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 4,
        pickWhy:
          'Face cream is not body lotion economically — but if winter face is suffering too, prestige dew cream is the face half of the same climate problem.',
      },
    ],
    sections: [
      {
        heading: 'Damp skin window',
        body: 'Towel-blot, do not bone-dry, then lotion. Waiting until you are fully dry is how product sits on top and feels greasy.',
      },
      {
        heading: 'Fragrance tolerance',
        body: 'Scented body products are a joy until they are not. If you react easily, choose simpler formulas and patch test.',
      },
      {
        heading: 'Consistency over cult jars',
        body: 'An empty drugstore bottle beats a luxury tub you use twice. Buy what matches your shower habit.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Oil or lotion?',
        a: 'Oils seal; lotions add water-phase comfort for many people. Some layer oil over lotion on the driest spots.',
      },
      {
        q: 'How often should I reapply?',
        a: 'After showers and when fabric starts showing ash. Midday office reapply is normal in harsh heat.',
      },
      {
        q: 'Is itching always dryness?',
        a: 'Not always. Persistent itch, rash, or pain needs a clinician — not another scented mist.',
      },
    ],
  },
  {
    slug: 'lip-treatment-not-sticky',
    title: 'Lip Treatment That Isn’t Sticky Theater',
    dek: 'Mask vs balm vs color — overnight repair vibes without candy-gloss glue.',
    primaryQuery: 'best lip sleeping mask not sticky',
    category: 'lips',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 5,
    heroImage:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Lip products fail when sticky equals “working.” The job is comfort you forget, color when you want it, and a night treatment that does not glue your hair to your mouth.',
    hardNo:
      'Hard no: peeling flakes with your teeth, and stacking five minty plumping glosses that sting as a personality.',
    productEntries: [
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 1,
        badge: 'Overnight',
        pickWhy:
          'The classic jar for a reason — softens the “I live in heated air” look. A thin layer beats a frosting swirl.',
      },
      {
        productSlug: 'charlotte-tilbury-pillow-talk-lipstick',
        rank: 2,
        badge: 'Day color',
        pickWhy:
          'When treatment has done its job, a flattering nude-rose lipstick is the Riviera exit. Prep with a wipe of balm if lips still feel rough.',
      },
      {
        productSlug: 'rare-beauty-soft-pinch-liquid-blush',
        rank: 3,
        pickWhy:
          'Color story beyond lips — cheeks that match the soft mood so lipstick does not look isolated.',
      },
      {
        productSlug: 'ysl-libre-eau-de-parfum',
        rank: 4,
        pickWhy:
          'Not a lip product — the finishing spray when the face is done and you want the whole edit to feel intentional.',
      },
    ],
    sections: [
      {
        heading: 'Day vs night',
        body: 'Day: thin balm or hybrid. Night: mask texture. Using night jar under coffee cups all day is how sticky gets a bad reputation.',
      },
      {
        heading: 'Exfoliation soft-touch',
        body: 'A damp cloth wipe beats aggressive scrubs. If lips crack and bleed, simplify and consider a clinician for persistent issues.',
      },
      {
        heading: 'Color on prepared lips',
        body: 'Lipstick on flakes emphasizes flakes. Treatment first, pigment second.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Can I use the sleeping mask under lipstick?',
        a: 'A whisper, sometimes. A heavy layer, usually no — color slides and gathers.',
      },
      {
        q: 'Why do mint balms burn?',
        a: 'Sensates can irritate. If it stings beyond a second, it may not be your formula.',
      },
      {
        q: 'Jar hygiene?',
        a: 'Clean finger or a small spatula. Shared jars are how colds travel in friend groups.',
      },
    ],
  },
  {
    slug: 'dry-scalp-vs-buildup',
    title: 'Dry Scalp vs Product Buildup',
    dek: 'Itchy does not always mean “buy anti-dandruff first” — wash rhythm, oil placement, dry shampoo honesty.',
    primaryQuery: 'dry scalp vs product buildup',
    category: 'hair',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Scalp comfort fails when every itch gets the same bottle. Sometimes hair is dry at the ends and congested at the roots from dry shampoo and oil. This guide is about shopping and habits — not diagnosing dandruff, psoriasis, or infection.',
    hardNo:
      'Hard no: medical claims from a product aisle, and oiling an itchy scalp daily “to moisturize” without ever clarifying.',
    productEntries: [
      {
        productSlug: 'living-proof-dry-shampoo',
        rank: 1,
        badge: 'Bridge days',
        pickWhy:
          'Useful between washes — overuse is a common buildup story. Spray, wait, brush out; do not cement layers for a week.',
      },
      {
        productSlug: 'olaplex-no3-hair-perfector',
        rank: 2,
        pickWhy:
          'When lengths feel brittle from heat and color, treatment helps the hair fiber story. Scalp conditions still need appropriate care or a pro.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 3,
        pickWhy:
          'Keep oil on mids and ends if roots already feel coated. Shine lower down, clarity up top.',
      },
      {
        productSlug: 'revlon-one-step-volumizer-plus',
        rank: 4,
        pickWhy:
          'Heat + tension changes how scalp feels. Lower heat and less daily blowouts can matter as much as a new bottle.',
      },
    ],
    sections: [
      {
        heading: 'Two different problems',
        body: 'Dry ends want moisture. Congested roots want cleansing. Treating both with oil often worsens the root half.',
      },
      {
        heading: 'Wash as data',
        body: 'If itch calms after a thorough wash and gentle dry, buildup was a suspect. If flakes and itch persist aggressively, see a professional — do not endless-aisle experiment.',
      },
      {
        heading: 'Dry shampoo is a tool',
        body: 'It is not a personality. Schedule real wash days.',
      },
    ],
    faq: [
      AMAZON,
      NOT_MEDICAL,
      {
        q: 'Should I scrub my scalp daily?',
        a: 'Gentle massage during wash helps some people. Aggressive scrubbing can irritate. Soft hands, not sandpaper.',
      },
      {
        q: 'Is this dandruff?',
        a: 'We cannot diagnose from a product page. Persistent flaking deserves a clinician or dermatologist, not only more fragrance.',
      },
    ],
  },
  {
    slug: 'prestige-moisturizer-when',
    title: 'When a Prestige Moisturizer Is Worth It',
    dek: 'Dew cream vs essence rituals — pay for texture joy, not miraculous claims.',
    primaryQuery: 'is expensive moisturizer worth it',
    category: 'luxury',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 7,
    heroImage:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Prestige moisturizers fail as status objects you resent after two uses. They succeed as textures you look forward to, in a routine that already has cleanser and SPF. Pay for joy and finish — not for internet myths.',
    hardNo:
      'Hard no: expecting a cream alone to replace sleep, SPF, and basic cleansing, and buying La Mer to fix a prescription problem.',
    productEntries: [
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 1,
        badge: 'Dew finish',
        pickWhy:
          'When you want a luminous cream experience and richer slip. Confirm current size and scent comfort on the listing.',
      },
      {
        productSlug: 'drunk-elephant-protini-polypeptide-cream',
        rank: 2,
        badge: 'Modern cream lane',
        pickWhy:
          'A prestige texture many build routines around. Still a moisturizer — not a personality transplant.',
      },
      {
        productSlug: 'sk-ii-facial-treatment-essence',
        rank: 3,
        badge: 'Essence ritual',
        pickWhy:
          'Different format: essence before cream. Only worth it if you will enjoy the ritual; abandoned essences are expensive dust collectors.',
      },
      {
        productSlug: 'la-mer-creme-de-la-mer',
        rank: 4,
        badge: 'Icon jar',
        pickWhy:
          'Buy for the experience you actually want — not for peer pressure. A little product, warm between fingers, is the house method many prefer. Price is the feature and the risk.',
      },
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        rank: 5,
        pickWhy:
          'The control group. If a drugstore repair cream already makes you happy, prestige is optional joy — not a moral upgrade.',
      },
    ],
    sections: [
      {
        heading: 'What you are really buying',
        body: 'Texture, scent (or lack), packaging ritual, brand story. Active “results” still depend on the whole routine and time.',
      },
      {
        heading: 'When to stay accessible',
        body: 'If budget stress cancels the pleasure, a solid mid-range cream wins. Glowing skin under financial dread is a bad trade.',
      },
      {
        heading: 'Patch and pace',
        body: 'New prestige jars still deserve a patch if you react easily. Luxury is not hypoallergenic by price.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Cream or essence first?',
        a: 'Typical order is thinner to thicker. Follow the products you own rather than a forum fight.',
      },
      {
        q: 'Can I mix prestige with drugstore?',
        a: 'Yes. Many good routines are mixed. Compatibility is about your skin, not brand loyalty.',
      },
      {
        q: 'Travel size first?',
        a: 'Smart when possible. Full jars of regret are the real luxury tax.',
      },
    ],
  },
  {
    slug: 'airwrap-vs-one-step',
    title: 'Airwrap vs One-Step Dryer — Which Heat Tool',
    dek: 'Budget, learning curve, and the hair goals that do not need a full multi-styler.',
    primaryQuery: 'dyson airwrap vs revlon one step',
    category: 'tools',
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    heroImage:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Hot tools fail as identity purchases. The job is faster dry, less arm pain, and a shape you will recreate on a Tuesday — not a box that intimidates you from the closet.',
    hardNo:
      'Hard no: max heat every day with zero protection product, and buying the most expensive tool to avoid learning basic technique.',
    productEntries: [
      {
        productSlug: 'dyson-airwrap-multi-styler',
        rank: 1,
        badge: 'Multi-styler',
        pickWhy:
          'When you want curl/wave barrels plus dry in one system and will use the attachments. Confirm kit contents on the ASIN — bundles differ hard.',
      },
      {
        productSlug: 'revlon-one-step-volumizer-plus',
        rank: 2,
        badge: 'Blowout brush',
        pickWhy:
          'When the job is mainly volume blowouts without multi-styler tuition. Learning curve is shorter for many people.',
      },
      {
        productSlug: 'olaplex-no3-hair-perfector',
        rank: 3,
        pickWhy:
          'Heat tools pair with treatment weeks. Healthier-feeling fiber styles cleaner — still not a license for unlimited heat.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 4,
        pickWhy:
          'A drop on ends after styling can calm frizz flyaways. Keep it out of the root volume you just built.',
      },
      {
        productSlug: 'living-proof-dry-shampoo',
        rank: 5,
        pickWhy:
          'Day-two volume after a good blowout often needs dry shampoo more than another heat pass.',
      },
    ],
    sections: [
      {
        heading: 'Name the Tuesday goal',
        body: 'Smooth blowout only? One-step class tools often win. Curls, waves, multi-look flexibility? Multi-styler starts to justify space and cost.',
      },
      {
        heading: 'Learning curve is real',
        body: 'Airwrap-class tools reward practice sections and tension. Budget an evening to learn, not a rushed event morning.',
      },
      {
        heading: 'Arms and outlets',
        body: 'Weight, cord, and bathroom outlet reality matter. A lighter tool you use beats a flagship you dread lifting.',
      },
    ],
    faq: [
      AMAZON,
      {
        q: 'Will either replace a salon blowout?',
        a: 'They can approximate at home with practice. Salons still win for some hair types and events.',
      },
      {
        q: 'Do I need heat protectant?',
        a: 'Yes as a habit with hot tools. Product choice varies — skip marketing extremes, do not skip the category entirely.',
      },
      {
        q: 'Fine vs thick hair?',
        a: 'Fine hair often needs less heat and less product. Thick hair may need patience and sectioning more than a pricier motor alone.',
      },
    ],
  },
]

export function getBuyerGuide(slug: string): BuyerGuide | undefined {
  return buyerGuides.find((g) => g.slug === slug)
}

export function buyerGuidesForProduct(productSlug: string): BuyerGuide[] {
  return buyerGuides.filter((g) =>
    g.productEntries.some((e) => e.productSlug === productSlug),
  )
}
