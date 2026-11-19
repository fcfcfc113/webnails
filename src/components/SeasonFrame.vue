<script setup>
import { computed } from 'vue'
import { festive, decor, season } from '../season.js'
import Sticker from './Sticker.vue'
import Bunting from './Bunting.vue'

// Hanging ornaments: x position (%), string length (px), size (px)
const SLOTS = [
  [3, 8, 44], [47, 70, 50], [56, 24, 46], [63, 96, 54], [75, 16, 50], [86, 74, 60], [96, 26, 46],
]
const hangs = computed(() => SLOTS.map(([x, len, size], n) => ({ x, len, size, icon: festive.value.hang[n % festive.value.hang.length], d: (n * -0.7).toFixed(1) })))

const icicles = (() => {
  let d = ''
  for (let x = 0; x < 240; x += 12) { const h = 14 + ((x * 7) % 26); d += `M${x} 0L${x + 6} ${h}L${x + 12} 0Z` }
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='44'><rect width='240' height='6' fill='#fff'/><path d='${d}' fill='#e8f4ff' stroke='#bcdcff' stroke-width='1'/></svg>`)}")`
})()
</script>

<template>
  <div class="frame" :class="'top--' + festive.top" aria-hidden="true">
    <!-- top garland -->
    <div v-if="festive.top === 'icicles'" class="icicles" :style="{ backgroundImage: icicles }" />
    <template v-else-if="festive.top === 'webs'">
      <svg class="web web--l" viewBox="0 0 200 200"><g fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.6"><path d="M0 0L200 60M0 0L150 150M0 0L60 200M0 0L200 0M0 0L0 200"/><path d="M40 0Q38 14 36 11Q30 30 12 34Q14 38 0 40"/><path d="M90 0Q86 30 80 25Q66 66 27 76Q30 84 0 90"/><path d="M140 0Q134 46 125 40Q104 104 42 118Q46 130 0 140"/><path d="M190 0Q182 62 170 56Q140 140 58 160Q62 176 0 190"/></g></svg>
      <svg class="web web--r" viewBox="0 0 200 200"><g fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.6"><path d="M0 0L200 60M0 0L150 150M0 0L60 200M0 0L200 0M0 0L0 200"/><path d="M40 0Q38 14 36 11Q30 30 12 34Q14 38 0 40"/><path d="M90 0Q86 30 80 25Q66 66 27 76Q30 84 0 90"/><path d="M140 0Q134 46 125 40Q104 104 42 118Q46 130 0 140"/><path d="M190 0Q182 62 170 56Q140 140 58 160Q62 176 0 190"/></g></svg>
    </template>
    <div v-if="festive.top !== 'icicles'" class="garland"><Bunting :config="decor.bunting" big /></div>

    <!-- hanging ornaments -->
    <div v-for="(h, n) in hangs" :key="season.id + n" class="hang" :class="'hang--' + n" :style="{ left: h.x + '%', '--len': h.len + 'px', '--size': h.size + 'px', '--d': h.d + 's' }">
      <span class="string" />
      <span class="orn"><Sticker :icon="h.icon" /></span>
    </div>

    <!-- bottom edge -->
    <svg class="edge" :class="'edge--' + festive.edge" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path v-if="festive.edge === 'snow'" d="M0 70C90 40 160 82 260 62S420 30 520 58 700 92 820 60 1010 28 1120 56 1320 86 1440 54V120H0Z" fill="#ffffff" />
      <path v-if="festive.edge === 'snow'" d="M0 92C120 74 220 100 360 86S600 70 740 90 980 104 1120 86 1340 76 1440 88V120H0Z" fill="var(--bg)" />
      <path v-else-if="festive.edge === 'waves'" d="M0 60C120 30 240 90 360 60S600 30 720 60 960 90 1080 60 1320 30 1440 60V120H0Z" fill="color-mix(in srgb, var(--accent-2) 55%, white)" />
      <path v-if="festive.edge === 'waves'" d="M0 84C120 64 240 104 360 84S600 64 720 84 960 104 1080 84 1320 64 1440 84V120H0Z" fill="var(--bg)" />
      <path v-else-if="festive.edge === 'grass'" d="M0 80Q20 50 30 80Q45 40 60 80Q75 55 90 80Q110 35 125 80Q140 55 160 80Q175 45 190 80Q210 60 225 80Q240 40 260 80Q280 55 295 80Q310 38 330 80Q350 58 365 80Q380 44 400 80Q420 60 435 80Q450 36 470 80Q490 56 505 80Q520 42 540 80Q560 60 575 80Q590 40 610 80Q630 55 645 80Q660 36 680 80Q700 58 715 80Q730 44 750 80Q770 60 785 80Q800 38 820 80Q840 56 855 80Q870 42 890 80Q910 60 925 80Q940 40 960 80Q980 55 995 80Q1010 36 1030 80Q1050 58 1065 80Q1080 44 1100 80Q1120 60 1135 80Q1150 38 1170 80Q1190 56 1205 80Q1220 42 1240 80Q1260 60 1275 80Q1290 40 1310 80Q1330 55 1345 80Q1360 36 1380 80Q1400 58 1415 80Q1430 50 1440 80V120H0Z" fill="#7fcf8f" />
      <path v-if="festive.edge === 'grass'" d="M0 96H1440V120H0Z" fill="var(--bg)" />
      <path v-else-if="festive.edge !== 'snow' && festive.edge !== 'waves'" d="M0 80Q60 40 120 80T240 80T360 80T480 80T600 80T720 80T840 80T960 80T1080 80T1200 80T1320 80T1440 80V120H0Z" fill="var(--bg)" />
    </svg>
    <ul v-if="false" class="pile">
      <li v-for="(s, n) in decor.footer" :key="season.id + 'p' + n" :style="{ '--r': (n % 2 ? 12 : -10) + 'deg' }"><Sticker :icon="s" /></li>
    </ul>
  </div>
