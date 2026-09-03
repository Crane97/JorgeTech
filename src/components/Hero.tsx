import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const HOLD_MS = 5000
const HERO_WEBM = '/videoHero/hero.webm'
const HERO_MP4 = '/videoHero/hero.mp4'
const HERO_POSTER = '/videoHero/hero-poster.png'

function isAppleWebKit() {
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  const safari =
    /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Android/i.test(ua)
  return iOS || iPadOS || safari
}

function pickHeroSource() {
  // Safari/iOS cannot decode VP8 alpha. H.264 has no alpha either, so the MP4
  // is flattened on white and knocked out with mix-blend-mode: multiply.
  if (isAppleWebKit()) return { src: HERO_MP4, knockout: true }
  const probe = document.createElement('video')
  if (probe.canPlayType('video/webm; codecs="vp8"') === 'probably') {
    return { src: HERO_WEBM, knockout: false }
  }
  return { src: HERO_MP4, knockout: true }
}

function armInlinePlayback(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
}

function HeroComic({ reduce }: { reduce: boolean | null }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [knockout, setKnockout] = useState(false)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current
    const host = hostRef.current
    if (!video || !host) return

    let cancelled = false
    let inView = true
    let holding = false
    let holdTimer = 0

    const source = pickHeroSource()
    setKnockout(source.knockout)
    armInlinePlayback(video)
    video.src = source.src
    video.load()

    const tryPlay = () => {
      if (cancelled || !inView || holding) return
      armInlinePlayback(video)
      void video.play().catch(() => {
        /* Low Power Mode / autoplay policy: retry on the next gesture. */
      })
    }

    const playFromStart = () => {
      if (cancelled || !inView || holding) return
      armInlinePlayback(video)
      if (video.readyState >= 1 && video.currentTime > 0.04) {
        try {
          video.currentTime = 0
        } catch {
          /* iOS throws if metadata is not ready. */
        }
      }
      tryPlay()
    }

    const onEnded = () => {
      if (cancelled) return
      holding = true
      video.pause()
      window.clearTimeout(holdTimer)
      holdTimer = window.setTimeout(() => {
        holding = false
        playFromStart()
      }, HOLD_MS)
    }

    const unlock = () => {
      tryPlay()
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }

    const onPlaying = () => {
      setLive(true)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('playing', onPlaying)
    window.addEventListener('touchstart', unlock, { passive: true })
    window.addEventListener('pointerdown', unlock)
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect
        const onScreen =
          rect.bottom > 40 && rect.top < (window.innerHeight || 0) - 40
        inView = (entry.isIntersecting && entry.intersectionRatio > 0) || onScreen
        if (!inView) {
          video.pause()
          window.clearTimeout(holdTimer)
          holding = false
          return
        }
        tryPlay()
      },
      { threshold: [0, 0.01, 0.2], rootMargin: '120px 0px' },
    )
    io.observe(host)
    tryPlay()

    return () => {
      cancelled = true
      window.clearTimeout(holdTimer)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('playing', onPlaying)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('pointerdown', unlock)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      video.pause()
    }
  }, [reduce])

  const mediaClass = 'absolute inset-0 h-full w-full object-contain object-bottom'

  return (
    <div
      ref={hostRef}
      className="hero-comic pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {reduce ? (
        <img src={HERO_POSTER} alt="" className={mediaClass} />
      ) : (
        <>
          <div
            className={`absolute inset-0 ${knockout ? 'mix-blend-multiply' : ''} ${live ? '' : 'opacity-0'}`}
          >
            <video
              ref={videoRef}
              className={mediaClass}
              autoPlay
              muted
              playsInline
              loop={false}
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
            />
          </div>
          <img
            src={HERO_POSTER}
            alt=""
            className={`${mediaClass} ${live ? 'hidden' : ''}`}
          />
        </>
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
      className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-16"
    >
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] items-start px-5 pb-3 sm:px-8 lg:flex-1 lg:px-10 lg:pb-8 pt-[max(1.25rem,calc(14dvh-4rem))] lg:pt-[max(1.5rem,calc(16dvh-4rem))]">
        <div className="max-w-3xl">
          <motion.p
            className="mb-5 font-mono text-xs tracking-[0.14em] text-ink/75 uppercase lg:mb-6"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {t.hero.line1} · {t.hero.line2} · {t.hero.line3}
          </motion.p>

          <h1 className="mb-5 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:text-6xl lg:mb-8 lg:text-[4.25rem]">
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
            className="mb-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mb-10"
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
            className="mt-8 font-mono text-xs tracking-wide text-ink/70 lg:mt-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: EASE_OUT }}
          >
            {t.hero.basedIn} {t.hero.location}
          </motion.p>
        </div>
      </div>

      <HeroComic reduce={reduce} />
    </section>
  )
}
