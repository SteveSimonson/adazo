import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORKFLOW = join(ROOT, '.github/workflows/refresh-offers.yml')
const REQUIRED = [
  'AMAZON_CREATORS_CREDENTIAL_ID',
  'AMAZON_CREATORS_CREDENTIAL_SECRET',
  'AMAZON_CREATORS_PARTNER_TAG',
  'Z9GO_LIBRARY_TOKEN',
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID',
]

function gateScript() {
  const yml = readFileSync(WORKFLOW, 'utf8')
  const start = yml.indexOf('name: Check required secrets')
  const runAt = yml.indexOf('run: |', start)
  const nextStep = yml.indexOf('\n      - name:', runAt)
  assert.ok(start >= 0 && runAt >= 0 && nextStep > runAt)
  return yml
    .slice(runAt + 'run: |'.length, nextStep)
    .split('\n')
    .map((line) => line.replace(/^ {10}/, ''))
    .join('\n')
    .trim()
}

function runGate(env) {
  const dir = mkdtempSync(join(tmpdir(), 'offer-gate-'))
  const output = join(dir, 'github-output')
  writeFileSync(output, '')
  let stdout = ''
  let status = 0
  try {
    stdout = execFileSync('bash', ['-lc', gateScript()], {
      env: { ...env, PATH: process.env.PATH, GITHUB_OUTPUT: output },
      encoding: 'utf8',
    })
  } catch (error) {
    status = error.status ?? 1
    stdout = error.stdout?.toString() ?? ''
  }
  return { status, stdout, output: readFileSync(output, 'utf8') }
}

test('missing offer-refresh secrets skip the job and do not deploy', () => {
  const yml = readFileSync(WORKFLOW, 'utf8')
  for (const step of [
    'Checkout',
    'Setup Node',
    'Install',
    'Refresh Creators offers',
    'Sync product library',
    'Build and deploy',
  ]) {
    const at = yml.indexOf(`name: ${step}`)
    const window = yml.slice(at, at + 280)
    assert.match(window, /if: steps\.gate\.outputs\.skip != 'true'/, step)
  }
  assert.equal(
    yml.split('\n').filter((line) => line.includes('run: npm run deploy')).length,
    1,
  )

  const skipped = runGate({})
  assert.equal(skipped.status, 0)
  assert.match(
    skipped.stdout,
    /Skipping offer refresh, library sync, and deploy\. Missing secrets: AMAZON_CREATORS_CREDENTIAL_ID AMAZON_CREATORS_CREDENTIAL_SECRET AMAZON_CREATORS_PARTNER_TAG Z9GO_LIBRARY_TOKEN CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID/,
  )
  assert.match(skipped.output, /skip=true/)
  assert.doesNotMatch(skipped.stdout, /npm run deploy/)

  const oneMissing = runGate({
    AMAZON_CREATORS_CREDENTIAL_ID: 'id',
    AMAZON_CREATORS_CREDENTIAL_SECRET: 'secret',
    AMAZON_CREATORS_PARTNER_TAG: 'tag-20',
    Z9GO_LIBRARY_TOKEN: 'token',
    CLOUDFLARE_API_TOKEN: '',
    CLOUDFLARE_ACCOUNT_ID: 'account',
  })
  assert.equal(oneMissing.status, 0)
  assert.match(oneMissing.stdout, /Missing secrets: CLOUDFLARE_API_TOKEN/)
  assert.match(oneMissing.output, /skip=true/)

  const ready = runGate(Object.fromEntries(REQUIRED.map((name) => [name, 'set'])))
  assert.equal(ready.status, 0)
  assert.match(ready.stdout, /Offer refresh secrets are present\./)
  assert.match(ready.output, /skip=false/)
  assert.doesNotMatch(ready.stdout, /Skipping offer refresh/)
})
