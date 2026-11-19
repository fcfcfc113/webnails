<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { GALLERY, PHOTOS, photo } from '../media.js'
import { SOCIALS } from '../media.js'
import Icon from './Icon.vue'

const track = ref(null)
const dialog = ref(null)
const current = ref(0)
const items = GALLERY.map((k, n) => ({ key: k, alt: PHOTOS[k].alt, tall: n % 3 !== 1 }))
let auto

function scrollBy(dir) {
  const t = track.value
  if (!t) return
  const card = t.querySelector('li')
  const step = card ? card.offsetWidth + 16 : 320
  const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
  if (dir > 0 && atEnd) t.scrollTo({ left: 0, behavior: 'smooth' })
  else t.scrollBy({ left: dir * step, behavior: 'smooth' })
}
function startAuto() { stopAuto(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) auto = setInterval(() => scrollBy(1), 3800) }
function stopAuto() { clearInterval(auto) }

async function open(n) { current.value = n; stopAuto(); dialog.value?.showModal(); await nextTick() }
function close() { dialog.value?.close(); startAuto() }
function step(d) { current.value = (current.value + d + items.length) % items.length }
function onKey(e) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }

onMounted(startAuto)
onBeforeUnmount(stopAuto)
const ig = SOCIALS.find((s) => s.id === 'instagram')
</script>

<template>
  <section id="sets" class="section gallery" aria-labelledby="sets-title">
    <div class="wrap section-head">
      <h2 id="sets-title" class="h2">Fresh sets, <em>straight from the chair.</em></h2>
      <div class="head-right">
        <p class="lede">A few favorites from the last few weeks. Tap any photo to see it big.</p>
        <div class="arrows">
          <button type="button" class="arrow" @click="scrollBy(-1)" aria-label="Previous sets"><Icon name="chevLeft" /></button>
          <button type="button" class="arrow" @click="scrollBy(1)" aria-label="More sets"><Icon name="chevRight" /></button>
        </div>
      </div>
    </div>

    <ul ref="track" class="track" aria-label="Nail sets" @mouseenter="stopAuto" @mouseleave="startAuto" @focusin="stopAuto">
      <li v-for="(it, n) in items" :key="it.key" :class="{ tall: it.tall }">
        <button type="button" class="shot" @click="open(n)" :aria-label="`View: ${it.alt}`">
          <img :src="photo(it.key, 700, it.tall ? 900 : 700)" :alt="it.alt" loading="lazy" />
        </button>
      </li>
    </ul>

    <p class="wrap foot">
      <a class="btn btn--ghost btn--sm" :href="ig.url" target="_blank" rel="noopener"><Icon name="instagram" /> See more on Instagram</a>
      <span class="sample">stock photos</span>
    </p>

    <dialog ref="dialog" class="lightbox" aria-label="Photo viewer" @close="startAuto" @keydown="onKey" @click.self="close">
      <figure>
        <img :src="photo(items[current].key, 1600)" :alt="items[current].alt" />
        <figcaption>{{ items[current].alt }} <span class="num">· {{ current + 1 }} / {{ items.length }}</span></figcaption>
      </figure>
      <button type="button" class="lb lb--close glass" @click="close" aria-label="Close"><Icon name="close" /></button>
      <button type="button" class="lb lb--prev glass" @click="step(-1)" aria-label="Previous photo"><Icon name="chevLeft" /></button>
      <button type="button" class="lb lb--next glass" @click="step(1)" aria-label="Next photo"><Icon name="chevRight" /></button>
    </dialog>
  </section>
</template>

<style scoped>
.head-right { display: grid; gap: 16px; justify-items: start; }
.arrows { display: flex; gap: 8px; }
.arrow { width: 48px; height: 48px; border: 0; border-radius: 50%; display: grid; place-items: center; background: var(--surface); box-shadow: inset 0 0 0 1px var(--line), var(--shadow-sm); transition: transform 0.3s var(--ease); }
.arrow:hover { transform: scale(1.06); }

.track {
  list-style: none; margin: 0;
  padding: 8px max(var(--gutter), calc((100vw - var(--max)) / 2)) 28px;
  display: flex; gap: 16px; align-items: center;
  overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--gutter);
  scrollbar-width: none;
}
.track::-webkit-scrollbar { display: none; }
.track li { flex: none; scroll-snap-align: start; width: clamp(220px, 24vw, 320px); }
@media (max-width: 680px) { .track li, .track li.tall { width: 76vw; } .arrows { display: none; } }
.track li.tall { width: clamp(240px, 26vw, 340px); }
.shot { display: block; width: 100%; border: 0; padding: 0; background: none; border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-sm); }
.shot img { width: 100%; aspect-ratio: 1; object-fit: cover; transition: transform 0.8s var(--ease); }
.tall .shot img { aspect-ratio: 7 / 9; }
.shot:hover img { transform: scale(1.05); }
.foot { display: flex; gap: 12px; align-items: center; margin-top: 4px; color: var(--muted); }

.lightbox { border: 0; padding: 0; background: transparent; max-width: min(92vw, 1100px); max-height: 92vh; overflow: visible; }
.lightbox::backdrop { background: rgb(20 10 20 / 0.82); backdrop-filter: blur(6px); }
.lightbox figure { margin: 0; }
.lightbox img { max-height: 82vh; width: auto; max-width: 100%; border-radius: var(--r); margin-inline: auto; }
.lightbox figcaption { color: #fff; text-align: center; margin-top: 12px; font-size: 0.95rem; }
.lb { position: absolute; width: 48px; height: 48px; border: 0; border-radius: 50%; display: grid; place-items: center; color: var(--ink); }
.lb--close { right: -8px; top: -8px; }
.lb--prev { left: -64px; top: 45%; }
.lb--next { right: -64px; top: 45%; }
@media (max-width: 760px) { .lb--prev { left: 6px; } .lb--next { right: 6px; } .lb--close { right: 6px; top: 6px; } }
</style>
