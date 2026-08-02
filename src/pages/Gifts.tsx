import { Link } from 'react-router-dom'
import { ArrowRight, Gift } from 'lucide-react'
import {
  BUDGET_LABELS,
  RECIPIENT_LABELS,
  giftGuides,
} from '../data/giftGuides'
import { getProduct, primaryImage } from '../data/catalog'
import { Seo } from '../components/Seo'
import { giftsHubSeo } from '../lib/seoData'

function guideCardImage(slug: string, heroImage?: string): string | undefined {
  if (heroImage) return heroImage
  const guide = giftGuides.find((g) => g.slug === slug)
  const first = guide?.productEntries[0]?.productSlug
  if (!first) return undefined
  const p = getProduct(first)
  return p ? primaryImage(p) || p.images?.[0] : undefined
}

export function GiftsHubPage() {
  return (
    <div className="pb-24">
      <Seo {...giftsHubSeo()} />
      <section className="relative border-b border-line bg-moss overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-moss via-[#4a2430] to-bamboo-deep opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(183,110,121,0.35),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <p className="label-micro mb-3 inline-flex items-center gap-1.5 !text-gold">
            <Gift className="size-3.5" /> Gift edit
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold max-w-2xl text-balance leading-[1.05] text-paper">
            Gifts worth unwrapping
          </h1>
          <p className="mt-4 text-lg text-paper/80 max-w-xl font-light leading-relaxed">
            Beauty listicles locked to Adazo’s shelf — for her, mom, wife,
            self-care, and under $50. Chosen here. Bought on Amazon.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {giftGuides.map((g) => (
              <Link
                key={g.slug}
                to={`/gifts/${g.slug}`}
                className="rounded-full border border-paper/20 bg-paper/10 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-paper/90 hover:border-gold/50 hover:text-gold transition"
              >
                {g.primaryQuery}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="label-micro mb-1">Wave one</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Start with the recipient
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {giftGuides.map((g) => {
            const recipients = g.recipientIds
              .map((id) => RECIPIENT_LABELS[id] || id)
              .filter(Boolean)
              .slice(0, 2)
            const budgets = g.budgetBands
              .map((b) => BUDGET_LABELS[b])
              .filter(Boolean)
              .slice(0, 2)
            const img = guideCardImage(g.slug, g.heroImage)
            return (
              <Link
                key={g.slug}
                to={`/gifts/${g.slug}`}
                className="group rounded-2xl border border-line bg-card overflow-hidden flex flex-col hover:border-bamboo/35 transition shadow-[0_4px_24px_-16px_rgba(26,20,24,0.35)]"
              >
                <div className="aspect-[16/10] bg-paper-2 border-b border-line relative overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cream to-leaf/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-bamboo">
                    {recipients.join(' · ') || 'Gift guide'}
                    {g.readMinutes ? ` · ${g.readMinutes} min` : ''}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-bamboo transition leading-snug">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-3 flex-1 leading-relaxed">
                    {g.dek}
                  </p>
                  {budgets.length > 0 && (
                    <p className="mt-3 text-[11px] text-muted">
                      {budgets.join(' · ')} · {g.productEntries.length} picks
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-bamboo">
                    Open guide <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
