import { ArrowRight } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { useRef } from 'react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { Magnetic } from './Magnetic'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.35)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.4 })

  const glow = useMotionTemplate`radial-gradient(620px circle at ${springX}% ${springY}%, rgb(26 102 255 / 0.18), transparent 58%)`
  const glowSoft = useMotionTemplate`radial-gradient(900px circle at ${springX}% ${springY}%, rgb(11 15 23 / 0.05), transparent 60%)`

  const nameParts = chrome.brand.split(' ')

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-bg pt-16"
      onPointerMove={(e) => {
        if (reduce) return
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
      }}
    >
      <div className="hero-grid absolute inset-0 opacity-[0.55]" aria-hidden />
      <div className="hero-noise absolute inset-0 opacity-[0.35]" aria-hidden />

      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glow }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glowSoft }}
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(700px circle at 70% 30%, rgb(26 102 255 / 0.14), transparent 60%)',
          }}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-[18%] hidden select-none font-medium tracking-[-0.06em] text-ink/[0.035] lg:block"
        style={{ fontSize: 'clamp(7rem, 18vw, 14rem)', lineHeight: 0.9 }}
      >
        JR
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <motion.p
            className="mb-6 font-mono text-xs tracking-[0.14em] text-ink/75 uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {t.hero.line1} · {t.hero.line2} · {t.hero.line3}
          </motion.p>

          <h1 className="mb-6 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.5rem]">
            {nameParts.map((part, i) => (
              <motion.span
                key={`${part}-${i}`}
                className="mr-[0.28em] inline-block last:mr-0"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.05 + i * 0.06,
                  ease: EASE_OUT,
                }}
              >
                {part}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="mb-8 h-px origin-left bg-ink/15"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE_OUT }}
          />

          <motion.p
            className="mb-10 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
          >
            {t.profile.body.split('. ')[0]}.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT }}
          >
            <Magnetic>
              <a
                href="#projects"
                className="btn-press inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-surface hover:bg-ink/90"
              >
                {chrome.hero.ctaWork}
                <ArrowRight size={16} strokeWidth={1.5} />
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#contact"
                className="btn-press inline-flex h-11 items-center rounded-lg border border-ink/20 bg-surface/80 px-5 text-sm font-medium text-ink backdrop-blur-sm hover:border-ink/40"
              >
                {chrome.hero.ctaContact}
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            className="mt-12 font-mono text-xs tracking-wide text-ink/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: EASE_OUT }}
          >
            {t.hero.basedIn} {t.hero.location}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
