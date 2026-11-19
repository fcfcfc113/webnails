<script setup>
import { computed } from 'vue'
import { SCENE_SETS, sceneById, photo, GALLERY } from '../media.js'
import { season, festive, decor } from '../season.js'
import Sticker from './Sticker.vue'

// Infinite strip: the issue's festive scenes interleaved with nail sets.
const items = computed(() => {
  const scenes = SCENE_SETS[season.value.id] || SCENE_SETS.signature
  const nails = GALLERY.slice(0, 6)
  const out = []
  for (let i = 0; i < 8; i++) {
    out.push({ src: sceneById(scenes[i % scenes.length], 520, 620), cap: i % 2 ? season.value.name : festive.value.greeting, scene: true })
    out.push({ src: photo(nails[i % nails.length], 520, 620), cap: 'fresh set ♡', scene: false })
  }
  return out
})
</script>

<template>
  <section class="strip" aria-label="Seasonal mood">
    <p class="marquee script" aria-hidden="true"><span v-for="n in 6" :key="n">{{ festive.greeting }} ✦ </span></p>
    <div class="rail" :key="season.id">
      <ul class="track">
        <li v-for="(it, n) in [...items, ...items]" :key="n" :style="{ '--r': (n % 3 - 1) * 4 + 'deg' }">
          <figure class="polaroid">
            <img :src="it.src" alt="" loading="lazy" />
            <figcaption>{{ it.cap }}</figcaption>
          </figure>
          <span v-if="n % 4 === 1" class="st"><Sticker :icon="decor.hero[n % decor.hero.length]" /></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.strip { position: relative; padding-block: clamp(40px, 6vw, 72px); overflow: hidden; background: linear-gradient(180deg, var(--bg), var(--accent-soft)); }
.marquee { margin: 0 0 18px; white-space: nowrap; font-size: clamp(2.6rem, 6vw, 5rem); color: var(--accent); opacity: 0.9; animation: slide 40s linear infinite; }
.marquee span { margin-right: 24px; }
.rail { overflow: hidden; }
.track { list-style: none; margin: 0; padding: 30px 0; display: flex; gap: 26px; width: max-content; animation: slide 60s linear infinite; }
.strip:hover .track { animation-play-state: paused; }
@keyframes slide { to { transform: translateX(-50%); } }
li { position: relative; width: clamp(160px, 16vw, 240px); transform: rotate(var(--r)); }
.polaroid figcaption { font-size: 1.3rem; }
.polaroid img { aspect-ratio: 5 / 6; }
.st { position: absolute; width: 70px; right: -26px; top: -30px; z-index: 2; }
@media (prefers-reduced-motion: reduce) { .track, .marquee { animation: none; } .rail { overflow-x: auto; } }
</style>
