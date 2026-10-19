import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ABOUT_HTML as HTML } from '../data/legalHtml'

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
