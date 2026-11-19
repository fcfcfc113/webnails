<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { booking, pickSlot, goToBooking } from '../store.js'
import { season } from '../season.js'
import NailTip from './NailTip.vue'

const tabs = computed(() => booking.slots.slice(0, 7))
const title = ref(null)

// Each season's headline has different line lengths: shrink the type until
// the longest line fits its column (60% of the flyer on desktop, full width on phones).
async function fitTitle() {
  const h = title.value
  if (!h) return
  h.style.setProperty('--fit', '1')
  await nextTick()
  const max = h.parentElement.clientWidth * (innerWidth > 900 ? 0.6 : 1)
  const widest = Math.max(...[...h.children].map((s) => s.offsetWidth + (parseFloat(getComputedStyle(s).marginLeft) || 0)))
  h.style.setProperty('--fit', widest > max ? (max / widest).toFixed(3) : '1')
}
watch(() => season.value.id, () => nextTick(fitTitle))
onMounted(() => {
  document.fonts?.ready.then(fitTitle)
  fitTitle()
  addEventListener('resize', fitTitle)
})
onBeforeUnmount(() => removeEventListener('resize', fitTitle))

const fan = computed(() => season.value.fan.map((id) => season.value.designs.find((d) => d.id === id)).filter(Boolean))

function tear(slot) {
  pickSlot(slot.id)
  setTimeout(goToBooking, 380)
}
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="wrap hero__grid">
      <div class="disc halftone" aria-hidden="true"></div>
      <div class="disc disc--solid" aria-hidden="true"></div>

      <h1 id="hero-title" ref="title" class="display title">
        <span v-for="line in season.hero" :key="line" class="misreg" :data-ink="line">{{ line }}</span>
      </h1>

      <div :key="season.id" class="fan" aria-hidden="true">
        <NailTip v-for="(d, i) in fan" :key="d.id" :design="d" :style="{ '--i': i - 2 }" />
      </div>

      <div class="intro">
        <p class="lede">{{ season.lede }}</p>
        <a class="menu-link" href="#menu">See prices</a>
      </div>

      <p class="badge" aria-hidden="true"><span>{{ season.stamp[0] }}</span><b>{{ season.stamp[1] }}</b></p>
    </div>

    <div class="strip">
      <svg class="scissors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.1 8.1 20 20M8.1 15.9 20 4" /></svg>
      <div class="wrap strip__inner">
        <p class="strip__label">
          <strong>Next open chairs</strong>
          <span>Tap a tab to grab it <span class="sample">sample times</span></span>
        </p>
        <ul class="tabs" aria-label="Open appointment times">
          <li v-for="s in tabs" :key="s.id">
            <button
              type="button"
              class="tab"
              :class="{ torn: booking.torn.has(s.id) }"
              :aria-pressed="booking.slotId === s.id"
              :aria-label="`Book ${s.day} ${s.date} at ${s.time}`"
              @click="tear(s)"
            >
              <span class="tab__day">{{ s.day }}</span>
              <span class="tab__time num">{{ s.time }}</span>
            </button>
          </li>
          <li>
            <button type="button" class="tab tab--more" @click="goToBooking">
              <span class="tab__day">More</span>
              <span class="tab__time">times <svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; overflow-x: clip; }

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  column-gap: 20px;
  padding-top: clamp(24px, 5vh, 64px);
  padding-bottom: clamp(36px, 6vh, 72px);
  min-height: min(68vh, 660px);
}

/* ── the pink plates ── */
.disc {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: var(--blend);
}
.disc.halftone {
  --dot: var(--pink);
  --dot-size: 12px;
  width: clamp(380px, 46vw, 680px);
  aspect-ratio: 1;
  right: -4%;
  top: -3%;
}
.disc--solid {
  background: var(--pink);
  width: clamp(260px, 30vw, 440px);
  aspect-ratio: 1;
  right: 10%;
  top: 6%;
  opacity: 0.92;
}

.title {
  grid-column: 1 / span 9;
  grid-row: 1;
  font-size: calc(clamp(3.4rem, 9.6vw, 8.6rem) * var(--fit, 1));
  color: var(--ink);
  position: relative;
  z-index: 2;
}
.title > span { display: block; width: max-content; white-space: nowrap; }
.title > span:nth-child(2) { margin-left: 0.55em; }

/* ── tip fan ── */
.fan {
  position: absolute;
  right: clamp(24px, 13vw, 210px);
  top: clamp(90px, 18vh, 170px);
  width: 1px;
  height: 1px;
  z-index: 3;
}
.fan .tip {
  --w: clamp(52px, 5.4vw, 78px);
  position: absolute;
  left: 0;
  bottom: 0;
  transform-origin: 50% 210%;
  transform: translateX(-50%) rotate(calc(var(--i) * 15deg));
  animation: fan-in 1.1s var(--ease-out) both;
  animation-delay: calc(0.15s + (var(--i) + 2) * 0.07s);
}
@keyframes fan-in {
  from { transform: translateX(-50%) rotate(0deg) translateY(30px); }
}

