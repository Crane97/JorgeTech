import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/useI18n'
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../lib/social'
import { Reveal } from './Reveal'

/** Public Web3Forms access key (safe to ship to the browser). Without it the form falls back to mailto. */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const subject = name.trim()
    ? `${t.contact.subjectFrom} ${name.trim()}`
    : t.contact.subject

  const openMailto = () => {
    const body = [`${t.contact.formName}: ${name.trim()}`, `${t.contact.formEmail}: ${email.trim()}`, '', message.trim()].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!WEB3FORMS_KEY) {
      openMailto()
      return
    }

    const botcheck = new FormData(e.currentTarget).get('botcheck')
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: name.trim(),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          botcheck,
        }),
      })
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null
      if (!res.ok || !data?.success) throw new Error('Web3Forms rejected the message')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-line bg-transparent px-4 py-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent'
  const sending = status === 'sending'

  return (
    <section
      id="contact"
      className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
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
              {t.hero.location}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.06}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* Honeypot: real visitors never see or fill this field. */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
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
                disabled={sending}
                className="btn-press mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-surface hover:bg-ink/90 disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? t.contact.formSending : t.contact.formSubmit}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-sm leading-relaxed ${
                  status === 'success'
                    ? 'text-ink'
                    : status === 'error'
                      ? 'text-red-700'
                      : 'text-xs text-muted'
                }`}
              >
                {status === 'success' ? t.contact.formSuccess : null}
                {status === 'error' ? (
                  <>
                    {t.contact.formError}{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
                      {CONTACT_EMAIL}
                    </a>
                  </>
                ) : null}
                {(status === 'idle' || status === 'sending') && !WEB3FORMS_KEY
                  ? t.contact.formHintMail
                  : null}
              </p>
            </form>
          </Reveal>
        </div>

        <p className="mt-20 border-t border-line pt-8 font-mono text-xs text-muted">
          {t.footer.rights}
        </p>
      </div>
    </section>
  )
}
