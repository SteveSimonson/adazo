import type { ImgHTMLAttributes } from 'react'
import { webpPath } from '../lib/media'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}

/**
 * Brand still with WebP source + JPEG/PNG fallback.
 * `picture` is `display: contents` so absolute/object-cover classes on img
 * still position against the nearest relative ancestor.
 */
export function PromoImage({ src, alt = '', ...rest }: Props) {
  const webp = webpPath(src)
  if (!webp) {
    return <img src={src} alt={alt} {...rest} />
  }
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={webp} />
      <img src={src} alt={alt} {...rest} />
    </picture>
  )
}
