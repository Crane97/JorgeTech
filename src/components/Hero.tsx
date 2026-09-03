import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const HOLD_MS = 5000
const HERO_WEBM = '/videoHero/hero.webm'
const HERO_MP4 = '/videoHero/hero.mp4'
const HERO_POSTER = '/videoHero/hero-poster.png'

function HeroComic({ reduce }: { reduce: boolean | null }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current
    const host = hostRef.current
    if (!video || !host) return

    let cancelled = false
    let inView = true
    let holdTimer = 0

    const playBoomerang = () => {
      if (cancelled || !inView) return
      video.currentTime = 0
      void video.play().catch(() => {
        /* Keep the poster if autoplay is blocked. */
      })
    }

    const onEnded = () => {
      if (cancelled) return
      video.pause()
      video.currentTime = 0
      window.clearTimeout(holdTimer)
      holdTimer = window.setTimeout(() => {
        playBoomerang()
      }, HOLD_MS)
    }

    video.addEventListener('ended', onEnded)

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (!inView) {
          video.pause()
          window.clearTimeout(holdTimer)
          return
        }
        playBoomerang()
      },
      { threshold: 0.2 },
    )
    io.observe(host)
    playBoomerang()

    return () => {
      cancelled = true
      window.clearTimeout(holdTimer)
      video.removeEventListener('ended', onEnded)
      io.disconnect()
      video.pause()
    }
  }, [reduce])

  const mediaClass =
    'h-full w-full object-contain object-[center_bottom] lg:object-[left_center]'

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-lg:top-[62%]"
      aria-hidden
    >
      {reduce ? (
        <img src={HERO_POSTER} alt="" className={mediaClass} />
      ) : (
        <video
          ref={videoRef}
          className={mediaClass}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={HERO_WEBM} type="video/webm" />
          <source src={HERO_MP4} type="video/mp4" />
        </video>
      )}
    </div>
  )
}

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()
  const nameParts = chrome.brand.split(' ')

  return (
    <section
      id="top"
      className="relative isolate min-h-[100dvh] overflow-hidden pt-16"
    >
      <HeroComic reduce={reduce} />

      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
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
      </div>
    </section>
  )
}
