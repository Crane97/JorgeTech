import { useEffect, useState, type FormEvent, type ReactNode, type SVGProps } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react'
import { LOCALES, translations, type Locale, type Translation } from './i18n'
import { getZumexHowItWorks } from './content/zumexHowItWorks'
import { getPorra2026Details } from './content/porra2026Details'
import { getPorra2022Details } from './content/porra2022Details'
import { getCoworkingDetails } from './content/coworkingDetails'
import { getSumeroDetails } from './content/sumeroDetails'
import zumexScrapingImage from './assets/scraping/3493f21e-c223-4bab-b5bf-15128c4e64e6.png'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const boxingImageModules = import.meta.glob<{ default: string }>(
  './assets/boxing/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
const BOXING_IMAGES = Object.keys(boxingImageModules)
  .sort()
  .map((key) => boxingImageModules[key].default)

const porraImageModules = import.meta.glob<{ default: string }>(
  './assets/porra2026/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
const PORRA_IMAGES = Object.keys(porraImageModules)
  .sort()
  .map((key) => porraImageModules[key].default)

const porra2022ImageModules = import.meta.glob<{ default: string }>(
  './assets/porra2022/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
const PORRA_2022_IMAGES = Object.keys(porra2022ImageModules)
  .sort()
  .map((key) => porra2022ImageModules[key].default)

const coworkingImageModules = import.meta.glob<{ default: string }>(
  './assets/coworking/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
const COWORKING_IMAGES = Object.keys(coworkingImageModules)
  .sort()
  .map((key) => coworkingImageModules[key].default)

const sumeroImageModules = import.meta.glob<{ default: string }>(
  './assets/sumeros/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
const SUMERO_IMAGES = Object.keys(sumeroImageModules)
  .sort()
  .map((key) => sumeroImageModules[key].default)

type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number }

function InstagramIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function LinkedInIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.941v5.665H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    key: 'instagram' as const,
    href: 'https://instagram.com/jorgerdelat',
    display: '@jorgerdelat',
    Icon: InstagramIcon,
  },
  {
    key: 'email' as const,
    href: 'mailto:jorge@macdiego.com',
    display: 'jorge@macdiego.com',
    Icon: Mail,
  },
  {
    key: 'linkedin' as const,
    href: 'https://www.linkedin.com/in/jorgerdelat',
    display: 'LinkedIn',
    Icon: LinkedInIcon,
  },
]

const DRAWER_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

type PanelId = 'projects' | 'about' | null

function LanguageSwitcher({
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
      className={`flex items-center gap-2 text-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-cream/30" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={locale === code}
            className={`tracking-wide transition-opacity duration-300 ${
              locale === code ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}

function OverlayPanel({
  open,
  title,
  eyebrow,
  closeLabel,
  onClose,
  children,
}: {
  open: boolean
  title: string
  eyebrow: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm anim-panel-backdrop"
        onClick={onClose}
      />
      <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-6 lg:inset-10 anim-panel">
        <div className="flex h-full flex-col">
          <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10 sm:py-8">
            <div className="anim-stagger" style={{ animationDelay: '120ms' }}>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cream/50">
                {eyebrow}
              </p>
              <h2 className="font-hn text-3xl tracking-wide sm:text-4xl">
                {title}
              </h2>
            </div>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={onClose}
              className="text-cream transition-opacity duration-300 hover:opacity-60 anim-stagger"
              style={{ animationDelay: '180ms' }}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto py-10 sm:py-14">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectImageLightbox({
  images,
  index,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onIndexChange,
}: {
  images: string[]
  index: number
  alt: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        onIndexChange((index - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight') {
        onIndexChange((index + 1) % images.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, index, onClose, onIndexChange])

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm anim-panel-backdrop"
        onClick={onClose}
      />
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute right-5 top-5 z-10 text-cream transition-opacity duration-300 hover:opacity-60 sm:right-8 sm:top-8"
      >
        <X size={30} strokeWidth={1.5} />
      </button>
      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() =>
              onIndexChange((index - 1 + images.length) % images.length)
            }
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-cream transition-opacity duration-300 hover:opacity-60 sm:left-6"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => onIndexChange((index + 1) % images.length)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-cream transition-opacity duration-300 hover:opacity-60 sm:right-6"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-10 sm:p-16 anim-panel">
        <img
          src={images[index]}
          alt={alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  )
}

function ProjectImageCarousel({
  images,
  alt,
  expandLabel,
  onExpand,
}: {
  images: string[]
  alt: string
  expandLabel: string
  onExpand: (index: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [images.length, paused])

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label={expandLabel}
        onClick={() => onExpand(index)}
        className="absolute inset-0 cursor-zoom-in"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? alt : ''}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </button>
      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-end bg-gradient-to-t from-black/55 to-transparent px-4 py-4">
          <div className="flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 transition-colors duration-300 ${
                  i === index ? 'bg-cream' : 'bg-cream/35 hover:bg-cream/60'
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ProjectsPanelContent({
  t,
  locale,
}: {
  t: Translation
  locale: Locale
}) {
  const [openProject, setOpenProject] = useState<
    'zumex' | 'worldcup-2026' | 'worldcup-2022' | 'coworking' | 'sumero' | null
  >(null)
  const [lightbox, setLightbox] = useState<{
    images: string[]
    index: number
    alt: string
  } | null>(null)
  const howItWorks = getZumexHowItWorks(locale)
  const porraDetails = getPorra2026Details(locale)
  const porra2022Details = getPorra2022Details(locale)
  const coworkingDetails = getCoworkingDetails(locale)
  const sumeroDetails = getSumeroDetails(locale)

  useEffect(() => {
    if (!openProject || lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openProject, lightbox])

  const openLightbox = (images: string[], index: number, alt: string) => {
    setLightbox({ images, index, alt })
  }

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10">
      <p
        className="mb-14 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg anim-stagger"
        style={{ animationDelay: '200ms' }}
      >
        {t.projects.intro}
      </p>
      <ul className="flex flex-col gap-16">
        {t.projects.items.map((item, i) => {
          const isZumex = item.id === 'zumex'
          const isPorra = item.id === 'worldcup-2026'
          const isPorra2022 = item.id === 'worldcup-2022'
          const isCoworking = item.id === 'coworking'
          const isSumero = item.id === 'sumero'
          const expandable =
            isZumex || isPorra || isPorra2022 || isCoworking || isSumero
          const ctaLabel = isPorra
            ? t.projects.viewDetails
            : t.projects.learnMore
          const projectImages = isZumex
            ? [zumexScrapingImage]
            : isPorra
              ? PORRA_IMAGES
              : isPorra2022
                ? PORRA_2022_IMAGES
                : isCoworking
                  ? COWORKING_IMAGES
                  : isSumero
                    ? SUMERO_IMAGES
                    : []

          const openDetails = () => {
            if (isZumex) setOpenProject('zumex')
            else if (isPorra) setOpenProject('worldcup-2026')
            else if (isPorra2022) setOpenProject('worldcup-2022')
            else if (isCoworking) setOpenProject('coworking')
            else if (isSumero) setOpenProject('sumero')
          }

          return (
            <li
              key={item.id}
              className="anim-stagger"
              style={{ animationDelay: `${260 + i * 90}ms` }}
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl tracking-wide sm:text-2xl">
                  {item.title}
                </h3>
                <time
                  dateTime={item.year}
                  className="shrink-0 text-xs uppercase tracking-[0.18em] text-cream/45"
                >
                  {item.year}
                </time>
              </div>
              {item.subtitle ? (
                <p className="mb-3 max-w-2xl text-sm leading-relaxed text-cream/60 sm:text-base">
                  {item.subtitle}
                </p>
              ) : null}
              {'lead' in item && item.lead ? (
                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-cream/70 sm:text-base">
                  {item.lead}
                </p>
              ) : null}
              <div className="flex max-w-2xl flex-col gap-3 text-sm leading-relaxed text-cream/80 sm:text-base">
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              {'includes' in item && item.includes ? (
                <div className="mt-6 max-w-2xl">
                  <p className="mb-3 text-sm uppercase tracking-[0.16em] text-cream/50">
                    {item.includesTitle}
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {item.includes.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {'scoringRows' in item && item.scoringRows ? (
                <div className="mt-8 max-w-2xl">
                  <h4 className="mb-3 text-lg tracking-wide">{item.scoringTitle}</h4>
                  <p className="mb-3 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {item.scoringIntro}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {item.scoringPointsLabel}
                  </p>
                  <div className="overflow-x-auto border border-cream/15">
                    <table className="w-full min-w-[280px] text-left text-sm text-cream/80">
                      <thead className="border-b border-cream/15 text-cream/50">
                        <tr>
                          <th className="px-4 py-3 font-normal uppercase tracking-[0.14em]">
                            {item.scoringHeaders.prediction}
                          </th>
                          <th className="px-4 py-3 font-normal uppercase tracking-[0.14em]">
                            {item.scoringHeaders.points}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.scoringRows.map((row) => (
                          <tr
                            key={row.prediction}
                            className="border-b border-cream/10 last:border-0"
                          >
                            <td className="px-4 py-3">{row.prediction}</td>
                            <td className="px-4 py-3 tabular-nums">{row.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
                    {item.scoringFooter}
                  </p>
                </div>
              ) : null}

              {expandable ? (
                <button
                  type="button"
                  onClick={openDetails}
                  className="mt-8 inline-flex items-center gap-2 border border-cream/30 px-5 py-3 text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/5"
                >
                  {ctaLabel}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </button>
              ) : null}

              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-cream/[0.04]">
                {projectImages.length > 0 ? (
                  projectImages.length === 1 ? (
                    <button
                      type="button"
                      aria-label={t.projects.expandImage}
                      onClick={() =>
                        openLightbox(projectImages, 0, item.title)
                      }
                      className="h-full w-full cursor-zoom-in"
                    >
                      <img
                        src={projectImages[0]}
                        alt={item.title}
                        className="h-full w-full object-cover object-top"
                      />
                    </button>
                  ) : (
                    <ProjectImageCarousel
                      images={projectImages}
                      alt={item.title}
                      expandLabel={t.projects.expandImage}
                      onExpand={(index) =>
                        openLightbox(projectImages, index, item.title)
                      }
                    />
                  )
                ) : (
                  <div className="flex h-full items-end p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-cream/35">
                      {t.projects.photosNote}
                    </p>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {lightbox ? (
        <ProjectImageLightbox
          images={lightbox.images}
          index={lightbox.index}
          alt={lightbox.alt}
          closeLabel={t.projects.close}
          previousLabel={t.projects.previousImage}
          nextLabel={t.projects.nextImage}
          onClose={() => setLightbox(null)}
          onIndexChange={(index) =>
            setLightbox((current) =>
              current ? { ...current, index } : current,
            )
          }
        />
      ) : null}

      {openProject === 'zumex' && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.projects.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setOpenProject(null)}
          />
          <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-8 lg:inset-12 anim-panel">
            <div className="flex h-full flex-col">
              <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10">
                <h3 className="font-hn text-2xl tracking-wide sm:text-3xl">
                  {howItWorks.title}
                </h3>
                <button
                  type="button"
                  aria-label={t.projects.close}
                  onClick={() => setOpenProject(null)}
                  className="text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-3xl">
                  <p className="mb-12 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {howItWorks.intro}
                  </p>

                  <div className="flex flex-col gap-12">
                    {howItWorks.stages.map((stage) => (
                      <section key={stage.title}>
                        <h4 className="mb-4 text-xl tracking-wide">
                          {stage.title}
                        </h4>
                        {stage.body.split('\n\n').map((p) => (
                          <p
                            key={p.slice(0, 40)}
                            className="mb-4 text-sm leading-relaxed text-cream/80 sm:text-base"
                          >
                            {p}
                          </p>
                        ))}
                        {'bullets' in stage && stage.bullets ? (
                          <ul className="mb-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                            {stage.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                        {'modes' in stage && stage.modes
                          ? stage.modes.map((mode) => (
                              <div key={mode.title} className="mb-6 mt-4">
                                <p className="mb-2 text-sm uppercase tracking-[0.16em] text-cream/50">
                                  {mode.title}
                                </p>
                                {mode.body.split('\n\n').map((p) => (
                                  <p
                                    key={p.slice(0, 40)}
                                    className="mb-3 text-sm leading-relaxed text-cream/80 sm:text-base"
                                  >
                                    {p}
                                  </p>
                                ))}
                              </div>
                            ))
                          : null}
                        {'footer' in stage && stage.footer ? (
                          <p className="text-sm leading-relaxed text-cream/70 sm:text-base">
                            {stage.footer}
                          </p>
                        ) : null}
                      </section>
                    ))}
                  </div>

                  <section className="mt-16">
                    <h4 className="mb-4 text-xl tracking-wide">
                      {howItWorks.architectureTitle}
                    </h4>
                    <pre className="overflow-x-auto border border-cream/15 bg-cream/[0.03] p-5 text-xs leading-relaxed text-cream/75 sm:text-sm">
                      {howItWorks.architecture}
                    </pre>
                  </section>

                  <section className="mt-14">
                    <h4 className="mb-4 text-xl tracking-wide">
                      {howItWorks.technologiesTitle}
                    </h4>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                      {howItWorks.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-14 mb-6">
                    <h4 className="mb-4 text-xl tracking-wide">
                      {howItWorks.featuresTitle}
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                      {howItWorks.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openProject === 'worldcup-2026' && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.projects.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setOpenProject(null)}
          />
          <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-8 lg:inset-12 anim-panel">
            <div className="flex h-full flex-col">
              <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10">
                <h3 className="font-hn text-2xl tracking-wide sm:text-3xl">
                  {porraDetails.title}
                </h3>
                <button
                  type="button"
                  aria-label={t.projects.close}
                  onClick={() => setOpenProject(null)}
                  className="text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-3xl">
                  <div className="mb-12 flex flex-col gap-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {porraDetails.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <section className="mt-4">
                    <h4 className="mb-4 text-xl tracking-wide">
                      {porraDetails.technologiesTitle}
                    </h4>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                      {porraDetails.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-14 mb-6">
                    <p className="text-sm leading-relaxed text-cream/80 sm:text-base">
                      {porraDetails.architecture}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openProject === 'worldcup-2022' && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.projects.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setOpenProject(null)}
          />
          <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-8 lg:inset-12 anim-panel">
            <div className="flex h-full flex-col">
              <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10">
                <h3 className="font-hn text-2xl tracking-wide sm:text-3xl">
                  {porra2022Details.title}
                </h3>
                <button
                  type="button"
                  aria-label={t.projects.close}
                  onClick={() => setOpenProject(null)}
                  className="text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-3xl">
                  <p className="mb-10 border-b border-cream/10 pb-10 text-base leading-relaxed text-cream/80 sm:text-lg">
                    {porra2022Details.intro}
                  </p>

                  <div className="mb-6 flex flex-col gap-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {porra2022Details.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <ul className="mb-10 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {porra2022Details.recalculates.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="mb-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {porra2022Details.frontendIntro}
                  </p>
                  <ul className="mb-12 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {porra2022Details.frontendDisplays.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="mb-12 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {porra2022Details.architecture}
                  </p>

                  <section className="mb-6">
                    <h4 className="mb-6 text-xl tracking-wide">
                      {porra2022Details.technologiesTitle}
                    </h4>
                    <div className="mb-8">
                      <p className="mb-3 text-sm uppercase tracking-[0.16em] text-cream/50">
                        {porra2022Details.frontendTitle}
                      </p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                        {porra2022Details.frontendTechnologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-sm uppercase tracking-[0.16em] text-cream/50">
                        {porra2022Details.backendTitle}
                      </p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                        {porra2022Details.backendTechnologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openProject === 'coworking' && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.projects.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setOpenProject(null)}
          />
          <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-8 lg:inset-12 anim-panel">
            <div className="flex h-full flex-col">
              <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10">
                <h3 className="font-hn text-2xl tracking-wide sm:text-3xl">
                  {coworkingDetails.title}
                </h3>
                <button
                  type="button"
                  aria-label={t.projects.close}
                  onClick={() => setOpenProject(null)}
                  className="text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-3xl">
                  <div className="mb-6 flex flex-col gap-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {coworkingDetails.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <ul className="mb-10 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {coworkingDetails.reservationTypes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mb-12 flex flex-col gap-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {coworkingDetails.midParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <p className="mb-12 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {coworkingDetails.architecture}
                  </p>

                  <section className="mb-6">
                    <h4 className="mb-6 text-xl tracking-wide">
                      {coworkingDetails.technologiesTitle}
                    </h4>
                    <div className="mb-8">
                      <p className="mb-3 text-sm uppercase tracking-[0.16em] text-cream/50">
                        {coworkingDetails.frontendTitle}
                      </p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                        {coworkingDetails.frontendTechnologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-sm uppercase tracking-[0.16em] text-cream/50">
                        {coworkingDetails.backendTitle}
                      </p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                        {coworkingDetails.backendTechnologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openProject === 'sumero' && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.projects.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setOpenProject(null)}
          />
          <div className="absolute inset-3 overflow-hidden bg-[#111111] sm:inset-8 lg:inset-12 anim-panel">
            <div className="flex h-full flex-col">
              <header className="flex shrink-0 items-start justify-between border-b border-cream/10 px-6 py-6 sm:px-10">
                <h3 className="font-hn text-2xl tracking-wide sm:text-3xl">
                  {sumeroDetails.title}
                </h3>
                <button
                  type="button"
                  aria-label={t.projects.close}
                  onClick={() => setOpenProject(null)}
                  className="text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-3xl">
                  <div className="mb-6 flex flex-col gap-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                    {sumeroDetails.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <ul className="mb-10 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {sumeroDetails.rules.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mb-12 flex flex-col gap-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                    {sumeroDetails.midParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  <section className="mb-6">
                    <h4 className="mb-4 text-xl tracking-wide">
                      {sumeroDetails.technologiesTitle}
                    </h4>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/80">
                      {sumeroDetails.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BoxingGallery({ closeLabel }: { closeLabel: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const loop = [...BOXING_IMAGES, ...BOXING_IMAGES]

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <div className="overflow-hidden">
        <div className="marquee-photos flex w-max gap-4 px-6 sm:gap-5 sm:px-10">
          {loop.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setLightbox(src)}
              className="relative h-[42vh] w-[min(70vw,320px)] shrink-0 overflow-hidden bg-cream/[0.04] transition-opacity duration-300 hover:opacity-90 sm:h-[48vh] sm:w-[360px]"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm anim-panel-backdrop"
            onClick={() => setLightbox(null)}
          />
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 z-10 text-cream transition-opacity duration-300 hover:opacity-60 sm:right-8 sm:top-8 anim-stagger"
            style={{ animationDelay: '120ms' }}
          >
            <X size={30} strokeWidth={1.5} />
          </button>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 sm:p-14 anim-panel">
            <img
              src={lightbox}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

function AboutPanelContent({ t }: { t: Translation }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <div
          className="mb-16 anim-stagger"
          style={{ animationDelay: '160ms' }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.personal.eyebrow}
          </p>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {t.personal.intro}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {t.personal.story}
          </p>
        </div>
      </div>

      <div className="mb-16 anim-stagger" style={{ animationDelay: '240ms' }}>
        <p className="mb-8 px-6 text-xs uppercase tracking-[0.2em] text-cream/50 sm:px-10">
          {t.about.photosEyebrow}
        </p>

        <div className="mx-auto mb-12 max-w-3xl px-6 sm:px-10">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cream/45">
            {t.about.postLabel}
          </p>
          <p className="mb-8 text-sm tracking-wide text-cream/40">
            {t.about.postAttribution}
          </p>

          <blockquote className="border-l border-cream/30 pl-6">
            <div className="flex flex-col gap-6">
              {t.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="mt-8 text-sm tracking-wide text-cream/50">
              — Jorge Ruiz de la Torre
            </footer>
          </blockquote>

          <blockquote className="mt-12 mb-3 max-w-2xl border-l border-cream/20 pl-6 text-lg leading-relaxed text-cream/75 sm:text-xl">
            {t.about.quote}
          </blockquote>
          <p className="mb-12 text-sm tracking-wide text-cream/45">
            — {t.about.quoteAuthor}
          </p>
        </div>

        <BoxingGallery closeLabel={t.about.close} />
      </div>

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <div className="mb-12 anim-stagger" style={{ animationDelay: '400ms' }}>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.about.sportsEyebrow}
          </p>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed text-cream/80 sm:text-base">
            {t.about.sports.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="anim-stagger" style={{ animationDelay: '460ms' }}>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.about.businessEyebrow}
          </p>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed text-cream/80 sm:text-base">
            {t.about.business.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

function ContactForm({ t }: { t: Translation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      name.trim() ? `Project inquiry from ${name.trim()}` : 'Project inquiry',
    )
    const body = encodeURIComponent(
      [
        name.trim() ? `Name: ${name.trim()}` : null,
        email.trim() ? `Email: ${email.trim()}` : null,
        '',
        message.trim(),
      ]
        .filter((line) => line !== null)
        .join('\n'),
    )
    window.location.href = `mailto:jorge@macdiego.com?subject=${subject}&body=${body}`
  }

  const fieldClass =
    'w-full border border-cream/20 bg-transparent px-4 py-3 text-base text-cream outline-none transition-colors duration-300 placeholder:text-cream/35 focus:border-cream/60'

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-cream/50">
          {t.contact.formName}
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-cream/50">
          {t.contact.formEmail}
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-cream/50">
          {t.contact.formMessage}
        </span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y min-h-32`}
          required
        />
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-3 border border-cream/50 bg-cream text-[#0a0a0a] px-7 py-4 text-base tracking-wide transition-opacity duration-300 hover:opacity-85"
      >
        {t.contact.formSubmit}
      </button>
      <p className="text-xs leading-relaxed text-cream/45">{t.contact.formHint}</p>
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('en')
  const [panel, setPanel] = useState<PanelId>(null)
  const t = translations[locale]

  const openPanel = (id: Exclude<PanelId, null>) => {
    setMenuOpen(false)
    setPanel(id)
  }

  const closePanel = () => setPanel(null)

  const navItems = [
    { label: t.nav.path, href: '#path' as const },
    { label: t.nav.projects, onClick: () => openPanel('projects') },
    { label: t.nav.about, onClick: () => openPanel('about') },
    { label: t.nav.contact, href: '#contact' as const },
  ]

  useEffect(() => {
    const locked = menuOpen || panel !== null
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, panel])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div className="font-hn text-cream">
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
          <div className="marquee flex w-max whitespace-nowrap font-hn text-[12vh] leading-none text-cream sm:text-[18vh]">
            <span className="pr-[6vw]">
              Jorge&nbsp;Ruiz&nbsp;de&nbsp;la&nbsp;Torre
            </span>
            <span className="pr-[6vw]">
              Jorge&nbsp;Ruiz&nbsp;de&nbsp;la&nbsp;Torre
            </span>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream anim-line sm:inset-x-10 sm:bottom-28" />

        <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed sm:px-10 sm:pb-8 sm:text-sm">
          <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
            <p>{t.hero.line1}</p>
            <p>{t.hero.line2}</p>
            <p>{t.hero.line3}</p>
          </div>
          <div
            className="text-right anim-fade-up"
            style={{ animationDelay: '1550ms' }}
          >
            <p>{t.hero.basedIn}</p>
            <p>{t.hero.location}</p>
          </div>
        </footer>

        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <a
            href="#"
            className="font-hn text-lg tracking-wide text-cream anim-fade-up"
            style={{ animationDelay: '800ms' }}
          >
            Home
          </a>

          <div className="hidden items-start gap-12 sm:flex lg:gap-20">
            <LanguageSwitcher
              locale={locale}
              onChange={setLocale}
              className="anim-fade-up"
            />

            <span
              className="text-sm anim-fade-up"
              style={{ animationDelay: '900ms' }}
            >
              2026
            </span>

            <nav className="flex flex-col gap-0.5 text-sm">
              {navItems.map((item, i) =>
                'href' in item && item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-left text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                    style={{ animationDelay: `${1000 + i * 80}ms` }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={'onClick' in item ? item.onClick : undefined}
                    className="text-left text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                    style={{ animationDelay: `${1000 + i * 80}ms` }}
                  >
                    {item.label}
                  </button>
                ),
              )}
            </nav>

            <nav className="flex flex-col gap-0.5 text-sm">
              {SOCIAL_LINKS.map((item, i) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                  style={{ animationDelay: `${1150 + i * 80}ms` }}
                >
                  {t.social[item.key]}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 sm:hidden">
            <LanguageSwitcher
              locale={locale}
              onChange={setLocale}
              className="anim-fade-up"
            />
            <button
              type="button"
              aria-label={menuOpen ? t.menu.close : t.menu.open}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-50 flex h-10 w-10 items-center justify-center anim-fade-up"
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
          </div>
        </header>

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
              aria-label={t.menu.close}
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
                  {t.menu.siteIndex}
                </p>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) =>
                    'href' in item && item.href ? (
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
                    ) : (
                      <button
                        key={item.label}
                        type="button"
                        onClick={'onClick' in item ? item.onClick : undefined}
                        className="text-left text-4xl text-cream transition-all duration-500"
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
                      </button>
                    ),
                  )}
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
                  {t.menu.findMe}
                </p>
                <nav className="flex flex-wrap gap-x-6 gap-y-2">
                  {SOCIAL_LINKS.map((item, i) => (
                    <a
                      key={item.key}
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
                      {t.social[item.key]}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="path"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.path.eyebrow}
          </p>
          <h2 className="mb-6 font-hn text-3xl tracking-wide sm:text-4xl">
            {t.path.title}
          </h2>
          <p className="mb-16 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {t.path.intro}
          </p>

          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.profile.eyebrow}
          </p>
          <h1 className="mb-8 font-hn text-4xl leading-tight tracking-wide sm:text-5xl">
            Jorge Ruiz de la Torre Bertolín
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t.profile.body}
          </p>
        </div>
      </section>

      <section
        id="experience"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 pb-24 sm:px-10 sm:pb-32"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 h-px w-full origin-left bg-cream/30" />
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.experience.eyebrow}
          </p>
          <h2 className="mb-16 font-hn text-3xl tracking-wide sm:text-4xl">
            {t.experience.title}
          </h2>

          <ul className="flex flex-col gap-16">
            {t.experience.jobs.map((job) => (
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

      <section
        id="education"
        className="relative scroll-mt-8 bg-[#111111] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.education.eyebrow}
          </p>
          <h2 className="mb-16 font-hn text-3xl tracking-wide sm:text-4xl">
            {t.education.title}
          </h2>

          <ul className="flex flex-col gap-14">
            {t.education.items.map((item) => (
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
              {t.education.languagesEyebrow}
            </p>
            <p className="text-lg tracking-wide">{t.education.languages}</p>
          </div>

          <div className="mt-12">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">
              {t.education.additionalEyebrow}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {t.education.additional}
            </p>
          </div>
        </div>
      </section>

      <section
        id="courses"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 h-px w-full bg-cream/30" />
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.courses.eyebrow}
          </p>
          <h2 className="mb-16 font-hn text-3xl tracking-wide sm:text-4xl">
            {t.courses.title}
          </h2>

          <ul className="flex flex-col gap-10">
            {t.courses.items.map((item) => (
              <li key={`${item.title}-${item.dates}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg tracking-wide sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="shrink-0 text-sm text-cream/50">{item.dates}</p>
                </div>
                <p className="mt-1 text-sm text-cream/60">{item.school}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="personal"
        className="relative scroll-mt-8 bg-[#111111] px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.personal.eyebrow}
          </p>
          <h2 className="mb-6 font-hn text-3xl tracking-wide sm:text-4xl">
            {t.personal.title}
          </h2>
          <p className="mb-16 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {t.personal.intro}
          </p>

          <div className="flex flex-col gap-5">
            <button
              type="button"
              onClick={() => openPanel('projects')}
              className="group flex w-full flex-col gap-8 border border-cream/25 bg-cream/[0.03] px-6 py-10 text-left transition-all duration-500 hover:border-cream/70 hover:bg-cream/[0.07] sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-12"
            >
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cream/50">
                  {t.projects.eyebrow}
                </p>
                <h3 className="mb-4 font-hn text-3xl tracking-wide sm:text-5xl">
                  {t.projects.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
                  {t.projects.hubLabel}
                </p>
              </div>
              <span className="inline-flex items-center gap-3 self-start border border-cream/40 px-5 py-3 text-sm tracking-wide text-cream transition-all duration-500 group-hover:border-cream group-hover:bg-cream/10 sm:self-auto">
                {t.projects.open}
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => openPanel('about')}
              className="group flex w-full flex-col gap-8 border border-cream/25 bg-cream/[0.03] px-6 py-10 text-left transition-all duration-500 hover:border-cream/70 hover:bg-cream/[0.07] sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-12"
            >
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cream/50">
                  {t.about.eyebrow}
                </p>
                <h3 className="mb-4 font-hn text-3xl tracking-wide sm:text-5xl">
                  {t.about.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
                  {t.about.hubLabel}
                </p>
              </div>
              <span className="inline-flex items-center gap-3 self-start border border-cream/40 px-5 py-3 text-sm tracking-wide text-cream transition-all duration-500 group-hover:border-cream group-hover:bg-cream/10 sm:self-auto">
                {t.about.open}
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-8 bg-[#0a0a0a] px-6 py-28 sm:px-10 sm:py-40"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 h-px w-full bg-cream/30" />
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
            {t.contact.eyebrow}
          </p>
          <h2 className="mb-8 font-hn text-4xl tracking-wide sm:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-xl">
            {t.contact.intro}
          </p>

          <a
            href="mailto:jorge@macdiego.com?subject=Project%20inquiry"
            className="group mb-16 inline-flex items-center gap-3 border border-cream/50 bg-cream/[0.06] px-7 py-4 text-base tracking-wide text-cream transition-all duration-500 hover:border-cream hover:bg-cream/10 sm:text-lg"
          >
            {t.contact.cta}
            <ArrowUpRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:rotate-45"
            />
          </a>

          <ContactForm t={t} />

          <div className="mt-20 flex flex-col gap-8 border-t border-cream/15 pt-12 sm:flex-row sm:justify-between">
            <nav className="flex flex-col gap-4 text-base" aria-label="Social links">
              {SOCIAL_LINKS.map(({ key, href, display, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-60"
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden />
                  <span>{display}</span>
                </a>
              ))}
            </nav>
            <p className="text-sm leading-relaxed text-cream/60 sm:text-right">
              <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-cream/40">
                {t.contact.addressLabel}
              </span>
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

      <OverlayPanel
        open={panel === 'projects'}
        title={t.projects.title}
        eyebrow={t.projects.eyebrow}
        closeLabel={t.projects.close}
        onClose={closePanel}
      >
        <ProjectsPanelContent t={t} locale={locale} />
      </OverlayPanel>

      <OverlayPanel
        open={panel === 'about'}
        title={t.about.title}
        eyebrow={t.about.eyebrow}
        closeLabel={t.about.close}
        onClose={closePanel}
      >
        <AboutPanelContent t={t} />
      </OverlayPanel>
    </div>
  )
}

export default App
