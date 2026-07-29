# Kimi SEO skill (`cf-workers-seo`) — adazo.com

**Domain:** adazo.com  
**Repo:** `/Users/stevensimonson/Adazo`  
**Run date:** 2026-07-29  
**Skill:** `~/.kimi-code/skills/cf-workers-seo`

## Stack match

| Assumption | Adazo |
|------------|--------|
| Vite/React SPA + empty `#root` shell | Yes |
| Cloudflare Worker + static assets | Yes (`wrangler.jsonc`, `run_worker_first: true`) |
| Custom domain on Worker | Yes (`adazo.com/*`, `www.adazo.com/*`) |
| Per-route meta via Worker | Yes (`worker/index.ts` + `routeMeta.json`) |

This is the **exact stack** the skill targets. The SEO layer was largely already implemented (ibamboo-style). This run audited live + code and closed operational gaps (IndexNow submit, verification).

## Definition-of-done scorecard

| Check | Result | Evidence |
|-------|--------|----------|
| Host variants → canonical HTTPS apex | **Mostly pass** | `http://adazo.com` → `https://adazo.com` (301). `https://www` → `https://adazo.com` (301). **`http://www` is two hops** (CF Always Use HTTPS to `https://www`, then Worker to apex). |
| HSTS everywhere | **Pass** | `Strict-Transport-Security: max-age=31536000` |
| Soft-404 fixed | **Pass** | Unknown paths → **404** + `noindex,nofollow` |
| Per-route title/description/canonical in **raw HTML** | **Pass** | `/`, `/shop`, `/quiz`, `/why`, `/vibe/luxe`, `/shop?cat=handbags`, product routes differ in shell HTML |
| JSON-LD in raw HTML | **Pass** | Org + WebSite global; page/product/breadcrumb extras; parses cleanly |
| Missing file → bare 404 | **Pass** | `/brand/does-not-exist.jpg` → 404 text/plain |
| Unknown `/api/*` → JSON 404 | **Pass** | verify-suite |
| `/assets/*` immutable | **Pass** | `public, max-age=31536000, immutable` |
| `/brand/*` 7-day | **Pass** | `public, max-age=604800` |
| HTML max-age=0 | **Pass** | `must-revalidate` |
| HEAD stability (cold isolate) | **Pass** | 20× `/` + 10× bogus → **0 unexpected** |
| og:image 1200×630 ≤300 KB | **Pass** | `/brand/social.png` is **1200×630**, **~6 KB** (verify-suite false-failed: CF omits `Content-Length` on some HIT responses) |
| Brand imagery WebP | **Partial / deferred** | **0 WebP** today; **84 JPG** + 1 PNG. Many campaign stills are 300–450 KB JPEG. Fashion portfolio quality prioritized; WebP pass is a follow-up. |
| IndexNow key file | **Pass** | `https://adazo.com/6085cd2a12dbed27400d4134b1a93452.txt` → 200, exact key |
| IndexNow submit | **Pass** | `npm run indexnow` → **HTTP 202**, 89 URLs |
| Sitemap | **Pass** | 89 URLs, referenced from `robots.txt` |
| routeMeta table | **Pass** | **103 routes** in `worker/generated/routeMeta.json` |
| Repo ship gate | **N/A this run** | No code changes required for core SEO; operational submit only |

## Architecture (already in place)

```
src/lib/seoData.ts          → isomorphic per-route SEO
scripts/generate-sitemap.mjs → sitemap.xml + worker/generated/routeMeta.json
worker/index.ts             → shell injection, 404s, HSTS, cache, host redirects
public/<indexnow-key>.txt   → IndexNow ownership
npm run indexnow            → submit sitemap URLs
```

Worker correctly avoids the **HEAD cold-isolate bug** (explicit GET for shell subfetch; HEAD short-circuits before transform).

## verify-suite.sh (2026-07-29)

```
RESULT: 17 passed, 3 failed
```

| Failure | Real issue? |
|---------|-------------|
| `http://adazo.com/` location empty in suite | **No** — live `Location: https://adazo.com/` present; suite awk flake |
| `http://www.adazo.com/why` location not apex | **Yes (minor)** — first hop is CF HTTPS on www, second hop Worker to apex |
| og:image ≤300KB | **No** — file is 6 KB; missing Content-Length header |

## Indexing baseline

- **IndexNow:** 89 URLs submitted (202 Accepted), 2026-07-29.
- **Bing `site:adazo.com` RSS:** no authentic Adazo listings yet (noise/unrelated results) — treat as **not yet indexed** / early domain. Submit sitemap in Bing Webmaster Tools.
- **Google:** not automated; needs Search Console property + sitemap submit.

## Follow-ups (optional)

1. **Single-hop www (including http):** Cloudflare **Bulk Redirect** or **Dynamic Redirect** rule:  
   `www.adazo.com/*` → `https://adazo.com/${1}` (both schemes). Complements Worker apex logic.
2. **WebP pass:** Convert non-portfolio chrome first (`promo/`, `categories/`, vibe avatars/scenes) with `sharp` q82; keep portfolio campaign JPGs until A/B quality is OK; then convert portfolio with high quality.
3. **GSC / Bing manual:** verify property (DNS TXT), submit `https://adazo.com/sitemap.xml`.
4. **Per-route og:image** (optional): inject persona campaign stills as og:image for `/vibe/*` after confirming absolute URLs in Worker injection.

## Commands re-run anytime

```bash
cd /Users/stevensimonson/Adazo
bash ~/.kimi-code/skills/cf-workers-seo/reference/verify-suite.sh adazo.com
npm run indexnow
```