</template>

<style scoped>
.frame { position: absolute; inset: 0; pointer-events: none; z-index: 4; }
.garland { position: absolute; left: 0; right: 0; top: calc(var(--head-h) - 6px); }
.garland :deep(.bunting) { height: 78px; background-size: 252px 78px; }
.icicles { position: absolute; left: 0; right: 0; top: 0; height: 44px; background-repeat: repeat-x; filter: drop-shadow(0 4px 6px rgb(60 120 200 / 0.25)); }
.web { position: absolute; top: 0; width: clamp(140px, 18vw, 260px); }
.web--l { left: 0; }
.web--r { right: 0; transform: scaleX(-1); }

.hang { position: absolute; top: calc(var(--head-h) + 8px); transform-origin: top center; animation: swing 3.6s ease-in-out infinite alternate; animation-delay: var(--d); }
@keyframes swing { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
.string { display: block; width: 1.5px; height: var(--len); margin-inline: auto; background: color-mix(in srgb, var(--ink) 35%, transparent); }
.top--webs .string { background: rgb(255 255 255 / 0.6); }
.orn { display: block; width: var(--size); margin-top: -4px; transform: translateX(calc(var(--size) / -2 + 0.75px)); }
/* keep ornaments clear of the headline column on the left */
.hang--1, .hang--2 { opacity: 0.95; }

.edge { position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: clamp(60px, 9vw, 120px); }
.pile { list-style: none; margin: 0; padding: 0; position: absolute; left: 0; right: 0; bottom: clamp(6px, 1.2vw, 18px); display: flex; justify-content: space-around; }
.pile li { width: clamp(40px, 5vw, 70px); transform: rotate(var(--r)); }

@media (max-width: 1080px) { .hang--2, .hang--4 { display: none; } }
@media (max-width: 680px) {
  .garland { top: calc(var(--head-h) - 10px); }
  .garland :deep(.bunting) { height: 56px; background-size: 180px 56px; }
  .hang { top: calc(var(--head-h) + 2px); }
  .hang--1, .hang--3, .hang--6 { display: none; }
  .hang { --size: 40px !important; }
  .web { width: 110px; }
  .pile li:nth-child(n + 4) { display: none; }
}
</style>
