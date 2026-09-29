#!/usr/bin/env node
/**
 * Builds public/og-image.jpg (1200x630), the preview image LinkedIn, WhatsApp,
 * Slack or X show when someone shares the site. Re-run after changing the
 * hero poster or the positioning line:
 *
 *   node scripts/generate-og-image.mjs
 */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

sharp.cache(false)

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const W = 1200
const H = 630

const text = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .mono { font-family: 'Consolas', 'Menlo', monospace; font-size: 18px; letter-spacing: 2.5px; fill: #5B6472; }
    .name { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 64px; font-weight: 600; fill: #0b0f17; letter-spacing: -1.5px; }
    .line { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 28px; fill: #0b0f17; }
    .url  { font-family: 'Consolas', 'Menlo', monospace; font-size: 20px; fill: #1a66ff; }
  </style>
  <text x="72" y="170" class="mono">FULL STACK ENGINEER · CUSTOMER SUCCESS · AI</text>
  <text x="72" y="262" class="name">Jorge Ruiz</text>
  <text x="72" y="338" class="name">de la Torre</text>
  <text x="72" y="410" class="line">I build reliable software</text>
  <text x="72" y="448" class="line">products end to end.</text>
  <text x="72" y="552" class="url">jorge-tech.vercel.app</text>
</svg>`

const poster = await sharp(await readFile(join(ROOT, 'public/videoHero/hero-poster.webp')))
  .resize({ height: H, fit: 'inside' })
  .toBuffer()
const { width: posterW = 0 } = await sharp(poster).metadata()

await sharp({
  create: { width: W, height: H, channels: 3, background: '#f7f8fa' },
})
  .composite([
    { input: poster, left: Math.max(0, W - posterW + Math.round(posterW * 0.22)), top: 0 },
    { input: Buffer.from(text), left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(ROOT, 'public/og-image.jpg'))

console.log('public/og-image.jpg written')
