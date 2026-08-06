import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { heroPortrait } from '../lib/assets'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export function Hero({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-bg pt-16">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-ink lg:block">
        <img
          src={heroPortrait}
          alt=""
          className="h-full w-full object-cover object-[center_70%]"
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.p
            className="mb-5 font-mono text-xs tracking-[0.14em] text-ink/75 uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {t.hero.line1} · {t.hero.line2} · {t.hero.line3}
          </motion.p>

          <motion.h1
            className="mb-5 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE_OUT }}
          >
            {chrome.brand}
          </motion.h1>

          <motion.p
            className="mb-9 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg"
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
              className="btn-press inline-flex h-11 items-center rounded-lg border border-ink/20 bg-surface px-5 text-sm font-medium text-ink hover:border-ink/40"
            >
              {chrome.hero.ctaContact}
            </a>
          </motion.div>

          <motion.p
            className="mt-10 font-mono text-xs tracking-wide text-ink/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.24, ease: EASE_OUT }}
          >
            {t.hero.basedIn} {t.hero.location}
          </motion.p>
        </div>

        <motion.div
          className="mt-12 overflow-hidden rounded-2xl bg-ink lg:hidden"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE_OUT }}
        >
          <img
            src={heroPortrait}
            alt=""
            className="aspect-[16/11] w-full object-cover object-[center_65%]"
          />
        </motion.div>
      </div>
    </section>
  )
}
