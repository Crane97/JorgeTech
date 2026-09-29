#!/usr/bin/env node
/**
 * Converts raster images in src/assets (and the hero poster) to resized WebP,
 * replacing the originals. Safe to re-run: files that are already WebP are
 * skipped. Run after adding new screenshots:
 *
 *   npm run images
 */
import { readFile, readdir, rm, stat } from 'node:fs/promises'
import { basename, dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
sharp.cache(false)

const RASTER = new Set(['.png', '.jpg', '.jpeg'])

/** Max width per folder (px). Anything else defaults to DEFAULT_WIDTH. */
const WIDTH_BY_DIR = {
  logo: 128, // shown at 28px, up to 4x DPR
}
const DEFAULT_WIDTH = 1920
const QUALITY = 80

/** Extra single files outside src/assets. */
const EXTRA_FILES = ['public/videoHero/hero-poster.png']

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function convert(file) {
  const ext = extname(file).toLowerCase()
  if (!RASTER.has(ext)) return
  const folder = basename(dirname(file))
  const width = WIDTH_BY_DIR[folder] ?? DEFAULT_WIDTH
  const out = join(dirname(file), `${slug(basename(file, extname(file)))}.webp`)
  const before = (await stat(file)).size
  await sharp(await readFile(file))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out)
  const after = (await stat(out)).size
  await rm(file)
  console.log(
    `${relative(ROOT, file)} -> ${basename(out)}  ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`,
  )
}

for await (const file of walk(join(ROOT, 'src/assets'))) await convert(file)
for (const file of EXTRA_FILES) {
  await convert(join(ROOT, file)).catch((err) => {
    if (err.code !== 'ENOENT') throw err
  })
}
