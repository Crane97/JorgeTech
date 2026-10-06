import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ProjectCarousel({
  images,
  alt,
  expandLabel,
  previousLabel,
  nextLabel,
  onExpand,
  objectPosition = 'object-top',
}: {
  images: string[]
  alt: string
  expandLabel: string
  previousLabel: string
  nextLabel: string
  onExpand: (index: number) => void
  objectPosition?: 'object-top' | 'object-center'
}) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  // Once someone steps through the photos themselves, stop the autoplay.
  const [manual, setManual] = useState(false)
  // Portrait shots (phone screenshots) are shown whole instead of cropped.
  const [portrait, setPortrait] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (hovered || manual || images.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [images.length, hovered, manual])

  const go = (delta: number) => {
    setManual(true)
    setIndex((current) => (current + delta + images.length) % images.length)
  }

  const fitClass =
    objectPosition === 'object-center' ? 'object-center' : 'object-top'

  const arrowClass =
    'btn-press absolute top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-md backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-surface sm:h-11 sm:w-11'

  return (
    <div
      className="group relative h-full w-full overflow-clip rounded-xl bg-line/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-label={expandLabel}
        onClick={() => onExpand(index)}
        className="absolute inset-0 cursor-zoom-in"
      >
        {images.map((src, i) => {
          const tall = portrait[src]
          const visible = i === index
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {tall ? (
                // Blurred fill behind a phone screenshot so the frame never looks empty.
                <img
                  src={src}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
                />
              ) : null}
              <img
                src={src}
                alt={visible ? alt : ''}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={(e) => {
                  const img = e.currentTarget
                  const isTall = img.naturalHeight > img.naturalWidth
                  setPortrait((prev) => (prev[src] === isTall ? prev : { ...prev, [src]: isTall }))
                }}
                className={`relative h-full w-full ${
                  tall
                    ? 'object-contain py-3 drop-shadow-xl'
                    : `media-zoom object-cover ${fitClass}`
                }`}
              />
            </div>
          )
        })}
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => go(-1)}
            className={`${arrowClass} left-3`}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => go(1)}
            className={`${arrowClass} right-3`}
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-ink/45 to-transparent px-4 pt-8 pb-3">
            <div className="pointer-events-auto flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`${alt} ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => {
                    setManual(true)
                    setIndex(i)
                  }}
                  className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${
                    i === index ? 'bg-surface' : 'bg-surface/40 hover:bg-surface/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
