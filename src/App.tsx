import { useEffect, useRef } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import { AboutPage } from './components/AboutPage'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { PointerGlow } from './components/PointerGlow'
import { ProjectsStack } from './components/ProjectsStack'
import { Resume } from './components/Resume'
import { ScrollProgress } from './components/ScrollProgress'
import { TechStack } from './components/TechStack'
import { LOCALES, localizePath, pageFromPath, splitLocale } from './i18n'
import { I18nProvider } from './i18n/I18nProvider'
import { useI18n } from './i18n/useI18n'
import { applyHead, buildHead } from './lib/seo'

/**
 * THESIS: Prove engineering quality through product-grade clarity, not agency spectacle.
 * OWN-WORLD: Cold product light, Geist, ink/blue accent, case-study storytelling.
 * STORY: Visitor trusts Jorge can ship high-quality software in under 4 minutes.
 * FIRST VIEWPORT: Brand name + positioning headline + work/contact CTAs.
 * FORM: Canon craft bar (Stripe/Vercel/Linear/Notion/Raycast/Apple) executed straight.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
function HomePage() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const firstRun = useRef(true)

  useEffect(() => {
    const initial = firstRun.current
    firstRun.current = false
    // Back/forward (e.g. closing a project modal) keeps the reader where they were.
    if (!location.hash || (navigationType === 'POP' && !initial)) return
    const id = location.hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash, navigationType])

  return (
    <main>
      <Hero />
      <ProjectsStack />
      <Resume />
      <TechStack />
      <Contact />
    </main>
  )
}

function DocumentHead() {
  const { locale } = useI18n()
  const { pathname } = useLocation()

  useEffect(() => {
    applyHead(buildHead(pageFromPath(splitLocale(pathname).path), locale))
  }, [pathname, locale])

  return null
}

/** The old /projects archive now lives in the home stack; `#id` opens that project. */
function LegacyProjectsRedirect() {
  const { lp } = useI18n()
  const { hash } = useLocation()
  const id = hash.replace(/^#/, '')
  return (
    <Navigate
      to={id ? { pathname: lp('/'), search: `?project=${encodeURIComponent(id)}` } : lp('/#projects')}
      replace
    />
  )
}

function NotFound() {
  const { lp } = useI18n()
  return <Navigate to={lp('/')} replace />
}

const PAGE_ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/projects', element: <LegacyProjectsRedirect /> },
  { path: '/about', element: <AboutPage /> },
]

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <DocumentHead />
        <PointerGlow>
          <ScrollProgress />
          <Nav />
          <Routes>
            {LOCALES.flatMap(({ code }) =>
              PAGE_ROUTES.map(({ path, element }) => (
                <Route
                  key={`${code}${path}`}
                  path={localizePath(path, code)}
                  element={element}
                />
              )),
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PointerGlow>
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App
