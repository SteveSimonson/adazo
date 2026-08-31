/** Sibling `.webp` path for a raster still, or null when already webp/svg/data. */
export function webpPath(src: string): string | null {
  if (!src) return null
  if (/\.webp($|\?)/i.test(src)) return null
  if (!/\.(jpe?g|png)($|\?)/i.test(src)) return null
  return src.replace(/\.(jpe?g|png)($|\?)/i, '.webp$2')
}
