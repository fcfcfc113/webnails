<script setup>
import { computed, ref } from 'vue'
import { TRENDS, TREND_TABS } from '../trends.js'
import { booking } from '../store.js'
import NailTip from './NailTip.vue'
import Icon from './Icon.vue'

const tab = ref('trending')
const list = computed(() => TRENDS.filter((t) => t.tags.includes(tab.value)))
function ask(t) {

  const el = document.getElementById('f-note')
  if (el) { el.value = `Interested in: ${t.name}`; el.dispatchEvent(new Event('input')) }
  document.getElementById('book')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
</script>

<template>
  <section id="trends" class="section trends" aria-labelledby="trends-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="trends-title" class="h2">The trend edit. <em>Loved all year.</em></h2>
        <div class="tabs" role="tablist" aria-label="Trend collections">
          <button v-for="t in TREND_TABS" :key="t.id" type="button" role="tab" class="tab" :aria-selected="tab === t.id" @click="tab = t.id">{{ t.name }}</button>
        </div>
      </div>

      <TransitionGroup name="card" tag="ul" class="grid">
        <li v-for="t in list" :key="t.id">
          <article class="card" :style="{ '--a': t.tone[0], '--b': t.tone[1] }">
            <div class="stage">
              <NailTip :design="t.design" class="t1" />
              <NailTip :design="t.design" class="t2" />
              <NailTip :design="t.design" class="t3" />
            </div>
            <div class="body">
              <h3>{{ t.name }}</h3>
              <p>{{ t.text }}</p>
              <button type="button" class="ask" @click="ask(t)">Ask for this look <Icon name="arrowRight" /></button>
            </div>
          </article>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.trends { background: var(--bg-2); }
.tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.tab { border: 0; border-radius: 999px; min-height: 44px; padding: 0 16px; font-weight: 600; background: var(--surface); box-shadow: inset 0 0 0 1px var(--line); }
.tab[aria-selected='true'] { background: var(--ink); color: var(--bg); box-shadow: none; }
.grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.card { height: 100%; display: grid; grid-template-rows: auto 1fr; border-radius: var(--r); overflow: hidden; background: var(--surface); box-shadow: var(--shadow-sm); transition: transform 0.45s var(--ease), box-shadow 0.45s var(--ease); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.stage { height: 190px; background: linear-gradient(135deg, var(--a), var(--b)); display: flex; align-items: center; justify-content: center; position: relative; }
.stage .tip { --w: 54px; margin: 0 -3px; transition: transform 0.6s var(--ease); }
.t1 { transform: rotate(-14deg) translateY(10px); }
.t3 { transform: rotate(14deg) translateY(10px); }
.card:hover .t1 { transform: rotate(-20deg) translateY(4px); }
.card:hover .t3 { transform: rotate(20deg) translateY(4px); }
.body { padding: 16px 18px 18px; display: grid; gap: 6px; align-content: start; }
h3 { margin: 0; font-family: var(--display); font-weight: 400; font-size: 1.35rem; }
.body p { margin: 0; color: var(--muted); font-size: 0.93rem; }
.ask { justify-self: start; margin-top: 6px; border: 0; background: none; padding: 6px 0; min-height: 40px; color: var(--accent); font-weight: 700; display: inline-flex; gap: 6px; align-items: center; }
.card-enter-active, .card-leave-active { transition: opacity 0.35s var(--ease), transform 0.35s var(--ease); }
.card-enter-from, .card-leave-to { opacity: 0; transform: translateY(10px); }
.card-leave-active { position: absolute; visibility: hidden; }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px) {
  .grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; margin-inline: -16px; padding: 4px 16px 12px; scrollbar-width: none; }
  .grid::-webkit-scrollbar { display: none; }
  .grid li { flex: none; width: 70vw; scroll-snap-align: center; }
  .tabs { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; width: 100%; }
}
</style>
