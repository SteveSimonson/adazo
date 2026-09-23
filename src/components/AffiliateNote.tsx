import { BRAND } from '../data/brand'

/** Commission line that must sit with each Amazon checkout button. */
export function AffiliateNote({ className = '' }: { className?: string }) {
  return (
    <p className={`mt-1.5 text-[11px] leading-snug text-muted ${className}`}>
      {BRAND.affiliateDisclosure}
    </p>
  )
}
