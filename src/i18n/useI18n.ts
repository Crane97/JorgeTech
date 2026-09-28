import { createContext, useContext } from 'react'
import type { Locale, Translation } from './index'

export type I18nValue = {
  locale: Locale
  t: Translation
  /** Prefixes an app path (`/projects#id`, `/#contact`) with the active locale. */
  lp: (path: string) => string
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
