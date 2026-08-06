import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 })

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(e) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2
        x.set(offsetX * strength)
        y.set(offsetY * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
