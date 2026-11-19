<script setup>
defineProps({ thanks: { type: Boolean, default: false } })
const MAPLE = 'M50 4 l7 18 15 -9 -3 20 h18 l-12 12 9 13 -21 -3 -6 18 -7 -9 -7 9 -6 -18 -21 3 9 -13 -12 -12 h18 l-3 -20 15 9z'
const OAK = 'M50 6 c8 6 4 14 12 16 c10 2 6 12 14 16 c-8 6 -2 14 -10 20 c-6 4 -10 16 -16 24 c-6 -8 -10 -20 -16 -24 c-8 -6 -2 -14 -10 -20 c8 -4 4 -14 14 -16 c8 -2 4 -10 12 -16z'
const leaves = [
  { x: 8, s: 92, c: '#d35f27', p: MAPLE, dur: 13, d: 0 }, { x: 22, s: 64, c: '#e3a93a', p: OAK, dur: 11, d: -4 },
  { x: 36, s: 110, c: '#b83a1e', p: MAPLE, dur: 15, d: -8 }, { x: 50, s: 70, c: '#f0b23c', p: MAPLE, dur: 12, d: -2 },
  { x: 62, s: 88, c: '#a0522d', p: OAK, dur: 14, d: -10 }, { x: 74, s: 120, c: '#e2701f', p: MAPLE, dur: 16, d: -6 },
  { x: 86, s: 74, c: '#c99a2e', p: OAK, dur: 12, d: -3 }, { x: 94, s: 96, c: '#cf3a2a', p: MAPLE, dur: 14, d: -12 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- big falling leaves -->
    <svg v-for="(l, n) in leaves" :key="n" class="leaf" viewBox="0 0 100 100" :style="{ left: l.x + '%', width: l.s + 'px', '--dur': l.dur + 's', '--d': l.d + 's', '--sw': (n % 2 ? 60 : -60) + 'px' }">
      <path :d="l.p" :fill="l.c"/>
      <path d="M50 20 V 92 M50 44 l14 -10 M50 44 l-14 -10 M50 62 l12 -8 M50 62 l-12 -8" stroke="rgb(0 0 0 / .25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>

    <!-- wheat bundle swaying -->
    <svg class="wheat" viewBox="0 0 120 240">
      <g v-for="(r, n) in [-14, -6, 0, 7, 15]" :key="n" class="stalk" :style="{ '--r': r + 'deg', '--d': n * -0.4 + 's' }">
        <path d="M60 240 V 60" stroke="#c99a3a" stroke-width="4"/>
        <ellipse v-for="y in [30, 46, 62, 78]" :key="y" cx="52" :cy="y" rx="6" ry="11" transform-origin="52 0" :transform="`rotate(-28 52 ${y})`" fill="#e3a93a"/>
        <ellipse v-for="y in [30, 46, 62, 78]" :key="'r' + y" cx="68" :cy="y" rx="6" ry="11" :transform="`rotate(28 68 ${y})`" fill="#e3a93a"/>
        <ellipse cx="60" cy="18" rx="6" ry="12" fill="#e3a93a"/>
      </g>
      <rect x="40" y="170" width="40" height="14" rx="5" fill="#a0522d"/>
    </svg>

    <!-- pumpkin pile -->
    <svg class="pile" viewBox="0 0 440 230">
      <ellipse cx="220" cy="222" rx="210" ry="9" fill="#000" opacity=".2"/>
      <g transform="translate(120 40)">
        <path d="M96 10 q0 -18 14 -24 l6 8 q-10 4 -10 18z" fill="#5a7a2a"/>
        <ellipse cx="62" cy="104" rx="56" ry="72" fill="#e8741f"/><ellipse cx="150" cy="104" rx="56" ry="72" fill="#e8741f"/><ellipse cx="106" cy="104" rx="60" ry="80" fill="#ff8f2f"/>
        <path d="M106 26 v158 M72 30 q-18 74 0 150 M140 30 q18 74 0 150" stroke="#d5640f" stroke-width="3" fill="none" opacity=".6"/>
        <path d="M40 60 q10 -14 24 -18" stroke="#ffd1a3" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/>
      </g>
      <g transform="translate(10 110)">
        <ellipse cx="44" cy="64" rx="38" ry="44" fill="#f4e6c8"/><ellipse cx="82" cy="64" rx="38" ry="44" fill="#f4e6c8"/><ellipse cx="63" cy="64" rx="42" ry="48" fill="#fff4dc"/>
        <path d="M63 16 v96" stroke="#e3d0aa" stroke-width="3"/><path d="M60 18 q0 -12 10 -16" stroke="#7a5a2a" stroke-width="5" stroke-linecap="round" fill="none"/>
      </g>
      <g transform="translate(320 120)">
        <ellipse cx="38" cy="56" rx="32" ry="40" fill="#c99a2e"/><ellipse cx="70" cy="56" rx="32" ry="40" fill="#c99a2e"/><ellipse cx="54" cy="56" rx="36" ry="44" fill="#e3b53c"/>
        <path d="M54 12 q0 -10 10 -14" stroke="#5a7a2a" stroke-width="5" stroke-linecap="round" fill="none"/>
      </g>
      <g transform="translate(270 168)"><path d="M0 40 q10 -40 40 -36 q30 4 22 36z" fill="#2f8f4e"/><path d="M8 30 q20 -20 46 -6" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    </svg>

    <!-- thanksgiving turkey / fall mushrooms -->
    <svg v-if="thanks" class="turkey" viewBox="0 0 200 200">
      <g class="tail">
        <ellipse v-for="(a, n) in [-70, -45, -22, 0, 22, 45, 70]" :key="n" cx="100" cy="46" rx="18" ry="48" :fill="['#c2531c', '#e3a93a', '#a0522d', '#d8b23c', '#a0522d', '#e3a93a', '#c2531c'][n]" :transform="`rotate(${a} 100 110)`"/>
        <ellipse v-for="(a, n) in [-60, -30, 0, 30, 60]" :key="'i' + n" cx="100" cy="66" rx="10" ry="28" fill="#f4e6c8" opacity=".6" :transform="`rotate(${a} 100 110)`"/>
      </g>
      <ellipse cx="100" cy="128" rx="40" ry="42" fill="#7a4a2a"/>
      <g class="head">
        <ellipse cx="100" cy="88" rx="20" ry="22" fill="#9a6338"/>
        <circle cx="92" cy="84" r="5" fill="#fff"/><circle cx="108" cy="84" r="5" fill="#fff"/><circle cx="93" cy="85" r="2.5" fill="#1b120b"/><circle cx="107" cy="85" r="2.5" fill="#1b120b"/>
        <path d="M94 94 h12 l-6 10z" fill="#ffb81c"/>
        <path d="M104 100 q8 6 2 18 q-8 -6 -2 -18z" fill="#e63950"/>
      </g>
      <path d="M86 168 v20 M114 168 v20 M80 188 h12 M108 188 h12" stroke="#ffb81c" stroke-width="5" stroke-linecap="round"/>
    </svg>
    <svg v-else class="shrooms" viewBox="0 0 180 160">
      <rect x="40" y="70" width="26" height="70" rx="10" fill="#fff3e0"/><path d="M4 76 C4 30, 100 30, 102 76z" fill="#cf3a2a"/>
      <circle cx="30" cy="54" r="7" fill="#fff"/><circle cx="58" cy="44" r="6" fill="#fff"/><circle cx="80" cy="62" r="8" fill="#fff"/>
      <rect x="120" y="96" width="18" height="46" rx="8" fill="#fff3e0"/><path d="M96 100 C96 70, 162 70, 164 100z" fill="#e3a93a"/>
      <circle cx="116" cy="88" r="4.5" fill="#fff"/><circle cx="142" cy="84" r="5" fill="#fff"/>
      <path d="M0 150 q90 -16 180 0" stroke="#6f7336" stroke-width="10" stroke-linecap="round" fill="none"/>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.leaf { position: absolute; top: -140px; animation: fall var(--dur) linear infinite; animation-delay: var(--d); filter: drop-shadow(0 8px 10px rgb(0 0 0 / 0.25)); }
@keyframes fall {
  0% { transform: translate(0, 0) rotate(0deg) rotateY(0deg); opacity: 0; }
  8% { opacity: 1; }
  25% { transform: translate(var(--sw), 28vh) rotate(90deg) rotateY(60deg); }
  50% { transform: translate(calc(var(--sw) * -0.6), 56vh) rotate(180deg) rotateY(0deg); }
  75% { transform: translate(var(--sw), 84vh) rotate(270deg) rotateY(60deg); }
  100% { transform: translate(0, 112vh) rotate(360deg); opacity: 0.9; }
}
.wheat { position: absolute; right: clamp(420px, 40vw, 640px); bottom: 16px; width: clamp(80px, 8vw, 130px); z-index: 2; }
.stalk { transform-box: fill-box; transform-origin: 50% 100%; transform: rotate(var(--r)); animation: sway 3.4s ease-in-out infinite alternate; animation-delay: var(--d); }
@keyframes sway { from { transform: rotate(calc(var(--r) - 4deg)); } to { transform: rotate(calc(var(--r) + 4deg)); } }
.pile { position: absolute; right: clamp(120px, 12vw, 220px); bottom: 14px; width: clamp(280px, 28vw, 440px); z-index: 2; filter: drop-shadow(0 18px 24px rgb(0 0 0 / 0.3)); }
.turkey, .shrooms { position: absolute; right: clamp(4px, 1vw, 20px); bottom: 18px; width: clamp(130px, 12vw, 200px); z-index: 3; filter: drop-shadow(0 14px 18px rgb(0 0 0 / 0.3)); }
.turkey { animation: strut 2.4s ease-in-out infinite; }
@keyframes strut { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-6px) rotate(-3deg); } }
.tail { transform-box: fill-box; transform-origin: 50% 100%; animation: fan 3s ease-in-out infinite alternate; }
@keyframes fan { from { transform: scale(0.94); } to { transform: scale(1.06); } }
.head { transform-box: fill-box; transform-origin: 50% 100%; animation: peck 1.2s ease-in-out infinite; }
@keyframes peck { 0%, 60%, 100% { transform: rotate(0); } 75% { transform: rotate(12deg) translateY(3px); } }
@media (max-width: 680px) {
  .leaf:nth-of-type(n + 6) { display: none; }
  .leaf { width: 54px !important; }
  .pile { width: 200px; right: 84px; }
  .turkey, .shrooms { width: 92px; }
  .wheat { width: 56px; right: 290px; }
}
</style>
