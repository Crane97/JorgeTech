import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export function Lightbox({
  images,
  index,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onIndexChange,
}: {
  images: string[]
  index: number
  alt: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        onIndexChange((index - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight') {
        onIndexChange((index + 1) % images.length)
      }
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [images.length, index, onClose, onIndexChange])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80]"
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      >
        <button
          type="button"
          aria-label={closeLabel}
          className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="btn-press absolute right-5 top-5 z-10 rounded-lg bg-surface/10 p-2 text-surface hover:bg-surface/20 sm:right-8 sm:top-8"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label={previousLabel}
              onClick={() =>
                onIndexChange((index - 1 + images.length) % images.length)
              }
              className="btn-press absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-surface/10 p-2 text-surface hover:bg-surface/20 sm:left-6"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => onIndexChange((index + 1) % images.length)}
              className="btn-press absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-surface/10 p-2 text-surface hover:bg-surface/20 sm:right-6"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>
          </>
        ) : null}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center p-10 sm:p-16"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
        >
          <img
            key={images[index]}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            className="max-h-full max-w-full rounded-xl object-contain shadow-md"
            decoding="async"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
