import { useEffect, useRef, useState } from 'react'
import { startHeroKnockout } from '../lib/heroKnockout'

const HOLD_MS = 5000
const HERO_WEBM = '/videoHero/hero.webm'
const HERO_MP4 = '/videoHero/hero.mp4'
const HERO_POSTER = '/videoHero/hero-poster.webp'

function isAppleWebKit() {
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  const safari =
    /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Android/i.test(ua)
  return iOS || iPadOS || safari
}

function forceSafariPath() {
  try {
    return new URLSearchParams(window.location.search).has('heroKnockout')
  } catch {
    return false
  }
}

function pickHeroSource() {
  // Safari/iOS cannot decode VP8 alpha, and its video plane ignores CSS blend
  // modes. Serve H.264 and punch the white paper out in WebGL/canvas.
  if (isAppleWebKit() || forceSafariPath()) {
    return { src: HERO_MP4, knockout: true }
  }
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

export function HeroVideo({ reduce }: { reduce: boolean | null }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [knockout, setKnockout] = useState(() => pickHeroSource().knockout)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!video || !host) return

    let cancelled = false
    let inView = true
    let holding = false
    let holdTimer = 0
    let stopKnockout = () => {}

    const source = pickHeroSource()
    setKnockout(source.knockout)
    armInlinePlayback(video)
    video.src = source.src
    video.load()
    if (source.knockout && canvas) {
      stopKnockout = startHeroKnockout(video, canvas, host)
    }

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
      stopKnockout()
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
          <video
            ref={videoRef}
            className={`${mediaClass} ${knockout ? 'opacity-0' : live ? '' : 'opacity-0'}`}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
          />
          <canvas
            ref={canvasRef}
            className={`${mediaClass} ${knockout && live ? '' : 'opacity-0'}`}
          />
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
