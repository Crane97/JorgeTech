import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n/useI18n'
import type { CaseStudy } from '../lib/caseStudies'
import { Lightbox } from './Lightbox'
import { ProjectCarousel } from './ProjectCarousel'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

function CaseBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <div className="space-y-3 text-[15px] leading-relaxed text-ink/85">{children}</div>
    </div>
  )
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export function ProjectModal({
  study,
  index,
  total,
  onClose,
  onNavigate,
}: {
  study: CaseStudy
  index: number
  total: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const lightboxOpen = lightbox !== null

  // Lock page scroll and restore focus to whatever opened the modal.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prevOverflow
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  // New project inside the modal: start at its top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    setLightbox(null)
  }, [study.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return // the lightbox owns the keyboard while open
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNavigate(index - 1)
      else if (e.key === 'ArrowRight') onNavigate(index + 1)
      else if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, lightboxOpen, onClose, onNavigate])

  const iconButton =
    'btn-press inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-ink hover:border-ink/25'

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <motion.button
        type="button"
        aria-label={t.projects.close}
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-ink/35 backdrop-blur-[6px]"
        onClick={onClose}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: EASE_OUT }}
      />

      <motion.div
        ref={panelRef}
        className="absolute inset-x-0 top-3 bottom-0 mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-[0_40px_120px_-20px_rgb(15_23_42/0.35)] sm:inset-x-6 sm:top-6 sm:bottom-6 sm:rounded-2xl"
        initial={reduce ? false : { opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8 sm:py-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <span className="hidden font-mono text-xs whitespace-nowrap text-muted sm:inline">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <h2
              id="project-modal-title"
              className="truncate text-lg font-medium tracking-[-0.02em] text-ink sm:text-xl"
            >
              {study.title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={t.projects.previousProject}
              onClick={() => onNavigate(index - 1)}
              className={iconButton}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={t.projects.nextProject}
              onClick={() => onNavigate(index + 1)}
              className={iconButton}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
            <button
              ref={closeRef}
              type="button"
              aria-label={t.projects.close}
              onClick={onClose}
              className={`${iconButton} ml-2`}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <motion.div
            key={study.id}
            className="px-5 pt-6 pb-16 sm:px-8 sm:pt-8"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <div className="media-surface aspect-[16/9] overflow-hidden rounded-xl border border-line">
              {study.images.length > 1 ? (
                <ProjectCarousel
                  images={study.images}
                  alt={study.title}
                  expandLabel={t.projects.expandImage}
                  onExpand={setLightbox}
                />
              ) : study.images[0] ? (
                <button
                  type="button"
                  aria-label={t.projects.expandImage}
                  onClick={() => setLightbox(0)}
                  className="h-full w-full cursor-zoom-in"
                >
                  <img
                    src={study.images[0]}
                    alt={study.title}
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ) : (
                <div className="flex h-full items-end p-6">
                  <p className="font-mono text-xs text-muted">{t.projects.photosNote}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="mb-2 font-mono text-xs text-muted">
                  {study.year}
                  {study.note ? ` · ${study.note}` : ''}
                </p>
                {study.subtitle ? (
                  <p className="text-xl leading-snug font-medium tracking-[-0.02em] text-ink sm:text-2xl">
                    {study.subtitle}
                  </p>
                ) : null}
              </div>
              {study.liveUrl ? (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-surface hover:bg-ink/90"
                >
                  {t.projects.visitLive}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              ) : null}
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="flex flex-col gap-8 lg:col-span-7">
                <CaseBlock label={t.projects.problem}>
                  {study.problem.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </CaseBlock>
                <CaseBlock label={t.projects.solution}>
                  {study.solution.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  {study.stages?.map((stage) => (
                    <div key={stage.title} className="pt-2">
                      <p className="mb-1 font-medium text-ink">{stage.title}</p>
                      {stage.body.split('\n\n').map((part) => (
                        <p key={part.slice(0, 40)} className="mb-2">
                          {part}
                        </p>
                      ))}
                    </div>
                  ))}
                </CaseBlock>
                {study.architecture ? (
                  <CaseBlock label={t.projects.architecture}>
                    <pre className="overflow-x-auto rounded-lg border border-line bg-bg p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-ink/80">
                      {study.architecture}
                    </pre>
                  </CaseBlock>
                ) : null}
              </div>

              <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:col-span-5 lg:self-start">
                {study.technologies.length > 0 ? (
                  <CaseBlock label={t.projects.technologies}>
                    <ul className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
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
                  <CaseBlock label={t.projects.results}>
                    <ul className="list-disc space-y-1.5 pl-5">
                      {study.results.map((result) => (
                        <li key={result}>{result}</li>
                      ))}
                    </ul>
                  </CaseBlock>
                ) : null}
              </aside>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {lightboxOpen ? (
        <Lightbox
          images={study.images}
          index={lightbox}
          alt={study.title}
          closeLabel={t.projects.close}
          previousLabel={t.projects.previousImage}
          nextLabel={t.projects.nextImage}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      ) : null}
    </div>
  )
}
