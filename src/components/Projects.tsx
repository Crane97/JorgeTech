import { useMemo, useState } from 'react'
import type { Chrome } from '../content/chrome'
import { getCoworkingDetails } from '../content/coworkingDetails'
import { getPorra2022Details } from '../content/porra2022Details'
import { getPorra2026Details } from '../content/porra2026Details'
import { getSumeroDetails } from '../content/sumeroDetails'
import { getZumexHowItWorks } from '../content/zumexHowItWorks'
import type { Locale, Translation } from '../i18n'
import {
  COWORKING_IMAGES,
  PORRA_2022_IMAGES,
  PORRA_IMAGES,
  SUMERO_IMAGES,
  ZUMEX_IMAGES,
} from '../lib/assets'
import { Lightbox } from './Lightbox'
import { ProjectCarousel } from './ProjectCarousel'
import { Reveal } from './Reveal'

type CaseStudy = {
  id: string
  year: string
  title: string
  subtitle?: string
  problem: string[]
  solution: string[]
  architecture?: string
  technologies: string[]
  results: string[]
  images: string[]
  stages?: { title: string; body: string }[]
  note?: string
}

function buildCaseStudies(t: Translation, locale: Locale): CaseStudy[] {
  const zumex = getZumexHowItWorks(locale)
  const porra2026 = getPorra2026Details(locale)
  const porra2022 = getPorra2022Details(locale)
  const coworking = getCoworkingDetails(locale)
  const sumero = getSumeroDetails(locale)

  return t.projects.items.map((item) => {
    if (item.id === 'zumex') {
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: [item.paragraphs[0], item.paragraphs[1]].filter(Boolean),
        solution: [zumex.intro, ...item.paragraphs.slice(2)],
        architecture: zumex.architecture,
        technologies: [...zumex.technologies],
        results: [...zumex.features],
        images: ZUMEX_IMAGES,
        stages: zumex.stages.map((stage) => ({
          title: stage.title,
          body: stage.body,
        })),
      }
    }

    if (item.id === 'worldcup-2026') {
      const includes = 'includes' in item ? item.includes : []
      const scoringRows = 'scoringRows' in item ? item.scoringRows : []
      const scoringIntro = 'scoringIntro' in item ? item.scoringIntro : ''
      const scoringFooter = 'scoringFooter' in item ? item.scoringFooter : ''
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: item.paragraphs.slice(0, 2),
        solution: [
          ...item.paragraphs.slice(2),
          ...porra2026.paragraphs,
          scoringIntro,
          ...scoringRows.map((row) => `${row.prediction}: ${row.points}`),
          scoringFooter,
        ].filter(Boolean),
        architecture: porra2026.architecture,
        technologies: [...porra2026.technologies],
        results: includes ? [...includes] : [],
        images: PORRA_IMAGES,
      }
    }

    if (item.id === 'worldcup-2022') {
      const scoringRows = 'scoringRows' in item ? item.scoringRows : []
      const scoringIntro = 'scoringIntro' in item ? item.scoringIntro : ''
      const scoringFooter = 'scoringFooter' in item ? item.scoringFooter : ''
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: item.paragraphs.slice(0, 2),
        solution: [
          porra2022.intro,
          ...item.paragraphs.slice(2),
          ...porra2022.paragraphs,
          porra2022.frontendIntro,
          scoringIntro,
          ...scoringRows.map((row) => `${row.prediction}: ${row.points}`),
          scoringFooter,
        ].filter(Boolean),
        architecture: porra2022.architecture,
        technologies: [
          ...porra2022.frontendTechnologies,
          ...porra2022.backendTechnologies,
        ],
        results: [
          ...porra2022.recalculates,
          ...porra2022.frontendDisplays,
        ],
        images: PORRA_2022_IMAGES,
      }
    }

    if (item.id === 'coworking') {
      const includes = 'includes' in item ? item.includes : []
      const lead = 'lead' in item ? item.lead : undefined
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: [lead, item.paragraphs[0]].filter(Boolean) as string[],
        solution: [
          ...item.paragraphs.slice(1),
          ...coworking.paragraphs,
          ...coworking.midParagraphs,
        ],
        architecture: coworking.architecture,
        technologies: [
          ...coworking.frontendTechnologies,
          ...coworking.backendTechnologies,
        ],
        results: includes
          ? [...includes, ...coworking.reservationTypes]
          : [...coworking.reservationTypes],
        images: COWORKING_IMAGES,
      }
    }

    const includes = 'includes' in item ? item.includes : []
    return {
      id: item.id,
      year: item.year,
      title: item.title,
      subtitle: item.subtitle,
      problem: item.paragraphs.slice(0, 1),
      solution: [
        ...item.paragraphs.slice(1),
        ...sumero.paragraphs,
        ...sumero.midParagraphs,
      ],
      technologies: [...sumero.technologies],
      results: includes ? [...includes, ...sumero.rules] : [...sumero.rules],
      images: SUMERO_IMAGES,
      note: 'Rework UI 2026',
    }
  })
}

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

