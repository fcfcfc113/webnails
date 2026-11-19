<script setup>
import { computed, ref, watch } from 'vue'
import { fullMenu, season, decor } from '../season.js'
import { photo } from '../media.js'
import { booking, goToBooking } from '../store.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'

const active = ref(fullMenu.value[0].id)
watch(() => season.value.id, () => (active.value = fullMenu.value[0].id))
const group = computed(() => fullMenu.value.find((g) => g.id === active.value) || fullMenu.value[0])
const pics = { season: 'pastelGlitter', mani: 'sheerPink', pedi: 'nude', ext: 'chromeStiletto', art: 'navyGold' }

function book(name) { booking.serviceName = name; goToBooking() }
function onKey(e, idx) {
  const n = fullMenu.value.length
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + n) % n
    active.value = fullMenu.value[next].id
    e.currentTarget.parentElement.children[next]?.focus()
  }
}
</script>

<template>
  <section id="menu" class="section menu" aria-labelledby="menu-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="menu-title" class="h2">The menu, <em>prices up front.</em></h2>
        <p class="lede">No “starting at” surprises. Tap any service to book it. <span class="sample">sample prices</span></p>
      </div>

      <div class="tabs" role="tablist" aria-label="Service categories">
        <button
          v-for="(g, idx) in fullMenu"
          :key="g.id"
          role="tab"
          type="button"
          class="tab"
          :class="{ seasonal: g.id === 'season' }"
          :aria-selected="active === g.id"
          :tabindex="active === g.id ? 0 : -1"
          :aria-controls="'panel-' + g.id"
          @click="active = g.id"
          @keydown="onKey($event, idx)"
        >
          <Icon v-if="g.id === 'season'" name="sparkle" />{{ g.id === 'season' ? season.name + ' specials' : g.title }}
        </button>
      </div>

      <div class="board">
        <div :id="'panel-' + group.id" class="panel" role="tabpanel" :aria-label="group.title">
          <p class="note">{{ group.note }}</p>
          <ul>
            <li v-for="it in group.items" :key="it.name">
              <div class="svc">
                <span class="svc__name">{{ it.name }} <span v-if="it.tag" class="chip">{{ it.tag }}</span></span>
                <span class="svc__meta"><Icon name="clock" /> {{ it.time }}</span>
              </div>
              <span class="price num"><small v-if="it.from">from</small>${{ it.price }}</span>
              <button v-if="!it.from" type="button" class="btn btn--sm btn--ghost" @click="book(it.name)" :aria-label="`Book ${it.name}`">Book</button>
            </li>
          </ul>
        </div>
        <figure class="pic">
          <img :key="group.id" :src="photo(pics[group.id] || 'sheerPink', 700, 900)" alt="" loading="lazy" />
          <div v-if="group.id === 'season'" class="st"><Sticker :icon="decor.menu[0]" /></div>
          <div class="st st--2"><Sticker :icon="decor.menu[1]" /></div>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu { background: var(--bg-2); }
.tabs { display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab {
  flex: none; display: inline-flex; align-items: center; gap: 6px;
  border: 0; border-radius: 999px; padding: 10px 18px; font-weight: 600;
  background: var(--surface); color: var(--ink); box-shadow: inset 0 0 0 1px var(--line);
  transition: background-color 0.25s, color 0.25s, box-shadow 0.25s;
}
.tab:hover { box-shadow: inset 0 0 0 1px var(--accent); }
.tab[aria-selected='true'] { background: var(--ink); color: var(--bg); box-shadow: none; }
.tab.seasonal:not([aria-selected='true']) { background: var(--accent-soft); color: var(--accent); }

.board { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; margin-top: 12px; }
.panel { background: var(--surface); border-radius: var(--r-lg); padding: clamp(20px, 3vw, 36px); box-shadow: var(--shadow-sm); }
.note { margin: 0 0 8px; color: var(--muted); font-size: 0.95rem; }
ul { list-style: none; margin: 0; padding: 0; }
li { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px; padding: 18px 0; border-top: 1px solid var(--line); }
li:first-child { border-top: 0; }
.svc { display: grid; gap: 4px; }
.svc__name { font-weight: 600; font-size: 1.08rem; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.svc__name .chip { font-size: 0.72rem; padding: 3px 9px; color: var(--accent); }
.svc__meta { color: var(--muted); font-size: 0.88rem; display: flex; align-items: center; gap: 6px; }
.price { font-family: var(--display); font-size: clamp(1.7rem, 2.6vw, 2.2rem); line-height: 1; }
.price small { font-family: var(--body); font-size: 0.75rem; color: var(--muted); margin-right: 4px; }
.pic { margin: 0; position: relative; border-radius: var(--r-lg); overflow: visible; }
.pic img { width: 100%; height: 100%; min-height: 360px; object-fit: cover; border-radius: var(--r-lg); box-shadow: var(--shadow); animation: fade 0.6s var(--ease); }
@keyframes fade { from { opacity: 0; transform: scale(1.02); } }
.pic .st { position: absolute; width: 110px; left: -36px; top: -30px; transform: rotate(-10deg); }
.pic .st--2 { left: auto; top: auto; right: -20px; bottom: -26px; width: 96px; transform: rotate(8deg); }

@media (max-width: 860px) {
  .board { grid-template-columns: 1fr; }
  .pic { display: none; }
}
@media (max-width: 520px) {
  li { grid-template-columns: 1fr auto; }
  li .btn { grid-column: 1 / -1; justify-self: start; }
}
</style>
