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
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <div className="border-b border-line bg-bg/70 px-6 py-8 sm:px-10">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">
                {chrome.fullName}
              </h3>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
                {t.profile.body}
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-12">
              <div className="border-b border-line px-6 py-10 sm:px-10 lg:col-span-7 lg:border-r lg:border-b-0">
                <p className="mb-6 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {chrome.experience.title}
                </p>
                <ul className="flex flex-col gap-8">
                  {t.experience.jobs.map((job) => (
                    <li key={`${job.company}-${job.role}`}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="font-medium text-ink">
                          {job.role} · {job.company}
                        </p>
                        <p className="font-mono text-xs text-muted">{job.dates}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted">{job.place}</p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
                        {job.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 py-10 sm:px-10 lg:col-span-5">
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
                  {chrome.resume.languages}
                </p>
                <p className="mb-8 text-sm leading-relaxed text-ink/85">
                  {t.education.languages}
                </p>

                <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {chrome.resume.courses}
                </p>
                <ul className="mb-8 flex flex-col gap-4">
                  {t.courses.items.map((item) => (
                    <li key={`${item.title}-${item.dates}`}>
                      <p className="text-sm font-medium text-ink">{item.title}</p>
                      <p className="text-sm text-muted">{item.school}</p>
                      <p className="font-mono text-xs text-muted">{item.dates}</p>
                    </li>
                  ))}
                </ul>

                <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {chrome.resume.additional}
                </p>
                <p className="text-sm leading-relaxed text-ink/80">
                  {t.education.additional}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
