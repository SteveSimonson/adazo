import { mkdir, writeFile } from 'node:fs/promises'

const entries = [
  ['A routine is a sequence, not a shelf', 'routine-is-a-sequence', 'A thoughtful routine is less about owning every step and more about knowing what comes first, what can wait, and what you will actually repeat.', 'beauty,self-care,routine', 'design_note'],
  ['The barrier likes fewer surprises', 'barrier-likes-fewer-surprises', 'When a routine changes, changing one variable at a time makes it easier to notice what feels comfortable and what does not.', 'skin,ingredients,self-care', 'care_tip'],
  ['Texture is a useful clue', 'texture-is-a-useful-clue', 'A finish can tell you where a product belongs in your day: light layers suit daytime, while richer textures often feel better as a final evening step.', 'skin,routine,beauty', 'did_you_know'],
  ['SPF is a morning habit', 'spf-is-a-morning-habit', 'Sun protection works best as a repeatable part of the morning routine, not a last-minute detail reserved for beach days.', 'skin,self-care,routine', 'care_tip'],
  ['A patch test is a small favor', 'patch-test-is-a-small-favor', 'Trying a new formula on a small area first gives you useful information before it becomes part of your whole routine.', 'skin,ingredients,self-care', 'care_tip'],
  ['The best shade is the one you reach for', 'best-shade-is-reachable', 'A beautiful color earns its place when it works with the clothes, light, and mood you already live in.', 'beauty,makeup,routine', 'fun_fact'],
  ['Warm and cool are starting points', 'warm-cool-is-a-starting-point', 'Undertone language is helpful, but your own lighting and contrast matter more than a label. Test near a window when possible.', 'beauty,makeup', 'design_note'],
  ['Fragrance has a dry-down', 'fragrance-has-a-dry-down', 'A scent evolves after the first spray. Give it a little time on skin before deciding whether the later notes belong with you.', 'fragrance,beauty', 'did_you_know'],
  ['Hair likes the right amount of friction', 'hair-likes-right-friction', 'Gentle detangling, a soft towel, and fewer rushed passes can make a routine feel kinder without adding another product.', 'hair,self-care,routine', 'care_tip'],
  ['Scalp care starts with consistency', 'scalp-care-starts-consistently', 'A simple, repeatable wash rhythm is easier to evaluate than a cabinet full of occasional experiments.', 'hair,self-care,routine', 'design_note'],
  ['A travel edit should earn its space', 'travel-edit-earns-space', 'The best travel kit covers the moments you know are coming, uses containers you can trust, and leaves room for one small pleasure.', 'travel,self-care,beauty', 'fun_fact'],
  ['A good gift leaves room for choice', 'good-gift-leaves-choice', 'When you do not know someone’s exact shade or scent, a flexible ritual, tool, or discovery set can feel more personal than a risky guess.', 'gifting,beauty,self-care', 'care_tip'],
  ['Ingredients tell part of the story', 'ingredients-tell-part-story', 'An ingredient list is useful context, but the full experience also includes texture, packaging, scent, and whether the routine fits real life.', 'ingredients,beauty,skin', 'design_note'],
  ['More steps are not automatically better', 'more-steps-not-better', 'A routine earns complexity when each step has a clear job. If a step is hard to explain, it may be the first one to simplify.', 'self-care,routine,beauty', 'material_myth'],
  ['The mirror is not a lab', 'mirror-is-not-a-lab', 'Light, camera settings, and distance change what you see. Use consistent conditions when comparing a look, then trust how it feels in motion.', 'beauty,makeup,self-care', 'fun_fact'],
  ['A refill is a design decision', 'refill-is-a-design-decision', 'Packaging that is easy to open, clean, and reuse can turn a good product into a better long-term ritual.', 'beauty,self-care,ingredients', 'nature_note'],
  ['Clean tools make better rituals', 'clean-tools-better-rituals', 'Brushes, combs, and reusable applicators work best when cleaning them is simple enough to become part of the calendar.', 'beauty,hair,self-care', 'care_tip'],
  ['The evening reset can be short', 'evening-reset-can-be-short', 'A small closing ritual can signal that the day is done: cleanse, moisturize, put tools away, and leave tomorrow a clear starting point.', 'skin,self-care,routine', 'culture_craft'],
  ['The best beauty light is honest', 'best-beauty-light-is-honest', 'Natural, even light makes color and texture easier to judge than a dramatic overhead spotlight.', 'beauty,makeup,travel', 'did_you_know'],
  ['A signature scent is a memory cue', 'signature-scent-memory-cue', 'Scent is closely tied to place and memory, which is why a familiar fragrance can make a routine feel like a small return.', 'fragrance,culture,self-care', 'culture_craft'],
  ['Pack the product you will use', 'pack-what-you-use', 'A compact kit wins when every item has a job and the order is obvious. The goal is fewer decisions, not a smaller version of the whole bathroom.', 'travel,routine,self-care', 'design_note'],
  ['Beauty is allowed to be playful', 'beauty-can-be-playful', 'A routine can be practical and still leave room for color, shine, scent, or a new texture that simply makes the day more fun.', 'beauty,makeup,culture', 'fun_fact'],
  ['A guide should answer the next question', 'guide-answers-next-question', 'The most useful product guidance anticipates the follow-up: how much, when to use it, what to pair it with, and when to keep it simple.', 'beauty,ingredients,routine', 'did_you_know'],
  ['Good packaging removes friction', 'good-packaging-removes-friction', 'A pump that does not clog, a cap that closes securely, and a label that stays readable all make consistency easier.', 'beauty,self-care,travel', 'design_note'],
  ['Your routine has a season', 'routine-has-a-season', 'Weather, travel, and schedule change what feels comfortable. Let the routine flex instead of treating one version as permanent.', 'skin,hair,self-care', 'nature_note'],
]

