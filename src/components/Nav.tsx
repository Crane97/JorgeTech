import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { Locale } from '../i18n'
import type { Chrome } from '../content/chrome'
import { logoMark } from '../lib/assets'
import { LanguageSwitcher } from './LanguageSwitcher'

const LINKS = [
  { id: 'projects', key: 'projects' as const },
  { id: 'experience', key: 'experience' as const },
  { id: 'stack', key: 'stack' as const },
  { id: 'about', key: 'about' as const },
  { id: 'resume', key: 'resume' as const },
  { id: 'contact', key: 'contact' as const },
]

export function Nav({
  chrome,
  locale,
  onLocaleChange,
}: {
  chrome: Chrome
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled || open
          ? 'border-b border-line/80 bg-bg/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoMark} alt="" className="h-7 w-7 object-contain" />
          <span className="text-sm font-medium tracking-tight text-ink sm:text-[15px]">
            {chrome.brand}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-muted transition-colors duration-200 hover:text-ink"
            >
              {chrome.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
          <button
            type="button"
            className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-ink lg:hidden"
            aria-label={open ? chrome.nav.closeMenu : chrome.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-surface lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-4" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-ink transition-colors hover:bg-bg"
              >
                {chrome.nav[link.key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
