/**
 * iOS Safari composites <video> on a decoder plane that ignores CSS mix-blend
 * and alpha. Draw H.264 frames to a canvas and turn near-white paper into
 * real transparency. The keying runs in a WebGL fragment shader (GPU); the
 * 2D getImageData path is only a fallback when WebGL is unavailable.
 */

// Paper luminance (min channel) at which alpha starts fading, and where it hits 0.
const KEY_LOW = 0.72
const KEY_HIGH = 0.9

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

function syncCanvasSize(canvas: HTMLCanvasElement, host: HTMLElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.round(host.clientWidth * dpr))
  const h = Math.max(1, Math.round(host.clientHeight * dpr))
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
}

type Renderer = {
  draw: (video: HTMLVideoElement, w: number, h: number) => void
  dispose: () => void
}

const VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_frame;
varying vec2 v_uv;
void main() {
  vec3 rgb = texture2D(u_frame, v_uv).rgb;
  float paper = min(rgb.r, min(rgb.g, rgb.b));
  float alpha = 1.0 - clamp((paper - ${KEY_LOW.toFixed(2)}) / ${(KEY_HIGH - KEY_LOW).toFixed(2)}, 0.0, 1.0);
  gl_FragColor = vec4(rgb * alpha, alpha);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createWebGLRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    preserveDrawingBuffer: false,
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const aPos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // Video frames are not power-of-two sized: clamp and no mipmaps.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.clearColor(0, 0, 0, 0)

  return {
    draw(video, w, h) {
      const box = containBottom(video.videoWidth, video.videoHeight, w, h)
      gl.viewport(0, 0, w, h)
      gl.clear(gl.COLOR_BUFFER_BIT)
      // GL's viewport origin is bottom-left; the box is anchored to the bottom.
      gl.viewport(box.dx, h - box.dy - box.dh, box.dw, box.dh)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    },
    dispose() {
      gl.deleteTexture(texture)
      gl.deleteBuffer(quad)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    },
  }
}

function keyWhite(data: Uint8ClampedArray) {
  const range = KEY_HIGH - KEY_LOW
  for (let i = 0; i < data.length; i += 4) {
    const paper = Math.min(data[i], data[i + 1], data[i + 2]) / 255
    let alpha = 1
    if (paper >= KEY_HIGH) alpha = 0
    else if (paper > KEY_LOW) alpha = 1 - (paper - KEY_LOW) / range
    data[i + 3] = Math.round(alpha * 255)
    data[i] = Math.round(data[i] * alpha)
    data[i + 1] = Math.round(data[i + 1] * alpha)
    data[i + 2] = Math.round(data[i + 2] * alpha)
  }
}

function create2DRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
  })
  if (!ctx) return null
  return {
    draw(video, w, h) {
      const box = containBottom(video.videoWidth, video.videoHeight, w, h)
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(video, box.dx, box.dy, box.dw, box.dh)
      const frame = ctx.getImageData(box.dx, box.dy, box.dw, box.dh)
      keyWhite(frame.data)
      ctx.putImageData(frame, box.dx, box.dy)
    },
    dispose() {},
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
  const renderer = createWebGLRenderer(canvas) ?? create2DRenderer(canvas)
  if (!renderer) return () => {}

  const tagged = video as VideoWithFrameCallback
  let raf = 0
  let vfc = 0
  let cancelled = false

  const draw = () => {
    if (cancelled) return
    syncCanvasSize(canvas, host)
    const w = canvas.width
    const h = canvas.height
    if (!w || !h || !video.videoWidth || !video.videoHeight || video.readyState < 2) return
    renderer.draw(video, w, h)
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
    renderer.dispose()
  }
}
