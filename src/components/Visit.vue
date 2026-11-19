<script setup>
import { salon } from '../data.js'
import { decor } from '../season.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'

const q = encodeURIComponent(`${salon.street}, ${salon.city}`)
const mapEmbed = `https://www.google.com/maps?q=${q}&output=embed`
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${q}`
const today = new Date().getDay()
const isToday = (days) =>
  (days === 'Sunday' && today === 0) || (days === 'Saturday' && today === 6) || (days.startsWith('Mon') && today >= 1 && today <= 5)
</script>

<template>
  <section id="visit" class="section visit pat" aria-labelledby="visit-title">
    <div class="wrap grid">
      <div class="info">
        <h2 id="visit-title" class="h2">Come say <em>hi.</em></h2>
        <address>
          <span class="street">{{ salon.street }}</span>
          <span class="city">{{ salon.city }}</span>
        </address>
        <div class="actions">
          <a class="btn" :href="mapUrl" target="_blank" rel="noopener"><Icon name="pin" /> Get directions</a>
          <a class="btn btn--ghost" :href="salon.phoneHref"><Icon name="phone" /> {{ salon.phone }}</a>
        </div>
        <dl class="hours">
          <div v-for="h in salon.hours" :key="h.days" :class="{ now: isToday(h.days) }">
            <dt>{{ h.days }} <span v-if="isToday(h.days)" class="chip">Today</span></dt>
            <dd class="num">{{ h.time }}</dd>
          </div>
        </dl>
        <p class="note"><span class="sample">sample address, phone &amp; hours</span></p>
      </div>
      <div class="map">
        <iframe :src="mapEmbed" title="Map to the studio" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
        <div class="st" aria-hidden="true"><Sticker :icon="decor.visit" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
.info { display: grid; gap: 22px; justify-items: start; }
address { font-style: normal; display: grid; }
.street { font-family: var(--display); font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1.1; }
.city { color: var(--muted); font-size: 1.1rem; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; }
.hours { margin: 0; width: 100%; max-width: 440px; display: grid; background: var(--surface); border-radius: var(--r); padding: 6px 20px; box-shadow: var(--shadow-sm); }
.hours div { display: flex; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid var(--line); }
.hours div:first-child { border-top: 0; }
.hours dt { font-weight: 600; display: flex; align-items: center; gap: 8px; }
.hours dt .chip { font-size: 0.7rem; padding: 2px 8px; color: var(--accent); }
.hours dd { margin: 0; color: var(--muted); }
.hours .now dd { color: var(--ink); font-weight: 600; }
.note { margin: 0; color: var(--muted); }
.map { position: relative; }
.map iframe { width: 100%; aspect-ratio: 4 / 3; border: 0; border-radius: var(--r-lg); box-shadow: var(--shadow); background: var(--bg-2); filter: saturate(0.85); }
.map .st { position: absolute; width: 120px; right: -20px; top: -40px; transform: rotate(10deg); }
@media (max-width: 880px) { .grid { grid-template-columns: 1fr; } .map .st { width: 84px; right: -4px; } }
</style>
