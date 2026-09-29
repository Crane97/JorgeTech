import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { LOCALES, PAGES, pageUrl } from './src/i18n/index.ts'
import { buildHead, renderHeadHtml } from './src/lib/seo.ts'

const HEAD_BLOCK = /<!-- seo:start -->[\s\S]*<!-- seo:end -->/

/**
 * Writes one HTML file per route and locale (`/es/projects/index.html`, …) with
 * its own title, description, canonical, hreflang and Open Graph tags, so
 * crawlers and link previews (LinkedIn, WhatsApp, Slack) that do not run JS
 * still get the right metadata. Also emits sitemap.xml.
 */
function prerenderHead(): Plugin {
  let outDir = 'dist'
  return {
    name: 'prerender-head',
    apply: 'build',
    configResolved(config) {
      outDir = join(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      if (!HEAD_BLOCK.test(template)) {
        throw new Error('index.html is missing the <!-- seo:start/end --> block')
      }

      for (const { code } of LOCALES) {
        for (const page of PAGES) {
          const head = buildHead(page, code)
          const html = template
            .replace(/<html lang="[^"]*">/, `<html lang="${code}">`)
            .replace(HEAD_BLOCK, `<!-- seo:start -->\n    ${renderHeadHtml(head)}\n    <!-- seo:end -->`)
          const route = new URL(head.url).pathname.replace(/^\/|\/$/g, '')
          const dir = join(outDir, route)
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), html)
        }
      }

      const urls = PAGES.flatMap((page) =>
        LOCALES.map(({ code }) => {
          const alternates = LOCALES.map(
            (l) =>
              `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${pageUrl(page, l.code)}" />`,
          ).join('\n')
          return `  <url>\n    <loc>${pageUrl(page, code)}</loc>\n${alternates}\n  </url>`
        }),
      )
      writeFileSync(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderHead()],
})
