<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { salon } from '../data.js'
import { booking } from '../store.js'
import Icon from './Icon.vue'

const hidden = ref(true)
let io
const next = computed(() => booking.slots.find((s) => s.id === booking.slotId) || booking.slots[0])

onMounted(() => {
  const seen = new Map()
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
    hidden.value = !!(seen.get('top') || seen.get('book'))
  }, { threshold: 0.2 })
  ;['top', 'book'].forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="bar glass" :class="{ hidden }" :aria-hidden="hidden">
    <a class="call" :href="salon.phoneHref" :tabindex="hidden ? -1 : 0" aria-label="Call the studio"><Icon name="phone" /></a>
    <span v-if="next" class="next"><small>Next open</small><b class="num">{{ next.day }} {{ next.time }}</b></span>
    <a class="btn btn--sm" href="#book" :tabindex="hidden ? -1 : 0">Book now</a>
  </div>
</template>

<style scoped>
.bar { display: none; }
@media (max-width: 760px) {
  .bar {
    display: flex; align-items: center; gap: 10px;
    position: fixed; left: 10px; right: 10px; bottom: max(10px, env(safe-area-inset-bottom)); z-index: 90;
    padding: 6px; border-radius: 999px;
    transition: transform 0.5s var(--ease), opacity 0.3s;
  }
  .bar.hidden { transform: translateY(140%); opacity: 0; pointer-events: none; }
  .call { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
  .next { display: grid; line-height: 1.15; margin-right: auto; }
  .next small { font-size: 0.72rem; color: var(--muted); }
  .next b { font-size: 0.92rem; }
}
</style>
