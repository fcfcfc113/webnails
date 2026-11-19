<script setup>
// Hand-drawn animated Christmas scene: Santa's sleigh flying with reindeer,
// a twinkling tree, a gift stack whose lids pop, and a waving snowman.
defineProps({ winter: { type: Boolean, default: false } })
const lights = [[96, 92], [120, 104], [80, 132], [140, 140], [110, 168], [70, 178], [150, 188], [92, 214], [128, 222], [60, 232], [160, 236]]
const lightColors = ['#ff4d4d', '#ffd23f', '#4dd2ff', '#7dff8a', '#ff8fd8']
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- moon -->
    <svg class="moon" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#fff6d8" opacity=".18"/><circle cx="60" cy="60" r="42" fill="#fff4cc"/><circle cx="48" cy="50" r="7" fill="#f1e2a8"/><circle cx="72" cy="70" r="5" fill="#f1e2a8"/><circle cx="66" cy="44" r="3.5" fill="#f1e2a8"/></svg>

    <!-- Santa's sleigh team flying across the sky -->
    <div v-if="!winter" class="flight">
      <svg class="sleigh" viewBox="0 0 560 170">
        <!-- sparkle trail -->
        <g class="trail">
          <circle cx="8" cy="120" r="3" fill="#fff4b0"/><circle cx="30" cy="112" r="2.2" fill="#fff"/><circle cx="52" cy="122" r="2.6" fill="#ffd23f"/><circle cx="20" cy="132" r="1.8" fill="#fff"/><circle cx="64" cy="110" r="1.6" fill="#fff"/>
        </g>
        <!-- reins -->
        <path d="M205 96 C 260 70, 300 72, 330 78 M205 100 C 300 96, 380 84, 420 80 M205 104 C 330 110, 440 92, 500 78" stroke="#e9c766" stroke-width="2" fill="none"/>
        <!-- reindeer (x3) -->
        <g v-for="(x, n) in [300, 390, 470]" :key="n" :transform="`translate(${x} ${48 + (n % 2) * 6})`" class="deer" :style="{ '--d': n * -0.12 + 's' }">
          <g class="legs-back"><path d="M10 44 l-6 22 M18 44 l2 24" stroke="#6b4226" stroke-width="5" stroke-linecap="round"/></g>
          <ellipse cx="26" cy="36" rx="28" ry="13" fill="#9a6338"/>
          <ellipse cx="22" cy="40" rx="16" ry="6" fill="#c08a5c"/>
          <path d="M-2 32 q-8 -4 -10 2 q6 0 10 2z" fill="#f4e6d4"/>
          <path d="M44 30 q8 -14 14 -22 l8 4 q-8 10 -12 22z" fill="#9a6338"/>
          <ellipse cx="66" cy="10" rx="12" ry="8" fill="#9a6338" transform="rotate(-18 66 10)"/>
          <circle cx="78" cy="8" :r="n === 2 ? 4.5 : 3" :fill="n === 2 ? '#ff2e3a' : '#3b2618'" :class="{ nose: n === 2 }"/>
          <circle cx="66" cy="6" r="1.8" fill="#1b120b"/>
          <path d="M58 2 q-4 -12 -14 -14 M54 -6 q-2 -6 -8 -6 M62 0 q2 -14 10 -18 M66 -10 q4 -4 10 -2" stroke="#6b4226" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M58 6 l-6 -6" stroke="#9a6338" stroke-width="4" stroke-linecap="round"/>
          <path d="M40 26 q4 10 0 22" stroke="#cf1530" stroke-width="5" fill="none"/>
          <circle cx="41" cy="36" r="3" fill="#e9c766"/>
          <g class="legs-front"><path d="M40 44 l8 22 M48 42 l12 18" stroke="#6b4226" stroke-width="5" stroke-linecap="round"/></g>
        </g>
        <!-- sleigh -->
        <g transform="translate(70 40)">
          <path d="M0 96 Q 30 118 110 118 L 150 118 Q 162 118 166 108" stroke="#e9c766" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M40 104 v14 M110 104 v14" stroke="#e9c766" stroke-width="5"/>
          <!-- sack of gifts -->
          <path d="M8 40 Q 0 10 30 6 Q 60 4 58 40 Z" fill="#7a1a2a"/>
          <rect x="16" y="-6" width="18" height="18" rx="3" fill="#2fb66b" transform="rotate(-10 25 3)"/>
          <rect x="34" y="-10" width="16" height="20" rx="3" fill="#ffd23f" transform="rotate(12 42 0)"/>
          <path d="M25 -6 v18 M42 -10 v20" stroke="#fff" stroke-width="3"/>
          <!-- santa -->
          <g class="santa">
            <ellipse cx="84" cy="44" rx="24" ry="22" fill="#d6202f"/>
            <rect x="62" y="48" width="44" height="7" fill="#2b1d1d"/>
            <rect x="80" y="47" width="9" height="9" fill="#e9c766"/>
            <circle cx="96" cy="18" r="13" fill="#f6cfb4"/>
            <path d="M84 20 q12 28 26 0 q-2 14 -13 16 q-11 -2 -13 -16z" fill="#fff"/>
            <path d="M84 12 q12 -24 34 -4 l-6 6 q-12 -10 -28 -2z" fill="#d6202f"/>
            <circle cx="120" cy="8" r="5" fill="#fff"/>
            <rect x="82" y="8" width="30" height="7" rx="3.5" fill="#fff"/>
            <circle cx="100" cy="17" r="1.8" fill="#2b1d1d"/>
            <circle cx="105" cy="22" r="2.6" fill="#ff8a8a"/>
            <g class="wave"><path d="M100 40 q14 -6 20 -22" stroke="#d6202f" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="120" cy="16" r="5.5" fill="#2b1d1d"/></g>
          </g>
          <!-- sleigh body -->
          <path d="M-4 52 Q -6 100 40 104 L 132 104 Q 158 102 160 70 L 150 62 Q 140 84 110 84 L 60 84 Q 30 84 22 52 Z" fill="#cf1530"/>
          <path d="M-4 52 Q 6 50 22 52" stroke="#e9c766" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M14 92 Q 70 100 140 90" stroke="#e9c766" stroke-width="3" fill="none"/>
          <circle cx="160" cy="68" r="5" fill="#e9c766"/>
        </g>
      </svg>
    </div>

    <!-- ground props -->
    <svg class="tree" viewBox="0 0 220 300">
      <rect x="96" y="262" width="28" height="34" rx="4" fill="#7a4a2a"/>
      <path d="M110 18 L170 108 H138 L188 180 H150 L206 262 H14 L70 180 H32 L82 108 H50 Z" fill="#1f7a52"/>
      <path d="M110 18 L170 108 H138 L188 180 H150 L206 262 H110 Z" fill="#17643f"/>
      <path d="M62 120 Q110 140 160 112 M44 196 Q110 222 176 188 M30 250 Q110 272 192 244" stroke="#e9c766" stroke-width="4" fill="none"/>
      <circle v-for="([x, y], n) in lights" :key="n" :cx="x" :cy="y" r="6" :fill="lightColors[n % 5]" class="bulb" :style="{ '--d': (n * 0.27).toFixed(2) + 's' }"/>
      <path class="star" d="M110 0 L117 14 L132 16 L121 26 L124 41 L110 34 L96 41 L99 26 L88 16 L103 14 Z" fill="#ffd23f"/>
    </svg>

    <div class="gifts">
      <svg viewBox="0 0 260 210">
        <g class="box b1"><rect x="10" y="110" width="110" height="96" rx="6" fill="#cf1530"/><rect x="58" y="110" width="14" height="96" fill="#e9c766"/><g class="lid"><rect x="2" y="94" width="126" height="22" rx="5" fill="#e01e3c"/><rect x="58" y="94" width="14" height="22" fill="#e9c766"/><path d="M65 94 c-20 -26 -44 -20 -36 -6 c6 10 28 8 36 6z M65 94 c20 -26 44 -20 36 -6 c-6 10 -28 8 -36 6z" fill="#e9c766"/></g></g>
        <g class="box b2"><rect x="130" y="130" width="120" height="76" rx="6" fill="#1f7a52"/><rect x="182" y="130" width="14" height="76" fill="#fff"/><g class="lid"><rect x="124" y="116" width="132" height="20" rx="5" fill="#2a9a66"/><rect x="182" y="116" width="14" height="20" fill="#fff"/><path d="M189 116 c-16 -22 -38 -18 -30 -4 c6 8 22 6 30 4z M189 116 c16 -22 38 -18 30 -4 c-6 8 -22 6 -30 4z" fill="#fff"/></g></g>
        <g class="box b3"><rect x="70" y="40" width="80" height="62" rx="6" fill="#ffd23f"/><rect x="104" y="40" width="12" height="62" fill="#cf1530"/><g class="lid"><rect x="64" y="28" width="92" height="18" rx="5" fill="#ffe066"/><rect x="104" y="28" width="12" height="18" fill="#cf1530"/><path d="M110 28 c-14 -18 -32 -14 -26 -2 c4 6 18 4 26 2z M110 28 c14 -18 32 -14 26 -2 c-4 6 -18 4 -26 2z" fill="#cf1530"/></g></g>
        <g class="pop"><path d="M110 18 l3 -10 M96 22 l-8 -8 M124 22 l8 -8" stroke="#ffd23f" stroke-width="3" stroke-linecap="round"/></g>
      </svg>
    </div>

    <svg class="snowman" viewBox="0 0 160 220">
      <ellipse cx="80" cy="212" rx="70" ry="8" fill="#000" opacity=".12"/>
      <circle cx="80" cy="160" r="52" fill="#fff"/><circle cx="80" cy="84" r="38" fill="#fff"/>
      <path d="M62 162 a52 52 0 0 0 66 34" stroke="#dde8f4" stroke-width="10" fill="none" opacity=".7"/>
      <rect x="50" y="34" width="60" height="10" rx="5" fill="#2b1d33"/><rect x="58" y="2" width="44" height="36" rx="4" fill="#2b1d33"/><rect x="58" y="26" width="44" height="7" fill="#cf1530"/>
      <circle cx="68" cy="76" r="4" fill="#2b1d33"/><circle cx="92" cy="76" r="4" fill="#2b1d33"/>
      <path d="M80 86 l26 6 -26 5z" fill="#ff8a1a"/>
      <path d="M66 100 q14 8 28 0" stroke="#2b1d33" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M44 112 q36 16 72 0 l4 12 q-12 4 -18 6 l6 34 -16 2 -4 -32 q-24 2 -48 -10z" fill="#cf1530"/>
      <circle cx="80" cy="140" r="5" fill="#2b1d33"/><circle cx="80" cy="162" r="5" fill="#2b1d33"/><circle cx="80" cy="184" r="5" fill="#2b1d33"/>
      <g class="arm"><path d="M126 140 l30 -30 M146 120 l8 -14 M146 120 l14 0" stroke="#6b4226" stroke-width="5" stroke-linecap="round" fill="none"/></g>
      <path d="M34 140 l-28 -16 M14 128 l-10 6" stroke="#6b4226" stroke-width="5" stroke-linecap="round" fill="none"/>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; }
