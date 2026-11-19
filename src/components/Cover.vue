<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { salon } from '../data.js'
import { PHOTOS, photo, sceneUrl } from '../media.js'
import { season, cover, decor, offer, daysTo, festive, designs } from '../season.js'
import { MOODS } from '../trends.js'
import { booking, pickSlot, goToBooking } from '../store.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'
import Particles from './Particles.vue'
import SeasonFrame from './SeasonFrame.vue'
import SeasonScene from '../scenes/SeasonScene.vue'
import NailTip from './NailTip.vue'

const i = ref(0)
const playing = ref(true)
const DURATION = 4500
let timer
const slides = computed(() => cover.value.map((k) => ({ key: k, alt: PHOTOS[k].alt })))
const slots = computed(() => booking.slots.slice(0, 4))
const fan = computed(() => season.value.fan.map((id) => designs.value.find((d) => d.id === id)).filter(Boolean))
const count = computed(() => {
  const c = daysTo.value
  if (!c || c.days > 60) return null
  if (c.days === 0) return `Today is ${c.name}!`
  return `${c.days} day${c.days === 1 ? '' : 's'} to ${c.name}`
})

function go(n) { i.value = (n + slides.value.length) % slides.value.length; restart() }
function restart() {
  clearInterval(timer)
  if (playing.value) timer = setInterval(() => (i.value = (i.value + 1) % slides.value.length), DURATION)
}
function toggle() { playing.value = !playing.value; restart() }
function grab(s) { pickSlot(s.id); goToBooking() }

watch(() => season.value.id, () => { i.value = 0; restart() })
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) playing.value = false
  restart()
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="top" class="cover" aria-labelledby="cover-title">
    <img
      :key="season.id"
      class="scene"
      :src="sceneUrl(season.id, 1920)"
      :srcset="`${sceneUrl(season.id, 800)} 800w, ${sceneUrl(season.id, 1280)} 1280w, ${sceneUrl(season.id, 1920)} 1920w, ${sceneUrl(season.id, 2600)} 2600w`"
      sizes="100vw"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
    />
    <div class="veil" aria-hidden="true" />
    <Particles :key="season.id" :config="decor.particles" />
    <SeasonFrame />
    <SeasonScene />

    <div class="inner wrap">
      <div class="copy">
        <p class="issue"><Icon name="sparkle" /> {{ salon.name }} · The {{ season.name }} Issue · {{ MOODS[season.id] }}</p>
        <h1 id="cover-title" :key="season.id" class="greeting script">{{ festive.greeting }}</h1>
        <p class="ribbon"><span>{{ season.hero.join(' ') }}</span></p>
        <p class="pitch">{{ season.lede }}</p>

        <div class="badges">
          <span v-if="count" class="count"><Icon name="calendar" /> {{ count }}</span>
          <a class="offer" href="#offer"><Icon name="gift" /> {{ offer }}</a>
        </div>

        <div class="ctas">
          <a class="btn btn--lg" href="#book"><Icon name="calendar" />Book your {{ season.name }} set</a>
          <a class="btn btn--lg btn--glass" href="#collection">Explore the collection <Icon name="arrowRight" /></a>
        </div>

        <div class="slots">
          <span class="slots__label">Next open <span class="sample">sample</span></span>
          <div class="slots__row">
            <button v-for="s in slots" :key="s.id" type="button" class="slot" @click="grab(s)" :aria-label="`Book ${s.day} at ${s.time}`">
              {{ s.day }} <b class="num">{{ s.time }}</b>
            </button>
          </div>
        </div>
      </div>

      <div class="stack">
        <figure class="photo polaroid">
          <span class="tape" />
          <div class="photo__frame">
            <img v-for="(s, n) in slides" :key="season.id + s.key" :class="{ on: n === i }" :src="photo(s.key, 800, 800)" :alt="n === i ? s.alt : ''" loading="eager" />
          </div>
          <figcaption>
            <span class="hand">fresh from the chair</span>
            <span class="ctrl">
              <button v-for="(s, n) in slides" :key="s.key" type="button" class="dot" :class="{ on: n === i }" @click="go(n)" :aria-label="`Photo ${n + 1} of ${slides.length}`" />
              <button type="button" class="pp" @click="toggle" :aria-label="playing ? 'Pause photos' : 'Play photos'"><Icon :name="playing ? 'pause' : 'play'" /></button>
            </span>
          </figcaption>
        </figure>

        <div class="st st--a" aria-hidden="true"><Sticker :icon="decor.big" /></div>
        <div class="st st--b" aria-hidden="true"><Sticker :icon="['polish', ...decor.polish]" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cover {
  position: relative;
  margin-top: calc(-1 * var(--head-h));
  height: 100vh;
  height: 100svh;
  min-height: 700px;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  align-items: flex-start;
  color: #fff;
  background: #1c1420;
}
.scene { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: drift-in 20s ease-out both; }
@keyframes drift-in { from { transform: scale(1.12); } to { transform: scale(1.02); } }
.veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgb(18 8 16 / 0.78) 0%, rgb(18 8 16 / 0.52) 46%, rgb(18 8 16 / 0.18) 100%),
    linear-gradient(to top, rgb(18 8 16 / 0.55) 0%, transparent 35%),
    linear-gradient(to bottom, rgb(18 8 16 / 0.45) 0%, transparent 28%);
}

