# Adazo agent notes

## Persona modeling / campaign images

**Read and obey** [`docs/persona-portfolio-rules.md`](docs/persona-portfolio-rules.md) before generating or replacing any persona avatar, house campaign, or World Edit travel still.

Non-negotiables:

1. Control avatar = face reference only (never the shipped campaign).
2. Every campaign slot needs a **unique pose** and **unique wardrobe** vs control and vs other campaigns for that model.
3. Composite **ADAZO** branding in code — do not rely on the image model for type.
4. Run the pre-ship checklist in that doc (side-by-side audit) before merge.

Ship via PR ship-gate; do not land campaign assets only on `main` without review.

## Amazon insert video size

Clips meant to sit **in the product grid** (same cell as a product card) use **4:5 portrait, 6s, 720p**, muted. Stage Imagine stills at **3:4** if needed. Full note: [`docs/amazon-insert-video.md`](docs/amazon-insert-video.md). Product Reels page: `/reels`.

**Grid randomizer:** `ProductGrid` interleaves `CATEGORY_REELS` into shop/home/PDP lists for cross-category promo. Exclude the current room with `excludeCategory`. Pool auto-grows when you add reels to `src/data/reels.ts`.

## Imagine video (R2 / ZDR)

**Do not use Ken Burns as a substitute.** Full generative video:

```bash
# Mints R2 upload_url dynamically, calls xAI videos API, downloads MP4
python3 scripts/imagine-video.py \
  --image 'https://adazo.com/…/first-frame.jpg' \
  --name my-clip \
  --prompt 'One clear motion…' \
  --out public/brand/videos/my-clip.mp4

# All product reels (4:5/3:4 insert size)
python3 scripts/generate-category-reels.py
```

Needs `MEDIA_UPLOAD_SECRET` + `XAI_API_KEY` (or Grok Build `~/.grok/auth.json`).  
Docs: [`docs/imagine-r2-videos.md`](docs/imagine-r2-videos.md).
