import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useEffect, type ReactNode } from 'react'

const SPRING = { stiffness: 160, damping: 28, mass: 0.35 }

export function PointerGlow({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)
  const background = useMotionTemplate`
    radial-gradient(640px circle at ${x}px ${y}px, rgb(26 102 255 / 0.16), transparent 58%),
    radial-gradient(980px circle at ${x}px ${y}px, rgb(11 15 23 / 0.045), transparent 62%)
  `

  useEffect(() => {
    if (reduce) return

    rawX.set(window.innerWidth * 0.72)
    rawY.set(window.innerHeight * 0.28)

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, rawX, rawY])

  return (
    <div
      className="site-shell font-sans text-ink"
      data-reduced-motion={reduce ? 'true' : 'false'}
    >
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-glow"
          style={{ background }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
