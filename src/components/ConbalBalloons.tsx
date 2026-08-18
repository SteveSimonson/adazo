import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  parseConbalHistory,
  validateConbalAssignment,
  type ConbalAssignment,
} from '../lib/conbalV2'

const SITE_KEY = 'nNo0a-TuVz6S'
const API_ORIGIN = 'https://conbal.us'
const HISTORY_KEY = `adazo:conbal-v2-history:${SITE_KEY}`
const MAX_SLOTS = 3
const REQUEST_TIMEOUT_MS = 2600
const SITE_TOPICS = [
  'beauty',
  'skin',
  'hair',
  'self-care',
  'fragrance',
  'ingredients',
  'travel',
  'gifting',
]
const EDITORIAL_TYPES = [
  'did_you_know',
  'fun_fact',
  'care_tip',
  'design_note',
  'material_myth',
  'nature_note',
  'culture_craft',
]

type Anchor = { node: Element; text: string }

function textOf(node: Element | null) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim()
}

function wordCount(text: string) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0
}

function slotCount(words: number, path: string) {
  if (/^\/(?:admin|privacy|terms|404)(?:\/|$)/.test(path) || words < 220) return 0
  if (words < 700) return 1
  if (words < 1_400) return 2
  return MAX_SLOTS
}

function readHistory() {
  try {
    return parseConbalHistory(window.localStorage.getItem(HISTORY_KEY))
  } catch {
    return []
  }
}

function remember(slugs: string[]) {
  if (!slugs.length) return
  try {
    const history = [...new Set([...readHistory(), ...slugs])].slice(-30)
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Storage is only a rotation hint. Rendering must still work without it.
  }
}

function visible(node: Element) {
  const style = window.getComputedStyle(node)
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
}

function safeBoundary(node: Element, root: HTMLElement) {
  if (!visible(node) || node.closest('header, nav, footer, form, dialog, aside, li, [data-conbal-slot]')) return false
  const parent = node.parentElement
  if (!parent) return false
  const parentStyle = window.getComputedStyle(parent)
  if (parentStyle.display.includes('grid')) return false
  if (parentStyle.display.includes('flex') && parentStyle.flexDirection.startsWith('row')) return false
  const rootWidth = root.getBoundingClientRect().width
  const parentWidth = parent.getBoundingClientRect().width
  const minimumWidth = Math.min(560, Math.max(300, rootWidth * 0.68))
  if (parentWidth < minimumWidth) return false
  const classNames = `${node.className || ''} ${parent.className || ''}`
  if (/\b(?:card|tile|hero|cta|modal|drawer|sidebar)\b/i.test(classNames)) return false
  if (node.querySelector('h1, form, ol, button')) return false
  return wordCount(textOf(node)) >= 18
}

function anchors(root: HTMLElement): Anchor[] {
  const sections = Array.from(root.querySelectorAll('section')).filter((node) => safeBoundary(node, root))
  const fallbackArticles = Array.from(root.querySelectorAll('article')).filter((node) => safeBoundary(node, root))
  const candidates = (sections.length ? sections : fallbackArticles)
    .map((node) => ({ node, text: textOf(node) }))
  const result: Anchor[] = []
  for (const entry of candidates) {
    if (result.some(({ node }) => node.contains(entry.node) || entry.node.contains(node))) continue
    result.push(entry)
  }
  return result
}

function chooseAnchors(root: HTMLElement, count: number) {
  const candidates = anchors(root)
  if (!candidates.length) return []
  // The final section is commonly a related-content or conversion block. Keep
  // editorial notes in the body rhythm instead of between the page and CTA.
  const safeCandidates = candidates.length > 2 ? candidates.slice(0, -1) : candidates
  const target = Math.min(count, safeCandidates.length)
  const picks: Anchor[] = []
  for (let index = 0; index < target; index += 1) {
    const candidateIndex = Math.min(
      safeCandidates.length - 1,
      Math.floor(((index + 0.5) * safeCandidates.length) / target),
    )
    const candidate = safeCandidates[candidateIndex]
    if (!picks.some(({ node }) => node === candidate.node)) picks.push(candidate)
  }
  return picks
}

function createSlots(root: HTMLElement, count: number) {
  return chooseAnchors(root, count).map((entry, index) => {
    const slot = document.createElement('div')
    slot.className = 'adazo-conbal-slot'
    slot.dataset.conbalSlot = `adazo-note-${index + 1}`
    entry.node.insertAdjacentElement('afterend', slot)
    return slot
  })
}

function render(slot: HTMLElement, assignment: ConbalAssignment) {
  const card = document.createElement('aside')
  card.className = 'adazo-conbal-note'
  card.setAttribute('aria-label', 'Adazo editorial note')

  const eyebrow = document.createElement('p')
  eyebrow.className = 'adazo-conbal-note__eyebrow'
  eyebrow.textContent = assignment.editorial_type === 'care_tip' ? 'Ritual note' : 'Adazo field note'

  const headline = document.createElement('h2')
  headline.className = 'adazo-conbal-note__headline'
  headline.textContent = assignment.content.headline

  const body = document.createElement('p')
  body.className = 'adazo-conbal-note__body'
  body.textContent = assignment.content.body

  card.append(eyebrow, headline, body)
  slot.replaceChildren(card)
  slot.dataset.conbalSlug = assignment.slug
}

