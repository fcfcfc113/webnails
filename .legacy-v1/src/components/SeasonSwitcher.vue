<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { SEASONS, seasonForMonth, findSeason } from '../seasons.js'
import { season, theme, setSeason } from '../season.js'

const open = ref(false)
const root = ref(null)
const list = ref(null)
const autoName = findSeason(seasonForMonth()).name

const inks = (s) => [s.tokens.pink, s.tokens.aqua, s.tokens.ink]

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    list.value?.querySelector('[aria-checked="true"]')?.focus()
  }
}
function choose(id) {
  setSeason(id)
  open.value = false
  root.value?.querySelector('.trigger')?.focus()
}
function onKey(e) {
  if (!open.value) return
  if (e.key === 'Escape') { open.value = false; root.value?.querySelector('.trigger')?.focus() }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const items = [...list.value.querySelectorAll('button')]
    const i = items.indexOf(document.activeElement)
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
  }
}
function onDoc(e) { if (open.value && !root.value?.contains(e.target)) open.value = false }
onMounted(() => { document.addEventListener('pointerdown', onDoc); document.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey) })
</script>

<template>
  <div ref="root" class="switch">
    <button
      class="trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-controls="season-list"
      @click="toggle"
    >
      <span class="inks" aria-hidden="true">
        <i v-for="(c, i) in inks(season)" :key="i" :style="{ background: c }" />
      </span>
      <span class="label"><small>Season</small>{{ season.name }}</span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
    </button>

    <div v-show="open" id="season-list" ref="list" class="pop" role="menu" aria-label="Choose a seasonal look">
      <p class="pop__head">Pick a print run</p>
      <button
        type="button"
        role="menuitemradio"
        class="opt opt--auto"
        :aria-checked="theme.choice === 'auto'"
        @click="choose('auto')"
      >
        <span class="opt__name">Auto <span class="opt__months">this month: {{ autoName }}</span></span>
      </button>
      <button
        v-for="s in SEASONS"
        :key="s.id"
        type="button"
        role="menuitemradio"
        class="opt"
        :aria-checked="theme.choice === s.id"
        @click="choose(s.id)"
      >
        <span class="opt__inks" aria-hidden="true" :style="{ background: s.tokens.paper }">
          <i v-for="(c, i) in inks(s)" :key="i" :style="{ background: c }" />
        </span>
        <span class="opt__name">{{ s.name }}<span class="opt__months">{{ s.months }}</span></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.switch { position: relative; }
.trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px dashed color-mix(in srgb, var(--ink) 55%, transparent);
  background: var(--card);
  color: var(--ink);
  border-radius: 999px;
  padding: 6px 12px 6px 8px;
  transition: border-color 0.2s, background-color 0.2s;
}
.trigger:hover { border-style: solid; border-color: var(--ink); }
.inks { display: flex; }
.inks i {
  width: 18px; height: 18px; border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--ink) 35%, transparent);
}
.inks i + i { margin-left: -6px; }
.label { display: grid; line-height: 1.05; text-align: left; font-weight: 600; font-size: 0.92rem; }
.label small { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; opacity: 0.8; }
.chev { width: 16px; height: 16px; transition: transform 0.3s var(--ease-out); }
[aria-expanded='true'] .chev { transform: rotate(180deg); }

.pop {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  z-index: 60;
  width: 300px;
  max-height: min(82vh, 660px);
  overflow-y: auto;
  background: var(--card);
  color: var(--ink);
  border-radius: 20px;
  padding: 10px;
  border: 2px solid var(--ink);
  display: grid;
  gap: 2px;
  transform-origin: top right;
  animation: pop-in 0.35s var(--ease-out);
}
@keyframes pop-in { from { opacity: 0; transform: translateY(-6px) scale(0.98); } }
.pop__head {
  margin: 4px 10px 8px;
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}
.opt {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  padding: 8px 10px;
  border-radius: 12px;
  transition: background-color 0.2s;
}
.opt:hover, .opt:focus-visible { background: var(--paper-2); }
.opt[aria-checked='true'] { background: var(--ink); color: var(--on-ink); }
.opt__inks {
  display: flex;
  padding: 5px;
  border-radius: 99px;
  flex: none;
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, currentColor 30%, transparent);
}
.opt__inks i { width: 16px; height: 16px; border-radius: 50%; }
.opt__inks i + i { margin-left: -5px; }
.opt__name { display: grid; font-weight: 600; line-height: 1.2; }
.opt__months { font-weight: 400; font-size: 0.82rem; opacity: 0.85; }
.opt--auto { border-bottom: 2px dotted color-mix(in srgb, var(--ink) 35%, transparent); border-radius: 12px 12px 0 0; margin-bottom: 4px; }

@media (max-width: 560px) {
  .label small { display: none; }
  .label { font-size: 0.85rem; max-width: 110px; }
  .pop { position: fixed; left: 12px; right: 12px; width: auto; top: 76px; }
}
</style>