.intro {
  grid-column: 1 / span 5;
  grid-row: 2;
  margin-top: clamp(20px, 3vw, 40px);
  padding-left: 0.4rem;
  display: grid;
  gap: 18px;
  justify-items: start;
  position: relative;
  z-index: 2;
}
.menu-link { font-weight: 600; }

.badge {
  position: absolute;
  right: clamp(16px, 6vw, 110px);
  bottom: clamp(18px, 4vh, 48px);
  margin: 0;
  width: 128px;
  height: 128px;
  display: grid;
  place-content: center;
  text-align: center;
  border-radius: 50%;
  /* rubber stamp: ink ring + lettering on a sun-yellow pad */
  background: var(--sun);
  color: var(--ink-deep);
  border: 4px solid var(--ink-deep);
  outline: 2px solid var(--ink-deep);
  outline-offset: -11px;
  font-family: var(--display);
  font-weight: 800;
  line-height: 0.95;
  transform: rotate(10deg);
  z-index: 3;
}
.badge span { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
.badge b { font-size: 1.6rem; letter-spacing: -0.03em; }
.arr { width: 1em; height: 1em; display: inline-block; vertical-align: -0.1em; }

/* ── tear-off strip ── */
.strip {
  border-top: 2px dashed var(--ink);
  background: var(--card);
  position: relative;
}
.scissors {
  position: absolute;
  top: -14px;
  left: var(--gutter);
  width: 38px;
  height: 26px;
  padding-inline: 6px;
  background: var(--paper);
  color: var(--ink);
}
.strip__inner {
  display: flex;
  align-items: stretch;
  gap: clamp(16px, 3vw, 40px);
}
.strip__label {
  margin: 0;
  padding-block: 22px;
  display: grid;
  align-content: center;
  gap: 2px;
  min-width: 170px;
}
.strip__label strong {
  font-family: var(--display);
  font-size: 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.strip__label span { font-size: 0.95rem; }

.tabs {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
}
.tabs::-webkit-scrollbar { display: none; }
.tabs li { flex: 1 0 auto; border-left: 2px dashed color-mix(in srgb, var(--ink) 60%, transparent); }
.tabs li:last-child { border-right: 2px dashed color-mix(in srgb, var(--ink) 60%, transparent); }

.tab {
  width: 100%;
  min-width: 70px;
  height: 168px;
  border: 0;
  background: transparent;
  writing-mode: vertical-rl;
  flex-direction: column;
  transform: rotate(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 10px;
  position: relative;
  transition: background-color 0.25s, transform 0.5s var(--ease-out), opacity 0.5s;
}
.tab__day, .tab__time { white-space: nowrap; }
.tab__day {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.tab__time {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
}
.tab:hover { background: var(--pink-soft); }
.tab:focus-visible { outline-offset: -5px; }
.tab--more { background: var(--ink); color: var(--on-ink); }
.tab--more:hover { background: var(--violet); }
.tab--more .arr { transform: rotate(90deg); }

/* tear: the tab swings off its perforation and leaves a stub */
.tab.torn {
  animation: tear 0.7s var(--ease-out) forwards;
}
@keyframes tear {
  0% { transform: rotate(180deg); }
  30% { transform: rotate(186deg) translateY(-6px); }
  100% { transform: rotate(205deg) translateY(-90px) translateX(-20px); opacity: 0; }
}
.tabs li:has(.torn) {
  background:
    linear-gradient(135deg, var(--card) 6px, transparent 0) 0 0 / 12px 12px repeat-x,
    linear-gradient(225deg, var(--card) 6px, transparent 0) 0 0 / 12px 12px repeat-x,
    var(--paper-2);
}

@media (max-width: 900px) {
  .title { grid-column: 1 / -1; }
  .intro { grid-column: 1 / span 9; }
  .fan { right: 18%; top: auto; bottom: 34%; }
  .badge { width: 104px; height: 104px; font-size: 1rem; }
}
@media (max-width: 640px) {
  .hero__grid { min-height: 0; padding-bottom: 210px; }
  .title { font-size: calc(clamp(2.6rem, 12.6vw, 4.6rem) * var(--fit, 1)); }
  .title > span:nth-child(2) { margin-left: 0; }
  .intro { grid-column: 1 / -1; }
  .disc.halftone { width: 330px; right: -140px; top: auto; bottom: -110px; }
  .disc--solid { width: 200px; right: -50px; top: auto; bottom: 10px; }
  .fan { right: 96px; bottom: 34px; top: auto; }
  .fan .tip { --w: 44px; }
  .badge { right: auto; left: var(--gutter); bottom: 24px; width: 100px; height: 100px; }
  .badge b { font-size: 1.2rem; }
  .badge span { font-size: 0.7rem; }
  .strip__inner { flex-direction: column; gap: 0; width: 100%; }
  .strip__label { padding: 22px var(--gutter) 12px; }
  .tabs li:first-child { border-left: 0; }
  .tab { height: 128px; min-width: 64px; }
}
</style>
