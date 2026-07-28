import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { whySeo } from '../lib/seoData'

export function Why() {
  return (
    <div>
      <Seo {...whySeo()} />
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#5c2e3a] via-[#8b4a58] to-[#1a1216]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full pb-14 pt-28">
          <p className="label-micro !text-gold mb-3">Our story</p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-white max-w-2xl leading-tight">
            Calm discovery for women’s beauty on Amazon.
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 space-y-10">
        <p className="text-xl text-ink-soft font-light leading-relaxed">
          Adazo is a curated Amazon affiliate destination for women’s health and
          beauty. We bring the weekly Best Sellers edit and concern-first
          shortlists together; Amazon handles the checkout you already trust.
        </p>

        <div className="space-y-8">
          {[
            {
              t: 'Curation first',
              d: 'We focus on products women actually research — skincare, hair, makeup, body, SPF, and tools — with clear “best for” context instead of endless undifferentiated grids.',
            },
            {
              t: 'Weekly Best Sellers',
              d: 'Amazon Best Seller ranks move. Our limited-time beauty edit refreshes so you see what’s rising now — not a stale list from last year.',
            },
            {
              t: 'Shop here. Buy on Amazon.',
              d: 'Explore photography, ratings, and related picks on Adazo. When you are ready, continue to Amazon as an authorized Associate purchase — familiar shipping, returns, and seller guarantees.',
            },
            {
              t: 'Honest language',
              d: 'We avoid medical overclaims. Copy stays practical: popular, highly rated, often used for — with FTC affiliate disclosure always present.',
            },
          ].map((x) => (
            <div key={x.t} className="border-t border-line pt-8">
              <h2 className="font-display text-2xl font-semibold">{x.t}</h2>
              <p className="text-ink-soft mt-2 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-line bg-cream p-8">
          <p className="text-sm text-ink-soft leading-relaxed">
            <strong className="text-ink">Affiliate disclosure:</strong> As an
            Amazon Associate, Adazo earns from qualifying purchases. That does
            not change the price you pay on Amazon.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link to="/shop" className="btn-primary">
            Shop the collection <ArrowRight className="size-4" />
          </Link>
          <Link to="/quiz" className="btn-secondary">
            Take the vibe check
          </Link>
        </div>
      </div>
    </div>
  )
}
