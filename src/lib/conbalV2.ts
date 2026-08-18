export type ConbalEditorialType =
  | 'did_you_know'
  | 'fun_fact'
  | 'care_tip'
  | 'design_note'
  | 'material_myth'
  | 'nature_note'
  | 'culture_craft'

export type ConbalAssignment = {
  assignment_id: string
  budget: 'compact-v1' | 'standard-v1'
  content: {
    body: string
    headline: string
  }
  editorial_type: ConbalEditorialType
  role: 'inline-note' | 'section-break' | 'grid-tile' | 'aside-note'
  slug: string
}

const EDITORIAL_TYPES = new Set<ConbalEditorialType>([
  'did_you_know',
  'fun_fact',
  'care_tip',
  'design_note',
  'material_myth',
  'nature_note',
  'culture_craft',
])

export function validateConbalAssignment(value: unknown): ConbalAssignment | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const candidate = value as Partial<ConbalAssignment>
  if (
    typeof candidate.assignment_id !== 'string' ||
    candidate.assignment_id.length < 1 ||
    candidate.assignment_id.length > 160 ||
    typeof candidate.slug !== 'string' ||
    !/^[a-z0-9-]{1,120}$/.test(candidate.slug) ||
    candidate.role !== 'inline-note' ||
    candidate.budget !== 'compact-v1' ||
    !candidate.editorial_type ||
    !EDITORIAL_TYPES.has(candidate.editorial_type) ||
    !candidate.content ||
    typeof candidate.content.headline !== 'string' ||
    candidate.content.headline.length < 1 ||
    candidate.content.headline.length > 48 ||
    typeof candidate.content.body !== 'string' ||
    candidate.content.body.length < 1 ||
    candidate.content.body.length > 110
  ) {
    return null
  }
  return candidate as ConbalAssignment
}

export function parseConbalHistory(value: string | null) {
  try {
    const parsed: unknown = JSON.parse(value || '[]')
    if (!Array.isArray(parsed)) return []
    return [...new Set(parsed.filter((slug): slug is string =>
      typeof slug === 'string' && /^[a-z0-9-]{1,120}$/.test(slug),
    ))].slice(-30)
  } catch {
    return []
  }
}
