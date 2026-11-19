<script setup>
import { SEASONS, seasonForMonth } from '../seasons.js'
import { sceneUrl } from '../media.js'
import { PALETTES } from '../palettes.js'
import { season, setSeason } from '../season.js'
import NailTip from './NailTip.vue'
import Icon from './Icon.vue'

const ids = ['valentine', 'spring', 'prom', 'summer', 'fall', 'halloween', 'thanksgiving', 'christmas']
const cards = ids.map((id) => SEASONS.find((s) => s.id === id)).filter(Boolean)
const thisMonth = seasonForMonth()
const fanOf = (s) => s.fan.slice(0, 4).map((id) => s.designs.find((d) => d.id === id)).filter(Boolean)

function pick(id) {
  setSeason(id)
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
</script>

<template>
  <section id="collections" class="section board pat" aria-labelledby="board-title">
    <div class="wrap">
      <div class="head">
        <svg class="bottle" viewBox="0 0 32 48" aria-hidden="true"><rect x="11" y="2" width="10" height="13" rx="2.5" fill="currentColor"/><rect x="9" y="13" width="14" height="5" rx="1.5" fill="currentColor"/><rect x="4" y="17" width="24" height="28" rx="8" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>
        <h2 id="board-title" class="script">Seasonal Nail Collections</h2>
        <p class="sub">A new look for every holiday. Tap a season to dress the whole studio in it.</p>
      </div>

      <ul class="grid">
        <li v-for="(s, n) in cards" :key="s.id" :style="{ '--d': n * 70 + 'ms', '--acc': PALETTES[s.id].accent, '--soft': PALETTES[s.id]['accent-soft'] }">
          <button type="button" class="card" :class="{ active: season.id === s.id }" :aria-pressed="season.id === s.id" @click="pick(s.id)" :aria-label="`Show the ${s.name} collection`">
            <img :src="sceneUrl(s.id, 700, 875)" alt="" loading="lazy" />
            <span class="shade" />
            <span class="title script">{{ s.name }}</span>
            <span class="fan" aria-hidden="true">
              <NailTip v-for="(d, k) in fanOf(s)" :key="d.id" :design="d" :style="{ '--k': k - 1.5 }" />
            </span>
            <span class="months">{{ s.months }}</span>
            <span v-if="season.id === s.id" class="now"><Icon name="check" /> Now showing</span>
            <span v-else-if="s.id === thisMonth" class="now now--soft"><Icon name="calendar" /> This month</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.head { display: grid; justify-items: center; text-align: center; gap: 6px; margin-bottom: clamp(28px, 4vw, 48px); }
.bottle { width: 30px; color: var(--accent); }
.head h2 { margin: 0; color: var(--ink); font-size: clamp(3rem, 7vw, 5.6rem); }
.sub { margin: 0; color: var(--muted); max-width: 46ch; }
.grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.6vw, 24px); }
.grid li { animation: rise 0.7s var(--ease) both; animation-delay: var(--d); }
@keyframes rise { from { opacity: 0; transform: translateY(18px); } }
.card {
  position: relative; display: block; width: 100%; padding: 0; border: 0; border-radius: 24px; overflow: hidden;
  aspect-ratio: 4 / 5; color: #fff; background: var(--acc);
  box-shadow: var(--shadow-sm); transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
.shade { position: absolute; inset: 0; background: linear-gradient(to bottom, rgb(0 0 0 / 0.45) 0%, rgb(0 0 0 / 0) 40%, rgb(0 0 0 / 0) 55%, color-mix(in srgb, var(--acc) 85%, #000) 100%); }
.title { position: absolute; left: 0; right: 0; top: 14px; text-align: center; font-size: clamp(2rem, 3vw, 2.8rem); text-shadow: 0 3px 16px rgb(0 0 0 / 0.45); padding-inline: 8px; }
.fan { position: absolute; left: 50%; bottom: 58px; transform: translateX(-50%); display: flex; align-items: flex-end; }
.fan .tip { --w: clamp(34px, 3.4vw, 50px); margin: 0 -2px; transform: rotate(calc(var(--k) * 10deg)) translateY(calc(var(--k) * var(--k) * 3px)); box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08), 0 10px 18px -6px rgb(0 0 0 / 0.5); transition: transform 0.6s var(--ease); }
.card:hover .fan .tip { transform: rotate(calc(var(--k) * 15deg)) translateY(calc(var(--k) * var(--k) * 4px - 6px)); }
.card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.card:hover img { transform: scale(1.06); }
.card.active { box-shadow: 0 0 0 4px var(--acc), var(--shadow); }
.months { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); padding: 6px 14px; border-radius: 999px; background: rgb(255 255 255 / 0.94); color: #2a1f2d; font-weight: 700; font-size: 0.82rem; white-space: nowrap; }
.now { position: absolute; right: 10px; top: 10px; display: none; }
.card.active .now, .now--soft { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; background: #fff; color: var(--acc); font-weight: 700; font-size: 0.76rem; }
.card.active .title { top: 44px; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px) {
  .grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; margin-inline: -16px; padding: 4px 16px 12px; scrollbar-width: none; }
  .grid::-webkit-scrollbar { display: none; }
  .grid li { flex: none; width: 68vw; scroll-snap-align: center; }
}
</style>