.moon { position: absolute; width: clamp(80px, 9vw, 140px); right: 38%; top: calc(var(--head-h) + 70px); filter: drop-shadow(0 0 30px rgb(255 240 190 / 0.6)); }

.flight { position: absolute; left: 0; top: calc(var(--head-h) + 50px); width: clamp(300px, 34vw, 520px); animation: fly 17s linear infinite; z-index: 1; }
.sleigh { width: 100%; height: auto; filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.35)); animation: bobble 1.2s ease-in-out infinite alternate; }
@keyframes fly {
  0% { transform: translate(-110%, 60px) rotate(-4deg); }
  50% { transform: translate(55vw, -10px) rotate(-6deg); }
  100% { transform: translate(110vw, 30px) rotate(-3deg); }
}
@keyframes bobble { to { transform: translateY(-8px); } }
.legs-front, .legs-back { transform-box: fill-box; transform-origin: top center; animation: gallop 0.45s ease-in-out infinite alternate; animation-delay: var(--d); }
.legs-back { animation-direction: alternate-reverse; }
@keyframes gallop { from { transform: rotate(-24deg); } to { transform: rotate(18deg); } }
.nose { animation: glow 0.9s ease-in-out infinite alternate; }
@keyframes glow { to { filter: drop-shadow(0 0 6px #ff2e3a); fill: #ff6b74; } }
.wave { transform-box: fill-box; transform-origin: 0% 100%; animation: wave 0.7s ease-in-out infinite alternate; }
@keyframes wave { from { transform: rotate(-10deg); } to { transform: rotate(18deg); } }
.trail circle { animation: twinkle 0.8s ease-in-out infinite alternate; }
.trail circle:nth-child(2n) { animation-delay: -0.4s; }
@keyframes twinkle { from { opacity: 0.2; } to { opacity: 1; } }

.tree { position: absolute; right: clamp(300px, 30vw, 470px); bottom: 26px; width: clamp(130px, 12vw, 190px); z-index: 2; filter: drop-shadow(0 16px 24px rgb(0 0 0 / 0.35)); }
.bulb { animation: blink 1.6s ease-in-out infinite; animation-delay: var(--d); }
@keyframes blink { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px currentColor); } 50% { opacity: 0.35; } }
.star { transform-box: fill-box; transform-origin: center; animation: pulse 1.8s ease-in-out infinite; filter: drop-shadow(0 0 10px #ffd23f); }
@keyframes pulse { 50% { transform: scale(1.18) rotate(8deg); } }

.gifts { position: absolute; right: clamp(140px, 14vw, 240px); bottom: 22px; width: clamp(150px, 14vw, 230px); z-index: 2; filter: drop-shadow(0 16px 22px rgb(0 0 0 / 0.35)); }
.gifts svg { width: 100%; height: auto; overflow: visible; }
.box { transform-box: fill-box; transform-origin: bottom center; }
.b1 { animation: wiggle 3.2s ease-in-out infinite; }
.b2 { animation: wiggle 3.2s ease-in-out infinite -1.1s; }
.b3 { animation: wiggle 3.2s ease-in-out infinite -2.2s; }
@keyframes wiggle { 0%, 70%, 100% { transform: rotate(0); } 76% { transform: rotate(-3deg); } 82% { transform: rotate(3deg); } 88% { transform: rotate(-1.5deg); } }
.lid { transform-box: fill-box; transform-origin: left bottom; animation: pop 3.2s var(--ease) infinite; }
.b2 .lid { animation-delay: -1.1s; }
.b3 .lid { animation-delay: -2.2s; }
@keyframes pop { 0%, 64%, 100% { transform: none; } 74% { transform: translateY(-16px) rotate(-12deg); } 84% { transform: translateY(-4px) rotate(-3deg); } }
.pop { animation: burst 3.2s ease-out infinite -2.2s; opacity: 0; }
@keyframes burst { 0%, 66% { opacity: 0; } 74% { opacity: 1; } 90% { opacity: 0; } }

.snowman { position: absolute; right: clamp(10px, 2vw, 40px); bottom: 20px; width: clamp(110px, 10vw, 170px); z-index: 2; filter: drop-shadow(0 14px 18px rgb(0 0 0 / 0.3)); animation: sway 4s ease-in-out infinite alternate; transform-origin: bottom center; }
@keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }
.arm { transform-box: fill-box; transform-origin: 0% 100%; animation: wave 0.9s ease-in-out infinite alternate; }

@media (max-width: 860px) {
  .moon { right: 6%; }
  .gifts { right: 120px; }
}
@media (max-width: 680px) {
  .flight { width: 260px; top: calc(var(--head-h) + 40px); animation-duration: 11s; }
  .tree { width: 86px; right: 200px; bottom: 16px; }
  .gifts { width: 120px; right: 92px; bottom: 16px; }
  .snowman { width: 84px; bottom: 14px; }
  .moon { width: 64px; top: calc(var(--head-h) + 50px); }
}
</style>
