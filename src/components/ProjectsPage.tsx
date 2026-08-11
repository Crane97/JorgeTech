import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Chrome } from '../content/chrome'
import type { Locale, Translation } from '../i18n'
import { buildCaseStudies, type CaseStudy } from '../lib/caseStudies'
import { Lightbox } from './Lightbox'
import { ProjectCarousel } from './ProjectCarousel'
import { Reveal } from './Reveal'

function CaseBlock({
  label,
  children,
}: {
  label: string
  children: import('react').ReactNode
}) {
  return (
    <div className="border-t border-line pt-5">
      <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <div className="space-y-3 text-[15px] leading-relaxed text-ink/85">
        {children}
      </div>
    </div>
  )
}

function CaseStudyArticle({
  study,
  index,
  chrome,
  t,
  expanded,
  onToggle,
  onLightbox,
}: {
  study: CaseStudy
  index: number
  chrome: Chrome
  t: Translation
  expanded: boolean
  onToggle: () => void
  onLightbox: (images: string[], index: number, alt: string) => void
}) {
  const mediaLeft = index % 2 === 0

  return (
    <article id={study.id} className="scroll-mt-28">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal
          className={`lg:col-span-7 ${mediaLeft ? 'lg:order-1' : 'lg:order-2'}`}
          delay={0.04}
        >
          <div className="group media-surface aspect-[16/10] overflow-hidden rounded-xl border border-line shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-md">
            {study.images.length > 0 ? (
              study.images.length === 1 ? (
                <button
                  type="button"
                  aria-label={chrome.projects.expandImage}
                  onClick={() => onLightbox(study.images, 0, study.title)}
                  className="h-full w-full cursor-zoom-in"
                >
                  <img
                    src={study.images[0]}
                    alt={study.title}
                    loading="lazy"
                    className="media-zoom h-full w-full object-cover object-top"
                  />
                </button>
              ) : (
                <ProjectCarousel
                  images={study.images}
                  alt={study.title}
                  expandLabel={chrome.projects.expandImage}
                  onExpand={(imageIndex) =>
                    onLightbox(study.images, imageIndex, study.title)
                  }
                />
              )
            ) : (
              <div className="flex h-full items-end p-6">
                <p className="font-mono text-xs tracking-wide text-muted">
                  {t.projects.photosNote}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal
          className={`lg:col-span-5 ${mediaLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
              {study.title}
            </h2>
            <time
              dateTime={study.year}
              className="shrink-0 font-mono text-xs tracking-wide text-muted"
            >
              {study.year}
            </time>
          </div>
          {study.note ? (
            <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
              {study.note}
            </p>
          ) : null}
          {study.subtitle ? (
            <p className="mb-6 text-[15px] leading-relaxed text-muted">
              {study.subtitle}
            </p>
          ) : null}

          <div className="flex flex-col gap-6">
            <CaseBlock label={chrome.projects.problem}>
              {study.problem.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </CaseBlock>

            <CaseBlock label={chrome.projects.solution}>
              {(expanded ? study.solution : study.solution.slice(0, 2)).map(
                (p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ),
              )}
              {expanded && study.stages
                ? study.stages.map((stage) => (
                    <div key={stage.title} className="pt-2">
                      <p className="mb-1 font-medium text-ink">{stage.title}</p>
                      {stage.body.split('\n\n').map((part) => (
                        <p key={part.slice(0, 40)} className="mb-2">
                          {part}
                        </p>
                      ))}
                    </div>
                  ))
                : null}
            </CaseBlock>

            {expanded && study.architecture ? (
              <CaseBlock label={chrome.projects.architecture}>
                <pre className="overflow-x-auto rounded-lg border border-line bg-transparent p-4 font-mono text-xs leading-relaxed text-ink/80 whitespace-pre-wrap">
                  {study.architecture}
                </pre>
              </CaseBlock>
            ) : null}

            {study.technologies.length > 0 ? (
              <CaseBlock label={chrome.projects.technologies}>
                <ul className="flex flex-wrap gap-2">
                  {(expanded
                    ? study.technologies
                    : study.technologies.slice(0, 6)
                  ).map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ink/80"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </CaseBlock>
            ) : null}

            {study.results.length > 0 ? (
              <CaseBlock label={chrome.projects.results}>
                <ul className="list-disc space-y-1.5 pl-5">
                  {(expanded
                    ? study.results
                    : study.results.slice(0, 3)
                  ).map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </CaseBlock>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggle}
              className="btn-press inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-ink/25"
            >
              {expanded ? chrome.projects.close : chrome.projects.viewCase}
            </button>
            {study.liveUrl ? (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-surface hover:bg-ink/90"
              >
                {chrome.projects.visitLive}
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export function ProjectsPage({
  chrome,
  t,
  locale,
}: {
  chrome: Chrome
  t: Translation
  locale: Locale
}) {
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
              to="/"
              className="btn-press mb-8 inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-ink/25"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              {chrome.projects.backToHome}
            </Link>
            <h1 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {chrome.projects.pageTitle}
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {chrome.projects.pageIntro}
            </p>
          </Reveal>

          <div className="flex flex-col gap-28">
            {studies.map((study, i) => (
              <CaseStudyArticle
                key={study.id}
                study={study}
                index={i}
                chrome={chrome}
                t={t}
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
          closeLabel={chrome.projects.close}
          previousLabel={chrome.projects.previousImage}
          nextLabel={chrome.projects.nextImage}
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
