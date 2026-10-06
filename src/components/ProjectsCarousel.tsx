import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { useI18n } from '../i18n/useI18n'
import { logoMark } from '../lib/assets'
import { buildCaseStudies, type CaseStudy } from '../lib/caseStudies'
import { useProjectParam } from '../lib/useProjectParam'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'

/** Idle spin: one full turn per minute. */
const AUTO_DEG_PER_S = 6
/** Wheel/drag momentum decay (per second) and the speed below which we snap. */
const FRICTION = 5
const SNAP_BELOW_DEG_PER_S = 10
/** After a touch/drag/wheel, wait this long before the idle spin resumes. */
const RESUME_AFTER_MS = 2500
/** Pointer travel that turns a press into a drag (and cancels the click). */
const DRAG_THRESHOLD_PX = 6

const pad = (n: number) => String(n).padStart(2, '0')

/** Shortest signed distance between two angles, in (-180, 180]. */
function angleDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180
}

/** Nearest angle at which a card faces the viewer square-on. */
function snapAngle(a: number, step: number) {
  return Math.round(a / step) * step
}

type Geometry = { width: number; height: number; radius: number }

function useRingGeometry(stage: RefObject<HTMLDivElement | null>, count: number) {
  const [geo, setGeo] = useState<Geometry>({ width: 560, height: 470, radius: 420 })
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const width = Math.round(w < 640 ? w * 0.8 : Math.min(620, w * 0.46))
      // 16:10 screenshot + footer with title and button.
      const height = Math.round(width * 0.625 + (w < 640 ? 150 : 132))
      // Cards just touch at their edges, plus breathing room.
      const radius = Math.round((width / 2 / Math.tan(Math.PI / count)) * 1.12)
      setGeo({ width, height, radius })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [stage, count])
  return geo
}

