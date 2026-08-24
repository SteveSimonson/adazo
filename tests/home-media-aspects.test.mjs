import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { LOOKBOOK_SLIDES } from '../src/data/lookbook.ts'

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
