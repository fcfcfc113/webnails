<script setup>
const arm = (a, r) => [32 + r * Math.cos((a * Math.PI) / 180), 32 + r * Math.sin((a * Math.PI) / 180)]
const flake = Array.from({ length: 6 }, (_, i) => {
  const a = i * 60 - 90; const [x, y] = arm(a, 28); const [bx, by] = arm(a, 17)
  const l = [bx + 8 * Math.cos(((a - 45) * Math.PI) / 180), by + 8 * Math.sin(((a - 45) * Math.PI) / 180)]
  const r = [bx + 8 * Math.cos(((a + 45) * Math.PI) / 180), by + 8 * Math.sin(((a + 45) * Math.PI) / 180)]
  return `M32 32L${x} ${y}M${bx} ${by}L${l[0]} ${l[1]}M${bx} ${by}L${r[0]} ${r[1]}`
}).join('')
const flakes = [
  { x: 46, y: 14, s: 90, dur: 18, d: 0 }, { x: 60, y: 30, s: 60, dur: 14, d: -5 }, { x: 72, y: 10, s: 120, dur: 22, d: -9 },
  { x: 88, y: 26, s: 70, dur: 16, d: -3 }, { x: 54, y: 52, s: 50, dur: 12, d: -7 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <svg v-for="(f, n) in flakes" :key="n" class="flake" viewBox="0 0 64 64" :style="{ left: f.x + '%', top: `calc(var(--head-h) + ${f.y}vh)`, width: f.s + 'px', '--dur': f.dur + 's', '--d': f.d + 's' }">
      <path :d="flake" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="32" cy="32" r="4" fill="#fff"/>
    </svg>

    <!-- snowman -->
    <svg class="snowman" viewBox="0 0 160 220">
      <ellipse cx="80" cy="212" rx="70" ry="8" fill="#000" opacity=".12"/>
      <circle cx="80" cy="160" r="52" fill="#fff"/><circle cx="80" cy="84" r="38" fill="#fff"/>
      <path d="M44 66 q36 -40 72 0 q-36 -14 -72 0z" fill="#3a6fd8"/><circle cx="80" cy="34" r="9" fill="#fff"/>
      <rect x="44" y="60" width="72" height="12" rx="6" fill="#fff"/>
      <circle cx="68" cy="82" r="4" fill="#2b1d33"/><circle cx="92" cy="82" r="4" fill="#2b1d33"/>
      <path d="M80 92 l26 6 -26 5z" fill="#ff8a1a"/>
      <path d="M44 114 q36 16 72 0 l4 12 q-12 4 -18 6 l6 34 -16 2 -4 -32 q-24 2 -48 -10z" fill="#3a6fd8"/>
      <path d="M50 120 h60" stroke="#fff" stroke-width="3" stroke-dasharray="6 5"/>
      <g class="arm"><path d="M126 140 l30 -30 M146 120 l8 -14 M146 120 l14 0" stroke="#6b4226" stroke-width="5" stroke-linecap="round" fill="none"/></g>
      <path d="M34 140 l-28 -16" stroke="#6b4226" stroke-width="5" stroke-linecap="round"/>
    </svg>

    <!-- steaming cocoa -->
    <svg class="cocoa" viewBox="0 0 160 170">
      <g class="steam"><path d="M58 40 c-10 -14 10 -20 0 -36 M80 40 c-10 -14 10 -20 0 -36 M102 40 c-10 -14 10 -20 0 -36" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/></g>
      <path d="M128 76 c30 0 30 44 0 44" stroke="#e63950" stroke-width="12" fill="none"/>
      <rect x="22" y="56" width="112" height="100" rx="18" fill="#e63950"/>
      <ellipse cx="78" cy="58" rx="54" ry="10" fill="#7a4a2a"/>
      <rect x="52" y="44" width="16" height="16" rx="4" fill="#fff"/><rect x="74" y="42" width="16" height="16" rx="4" fill="#fff" transform="rotate(14 82 50)"/><rect x="94" y="46" width="14" height="14" rx="4" fill="#ffd3e1"/>
      <path d="M22 100 h112" stroke="#fff" stroke-width="6" stroke-dasharray="10 8"/>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.flake { position: absolute; animation: drift var(--dur) ease-in-out infinite alternate; animation-delay: var(--d); filter: drop-shadow(0 0 12px rgb(160 210 255 / 0.9)); }
@keyframes drift { from { transform: translate(0, 0) rotate(0); } to { transform: translate(-40px, 60px) rotate(180deg); } }
.snowman { position: absolute; right: clamp(10px, 2vw, 40px); bottom: 20px; width: clamp(130px, 12vw, 190px); z-index: 2; filter: drop-shadow(0 14px 18px rgb(0 0 0 / 0.25)); animation: sway 4s ease-in-out infinite alternate; transform-origin: bottom center; }
@keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }
.arm { transform-box: fill-box; transform-origin: 0% 100%; animation: wave 0.9s ease-in-out infinite alternate; }
@keyframes wave { from { transform: rotate(-10deg); } to { transform: rotate(18deg); } }
.cocoa { position: absolute; right: clamp(170px, 16vw, 270px); bottom: 24px; width: clamp(100px, 10vw, 160px); z-index: 2; filter: drop-shadow(0 14px 18px rgb(0 0 0 / 0.25)); }
.steam { animation: steam 2.6s ease-in-out infinite; }
@keyframes steam { 0% { transform: translateY(6px); opacity: 0; } 40% { opacity: 1; } 100% { transform: translateY(-14px); opacity: 0; } }
@media (max-width: 680px) { .snowman { width: 92px; } .cocoa { width: 76px; right: 110px; } .flake:nth-of-type(n + 4) { display: none; } }
</style>
