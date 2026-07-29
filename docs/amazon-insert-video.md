# Amazon insert video size (product grid)

Standing note for campaign / fashion clips meant to **drop into the Amazon product scroll** as if they were another product card. Use this whenever generating “insert” reels.

## Target format

| Spec | Value | Why |
|------|--------|-----|
| **Aspect** | **`4:5`** (portrait) | Matches `ProductCard` media well (`aspect-[4/5]`) |
| **Imagine staging** | Source still **`3:4`** if `4:5` isn’t offered | Closest built-in portrait; slight `object-cover` crop in a 4:5 well is fine |
| **Duration** | **6s** (prefer over 10s) | Short fashion beat; Imagine allows 6 or 10 only |
| **Resolution** | **720p** ship / **480p** draft | Cards are ~160–320px wide; 720p is sharp on 2× screens |
| **Pixel target (4:5)** | ~**720×900** to **864×1080** | No need for full 1080×1350 unless full-bleed hero |
| **Audio** | **Muted** autoplay on site | In-grid insert, never auto-sound |
| **Motion** | One simple move (slow push, fabric, hair, light) | Busy multi-action warps on a small tile |

### Avoid for in-grid inserts

- **`16:9`** — banner shape; heavy crop or letterbox in product cells  
- **`9:16`** — story-tall; crops outfit/face hard in 4:5  
- **`1:1`** — workable only as a last resort  

### Full-width break (different pattern)

A magazine-style **row break** between product rows may use **`16:9`**. That is **not** an Amazon insert tile.

## Placement

1. **Catalog page:** **`/reels`** — full set of category clips.  
2. **Product scroll randomizer (live):** `ProductGrid` + `interleaveReelInserts` inject reels into shop / home / PDP “similar” grids at product-card size.  
   - Pool = `CATEGORY_REELS` (grows as you add clips)  
   - **Cross-promo:** excludes the room the shopper is already in (`excludeCategory`)  
   - Density: ~1 insert per `every` products (shop default 5; home 4; PDP 3)  
   - Seeded per list + day so order is stable within a session/filter, reshuffles daily  
   - Click → `/shop?cat={reel}` + GA `reel_insert_click`

## Storage & Imagine ZDR

- Preferred static ship path: `public/brand/videos/reels/{category}.mp4`  
- Posters: `public/brand/videos/reels/posters/{category}.jpg`  
- ZDR upload path: mint `upload_url` via R2 — see [`imagine-r2-videos.md`](./imagine-r2-videos.md).  
- Keys can use `video/reels/{category}.mp4` on R2 when not bundling in `public/`.  

### Production pipeline (Product Reels `/reels`)

1. Fashion stills: Imagine `image_gen` at **3:4** → `public/brand/videos/reels/posters/{cat}.jpg`  
2. Full generative motion: `python3 scripts/generate-category-reels.py`  
   - mints dynamic R2 `upload_url` via Worker  
   - calls xAI `POST /v1/videos/generations` with `output.upload_url`  
   - downloads MP4 into `public/brand/videos/reels/{cat}.mp4`  
3. Single clip: `python3 scripts/imagine-video.py --image … --out …`  
   (see [`imagine-r2-videos.md`](./imagine-r2-videos.md))

## Related

- Product card: `src/components/ProductCard.tsx` → `aspect-[4/5]`  
- Insert tile: `src/components/ReelInsertCard.tsx`  
- Grid wrapper: `src/components/ProductGrid.tsx`  
- Interleave logic: `src/lib/reelInserts.ts`  
- Reels data: `src/data/reels.ts`  
- Persona face rules (when using house models): [`persona-portfolio-rules.md`](./persona-portfolio-rules.md)  
