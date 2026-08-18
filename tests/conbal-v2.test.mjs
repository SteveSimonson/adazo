import assert from 'node:assert/strict'
import test from 'node:test'

import { parseConbalHistory, validateConbalAssignment } from '../src/lib/conbalV2.ts'

const valid = {
  assignment_id: 'v2_example',
  budget: 'compact-v1',
  content: { headline: 'A useful beauty note', body: 'A calm ritual can be more useful than another complicated shelf.' },
  editorial_type: 'care_tip',
  role: 'inline-note',
  slug: 'useful-beauty-note',
}

test('accepts bounded v2 copy and rejects contract drift', () => {
  assert.deepEqual(validateConbalAssignment(valid), valid)
  assert.equal(validateConbalAssignment({ ...valid, role: 'grid-tile' }), null)
  assert.equal(validateConbalAssignment({ ...valid, budget: 'standard-v1' }), null)
  assert.equal(validateConbalAssignment({ ...valid, content: { ...valid.content, body: 'x'.repeat(111) } }), null)
})

test('history is bounded, deduplicated, and rejects malformed entries', () => {
  assert.deepEqual(parseConbalHistory('{bad'), [])
  assert.deepEqual(parseConbalHistory(JSON.stringify(['one', 'BAD VALUE', 'one', 'two'])), ['one', 'two'])
  assert.equal(parseConbalHistory(JSON.stringify(Array.from({ length: 40 }, (_, index) => `note-${index}`))).length, 30)
})
