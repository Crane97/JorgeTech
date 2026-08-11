import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Locale } from '../i18n'
import type { Chrome } from '../content/chrome'
import { logoMark } from '../lib/assets'
import { LanguageSwitcher } from './LanguageSwitcher'

const HOME_LINKS = [
  { id: 'projects', key: 'projects' as const, to: '/#projects' },
  { id: 'resume', key: 'resume' as const, to: '/#resume' },
  { id: 'stack', key: 'stack' as const, to: '/#stack' },
  { id: 'about', key: 'about' as const, to: '/about' },
  { id: 'contact', key: 'contact' as const, to: '/#contact' },
]

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

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
  const reduce = useReducedMotion()
  const location = useLocation()
  const onProjectsPage = location.pathname.startsWith('/projects')

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

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const projectsHref = onProjectsPage ? '/projects' : '/#projects'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled || open
          ? 'border-b border-line/80 bg-bg/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoMark} alt="" className="h-7 w-7 object-contain" />
          <span className="text-sm font-medium tracking-tight text-ink sm:text-[15px]">
            {chrome.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {HOME_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.id === 'projects' ? projectsHref : link.to}
              className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink"
            >
              {chrome.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
          <button
            type="button"
            className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 bg-surface text-ink lg:hidden"
            aria-label={open ? chrome.nav.closeMenu : chrome.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-line bg-surface lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <nav
              className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-4"
              aria-label="Mobile"
            >
              {HOME_LINKS.map((link) => (
                <Link
                  key={link.id}
                  to={link.id === 'projects' ? projectsHref : link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-ink transition-colors hover:bg-bg"
                >
                  {chrome.nav[link.key]}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
