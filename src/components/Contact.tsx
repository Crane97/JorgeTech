import { useState, type FormEvent } from 'react'
import type { Chrome } from '../content/chrome'
import type { Translation } from '../i18n'
import { SOCIAL_LINKS } from '../lib/social'
import { Reveal } from './Reveal'

export function Contact({ chrome, t }: { chrome: Chrome; t: Translation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      name.trim() ? `Project inquiry from ${name.trim()}` : 'Project inquiry',
    )
    const body = encodeURIComponent(
      [
        name.trim() ? `Name: ${name.trim()}` : null,
        email.trim() ? `Email: ${email.trim()}` : null,
        '',
        message.trim(),
      ]
        .filter((line) => line !== null)
        .join('\n'),
    )
    window.location.href = `mailto:jorge@macdiego.com?subject=${subject}&body=${body}`
  }

  const fieldClass =
    'w-full rounded-lg border border-line bg-bg px-4 py-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent'

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mb-10 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {t.contact.intro}
            </p>

            <nav className="flex flex-col gap-4" aria-label="Social links">
              {SOCIAL_LINKS.map(({ key, href, display, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="inline-flex items-center gap-3 text-ink/85 transition-opacity duration-200 hover:opacity-70"
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden />
                  <span className="text-sm">{display}</span>
                  <span className="sr-only">{t.social[key]}</span>
                </a>
              ))}
            </nav>

            <p className="mt-12 text-sm leading-relaxed text-muted">
              <span className="mb-2 block font-mono text-[11px] tracking-[0.14em] text-muted/80 uppercase">
                {t.contact.addressLabel}
              </span>
              245 NE 14th Street
              <br />
              Miami, FL 33132
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.06}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-line bg-bg p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {t.contact.formName}
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {t.contact.formEmail}
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {t.contact.formMessage}
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldClass} min-h-32 resize-y`}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="btn-press mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-surface hover:bg-ink/90"
                >
                  {t.contact.formSubmit}
                </button>
                <p className="text-xs leading-relaxed text-muted">
                  {t.contact.formHint}
                </p>
              </div>
            </form>
          </Reveal>
        </div>

        <p className="mt-20 border-t border-line pt-8 font-mono text-xs text-muted">
          {chrome.footer.rights}
        </p>
      </div>
    </section>
  )
}