export function Projects({
  chrome,
  t,
  locale,
}: {
  chrome: Chrome
  t: Translation
  locale: Locale
}) {
  const studies = useMemo(() => buildCaseStudies(t, locale), [t, locale])
  const [lightbox, setLightbox] = useState<{
    images: string[]
    index: number
    alt: string
  } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="projects" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {chrome.projects.title}
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t.projects.intro}
          </p>
        </Reveal>

        <div className="flex flex-col gap-28">
          {studies.map((study, i) => {
            const mediaLeft = i % 2 === 0
            const isOpen = expanded === study.id

            return (
              <article key={study.id} id={study.id} className="scroll-mt-28">
                <div
                  className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-12 ${
                    mediaLeft ? '' : ''
                  }`}
                >
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
                            onClick={() =>
                              setLightbox({
                                images: study.images,
                                index: 0,
                                alt: study.title,
                              })
                            }
                            className="h-full w-full cursor-zoom-in"
                          >
                            <img
                              src={study.images[0]}
                              alt={study.title}
                              className="media-zoom h-full w-full object-cover object-top"
                            />
                          </button>
                        ) : (
                          <ProjectCarousel
                            images={study.images}
                            alt={study.title}
                            expandLabel={chrome.projects.expandImage}
                            onExpand={(index) =>
                              setLightbox({
                                images: study.images,
                                index,
                                alt: study.title,
                              })
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
                      <h3 className="text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
                        {study.title}
                      </h3>
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
                        {(isOpen ? study.solution : study.solution.slice(0, 2)).map(
                          (p) => (
                            <p key={p.slice(0, 48)}>{p}</p>
                          ),
                        )}
                        {isOpen && study.stages
                          ? study.stages.map((stage) => (
                              <div key={stage.title} className="pt-2">
                                <p className="mb-1 font-medium text-ink">
                                  {stage.title}
                                </p>
                                {stage.body.split('\n\n').map((part) => (
                                  <p key={part.slice(0, 40)} className="mb-2">
                                    {part}
                                  </p>
                                ))}
                              </div>
                            ))
                          : null}
                      </CaseBlock>

                      {isOpen && study.architecture ? (
                        <CaseBlock label={chrome.projects.architecture}>
                          <pre className="overflow-x-auto rounded-lg border border-line bg-bg p-4 font-mono text-xs leading-relaxed text-ink/80 whitespace-pre-wrap">
                            {study.architecture}
                          </pre>
                        </CaseBlock>
                      ) : null}

                      {study.technologies.length > 0 ? (
                        <CaseBlock label={chrome.projects.technologies}>
                          <ul className="flex flex-wrap gap-2">
                            {(isOpen
                              ? study.technologies
                              : study.technologies.slice(0, 6)
                            ).map((tech) => (
                              <li
                                key={tech}
                                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink/80"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </CaseBlock>
                      ) : null}

                      {isOpen && study.results.length > 0 ? (
                        <CaseBlock label={chrome.projects.results}>
                          <ul className="list-disc space-y-1.5 pl-5">
                            {study.results.map((result) => (
                              <li key={result}>{result}</li>
                            ))}
                          </ul>
                        </CaseBlock>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((current) =>
                          current === study.id ? null : study.id,
                        )
                      }
                      className="btn-press mt-8 inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-ink/25"
                    >
                      {isOpen ? chrome.projects.close : chrome.projects.viewCase}
                    </button>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </div>

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
    </section>
  )
}
