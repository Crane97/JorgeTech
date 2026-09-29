/**
 * Temporary diagnostics for the Safari/iOS hero video. Enabled only with
 * `?heroDebug` in the URL; `?hero2d` forces the old canvas-2D keying path.
 */

function hasParam(name: string) {
  try {
    return new URLSearchParams(window.location.search).has(name)
  } catch {
    return false
  }
}

export const HERO_DEBUG = hasParam('heroDebug')
export const FORCE_2D = hasParam('hero2d')

export const heroDebugState = {
  mounts: 0,
  renderer: 'none',
  draws: 0,
  glErrors: [] as string[],
  events: [] as string[],
}

const t0 = performance.now()

export function heroLog(message: string) {
  if (!HERO_DEBUG) return
  const line = `${((performance.now() - t0) / 1000).toFixed(2)}s ${message}`
  heroDebugState.events.push(line)
  if (heroDebugState.events.length > 30) heroDebugState.events.shift()
}
