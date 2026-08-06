import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Resume } from './components/Resume'
import { ScrollProgress } from './components/ScrollProgress'
import { TechStack } from './components/TechStack'
import { getChrome } from './content/chrome'
import { translations, type Locale } from './i18n'

/**
 * THESIS: Prove engineering quality through product-grade clarity, not agency spectacle.
 * OWN-WORLD: Cold product light, Geist, ink/blue accent, case-study storytelling.
 * STORY: Visitor trusts Jorge can ship high-quality software in under 4 minutes.
 * FIRST VIEWPORT: Brand name + positioning + work/contact CTAs over portrait plane.
 * FORM: Canon craft bar (Stripe/Vercel/Linear/Notion/Raycast/Apple) executed straight.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = translations[locale]
  const chrome = getChrome(locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div className="site-shell font-sans text-ink">
      <ScrollProgress />
      <Nav chrome={chrome} locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero chrome={chrome} t={t} />
        <Projects chrome={chrome} t={t} locale={locale} />
        <Experience chrome={chrome} t={t} />
        <TechStack chrome={chrome} />
        <About chrome={chrome} t={t} />
        <Resume chrome={chrome} t={t} />
        <Contact chrome={chrome} t={t} />
      </main>
    </div>
  )
}

export default App
