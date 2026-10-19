import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PRIVACY_HTML as HTML } from '../data/legalHtml'

/** Minimum Privacy Policy for Adazo Amazon Associates site. Not a substitute for legal counsel. */
export function Privacy() {
  return (
    <div className="pb-24">
      <Seo
        title="Privacy Policy"
        description="Privacy Policy for Adazo (adazo.com)."
        path="/privacy"
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-8">Privacy Policy</h1>
        <div
          className="legal-prose space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed [&_h2]:text-ink [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: HTML }}
        />
        <p className="mt-10 text-sm text-muted">
          <Link to="/" className="hover:underline">
            Home
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
