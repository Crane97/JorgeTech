import { useEffect, useState } from 'react'

export function ProjectCarousel({
  images,
  alt,
  expandLabel,
  onExpand,
  objectPosition = 'object-top',
}: {
  images: string[]
  alt: string
  expandLabel: string
  onExpand: (index: number) => void
  objectPosition?: 'object-top' | 'object-center'
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [images.length, paused])

  const fitClass =
    objectPosition === 'object-center' ? 'object-center' : 'object-top'

  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-xl bg-line/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label={expandLabel}
        onClick={() => onExpand(index)}
        className="absolute inset-0 cursor-zoom-in"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? alt : ''}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`media-zoom absolute inset-0 h-full w-full object-cover ${fitClass} transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </button>
      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-end bg-gradient-to-t from-ink/50 to-transparent px-4 py-4">
          <div className="flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`${alt} ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${
                  i === index ? 'bg-surface' : 'bg-surface/40 hover:bg-surface/70'
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
