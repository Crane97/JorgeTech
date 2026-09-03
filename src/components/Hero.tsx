import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroMarkPoster from '../assets/hero-mark-poster.png'
import heroMarkVideo from '../assets/hero-mark.mp4'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

function HeroMark({ reduce }: { reduce: boolean | null }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play().catch(() => {
      /* Keep the poster if autoplay is blocked. */
    })
  }, [reduce])

  const mediaClass =
    'h-auto w-full max-h-[min(42vh,320px)] object-contain object-center mix-blend-multiply lg:max-h-[min(70vh,560px)]'

  if (reduce) {
    return <img src={heroMarkPoster} alt="" className={mediaClass} />
  }

  return (
    <video
      ref={videoRef}
      className={mediaClass}
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={heroMarkPoster}
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={heroMarkVideo} type="video/mp4" />
    </video>
  )
}

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()
  const nameParts = chrome.brand.split(' ')

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden pt-16"
    >
      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:py-20">
        <div className="relative z-10 max-w-3xl lg:col-span-7 lg:row-start-1">
          <motion.p
            className="mb-6 font-mono text-xs tracking-[0.14em] text-ink/75 uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {t.hero.line1} · {t.hero.line2} · {t.hero.line3}
          </motion.p>

          <h1 className="mb-5 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]">
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

          <motion.p
            className="mb-4 max-w-xl text-xl font-medium tracking-[-0.02em] text-ink sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          >
            {chrome.hero.headline}
          </motion.p>

          <motion.p
            className="mb-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: EASE_OUT }}
          >
            {chrome.hero.subtext}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease: EASE_OUT }}
          >
            <Link
              to="/projects"
              className="btn-apple inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-surface"
            >
              {chrome.hero.ctaWork}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              to="/#contact"
              className="btn-apple btn-apple-outline inline-flex h-11 items-center rounded-lg border border-ink/20 bg-surface px-5 text-sm font-medium text-ink"
            >
              {chrome.hero.ctaContact}
            </Link>
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

        <div
          className="pointer-events-none relative z-0 flex items-center justify-center lg:col-span-5 lg:col-start-8 lg:row-start-1"
          aria-hidden
        >
          <HeroMark reduce={reduce} />
        </div>
      </div>
    </section>
  )
}
