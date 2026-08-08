import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_KEY = 'nNo0a-TuVz6S'
const API_ORIGIN = 'https://conbal.us'
const ROOT_PREFIX = 'adazo'
const HISTORY_KEY = `adazo:conbal-history:${SITE_KEY}`
const INTEGRATION_VERSION = 'page-aware-20260808'
const MAX_SLOTS = 6
const REQUEST_TIMEOUT_MS = 2400
const EDITORIAL_TYPES = [
  'did_you_know',
  'fun_fact',
  'care_tip',
  'design_note',
  'material_myth',
  'nature_note',
  'culture_craft',
]

type BalloonPayload = {
  slug?: string
  size?: string
  html?: string
  css?: string
}

type Anchor = { node: Element; text: string }

const TOPIC_RULES: Array<[string, string[]]> = [
  ['beauty', ['beauty', 'makeup', 'cosmetic', 'glow', 'complexion']],
  ['skin', ['skin', 'skincare', 'cleanser', 'serum', 'moisturizer', 'spf']],
  ['hair', ['hair', 'shampoo', 'conditioner', 'scalp', 'curl']],
  ['self-care', ['self-care', 'wellness', 'ritual', 'routine', 'bath', 'body']],
  ['fragrance', ['fragrance', 'perfume', 'scent', 'aroma']],
  ['ingredients', ['ingredient', 'formula', 'botanical', 'oil', 'vitamin']],
  ['travel', ['travel', 'carry-on', 'vacation', 'weekend', 'portable']],
  ['gifting', ['gift', 'birthday', 'holiday', 'mother', 'bridal']],
]

const PAGE_TOPIC_RULES: Array<[string, string[]]> = [
  ['/shop', ['beauty', 'skin', 'hair', 'self-care']],
  ['/product/', ['beauty', 'ingredients', 'care', 'routine']],
  ['/guides', ['beauty', 'skin', 'hair', 'ingredients']],
  ['/gifts', ['gifting', 'beauty', 'self-care']],
  ['/quiz', ['beauty', 'self-care', 'routine']],
  ['/vibe/', ['beauty', 'self-care', 'fragrance']],
  ['/watch', ['beauty', 'culture', 'routine']],
  ['/reels', ['beauty', 'culture', 'travel']],
  ['/why', ['beauty', 'culture', 'self-care']],
]

function textOf(node: Element | null) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim()
}

function wordCount(text: string) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0
}

function slotCount(words: number, path: string) {
  if (/^\/(?:admin|privacy|terms|404)(?:\/|$)/.test(path)) return 0
  if (words < 160) return 0
  return Math.min(MAX_SLOTS, 1 + Math.floor((words - 160) / 300))
}

function pageTopics(path: string) {
  const normalizedPath = path.split('?')[0].replace(/\/+$/, '') || '/'
  const routeTopics = PAGE_TOPIC_RULES.find(([route]) =>
    route.endsWith('/')
      ? normalizedPath.startsWith(route)
      : normalizedPath === route || normalizedPath.startsWith(`${route}/`),
  )?.[1]
  if (routeTopics) return routeTopics

  const focus = document.querySelector('main > section, main > article, main > div')
  const haystack = [
    document.title,
    normalizedPath,
    textOf(document.querySelector('h1')),
    textOf(focus),
  ].join(' ').toLowerCase()
  const topics = TOPIC_RULES.filter(([, terms]) =>
    terms.some((term) => haystack.includes(term)),
  ).map(([topic]) => topic)
  return (topics.length ? topics : ['beauty', 'self-care', 'general']).slice(0, 8)
}

function readHistory() {
  try {
    const value = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]')
    return Array.isArray(value)
      ? value
          .filter((slug): slug is string => /^[a-z0-9-]{1,80}$/.test(slug))
          .slice(-36)
      : []
  } catch {
    return []
  }
}

function remember(slugs: string[]) {
  if (!slugs.length) return
  try {
    const history = readHistory().concat(slugs)
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(Array.from(new Set(history)).slice(-36)),
    )
  } catch {
    // A blocked storage API must never affect the host page.
  }
}

function visible(node: Element) {
  const style = window.getComputedStyle(node)
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
}

function ignored(node: Element) {
  return Boolean(
    node.closest(
      'header, nav, footer, form, dialog, aside, li, [data-conbal-managed], [data-conbal-slot], [data-adazo-conbal-slot]',
    ),
  )
}

