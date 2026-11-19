<script setup>
const flowers = Array.from({ length: 22 }, (_, n) => ({
  x: (n * 4.6 + (n % 3) * 1.3) % 100,
  h: 70 + ((n * 37) % 90),
  kind: n % 3 === 0 ? 'tulip' : 'daisy',
  c: ['#ff7aa8', '#ffd23f', '#b9a2ff', '#ff9f6b', '#ffffff'][n % 5],
  d: -((n * 0.37) % 3).toFixed(2),
}))
const flies = [
  { c1: '#ffb0d0', c2: '#ff7aa8', top: 24, dur: 14, d: 0 },
  { c1: '#bfe6ff', c2: '#7f62c9', top: 36, dur: 18, d: -6 },
  { c1: '#ffe66d', c2: '#ff9f6b', top: 18, dur: 16, d: -11 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- butterflies -->
    <svg v-for="(b, n) in flies" :key="n" class="fly" viewBox="0 0 80 60" :style="{ top: b.top + '%', '--dur': b.dur + 's', '--d': b.d + 's' }">
      <g class="wl"><path d="M40 30 C 26 4, 2 6, 6 24 C 8 34, 26 34, 40 30z" :fill="b.c1"/><path d="M40 32 C 26 40, 12 56, 24 56 C 34 56, 38 44, 40 32z" :fill="b.c2"/></g>
      <g class="wr"><path d="M40 30 C 54 4, 78 6, 74 24 C 72 34, 54 34, 40 30z" :fill="b.c1"/><path d="M40 32 C 54 40, 68 56, 56 56 C 46 56, 42 44, 40 32z" :fill="b.c2"/></g>
      <ellipse cx="40" cy="32" rx="3" ry="14" fill="#2b1d33"/><path d="M39 18 q-4 -10 -10 -12 M41 18 q4 -10 10 -12" stroke="#2b1d33" stroke-width="1.6" fill="none"/>
    </svg>

    <!-- hopping bunny -->
    <div class="hop">
      <svg viewBox="0 0 140 120" class="bunny">
        <ellipse cx="70" cy="114" rx="40" ry="5" fill="#000" opacity=".15" class="shadow"/>
        <ellipse cx="60" cy="74" rx="38" ry="30" fill="#fff"/>
        <circle cx="26" cy="72" r="10" fill="#fff"/>
        <ellipse cx="100" cy="56" rx="22" ry="20" fill="#fff"/>
        <ellipse cx="92" cy="18" rx="7" ry="22" fill="#fff" transform="rotate(-12 92 18)"/><ellipse cx="108" cy="20" rx="7" ry="22" fill="#fff" transform="rotate(14 108 20)"/>
        <ellipse cx="92" cy="20" rx="3" ry="14" fill="#ffb3c9" transform="rotate(-12 92 20)"/><ellipse cx="108" cy="22" rx="3" ry="14" fill="#ffb3c9" transform="rotate(14 108 22)"/>
        <circle cx="108" cy="52" r="3" fill="#2b1d33"/><ellipse cx="120" cy="60" rx="3" ry="2.4" fill="#ff7aa8"/>
        <circle cx="112" cy="64" r="4" fill="#ffd0df"/>
        <ellipse cx="44" cy="100" rx="14" ry="7" fill="#fff"/><ellipse cx="86" cy="100" rx="10" ry="6" fill="#fff"/>
      </svg>
    </div>

    <!-- egg basket -->
    <svg class="basket" viewBox="0 0 240 170">
      <ellipse cx="62" cy="70" rx="30" ry="40" fill="#b9e3ec"/><ellipse cx="120" cy="56" rx="32" ry="44" fill="#ffb0d0"/><ellipse cx="176" cy="70" rx="30" ry="40" fill="#ffe66d"/>
      <path d="M36 66 l8 8 8 -8 8 8 8 -8 8 8 8 -8" stroke="#fff" stroke-width="4" fill="none"/>
      <path d="M92 50 h56 M92 62 h56" stroke="#fff" stroke-width="4"/>
      <circle cx="166" cy="58" r="4" fill="#fff"/><circle cx="184" cy="74" r="4" fill="#fff"/><circle cx="170" cy="86" r="4" fill="#fff"/>
      <path d="M14 84 h212 l-22 80 h-168z" fill="#c99a5a"/>
      <path d="M22 100 h196 M28 122 h184 M34 144 h172" stroke="#a87a3e" stroke-width="5"/>
      <path d="M40 84 v80 M80 84 v80 M120 84 v80 M160 84 v80 M200 84 v80" stroke="#a87a3e" stroke-width="3" opacity=".6"/>
      <path d="M14 84 q106 -120 212 0" stroke="#a87a3e" stroke-width="8" fill="none"/>
    </svg>

    <!-- swaying meadow -->
    <svg class="meadow" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax slice">
      <g v-for="(f, n) in flowers" :key="n" class="stem" :style="{ '--d': f.d + 's' }" :transform="`translate(${f.x * 10} 200)`">
        <path :d="`M0 0 Q ${n % 2 ? 8 : -8} ${-f.h / 2} 0 ${-f.h}`" stroke="#4caf50" stroke-width="4" fill="none"/>
        <path :d="`M0 ${-f.h / 3} q 18 -10 22 -26 q -18 2 -22 26z`" fill="#5cc26a"/>
        <g v-if="f.kind === 'tulip'" :transform="`translate(0 ${-f.h})`"><path d="M-14 -24 l7 9 7 -12 7 12 7 -9 c2 18 -4 26 -14 26 s-16 -8 -14 -26z" :fill="f.c === '#ffffff' ? '#ff7aa8' : f.c"/></g>
        <g v-else :transform="`translate(0 ${-f.h})`">
          <ellipse v-for="k in 8" :key="k" cx="0" cy="-10" rx="5" ry="10" :fill="f.c === '#ffd23f' ? '#fff' : f.c" :transform="`rotate(${k * 45})`"/>
          <circle r="6" fill="#ffd23f"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.fly { position: absolute; left: 0; width: clamp(46px, 5vw, 76px); animation: flutter var(--dur) linear infinite; animation-delay: var(--d); }
@keyframes flutter { 0% { transform: translate(-10vw, 0); } 25% { transform: translate(25vw, -40px); } 50% { transform: translate(55vw, 30px); } 75% { transform: translate(80vw, -30px); } 100% { transform: translate(110vw, 10px); } }
.wl, .wr { transform-box: fill-box; animation: flap 0.22s ease-in-out infinite alternate; }
.wl { transform-origin: right center; }
.wr { transform-origin: left center; }
@keyframes flap { to { transform: scaleX(0.3); } }
.hop { position: absolute; bottom: 60px; left: 0; width: clamp(90px, 9vw, 140px); z-index: 3; animation: across 16s linear infinite; }
.bunny { width: 100%; animation: hop 0.8s ease-in-out infinite; }
@keyframes across { from { transform: translateX(-20vw); } to { transform: translateX(110vw); } }
@keyframes hop { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-46px) rotate(-6deg); } }
.basket { position: absolute; right: clamp(10px, 3vw, 60px); bottom: 34px; width: clamp(170px, 17vw, 260px); z-index: 2; filter: drop-shadow(0 16px 20px rgb(0 0 0 / 0.25)); animation: settle 4s ease-in-out infinite alternate; transform-origin: bottom center; }
@keyframes settle { to { transform: rotate(2deg); } }
.meadow { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: clamp(90px, 14vh, 160px); z-index: 1; }
.stem { animation: sway 3s ease-in-out infinite alternate; animation-delay: var(--d); transform-box: view-box; }
.stem > * { transform-box: fill-box; }
@keyframes sway { from { rotate: -4deg; } to { rotate: 4deg; } }
@media (max-width: 680px) { .basket { width: 130px; } .hop { width: 70px; } .meadow { height: 110px; } }
</style>
