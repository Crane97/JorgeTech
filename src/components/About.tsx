import { useState } from 'react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { BOXING_IMAGES } from '../lib/assets'
import { Lightbox } from './Lightbox'
import { Reveal } from './Reveal'

export function About({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line bg-surface px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {chrome.about.title}
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t.personal.intro}
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-base leading-relaxed text-ink/90 sm:text-lg">
              {t.personal.story}
            </p>

            <div className="mt-12">
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
                <footer className="mt-6 text-sm text-muted">
                  - Jorge Ruiz de la Torre
                </footer>
              </blockquote>

              <blockquote className="mt-10 border-l border-line pl-5 text-lg leading-relaxed text-muted">
                {t.about.quote}
              </blockquote>
              <p className="mt-3 text-sm text-muted">- {t.about.quoteAuthor}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.08}>
            <p className="mb-5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {chrome.about.photos}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {BOXING_IMAGES.slice(0, 6).map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`group overflow-hidden rounded-xl border border-line bg-bg ${
                    i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${chrome.about.photos} ${i + 1}`}
                    className="media-zoom h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {t.about.sportsEyebrow}
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-ink/85">
                  {t.about.sports.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {t.about.businessEyebrow}
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-ink/85">
                  {t.about.business.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

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
    </section>
  )
}
