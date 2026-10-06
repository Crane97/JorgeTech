import { en } from './en.ts'
import { es } from './es.ts'
import { fr } from './fr.ts'

export type Locale = 'en' | 'es' | 'fr'

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALES: { code: Locale; label: string; og: string }[] = [
  { code: 'en', label: 'EN', og: 'en_US' },
  { code: 'es', label: 'ES', og: 'es_ES' },
  { code: 'fr', label: 'FR', og: 'fr_FR' },
]

export const translations = { en, es, fr } as const

export type Translation = (typeof translations)[Locale]

export const SITE_URL = 'https://jorge-tech.vercel.app'

/** Pages that exist in every locale, used for routing, hreflang and prerendering. */
export const PAGES = ['home', 'about'] as const
export type Page = (typeof PAGES)[number]

const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  about: '/about',
}

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'es' || value === 'fr'
}

/** English lives at the root; other locales get a `/es`, `/fr` prefix. */
export function localizePath(path: string, locale: Locale) {
  const [pathname, hash] = path.split('#')
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  const base = pathname === '/' || pathname === '' ? prefix || '/' : `${prefix}${pathname}`
  return hash ? `${base}#${hash}` : base
}

/** Splits `/es/projects` into `{ locale: 'es', path: '/projects' }`. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = pathname.match(/^\/(es|fr)(?=\/|$)(.*)$/)
  if (!match) return { locale: DEFAULT_LOCALE, path: pathname || '/' }
  return { locale: match[1] as Locale, path: match[2] || '/' }
}

export function pageFromPath(path: string): Page {
  const found = PAGES.find((page) => page !== 'home' && PAGE_PATHS[page] === path)
  return found ?? 'home'
}

export function pageUrl(page: Page, locale: Locale) {
  const path = localizePath(PAGE_PATHS[page], locale)
  return `${SITE_URL}${path === '/' ? '/' : path}`
}
