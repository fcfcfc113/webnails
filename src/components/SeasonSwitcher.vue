<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { SEASONS, seasonForMonth, findSeason } from '../seasons.js'
import { PALETTES } from '../palettes.js'
import { season, theme, setSeason } from '../season.js'
import Icon from './Icon.vue'

const open = ref(false)
const root = ref(null)
const list = ref(null)
const autoName = findSeason(seasonForMonth()).name
const swatch = (id) => { const p = PALETTES[id] || PALETTES.signature; return [p['glow-1'], p.accent, p['accent-2']] }

async function toggle() {
  open.value = !open.value
  if (open.value) { await nextTick(); list.value?.querySelector('[aria-checked="true"]')?.focus() }
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
    <button class="trigger" type="button" :aria-expanded="open" aria-haspopup="true" aria-controls="season-list" @click="toggle">
      <span class="dots" aria-hidden="true"><i v-for="(c, i) in swatch(season.id)" :key="i" :style="{ background: c }" /></span>
      <span class="label"><small>Issue</small>{{ season.name }}</span>
      <Icon name="chevDown" class="chev" />
    </button>

    <Transition name="pop">
      <div v-show="open" id="season-list" ref="list" class="pop" role="menu" aria-label="Choose a seasonal issue">
        <p class="pop__head">Choose an issue</p>
        <button type="button" role="menuitemradio" class="opt opt--auto" :aria-checked="theme.choice === 'auto'" @click="choose('auto')">
          <span class="opt__icon"><Icon name="calendar" /></span>
          <span class="opt__name">Auto<span class="opt__months">This month: {{ autoName }}</span></span>
        </button>
        <div class="grid">
          <button
            v-for="s in SEASONS"
            :key="s.id"
            type="button"
            role="menuitemradio"
            class="opt"
            :aria-checked="theme.choice === s.id"
            @click="choose(s.id)"
          >
            <span class="opt__dots" aria-hidden="true" :style="{ background: PALETTES[s.id]?.bg }">
              <i v-for="(c, i) in swatch(s.id)" :key="i" :style="{ background: c }" />
            </span>
            <span class="opt__name">{{ s.name }}<span class="opt__months">{{ s.months }}</span></span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.switch { position: relative; }
.trigger {
  display: flex; align-items: center; gap: 10px;
  border: 0; border-radius: 999px;
  padding: 5px 12px 5px 6px;
  background: color-mix(in srgb, var(--surface) 75%, transparent);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: box-shadow 0.25s;
}
.trigger:hover { box-shadow: inset 0 0 0 1px var(--accent); }
.dots { display: flex; padding: 3px; border-radius: 99px; background: var(--surface); }
.dots i { width: 16px; height: 16px; border-radius: 50%; box-shadow: 0 0 0 2px var(--surface); }
.dots i + i { margin-left: -5px; }
.label { display: grid; line-height: 1.05; text-align: left; font-weight: 600; font-size: 0.9rem; }
.label small { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); font-weight: 700; }
.chev { transition: transform 0.3s var(--ease); }
[aria-expanded='true'] .chev { transform: rotate(180deg); }

.pop {
  position: absolute; right: 0; top: calc(100% + 12px); z-index: 60;
  width: 420px; max-height: min(80vh, 640px); overflow-y: auto;
  background: var(--surface); color: var(--ink);
  border-radius: 24px; padding: 14px;
  box-shadow: var(--shadow), 0 0 0 1px var(--line);
  transform-origin: top right;
}
.pop-enter-active, .pop-leave-active { transition: opacity 0.25s var(--ease), transform 0.35s var(--ease); }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-6px) scale(0.98); }
.pop__head { margin: 4px 8px 10px; font-family: var(--display); font-size: 1.3rem; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.opt {
  display: flex; align-items: center; gap: 10px;
  border: 0; background: transparent; text-align: left;
  padding: 8px; border-radius: 14px;
  transition: background-color 0.2s;
}
.opt:hover, .opt:focus-visible { background: var(--bg-2); }
.opt[aria-checked='true'] { background: var(--accent-soft); box-shadow: inset 0 0 0 1.5px var(--accent); }
.opt__dots { display: flex; padding: 6px; border-radius: 12px; flex: none; box-shadow: inset 0 0 0 1px var(--line); }
.opt__dots i { width: 14px; height: 14px; border-radius: 50%; }
.opt__dots i + i { margin-left: -4px; }
.opt__icon { width: 40px; height: 32px; display: grid; place-items: center; border-radius: 12px; background: var(--bg-2); }
.opt__name { display: grid; font-weight: 600; line-height: 1.2; font-size: 0.93rem; }
.opt__months { font-weight: 400; font-size: 0.8rem; color: var(--muted); }
.opt--auto { width: 100%; margin-bottom: 8px; }

@media (max-width: 560px) {
  .label small { display: none; }
  .label { font-size: 0.85rem; max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pop { position: fixed; left: 10px; right: 10px; width: auto; top: 70px; }
}
</style>
