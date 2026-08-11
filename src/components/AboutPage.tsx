import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { BOXING_IMAGES } from '../lib/assets'
import { Lightbox } from './Lightbox'
import { ProjectCarousel } from './ProjectCarousel'
import { Reveal } from './Reveal'

export function AboutPage({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-dvh pt-16">
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12 max-w-2xl">
            <Link
              to="/"
              className="btn-press mb-8 inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-ink/25"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              {chrome.about.backToHome}
            </Link>
            <h1 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {chrome.about.title}
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t.personal.intro}
            </p>
          </Reveal>

          <Reveal>
            <p className="mb-14 max-w-3xl text-base leading-relaxed text-ink/90 sm:text-lg">
              {t.personal.story}
            </p>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {t.about.postLabel}
              </p>
              <p className="mb-6 text-sm text-muted">{t.about.postAttribution}</p>
              <blockquote className="border-l-2 border-accent pl-5">
                <div className="flex flex-col gap-5">
                  {t.about.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] leading-relaxed text-ink/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <blockquote className="mt-8 border-l border-line pl-4 text-base leading-relaxed text-muted">
                  {t.about.quote}
                </blockquote>
                <p className="mt-3 text-sm text-muted">- {t.about.quoteAuthor}</p>

                <footer className="mt-8 text-sm text-muted">
                  - Jorge Ruiz de la Torre
                </footer>
              </blockquote>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.06}>
              <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {chrome.about.photos}
              </p>
              <div className="media-surface sticky top-24 aspect-[4/5] overflow-hidden rounded-xl border border-line shadow-sm sm:aspect-[5/6] lg:aspect-[4/5]">
                <ProjectCarousel
                  images={BOXING_IMAGES}
                  alt={chrome.about.photos}
                  expandLabel={chrome.projects.expandImage}
                  objectPosition="object-center"
                  onExpand={(imageIndex) => setLightboxIndex(imageIndex)}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {lightboxIndex !== null ? (
        <Lightbox
          images={BOXING_IMAGES}
          index={lightboxIndex}
          alt={chrome.about.photos}
          closeLabel={chrome.about.close}
          previousLabel={chrome.projects.previousImage}
          nextLabel={chrome.projects.nextImage}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </div>
  )
}
