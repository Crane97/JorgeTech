import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
