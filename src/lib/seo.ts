import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_URL,
  pageUrl,
  translations,
  type Locale,
  type Page,
} from '../i18n/index.ts'

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export type HeadData = {
  locale: Locale
  title: string
  description: string
  url: string
  ogLocale: string
  alternates: { hreflang: string; href: string }[]
}

export function buildHead(page: Page, locale: Locale): HeadData {
  const { title, description } = translations[locale].seo[page]
  return {
    locale,
    title,
    description,
    url: pageUrl(page, locale),
    ogLocale: LOCALES.find((l) => l.code === locale)!.og,
    alternates: [
      ...LOCALES.map((l) => ({ hreflang: l.code, href: pageUrl(page, l.code) })),
      { hreflang: 'x-default', href: pageUrl(page, DEFAULT_LOCALE) },
    ],
  }
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/** Static `<head>` markup, written into each prerendered HTML file at build time. */
export function renderHeadHtml(head: HeadData) {
  const e = escapeHtml
  return [
    `<title>${e(head.title)}</title>`,
    `<meta name="description" content="${e(head.description)}" />`,
    `<link rel="canonical" href="${head.url}" />`,
    ...head.alternates.map(
      (a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`,
    ),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Jorge Ruiz de la Torre" />`,
    `<meta property="og:title" content="${e(head.title)}" />`,
    `<meta property="og:description" content="${e(head.description)}" />`,
    `<meta property="og:url" content="${head.url}" />`,
    `<meta property="og:locale" content="${head.ogLocale}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(head.title)}" />`,
    `<meta name="twitter:description" content="${e(head.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join('\n    ')
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Keeps the live `<head>` in sync on client-side navigation. */
export function applyHead(head: HeadData) {
  document.title = head.title
  setMeta('name', 'description', head.description)
  setMeta('property', 'og:title', head.title)
  setMeta('property', 'og:description', head.description)
  setMeta('property', 'og:url', head.url)
  setMeta('property', 'og:locale', head.ogLocale)
  setMeta('name', 'twitter:title', head.title)
  setMeta('name', 'twitter:description', head.description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = head.url

  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove())
  for (const alt of head.alternates) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = alt.hreflang
    link.href = alt.href
    document.head.appendChild(link)
  }
}
