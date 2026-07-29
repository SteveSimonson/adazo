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

---

## Generations (creative waves)

Reels ship in **generations** — a full set of one new clip **per shop category**.

| Generation | Paths | Role |
|------------|--------|------|
| **Gen 1** | `reels/{cat}.mp4` · `posters/{cat}.jpg` | Launch / original wave |
| **Gen 2** | `reels/{cat}-g2.mp4` · `posters/{cat}-g2.jpg` | Second creative wave (new pose, wardrobe, light) |
| **Gen N** | `reels/{cat}-gN.mp4` · `posters/{cat}-gN.jpg` | Future waves |

Rules when adding a generation:

1. **One new still + one new Imagine video per category** (same insert size).  
2. **New scene** — different pose/wardrobe/setting vs prior gens for that room (not a re-export).  
3. Register in `src/data/reels.ts` (`REELS_GEN2`, …) and bump `REEL_LATEST_GENERATION`.  
4. Catalog on **`/reels`** (grouped by generation).  
5. Full pool **`CATEGORY_REELS`** = gen1 ∪ gen2 ∪ … feeds the **insert protocol** below.

More generations → **more variety** in inserts, **not** denser inserts by default (density caps stay the same).

---

## Insertion protocol (product scroll)

### Plain English

1. While someone browses a **product grid**, we sometimes drop a **fashion reel tile** into the stream — same size as a product card.  
2. That tile is picked from the **full multi-generation pool** of category reels.  
3. If they’re already in a room (e.g. Handbags), we **don’t** insert handbags reels — only **other** categories (cross-promo).  
4. About **one reel every few products**, with a **cap** so the grid doesn’t turn into a video wall.  
5. For a given list/filter, the mix is **stable for the UTC day** (not reshuffled every reload); **next day** it can reshuffle.  
6. Tap → shop that category. Video is **muted**, loops, plays when on screen.

### Where

| Surface | Density | Cap |
|---------|---------|-----|
| **Shop** grid | ~every **5** products | **6** inserts max |
| **Home** product rows | ~every **4** | **1–2** |
| **PDP** similar / also-like | ~every **3** | **2** |
| Lists with **&lt; 3** products | — | **no** inserts |

### Technical

| Piece | Detail |
|-------|--------|
| Pool | `CATEGORY_REELS` in `src/data/reels.ts` (all gens) |
| Interleave | `interleaveReelInserts` → `src/lib/reelInserts.ts` |
| UI grid | `ProductGrid` + `ReelInsertCard` |
| Cross-promo | `excludeCategory` = current shop room / PDP category |
| Seed | `listName + exclude + YYYY-MM-DD (UTC) + product ids` |
| Click analytics | GA `reel_insert_click` |
| Full catalog | `/reels` (gen sections) |

### Not a cron job

Shuffle is **computed on the client** when the grid renders. Same seed → same order until the day or product list changes. **No** daily cron or server job.

---

## Storage & Imagine ZDR

| Asset | Path |
|-------|------|
| Gen 1 video | `public/brand/videos/reels/{category}.mp4` |
| Gen 1 poster | `public/brand/videos/reels/posters/{category}.jpg` |
| Gen 2 video | `public/brand/videos/reels/{category}-g2.mp4` |
| Gen 2 poster | `public/brand/videos/reels/posters/{category}-g2.jpg` |
| R2 (optional) | `video/reels/{category}-g2.mp4` via mint — see [`imagine-r2-videos.md`](./imagine-r2-videos.md) |

### Production pipeline

1. Fashion stills: Imagine `image_gen` @ **3:4** → poster path for that gen.  
2. Full generative motion: `scripts/imagine-video.py` with R2 `output.upload_url` (not Ken Burns).  
3. Batch: `python3 scripts/generate-category-reels.py --gen 2` (or list categories).  
4. Wire paths + motion copy in `src/data/reels.ts`.  
5. Ship; inserts pick up new ids automatically.

```bash
# One gen-2 clip
python3 scripts/imagine-video.py \
  --image 'https://adazo.com/brand/videos/reels/posters/handbags-g2.jpg' \
  --name handbags-g2 \
  --key 'video/reels/handbags-g2.mp4' \
  --prompt 'City-step stride, bag at hip in golden hour…' \
  --out public/brand/videos/reels/handbags-g2.mp4 \
  --duration 6 --resolution 720p --aspect-ratio 3:4
```

---

## Related

- Product card: `src/components/ProductCard.tsx` → `aspect-[4/5]`  
- Insert tile: `src/components/ReelInsertCard.tsx`  
- Grid wrapper: `src/components/ProductGrid.tsx`  
- Interleave: `src/lib/reelInserts.ts`  
- Reels data: `src/data/reels.ts`  
- Persona rules: [`persona-portfolio-rules.md`](./persona-portfolio-rules.md)  
