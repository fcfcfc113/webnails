<script setup>
import { season } from '../season.js'
import Icon from './Icon.vue'
const perks = [
  { icon: 'gift', title: 'Seasonal specials', text: 'Limited looks every holiday' },
  { icon: 'calendar', title: 'Book in a minute', text: 'Pick a time, we hold your chair' },
  { icon: 'shield', title: 'Clean & careful', text: 'Fresh files, sanitized tools' },
  { icon: 'heart', title: 'Custom designs', text: 'Bring any inspo photo' },
]
</script>

<template>
  <section class="perks" aria-label="Why clients love us">
    <ul class="wrap">
      <li v-for="p in perks" :key="p.title">
        <span class="ic"><Icon :name="p.icon" /></span>
        <span><b>{{ p.title === 'Seasonal specials' ? season.name + ' specials' : p.title }}</b>{{ p.text }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.perks { position: relative; z-index: 6; margin-top: -54px; }
ul {
  list-style: none; margin-block: 0; padding: 18px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
  background: var(--surface); border-radius: var(--r-lg); box-shadow: var(--shadow);
}
li { display: flex; gap: 12px; align-items: center; padding: 8px 10px; }
li + li { border-left: 1px solid var(--line); }
.ic { width: 46px; height: 46px; flex: none; border-radius: 16px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); font-size: 1.15rem; }
li span:last-child { display: grid; line-height: 1.3; font-size: 0.9rem; color: var(--muted); }
b { color: var(--ink); font-size: 1rem; }
@media (max-width: 900px) { ul { grid-template-columns: 1fr 1fr; } li:nth-child(3) { border-left: 0; } }
@media (max-width: 520px) {
  .perks { margin-top: -40px; }
  ul { padding: 10px; gap: 4px; }
  li { flex-direction: column; align-items: flex-start; gap: 8px; padding: 10px; }
  li + li { border-left: 0; }
}
</style>
