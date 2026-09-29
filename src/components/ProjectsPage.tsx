import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'
import { buildCaseStudies } from '../lib/caseStudies'
import { CaseStudyArticle } from './CaseStudyArticle'
import { Lightbox } from './Lightbox'
import { Reveal } from './Reveal'

export function ProjectsPage() {
  const { t, locale, lp } = useI18n()
  const studies = useMemo(() => buildCaseStudies(t, locale), [t, locale])
  const location = useLocation()
  const [lightbox, setLightbox] = useState<{
    images: string[]
    index: number
    alt: string
  } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location.hash, studies])

  return (
    <div className="min-h-dvh pt-16">
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-16 max-w-2xl">
            <Link
              to={lp('/')}
              className="btn-press mb-8 inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-ink/25"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              {t.projects.backToHome}
            </Link>
            <h1 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {t.projects.pageTitle}
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t.projects.pageIntro}
            </p>
          </Reveal>

          <div className="flex flex-col gap-28">
            {studies.map((study, i) => (
              <CaseStudyArticle
                key={study.id}
                study={study}
                index={i}
                expanded={expanded === study.id}
                onToggle={() =>
                  setExpanded((current) =>
                    current === study.id ? null : study.id,
                  )
                }
                onLightbox={(images, index, alt) =>
                  setLightbox({ images, index, alt })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {lightbox ? (
        <Lightbox
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
    </div>
  )
}
