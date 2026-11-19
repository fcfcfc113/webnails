<script setup>
const H = 'M50 88 C 22 68 4 50 4 30 C 4 14 16 4 30 4 C 40 4 46 10 50 18 C 54 10 60 4 70 4 C 84 4 96 14 96 30 C 96 50 78 68 50 88 Z'
const balloons = [
  { x: 54, c: '#e8173f', s: 90, dur: 16, d: 0 }, { x: 62, c: '#ff8fb1', s: 70, dur: 19, d: -6 },
  { x: 70, c: '#c8102e', s: 110, dur: 18, d: -11 }, { x: 82, c: '#ffc2d4', s: 76, dur: 15, d: -3 },
  { x: 92, c: '#ff5c8f', s: 96, dur: 20, d: -14 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- heart balloons rising -->
    <div v-for="(b, n) in balloons" :key="n" class="balloon" :style="{ left: b.x + '%', width: b.s + 'px', '--dur': b.dur + 's', '--d': b.d + 's' }">
      <svg viewBox="0 0 100 180">
        <path :d="H" :fill="b.c"/>
        <path d="M24 26 c2 -8 8 -12 14 -12" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>
        <path d="M46 88 l4 6 4 -6z" :fill="b.c"/>
        <path d="M50 94 C 40 120, 62 140, 48 178" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8"/>
      </svg>
    </div>

    <!-- winged heart crossing the sky -->
    <div class="flight">
      <svg viewBox="0 0 220 120" class="wheart">
        <g class="wing wl"><path d="M80 52 C 50 10, 10 14, 4 40 C 30 30, 34 52, 18 60 C 40 56, 48 72, 34 82 C 56 76, 70 70, 80 60z" fill="#fff"/></g>
        <g class="wing wr"><path d="M140 52 C 170 10, 210 14, 216 40 C 190 30, 186 52, 202 60 C 180 56, 172 72, 186 82 C 164 76, 150 70, 140 60z" fill="#fff"/></g>
        <path transform="translate(60 18) scale(1)" :d="H" fill="#e8173f"/>
        <path d="M82 40 c2 -8 8 -12 14 -12" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>
      </svg>
      <span class="sparks" />
    </div>

    <!-- rose bouquet -->
    <svg class="bouquet" viewBox="0 0 260 260">
      <path d="M70 140 L 130 250 L 190 140 Z" fill="#ffd3e1"/><path d="M70 140 L 130 250 L 100 140 Z" fill="#ffc2d4"/>
      <path d="M110 200 c-30 -20 -40 10 -20 14 c-20 6 0 30 20 6 c20 24 40 0 20 -6 c20 -4 10 -34 -20 -14z" fill="#e8173f"/>
      <ellipse v-for="(l, n) in [[70, 110, -40], [190, 110, 40], [96, 80, -20], [164, 80, 20]]" :key="'l' + n" :cx="l[0]" :cy="l[1]" rx="14" ry="30" fill="#3cb371" :transform="`rotate(${l[2]} ${l[0]} ${l[1]})`"/>
      <g v-for="(r, n) in [[100, 112, '#e8173f'], [160, 112, '#c8102e'], [130, 86, '#ff5c8f'], [130, 132, '#e8173f'], [86, 76, '#ff8fb1'], [174, 76, '#e8173f']]" :key="n" class="rose" :style="{ '--d': n * -0.5 + 's' }">
        <circle :cx="r[0]" :cy="r[1]" r="24" :fill="r[2]"/>
        <path :d="`M${r[0] - 10} ${r[1]} c0 -12 14 -16 18 -6 c4 10 -8 16 -12 8 c-2 -6 6 -8 6 -2`" stroke="rgb(0 0 0 / .25)" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.balloon { position: absolute; bottom: -220px; animation: rise var(--dur) linear infinite; animation-delay: var(--d); filter: drop-shadow(0 10px 16px rgb(0 0 0 / 0.25)); }
@keyframes rise { 0% { transform: translate(0, 0) rotate(-4deg); } 50% { transform: translate(30px, -60vh) rotate(5deg); } 100% { transform: translate(-20px, -130vh) rotate(-3deg); } }
.flight { position: absolute; left: 0; top: calc(var(--head-h) + 60px); width: clamp(140px, 14vw, 220px); animation: fly 14s linear infinite; }
.wheart { width: 100%; animation: bob 1s ease-in-out infinite alternate; filter: drop-shadow(0 8px 14px rgb(0 0 0 / 0.3)); }
@keyframes fly { 0% { transform: translate(-120%, 60px); } 50% { transform: translate(50vw, 0); } 100% { transform: translate(115vw, 50px); } }
@keyframes bob { to { transform: translateY(-10px); } }
.wing { transform-box: fill-box; animation: flap 0.35s ease-in-out infinite alternate; }
.wl { transform-origin: right center; }
.wr { transform-origin: left center; }
@keyframes flap { to { transform: scaleY(0.55) rotate(6deg); } }
.bouquet { position: absolute; right: clamp(10px, 3vw, 60px); bottom: 16px; width: clamp(170px, 18vw, 280px); z-index: 2; filter: drop-shadow(0 18px 24px rgb(0 0 0 / 0.3)); animation: sway 4s ease-in-out infinite alternate; transform-origin: bottom center; }
@keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(3deg); } }
.rose { transform-box: fill-box; transform-origin: center; animation: breathe 3s ease-in-out infinite alternate; animation-delay: var(--d); }
@keyframes breathe { to { transform: scale(1.06); } }
@media (max-width: 680px) { .balloon:nth-child(n + 4) { display: none; } .bouquet { width: 130px; } .flight { width: 110px; } }
</style>
