# Adazo agent notes

## Product thesis

**Women’s beauty & Riviera finish.** Discover on Adazo; buy on Amazon.

## Product page enrichment

Every catalog SKU should have long-form enrichment (review snapshot, item blog, FAQ, setup tips) so PDPs rank and convert as destinations—not thin affiliate hops.

- **Rules:** [`docs/PRODUCT-ENRICHMENT-RULES.md`](docs/PRODUCT-ENRICHMENT-RULES.md)
- **Skill:** `~/.grok/skills/product-page-enrichment` (`/product-page-enrichment`)
- **Data:** `src/data/productEnrichments.ts` via `getProductEnrichment(slug)`
- **UI:** `src/components/ProductEnrichment.tsx` on `Product.tsx`
- **Research:** TinyFish via `npm run content:research` → synthesize original Adazo prose (warm Riviera; never clinical cure claims; never paste scraped reviews)
- **SEO:** FAQPage JSON-LD when FAQs exist (`productSeo` in `seoData.ts`); `scripts/route-meta.ts` must call `productSeo` **with** enrichment

## Persona modeling / campaign images

**Read and obey** [`docs/persona-portfolio-rules.md`](docs/persona-portfolio-rules.md) before generating or replacing any persona avatar, house campaign, or World Edit travel still.

Non-negotiables:

1. Control avatar = face reference only (never the shipped campaign).
2. Every campaign slot needs a **unique pose** and **unique wardrobe** vs control and vs other campaigns for that model.
3. Composite **ADAZO** branding in code — do not rely on the image model for type.
4. Run the pre-ship checklist in that doc (side-by-side audit) before merge.

Ship via PR ship-gate; do not land campaign assets only on `main` without review.

## Café Edit lifestyle films

Persona pages ship a **Café Edit** series: 16:9 muted ~6s films of each house model in an upscale café worldwide. Assets live under `public/brand/videos/cafe/` (mp4 + `posters/`). Data: last campaign slot on each vibe in `src/data/vibes.ts` with season `Café Edit · Lifestyle film`. UI: video-first block in `src/pages/Vibe.tsx` (`CafeEditSection`). Also listed on `/watch` under the Café filter (`src/data/videoWatch.ts`). Do **not** put café stills in the flip magazine (16:9 lifestyle, not fashion spreads).

## Amazon insert video size

Clips meant to sit **in the product grid** (same cell as a product card) use **4:5 portrait, 6s, 720p**, muted. Stage Imagine stills at **3:4** if needed. Full note: [`docs/amazon-insert-video.md`](docs/amazon-insert-video.md). Product Reels page: `/reels`.

**Grid randomizer:** `ProductGrid` interleaves full `CATEGORY_REELS` (all generations) into shop/home/PDP lists for cross-category promo. Exclude the current room with `excludeCategory`. Add a new generation (one clip per category) in `src/data/reels.ts` — pool variety grows; density caps stay the same. See insertion protocol in [`docs/amazon-insert-video.md`](docs/amazon-insert-video.md).

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
