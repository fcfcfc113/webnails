<script setup>
const bubbles = Array.from({ length: 10 }, (_, n) => ({ x: 20 + (n * 13) % 60, d: -(n * 0.4).toFixed(1), s: 3 + (n % 3) }))
const confetti = Array.from({ length: 18 }, (_, n) => ({ x: (n * 5.7) % 100, c: ['#e9c766', '#f3c6d4', '#ffffff', '#cdbff2'][n % 4], dur: 8 + (n % 5), d: -n * 0.6 }))
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- disco ball -->
    <div class="disco">
      <span class="cord" />
      <svg viewBox="0 0 120 120" class="ball">
        <defs><clipPath id="dball"><circle cx="60" cy="60" r="54"/></clipPath></defs>
        <circle cx="60" cy="60" r="56" fill="#9aa5b4"/>
        <g clip-path="url(#dball)" class="tiles">
          <g v-for="r in 10" :key="r"><rect v-for="c in 14" :key="c" :x="(c - 1) * 9 - 4 + (r % 2) * 4" :y="(r - 1) * 12" width="8" height="11" :fill="['#e9eef5', '#c5ced9', '#ffffff', '#aeb8c6', '#f3e6f7', '#d8e4ff'][(r * 3 + c) % 6]"/></g>
        </g>
        <circle cx="42" cy="38" r="12" fill="#fff" opacity=".7"/>
      </svg>
      <span class="glint g1" /><span class="glint g2" /><span class="glint g3" />
    </div>

    <!-- champagne toast -->
    <svg class="toast" viewBox="0 0 260 260">
      <g class="gl gl-l">
        <path d="M70 30 h56 l-8 92 c-2 18 -12 26 -20 28 v62 h22 v10 h-54 v-10 h22 v-62 c-8 -2 -18 -10 -20 -28z" fill="#ffffff" opacity=".85"/>
        <path d="M74 60 h48 l-5 60 c-2 14 -10 20 -19 22 c-9 -2 -17 -8 -19 -22z" fill="#f1d58a"/>
        <circle v-for="(b, n) in bubbles.slice(0, 5)" :key="n" :cx="80 + b.x * 0.5" cy="120" :r="b.s * 0.7" fill="#fff" class="bub" :style="{ '--d': b.d + 's' }"/>
      </g>
      <g class="gl gl-r">
        <path d="M134 30 h56 l-8 92 c-2 18 -12 26 -20 28 v62 h22 v10 h-54 v-10 h22 v-62 c-8 -2 -18 -10 -20 -28z" fill="#ffffff" opacity=".85"/>
        <path d="M138 60 h48 l-5 60 c-2 14 -10 20 -19 22 c-9 -2 -17 -8 -19 -22z" fill="#f1d58a"/>
        <circle v-for="(b, n) in bubbles.slice(5)" :key="n" :cx="144 + b.x * 0.5" cy="120" :r="b.s * 0.7" fill="#fff" class="bub" :style="{ '--d': b.d + 's' }"/>
      </g>
      <g class="clink"><path d="M130 22 l0 -14 M118 26 l-8 -10 M142 26 l8 -10" stroke="#e9c766" stroke-width="4" stroke-linecap="round"/></g>
    </svg>

    <!-- diamond ring -->
    <svg class="ring" viewBox="0 0 120 140">
      <circle cx="60" cy="90" r="38" fill="none" stroke="#e9c766" stroke-width="11"/>
      <circle cx="60" cy="90" r="38" fill="none" stroke="#fff3c4" stroke-width="3" stroke-dasharray="30 200"/>
      <path d="M36 40 l24 -30 24 30 -24 26z" fill="#e8f6ff"/><path d="M36 40 h48 M48 40 l12 26 12 -26 M48 40 l12 -30 12 30" stroke="#9bc7e8" stroke-width="2" fill="none"/>
      <path class="shine" d="M84 14 l3 -10 3 10 10 3 -10 3 -3 10 -3 -10 -10 -3z" fill="#fff"/>
    </svg>

    <i v-for="(c, n) in confetti" :key="n" class="conf" :style="{ left: c.x + '%', background: c.c, '--dur': c.dur + 's', '--d': c.d + 's' }" />
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.disco { position: absolute; right: 32%; top: 0; width: clamp(90px, 9vw, 140px); animation: swing 4s ease-in-out infinite alternate; transform-origin: top center; }
.cord { display: block; width: 2px; height: calc(var(--head-h) + 40px); margin-inline: auto; background: rgb(255 255 255 / 0.6); }
.ball { width: 100%; filter: drop-shadow(0 0 30px rgb(255 255 255 / 0.5)); }
.tiles { animation: turn 3s linear infinite; }
@keyframes turn { to { transform: translateX(-18px); } }
@keyframes swing { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.glint { position: absolute; width: 14px; height: 14px; background: #fff; clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%); animation: glint 1.8s ease-in-out infinite; }
.g1 { left: -20px; bottom: 10px; }
.g2 { right: -24px; bottom: 40px; animation-delay: -0.6s; }
.g3 { left: 40%; bottom: -24px; animation-delay: -1.2s; }
@keyframes glint { 0%, 100% { transform: scale(0.3); opacity: 0.2; } 50% { transform: scale(1.4) rotate(45deg); opacity: 1; } }
.toast { position: absolute; right: clamp(10px, 3vw, 60px); bottom: 20px; width: clamp(190px, 19vw, 290px); z-index: 2; filter: drop-shadow(0 16px 24px rgb(0 0 0 / 0.25)); }
.gl { transform-box: fill-box; transform-origin: bottom center; }
.gl-l { animation: tiltL 3s ease-in-out infinite; }
.gl-r { animation: tiltR 3s ease-in-out infinite; }
@keyframes tiltL { 0%, 100% { transform: rotate(-12deg); } 45%, 55% { transform: rotate(4deg); } }
@keyframes tiltR { 0%, 100% { transform: rotate(12deg); } 45%, 55% { transform: rotate(-4deg); } }
.clink { opacity: 0; animation: clink 3s ease-out infinite; }
@keyframes clink { 0%, 44% { opacity: 0; } 50% { opacity: 1; } 62% { opacity: 0; } }
.bub { animation: up 2.4s linear infinite; animation-delay: var(--d); }
@keyframes up { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-60px); opacity: 0; } }
.ring { position: absolute; left: 46%; bottom: 40px; width: clamp(80px, 8vw, 130px); z-index: 2; animation: float 4s ease-in-out infinite alternate; filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.25)); }
@keyframes float { to { transform: translateY(-16px) rotate(8deg); } }
.shine { transform-box: fill-box; transform-origin: center; animation: glint 2s ease-in-out infinite; }
.conf { position: absolute; top: -20px; width: 8px; height: 14px; border-radius: 2px; animation: drop var(--dur) linear infinite; animation-delay: var(--d); opacity: 0.9; }
@keyframes drop { 0% { transform: translateY(0) rotate(0); } 100% { transform: translateY(110vh) rotate(720deg); } }
@media (max-width: 680px) { .toast { width: 140px; } .ring { left: 8%; width: 70px; } .disco { right: 8%; width: 70px; } }
</style>
