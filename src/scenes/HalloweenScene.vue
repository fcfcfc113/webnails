<script setup>
const bats = [
  { x: 52, y: 22, s: 54, d: 0 }, { x: 62, y: 14, s: 40, d: -0.3 }, { x: 70, y: 28, s: 46, d: -0.6 },
  { x: 44, y: 34, s: 32, d: -0.2 }, { x: 78, y: 18, s: 36, d: -0.45 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <!-- full moon -->
    <svg class="moon" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="96" fill="#ffe7a0" opacity=".12"/>
      <circle cx="100" cy="100" r="78" fill="#ffe9a8"/>
      <circle cx="74" cy="78" r="14" fill="#f2d27c"/><circle cx="124" cy="120" r="10" fill="#f2d27c"/><circle cx="118" cy="70" r="6" fill="#f2d27c"/><circle cx="82" cy="130" r="7" fill="#f2d27c"/>
    </svg>

    <!-- witch on a broom crossing the moon -->
    <div class="flight">
      <svg viewBox="0 0 260 150" class="witch">
        <path d="M10 104 L 200 76" stroke="#5a3a1e" stroke-width="7" stroke-linecap="round"/>
        <path d="M200 76 l40 -18 l-6 14 l18 -2 l-12 12 l16 4 l-18 6 l10 10 l-22 -6z" fill="#c28a3a"/>
        <path d="M200 76 l12 -4 l2 14 z" fill="#8a5a2a"/>
        <g class="rider">
          <path d="M70 98 Q 60 50 92 40 Q 120 36 130 70 L 136 92 Z" fill="#3a2350"/>
          <path d="M84 96 q -30 10 -54 34 q 26 -6 50 -22z" fill="#5b2f7a" class="cape"/>
          <circle cx="108" cy="34" r="13" fill="#9be07a"/>
          <path d="M84 30 L 134 26 L 116 -14 Z" fill="#2b1838"/>
          <rect x="82" y="24" width="56" height="8" rx="4" fill="#2b1838"/>
          <rect x="100" y="16" width="20" height="5" fill="#ff7a1a"/>
          <path d="M96 38 q -16 4 -20 22 M120 40 q 10 14 4 30" stroke="#ff7a1a" stroke-width="5" stroke-linecap="round" fill="none"/>
          <circle cx="114" cy="32" r="2" fill="#1b0f24"/>
          <path d="M118 38 l7 3 -7 2z" fill="#7cc35a"/>
          <path d="M102 86 l-8 22 M118 84 l4 24" stroke="#2b1838" stroke-width="7" stroke-linecap="round"/>
        </g>
        <g class="cat"><path d="M150 72 q -2 -16 8 -20 l2 -8 4 6 4 -6 2 8 q 8 4 6 20z" fill="#1b0f24"/><circle cx="160" cy="58" r="1.6" fill="#b8ff3c"/><circle cx="166" cy="58" r="1.6" fill="#b8ff3c"/><path d="M176 70 q 14 -4 10 -18" stroke="#1b0f24" stroke-width="4" fill="none" stroke-linecap="round"/></g>
      </svg>
    </div>

    <!-- bat flock -->
    <svg v-for="(b, n) in bats" :key="n" class="bat" viewBox="0 0 100 50" :style="{ left: b.x + '%', top: `calc(var(--head-h) + ${b.y}vh)`, width: b.s + 'px', '--d': b.d + 's', '--f': (6 + n) + 's' }">
      <g class="wings"><path d="M50 22 C 40 6, 22 4, 2 16 C 14 16, 18 24, 18 30 C 26 24, 36 26, 42 32 C 44 28, 48 26, 50 28 C 52 26, 56 28, 58 32 C 64 26, 74 24, 82 30 C 82 24, 86 16, 98 16 C 78 4, 60 6, 50 22 Z" fill="#1b0f24"/></g>
      <ellipse cx="50" cy="26" rx="7" ry="9" fill="#1b0f24"/><path d="M45 18 l2 -7 3 5 3 -5 2 7z" fill="#1b0f24"/>
      <circle cx="47.5" cy="24" r="1.6" fill="#ff7a1a"/><circle cx="52.5" cy="24" r="1.6" fill="#ff7a1a"/>
    </svg>

    <!-- floating ghost -->
    <svg class="ghost" viewBox="0 0 120 150">
      <path d="M14 140 V 56 C 14 24, 36 6, 60 6 S 106 24, 106 56 V 140 l -15 -12 -15 12 -16 -12 -15 12 -15 -12z" fill="#fff" opacity=".95"/>
      <ellipse cx="44" cy="58" rx="7" ry="10" fill="#1b0f24"/><ellipse cx="76" cy="58" rx="7" ry="10" fill="#1b0f24"/>
      <ellipse cx="60" cy="86" rx="9" ry="12" fill="#1b0f24"/>
      <circle cx="32" cy="74" r="6" fill="#ffb3c9" opacity=".7"/><circle cx="88" cy="74" r="6" fill="#ffb3c9" opacity=".7"/>
    </svg>

    <!-- spider dropping on its thread -->
    <div class="spider">
      <span class="thread" />
      <svg viewBox="0 0 80 80"><path d="M24 34 c-10 -8 -18 -8 -22 2 M24 42 c-10 0 -18 4 -20 12 M26 48 c-8 6 -12 12 -12 20 M56 34 c10 -8 18 -8 22 2 M56 42 c10 0 18 4 20 12 M54 48 c8 6 12 12 12 20" stroke="#1b0f24" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="40" cy="44" r="16" fill="#1b0f24"/><circle cx="40" cy="24" r="10" fill="#1b0f24"/><circle cx="36" cy="22" r="3" fill="#fff"/><circle cx="44" cy="22" r="3" fill="#fff"/><circle cx="36" cy="22" r="1.3"/><circle cx="44" cy="22" r="1.3"/></svg>
    </div>

    <!-- giant glowing jack-o'-lanterns -->
    <svg class="pumpkins" viewBox="0 0 420 220">
      <defs><radialGradient id="glowp" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="#fff6a0"/><stop offset=".55" stop-color="#ffb21a"/><stop offset="1" stop-color="#ff6a00"/></radialGradient></defs>
      <ellipse cx="210" cy="212" rx="200" ry="10" fill="#000" opacity=".3"/>
      <!-- big -->
      <g>
        <path d="M150 34 q -2 -26 18 -32 l 6 8 q -14 6 -12 26z" fill="#4c6b25"/>
        <ellipse cx="118" cy="128" rx="58" ry="80" fill="#e8650f"/><ellipse cx="216" cy="128" rx="58" ry="80" fill="#e8650f"/>
        <ellipse cx="167" cy="128" rx="62" ry="86" fill="#ff7f1f"/>
        <path d="M167 44 v170 M128 48 q -20 80 0 162 M206 48 q 20 80 0 162" stroke="#d55a0b" stroke-width="3" fill="none" opacity=".7"/>
        <g class="flicker">
          <path d="M112 104 l 22 -30 l 22 30z M178 104 l 22 -30 l 22 30z" fill="url(#glowp)"/>
          <path d="M160 128 l 8 -14 l 8 14z" fill="url(#glowp)"/>
          <path d="M100 150 q 67 60 134 0 l -14 22 -12 -12 -14 20 -14 -18 -14 20 -14 -18 -14 18 -12 -14 -12 12z" fill="url(#glowp)"/>
        </g>
      </g>
      <!-- small -->
      <g transform="translate(276 92)">
        <path d="M70 6 q 0 -14 12 -18 l 4 6 q -8 4 -8 14z" fill="#4c6b25"/>
        <ellipse cx="52" cy="70" rx="38" ry="50" fill="#e8650f"/><ellipse cx="96" cy="70" rx="38" ry="50" fill="#e8650f"/><ellipse cx="74" cy="70" rx="42" ry="54" fill="#ff8f2f"/>
        <g class="flicker f2">
          <path d="M50 58 q 8 -14 18 0z M80 58 q 8 -14 18 0z" fill="url(#glowp)"/>
          <path d="M48 82 q 26 26 52 0 q -26 12 -52 0z" fill="url(#glowp)"/>
        </g>
      </g>
      <!-- tiny -->
      <g transform="translate(6 132)">
        <ellipse cx="40" cy="42" rx="28" ry="32" fill="#e8650f"/><ellipse cx="62" cy="42" rx="28" ry="32" fill="#e8650f"/><ellipse cx="51" cy="42" rx="30" ry="36" fill="#ff8f2f"/>
        <path d="M51 6 q 0 -10 8 -12" stroke="#4c6b25" stroke-width="5" fill="none" stroke-linecap="round"/>
        <g class="flicker f3"><path d="M38 36 l 7 -10 7 10z M56 36 l 7 -10 7 10z M38 52 q 13 12 26 0z" fill="url(#glowp)"/></g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; }
.moon { position: absolute; right: 30%; top: calc(var(--head-h) + 40px); width: clamp(140px, 16vw, 260px); filter: drop-shadow(0 0 60px rgb(255 214 120 / 0.55)); animation: moonglow 5s ease-in-out infinite alternate; }
@keyframes moonglow { to { filter: drop-shadow(0 0 90px rgb(255 214 120 / 0.75)); } }
.flight { position: absolute; left: 0; top: calc(var(--head-h) + 90px); width: clamp(180px, 18vw, 280px); animation: fly 15s linear infinite; z-index: 1; }
.witch { width: 100%; height: auto; animation: bobble 1.4s ease-in-out infinite alternate; filter: drop-shadow(0 0 16px rgb(184 255 60 / 0.25)); }
@keyframes fly { 0% { transform: translate(-120%, 60px) rotate(-6deg); } 50% { transform: translate(50vw, -20px) rotate(-10deg); } 100% { transform: translate(115vw, 40px) rotate(-4deg); } }
@keyframes bobble { to { transform: translateY(-10px) rotate(2deg); } }
.cape { transform-box: fill-box; transform-origin: right top; animation: flap 0.5s ease-in-out infinite alternate; }
@keyframes flap { to { transform: skewX(14deg) scaleY(0.9); } }

.bat { position: absolute; animation: batfly var(--f) ease-in-out infinite alternate; animation-delay: var(--d); filter: drop-shadow(0 0 8px rgb(160 124 255 / 0.5)); }
.wings { transform-box: fill-box; transform-origin: center; animation: beat 0.28s ease-in-out infinite alternate; }
@keyframes beat { to { transform: scaleY(0.35) translateY(8px); } }
@keyframes batfly { 0% { transform: translate(0, 0); } 33% { transform: translate(60px, -30px); } 66% { transform: translate(-40px, 20px); } 100% { transform: translate(30px, 40px); } }

.ghost { position: absolute; left: 48%; top: 46%; width: clamp(70px, 7vw, 120px); animation: float 5s ease-in-out infinite alternate; opacity: 0.92; filter: drop-shadow(0 0 24px rgb(255 255 255 / 0.4)); }
@keyframes float { from { transform: translate(0, 0) rotate(-6deg); } to { transform: translate(30px, -40px) rotate(6deg); } }

.spider { position: absolute; right: 18%; top: 0; width: 56px; animation: drop 7s ease-in-out infinite; }
.thread { display: block; width: 1.5px; height: 200px; margin-inline: auto; background: rgb(255 255 255 / 0.55); }
.spider svg { width: 56px; margin-top: -6px; }
@keyframes drop { 0%, 100% { transform: translateY(-140px); } 45%, 60% { transform: translateY(0); } }

.pumpkins { position: absolute; right: clamp(0px, 2vw, 40px); bottom: 16px; width: clamp(280px, 30vw, 460px); z-index: 2; filter: drop-shadow(0 0 40px rgb(255 140 20 / 0.45)); }
.flicker { animation: flicker 1.6s steps(1) infinite; }
.f2 { animation-delay: -0.5s; }
.f3 { animation-delay: -1s; }
@keyframes flicker { 0%, 100% { opacity: 1; } 18% { opacity: 0.75; } 22% { opacity: 1; } 47% { opacity: 0.85; } 70% { opacity: 0.65; } 74% { opacity: 1; } }

@media (max-width: 680px) {
  .moon { right: 4%; width: 120px; top: calc(var(--head-h) + 30px); }
  .flight { width: 150px; animation-duration: 10s; }
  .pumpkins { width: 240px; bottom: 10px; }
  .ghost { left: auto; right: 6%; top: 40%; width: 64px; }
  .bat:nth-of-type(n + 4) { display: none; }
  .spider { right: 6%; }
}
</style>
