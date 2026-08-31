import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { LOOKBOOK_SLIDES } from '../src/data/lookbook.ts'
import { renderShell } from '../worker/renderShell.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Read JPEG pixel size from a SOF marker. */
function jpegSize(path) {
  const data = readFileSync(path)
  for (let i = 0; i < data.length - 8; i++) {
    if (data[i] !== 0xff) continue
    const marker = data[i + 1]
    if (marker === 0xc0 || marker === 0xc2) {
      const height = data.readUInt16BE(i + 5)
      const width = data.readUInt16BE(i + 7)
      return { width, height }
    }
  }
  throw new Error(`No JPEG SOF in ${path}`)
}

test('lookbook hero plates are landscape 16:9, not a 3:4 cover crop', () => {
  for (const slide of LOOKBOOK_SLIDES) {
    const file = join(ROOT, 'public', slide.image.replace(/^\//, ''))
    const { width, height } = jpegSize(file)
    const ratio = width / height
    assert.ok(
      width >= 1600 && height >= 900 && Math.abs(ratio - 16 / 9) < 0.03,
      `${slide.id} ${slide.image} should be ~1920×1080, got ${width}×${height}`,
    )
  }
})

test('watch slide does not use the portrait steel still as the cover', () => {
  const watch = LOOKBOOK_SLIDES.find((s) => s.id === 'time')
  assert.ok(watch)
  assert.notEqual(watch.image, '/brand/promo/lookbook-watches-steel.jpg')
  assert.match(watch.image, /wide|16|landscape/i)
})

test('house book desktop is two 3:4 leaves (3:2), not one enlarged page', () => {
  const src = readFileSync(
    join(ROOT, 'src/components/MagazineFlip.tsx'),
    'utf8',
  )
  const css = readFileSync(join(ROOT, 'src/index.css'), 'utf8')
  assert.match(src, /magazine-spread-faces/)
  assert.match(src, /magazine-verso/)
  assert.match(src, /magazine-recto/)
  assert.match(css, /aspect-ratio:\s*3\s*\/\s*2/)
  assert.match(css, /magazine-stage/)
  assert.doesNotMatch(src, /cursor-w-resize/)
  assert.doesNotMatch(src, /w-\[28%\]/)
  assert.doesNotMatch(src, /lg:max-w-none/)
  assert.doesNotMatch(src, /lg:max-w-3xl/)
  assert.doesNotMatch(src, /lg:max-w-4xl/)
})

test('lookbook hero is a locked cinematic band, not 94vh', () => {
  const src = readFileSync(
    join(ROOT, 'src/components/LookbookHero.tsx'),
    'utf8',
  )
  assert.match(src, /md:aspect-video/)
  assert.doesNotMatch(src, /94vh/)
  assert.doesNotMatch(src, /pt-36/)
})

test('lookbook hero mounts current/previous plates only, not the full stack', () => {
  const src = readFileSync(
    join(ROOT, 'src/components/LookbookHero.tsx'),
    'utf8',
  )
  assert.match(src, /prevIndex/)
  assert.match(src, /PromoImage/)
  assert.match(src, /desktopThumbs/)
  assert.match(src, /prevIndex == null \? \[index\]/)
})

test('reel inserts do not download MP4s until near the viewport', () => {
  const film = readFileSync(join(ROOT, 'src/components/LazyFilm.tsx'), 'utf8')
  const card = readFileSync(
    join(ROOT, 'src/components/ReelInsertCard.tsx'),
    'utf8',
  )
  assert.match(film, /preload="none"/)
  assert.match(film, /IntersectionObserver/)
  assert.match(film, /loading="lazy"/)
  assert.match(film, /load && !reduceMotion/)
  assert.doesNotMatch(film, /preload="metadata"/)
  assert.doesNotMatch(film, /preload="auto"/)
  assert.match(card, /<LazyFilm/)
  assert.doesNotMatch(card, /<video/)
})

test('homepage oversized promo stills ship WebP smaller than JPEG', () => {
  const files = [
    'public/brand/promo/lookbook-gold.jpg',
    'public/brand/promo/nav-gold-cuban.jpg',
    'public/brand/promo/lookbook-handbags.jpg',
  ]
  for (const jpgRel of files) {
    const jpg = join(ROOT, jpgRel)
    const webp = jpg.replace(/\.jpg$/, '.webp')
    assert.ok(existsSync(webp), `missing ${webp}`)
    const jpegBytes = statSync(jpg).size
    const webpBytes = statSync(webp).size
    assert.ok(
      webpBytes < jpegBytes,
      `${webp} (${webpBytes}) should be smaller than ${jpgRel} (${jpegBytes})`,
    )
    assert.ok(
      webpBytes < 320 * 1024,
      `${webp} should be under 320KB, got ${webpBytes}`,
    )
  }
  for (const slide of LOOKBOOK_SLIDES) {
    const webp = join(
      ROOT,
      'public',
      slide.image.replace(/^\//, '').replace(/\.jpe?g$/i, '.webp'),
    )
    assert.ok(existsSync(webp), `missing WebP for ${slide.image}`)
  }
})

test('home LCP preload is the lookbook WebP, not a reel MP4', () => {
  const seoSrc = readFileSync(join(ROOT, 'src/lib/seoData.ts'), 'utf8')
  const homeFn = seoSrc.match(/export function homeSeo\(\)[\s\S]*?\n\}/)
  assert.ok(homeFn, 'homeSeo() not found')
  assert.match(homeFn[0], /preloadImage: '\/brand\/promo\/lookbook-handbags\.webp'/)
  assert.doesNotMatch(homeFn[0], /\.mp4/)
  const html = renderShell(
    `<!doctype html><html><head><title>t</title>
    <meta name="description" content="d" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://adazo.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://adazo.com/" />
    <meta property="og:title" content="x" />
    <meta property="og:description" content="d" />
    <meta property="og:image" content="https://adazo.com/brand/social.png" />
    <meta name="twitter:title" content="x" />
    <meta name="twitter:description" content="d" />
    <meta name="twitter:image" content="https://adazo.com/brand/social.png" />
    </head><body><div id="root"></div></body></html>`,
    {
      title: 'Adazo',
      description: 'd',
      canonical: 'https://adazo.com/',
      robots: 'index,follow',
      ogType: 'website',
      jsonLd: null,
      preloadImage: '/brand/promo/lookbook-handbags.webp',
    },
    'https://adazo.com/brand/social.png',
  )
  assert.match(
    html,
    /rel="preload" as="image" href="\/brand\/promo\/lookbook-handbags\.webp" type="image\/webp"/,
  )
  assert.doesNotMatch(html, /as="video"/)
})
