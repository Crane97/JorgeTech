import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { heroPortrait } from '../lib/assets'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-16">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-y-0 right-0 w-full lg:w-[54%]">
        <img
          src={heroPortrait}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent lg:via-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30 lg:hidden" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.p
            className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase"
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
            className="mb-9 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
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
              className="btn-press inline-flex h-11 items-center rounded-lg border border-line bg-surface/90 px-5 text-sm font-medium text-ink backdrop-blur-sm hover:border-ink/20"
            >
              {chrome.hero.ctaContact}
            </a>
          </motion.div>

          <motion.p
            className="mt-10 font-mono text-xs tracking-wide text-muted"
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
