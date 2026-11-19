<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { REELS, SOCIALS, embedUrl, photo } from '../media.js'
import Icon from './Icon.vue'

const filter = ref('all')
const list = computed(() => (filter.value === 'all' ? REELS : REELS.filter((r) => r.platform === filter.value)))
const social = (id) => SOCIALS.find((s) => s.id === id)
const tabs = [{ id: 'all', name: 'All' }, ...SOCIALS.map((s) => ({ id: s.id, name: s.name }))]

const track = ref(null)
const dialog = ref(null)
const openReel = ref(null)
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let io

// Play only what is on screen (muted previews), pause the rest.
function observe() {
  io?.disconnect()
  if (reduce) return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target
      if (e.intersectionRatio > 0.6) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}) } else v.pause()
    }
  }, { threshold: [0, 0.6, 1] })
  track.value?.querySelectorAll('video').forEach((v) => io.observe(v))
}
watch(filter, () => nextTick(observe))
onMounted(observe)
onBeforeUnmount(() => io?.disconnect())

function scrollBy(dir) {
  const t = track.value
  const card = t?.querySelector('li')
  t?.scrollBy({ left: dir * ((card?.offsetWidth || 260) + 16), behavior: 'smooth' })
}
function play(r) { openReel.value = r; dialog.value?.showModal() }
function close() { dialog.value?.close(); openReel.value = null }
async function share(r) {
  const url = r.embed || social(r.platform).url
  try { if (navigator.share) await navigator.share({ title: r.caption, url }); else await navigator.clipboard.writeText(url) } catch {}
}
const embed = computed(() => (openReel.value ? embedUrl(openReel.value.platform, openReel.value.embed) : ''))
</script>

<template>
  <section id="reels" class="section reels" aria-labelledby="reels-title">
    <div class="wrap section-head">
      <h2 id="reels-title" class="h2">Watch us <em>work.</em></h2>
      <div class="side">
        <p class="lede">Short videos from the studio on TikTok, Instagram, Facebook and YouTube.</p>
        <div class="tabs" role="tablist" aria-label="Filter by platform">
          <button v-for="t in tabs" :key="t.id" type="button" role="tab" class="tab" :aria-selected="filter === t.id" @click="filter = t.id">
            <Icon v-if="t.id !== 'all'" :name="t.id" />{{ t.name }}
          </button>
        </div>
      </div>
    </div>

    <ul ref="track" class="feed" aria-label="Reels">
      <li v-for="(r, n) in list" :key="r.src + n">
        <article class="reel">
          <video
            :data-src="r.src"
            :poster="photo(r.poster, 540, 960)"
            muted
            loop
            playsinline
            preload="none"
            aria-hidden="true"
          />
          <span class="badge" :class="'badge--' + r.platform"><Icon :name="r.platform" /> {{ social(r.platform).name }}</span>
          <div class="rail">
            <button type="button" class="act" @click="play(r)" aria-label="Play with sound"><Icon name="play" /></button>
            <button type="button" class="act" @click="share(r)" aria-label="Share"><Icon name="share" /></button>
            <a class="act" :href="r.embed || social(r.platform).url" target="_blank" rel="noopener" :aria-label="`Open on ${social(r.platform).name}`"><Icon :name="r.platform" /></a>
          </div>
          <div class="meta">
            <b>{{ social(r.platform).handle }}</b>
            <p>{{ r.caption }}</p>
          </div>
          <button type="button" class="hit" @click="play(r)" :aria-label="`Play reel: ${r.caption}`" />
        </article>
      </li>
    </ul>

    <div class="wrap bottom">
      <div class="follow">
        <a v-for="s in SOCIALS" :key="s.id" class="follow__btn" :class="'f--' + s.id" :href="s.url" target="_blank" rel="noopener">
          <Icon :name="s.id" /><span><b>{{ s.name }}</b>{{ s.handle }}</span>
        </a>
      </div>
      <div class="arrows">
        <button type="button" class="arrow" @click="scrollBy(-1)" aria-label="Previous reels"><Icon name="chevLeft" /></button>
        <button type="button" class="arrow" @click="scrollBy(1)" aria-label="More reels"><Icon name="chevRight" /></button>
      </div>
    </div>
    <p class="wrap note"><span class="sample">sample clips</span> Stock footage for now. Our real posts will play right here.</p>

    <dialog ref="dialog" class="player" aria-label="Reel player" @close="openReel = null" @click.self="close">
      <div v-if="openReel" class="player__frame">
        <iframe v-if="embed" :src="embed" title="Reel" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write" allowfullscreen />
        <video v-else :src="openReel.src" :poster="photo(openReel.poster, 540, 960)" controls autoplay playsinline />
      </div>
      <button type="button" class="close glass" @click="close" aria-label="Close"><Icon name="close" /></button>
    </dialog>
  </section>
