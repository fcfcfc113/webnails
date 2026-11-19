<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Seasonal drift: snow, petals, leaves, hearts, bats, confetti, sparkles.
const props = defineProps({ config: { type: Object, required: true } })
const canvas = ref(null)
let ctx, raf, parts = [], w = 0, h = 0, dpr = 1, visible = true, io

const SHAPES = {
  heart: new Path2D('M0 3.5C-1.5 2.4-4 .6-4-1.6-4-3-3-4-1.8-4-1 -4-.4-3.5 0-2.9.4-3.5 1-4 1.8-4 3-4 4-3 4-1.6 4 .6 1.5 2.4 0 3.5z'),
  leaf: new Path2D('M0-5C3-3 4 0 0 5-4 0-3-3 0-5z'),
  petal: new Path2D('M0-4C2.5-2 2.5 2 0 4-2.5 2-2.5-2 0-4z'),
  sparkle: new Path2D('M0-5C.6-1 1-.6 5 0 1 .6.6 1 0 5-.6 1-1 .6-5 0-1-.6-.6-1 0-5z'),
  bat: new Path2D('M0-1C-1-2-2-2-2.6-1-3.6-2-5.6-2-7 0-5.6 0-5 1-5 2-4 1-2.6 1.4-2 2.4-1.6 1.4-.6 1 0 1.6.6 1 1.6 1.4 2 2.4 2.6 1.4 4 1 5 2 5 1 5.6 0 7 0 5.6-2 3.6-2 2.6-1 2-2 1-2 0-1z'),
}

function seed() {
  const { count = 24, colors = ['#fff'], shape = 'snow' } = props.config
  const n = Math.round(count * Math.min(1, w / 1200 + 0.35))
  parts = Array.from({ length: n }, () => spawn(shape, colors, true))
}
function spawn(shape, colors, anywhere) {
  const snow = shape === 'snow'
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -20,
    s: snow ? 1.2 + Math.random() * 2.8 : 1.4 + Math.random() * 1.8,
    vy: (snow ? 0.25 : 0.35) + Math.random() * 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    r: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.03,
    sway: Math.random() * Math.PI * 2,
    c: colors[Math.floor(Math.random() * colors.length)],
    a: 0.55 + Math.random() * 0.45,
    flip: Math.random() * Math.PI,
  }
}
function size() {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(2, window.devicePixelRatio || 1)
  w = el.clientWidth; h = el.clientHeight
  el.width = w * dpr; el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}
function frame() {
  raf = requestAnimationFrame(frame)
  if (!visible) return
  const { shape = 'snow', colors = ['#fff'] } = props.config
  ctx.clearRect(0, 0, w, h)
  for (const p of parts) {
    p.sway += 0.012
    p.y += p.vy
    p.x += p.vx + Math.sin(p.sway) * 0.35
    p.r += p.vr
    p.flip += 0.03
    if (p.y > h + 20) Object.assign(p, spawn(shape, colors, false), { x: Math.random() * w })
    ctx.save()
    ctx.globalAlpha = p.a
    ctx.fillStyle = p.c
    ctx.translate(p.x, p.y)
    if (shape === 'snow') {
      ctx.beginPath(); ctx.arc(0, 0, p.s, 0, Math.PI * 2); ctx.fill()
    } else if (shape === 'confetti') {
      ctx.rotate(p.r); ctx.scale(1, Math.cos(p.flip)); ctx.fillRect(-p.s * 1.6, -p.s * 0.7, p.s * 3.2, p.s * 1.4)
    } else {
      ctx.rotate(shape === 'bat' ? Math.sin(p.sway) * 0.2 : p.r)
      ctx.scale(p.s, shape === 'bat' ? p.s * (0.7 + 0.3 * Math.abs(Math.cos(p.flip * 3))) : p.s)
      ctx.fill(SHAPES[shape] || SHAPES.sparkle)
    }
    ctx.restore()
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx = canvas.value.getContext('2d')
  size(); seed(); frame()
  addEventListener('resize', size)
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas.value)
})
watch(() => props.config, () => { if (ctx) seed() })
onBeforeUnmount(() => { cancelAnimationFrame(raf); removeEventListener('resize', size); io?.disconnect() })
</script>

<template>
  <canvas ref="canvas" class="particles" aria-hidden="true" />
</template>

<style scoped>
.particles { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
</style>