function usableAnchor(node: Element, root: HTMLElement) {
  const rect = node.getBoundingClientRect()
  const rootWidth = root.getBoundingClientRect().width
  const minimumWidth = Math.min(520, Math.max(260, rootWidth * 0.42))
  const insideCardLayout = Boolean(
    node.parentElement?.closest(
      '[class~="grid"], [class*="rounded-"], [data-card], [data-product-card], [data-conbal-managed]',
    ),
  )
  return rect.width >= minimumWidth && !insideCardLayout
}

function anchors(root: HTMLElement): Anchor[] {
  const layoutNodes = Array.from(
    root.querySelectorAll('[class~="grid"], [class*="grid-cols-"], [data-conbal-allow-grid]'),
  )
    .filter((node) => visible(node) && !ignored(node))
    .map((node) => ({ node, text: textOf(node) }))
    .filter(({ node, text }) => {
      const rect = node.getBoundingClientRect()
      return text.length >= 220 && rect.width >= Math.min(520, Math.max(260, root.getBoundingClientRect().width * 0.42))
    })
  const nodes = Array.from(root.querySelectorAll('section, article, p, h2, h3'))
    .filter((node) => visible(node) && !ignored(node) && usableAnchor(node, root))
    .map((node) => ({ node, text: textOf(node) }))
    .filter(({ node, text }) => text.length >= (node.matches('p') ? 120 : 180))
  const allNodes = [...layoutNodes, ...nodes]
  const paragraphs = allNodes.filter(({ node }) => node.matches('p'))
  const source = paragraphs.length >= 2 ? paragraphs : layoutNodes.length ? layoutNodes : nodes
  const result: Anchor[] = []
  for (const entry of source) {
    if (result.some(({ node }) => node.contains(entry.node) || entry.node.contains(node))) continue
    result.push(entry)
  }
  return result
}

function chooseAnchors(root: HTMLElement, count: number) {
  const candidates = anchors(root)
  if (!candidates.length) return []
  const picks: Anchor[] = []
  const step = candidates.length / count
  for (let index = 0; index < count; index += 1) {
    const candidate = candidates[Math.min(candidates.length - 1, Math.floor((index + 0.5) * step))]
    if (
      !picks.some(
        ({ node }) => node === candidate.node || node.contains(candidate.node) || candidate.node.contains(node),
      )
    ) {
      picks.push(candidate)
    }
  }
  return picks
}

function createSlots(root: HTMLElement, count: number) {
  return chooseAnchors(root, count).map((entry, index) => {
    const slot = document.createElement('div')
    slot.className = 'adazo-conbal-slot'
    slot.dataset.conbalSlot = String(index)
    slot.setAttribute('role', 'region')
    slot.setAttribute('aria-live', 'polite')
    slot.setAttribute('aria-label', 'Adazo editorial note')
    entry.node.insertAdjacentElement('afterend', slot)
    return slot
  })
}

function safeHtml(html: string | undefined, expectedSlug: string) {
  if (
    typeof html !== 'string' ||
    html.length < 40 ||
    html.length > 50_000 ||
    /<\s*(script|iframe|object|embed|form|input|textarea|select|style)\b|\bon[a-z]+\s*=|javascript:/i.test(html)
  ) {
    return null
  }
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const roots = Array.from(doc.body.children)
  if (roots.length !== 1 || roots[0].tagName !== 'ARTICLE') return null
  const root = roots[0]
  if (root.classList.length !== 1 || root.classList[0] !== `${ROOT_PREFIX}-${expectedSlug}`) return null
  const allowedTags = new Set(['ARTICLE', 'SMALL', 'H3', 'P', 'SPAN'])
  for (const node of [root, ...Array.from(root.querySelectorAll('*'))]) {
    if (!allowedTags.has(node.tagName)) return null
    for (const attr of Array.from(node.attributes)) {
      if (attr.name !== 'class' && attr.name !== 'aria-label' && attr.name !== 'aria-hidden') return null
      if (
        attr.name === 'class' &&
        !attr.value.split(/\s+/).filter(Boolean).every((value) =>
          new RegExp(`^${ROOT_PREFIX}-[a-z0-9-]+$`).test(value),
        )
      ) {
        return null
      }
    }
  }
  return root
}

