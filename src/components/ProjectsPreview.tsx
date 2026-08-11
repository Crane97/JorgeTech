import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Chrome } from '../content/chrome'
import type { Locale, Translation } from '../i18n'
import { buildCaseStudies } from '../lib/caseStudies'
import { Reveal } from './Reveal'

const PREVIEW_COUNT = 3

export function ProjectsPreview({
  chrome,
  t,
  locale,
}: {
  chrome: Chrome
  t: Translation
  locale: Locale
}) {
  const studies = useMemo(
    () => buildCaseStudies(t, locale).slice(0, PREVIEW_COUNT),
    [t, locale],
  )

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {chrome.projects.title}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {chrome.projects.intro}
            </p>
          </div>
          <Link
            to="/projects"
            className="btn-press inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink hover:border-ink/25 sm:self-auto"
          >
            {chrome.projects.viewAllProjects}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </Reveal>

        <ul className="flex flex-col">
          {studies.map((study, i) => {
            const blurb =
              study.subtitle ||
              study.problem[0] ||
              study.solution[0] ||
              ''
            const image = study.images[0]

            return (
              <li
                key={study.id}
                className="group grid items-center gap-6 border-t border-line py-8 sm:grid-cols-12 sm:gap-10 sm:py-10"
              >
                <Reveal className="sm:col-span-5" delay={0.04 + i * 0.04}>
                  <Link
                    to={`/projects#${study.id}`}
                    className="media-surface block aspect-[16/10] overflow-hidden rounded-xl border border-line shadow-sm transition-[border-color,box-shadow] duration-300 group-hover:border-ink/20 group-hover:shadow-md"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={study.title}
                        loading="lazy"
                        className="media-zoom h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-end p-5">
                        <p className="font-mono text-xs tracking-wide text-muted">
                          {t.projects.photosNote}
                        </p>
                      </div>
                    )}
                  </Link>
                </Reveal>

                <Reveal className="sm:col-span-7" delay={0.06 + i * 0.04}>
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-medium tracking-[-0.02em] text-ink sm:text-2xl">
                      <Link
                        to={`/projects#${study.id}`}
                        className="transition-colors duration-200 hover:text-ink/70"
                      >
                        {study.title}
                      </Link>
                    </h3>
                    <time
                      dateTime={study.year}
                      className="shrink-0 font-mono text-xs tracking-wide text-muted"
                    >
                      {study.year}
                    </time>
                  </div>
                  {blurb ? (
                    <p className="max-w-xl text-[15px] leading-relaxed text-muted">
                      {blurb}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link
                      to={`/projects#${study.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-ink"
                    >
                      {chrome.projects.viewCase}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </Link>
                    {study.liveUrl ? (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity duration-200 hover:opacity-80"
                      >
                        {chrome.projects.visitLive}
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="border-t border-line pt-10">
          <Link
            to="/projects"
            className="btn-press inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-surface hover:bg-ink/90"
          >
            {chrome.projects.viewAllProjects}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
