<script setup>
const bursts = [
  { x: 48, y: 16, s: 200, c: ['#ff3d66', '#ffee32'], d: 0 },
  { x: 68, y: 8, s: 260, c: ['#2fe3c6', '#ffffff'], d: -1.3 },
  { x: 86, y: 22, s: 180, c: ['#7aa2ff', '#ff3d66'], d: -2.4 },
  { x: 58, y: 34, s: 140, c: ['#ffee32', '#ff9f1c'], d: -3.1 },
]
const rays = (n, r1, r2) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [50 + r1 * Math.cos(a), 50 + r1 * Math.sin(a), 50 + r2 * Math.cos(a), 50 + r2 * Math.sin(a)] })
const R = rays(16, 8, 46)
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- fireworks -->
    <svg v-for="(b, n) in bursts" :key="n" class="burst" viewBox="0 0 100 100" :style="{ left: b.x + '%', top: `calc(var(--head-h) + ${b.y}vh)`, width: b.s + 'px', '--d': b.d + 's' }">
      <g class="rays">
        <line v-for="(r, k) in R" :key="k" :x1="r[0]" :y1="r[1]" :x2="r[2]" :y2="r[3]" :stroke="b.c[k % 2]" stroke-width="2.4" stroke-linecap="round"/>
        <circle v-for="(r, k) in R" :key="'c' + k" :cx="r[2]" :cy="r[3]" r="2" :fill="b.c[(k + 1) % 2]"/>
      </g>
      <circle cx="50" cy="50" r="4" fill="#fff" class="core"/>
    </svg>

    <!-- waving flag -->
    <svg class="flag" viewBox="0 0 190 130">
      <rect x="0" y="0" width="6" height="130" rx="3" fill="#c9cfd8"/>
      <g class="cloth">
        <rect v-for="k in 7" :key="k" x="6" :y="(k - 1) * 14.3" width="180" height="7.15" fill="#d01a4f"/>
        <rect v-for="k in 6" :key="'w' + k" x="6" :y="(k - 1) * 14.3 + 7.15" width="180" height="7.15" fill="#fff"/>
        <rect x="6" y="0" width="76" height="50" fill="#0b3ccc"/>
        <g fill="#fff"><circle v-for="k in 20" :key="'s' + k" :cx="14 + ((k - 1) % 5) * 15" :cy="8 + Math.floor((k - 1) / 5) * 11" r="2.4"/></g>
      </g>
    </svg>

    <!-- palm tree -->
    <svg class="palm" viewBox="0 0 220 320">
      <path d="M100 320 C 98 240, 104 160, 124 92 l 12 4 C 120 166, 116 244, 120 320 Z" fill="#a0703c"/>
      <path d="M104 300 h18 M104 270 h18 M106 240 h16 M108 210 h16 M110 180 h16 M114 150 h14 M118 120 h14" stroke="#7a5228" stroke-width="3"/>
      <g class="fronds">
        <path d="M130 92 C 96 60, 40 62, 10 92 C 50 76, 90 80, 128 98z" fill="#2fbf55"/>
        <path d="M130 92 C 160 52, 210 52, 218 84 C 186 70, 160 76, 132 98z" fill="#24a347"/>
        <path d="M128 90 C 116 46, 80 20, 46 22 C 82 36, 108 60, 124 96z" fill="#3cd06a"/>
        <path d="M132 90 C 152 46, 186 26, 206 32 C 176 46, 156 66, 134 96z" fill="#2fbf55"/>
        <path d="M128 94 C 108 112, 84 150, 86 178 C 98 146, 116 122, 132 100z" fill="#24a347"/>
        <circle cx="122" cy="100" r="9" fill="#7a5228"/><circle cx="136" cy="102" r="9" fill="#8a5a2a"/>
      </g>
    </svg>

    <!-- sun -->
    <svg class="sun" viewBox="0 0 100 100">
      <g class="sunrays"><line v-for="(r, k) in rays(12, 30, 46)" :key="k" :x1="r[0]" :y1="r[1]" :x2="r[2]" :y2="r[3]" stroke="#ffb81c" stroke-width="6" stroke-linecap="round"/></g>
      <circle cx="50" cy="50" r="24" fill="#ffd23f"/>
      <circle cx="42" cy="46" r="2.6" fill="#2b1d33"/><circle cx="58" cy="46" r="2.6" fill="#2b1d33"/>
      <path d="M41 56 q9 8 18 0" stroke="#2b1d33" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    </svg>

    <!-- bouncing beach ball -->
    <svg class="ball" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#fff"/>
      <path d="M50 50 L50 4 A46 46 0 0 1 89.8 27z" fill="#d01a4f"/><path d="M50 50 L89.8 73 A46 46 0 0 1 50 96z" fill="#0b3ccc"/><path d="M50 50 L10.2 73 A46 46 0 0 1 10.2 27z" fill="#ffd23f"/>
      <circle cx="50" cy="50" r="8" fill="#fff"/>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.burst { position: absolute; transform: translate(-50%, -50%); }
.rays { transform-box: fill-box; transform-origin: center; animation: boom 3.6s ease-out infinite; animation-delay: var(--d); }
.core { animation: flash 3.6s ease-out infinite; animation-delay: var(--d); }
@keyframes boom { 0% { transform: scale(0.05); opacity: 0; } 8% { opacity: 1; } 40% { transform: scale(1); opacity: 1; } 70% { transform: scale(1.12) translateY(6px); opacity: 0; } 100% { opacity: 0; } }
@keyframes flash { 0% { opacity: 0; } 6% { opacity: 1; } 20% { opacity: 0; } 100% { opacity: 0; } }
.flag { position: absolute; left: 44%; bottom: 40px; width: clamp(90px, 9vw, 150px); z-index: 2; filter: drop-shadow(0 10px 14px rgb(0 0 0 / 0.3)); }
.cloth { transform-box: fill-box; transform-origin: left center; animation: wave 1.6s ease-in-out infinite alternate; }
@keyframes wave { from { transform: skewY(-3deg) scaleX(0.98); } to { transform: skewY(4deg) scaleX(1); } }
.palm { position: absolute; right: clamp(-20px, 0vw, 10px); bottom: 0; width: clamp(170px, 17vw, 280px); z-index: 2; filter: drop-shadow(0 14px 20px rgb(0 0 0 / 0.3)); }
.fronds { transform-box: fill-box; transform-origin: 50% 70%; animation: breeze 4s ease-in-out infinite alternate; }
@keyframes breeze { from { transform: rotate(-4deg); } to { transform: rotate(5deg); } }
.sun { position: absolute; right: 30%; top: calc(var(--head-h) + 40px); width: clamp(100px, 10vw, 160px); filter: drop-shadow(0 0 30px rgb(255 210 63 / 0.7)); }
.sunrays { transform-box: fill-box; transform-origin: center; animation: spin 24s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ball { position: absolute; right: clamp(180px, 18vw, 300px); bottom: 24px; width: clamp(60px, 6vw, 96px); z-index: 2; animation: bounce 1.4s cubic-bezier(0.3, 0, 0.7, 1) infinite alternate; }
@keyframes bounce { from { transform: translateY(0) rotate(0); } to { transform: translateY(-120px) rotate(180deg); } }
@media (max-width: 680px) { .burst:nth-of-type(n + 3) { display: none; } .palm { width: 130px; } .ball { width: 52px; right: 130px; } .flag { left: 6%; width: 80px; } .sun { right: 6%; width: 84px; } }
</style>