.inner {
  position: relative; z-index: 5;
  display: grid; grid-template-columns: 1.08fr 0.92fr; gap: clamp(24px, 4vw, 64px); align-items: center;
  padding-top: calc(var(--head-h) + clamp(64px, 9vh, 104px));
  padding-bottom: 0;
}
.copy { display: grid; gap: 16px; justify-items: start; }
.issue { margin: 0; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(255 255 255 / 0.85); }
.issue .icon { color: var(--glow-1); }
.greeting {
  margin: -4px 0 -10px;
  color: color-mix(in srgb, var(--glow-1) 45%, #fff);
  font-size: clamp(3.6rem, min(7vw, 11vh), 7.2rem);
  text-shadow: 0 4px 30px rgb(0 0 0 / 0.35);
  animation: write 1.2s var(--ease) backwards;
}
@keyframes write { from { clip-path: inset(-20% 100% -20% 0); opacity: 0.4; } to { clip-path: inset(-20% -10% -20% 0); opacity: 1; } }
/* ribbon banner with notched tails */
.ribbon { margin: 0; position: relative; filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.3)); }
.ribbon span {
  display: inline-block; padding: 12px 36px; background: var(--accent); color: var(--on-accent);
  font-family: var(--display); font-size: clamp(1.15rem, 1.9vw, 1.6rem); line-height: 1.2;
  clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%, 16px 50%);
}
.pitch { margin: 0; color: rgb(255 255 255 / 0.9); font-size: clamp(1rem, 1.2vw, 1.12rem); max-width: 50ch; }
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.count, .offer { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 14px; border-radius: 999px; font-weight: 700; font-size: 0.9rem; text-decoration: none; }
.count { background: #fff; color: var(--accent); }
.offer { background: rgb(255 255 255 / 0.16); color: #fff; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.3); font-weight: 600; }
.ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
.btn--lg { min-height: 56px; padding: 0 1.6em; font-size: 1.04rem; }
.btn--glass { --b-bg: rgb(255 255 255 / 0.16); --b-fg: #fff; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4); }
.slots { display: grid; gap: 6px; width: 100%; }
.slots__label { font-size: 0.85rem; font-weight: 700; color: rgb(255 255 255 / 0.85); display: flex; gap: 8px; align-items: center; }
.slots__label .sample { color: #fff; }
.slots__row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
.slots__row::-webkit-scrollbar { display: none; }
.slot { flex: none; min-height: 44px; border: 0; border-radius: 999px; padding: 0 16px; font-size: 0.9rem; color: #fff; background: rgb(255 255 255 / 0.14); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.28); }
.slot:hover { background: rgb(255 255 255 / 0.28); }

.stack { position: relative; height: clamp(300px, 42vh, 440px); color: var(--ink); align-self: start; }
.photo { position: absolute; right: 6%; top: 0; width: min(56%, 40vh); z-index: 1; transform: rotate(5deg); animation: deal 0.9s var(--ease) both; }
@keyframes deal { from { transform: rotate(14deg) translate(40px, 30px); opacity: 0; } }
.photo__frame { position: relative; aspect-ratio: 1; border-radius: 3px; overflow: hidden; }
.photo__frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; aspect-ratio: auto; opacity: 0; transition: opacity 1s var(--ease); }
.photo__frame img.on { opacity: 1; }
.photo figcaption { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-top: 8px; }
.photo .hand { font-size: 1.15rem; }
.ctrl { display: flex; align-items: center; gap: 2px; }
.dot { width: 22px; height: 32px; border: 0; padding: 0; background: transparent; position: relative; }
.dot::after { content: ''; position: absolute; left: 7px; top: 12px; width: 8px; height: 8px; border-radius: 50%; background: #d9cfd6; transition: background-color 0.2s, transform 0.2s; }
.dot.on::after { background: var(--accent); transform: scale(1.25); }
.pp { width: 32px; height: 32px; border: 0; border-radius: 50%; background: #f3eef1; color: #3a2f3d; display: grid; place-items: center; font-size: 0.85rem; }

.setcard {
  position: absolute; left: 0; bottom: 4%; width: 58%; z-index: 2;
  display: grid; justify-items: center; gap: 6px; padding: 18px 16px 16px; text-decoration: none;
  border-radius: 26px; background: linear-gradient(160deg, #fff 0%, color-mix(in srgb, var(--accent) 16%, #fff) 100%); color: #2a1f2d;
  box-shadow: 0 30px 60px -24px rgb(0 0 0 / 0.55); transform: rotate(-4deg); animation: deal2 0.9s 0.15s var(--ease) both;
}
@keyframes deal2 { from { transform: rotate(-14deg) translate(-40px, 30px); opacity: 0; } }
.setcard__title { font-size: clamp(2.2rem, 3.4vw, 3rem); color: var(--accent); }
.setcard__fan { display: flex; justify-content: center; height: 120px; align-items: flex-end; }
.setcard__fan .tip { --w: 40px; margin: 0 -2px; transform: rotate(calc(var(--n) * 9deg)) translateY(calc(var(--n) * var(--n) * 3px)); }
.setcard__meta { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; font-size: 0.85rem; color: #6b5a70; }

.st { position: absolute; z-index: 3; animation: bob 6s ease-in-out infinite alternate; }
@keyframes bob { to { transform: translateY(-8px) rotate(4deg); } }
.st--a { width: 110px; left: -2%; top: 46%; }
.st--b { width: 84px; left: 6%; top: 4%; animation-delay: -2s; }
.st--c { width: 80px; left: 4%; top: 6%; animation-delay: -4s; }

@media (max-width: 1080px) {
  .greeting { font-size: clamp(3.2rem, 8vw, 6rem); }
}
@media (max-width: 860px) {
  .cover { height: auto; min-height: 100svh; }
  .inner { grid-template-columns: 1fr; padding-top: calc(var(--head-h) + 92px); padding-bottom: 220px; }
  .stack { order: 2; height: 400px; max-width: 480px; width: 100%; margin-inline: auto; }
}
@media (max-height: 820px) and (min-width: 861px) { .pitch { display: none; } }
@media (max-width: 680px) {
  .cover { height: auto; min-height: 100svh; }
  .inner { padding-bottom: 150px !important; }
  .veil { background: linear-gradient(to bottom, rgb(18 8 16 / 0.55) 0%, rgb(18 8 16 / 0.62) 50%, rgb(18 8 16 / 0.75) 100%); }
  .inner { padding-top: calc(var(--head-h) + 76px); padding-bottom: 120px; gap: 28px; }
  .copy { gap: 12px; }
  .issue { font-size: 0.7rem; }
  .greeting { font-size: clamp(3rem, 15vw, 4.2rem); }
  .ribbon span { padding: 10px 26px; font-size: 1.05rem; }
  .pitch { font-size: 0.98rem; }
  .ctas { display: grid; width: 100%; }
  .ctas .btn { width: 100%; }
  .slots__row { margin-inline: -16px; padding-inline: 16px; }
  .stack { height: 340px; }
  .photo { width: 58%; }
  .setcard { width: 62%; padding: 14px 12px 12px; }
  .setcard__fan { height: 90px; }
  .setcard__fan .tip { --w: 30px; }
  .st--a { width: 76px; }
  .st--b { width: 62px; }
  .st--c { display: none; }
}
</style>
