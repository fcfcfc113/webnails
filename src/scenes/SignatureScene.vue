<script setup>
const bottles = [
  { right: 30, bottom: 30, w: 96, body: '#ff48b0', cap: '#2b1d33', d: 0 },
  { right: 13, bottom: 24, w: 120, body: '#7b9cff', cap: '#e9c766', d: -1.2 },
  { right: 2, bottom: 40, w: 84, body: '#ffd23f', cap: '#ff48b0', d: -2.1 },
]
</script>

<template>
  <div class="scene" aria-hidden="true">
    <svg v-for="(b, n) in bottles" :key="n" class="bottle" viewBox="0 0 80 120" :style="{ right: b.right + '%', bottom: b.bottom + 'px', width: b.w + 'px', '--d': b.d + 's' }">
      <rect x="28" y="2" width="24" height="40" rx="6" :fill="b.cap"/>
      <rect x="24" y="38" width="32" height="12" rx="3" :fill="b.cap"/>
      <rect x="6" y="48" width="68" height="68" rx="22" :fill="b.body"/>
      <rect x="6" y="48" width="68" height="68" rx="22" fill="url(#gloss)"/>
      <defs><linearGradient id="gloss" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      <path d="M40 92 c-6 -4 -12 -8 -12 -14 0 -4 3 -7 6 -7 3 0 5 2 6 4 1 -2 3 -4 6 -4 3 0 6 3 6 7 0 6 -6 10 -12 14z" fill="#fff" opacity=".9"/>
    </svg>
    <span v-for="n in 8" :key="'s' + n" class="spark" :style="{ left: 40 + n * 7 + '%', top: 20 + ((n * 23) % 50) + '%', '--d': -n * 0.4 + 's' }" />
  </div>
</template>

<style scoped>
.scene { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.bottle { position: absolute; z-index: 2; animation: float 4s ease-in-out infinite alternate; animation-delay: var(--d); filter: drop-shadow(0 16px 20px rgb(0 0 0 / 0.3)); }
@keyframes float { from { transform: translateY(0) rotate(-6deg); } to { transform: translateY(-18px) rotate(6deg); } }
.spark { position: absolute; width: 18px; height: 18px; background: #fff; clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%); animation: tw 2s ease-in-out infinite; animation-delay: var(--d); }
@keyframes tw { 0%, 100% { transform: scale(0.3); opacity: 0.3; } 50% { transform: scale(1.3) rotate(45deg); opacity: 1; } }
@media (max-width: 680px) { .bottle { width: 60px !important; } }
</style>