const palettes = [
  ['#18362d', '#fff9f0', '#d3a45f', '#31594b'],
  ['#442b2d', '#fff8f3', '#f0a28e', '#754448'],
  ['#26354a', '#f6f7ff', '#a7c5e8', '#3e5774'],
  ['#57452d', '#fffaf1', '#e8c57d', '#7b6340'],
]

const labels = {
  did_you_know: 'Did you know?',
  fun_fact: 'Quick insight',
  care_tip: 'Care note',
  design_note: 'Design note',
  material_myth: 'Worth knowing',
  nature_note: 'Field note',
  culture_craft: 'Human touch',
}

function csv(value) {
  return `"${String(value).replaceAll('"', '""')}"`
}

function markup(slug, title, body, type) {
  return `<article class="adazo-${slug}" aria-label="Adazo editorial note"><small>${labels[type]}</small><h3>${title}</h3><p>${body}</p><span aria-hidden="true">✦</span></article>`
}

function style(slug, palette, index) {
  const root = `.adazo-${slug}`
  const [bg, fg, accent, soft] = palette
  const columns = index % 3 === 0 ? 'minmax(130px,.65fr) minmax(220px,2fr) auto' : index % 3 === 1 ? 'minmax(180px,1fr) minmax(220px,1.5fr) auto' : 'minmax(150px,.8fr) minmax(220px,2fr) auto'
  return `${root},${root} *{box-sizing:border-box}${root}{display:grid;grid-template-columns:${columns};align-items:center;gap:24px;width:100%;min-height:138px;padding:24px 30px;border:1px solid ${accent}66;border-left:5px solid ${accent};border-radius:${index % 2 ? '18px 6px 18px 6px' : '6px 18px 6px 18px'};background:linear-gradient(112deg,${bg},${soft});color:${fg};font-family:inherit;box-shadow:0 22px 55px -38px rgba(0,0,0,.62);position:relative;overflow:hidden}${root}:after{content:"";position:absolute;width:190px;height:190px;right:-110px;top:-124px;border:1px solid ${accent}80;border-radius:50%;opacity:.5}${root} small{position:relative;color:${accent};font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}${root} h3,${root} p{position:relative;margin:0}${root} h3{font-size:clamp(20px,2.4vw,30px);line-height:1.04;letter-spacing:-.035em}${root} p{max-width:680px;margin-top:8px;font-size:13px;line-height:1.5;opacity:.9}${root}>span{position:relative;color:${accent};font-size:28px;font-weight:700;text-align:right}@media(max-width:680px){${root}{grid-template-columns:1fr;gap:9px;padding:21px;min-height:190px}${root}>span{text-align:left;font-size:22px}}`
}

const rows = entries.map(([title, slug, body, topics, type], index) =>
  [title, slug, 'responsive', markup(slug, title, body, type), style(slug, palettes[index % palettes.length], index), type, topics]
    .map(csv)
    .join(','),
)

await mkdir(new URL('../content/', import.meta.url), { recursive: true })
await writeFile(
  new URL('../content/adazo-balloons.csv', import.meta.url),
  `title,slug,size,html,css,editorial_type,topics\n${rows.join('\n')}\n`,
)
console.log(`Wrote ${rows.length} Adazo balloons.`)
