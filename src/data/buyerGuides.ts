/**
 * Buyer-intent job guides — money keywords, catalog-backed.
 * Warm Riviera editorial. Concern-first. Not clinical. Not gift listicles (/gifts).
 */
import type { BuyerGuide } from './types'

const U = '2026-09-22'
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
        badge: 'Eye area only',
        pickWhy:
          'This is the only retinoid on the Adazo shelf, and it is an eye cream, not a face serum. Use it on the eye area the way the jar says. A first face retinol is a different product. Shop that one for the schedule below, and do not smear an eye cream over the whole face to make the list look complete.',
      },
    ],
    pairWith: [
      {
        productSlug: 'cerave-hydrating-facial-cleanser',
        pickWhy:
          'The cleanse before a retinoid night. A tight, foaming wash plus a new active is how the first week goes wrong.',
      },
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        pickWhy:
          'The buffer. Moisturizer before or after the retinoid, following the product you bought. This is the cream in that sandwich, not a retinol.',
      },
      {
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        pickWhy:
          'The morning after. A makeup-friendly SPF you will actually wear. Foundation SPF does not replace it.',
      },
    ],
    sections: [
      {
        heading: 'What “first-timer” actually means',
        body: 'Your barrier has not practiced this ingredient class yet. If the bottle prints a percent, start at the low end of what is sold for faces, commonly 0.1% to 0.3%, not a 1% serum labeled advanced.\n\nTwo nights a week for the first two weeks. A pea-sized amount for the whole face. If the skin is calm, move to every other night. Nightly is a later decision, not a Wednesday dare.',
      },
      {
        heading: 'The only retinoid we list',
        body: 'Adazo lists The INKEY List Retinol Eye Cream. It is an eye product. Most first-timers need a face serum, and we do not sell one. Buy the face serum somewhere you can read the percent and the return window. Keep the eye cream on the eye area.',
      },
      {
        heading: 'Buffer, don’t battle',
        body: 'Moisturizer before the retinoid, or after, following the jar you bought. The sandwich slows the sting. It does not cancel the product.\n\nFlaking that feels like a sunburn is a stop. Skip several nights. Do not “push through” with acids on the same night. Editorial pages cannot diagnose a rash. A clinician can.',
      },
      {
        heading: 'Daytime is half the routine',
        body: 'The morning after a retinoid night, wear a dedicated sunscreen. Makeup that claims SPF 15 is not that layer. Reapply when you are actually outside, not only at the bathroom mirror.',
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
    ],
    pairWith: [
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        pickWhy:
          'Not a sunscreen. If the morning cream is heavy, change that layer before you blame the SPF. Rich cream under silicone sunscreen is a common pill.',
      },
    ],
    sections: [
      {
        heading: 'Wait time is free',
        body: 'Let sunscreen sit 30 to 60 seconds before foundation. Pat, do not rub the base in like frosting. A light hand pills less than a second pump “to be safe.”\n\nPilling at the nose is often leftover product and friction. Less product and more patting fixes more mornings than a new primer.',
      },
      {
        heading: 'Match texture families',
        body: 'Heavy cream, then a silicone SPF, then a silicone foundation is the usual fight. If two layers ball up, change one of them and wear that trio for three mornings before you change the rest.\n\nWatery essences and primer-like SPFs are the textures built for makeup days. They still need the wait.',
      },
      {
        heading: 'Reapplication reality',
        body: 'A full second coat over finished makeup rarely happens. Powder SPF, a spray you will use, or an honest midday touch-up beats a lecture about lab amounts.\n\nFoundation that lists SPF 15 is a bonus, not the base layer. People do not apply foundation at sunscreen thickness.',
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
        productSlug: 'elf-holy-hydration-makeup-melting-cleansing-balm',
        rank: 2,
        badge: 'Makeup nights',
        pickWhy:
          'A balm for mascara and sunscreen nights. Melt first, then the cream cleanser if you want a second pass. Bare-skin mornings do not need both.',
      },
    ],
    pairWith: [
      {
        productSlug: 'la-roche-posay-toleriane-double-repair',
        pickWhy:
          'Not a cleanser. The cream after, when the wash leaves skin feeling open. A cleanser alone does not finish a sensitive routine.',
      },
      {
        productSlug: 'neutrogena-hydro-boost-water-gel',
        pickWhy:
          'A lighter gel for days the cream feels heavy. Patch-test if fragrance or gel textures have bothered you. Still not a cleanser.',
      },
    ],
    sections: [
      {
        heading: 'Clean is not squeaky',
        body: 'After you towel off, the face should feel comfortable, not drum-tight. Foam volume is not a score. If a gel leaves you shiny-tight, that cleanser is too much for this job, even if the bottle says gentle.\n\nLukewarm water. Hot water is not an exfoliant.',
      },
      {
        heading: 'Double cleanse without drama',
        body: 'Night with makeup or SPF: balm first, then a cream cleanser if residue remains. About a minute of massage, then rinse. Bare-skin mornings: a splash or the cream cleanser alone.\n\nYou do not need a third step to feel “done.”',
      },
      {
        heading: 'When to see someone',
        body: 'Burning, swelling, or a rash that stays is not a push-through week. Stop the new product. Editorial shelves are not clinics.',
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
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        rank: 4,
        pickWhy:
          'If this is the SPF that works under your makeup at home, take a travel size or a labeled decant. A new sunscreen on day one of a trip is how you learn about pilling in a hotel mirror.',
      },
      {
        productSlug: 'neutrogena-hydro-boost-water-gel',
        rank: 5,
        badge: 'Light moisture',
        pickWhy:
          'The moisturizer in a short stack. A gel is easier in a quart bag than a heavy jar, and humid trips rarely want a winter cream.',
      },
    ],
    pairWith: [
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        pickWhy:
          'Optional scent if a slot is left. It is not cleanse, moisture, SPF, or lip. Do not give it a seat the sunscreen needed.',
      },
    ],
    sections: [
      {
        heading: 'The quart-bag audit',
        body: 'In a U.S. carry-on, each liquid, gel, or cream container needs to be 3.4 ounces (100 ml) or smaller, and they share one quart-size bag. If you have not used a product three days in a row at home, it does not get a slot.\n\nThe stack that earns the bag: cleanse, moisturize, SPF, lip. One extra treat if it still fits.',
      },
      {
        heading: 'Decant with honesty',
        body: 'Write the name on the decant before you leave. A mystery jar at security, and again at a midnight sink, is how the routine dies.\n\nFull-size glass does not become travel-sized because you promise to be careful.',
      },
      {
        heading: 'Climate shift',
        body: 'Dry flights want the lip mask and a simpler face. Humid walking days want the lighter gel and the SPF you already trust. Pack for the forecast, not the winter vanity.',
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
    ],
    pairWith: [
      {
        productSlug: 'living-proof-dry-shampoo',
        pickWhy:
          'Not an oil. The root reset when shine traveled upward. Spray, wait, brush out, then decide if the ends still want a drop.',
      },
      {
        productSlug: 'olaplex-no3-hair-perfector',
        pickWhy:
          'Not a leave-in oil. A rinse-out treatment when lengths feel fried from heat or color. Follow the time on the bottle.',
      },
    ],
    sections: [
      {
        heading: 'Placement map',
        body: 'Skip the roots. One drop, rubbed between dry palms, then mids and ends. Fine hair often wants less than that. If the part looks wet at noon, you used too much. Wash, and use less next time.\n\nOil on the scalp “for growth” is not this job, and it is how roots go greasy.',
      },
      {
        heading: 'Wash rhythm',
        body: 'Oil does not replace a wash once product has stacked up. Dry shampoo can hold a day or two at the roots. It does not erase a week of layers. Pick a real wash day and keep it.',
      },
      {
        heading: 'Scent is a feature',
        body: 'If fragrance bothers you, try a little on a wrist before you commit to a bottle. A beautiful oil that gives you a headache is clutter.',
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
    ],
    pairWith: [
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        pickWhy:
          'Not a lotion. A scent layer after the cream has gone in. It will not stop ash on black pants.',
      },
      {
        productSlug: 'laneige-lip-sleeping-mask',
        pickWhy:
          'Not body lotion. Winter lips crack on the same weeks legs do. Keep a thin layer by the bed.',
      },
    ],
    sections: [
      {
        heading: 'Damp skin window',
        body: 'Within about three minutes of the shower: towel-blot, do not bone-dry, then lotion. Waiting until the skin is fully dry is how cream sits on top and feels greasy under jeans.\n\nA short, lukewarm shower does more for winter legs than a thicker cream after a scalding one.',
      },
      {
        heading: 'Fragrance tolerance',
        body: 'Scented lotion is a pleasure until it is not. If you react easily, patch a small area of the leg for a day before you cover both. A rash is a stop, not a reason to buy a second scent.',
      },
      {
        heading: 'Consistency over cult jars',
        body: 'The lotion that works is the one you will use after showers you already take. An empty approachable bottle beats a prestige tub you open twice. Face cream is a different purchase. It is a poor value spread on legs.',
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
    ],
    sections: [
      {
        heading: 'Day vs night',
        body: 'Night: a thin layer of the sleeping mask, not a frosting swirl. That heavy coat is what glues hair to your mouth and what people mean by sticky.\n\nDay: a whisper at most under color, or skip the mask and use lipstick on lips that were treated overnight. A thick mask under coffee all morning is how the texture gets a bad name.',
      },
      {
        heading: 'Exfoliation soft-touch',
        body: 'A damp washcloth is enough. Do not peel flakes with your teeth, and do not stack minty plumping glosses that sting. If lips crack and bleed, stop the new products. Lasting splits are a clinician’s question, not another gloss.',
      },
      {
        heading: 'Color on prepared lips',
        body: 'Lipstick on flakes shows the flakes. Treatment at night, pigment the next day. Pillow Talk is a day color, not an overnight mask. It belongs in this guide because the title includes color, and it does not belong in the night jar.',
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
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 2,
        badge: 'Ends, not scalp',
        pickWhy:
          'The contrast case. Oil belongs on mids and ends when roots already feel coated. Putting it on an itchy scalp “to moisturize” usually feeds buildup. This pick is here so you do not use it as a scalp treatment.',
      },
    ],
    pairWith: [
      {
        productSlug: 'olaplex-no3-hair-perfector',
        pickWhy:
          'A lengths treatment, not a scalp diagnosis. Useful when hair feels brittle from heat or color. It does not tell you whether the itch is dryness or buildup.',
      },
    ],
    sections: [
      {
        heading: 'Two different problems',
        body: 'Dry ends want a little moisture lower down. Congested roots want a real wash. Itch plus a chalky feel at the scalp after several dry-shampoo days is the buildup story. Tight, flaky skin that is worse right after you clarify can be dryness. They are not the same bottle.\n\nOil on the scalp is the wrong first move for either story.',
      },
      {
        heading: 'Wash as data',
        body: 'Wash gently, once, and see what changes over the next day. If the itch calms, buildup was a fair suspect. Ease off dry shampoo and keep oil off the roots.\n\nIf thick flakes, pain, or itch stay after that wash, stop shopping and see a clinician. This page cannot tell dandruff from psoriasis or an irritation.',
      },
      {
        heading: 'Dry shampoo is a tool',
        body: 'Spray, wait, brush it out. Two bridge days, then a wash. A week of layers cemented at the root is how “dry scalp” gets mislabeled. Daily max-heat blowouts can make the scalp feel angry too. Lower the heat before you add another scented product.',
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
        badge: 'Essence, not a cream',
        pickWhy:
          'An essence is a step before cream, not a moisturizer you can swap in. Worth it only if you will do that step. An abandoned bottle is an expensive dust collector.',
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
        badge: 'The comparison',
        pickWhy:
          'Not a prestige cream. The control. If this repair cream already makes the face comfortable, a $300 jar is optional pleasure, not an upgrade you owe your skin.',
      },
    ],
    sections: [
      {
        heading: 'What you are really buying',
        body: 'Texture, scent or the lack of it, and a ritual you will repeat. A cream does not replace sleep, sunscreen, or a cleanser. If the claim on the jar sounds like a prescription, put it back.\n\nUse a new prestige cream four nights a week for a month before you decide it “does nothing.” Two uses is not a trial.',
      },
      {
        heading: 'When to stay accessible',
        body: 'If the price makes you dread the pump, buy the repair cream and spend the difference elsewhere. A routine you resent will lose to a cheaper cream you finish.\n\nEssence is a separate decision. Buy it only when the cream step is already a habit.',
      },
      {
        heading: 'Patch and pace',
        body: 'Price is not a hypoallergenic promise. If you react easily, try a small area for a day before the whole face. Travel sizes are the honest way to test a jar you might abandon.',
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
    ],
    pairWith: [
      {
        productSlug: 'olaplex-no3-hair-perfector',
        pickWhy:
          'Not a dryer. A treatment on non-heat nights if color or daily styling has left lengths feeling straw-like. It does not pick the tool for you.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        pickWhy:
          'A drop on the ends after the style is done. Keep it out of the root volume you just built.',
      },
      {
        productSlug: 'living-proof-dry-shampoo',
        pickWhy:
          'Day-two volume. Use this before you reheat the whole head.',
      },
    ],
    sections: [
      {
        heading: 'Name the Tuesday goal',
        body: 'Smooth blowout only: the one-step brush is the tool. Curls, waves, or more than one shape in the same week: that is when a multi-styler starts to justify the price and the counter space.\n\nIf you want the Dyson because it is the expensive one, and your real routine is a ten-minute blowout, buy the Revlon.',
      },
      {
        heading: 'Learning curve is real',
        body: 'Give an Airwrap-class tool a quiet evening of sections and tension before an event morning. The one-step brush is shorter to learn and less flexible once you have learned it.\n\nConfirm the kit on the listing. Barrels and brushes are not the same box.',
      },
      {
        heading: 'Arms, outlets, and heat',
        body: 'Weight and cord matter more than the ad. A lighter tool you lift wins over a flagship you dread.\n\nUse a heat protectant either way. Max heat every day, with no protectant, is the hard no. Neither machine replaces that habit.',
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
    [...g.productEntries, ...(g.pairWith ?? [])].some(
      (e) => e.productSlug === productSlug,
    ),
  )
}
