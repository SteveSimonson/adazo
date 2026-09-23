/**
 * Adazo gift guides — avatar-locked beauty listicles.
 * Catalog-backed only. Original prose. Warm Riviera voice; never clinical cure claims.
 */
import type { GiftGuide, GiftOccasionId, GiftRecipientId } from './types'

const U = '2026-08-02'
const P = '2026-08-02'

const AMAZON_FAQ = {
  q: 'Will it arrive in time, and can she return it?',
  a: 'Shipping speed and Prime eligibility depend on the live Amazon listing and seller. Returns follow Amazon’s policies for that order. Adazo shows typical street prices; always confirm delivery dates and return windows on Amazon before you buy.',
}

export const giftGuides: GiftGuide[] = [
  {
    slug: 'christmas-beauty-gifts',
    title: 'Christmas Beauty Gifts',
    dek: 'One default if you know nothing, then the step-ups by budget. No shade guesses. No seven-piece kits.',
    primaryQuery: 'christmas beauty gifts',
    recipientIds: ['her', 'mom', 'wife', 'friend'],
    occasionIds: ['christmas'],
    budgetBands: ['under-50', '50-150', 'splurge'],
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    readMinutes: 8,
    seasonal: { peakMonths: [9, 10, 11, 12], yearHint: 2026 },
    intro:
      'Christmas beauty fails as a pile of minis and a perfume you have never smelled on her. It works as one object she will finish. This page is the order of operations for Adazo’s shelf: a default under $30, a hair or color step-up still under $50, a jar or a perfume when you want it to feel considered, and a splurge only when you already know she will use it.',
    decision: {
      title: 'If you buy one',
      body: 'Laneige Lip Sleeping Mask, about $24, when you do not want color. Summer Fridays Lip Butter Balm in Pink Sugar, about $24, when she wants a thinner day balm and a sheer pink is welcome. Gisou, about $36, when hair is the hobby and she likes a honey scent. Olaplex No.7, about $30, when she wants a few drops and less perfume. Tatcha, about $72, when the gift should feel like a jar she keeps. One perfume only if you already know her scent. The Dyson, about $599, only if you have watched her dry her hair.',
    },
    productEntries: [
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 1,
        priceBand: 'under-50',
        badge: 'If you buy one',
        giftWhy:
          'The default when you do not want color. A thin layer at night, a jar that looks finished under a tree. About $24. If she hates a thick night mask, the Summer Fridays balm is the other lip on this page.',
      },
      {
        productSlug: 'summer-fridays-lip-butter-balm',
        rank: 2,
        priceBand: 'under-50',
        badge: 'Day balm, sheer pink',
        giftWhy:
          'About $24. Pink Sugar is a sheer pink, not a clear balm. Buy it when a thinner day balm is the gift and a little pink is fine. If any color is a risk, stay with Laneige.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 3,
        priceBand: 'under-50',
        badge: 'If she likes scent',
        giftWhy:
          'About $36. One drop on the mids and ends. The honey scent is the point. If she wants less perfume in her hair, Olaplex No.7 is the other oil.',
      },
      {
        productSlug: 'olaplex-no7-bonding-oil',
        rank: 4,
        priceBand: 'under-50',
        badge: 'If she wants less scent',
        giftWhy:
          'About $30. Two or three drops, mids and ends. Buy this instead of Gisou when scent and weight are the worry. Do not buy both oils.',
      },
      {
        productSlug: 'charlotte-tilbury-pillow-talk-lipstick',
        rank: 5,
        priceBand: 'under-50',
        badge: 'Only if she wears lipstick',
        giftWhy:
          'About $35, and only when you have seen Pillow Talk, or a nude-rose close to it, on her mouth. A lipstick in the wrong family sits in a drawer. If you are guessing, go back to the lip mask.',
      },
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 6,
        priceBand: '50-150',
        badge: 'The considered jar',
        giftWhy:
          'About $72. This is the gift that feels expensive without being a gamble, for someone who likes a dewy cream. Skip it if she only wears oil-free gel. Pair the box with a short note. The jar does not need a basket of extras around it.',
      },
      {
        productSlug: 'ysl-libre-eau-de-parfum',
        rank: 7,
        priceBand: '50-150',
        badge: 'Perfume, if you know her',
        giftWhy:
          'About $98. Lavender and orange blossom, modern, a little loud. Buy it when she already wears this bottle or this family. Do not buy it and Chanel Chance. One perfume is the gift. Two is you hoping.',
      },
      {
        productSlug: 'chanel-chance-eau-tendre',
        rank: 8,
        priceBand: '50-150',
        badge: 'The softer perfume',
        giftWhy:
          'About $105. Softer than Libre. Choose Chance when her scents are powdery or tender, not when you want “a nice Chanel” as a category. If you cannot describe her scent, buy Tatcha or Laneige instead.',
      },
      {
        productSlug: 'la-mer-creme-de-la-mer',
        rank: 9,
        priceBand: 'splurge',
        badge: 'Splurge cream',
        giftWhy:
          'About $190. Buy this when she already loves rich creams and the pleasure of a jar is the point. Do not buy it to fix her skin, and do not buy it for someone who will feel guilty using it. A little, warmed between fingers, is how the jar is meant to be used.',
      },
      {
        productSlug: 'dyson-airwrap-multi-styler',
        rank: 10,
        priceBand: 'splurge',
        badge: 'Splurge tool',
        giftWhy:
          'About $599. The right splurge when she styles her hair and will learn the attachments. The wrong splurge when you want a wow that stays in the closet. Confirm the kit on the listing. If the budget is the problem, the Revlon one-step is the other tool on this page.',
      },
      {
        productSlug: 'revlon-one-step-volumizer-plus',
        rank: 11,
        priceBand: 'under-50',
        badge: 'The tool under $50',
        giftWhy:
          'About $50. A blowout brush for someone whose real routine is a smooth dry, not a case of barrels. Buy this instead of a Dyson you cannot quite afford. Do not buy both.',
      },
    ],
    sections: [
      {
        heading: 'Three budgets',
        body: 'Under $50: Laneige if you want no color. Summer Fridays Pink Sugar if a sheer pink day balm is welcome. Gisou if she likes a honey hair scent, Olaplex No.7 if she wants fewer drops and less perfume. Do not buy both oils. Pillow Talk only with evidence. Revlon if she wants a dryer she will use tomorrow.\n\n$50 to $150: Tatcha for the dewy-cream person. One perfume, Libre or Chance, only with evidence. Do not assemble a trio so the total looks generous.\n\nSplurge: La Mer for a cream person who will enjoy the ritual. The Airwrap for a styling person who will practice. Those are different people. A splurge for the wrong person is the gift she politely keeps.',
      },
      {
        heading: 'Scent and shade',
        body: 'Blush, foundation, and a precise lipstick shade are knowledge gifts. Without that knowledge they are returns. Perfume is the same: beautiful, and personal. Body mist is the lower-risk scent if you want smell without a full bottle of commitment, and it lives on the under-$50 guide.\n\nIf she says she wants nothing, she usually means she does not want clutter. A lip mask or a cream she will empty beats a basket.',
      },
      {
        heading: 'December shipping',
        body: 'The date that matters is the delivery date on the Amazon listing the week you order. Prime on a beauty staple often moves later than a third-party dress or a pre-loved bag. This page is beauty you can wrap. Check the promise before you leave the listing, and order earlier than feels necessary once the calendar says December.\n\nPrices on this page are typical recent street prices. They move. If a pick jumps out of its band, use the next item that still fits. The budget was the promise.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'What if I am shopping the week of Christmas?',
        a: 'Open the listing and read the delivery date before you fall in love with the idea. Laneige, Gisou, and the Revlon are the picks most likely to be ordinary Prime items. The Airwrap and La Mer depend on the seller in front of you that day. If the date misses Christmas morning, choose the item that arrives, and say when the other one will.',
      },
      {
        q: 'She says she does not want anything.',
        a: 'Believe the part about clutter. Buy one thing she will use up: the lip mask, or Tatcha if a single jar still feels like enough. Skip sets, skip a second perfume, skip a tool she did not ask for.',
      },
      {
        q: 'What works for an office exchange under $25?',
        a: 'Laneige when the price is still in that range. If it is not, use the under-$50 guide for mascara or a balm, and skip shade-specific color. A perfume is too personal for a desk you share.',
      },
      {
        q: 'Should I buy Libre and Chance together?',
        a: 'No. They are the two perfume answers, for two different women. Pick the family you have actually smelled on her. If you cannot, leave perfume for someone who can.',
      },
    ],
  },
  {
    slug: 'gifts-for-her',
    title: 'Beauty Gifts for Her',
    dek: 'Skincare she will reach for, hair that smells like a weekend, fragrance that lingers — and one tool that feels like a private salon.',
    primaryQuery: 'gifts for her',
    recipientIds: ['her', 'girlfriend', 'friend'],
    occasionIds: ['birthday', 'christmas', 'valentines', 'just-because'],
    budgetBands: ['under-50', '50-150', 'splurge'],
    publishedAt: P,
    updatedAt: U,
    readMinutes: 7,
    intro:
      'You are not shopping for “a woman who likes beauty.” You are shopping for someone who notices when a cream feels expensive on the cheek, when a mist blooms in a room, when a brush stroke looks considered rather than loud. This list stays on Adazo’s shelf: prestige and cult favorites with a clear job — glow, scent, soft hair, a flush of color. Skip novelty kits. Buy the piece that earns a permanent place on her vanity.',
    productEntries: [
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 1,
        priceBand: '50-150',
        badge: 'Crowd-pleaser',
        giftWhy:
          'The cream that looks like you already know her bathroom shelf. Rich without greasy theater, dewy without sticky film — the kind of jar people finish and reorder. Safe when she loves a luminous finish; less right if she only wears oil-free gels. Wrap it with a handwritten note and it reads as care, not guesswork.',
      },
      {
        productSlug: 'ysl-libre-eau-de-parfum',
        rank: 2,
        priceBand: '50-150',
        badge: 'Fragrance win',
        giftWhy:
          'Lavender-orange blossom drama in a bottle she can wear to dinner or a Tuesday. Libre feels modern and slightly rebellious — perfect when you want perfume, not a body spray. Confirm she likes floral-woody florals before you go all-in; if she lives in soft powder, Chance may suit better.',
      },
      {
        productSlug: 'olaplex-no3-hair-perfector',
        rank: 3,
        priceBand: 'under-50',
        giftWhy:
          'For the woman who colors, heat-styles, or simply wants hair that feels stronger in the hand. A weekly treatment reads as thoughtful — you noticed her routine, not just her lipstick. Easy to ship, easy to use, and it pairs with any dryer or iron already in the house.',
      },
      {
        productSlug: 'rare-beauty-soft-pinch-liquid-blush',
        rank: 4,
        priceBand: 'under-50',
        badge: 'Color gift',
        giftWhy:
          'A little bottle that delivers a soft, lived-in flush — the opposite of heavy powder. Ideal when she already has foundations and needs the one product that makes a bare face feel finished. Shade is personal; if you know her undertone, this lands. If not, keep the receipt energy by gifting with a note that she can exchange.',
      },
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 5,
        priceBand: 'under-50',
        giftWhy:
          'The overnight lip ritual that feels like a tiny spa. Berry-sweet, plush, and endlessly shareable in photos of nightstands. Works as a stocking stuffer or the “I saw this and thought of you” midweek gift. Pair with champagne or a paperback for maximum softness.',
      },
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        rank: 6,
        priceBand: 'under-50',
        giftWhy:
          'Pistachio-caramel warmth that turns a hallway into vacation. Body mist is the low-risk fragrance gift — lighter than perfume, louder than lotion. She will spray it after the shower and smile. Best for playful taste; less ideal for ultra-minimal, unscented purists.',
      },
      {
        productSlug: 'dyson-airwrap-multi-styler',
        rank: 7,
        priceBand: 'splurge',
        badge: 'Splurge',
        giftWhy:
          'The tool that makes a home bathroom feel like a Riviera salon. Airwrap is for the woman who invests time in hair and will use attachments, not leave them in a drawer. Confirm voltage and hair length culture before you buy — this is a statement gift, not a polite thank-you.',
      },
      {
        productSlug: 'sk-ii-facial-treatment-essence',
        rank: 8,
        priceBand: '50-150',
        badge: 'Prestige',
        giftWhy:
          'The iconic essence bottle that signals “I take your glow seriously.” Silky, ritualistic, and instantly recognizable on a vanity. Ideal for skincare-curious giftees who already like serums; skip if she only wants fragrance or color. The glass alone makes unwrapping feel expensive.',
      },
    ],
    sections: [
      {
        heading: 'Who this list is for',
        body: 'Women who keep a vanity, not a junk drawer of half-used minis. Commuters who want soft hair, hosts who want a signature scent, friends who collect jars that feel special in the hand.\n\nIf you only know “she likes beauty,” start with lip mask, body mist, or a liquid blush — highest odds of delight without shade anxiety.',
      },
      {
        heading: 'How to choose in sixty seconds',
        body: 'Routine first: skincare lover → Tatcha or SK-II; scent-first → Libre or Sol de Janeiro; color → Rare Beauty; hair drama → Olaplex or Dyson. Budget under $50? Stay on the under-$50 guide. Splurge only when you are sure she will use a pro tool.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'What if she already owns one of these?',
        a: 'Check her vanity and shower ledge before you buy a flagship cream or the Airwrap. When she “has everything,” shift to a different texture (essence instead of cream), a new scent family, or a consumable she refills — mist, lip mask, dry shampoo.',
      },
      {
        q: 'Is this only for romantic partners?',
        a: 'The query is “for her,” but the products are beauty tools and rituals, not relationship costumes. Shop the job (glow, scent, hair). Use our mom or wife guides when the recipient frame is more specific.',
      },
      {
        q: 'Why buy through Adazo instead of searching Amazon yourself?',
        a: 'We curate a short list with house judgment and product pages that explain fit. You still check out on Amazon with normal shipping and returns. We may earn a referral commission on qualifying purchases.',
      },
    ],
  },
  {
    slug: 'gifts-for-mom',
    title: 'Beauty Gifts for Mom',
    dek: 'Thoughtful care — soft lips, dewy cream, a quiet fragrance, and tools that make mornings easier.',
    primaryQuery: 'gifts for mom',
    recipientIds: ['mom'],
    occasionIds: ['mothers-day', 'christmas', 'birthday'],
    budgetBands: ['under-50', '50-150', '150-400'],
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    seasonal: { peakMonths: [4, 5, 11, 12], yearHint: 2026 },
    intro:
      'Mom gifts fail when they are cute and unused. They work when they remove friction: dry lips, dull skin days, frizzy mornings, a scent that feels like her. This list is Mother’s Day and Christmas ready, but the products are evergreen. Beauty she will not return out of politeness.',
    productEntries: [
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 1,
        priceBand: 'under-50',
        badge: 'Mother’s Day softie',
        giftWhy:
          'The gift that ends the chapstick hunt on her nightstand. A plush overnight mask feels indulgent without asking her to learn a ten-step routine. Easy to pack for travel, easy to love. If she already lives in Laneige, step up to Tatcha or a fragrance she has not tried.',
      },
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 2,
        priceBand: '50-150',
        giftWhy:
          'A jar that says you want her skin to feel cushioned, not clinical. Dewy cream is tactile luxury — the kind of texture moms notice and finish. Perfect when she still cares about glow but has no interest in trend serums. Skip if she insists on oil-free only and already has a favorite gel.',
      },
      {
        productSlug: 'sk-ii-facial-treatment-essence',
        rank: 3,
        priceBand: '50-150',
        badge: 'Prestige ritual',
        giftWhy:
          'For the mom who enjoys a quiet morning ritual and recognizes a heritage bottle. Essence feels like a spa step without a appointment. Pair with a soft towel or a brunch reservation. Confirm she likes watery textures; cream-only devotees may prefer Tatcha alone.',
      },
      {
        productSlug: 'chanel-chance-eau-tendre',
        rank: 4,
        priceBand: '50-150',
        badge: 'Scent memory',
        giftWhy:
          'Soft floral that feels polished at lunch and gentle in a hug. Chance Eau Tendre is the opposite of a teenage body spray — refined, pink-adjacent, easy to wear. Ideal when mom already has heavy perfume and needs something light for daytime. Always respect scent sensitivity.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 5,
        priceBand: 'under-50',
        giftWhy:
          'A few drops for shine that photographs like sunlight on a terrace. Honey oil is the hair gift for women who still want softness without a salon day. Works on dry ends and as a scent trail in a coat collar. If her hair is very fine, suggest a light hand — a little goes far.',
      },
      {
        productSlug: 'revlon-one-step-volumizer-plus',
        rank: 6,
        priceBand: 'under-50',
        giftWhy:
          'The practical tool that shortens blow-dry time on busy mornings. One-step volume reads as useful love, not clutter. Great for moms who still style hair and hate juggling brush plus dryer. Confirm she is open to a heated brush; pure air-dry loyalists may prefer oil or dry shampoo instead.',
      },
      {
        productSlug: 'drunk-elephant-protini-polypeptide-cream',
        rank: 7,
        priceBand: '50-150',
        giftWhy:
          'A modern moisturizer with a clean, cult following — for moms who like bright packaging and a bouncy finish. Protini feels current without being gimmicky. Gift when she already browses “clean” beauty shelves; if she only trusts heritage brands, SK-II or Tatcha may land softer.',
      },
    ],
    sections: [
      {
        heading: 'Who this list is for',
        body: 'Moms who still like a polished exit — school run, office, dinner with friends. They want softness, scent, and fewer steps, not a laboratory of actives.\n\nIf she is fragrance-sensitive, lead with lip mask, cream, or hair oil and save perfume for someone who asks for it.',
      },
      {
        heading: 'Mother’s Day timing',
        body: 'Order early and check Amazon delivery promises. Beauty ships light, but popular creams and Chanel sell through. A handwritten card matters more than a bigger box.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'What if mom says she does not want anything?',
        a: 'She often means she does not want clutter. Choose a consumable she will empty — lip mask, mist, cream — or one tool that saves morning time. Frame it as “for the house” if that helps her accept it.',
      },
      {
        q: 'Is fragrance too personal for Mother’s Day?',
        a: 'It can be. If you do not know her scent family, pick unfragranced-feeling care (Laneige, Tatcha) or a light floral like Chance Eau Tendre only if she already wears soft florals. When in doubt, ask her sister or your other parent.',
      },
      {
        q: 'Can I gift these with other siblings?',
        a: 'Yes — pool for SK-II, Chanel, or a larger prestige cream. Solo gifting works beautifully for Laneige, Gisou, and Revlon under fifty.',
      },
    ],
  },
  {
    slug: 'gifts-for-wife',
    title: 'Luxury Beauty Gifts for Your Wife',
    dek: 'Upgrade prestige — La Mer, signature fragrance, lipstick she already loves, and the tool that feels like a private salon.',
    primaryQuery: 'gifts for wife',
    recipientIds: ['wife'],
    occasionIds: ['valentines', 'birthday', 'christmas', 'wedding', 'just-because'],
    budgetBands: ['50-150', '150-400', 'splurge'],
    publishedAt: P,
    updatedAt: U,
    readMinutes: 7,
    seasonal: { peakMonths: [1, 2, 11, 12], yearHint: 2026 },
    intro:
      'Wife gifts fail when they are generic “for her” baskets. They work when they feel like an upgrade she would hesitate to buy herself — the cream, the bottle, the tool. This list lives in prestige: fragrance with presence, lipstick with a name, skin that feels expensive to the touch. You still buy on Amazon; the judgment is Adazo’s.',
    productEntries: [
      {
        productSlug: 'la-mer-creme-de-la-mer',
        rank: 1,
        priceBand: '150-400',
        badge: 'Icon jar',
        giftWhy:
          'The cream people whisper about in elevators. La Mer is for the wife who understands legacy texture and likes a ritual that feels slow. It is a statement, not a starter moisturizer — best when she already invests in skin or has admired the jar in a magazine. Warm the cream between fingers; the gift is the ceremony as much as the formula.',
      },
      {
        productSlug: 'ysl-libre-eau-de-parfum',
        rank: 2,
        priceBand: '50-150',
        badge: 'Signature scent',
        giftWhy:
          'A modern classic with spine — lavender and orange blossom that reads confident at dinner. Libre works when she wants perfume that announces her entrance without shouting. If her drawer is already full of Libre, pivot to Flowerbomb or Chance for a different mood. Size up only if she empties bottles quickly.',
      },
      {
        productSlug: 'viktor-rolf-flowerbomb',
        rank: 3,
        priceBand: '50-150',
        giftWhy:
          'Explosive floral sweetness for the wife who likes a trail that lasts past the coat check. Flowerbomb is romantic without being shy — Valentine’s and anniversary energy. Confirm she enjoys bold florals; if she lives in sheer citrus, this may overwhelm. One spritz demonstration on a card is a thoughtful unboxing move.',
      },
      {
        productSlug: 'dyson-airwrap-multi-styler',
        rank: 4,
        priceBand: 'splurge',
        badge: 'Splurge',
        giftWhy:
          'The upgrade tool for the woman who already owns “fine” and deserves “pro.” Airwrap says you noticed how long mornings take and bought her time and polish. Coordinate colorway with her bathroom if you can. This is not a joke gift — check that she wants heat styling before you commit.',
      },
      {
        productSlug: 'sk-ii-facial-treatment-essence',
        rank: 5,
        priceBand: '50-150',
        giftWhy:
          'Clear bottle, cult status, daily ritual. SK-II is the prestige step she might delay buying herself because “the cream is enough.” Gift it as a pair with a soft cloth or a weekend away. Ideal for skincare-curious wives; less ideal if she only wants color and scent.',
      },
      {
        productSlug: 'charlotte-tilbury-pillow-talk-lipstick',
        rank: 6,
        priceBand: 'under-50',
        badge: 'Universal glam',
        giftWhy:
          'The nude-rose lipstick that photographs like a compliment. Pillow Talk is the safe glam when you know her makeup bag is considered but not experimental. It upgrades a date night without requiring a full face tutorial. If she already owns the shade, choose a matching liner or a different Charlotte finish she has eyed.',
      },
      {
        productSlug: 'chanel-chance-eau-tendre',
        rank: 7,
        priceBand: '50-150',
        giftWhy:
          'Softer Chanel for daytime — the scent of polished weekends and linen. Eau Tendre is for the wife who wants quiet luxury rather than nightclub sillage. Beautiful when paired with a silk scarf or a reservation. Avoid if she dislikes florals or prefers completely unscented skin.',
      },
      {
        productSlug: 'tatcha-the-dewy-skin-cream',
        rank: 8,
        priceBand: '50-150',
        giftWhy:
          'A dewy jar that feels like a trip to a calm spa in a city hotel. Less mythic than La Mer, still unmistakably gift-grade. Perfect mid-tier prestige when you want luxury without the top-shelf shock. She will use it; you will smell the soft finish on her cheek when you kiss her goodbye.',
      },
    ],
    sections: [
      {
        heading: 'Who this list is for',
        body: 'Partners who share a life and a bathroom counter. You know her taste well enough to upgrade it — not to guess a stranger’s shade.\n\nIf you are still learning her routine, start with Pillow Talk, Tatcha, or a fragrance she has sampled, and save Airwrap and La Mer for moments when certainty is high.',
      },
      {
        heading: 'Anniversary vs just because',
        body: 'Anniversaries can carry the splurge tool or the icon jar. “Just because” thrives on lipstick, essence, and scent — small enough to surprise on a Wednesday, beautiful enough to feel intentional.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'What if she already owns La Mer or Libre?',
        a: 'Move laterally: different fragrance family, SK-II if she is cream-only, Airwrap if tools are the gap, or Pillow Talk if color is missing. Consumable prestige still feels special when the bottle is new to her drawer.',
      },
      {
        q: 'Is Dyson too practical for romance?',
        a: 'Not if she will use it. Romance is also fewer rushed mornings and hair she loves in photos. Pair the box with a note about why you chose it — not a receipt speech.',
      },
      {
        q: 'Should I buy from a boutique instead?',
        a: 'You can. Adazo lists Amazon-available prestige so shipping and returns stay familiar. Confirm authenticity cues and seller ratings on the live listing either way.',
      },
    ],
  },
  {
    slug: 'self-care-gift-edit',
    title: 'Self-Care Beauty Edit',
    dek: 'The ritual you gift yourself — soft lips, body mist, protein cream, hair oil, and the little luxuries that make a Sunday feel longer.',
    primaryQuery: 'self care gifts',
    recipientIds: ['self', 'friend'],
    occasionIds: ['just-because', 'birthday', 'black-friday'],
    budgetBands: ['under-50', '50-150'],
    publishedAt: P,
    updatedAt: U,
    readMinutes: 6,
    intro:
      'Self-gifting is not a consolation prize. It is how you stock a bathroom that feels like a small hotel on the Riviera. This edit is for the cart you build for yourself — or the friend who needs permission to choose softness. Nothing clinical. Nothing that promises to “fix” you. Just textures, scents, and steps that make the day feel finished.',
    productEntries: [
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        rank: 1,
        priceBand: 'under-50',
        badge: 'Mood shift',
        giftWhy:
          'Spray after the shower and the room changes temperature in your mind. Brazilian Crush is vacation in a mist — warm, sweet, and unapologetically fun. Perfect when you need a five-second ritual between meetings. Keep one in the gym bag and one on the vanity if you empty bottles the way some people empty coffee.',
      },
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 2,
        priceBand: 'under-50',
        giftWhy:
          'The last thing you touch before sleep. A lip mask is self-care with zero learning curve — open, swipe, rest. Ideal for dry office air and long flights. Buy it for yourself when you are tired of disposable balms that disappear by noon.',
      },
      {
        productSlug: 'drunk-elephant-protini-polypeptide-cream',
        rank: 3,
        priceBand: '50-150',
        badge: 'Face ritual',
        giftWhy:
          'A bouncy cream for nights when you want your skin to feel fed, not stripped. Protini is the self-gift that looks current on a shelf and feels modern under makeup the next morning. Use it as the “I deserve the nice jar” moment after a hard week.',
      },
      {
        productSlug: 'gisou-honey-infused-hair-oil',
        rank: 4,
        priceBand: 'under-50',
        giftWhy:
          'Honey-scented shine for ends that have seen too much heat and too little patience. A few drops turn a quick brush-through into a ritual you look forward to. Self-care that still lets you leave the house in twelve minutes — the best kind of luxury on a weekday.',
      },
      {
        productSlug: 'supergoop-unseen-sunscreen-spf-40',
        rank: 5,
        priceBand: 'under-50',
        giftWhy:
          'Invisible finish sunscreen that plays well under makeup and on bare skin days. Unseen is the practical self-gift: protection that does not feel like a chore. Keep it next to your keys so the habit sticks. Always recheck the live listing for current SPF claims and size.',
      },
      {
        productSlug: 'living-proof-dry-shampoo',
        rank: 6,
        priceBand: 'under-50',
        giftWhy:
          'Second-day hair that still photographs clean. Dry shampoo is permission to sleep in and still look intentional at the café. A self-care staple for travel weeks and late nights. Shake well, section, and brush through — the small ritual is half the pleasure.',
      },
      {
        productSlug: 'rare-beauty-soft-pinch-liquid-blush',
        rank: 7,
        priceBand: 'under-50',
        giftWhy:
          'One pinch of color when you cannot face a full face. Liquid blush is the “I still showed up” product — soft, buildable, kind under morning light. Gift it to yourself when your makeup bag feels heavy and you want one joyful step.',
      },
      {
        productSlug: 'vital-proteins-collagen-peptides',
        rank: 8,
        priceBand: 'under-50',
        giftWhy:
          'A scoop in coffee or smoothie as a quiet morning habit. Collagen peptides are the wellness-adjacent self-gift for people who like routine more than drama. Not a miracle — just a small ritual that makes the first mug feel intentional. Confirm dietary preferences before sharing this pick with friends.',
      },
    ],
    sections: [
      {
        heading: 'How to build a self-care night',
        body: 'Shower. Mist. Oil on ends. Cream on face. Lip mask last. Phone face-down. That is the edit. Add sunscreen to the morning side of the same shelf so the story continues at 8 a.m.',
      },
      {
        heading: 'Gifting this list to a friend',
        body: 'Bundle three under-$50 pieces in tissue — mist, lip mask, blush — and write “permission to keep these.” Self-care language lands better as invitation than instruction.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'Is self-gifting wasteful?',
        a: 'Not when you choose pieces you will empty. Start with mist, lip mask, or dry shampoo — high use, low regret. Leave the biggest jars for when you know your texture preferences.',
      },
      {
        q: 'What if I already own half of this?',
        a: 'Fill the gaps only. Self-care lists are menus, not mandates. Rotate scent families and textures so the shelf stays interesting.',
      },
      {
        q: 'Can men use this edit?',
        a: 'Anyone who wants soft lips, clean-feeling hair days, and a body mist can shop these jobs. The framing is ritual, not gender. Skip shade-specific blush if it is not your lane.',
      },
    ],
  },
  {
    slug: 'gifts-under-50',
    title: 'Beauty Gifts Under $50',
    dek: 'True under-fifty wins — serums, mascara, lip mask, body mist, and the heated brush that still fits the budget.',
    primaryQuery: 'gifts under 50',
    recipientIds: ['her', 'friend', 'coworker', 'teen-girl', 'self'],
    occasionIds: ['christmas', 'birthday', 'just-because', 'black-friday'],
    budgetBands: ['under-50'],
    publishedAt: P,
    updatedAt: U,
    readMinutes: 5,
    intro:
      'Under fifty is not code for forgettable. It is where beauty gifts get used up and reordered — the cleanser, the mascara, the mist, the lip mask. Every pick on this list sits near or under fifty on typical Amazon pricing; prices move, so confirm the live listing. No handbags, no jewelry, no jokes. Just pieces that feel generous in the hand.',
    productEntries: [
      {
        productSlug: 'the-ordinary-niacinamide-10-zinc-1',
        rank: 1,
        priceBand: 'under-50',
        badge: 'Cult serum',
        giftWhy:
          'A small bottle with outsized cult energy. Niacinamide serum is the smart stocking stuffer for skincare-curious friends who like a simple step. Lightweight, easy to wrap, and it looks intentional next to a handwritten note. Pair with a soft washcloth for a complete mini ritual under twenty dollars all-in on a good day.',
      },
      {
        productSlug: 'elf-holy-hydration-makeup-melting-cleansing-balm',
        rank: 2,
        priceBand: 'under-50',
        giftWhy:
          'The balm that turns makeup removal into something almost luxurious on a budget. Melting texture feels expensive for the price and photographs well in unboxing. Perfect for teens, coworkers, and anyone who still sleeps in mascara sometimes. Include a clean muslin cloth if you want to look extra thoughtful.',
      },
      {
        productSlug: 'maybelline-lash-sensational-sky-high-mascara',
        rank: 3,
        priceBand: 'under-50',
        badge: 'Lash lift look',
        giftWhy:
          'Length that reads expensive in photos without a salon lash appointment. Sky High is the safe color gift — one size, easy return path if shade of black is wrong, and it lives in every “clean girl” drawer. Stocking-sized. Hostess-gift sized. “I saw this and thought of you” sized.',
      },
      {
        productSlug: 'eos-shea-better-body-lotion',
        rank: 4,
        priceBand: 'under-50',
        giftWhy:
          'Soft skin gift without the prestige price. Shea lotion is the practical pleasure people actually empty. Choose a scent profile she already likes if you can; unscented-leaning households may prefer fragrance-free care instead. Bundle two and it still stays under fifty on many days.',
      },
      {
        productSlug: 'cerave-hydrating-facial-cleanser',
        rank: 5,
        priceBand: 'under-50',
        giftWhy:
          'The cleanser dermatologist-adjacent bathrooms keep rebuying. Hydrating formula is a kind gift for winter skin and sensitive routines — never flashy, always useful. Best when you know she likes a cream cleanser; foam purists may want a different texture. Pair with a soft towel for a complete under-thirty moment.',
      },
      {
        productSlug: 'the-inkey-list-retinol-eye-cream',
        rank: 6,
        priceBand: 'under-50',
        giftWhy:
          'An approachable eye cream for the friend who is curious about retinol but not ready for a vanity full of actives. Small tube, clear brand story, easy to wrap. Remind her to go slow and use sunscreen in the morning — Adazo does not do clinical promises, only sensible routine pairing.',
      },
      {
        productSlug: 'laneige-lip-sleeping-mask',
        rank: 7,
        priceBand: 'under-50',
        badge: 'Always works',
        giftWhy:
          'The under-fifty gift that feels like more. Lip sleeping mask is texture theater — glossy jar, soft scent, nightly use. Ideal for Secret Santa, desk gifts, and “just because” texts that arrive as packages. If prices creep over fifty, wait for a deal or swap to Ordinary or e.l.f.',
      },
      {
        productSlug: 'sol-de-janeiro-brazilian-crush-body-mist',
        rank: 8,
        priceBand: 'under-50',
        giftWhy:
          'Fragrance joy without full perfume commitment. Body mist is the playful under-fifty scent gift — loud enough to delight, light enough to risk. Perfect for friends who love warm gourmand notes. Skip for scent-free offices or highly sensitive skin households.',
      },
      {
        productSlug: 'rare-beauty-soft-pinch-liquid-blush',
        rank: 9,
        priceBand: 'under-50',
        giftWhy:
          'A modern blush that earns compliments in natural light. Soft Pinch is the color gift under fifty that still feels current and considered. Shade risk is real — if you do not know her undertone, include a note that Amazon returns are straightforward for beauty when unopened per seller policy.',
      },
      {
        productSlug: 'revlon-one-step-volumizer-plus',
        rank: 10,
        priceBand: 'under-50',
        badge: 'Tool under $50',
        giftWhy:
          'The rare heated tool that often sits near the under-fifty line and replaces a drawer of half-working dryers. Volume and speed for people who style hair on weekdays. Confirm live price — if it spikes, drop to mist plus mascara and keep the promise of the query. Always check voltage and reviews for the exact model.',
      },
    ],
    sections: [
      {
        heading: 'How to gift under $50 without looking cheap',
        body: 'Bundle with intention: cleanser + lip mask, or mascara + blush, wrapped as a “morning kit.” One excellent object beats three forgettable minis. Avoid mystery multi-packs with no brand story.',
      },
      {
        heading: 'Price honesty',
        body: 'Amazon prices move. Adazo hints are typical ranges. Always confirm the live listing. If an “under $50” pick is suddenly $59, swap to the next item — the query is the promise.',
      },
    ],
    faq: [
      AMAZON_FAQ,
      {
        q: 'What is the single best sub-$25 beauty gift?',
        a: 'Laneige lip mask when it is on a typical street price, or The Ordinary niacinamide for skincare-curious friends. Both hit daily use and feel intentional.',
      },
      {
        q: 'Can I stay under $50 for a serious fragrance lover?',
        a: 'Full-size prestige perfume often sits above fifty. Choose body mist for scent joy under the cap, or save toward Libre or Chance on our other guides when the budget opens.',
      },
      {
        q: 'Is Secret Santa different?',
        a: 'Yes — favor universal items (lip mask, mascara, cleansing balm). Avoid highly personal shade matches unless you know her undertone and makeup style.',
      },
    ],
  },
]

