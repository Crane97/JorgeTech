import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const PORTRAIT_IMAGE =
  'https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/jorgerdelat' },
  { label: 'Email', href: 'mailto:jorge@macdiego.com' },
  { label: 'LinkedIn', href: '#' },
] as const

const EXPERIENCE = [
  {
    role: 'Customer Success',
    company: 'Zumex Group',
    place: 'Miami, Florida',
    dates: 'January 2026 — Now',
    points: [
      'Participated in trade shows and customer meetings, supporting product presentations and building relationships with distributors and end users.',
      'Collaborated with sales, marketing, and technical teams to improve customer experience and support strategic dealer development initiatives.',
    ],
  },
  {
    role: 'Software Consultant',
    company: 'Solera Inc',
    place: 'Seville, Spain',
    dates: 'September 2022 — December 2025',
    points: [
      'Participated in a Data Integration Middleware (ETL) project, focused on developing and enhancing its functionality.',
      'Collaborated with cross-functional teams to understand business requirements and translate them into technical solutions.',
    ],
  },
  {
    role: 'Software Consultant',
    company: 'Capgemini',
    place: 'Valencia, Spain',
    dates: 'June 2021 — May 2022',
    points: [
      'Contributed to the development of new software features within an Agile team environment.',
      'Provided training and support to new interns within the team.',
    ],
  },
  {
    role: 'Consultant',
    company: 'Edicom SL',
    place: 'Valencia, Spain',
    dates: 'June 2020 — March 2021',
    points: [
      'Supported EDI integration and data automation processes.',
      'Ensured accurate and compliant client data transmission.',
    ],
  },
] as const

const EDUCATION = [
  {
    title: "Bachelor's Degree in Computer Engineering",
    school: 'Polytechnic University of Valencia',
    dates: 'September 2015 — July 2022',
    detail:
      'Erasmus Program at INSA Lyon — Specialization in Software Engineering. Final Degree Project: design and development of a coworking management website.',
  },
  {
    title: 'Scientific Baccalaureate — Computer Science focus',
    school: 'Lycée Français de Valencia',
    dates: 'September 2003 — July 2015',
    detail:
      'Compulsory Education and High School Diploma with a focus on Computer Science.',
  },
] as const

