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

## Placement roadmap

1. **Now:** category fashion reels on **`/reels`** (Product Reels page) — one clip per shop category, 4:5 well.  
2. **Later:** randomizer picks from the insert pool and injects into product grids (shop / home / PDP related) at product-card size.

## Storage & Imagine ZDR

- Preferred static ship path: `public/brand/videos/reels/{category}.mp4`  
- Posters: `public/brand/videos/reels/posters/{category}.jpg`  
- ZDR upload path: mint `upload_url` via R2 — see [`imagine-r2-videos.md`](./imagine-r2-videos.md).  
- Keys can use `video/reels/{category}.mp4` on R2 when not bundling in `public/`.  

### Current v1 pipeline (Product Reels `/reels`)

1. Fashion stills generated with Imagine `image_gen` at **3:4**.  
2. Clips encoded to **720×900 (4:5), 6s, muted H.264** with a light Ken Burns push (local imageio) because `image_to_video` still requires `output.upload_url` for ZDR and the agent tool does not yet pass that field.  
3. R2 mint/PUT is ready for true Imagine motion once the tool accepts `upload_url` — regenerate clips without changing the reels page paths.

## Related

- Product card: `src/components/ProductCard.tsx` → `aspect-[4/5]`  
- Reels data: `src/data/reels.ts`  
- Persona face rules (when using house models): [`persona-portfolio-rules.md`](./persona-portfolio-rules.md)  
