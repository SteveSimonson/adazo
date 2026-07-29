# Adazo agent notes

## Persona modeling / campaign images

**Read and obey** [`docs/persona-portfolio-rules.md`](docs/persona-portfolio-rules.md) before generating or replacing any persona avatar, house campaign, or World Edit travel still.

Non-negotiables:

1. Control avatar = face reference only (never the shipped campaign).
2. Every campaign slot needs a **unique pose** and **unique wardrobe** vs control and vs other campaigns for that model.
3. Composite **ADAZO** branding in code — do not rely on the image model for type.
4. Run the pre-ship checklist in that doc (side-by-side audit) before merge.

Ship via PR ship-gate; do not land campaign assets only on `main` without review.

## Imagine video (R2 / ZDR)

Campaign **`image_to_video`** needs a Zero Data Retention **`upload_url`**. Mint one from the Worker (R2 bucket `adazo-media`), then pass it to Imagine. Full flow: [`docs/imagine-r2-videos.md`](docs/imagine-r2-videos.md).

```bash
# Requires MEDIA_UPLOAD_SECRET (wrangler secret)
curl -sS -X POST 'https://adazo.com/api/media/upload-url' \
  -H "Authorization: Bearer $MEDIA_UPLOAD_SECRET" \
  -H 'Content-Type: application/json' \
  -d '{"kind":"video","name":"my-clip","contentType":"video/mp4"}'
# → upload_url (PUT target) + public_url (GET https://adazo.com/media/…)
```
