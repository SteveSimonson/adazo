import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { formatExpiry, limitedTimeCopy } from '../data/catalog'
import { VIBE_LIST, vibePath } from '../data/vibes'
import type { Category } from '../data/types'
import { GlobalSeo } from './Seo'

type NavItem =
  | { kind: 'link'; to: string; label: string }
  | { kind: 'shop'; mode: 'cat'; cat: Category; label: string }

const nav: NavItem[] = [
  { kind: 'link', to: '/quiz', label: 'Vibe check' },
  { kind: 'shop', mode: 'cat', cat: 'skincare', label: 'Skincare' },
  { kind: 'shop', mode: 'cat', cat: 'hair', label: 'Hair' },
  { kind: 'shop', mode: 'cat', cat: 'makeup', label: 'Makeup' },
  { kind: 'shop', mode: 'cat', cat: 'body', label: 'Body' },
  { kind: 'shop', mode: 'cat', cat: 'sun-spf', label: 'SPF' },
]

function shopHref(item: Extract<NavItem, { kind: 'shop' }>) {
  return `/shop?cat=${item.cat}`
}

function useShopNavActive() {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const cat = params.get('cat') || ''
  const onShop = pathname === '/shop' || pathname.startsWith('/shop/')

  return (item: NavItem): boolean => {
    if (item.kind === 'link') {
      if (item.to === '/quiz') return pathname.startsWith('/quiz')
      return pathname === item.to
    }
    if (!onShop) return false
    return cat === item.cat
  }
}

function navClass(active: boolean) {
  return `px-3.5 py-2 rounded-full text-[13px] font-semibold transition whitespace-nowrap ${
    active
      ? 'bg-ink text-paper'
      : 'text-ink-soft hover:bg-paper-2 hover:text-ink'
  }`
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const limited = limitedTimeCopy()
  const until = formatExpiry(limited.expiresAt ?? undefined)
  const isActive = useShopNavActive()

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalSeo />
      <div className="bg-moss text-paper text-center text-[11px] sm:text-xs py-2.5 px-4 font-medium tracking-wide">
        <Link
          to="/shop?limited=1"
          className="hover:underline underline-offset-2"
        >
          <span className="font-semibold text-gold">Limited-time options</span>
          {limited.count > 0 ? ` · ${limited.count} this week` : ''}
          {until ? ` · Refresh ${until}` : ''}
          <span className="text-paper/70">
            {' '}
            · Shop on Adazo · Buy on Amazon
          </span>
        </Link>
      </div>

      <header className="sticky top-0 z-50 bg-paper/92 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(26,20,24,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-[4.75rem] flex items-center justify-between gap-4">
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
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = isActive(item)
              if (item.kind === 'link') {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={navClass(active)}
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={item.cat}
                  to={shopHref(item)}
                  className={navClass(active)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-2 text-[13px] font-semibold text-ink-soft hover:bg-paper-2 transition"
            >
              <Search className="size-3.5" />
              Shop
            </Link>
            <Link to="/shop?limited=1" className="btn-primary !px-4 !py-2.5 text-xs">
              This week
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 rounded-full border border-line"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-line bg-paper px-4 py-4 space-y-1">
            {nav.map((item) => {
              const to = item.kind === 'link' ? item.to : shopHref(item)
              return (
                <Link
                  key={to}
                  to={to}
                  className="block px-3 py-2.5 rounded-xl font-semibold text-ink hover:bg-paper-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
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
              Curated Amazon Best Sellers and concern-first routines for women’s
              health and beauty. Discover here. Buy on Amazon.
            </p>
          </div>
          <div>
            <p className="label-micro mb-3">Shop</p>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/shop" className="hover:text-bamboo">
                  All products
                </Link>
              </li>
              <li>
                <Link to="/shop?limited=1" className="hover:text-bamboo">
                  This week’s edit
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-bamboo">
                  Vibe check
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-micro mb-3">Vibes</p>
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
              As an Amazon Associate, Adazo earns from qualifying purchases.
              Prices and availability are set by Amazon and may change.
            </p>
          </div>
        </div>
        <div className="border-t border-line py-4 text-center text-xs text-muted">
          © {new Date().getFullYear()} Adazo · adazo.com
        </div>
      </footer>
    </div>
  )
}
