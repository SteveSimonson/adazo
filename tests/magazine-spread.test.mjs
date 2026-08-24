import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmpDir = join(ROOT, 'node_modules/.tmp')
mkdirSync(tmpDir, { recursive: true })
const bundlePath = join(tmpDir, 'magazine-spread.bundle.mjs')

const bundled = await build({
  stdin: {
    contents: `
export {
  MAGAZINE_PAGES,
  MAGAZINE_SERIES_FILTERS,
  magazineSpread,
  seriesBlurb,
  upcomingSpreads,
} from './src/data/magazine.ts'
`,
    resolveDir: ROOT,
    sourcefile: 'magazine-spread-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
})
writeFileSync(bundlePath, bundled.outputFiles[0].text)

const {
  MAGAZINE_PAGES,
  MAGAZINE_SERIES_FILTERS,
  magazineSpread,
  seriesBlurb,
  upcomingSpreads,
} = await import(`${pathToFileURL(bundlePath).href}?v=${Date.now()}`)

test('house book opens with a cover leaf', () => {
  assert.equal(MAGAZINE_PAGES[0]?.kind, 'cover')
  assert.equal(MAGAZINE_PAGES[0]?.title, 'ADAZO')
})

test('magazineSpread pairs current face with the next leaf', () => {
  const first = magazineSpread(MAGAZINE_PAGES, 0)
  assert.equal(first.left?.id, 'cover')
  assert.equal(first.right?.kind, 'divider')
  assert.equal(first.index, 0)

  const lastIndex = MAGAZINE_PAGES.length - 1
  const last = magazineSpread(MAGAZINE_PAGES, lastIndex)
  assert.equal(last.left?.id, MAGAZINE_PAGES[lastIndex]?.id)
  assert.equal(last.right, undefined)
  assert.equal(last.index, lastIndex)
})

test('magazineSpread clamps an out-of-range index', () => {
  const under = magazineSpread(MAGAZINE_PAGES, -4)
  assert.equal(under.index, 0)
  assert.equal(under.left?.kind, 'cover')

  const over = magazineSpread(MAGAZINE_PAGES, 999)
  assert.equal(over.index, MAGAZINE_PAGES.length - 1)
  assert.ok(over.left)
  assert.equal(over.right, undefined)
})

test('magazineSpread is empty-safe', () => {
  const empty = magazineSpread([], 2)
  assert.deepEqual(empty, { left: undefined, right: undefined, index: 0 })
})

test('series filters stay complete and series blurbs exist', () => {
  assert.deepEqual(
    MAGAZINE_SERIES_FILTERS.map((f) => f.id),
    ['all', 'house', 'world', 'wild', 'carpet'],
  )
  for (const id of ['house', 'world', 'wild', 'carpet']) {
    const copy = seriesBlurb(id)
    assert.ok(copy && copy.length > 20, `${id} blurb`)
  }
  assert.equal(seriesBlurb(undefined), undefined)
})

test('upcomingSpreads lists campaign leaves until the next divider', () => {
  const dividerIndex = MAGAZINE_PAGES.findIndex((p) => p.kind === 'divider')
  assert.ok(dividerIndex >= 0)
  const items = upcomingSpreads(MAGAZINE_PAGES, dividerIndex)
  assert.ok(items.length > 0)
  assert.ok(items.every((p) => p.kind === 'spread'))
  assert.ok(items.every((p) => p.series === MAGAZINE_PAGES[dividerIndex]?.series))
  assert.equal(upcomingSpreads([], 0).length, 0)
})

test('campaign spreads stay catalog-backed with a persona link', () => {
  const spreads = MAGAZINE_PAGES.filter((p) => p.kind === 'spread')
  assert.ok(spreads.length > 8)
  for (const page of spreads) {
    assert.ok(page.image, page.id)
    assert.ok(page.to?.startsWith('/'), page.id)
    assert.ok(page.personaName, page.id)
  }
})