const DRAWER_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="font-hn text-cream">
      {/* ───────── Hero ───────── */}
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover anim-fade-in"
        />

        <div
          className="absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh] anim-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
            <span className="pr-[6vw]">Jorge&nbsp;&mdash;&nbsp;Ruiz</span>
            <span className="pr-[6vw]">Jorge&nbsp;&mdash;&nbsp;Ruiz</span>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream anim-line sm:inset-x-10 sm:bottom-28" />

        <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed sm:z-10 sm:px-10 sm:pb-8 sm:text-sm">
          <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
            <p>Computer Engineer</p>
            <p>Customer Success</p>
            <p>Obsessed by AI</p>
          </div>
          <div
            className="text-right anim-fade-up"
            style={{ animationDelay: '1550ms' }}
          >
            <p>Based in</p>
            <p>Miami, Florida</p>
          </div>
        </footer>

        <img
          src={PORTRAIT_IMAGE}
          alt="Portrait"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover anim-rise-in"
        />

        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <a
            href="#"
            className="font-hn text-lg tracking-wide text-cream anim-fade-up"
            style={{ animationDelay: '800ms' }}
          >
            Jorge
          </a>

          <div className="hidden items-start gap-16 sm:flex lg:gap-24">
            <span
              className="text-sm anim-fade-up"
              style={{ animationDelay: '900ms' }}
            >
              2026
            </span>

            <nav className="flex flex-col gap-0.5 text-sm">
              {NAV_LINKS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                  style={{ animationDelay: `${1000 + i * 80}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-0.5 text-sm">
              {SOCIAL_LINKS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                  style={{ animationDelay: `${1150 + i * 80}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-50 flex h-10 w-10 items-center justify-center sm:hidden anim-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                className="block h-px w-full origin-center bg-cream transition-transform duration-500"
                style={{
                  transitionTimingFunction: DRAWER_EASE,
                  transform: menuOpen
                    ? 'translateY(7.5px) rotate(45deg)'
                    : 'none',
                }}
              />
              <span
                className="block h-px w-full bg-cream transition-opacity duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px w-full origin-center bg-cream transition-transform duration-500"
                style={{
                  transitionTimingFunction: DRAWER_EASE,
                  transform: menuOpen
                    ? 'translateY(-7.5px) rotate(-45deg)'
                    : 'none',
                }}
              />
            </span>
          </button>
        </header>

        {/* Mobile drawer */}
        <div className="sm:hidden">
          <div
            className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
              menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => setMenuOpen(false)}
            aria-hidden={!menuOpen}
          />

          <aside
            className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              transitionProperty: 'transform',
              transitionDuration: '600ms',
              transitionTimingFunction: DRAWER_EASE,
            }}
            aria-hidden={!menuOpen}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 text-cream transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? '300ms' : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              }}
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <div className="mt-8 flex flex-col gap-12">
              <div>
                <p
                  className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '250ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  Site Index
                </p>
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl text-cream transition-all duration-500"
                      style={{
                        transitionDelay: menuOpen
                          ? `${300 + i * 80}ms`
                          : '0ms',
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen
                          ? 'translateY(0)'
                          : 'translateY(24px)',
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p
                  className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '500ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  Find Me
                </p>
                <nav className="flex flex-wrap gap-x-6 gap-y-2">
                  {SOCIAL_LINKS.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm text-cream transition-all duration-500"
                      style={{
                        transitionDelay: menuOpen
                          ? `${550 + i * 60}ms`
                          : '0ms',
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen
                          ? 'translateY(0)'
                          : 'translateY(16px)',
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ───────── Profile ───────── */}
      <section className="relative bg-[#0a0a0a] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            Profile
          </p>
          <h1 className="mb-8 font-hn text-4xl leading-tight tracking-wide sm:text-5xl">
            Jorge Ruiz de la Torre Bertolín
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Computer Engineering graduate from the Polytechnic University of
            Valencia (UPV) with a proactive mindset and strong communication
            skills. Experienced in working with clients and cross-functional
            teams, with the ability to build positive relationships and adapt
            quickly to new challenges. Fluent in English, French, and Spanish.
          </p>
        </div>
      </section>

      {/* ───────── Experience ───────── */}
      <section
        id="experience"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 pb-24 sm:px-10 sm:pb-32"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 h-px w-full origin-left bg-cream/30" />
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            Experience
          </p>
          <h2 className="mb-16 font-hn text-3xl tracking-wide sm:text-4xl">
            Professional path
          </h2>

          <ul className="flex flex-col gap-16">
            {EXPERIENCE.map((job) => (
              <li key={`${job.company}-${job.dates}`}>
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl tracking-wide sm:text-2xl">
                    {job.role}
                    <span className="text-cream/50"> — {job.company}</span>
                  </h3>
                  <p className="shrink-0 text-sm text-cream/50">{job.dates}</p>
                </div>
                <p className="mb-4 text-sm text-cream/60">{job.place}</p>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-cream/80 sm:text-base">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Education ───────── */}
      <section
        id="education"
        className="relative scroll-mt-8 bg-[#111111] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            Education
          </p>
          <h2 className="mb-16 font-hn text-3xl tracking-wide sm:text-4xl">
            Academic background
          </h2>

          <ul className="flex flex-col gap-14">
            {EDUCATION.map((item) => (
              <li key={item.title}>
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl tracking-wide sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="shrink-0 text-sm text-cream/50">{item.dates}</p>
                </div>
                <p className="mb-3 text-sm text-cream/60">{item.school}</p>
                <p className="text-sm leading-relaxed text-cream/80 sm:text-base">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">
              Languages
            </p>
            <p className="text-lg tracking-wide">Spanish · French · English</p>
          </div>

          <div className="mt-12">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">
              Additional
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Passionate about sports and personal development. Strong interest
              in Artificial Intelligence and emerging technologies. Valid
              driver&apos;s license.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Contact ───────── */}
      <section
        id="contact"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 h-px w-full bg-cream/30" />
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            Contact
          </p>
          <h2 className="mb-12 font-hn text-3xl tracking-wide sm:text-4xl">
            Let&apos;s talk
          </h2>

          <div className="flex flex-col gap-6 text-base sm:text-lg">
            <a
              href="mailto:jorge@macdiego.com"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              jorge@macdiego.com
            </a>
            <a
              href="https://instagram.com/jorgerdelat"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              @jorgerdelat
            </a>
            <p className="text-cream/70">
              245 NE 14th Street
              <br />
              Miami, FL 33132
            </p>
          </div>

          <p className="mt-20 text-xs text-cream/40">
            Jorge Ruiz de la Torre Bertolín — 2026
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