function CardFront({
  study,
  index,
  total,
  isFront,
  veil,
  onActivate,
}: {
  study: CaseStudy
  index: number
  total: number
  isFront: boolean
  veil: MotionValue<number>
  onActivate: () => void
}) {
  const { t } = useI18n()
  const blurb = study.subtitle || study.problem[0] || ''

  return (
    <button
      type="button"
      onClick={onActivate}
      tabIndex={isFront ? 0 : -1}
      aria-label={`${t.projects.viewCase}: ${study.title}`}
      className="group absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_30px_80px_-24px_rgb(15_23_42/0.28),0_8px_24px_rgb(15_23_42/0.06)] [backface-visibility:hidden] focus-visible:outline-offset-4"
    >
      <div className="media-surface relative min-h-0 flex-1 overflow-hidden border-b border-line">
        {study.images[0] ? (
          <img
            src={study.images[0]}
            alt=""
            draggable={false}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover object-top select-none"
          />
        ) : null}
        <span className="absolute top-3 left-3 rounded-md bg-surface/90 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-ink/70">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>
      <div className="flex shrink-0 flex-col gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-medium tracking-[-0.02em] text-ink sm:text-xl">
              {study.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{study.year}</span>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-muted">{blurb}</p>
        </div>
        {/* Visual affordance only: the whole face is the button. */}
        <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-medium text-surface transition-[background-color,transform] duration-200 group-hover:bg-ink/90 group-active:scale-[0.98] sm:w-auto sm:self-start">
          {t.projects.viewCase}
          <ArrowRight size={18} strokeWidth={1.5} />
        </span>
      </div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-bg"
        style={{ opacity: veil }}
      />
    </button>
  )
}

function CardBack({ index, total, title }: { index: number; total: number; title: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-ink bg-ink text-surface [backface-visibility:hidden] [transform:rotateY(180deg)]"
    >
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-surface/10" />
      <img src={logoMark} alt="" className="h-14 w-14 opacity-90" draggable={false} />
      <p className="font-mono text-xs tracking-[0.2em] text-surface/60">
        {pad(index + 1)} / {pad(total)}
      </p>
      <p className="max-w-[70%] text-center text-sm text-surface/70">{title}</p>
    </div>
  )
}

function RingCard({
  study,
  index,
  total,
  step,
  geo,
  angle,
  isFront,
  onActivate,
}: {
  study: CaseStudy
  index: number
  total: number
  step: number
  geo: Geometry
  angle: MotionValue<number>
  isFront: boolean
  onActivate: () => void
}) {
  // Side cards sink into the page colour as they turn away.
  const veil = useTransform(angle, (a) => {
    const off = Math.abs(angleDelta(a, index * step))
    return Math.min(0.55, Math.max(0, (off - 12) / 140))
  })

  return (
    <div
      className="absolute top-0 left-1/2 [transform-style:preserve-3d]"
      style={{
        width: geo.width,
        height: geo.height,
        marginLeft: -geo.width / 2,
        transform: `rotateY(${index * step}deg) translateZ(${geo.radius}px)`,
      }}
    >
      <CardFront
        study={study}
        index={index}
        total={total}
        isFront={isFront}
        veil={veil}
        onActivate={onActivate}
      />
      <CardBack index={index} total={total} title={study.title} />
    </div>
  )
}

export function ProjectsCarousel() {
  const { t, locale } = useI18n()
  const reduce = useReducedMotion()
  const studies = useMemo(() => buildCaseStudies(t, locale), [t, locale])
  const { openId, open, close } = useProjectParam()
  const total = studies.length
  const step = 360 / total

  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const geo = useRingGeometry(stageRef, total)

  const angle = useMotionValue(0)
  const ringRotate = useTransform(angle, (a) => -a)
  const [front, setFront] = useState(0)
  useMotionValueEvent(angle, 'change', (a) => {
    const i = ((Math.round(a / step) % total) + total) % total
    setFront((prev) => (prev === i ? prev : i))
  })

  // Mutable physics state lives in a ref so the rAF loop never re-renders React.
  const sim = useRef({
    velocity: 0,
    snapTo: null as number | null,
    hovered: false,
    dragging: false,
    lastInteraction: 0,
    inView: false,
  })

  const modalOpen = Boolean(openId)
  const autoAllowed = useRef(true)
  autoAllowed.current = !reduce && !modalOpen

  const goTo = (target: number) => {
    const s = sim.current
    s.velocity = 0
    s.lastInteraction = performance.now()
    if (reduce) {
      angle.set(target)
      s.snapTo = null
    } else {
      s.snapTo = target
    }
  }

  /** Bring card `index` to the front along the shortest way round. */
  const bringToFront = (index: number) => {
    const a = angle.get()
    goTo(a + angleDelta(a, index * step))
  }

  const stepBy = (dir: 1 | -1) => goTo(snapAngle(angle.get(), step) + dir * step)

  // Physics loop: momentum → snap → idle spin.
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = sim.current
      let a = angle.get()

      if (!s.dragging) {
        if (s.velocity !== 0) {
          a += s.velocity * dt
          s.velocity *= Math.exp(-FRICTION * dt)
          if (Math.abs(s.velocity) < SNAP_BELOW_DEG_PER_S) {
            s.velocity = 0
            s.snapTo = snapAngle(a, step)
          }
        } else if (s.snapTo !== null) {
          const diff = s.snapTo - a
          if (Math.abs(diff) < 0.05) {
            a = s.snapTo
            s.snapTo = null
            s.lastInteraction = now
          } else {
            a += diff * (1 - Math.exp(-9 * dt))
          }
        } else if (
          autoAllowed.current &&
          !s.hovered &&
          s.inView &&
          document.visibilityState === 'visible' &&
          now - s.lastInteraction > RESUME_AFTER_MS
        ) {
          a += AUTO_DEG_PER_S * dt
        }
      }

      if (a !== angle.get()) angle.set(a)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [angle, step])

  // Only spin while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      sim.current.inView = entry.isIntersecting
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Wheel over the ring spins it instead of scrolling the page.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit
      const s = sim.current
      s.snapTo = null
      s.lastInteraction = performance.now()
      s.velocity = Math.max(-720, Math.min(720, s.velocity + delta * 0.9))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Drag / swipe: horizontal moves spin the ring; vertical swipes still scroll the page.
  const drag = useRef({ id: -1, startX: 0, lastX: 0, lastT: 0, v: 0, moved: false })
  const degPerPx = step / (geo.width * 0.9)

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false }
    const s = sim.current
    s.velocity = 0
    s.snapTo = null
    s.lastInteraction = performance.now()
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current
    if (e.pointerId !== d.id) return
    if (!d.moved && Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD_PX) return
    if (!d.moved) {
      d.moved = true
      sim.current.dragging = true
      // Capture only once it is a real drag, so plain clicks still reach the card.
      stageRef.current?.setPointerCapture(e.pointerId)
    }
    const dx = e.clientX - d.lastX
    const dt = Math.max(1, e.timeStamp - d.lastT) / 1000
    angle.set(angle.get() - dx * degPerPx)
    d.v = (-dx * degPerPx) / dt
    d.lastX = e.clientX
    d.lastT = e.timeStamp
  }

  const endDrag = (e: ReactPointerEvent) => {
    const d = drag.current
    if (e.pointerId !== d.id) return
    d.id = -1
    const s = sim.current
    s.lastInteraction = performance.now()
    if (!d.moved) return
    s.dragging = false
    if (reduce) {
      angle.set(snapAngle(angle.get() + Math.sign(d.v) * step * 0.5, step))
    } else {
      s.velocity = Math.max(-420, Math.min(420, d.v))
      if (Math.abs(s.velocity) < SNAP_BELOW_DEG_PER_S) s.snapTo = snapAngle(angle.get(), step)
    }
  }

  // A drag must never open a project.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  const activate = (index: number) => {
    if (index === front) open(studies[index].id)
    else bringToFront(index)
  }

  const openIndex = studies.findIndex((s) => s.id === openId)
  const openStudy = openIndex >= 0 ? studies[openIndex] : null

  const arrowButton =
    'btn-press inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-sm hover:border-ink/25'

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-16 overflow-x-clip px-5 py-24 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {t.projects.title}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{t.projects.intro}</p>
          </div>
          <p className="font-mono text-xs tracking-[0.14em] text-muted" aria-live="polite">
            <span className="text-ink">{pad(front + 1)}</span> / {pad(total)}
            <span className="sr-only">: {studies[front]?.title}</span>
          </p>
        </Reveal>
      </div>

      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.projects.carouselLabel}
        className="relative mx-auto w-full max-w-[1400px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ height: geo.height + 40, perspective: `${Math.round(geo.radius * 4.2)}px` }}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') sim.current.hovered = true
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') sim.current.hovered = false
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') stepBy(-1)
          else if (e.key === 'ArrowRight') stepBy(1)
        }}
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ z: -geo.radius, rotateY: ringRotate }}
        >
          {studies.map((study, i) => (
            <RingCard
              key={study.id}
              study={study}
              index={i}
              total={total}
              step={step}
              geo={geo}
              angle={angle}
              isFront={i === front}
              onActivate={() => activate(i)}
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1400px] items-center justify-center gap-4">
        <button type="button" aria-label={t.projects.previousProject} onClick={() => stepBy(-1)} className={arrowButton}>
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <p className="min-w-0 text-center font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          {t.projects.carouselHint}
        </p>
        <button type="button" aria-label={t.projects.nextProject} onClick={() => stepBy(1)} className={arrowButton}>
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      {openStudy ? (
        <ProjectModal
          study={openStudy}
          index={openIndex}
          total={total}
          onClose={close}
          onNavigate={(next) => open(studies[(next + total) % total].id)}
        />
      ) : null}
    </section>
  )
}