function safeCss(css: string | undefined, expectedSlug: string) {
  if (typeof css !== 'string' || css.length < 40 || css.length > 40_000) return null
  const root = `.${ROOT_PREFIX}-${expectedSlug}`
  if (
    !css.includes(root) ||
    /<\/?style|@(?:import|supports|font-face|keyframes)|url\s*\(|expression\s*\(|javascript:|position\s*:\s*(?:fixed|sticky)|z-index\s*:/i.test(css) ||
    /(^|[,{])\s*(?:body|html|:root)\b/i.test(css)
  ) {
    return null
  }
  return css
}

function render(slot: HTMLElement, payload: BalloonPayload | undefined) {
  if (!payload?.slug || !/^[a-z0-9-]{1,80}$/.test(payload.slug) || payload.size !== 'responsive') return false
  const root = safeHtml(payload.html, payload.slug)
  const css = safeCss(payload.css, payload.slug)
  if (!root || !css) return false
  const style = document.createElement('style')
  style.textContent = css
  slot.replaceChildren(style, root)
  slot.dataset.conbal = 'ready'
  slot.dataset.conbalSlug = payload.slug
  return true
}

async function request(slots: HTMLElement[], topics: string[]) {
  const url = new URL(`${API_ORIGIN}/b/${SITE_KEY}/_sample`)
  const nonce = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  url.searchParams.set('nonce', nonce)
  url.searchParams.set(
    'slots',
    JSON.stringify(
      slots.map((_, id) => ({
        id: String(id),
        size: 'responsive',
        topics,
        editorial_types: EDITORIAL_TYPES,
      })),
    ),
  )
  const history = readHistory()
  if (history.length) url.searchParams.set('exclude_slugs', history.join(','))
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'no-store',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    if (!response.ok) return null
    return (await response.json()) as { slots?: Record<string, BalloonPayload> }
  } catch {
    return null
  } finally {
    window.clearTimeout(timer)
  }
}

function injectHostStyle() {
  if (document.querySelector('style[data-adazo-conbal-host]')) return
  const style = document.createElement('style')
  style.dataset.adazoConbalHost = INTEGRATION_VERSION
  style.textContent =
    'html{overflow-x:clip}.adazo-conbal-slot{width:100%;min-width:0;min-height:138px;margin:clamp(2.4rem,6vw,5.5rem) 0;container-type:inline-size;contain:layout;overflow:clip}.adazo-conbal-slot[data-conbal="ready"]{display:block}.adazo-conbal-slot[data-conbal="ready"]>article{min-width:0;overflow:hidden!important}.adazo-conbal-slot[data-conbal="ready"]>article>*{min-width:0;overflow-wrap:anywhere}@container (max-width:38rem){.adazo-conbal-slot[data-conbal="ready"]>article{grid-template-columns:minmax(0,1fr)!important;min-height:0!important}}@media(max-width:680px){.adazo-conbal-slot{min-height:190px;margin:2.8rem 0}}'
  document.head.appendChild(style)
}

function pageRoot() {
  return document.querySelector('main, [role="main"], #root') as HTMLElement | null
}

export default function ConbalBalloons() {
  const { pathname } = useLocation()

  useEffect(() => {
    injectHostStyle()
    const main = pageRoot()
    if (!main) return
    main.querySelectorAll('.adazo-conbal-slot').forEach((node) => node.remove())
    delete main.dataset.conbalInitialized
    if (/^\/(?:admin|privacy|terms|404)(?:\/|$)/.test(pathname)) return

    let cancelled = false
    let attempts = 0
    let retryTimer: number | undefined
    let observer: MutationObserver | undefined
    let pollTimer: number | undefined
    const schedule = (delay = 180) => {
      if (cancelled || retryTimer !== undefined) return
      retryTimer = window.setTimeout(() => {
        retryTimer = undefined
        void initialize()
      }, delay)
    }
    const initialize = async () => {
      if (cancelled) return
      const root = pageRoot()
      if (!root || root.dataset.conbalInitialized === 'true') return
      const words = wordCount(textOf(root))
      const count = slotCount(words, pathname)
      if (!count) {
        if (words < 30 && attempts < 12) {
          attempts += 1
          schedule()
        }
        return
      }
      const slots = createSlots(root, count)
      if (!slots.length) return
      root.dataset.conbalInitialized = 'true'
      const data = await request(slots, pageTopics(pathname))
      if (cancelled) return
      const shown: string[] = []
      slots.forEach((slot, index) => {
        if (render(slot, data?.slots?.[String(index)])) shown.push(slot.dataset.conbalSlug || '')
        else slot.remove()
      })
      if (!shown.length) {
        delete root.dataset.conbalInitialized
        return
      }
      remember(shown.filter(Boolean))
    }
    observer = new MutationObserver(() => {
      const root = pageRoot()
      if (!root || cancelled) return
      if (slotCount(wordCount(textOf(root)), pathname) && root.dataset.conbalInitialized !== 'true') schedule(240)
    })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    const frame = window.requestAnimationFrame(() => {
      void initialize()
      pollTimer = window.setTimeout(() => void initialize(), 320)
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      if (retryTimer) window.clearTimeout(retryTimer)
      if (pollTimer) window.clearTimeout(pollTimer)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
