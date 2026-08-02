import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { formatExpiry, limitedTimeCopy } from '../data/catalog'
import { VIBE_LIST, vibePath } from '../data/vibes'
import { BRAND } from '../data/brand'
import { GlobalSeo } from './Seo'

/** Lean primary nav — categories live on /shop, not the header. */
const primaryNav = [
  { to: '/shop', label: 'Shop', match: (path: string) => path === '/shop' || path.startsWith('/shop') || path.startsWith('/product/') },
  { to: '/gifts', label: 'Gifts', match: (path: string) => path.startsWith('/gifts') },
  { to: '/quiz', label: 'Vibe', match: (path: string) => path.startsWith('/quiz') || path.startsWith('/vibe/') },
  { to: '/watch', label: 'Watch', match: (path: string) => path.startsWith('/watch') || path.startsWith('/reels') },
] as const

function navClass(active: boolean) {
  return `px-3.5 py-2 rounded-full text-[13px] font-semibold transition whitespace-nowrap ${
    active
      ? 'bg-ink text-paper'
      : 'text-ink-soft hover:bg-paper-2 hover:text-ink'
  }`
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const drop = limitedTimeCopy()
  const until = formatExpiry(drop.expiresAt ?? undefined)
  const onShop = pathname === '/shop' || pathname.startsWith('/shop')
  const limitedMode = onShop && searchParams.get('limited') === '1'
  // When already filtering to this week, offer escape — not another trap door
  const weekCta = limitedMode
    ? { to: '/shop', label: 'Full collection', primary: false as const }
    : { to: '/shop?limited=1', label: 'This week', primary: true as const }

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalSeo />
      {limitedMode ? (
        <div className="bg-[#9a3412] text-white text-center text-[11px] sm:text-xs py-2.5 px-4 font-medium tracking-wide">
          <span className="font-semibold">Filter on · This week only</span>
          {drop.count > 0 ? ` · ${drop.count} pieces` : ''}
          <span className="text-white/75"> · not the full house</span>
          {' · '}
          <Link
            to="/shop"
            className="font-bold underline underline-offset-2 hover:text-gold"
          >
            Show full collection
          </Link>
        </div>
      ) : (
        <div className="bg-moss text-paper text-center text-[11px] sm:text-xs py-2.5 px-4 font-medium tracking-wide">
          <Link
            to="/shop?limited=1"
            className="hover:underline underline-offset-2"
          >
            <span className="font-semibold text-gold">This week’s selection</span>
            {drop.count > 0 ? ` · ${drop.count} pieces` : ''}
            {until ? ` · Until ${until}` : ''}
            <span className="text-paper/70">
              {' '}
              · {BRAND.mottoEn}
            </span>
          </Link>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-paper/92 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(26,20,24,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-[4.75rem] flex items-center justify-between gap-3 sm:gap-4">
          <Link
            to="/"
            className="group flex items-center shrink-0 py-1"
            aria-label="Adazo home"
          >
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-moss group-hover:text-bamboo-deep transition">
              Adazo
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Primary"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={navClass(item.match(pathname))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={weekCta.to}
              className={
                weekCta.primary
                  ? 'btn-primary !px-3.5 sm:!px-4 !py-2.5 text-xs'
                  : 'inline-flex items-center justify-center rounded-full border-2 border-[#9a3412] text-[#9a3412] bg-white px-3.5 sm:px-4 py-2.5 text-xs font-bold hover:bg-[#fff7ed] transition'
              }
            >
              {weekCta.label}
            </Link>
            <button
              type="button"
              className="md:hidden p-2 rounded-full border border-line"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-line bg-paper px-4 py-4 space-y-1">
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-3 py-2.5 rounded-xl font-semibold ${
                  item.match(pathname)
                    ? 'bg-ink text-paper'
                    : 'text-ink hover:bg-paper-2'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={weekCta.to}
              className={`block px-3 py-2.5 rounded-xl font-semibold ${
                limitedMode
                  ? 'bg-[#fff7ed] text-[#9a3412]'
                  : 'text-ink hover:bg-paper-2'
              }`}
              onClick={() => setOpen(false)}
            >
              {weekCta.label}
            </Link>
            <Link
              to="/reels"
              className="block px-3 py-2.5 rounded-xl font-semibold text-ink hover:bg-paper-2"
              onClick={() => setOpen(false)}
            >
              Films
            </Link>
            <Link
              to="/why"
              className="block px-3 py-2.5 rounded-xl font-semibold text-ink hover:bg-paper-2"
              onClick={() => setOpen(false)}
            >
              Our story
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-cream mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-semibold text-moss">Adazo</p>
            <p className="text-sm text-ink-soft mt-3 leading-relaxed max-w-xs">
              {BRAND.footerBlurb}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-bamboo">
              {BRAND.mark}
            </p>
          </div>
          <div>
            <p className="label-micro mb-3">The house</p>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/shop" className="hover:text-bamboo">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/gifts" className="hover:text-bamboo">
                  Gifts
                </Link>
              </li>
              <li>
                <Link to="/shop?limited=1" className="hover:text-bamboo">
                  This week
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-bamboo">
                  Your persona
                </Link>
              </li>
              <li>
                <Link to="/watch" className="hover:text-bamboo">
                  Watch
                </Link>
              </li>
              <li>
                <Link to="/reels" className="hover:text-bamboo">
                  Films
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-micro mb-3">Personas</p>
            <ul className="space-y-2 text-sm font-medium">
              {VIBE_LIST.map((v) => (
                <li key={v.id}>
                  <Link to={vibePath(v.id)} className="hover:text-bamboo">
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-micro mb-3">About</p>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/why" className="hover:text-bamboo">
                  Our story
                </Link>
              </li>
            </ul>
            <p className="text-xs text-muted mt-6 leading-relaxed">
              {BRAND.affiliateDisclosure}
            </p>
          </div>
        </div>
        <div className="border-t border-line py-4 text-center text-xs text-muted">
          © {new Date().getFullYear()} Adazo · Since {BRAND.founded} · adazo.com
        </div>
      </footer>
    </div>
  )
}
