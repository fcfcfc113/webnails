<script setup>
import { designs, season, decor, festive } from '../season.js'
import { booking, pickDesign, goToBooking } from '../store.js'
import NailTip from './NailTip.vue'
import Sticker from './Sticker.vue'
import Bunting from './Bunting.vue'

function toggle(id) { pickDesign(booking.designId === id ? '' : id) }
</script>

<template>
  <section id="collection" class="collection" aria-labelledby="collection-title">
    <Bunting :config="decor.bunting" />
    <div class="section inner">
      <div class="glow" aria-hidden="true" />
      <div class="wrap">
        <div class="section-head">
          <h2 id="collection-title" class="h2"><span class="script greet">{{ festive.greeting }}</span> The {{ season.name }} collection.</h2>
          <p class="lede">{{ season.railLede }}</p>
        </div>

        <ul :key="season.id" class="grid" aria-label="Seasonal designs">
          <li v-for="(d, n) in designs" :key="d.id" :style="{ '--d': n * 60 + 'ms' }">
            <button type="button" class="card" :aria-pressed="booking.designId === d.id" @click="toggle(d.id)">
              <span class="stage"><NailTip :design="d" /></span>
              <span class="dname">{{ d.name }}</span>
              <span class="vibe">{{ d.vibe }}</span>
              <span class="pick" aria-hidden="true">{{ booking.designId === d.id ? 'Added ✓' : 'Add to booking' }}</span>
            </button>
          </li>
        </ul>

        <div class="cta-row">
          <a class="btn" href="#book" @click.prevent="goToBooking">Book a {{ season.name }} set</a>
          <span class="hint">Illustrated previews. Your tech tailors every design to your nails.</span>
        </div>
      </div>
      <div class="st st--l" aria-hidden="true"><Sticker :icon="decor.hero[3]" /></div>
      <div class="st st--r" aria-hidden="true"><Sticker :icon="decor.hero[4]" /></div>
    </div>
  </section>
</template>

<style scoped>
.collection { position: relative; }
.greet { display: block; color: var(--accent); font-size: 1.5em; line-height: 1; margin-bottom: 4px; }
.inner { background: linear-gradient(180deg, var(--bg) 0%, var(--accent-soft) 100%); overflow: hidden; padding-top: clamp(48px, 7vw, 88px); }
.grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.grid li { animation: rise 0.7s var(--ease) both; animation-delay: var(--d); }
@keyframes rise { from { opacity: 0; transform: translateY(16px); } }
.card {
  width: 100%; border: 0; border-radius: var(--r); padding: 18px 16px 16px;
  background: var(--surface); text-align: center; display: grid; justify-items: center; gap: 4px;
  box-shadow: var(--shadow-sm); transition: transform 0.45s var(--ease), box-shadow 0.45s var(--ease);
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.stage { width: 100%; height: 150px; border-radius: 16px; background: var(--bg-2); display: grid; place-items: center; margin-bottom: 10px; }
.stage .tip { --w: 58px; transition: transform 0.6s var(--ease); }
.card:hover .stage .tip { transform: rotate(-8deg) scale(1.06); }
.dname { font-weight: 700; }
.vibe { color: var(--muted); font-size: 0.9rem; }
.pick { margin-top: 8px; font-size: 0.82rem; font-weight: 700; color: var(--accent); }
.card[aria-pressed='true'] { box-shadow: inset 0 0 0 2px var(--accent), var(--shadow); }
.cta-row { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-top: 32px; }
.hint { color: var(--muted); font-size: 0.92rem; }
.st { position: absolute; z-index: 2; pointer-events: none; animation: bob 7s ease-in-out infinite alternate; }
@keyframes bob { to { transform: translateY(-10px) rotate(4deg); } }
.st--l { width: 110px; right: 4%; top: 18px; }
.st--r { width: 100px; right: 3%; bottom: 36px; animation-delay: -3s; }
@media (max-width: 980px) { .grid { grid-template-columns: repeat(2, 1fr); } .st--l { display: none; } }
@media (max-width: 520px) { .stage { height: 120px; } .st--r { width: 80px; } }
</style>
