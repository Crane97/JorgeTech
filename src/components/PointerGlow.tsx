import { useReducedMotion } from 'motion/react'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

export function PointerGlow({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState({ x: 72, y: 28 })

  useEffect(() => {
    if (reduce) return

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPos({ x, y })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce])

  return (
    <div
      className="site-shell font-sans text-ink"
      style={
        {
          '--glow-x': `${pos.x}%`,
          '--glow-y': `${pos.y}%`,
        } as CSSProperties
      }
      data-reduced-motion={reduce ? 'true' : 'false'}
    >
      {children}
    </div>
  )
}
