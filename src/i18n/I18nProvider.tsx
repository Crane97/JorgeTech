import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DEFAULT_LOCALE,
  isLocale,
  localizePath,
  splitLocale,
  translations,
  type Locale,
} from './index'
import { I18nContext, type I18nValue } from './useI18n'

const STORAGE_KEY = 'locale'

function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY) ?? undefined
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* Private mode / blocked storage: the URL still carries the locale. */
  }
}

function browserLocale(): Locale | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag?.slice(0, 2).toLowerCase()
    if (isLocale(base)) return base
  }
  return null
}

/**
 * The locale lives in the URL (`/`, `/es`, `/fr`), so every language has its
 * own shareable, indexable address. On landing on an English URL we redirect
 * once to the language picked in the switcher, or else the browser language.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, path } = splitLocale(location.pathname)
  const detected = useRef(false)

  useEffect(() => {
    if (detected.current) return
    detected.current = true
    // An explicit /es or /fr link wins; only the switcher stores a preference.
    if (locale !== DEFAULT_LOCALE) return
    const preferred = readStoredLocale() ?? browserLocale()
    if (preferred && preferred !== DEFAULT_LOCALE) {
      navigate(
        { pathname: localizePath(path, preferred), search: location.search, hash: location.hash },
        { replace: true },
      )
    }
  }, [locale, path, location.search, location.hash, navigate])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback(
    (next: Locale) => {
      storeLocale(next)
      if (next === locale) return
      navigate({ pathname: localizePath(path, next), search: location.search, hash: location.hash })
    },
    [locale, path, location.search, location.hash, navigate],
  )

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: translations[locale],
      lp: (to: string) => localizePath(to, locale),
      setLocale,
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