async function request(slots: HTMLElement[]) {
  const pageViewId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(`${API_ORIGIN}/v2/b/${encodeURIComponent(SITE_KEY)}/sample`, {
      body: JSON.stringify({
        contract: '2.0',
        page_view_id: pageViewId,
        repeat_policy: 'omit',
        exclude_slugs: readHistory(),
        slots: slots.map((slot) => ({
          id: slot.dataset.conbalSlot,
          role: 'inline-note',
          budget: 'compact-v1',
          topics: SITE_TOPICS,
          editorial_types: EDITORIAL_TYPES,
        })),
      }),
      cache: 'no-store',
      credentials: 'omit',
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      signal: controller.signal,
    })
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) return null
    return (await response.json()) as { assignments?: Record<string, unknown> }
  } catch {
    return null
  } finally {
    window.clearTimeout(timer)
  }
}

function injectHostStyle() {
  if (document.querySelector('style[data-adazo-conbal-v2]')) return
  const style = document.createElement('style')
  style.dataset.adazoConbalV2 = 'true'
  style.textContent = `
    .adazo-conbal-slot{box-sizing:border-box;display:block;margin:clamp(2.5rem,6vw,5rem) auto;max-width:72rem;min-width:0;padding:0 clamp(1rem,4vw,1.5rem);width:100%}
    .adazo-conbal-slot:empty{display:none}
    .adazo-conbal-note{background:linear-gradient(120deg,#fff 0%,#fff 68%,#f7f1f3 68%,#f7f1f3 100%);border:1px solid #eadfe4;border-radius:1rem;box-sizing:border-box;display:grid;gap:.55rem;grid-template-columns:minmax(10rem,.7fr) minmax(14rem,1.3fr);margin:0;min-width:0;overflow:hidden;padding:clamp(1.25rem,3vw,2rem)}
    .adazo-conbal-note__eyebrow{align-self:end;color:#944e5a;font:700 .625rem/1.3 "DM Sans",ui-sans-serif,system-ui,sans-serif;grid-column:1;margin:0;text-transform:uppercase;letter-spacing:.18em}
    .adazo-conbal-note__headline{color:#1a1418;font:600 clamp(1.35rem,2.5vw,2rem)/1.08 "Cormorant Garamond",ui-serif,Georgia,serif;grid-column:1;margin:0;overflow-wrap:anywhere}
    .adazo-conbal-note__body{align-self:center;color:#4a3f45;font:400 .95rem/1.65 "DM Sans",ui-sans-serif,system-ui,sans-serif;grid-column:2;grid-row:1 / span 2;margin:0;min-width:0;overflow-wrap:anywhere}
    @media(max-width:640px){.adazo-conbal-note{background:#fff;grid-template-columns:minmax(0,1fr);padding:1.25rem}.adazo-conbal-note__eyebrow,.adazo-conbal-note__headline,.adazo-conbal-note__body{grid-column:1;grid-row:auto}.adazo-conbal-note__body{font-size:.875rem}}
  `
  document.head.appendChild(style)
}

function pageRoot() {
  return document.querySelector('main, [role="main"]') as HTMLElement | null
}

export default function ConbalBalloons() {
  const { pathname } = useLocation()

  useEffect(() => {
    injectHostStyle()
    let cancelled = false
    let observer: MutationObserver | undefined
    let retryTimer: number | undefined
    let attempts = 0

    const initialize = async () => {
      if (cancelled) return
      const root = pageRoot()
      if (!root || root.dataset.conbalV2Initialized === 'true') return
      root.querySelectorAll('.adazo-conbal-slot').forEach((node) => node.remove())
      const words = wordCount(textOf(root))
      const count = slotCount(words, pathname)
      if (!count) {
        if (words < 40 && attempts < 10) {
          attempts += 1
          retryTimer = window.setTimeout(() => void initialize(), 160)
        }
        return
      }
      const slots = createSlots(root, count)
      if (!slots.length) return
      root.dataset.conbalV2Initialized = 'true'
      observer?.disconnect()
      const response = await request(slots)
      if (cancelled) return
      const shown: string[] = []
      for (const slot of slots) {
        const id = slot.dataset.conbalSlot || ''
        const assignment = validateConbalAssignment(response?.assignments?.[id])
        if (!assignment) {
          slot.remove()
          continue
        }
        render(slot, assignment)
        shown.push(assignment.slug)
      }
      remember(shown)
    }

    const root = pageRoot()
    if (root) {
      root.querySelectorAll('.adazo-conbal-slot').forEach((node) => node.remove())
      delete root.dataset.conbalV2Initialized
    }
    observer = new MutationObserver(() => void initialize())
    observer.observe(document.body, { childList: true, subtree: true })
    const frame = window.requestAnimationFrame(() => void initialize())

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      if (retryTimer) window.clearTimeout(retryTimer)
      observer?.disconnect()
      const activeRoot = pageRoot()
      activeRoot?.querySelectorAll('.adazo-conbal-slot').forEach((node) => node.remove())
      if (activeRoot) delete activeRoot.dataset.conbalV2Initialized
    }
  }, [pathname])

  return null
}