</template>

<style scoped>
.reels { background: #1a1220; color: #fbf6f8; overflow: hidden; }
.reels .h2 em { color: var(--glow-1); }
.reels .lede { color: rgb(251 246 248 / 0.78); }
.side { display: grid; gap: 16px; justify-items: start; }
.tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.tab { display: inline-flex; align-items: center; gap: 6px; border: 0; border-radius: 999px; padding: 8px 14px; font-weight: 600; font-size: 0.9rem; background: rgb(255 255 255 / 0.08); color: #fff; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14); }
.tab[aria-selected='true'] { background: #fff; color: #1a1220; }

.feed {
  list-style: none; margin: 0;
  padding: 8px max(var(--gutter), calc((100vw - var(--max)) / 2)) 24px;
  display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
}
.feed::-webkit-scrollbar { display: none; }
.feed li { flex: none; width: clamp(220px, 22vw, 280px); scroll-snap-align: start; }
@media (max-width: 680px) { .feed li { width: 72vw; scroll-snap-align: center; } .feed { scroll-padding-inline: 14vw; } .arrows { display: none; } .follow { display: grid; grid-template-columns: 1fr 1fr; width: 100%; } }
.reel { position: relative; aspect-ratio: 9 / 16; border-radius: 24px; overflow: hidden; background: #2a1f2d; box-shadow: 0 20px 40px -20px rgb(0 0 0 / 0.6); }
.reel video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.reel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgb(0 0 0 / 0.7), transparent 45%), linear-gradient(to bottom, rgb(0 0 0 / 0.35), transparent 22%); pointer-events: none; }
.badge { position: absolute; left: 12px; top: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; background: rgb(0 0 0 / 0.45); backdrop-filter: blur(8px); }
.rail { position: absolute; right: 10px; bottom: 84px; z-index: 3; display: grid; gap: 10px; }
.act { width: 42px; height: 42px; border: 0; border-radius: 50%; display: grid; place-items: center; color: #fff; background: rgb(255 255 255 / 0.16); backdrop-filter: blur(10px); transition: transform 0.3s var(--ease), background-color 0.2s; }
.act:hover { transform: scale(1.08); background: rgb(255 255 255 / 0.3); }
.meta { position: absolute; left: 14px; right: 64px; bottom: 14px; z-index: 2; }
.meta b { font-size: 0.9rem; }
.meta p { margin: 2px 0 0; font-size: 0.9rem; line-height: 1.35; color: rgb(255 255 255 / 0.9); }
.hit { position: absolute; inset: 0; z-index: 1; border: 0; background: transparent; border-radius: inherit; }
.hit:focus-visible { outline-offset: -4px; }

.bottom { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-top: 8px; }
.follow { display: flex; flex-wrap: wrap; gap: 10px; }
.follow__btn { display: flex; align-items: center; gap: 10px; padding: 10px 16px 10px 12px; border-radius: 16px; text-decoration: none; background: rgb(255 255 255 / 0.07); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12); transition: background-color 0.25s, transform 0.3s var(--ease); }
.follow__btn:hover { background: rgb(255 255 255 / 0.14); transform: translateY(-2px); }
.follow__btn .icon { font-size: 1.3rem; }
.follow__btn span { display: grid; line-height: 1.2; font-size: 0.82rem; color: rgb(255 255 255 / 0.75); }
.follow__btn b { color: #fff; font-size: 0.92rem; }
.f--tiktok .icon { color: #ff4f7b; }
.f--instagram .icon { color: #f7a8d8; }
.f--facebook .icon { color: #8fb4ff; }
.f--youtube .icon { color: #ff6b6b; --yt-play: #1a1220; }
.arrows { display: flex; gap: 8px; }
.arrow { width: 46px; height: 46px; border: 0; border-radius: 50%; display: grid; place-items: center; color: #fff; background: rgb(255 255 255 / 0.1); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16); }
.note { margin-top: 18px; font-size: 0.85rem; color: rgb(255 255 255 / 0.65); display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.note code { background: rgb(255 255 255 / 0.1); padding: 1px 6px; border-radius: 6px; }

.player { border: 0; padding: 0; background: transparent; overflow: visible; }
.player::backdrop { background: rgb(10 5 12 / 0.86); backdrop-filter: blur(6px); }
.player__frame { width: min(92vw, 400px); aspect-ratio: 9 / 16; max-height: 86vh; border-radius: 24px; overflow: hidden; background: #000; }
.player__frame iframe, .player__frame video { width: 100%; height: 100%; border: 0; object-fit: contain; }
.close { position: absolute; right: -16px; top: -16px; width: 44px; height: 44px; border: 0; border-radius: 50%; display: grid; place-items: center; color: var(--ink); }
@media (max-width: 520px) { .close { right: 8px; top: 8px; } }
</style>
