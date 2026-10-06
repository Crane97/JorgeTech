import { ArrowRight } from 'lucide-react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { useI18n } from '../i18n/useI18n'
import { buildCaseStudies, type CaseStudy } from '../lib/caseStudies'
import { useProjectParam } from '../lib/useProjectParam'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'

/** Scroll distance (in viewport heights) spent on each project transition. */
const STEP_VH = 85

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Card face shared by the 3D stage and the reduced-motion list. */
function StackCardFace({
  study,
  index,
  total,
  onOpen,
  onFocus,
}: {
  study: CaseStudy
  index: number
  total: number
  onOpen: () => void
  onFocus?: () => void
}) {
  const { t } = useI18n()
  const blurb = study.subtitle || study.problem[0] || ''

  return (
    <button
      type="button"
      onClick={onOpen}
      onFocus={onFocus}
      aria-label={`${t.projects.viewCase}: ${study.title}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_30px_80px_-20px_rgb(15_23_42/0.25),0_8px_24px_rgb(15_23_42/0.06)] transition-[border-color] duration-200 hover:border-ink/20"
    >
      <div className="media-surface relative min-h-0 flex-1 overflow-hidden border-b border-line">
        {study.images[0] ? (
          <img
            src={study.images[0]}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : null}
        <span className="absolute top-4 left-4 rounded-md bg-surface/90 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-ink/70 backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="flex shrink-0 flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-7">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-baseline gap-3">
            <h3 className="line-clamp-2 text-xl sm:truncate font-medium tracking-[-0.02em] text-ink sm:text-[1.75rem]">
              {study.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{study.year}</span>
          </div>
          <p className="line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-muted">
            {blurb}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <ul className="hidden flex-wrap gap-1.5 md:flex">
            {study.technologies.slice(0, 3).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink/75"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-surface transition-transform duration-200 group-hover:translate-x-0.5">
            {t.projects.viewCase}
            <ArrowRight size={16} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </button>
  )
}

/**
 * One card on the stage. `position` is the continuous scroll index: card i is
 * front and centre when position === i, rising from below before that and
 * tilting back into depth after it.
 */
function StageCard({
  study,
  index,
  total,
  position,
  onOpen,
  onFocus,
}: {
  study: CaseStudy
  index: number
  total: number
  position: MotionValue<number>
  onOpen: () => void
  onFocus: () => void
}) {
  // d < 0: still coming; 0: current; d > 0: already passed.
  const d = useTransform(position, (p) => p - index)
  // Rising cards travel a full card height; receding ones lift a fixed few
  // pixels per step so the stack peeks above the front card without
  // climbing into the section heading on tall phone cards.
  const y = useTransform(d, (v) => (v < 0 ? `${clamp(-v, 0, 1.15) * 105}%` : `${-clamp(v, 0, 3) * (window.innerWidth < 640 ? 14 : 30)}px`))
  const z = useTransform(d, (v) => (v > 0 ? -clamp(v, 0, 3) * 260 : 0))
  const rotateX = useTransform(d, (v) =>
    v < 0 ? clamp(-v, 0, 1) * -14 : clamp(v, 0, 3) * 9,
  )
  const opacity = useTransform(d, (v) => (v > 1.6 ? clamp(1 - (v - 1.6), 0, 1) : 1))
  // Receding cards sink into the page colour instead of just shrinking.
  const veil = useTransform(d, (v) => (v > 0 ? clamp(v * 0.55, 0, 0.8) : 0))

  return (
    <motion.div
      className="absolute inset-0 origin-[50%_0%] will-change-transform"
      style={{ y, z, rotateX, opacity, zIndex: index }}
    >
      <StackCardFace
        study={study}
        index={index}
        total={total}
        onOpen={onOpen}
        onFocus={onFocus}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-bg"
        style={{ opacity: veil }}
      />
    </motion.div>
  )
}

export function ProjectsStack() {
  const { t, locale } = useI18n()
  const reduce = useReducedMotion()
  const studies = useMemo(() => buildCaseStudies(t, locale), [t, locale])
  const { openId, open, close } = useProjectParam()
  const sectionRef = useRef<HTMLElement>(null)
  const total = studies.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const position = useTransform(scrollYProgress, (p) => p * (total - 1))
  const progressScale = useTransform(scrollYProgress, [0, 1], [1 / total, 1])
  const [active, setActive] = useState(0)
  useMotionValueEvent(position, 'change', (p) => {
    setActive(clamp(Math.round(p), 0, total - 1))
  })

  /** Keyboard users tab through cards: bring the focused one to the front. */
  const scrollToCard = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const span = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (span * index) / Math.max(1, total - 1), behavior: 'auto' })
  }

  const openIndex = studies.findIndex((s) => s.id === openId)
  const openStudy = openIndex >= 0 ? studies[openIndex] : null

  const header = (
    <div className="max-w-2xl">
      <h2 className="mb-2 text-3xl font-medium tracking-[-0.03em] text-ink sm:mb-3 sm:text-5xl">
        {t.projects.title}
      </h2>
      <p className="text-[15px] leading-relaxed text-muted sm:text-lg">{t.projects.intro}</p>
    </div>
  )

  const modal = openStudy ? (
    <ProjectModal
      study={openStudy}
      index={openIndex}
      total={total}
      onClose={close}
      onNavigate={(next) => open(studies[(next + total) % total].id)}
    />
  ) : null

  if (reduce) {
    return (
      <section id="projects" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12">{header}</Reveal>
          <ul className="flex flex-col gap-10">
            {studies.map((study, i) => (
              <li key={study.id} className="h-[min(78dvh,720px)]">
                <StackCardFace study={study} index={i} total={total} onOpen={() => open(study.id)} />
              </li>
            ))}
          </ul>
        </div>
        {modal}
      </section>
    )
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100dvh + ${(total - 1) * STEP_VH}vh)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden px-5 pt-20 pb-6 sm:px-8 sm:pt-24 sm:pb-10 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-6">
          {header}
          <div className="hidden shrink-0 flex-col items-end gap-3 sm:flex" aria-hidden>
            <p className="font-mono text-xs tracking-[0.14em] text-muted">
              <span className="text-ink">{String(active + 1).padStart(2, '0')}</span>
              {' / '}
              {String(total).padStart(2, '0')}
            </p>
            <div className="h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full origin-left bg-ink"
                style={{ scaleX: progressScale }}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-[1120px] min-h-0 flex-1 [perspective:1600px] [perspective-origin:50%_0%] sm:mt-12">
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {studies.map((study, i) => (
              <StageCard
                key={study.id}
                study={study}
                index={i}
                total={total}
                position={position}
                onOpen={() => open(study.id)}
                onFocus={() => scrollToCard(i)}
              />
            ))}
          </div>
        </div>
      </div>
      {modal}
    </section>
  )
}
