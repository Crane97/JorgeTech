import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { Reveal } from './Reveal'

export function Experience({ chrome, t }: { chrome: Chrome; t: Translation }) {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {chrome.experience.title}
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {chrome.experience.intro}
          </p>
        </Reveal>

        <ul className="mx-auto flex max-w-4xl flex-col">
          {t.experience.jobs.map((job, i) => (
            <Reveal key={`${job.company}-${job.dates}`} delay={i * 0.04}>
              <li className="grid gap-4 border-t border-line py-10 md:grid-cols-[180px_1fr] md:gap-10">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted">
                    {job.dates}
                  </p>
                  <p className="mt-2 text-sm text-muted">{job.place}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-ink sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{job.company}</p>
                  <ul className="mt-5 flex flex-col gap-3 text-[15px] leading-relaxed text-ink/85">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
