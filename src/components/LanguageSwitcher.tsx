import { LOCALES, type Locale } from '../i18n'

export function LanguageSwitcher({
  locale,
  onChange,
  className = '',
}: {
  locale: Locale
  onChange: (locale: Locale) => void
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-xs tracking-wide ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-muted/50" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={locale === code}
            className={`btn-press transition-opacity duration-200 ${
              locale === code ? 'text-ink opacity-100' : 'text-muted opacity-70 hover:opacity-100'
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}
