# Jorge — Ruiz

Editorial portfolio / CV site for **Jorge Ruiz de la Torre Bertolín**.
Live at <https://jorge-tech.vercel.app>.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4, `motion` for animation, React Router 7
- Lucide React icons, oxlint
- Deployed on Vercel (`vercel.json`), checked by GitHub Actions (`.github/workflows/ci.yml`)

## Develop

```bash
npm install
npm run dev
```

```bash
npm run lint    # oxlint, warnings fail
npm run build   # tsc + vite build + per-route HTML + sitemap
npm run preview
```

## How it is organised

| Path | What lives there |
| --- | --- |
| `src/i18n/{en,es,fr}.ts` | All copy, one file per language (nav, hero, résumé, projects, SEO titles…) |
| `src/i18n/index.ts` | Locales, site URL, route helpers (`localizePath`, `splitLocale`) |
| `src/i18n/I18nProvider.tsx` / `useI18n.ts` | Locale from the URL, `useI18n()` → `{ t, locale, lp, setLocale }` |
| `src/content/*Details.ts` | Long-form case-study content per project |
| `src/lib/caseStudies.ts` | Turns translations + details into `CaseStudy` objects |
| `src/lib/seo.ts` | Title, description, canonical, hreflang and Open Graph per page/locale |
| `src/lib/heroKnockout.ts` | Safari/iOS hero: keys the white paper out of the H.264 video in a WebGL shader |
| `scripts/` | Image optimisation and Open Graph image generation |

### Languages and URLs

English lives at the root, other languages under a prefix:
`/`, `/about` · `/es`, `/es/about` · `/fr`, … Projects open as a modal on the home page with `?project=<id>` (e.g. `/es?project=coworking`); the old `/projects#id` links redirect there.

On landing on an English URL the site redirects once to the language chosen in
the switcher (stored in `localStorage`) or, failing that, the browser language.
Always build internal links with `lp('/path')` from `useI18n()` so they keep the
active language.

### SEO

`vite.config.ts` includes a small `prerender-head` plugin: after the build it
writes `index.html` for every route and language with its own `<title>`,
description, canonical, `hreflang` and Open Graph tags, and emits
`sitemap.xml`. Titles and descriptions live under `seo` in each locale file.
The share image is `public/og-image.jpg` (`npm run og-image` regenerates it).

### Images

Commit screenshots as they come, then run:

```bash
npm run images
```

It converts every PNG/JPEG in `src/assets` (and the hero poster) to resized
WebP and removes the original.

### Contact form

The form sends through [Web3Forms](https://web3forms.com) when
`VITE_WEB3FORMS_KEY` is set (see `.env.example`; add it in Vercel → Settings →
Environment Variables). Without the key it falls back to opening the visitor's
email app with a `mailto:` link.
