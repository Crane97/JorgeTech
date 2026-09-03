/**
 * iOS Safari composites <video> on a decoder plane that ignores CSS mix-blend
 * and alpha. Draw H.264 frames to a 2D canvas and turn near-white paper into
 * real transparency.
 */

function containBottom(
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number,
) {
  const scale = Math.min(dstW / srcW, dstH / srcH)
  const dw = Math.max(1, Math.round(srcW * scale))
  const dh = Math.max(1, Math.round(srcH * scale))
  return {
    dx: Math.round((dstW - dw) / 2),
    dy: dstH - dh,
    dw,
    dh,
  }
}

function keyWhite(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const paper = Math.min(data[i], data[i + 1], data[i + 2]) / 255
    let alpha = 1
    if (paper >= 0.9) alpha = 0
    else if (paper > 0.72) alpha = 1 - (paper - 0.72) / 0.18
    data[i + 3] = Math.round(alpha * 255)
    data[i] = Math.round(data[i] * alpha)
    data[i + 1] = Math.round(data[i + 1] * alpha)
    data[i + 2] = Math.round(data[i + 2] * alpha)
  }
}

function syncCanvasSize(canvas: HTMLCanvasElement, host: HTMLElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.round(host.clientWidth * dpr))
  const h = Math.max(1, Math.round(host.clientHeight * dpr))
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
}

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number
  cancelVideoFrameCallback?: (id: number) => void
}

export function startHeroKnockout(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  host: HTMLElement,
) {
  const ctx = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
  })
  if (!ctx) return () => {}

  const tagged = video as VideoWithFrameCallback
  let raf = 0
  let vfc = 0
  let cancelled = false

  const draw = () => {
    if (cancelled) return
    syncCanvasSize(canvas, host)
    const w = canvas.width
    const h = canvas.height
    const vw = video.videoWidth
    const vh = video.videoHeight
    if (!w || !h || !vw || !vh || video.readyState < 2) return
    const box = containBottom(vw, vh, w, h)
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(video, box.dx, box.dy, box.dw, box.dh)
    const frame = ctx.getImageData(box.dx, box.dy, box.dw, box.dh)
    keyWhite(frame.data)
    ctx.putImageData(frame, box.dx, box.dy)
  }

  const tick = () => {
    draw()
    if (cancelled) return
    if (tagged.requestVideoFrameCallback) {
      vfc = tagged.requestVideoFrameCallback(tick)
    } else {
      raf = window.requestAnimationFrame(tick)
    }
  }

  tick()
  const ro = new ResizeObserver(draw)
  ro.observe(host)

  return () => {
    cancelled = true
    ro.disconnect()
    window.cancelAnimationFrame(raf)
    tagged.cancelVideoFrameCallback?.(vfc)
  }
}
