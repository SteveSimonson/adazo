---
version: alpha
name: Adazo
description: Beauty/lifestyle Amazon storefront on warm paper with blush rose accents — product photography first; pure white wells f
colors:
  primary: "#1a1418"
  secondary: "#4a3f45"
  tertiary: "#b76e79"
  neutral: "#faf7f8"
  bamboo: "#b76e79"
  bamboo-deep: "#944e5a"
  card: "#ffffff"
  charcoal: "#1a1216"
  cream: "#f7f1f3"
  gold: "#c4a07a"
  ink: "#1a1418"
  ink-soft: "#4a3f45"
  leaf: "#d4a5ad"
  line: "#eadfe4"
  moss: "#5c2e3a"
  muted: "#7a6d74"
  paper: "#faf7f8"
  paper-2: "#f3ecef"
  sunset: "#d4846a"
  well: "#ffffff"
  wood: "#c9a08a"
typography:
  h1:
    fontFamily: Cormorant Garamond
    fontSize: 2.5rem
    fontWeight: 600
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
  button:
    fontFamily: DM Sans
    fontSize: 0.875rem
    fontWeight: 600
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 999px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
---

## Overview

Beauty/lifestyle Amazon storefront on warm paper with blush rose accents — product photography first; pure white wells for studio shots.

**Domain:** adazo.com
**Primary conversion:** Shop on Amazon
**CSS path:** `src/index.css`

**This file is the normative brand contract.** Change tokens here first, then mirror into CSS, then components.

## Colors

Extracted from live CSS. Prefer these names in new work:

| Token | Value |
|-------|-------|
| **primary** | `#1a1418` |
| **secondary** | `#4a3f45` |
| **tertiary** | `#b76e79` |
| **neutral** | `#faf7f8` |
| **bamboo** | `#b76e79` |
| **bamboo-deep** | `#944e5a` |
| **card** | `#ffffff` |
| **charcoal** | `#1a1216` |
| **cream** | `#f7f1f3` |
| **gold** | `#c4a07a` |
| **ink** | `#1a1418` |
| **ink-soft** | `#4a3f45` |
| **leaf** | `#d4a5ad` |
| **line** | `#eadfe4` |
| **moss** | `#5c2e3a` |
| **muted** | `#7a6d74` |
| **paper** | `#faf7f8` |
| **paper-2** | `#f3ecef` |
| **sunset** | `#d4846a` |
| **well** | `#ffffff` |
| **wood** | `#c9a08a` |

- Use **tertiary** (or the brand accent listed above) for interaction — not arbitrary new hues.
- Keep product image wells pure white when this is an Amazon-affiliate surface.

## Typography

- **Display:** Cormorant Garamond
- **Body/UI:** DM Sans
- Do not add a third family without updating this file.

## Layout

- Follow existing container max-widths and section padding in the live CSS.
- Sticky headers must leave scroll-margin for in-page anchors.
- Prefer one primary CTA per view.

### Desktop media contracts

- **House Book:** Mobile is one 3:4 leaf. `lg+` is two facing 3:4 pages (open spread **3:2**) at `max-w-5xl` / `max-w-6xl`. Do not enlarge a single 3:4 page — that only makes a taller phone. Campaign stills are 1200×1600; keep them uncropped in 3:4 frames.
- **LookbookHero:** Desktop is a **16:9** cinematic band (`aspect-video`). The announcement bar + header are opaque and in-flow (~116px); do not add overlay-style top padding. Thumbs sit on or below the band so in-flow copy cannot change the photo aspect. Hero stills are 1920×1080; do not cover-crop a 3:4 file as the landscape plate.

## Elevation & Depth

- Match existing shadow/glow language in the stylesheet; do not add Material-style heavy elevation unless already present.
- Respect `prefers-reduced-motion` for hover transforms.

## Shapes

- Prefer rounded pills for CTAs and soft cards as in live components.

## Components

Map to existing classes in the primary stylesheet (names vary by site):

| Role | Look for |
|------|----------|
| Primary button | `.btn-primary`, `.btn.primary`, brand CTA class |
| Secondary button | `.btn-secondary`, `.btn-ghost`, outline CTA |
| Card | `.card`, `.card-soft`, product card |
| Field | `.field`, form inputs |
| Nav | header/nav link styles |

Reuse these; do not invent a parallel component set.

## Do's and Don'ts

**Do**

- Read this file before UI work on **Adazo**.
- Keep brand accent usage consistent with live pages.
- Update this file in the same PR when brand tokens change.

**Don't**

- No cold cyan/obsidian (Kyasi). Never put brand color washes over product image wells.
- Ship one-off hex in components when a token exists.
- Copy another brand’s palette into this site without an intentional redesign + DESIGN.md rewrite.
