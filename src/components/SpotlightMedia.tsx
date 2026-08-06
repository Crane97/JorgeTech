import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'
import type { ReactNode } from 'react'

export function SpotlightMedia({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgb(26 102 255 / 0.16), transparent 55%)`

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  )
}
