import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage } from './components/AboutPage'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { PointerGlow } from './components/PointerGlow'
import { ProjectsPage } from './components/ProjectsPage'
import { ProjectsPreview } from './components/ProjectsPreview'
import { Resume } from './components/Resume'
import { ScrollProgress } from './components/ScrollProgress'
import { TechStack } from './components/TechStack'
import { getChrome } from './content/chrome'
import { translations, type Locale } from './i18n'

/**
 * THESIS: Prove engineering quality through product-grade clarity, not agency spectacle.
 * OWN-WORLD: Cold product light, Geist, ink/blue accent, case-study storytelling.
 * STORY: Visitor trusts Jorge can ship high-quality software in under 4 minutes.
 * FIRST VIEWPORT: Brand name + positioning headline + work/contact CTAs.
 * FORM: Canon craft bar (Stripe/Vercel/Linear/Notion/Raycast/Apple) executed straight.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
function AppShell({
  chrome,
  locale,
  onLocaleChange,
  children,
}: {
  chrome: ReturnType<typeof getChrome>
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  children: ReactNode
}) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <PointerGlow>
      <ScrollProgress />
      {!isHome ? (
        <Nav chrome={chrome} locale={locale} onLocaleChange={onLocaleChange} />
      ) : null}
      {children}
    </PointerGlow>
  )
}

function HomePage({
  chrome,
  t,
  locale,
}: {
  chrome: ReturnType<typeof getChrome>
  t: (typeof translations)[Locale]
  locale: Locale
}) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  return (
    <main>
      <Hero />
      <ProjectsPreview chrome={chrome} t={t} locale={locale} />
      <Resume chrome={chrome} t={t} />
      <TechStack chrome={chrome} />
      <Contact chrome={chrome} t={t} />
    </main>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = translations[locale]
  const chrome = getChrome(locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <BrowserRouter>
      <AppShell chrome={chrome} locale={locale} onLocaleChange={setLocale}>
        <Routes>
          <Route
            path="/"
            element={<HomePage chrome={chrome} t={t} locale={locale} />}
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage chrome={chrome} t={t} locale={locale} />
            }
          />
          <Route
            path="/about"
            element={<AboutPage chrome={chrome} t={t} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
