import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { Reveal } from './Reveal'

export function Resume({ chrome, t }: { chrome: Chrome; t: Translation }) {
  return (
    <section id="resume" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {chrome.resume.title}
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {chrome.resume.intro}
          </p>
        </Reveal>

        <Reveal>
          <div className="border-t border-line pt-8">
            <h3 className="text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
              {chrome.fullName}
            </h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
              {t.profile.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {chrome.resume.experience}
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
                        <li
                          key={point}
                          className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                        >
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

        <Reveal>
          <div className="mt-6 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-6 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {chrome.resume.education}
              </p>
              <ul className="mb-10 flex flex-col gap-6">
                {t.education.items.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.school}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {item.dates}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {chrome.resume.courses}
              </p>
              <ul className="flex flex-col gap-4">
                {t.courses.items.map((item) => (
                  <li key={`${item.title}-${item.dates}`}>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-sm text-muted">{item.school}</p>
                    <p className="font-mono text-xs text-muted">{item.dates}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {chrome.resume.languages}
              </p>
              <p className="mb-8 text-sm leading-relaxed text-ink/85">
                {t.education.languages}
              </p>

              <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {chrome.resume.additional}
              </p>
              <p className="text-sm leading-relaxed text-ink/80">
                {t.education.additional}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
