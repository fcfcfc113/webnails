<script setup>
import { salon } from '../data.js'
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.street + ', ' + salon.city)}`
const today = new Date().getDay() // 0 Sun … 6 Sat
const isToday = (days) =>
  (days === 'Sunday' && today === 0) || (days === 'Saturday' && today === 6) || (days.startsWith('Mon') && today >= 1 && today <= 5)
</script>

<template>
  <section id="visit" class="visit" aria-labelledby="visit-title">
    <div class="wrap grid">
      <h2 id="visit-title" class="h2">Come say hi.</h2>

      <address class="addr">
        <span class="street">{{ salon.street }}</span>
        <span>{{ salon.city }}</span>
        <a class="btn" :href="mapUrl" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
          Get directions
        </a>
      </address>

      <div class="hours">
        <h3>Hours</h3>
        <dl>
          <div v-for="h in salon.hours" :key="h.days" :class="{ now: isToday(h.days) }">
            <dt>{{ h.days }}<span v-if="isToday(h.days)" class="today">today</span></dt>
            <dd class="num">{{ h.time }}</dd>
          </div>
        </dl>
      </div>

      <div class="contact">
        <h3>Call or text</h3>
        <a class="big num" :href="salon.phoneHref">{{ salon.phone }}</a>
        <p>Instagram <a href="#" class="ig">{{ salon.instagram }}</a></p>
      </div>
      <p class="fine"><span class="sample">Sample address, phone &amp; hours</span></p>
    </div>
  </section>
</template>

<style scoped>
.visit { padding-block: clamp(64px, 10vw, 128px) clamp(80px, 12vw, 160px); border-top: 2px dashed var(--ink); }
.grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-areas:
    'title title .'
    'addr hours contact'
    'fine fine fine';
  gap: clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px);
}
.h2 { grid-area: title; margin: 0; }
.addr { grid-area: addr; font-style: normal; display: grid; gap: 4px; justify-items: start; font-size: 1.15rem; }
.street { font-family: var(--display); font-weight: 800; font-size: clamp(1.8rem, 3vw, 2.6rem); letter-spacing: -0.03em; line-height: 1; }
.addr .btn { margin-top: 18px; }
h3 { font-family: var(--display); font-size: 1.25rem; font-weight: 800; letter-spacing: -0.01em; margin: 0 0 12px; }
.hours { grid-area: hours; }
dl { margin: 0; display: grid; }
dl > div { display: flex; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 2px dotted color-mix(in srgb, var(--ink) 35%, transparent); }
dt { font-weight: 600; display: flex; gap: 8px; align-items: center; }
dd { margin: 0; }
.now { font-weight: 600; }
.today { background: var(--pink); color: var(--on-primary); border-radius: 99px; padding: 0 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.contact { grid-area: contact; }
.big { font-family: var(--display); font-weight: 800; font-size: clamp(1.7rem, 2.6vw, 2.3rem); letter-spacing: -0.03em; text-decoration: none; background: linear-gradient(var(--pink-soft), var(--pink-soft)) 0 85% / 100% 38% no-repeat; }
.contact p { margin: 12px 0 0; }
.fine { grid-area: fine; font-size: 0.85rem; margin: 0; }
.fine code { font-size: 0.85em; background: var(--paper-2); padding: 1px 6px; border-radius: 6px; }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; grid-template-areas: 'title title' 'addr addr' 'hours contact' 'fine fine'; }
}
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; grid-template-areas: 'title' 'addr' 'hours' 'contact' 'fine'; }
}
</style>
