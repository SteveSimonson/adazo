import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

const HTML = `<p><strong>Adazo</strong> is a curated Amazon Associates storefront for women’s health and beauty. Discover products, guides, and gift lists here; complete purchases on Amazon.</p>

<h2>Who we are</h2>
<p>We publish an editorial catalog of skin, hair, fragrance, makeup, body, sun, lips, tools, and related rituals — chosen for finish and everyday fit, not for clinical claims. Adazo is operated by SYMO, LLC (Sheridan, Wyoming, USA). We are <strong>not</strong> the seller of record. We do not warehouse, ship, or process payment for the products featured on <strong>https://adazo.com</strong>.</p>

<h2>How shopping works</h2>
<p>Each listing and guide is written so you can compare texture, ritual, and occasion before you buy. Outbound links send you to Amazon (or another retailer) to check live price, seller, size, and returns. Their checkout, shipping, and customer service apply to your order.</p>

<h2>Amazon Associates</h2>
<p>We are a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we may earn a commission on qualifying purchases made through links on the Site. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.</p>

<h2>Editorial, not medical advice</h2>
<p>Guides, FAQs, and product notes are shopping editorial for general information. They are not medical, dermatological, or other professional advice. Always read the manufacturer’s directions and warnings, and speak with a qualified professional when your health is involved.</p>

<h2>The house</h2>
<p>The founding legend — Ada Zoppi, the Brianza hills, 1726 — lives on our story page. This About page is the factual storefront: a women’s health and beauty edit, bought on Amazon.</p>

<h2>Contact</h2>
<p>Questions: use the contact options on this website. Operator: SYMO, LLC, Sheridan, Wyoming, USA.</p>`

/** Storefront About page — crawlable counterpart to Privacy / Terms. */
export function About() {
  return (
    <div className="pb-24">
      <Seo
        title="About Adazo"
        description="Adazo is a curated Amazon Associates storefront for women’s health and beauty. Discover on Adazo; buy on Amazon."
        path="/about"
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">About</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-8">About Adazo</h1>
        <div
          className="legal-prose space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed [&_h2]:text-ink [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: HTML }}
        />
        <p className="mt-10 text-sm text-muted">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {' · '}
          <Link to="/why" className="hover:underline">
            Our story
          </Link>
          {' · '}
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          {' · '}
          <Link to="/terms" className="hover:underline">
            Terms of Use
          </Link>
        </p>
      </article>
    </div>
  )
}
