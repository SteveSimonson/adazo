import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { build } from 'esbuild'

import { renderShell } from '../worker/renderShell.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const bundled = await build({
  entryPoints: [join(ROOT, 'scripts/route-meta.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
  define: {
    'import.meta.env.VITE_AMAZON_ASSOCIATE_TAG': '""',
    'import.meta.env.VITE_GA_MEASUREMENT_ID': '""',
  },
})
const mod = await import(
  `data:text/javascript,${encodeURIComponent(bundled.outputFiles[0].text)}`
)
const routeMeta = mod.buildRouteMeta()

const SHELL = readFileSync(join(ROOT, 'index.html'), 'utf8')

function count(html, needle) {
  return html.split(needle).length - 1
}

function pathOf(loc) {
  const url = new URL(loc)
  let path = url.pathname
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

function served(path) {
  const meta = routeMeta.routes[path]
  assert.ok(meta, `missing route meta for ${path}`)
  return renderShell(SHELL, meta, routeMeta.ogImage, routeMeta.globalJsonLd)
}

const sitemap = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

test('sitemap omits /shop?limited=1 because its canonical is /shop', () => {
  assert.equal(locs.includes('https://adazo.com/shop?limited=1'), false)
  const limited = routeMeta.routes['/shop?limited=1']
  assert.equal(limited.canonical, 'https://adazo.com/shop')
})

test('sitemap includes every self-canonical /shop?cat= URL', () => {
  const cats = Object.entries(routeMeta.routes).filter(([key, meta]) => {
    return (
      key.startsWith('/shop?cat=') &&
      meta.canonical === `https://adazo.com${key}`
    )
  })
  assert.equal(cats.length, 14)
  for (const [key] of cats) {
    assert.ok(locs.includes(`https://adazo.com${key}`), key)
  }
})

test('organization JSON-LD does not publish an empty sameAs', () => {
  const org = routeMeta.globalJsonLd.find((block) => block['@type'] === 'Organization')
  assert.ok(org)
  assert.equal(Object.hasOwn(org, 'sameAs'), false)
  const home = served('/')
  assert.equal(home.includes('"sameAs":[]'), false)
  const raw = readFileSync(join(ROOT, 'worker/generated/routeMeta.json'), 'utf8')
  assert.equal(raw.includes('"sameAs":[]'), false)
  const artifact = JSON.parse(raw)
  assert.equal(artifact.routes['/'].crawler.h1, routeMeta.routes['/'].crawler.h1)
})

test('every sitemap URL is served with headings, copy, and links', () => {
  assert.ok(locs.includes('https://adazo.com/'))
  for (const loc of locs) {
    const path = pathOf(loc)
    const html = served(path)
    assert.ok(count(html, '<h1') >= 1, `${path} h1`)
    assert.ok(count(html, '<h2') >= 2, `${path} h2`)
    assert.ok(count(html, '<a ') >= 5, `${path} links`)
    assert.match(html, /<p>/, `${path} copy`)
    for (const img of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(img[0], /\balt="[^"]+"/, `${path} img alt`)
    }
  }
})

test('home keeps the lookbook LCP image and its alt', () => {
  const html = served('/')
  assert.match(
    html,
    /<link rel="preload" as="image" href="\/brand\/promo\/lookbook-handbags\.webp"/,
  )
  assert.match(
    html,
    /<img src="\/brand\/promo\/lookbook-handbags\.webp" alt="High fashion designer handbag editorial still life">/,
  )
})
