import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

const HERO_PHOTO =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1600&q=85'

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src={HERO_PHOTO}
          alt=""
          className="h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-[18%] via-bg/90 via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/40" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1400px] items-end px-5 pb-16 pt-20 sm:items-center sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="max-w-2xl">
          <motion.p
            className="mb-5 font-mono text-xs tracking-[0.14em] text-ink/70 uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {t.hero.line1} · {t.hero.line2} · {t.hero.line3}
          </motion.p>

          <motion.h1
            className="mb-5 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE_OUT }}
          >
            {chrome.brand}
          </motion.h1>

          <motion.p
            className="mb-9 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          >
            {t.profile.body.split('. ')[0]}.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: EASE_OUT }}
          >
            <a
              href="#projects"
              className="btn-press inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-surface hover:bg-ink/90"
            >
              {chrome.hero.ctaWork}
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>
            <a
              href="#contact"
              className="btn-press inline-flex h-11 items-center rounded-lg border border-ink/15 bg-surface/90 px-5 text-sm font-medium text-ink backdrop-blur-sm hover:border-ink/30"
            >
              {chrome.hero.ctaContact}
            </a>
          </motion.div>

          <motion.p
            className="mt-10 font-mono text-xs tracking-wide text-ink/65"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.24, ease: EASE_OUT }}
          >
            {t.hero.basedIn} {t.hero.location}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