const bySlug = new Map(giftGuides.map((g) => [g.slug, g]))

export function getGiftGuide(slug: string): GiftGuide | undefined {
  return bySlug.get(slug)
}

export function guidesForProduct(productSlug: string): GiftGuide[] {
  return giftGuides.filter((g) =>
    g.productEntries.some((e) => e.productSlug === productSlug),
  )
}

export function guidesForOccasion(occasion: GiftOccasionId): GiftGuide[] {
  return giftGuides.filter((g) => g.occasionIds.includes(occasion))
}

export function guidesForRecipient(recipient: GiftRecipientId): GiftGuide[] {
  return giftGuides.filter((g) => g.recipientIds.includes(recipient))
}

export function featuredGiftGuides(limit = 5): GiftGuide[] {
  const month = new Date().getMonth() + 1
  const scored = giftGuides.map((g) => {
    const seasonalBoost = g.seasonal?.peakMonths.includes(month) ? 100 : 0
    const updated = g.updatedAt || g.publishedAt
    return { g, score: seasonalBoost + (updated >= U ? 10 : 0) }
  })
  scored.sort((a, b) => b.score - a.score)
  let list = scored.map((x) => x.g)
  if (month >= 9 && month <= 12) {
    const christmas = giftGuides.find((g) => g.slug === 'christmas-beauty-gifts')
    if (christmas) {
      list = [christmas, ...list.filter((g) => g.slug !== christmas.slug)]
    }
  }
  return list.slice(0, limit)
}

export const BUDGET_LABELS: Record<string, string> = {
  'under-50': 'Under $50',
  '50-150': '$50–150',
  '150-400': '$150–400',
  splurge: 'Splurge',
}

export const RECIPIENT_LABELS: Record<string, string> = {
  her: 'For her',
  wife: 'For your wife',
  mom: 'For mom',
  girlfriend: 'For girlfriend',
  'teen-girl': 'Teen',
  coworker: 'Coworker',
  host: 'Host',
  couple: 'Couple',
  self: 'Self',
  friend: 'Friend',
}
