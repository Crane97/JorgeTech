import { Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { useI18n } from '../i18n/useI18n'
import { Reveal } from './Reveal'

const CV_PDF = '/cv/Jorge-Ruiz-de-la-Torre-CV.pdf'

/** "Spanish (Native) · French (Advanced — Native)" → [{ name, level }]. */
function parseLanguages(value: string) {
  return value.split(' · ').map((part) => {
    const match = part.match(/^(.*?)\s*\((.*)\)$/)
    return match ? { name: match[1], level: match[2] } : { name: part, level: '' }
  })
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
      {children}
    </p>
  )
}

export function Resume() {
  const { t } = useI18n()
  const languages = parseLanguages(t.education.languages)

  return (
    <section id="resume" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 sm:mb-16">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {t.resume.title}
          </h2>
          <a
            href={CV_PDF}
            download
            className="btn-press inline-flex h-11 items-center gap-2.5 rounded-lg bg-ink px-5 text-sm font-medium text-surface hover:bg-ink/90"
          >
            <Download size={16} strokeWidth={1.5} />
            {t.resume.download}
            <span className="font-mono text-[11px] text-surface/60">{t.resume.downloadNote}</span>
          </a>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Identity column: stays in view while the timeline scrolls. */}
          <Reveal className="lg:col-span-4">
            <aside className="lg:sticky lg:top-28">
              <h3 className="text-2xl leading-tight font-medium tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                {t.fullName}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.profile.body}</p>

              <div className="mt-10 border-t border-line pt-8">
                <Label>{t.resume.languages}</Label>
                <ul className="flex flex-col gap-2.5">
                  {languages.map(({ name, level }) => (
                    <li
                      key={name}
                      className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-2.5 last:border-b-0"
                    >
                      <span className="text-[15px] text-ink">{name}</span>
                      <span className="font-mono text-xs text-muted">{level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-8">
                <Label>{t.resume.additional}</Label>
                <p className="text-sm leading-relaxed text-ink/80">{t.education.additional}</p>
              </div>
            </aside>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <Label>{t.resume.experience}</Label>
              <ol className="relative">
                {/* Timeline spine */}
                <span
                  aria-hidden
                  className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
                />
                {t.experience.jobs.map((job, i) => {
                  const current = i === 0
                  return (
                    <li key={`${job.company}-${job.dates}`} className="relative pb-10 pl-9 last:pb-0">
                      <span
                        aria-hidden
                        className={`absolute top-[7px] left-0 h-[11px] w-[11px] rounded-full border-2 ${
                          current
                            ? 'border-accent bg-accent ring-4 ring-accent-soft'
                            : 'border-ink/30 bg-bg'
                        }`}
                      />
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-xl font-medium tracking-[-0.02em] text-ink sm:text-[1.375rem]">
                          {job.role}
                        </h4>
                        {current ? (
                          <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                            {t.resume.current}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 font-mono text-xs text-muted">
                        <span className="text-ink/80">{job.company}</span>
                        <span aria-hidden> · </span>
                        {job.place}
                        <span aria-hidden> · </span>
                        {job.dates}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2.5 text-[15px] leading-relaxed text-ink/80">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-ink/30"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ol>
            </Reveal>

            <Reveal className="mt-16 border-t border-line pt-10">
              <Label>{t.resume.education}</Label>
              <ul className="grid gap-4 sm:grid-cols-2">
                {t.education.items.map((item) => (
                  <li key={item.title} className="rounded-xl border border-line bg-surface/60 p-5">
                    <p className="font-mono text-[11px] text-muted">{item.dates}</p>
                    <p className="mt-2 font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.school}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <Label>{t.resume.courses}</Label>
              <ul className="grid gap-3 sm:grid-cols-2">
                {t.courses.items.map((item) => (
                  <li
                    key={`${item.title}-${item.dates}`}
                    className="flex flex-col rounded-xl border border-line p-4"
                  >
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-[13px] text-muted">{item.school}</p>
                    <p className="mt-auto pt-3 font-mono text-[11px] text-muted">{item.dates}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
