<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { booking, goToBooking } from '../store.js'

const hidden = ref(true)
let io

const next = computed(() => booking.slots.find((s) => s.id === booking.slotId) || booking.slots[0])

onMounted(() => {
  const hero = document.getElementById('top')
  const book = document.getElementById('book')
  const seen = new Map()
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
    hidden.value = !!(seen.get('top') || seen.get('book'))
  }, { threshold: 0.15 })
  hero && io.observe(hero)
  book && io.observe(book)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="bar" :class="{ hidden }" :aria-hidden="hidden">
    <span v-if="next" class="next">
      <small>Next open</small>
      <b class="num">{{ next.day }} {{ next.time }}</b>
    </span>
    <button class="btn btn--pink" type="button" :tabindex="hidden ? -1 : 0" @click="goToBooking">Book now</button>
  </div>
</template>

<style scoped>
.bar { display: none; }
@media (max-width: 640px) {
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: max(12px, env(safe-area-inset-bottom));
    z-index: 90;
    background: var(--ink);
    color: var(--on-ink);
    border-radius: 999px;
    padding: 8px 8px 8px 22px;
    transition: transform 0.5s var(--ease-out), opacity 0.3s;
  }
  .bar.hidden { transform: translateY(140%); opacity: 0; pointer-events: none; }
  .next { display: grid; line-height: 1.15; }
  .next small { font-size: 0.75rem; opacity: 0.85; }
  .btn::before { display: none; }
}
</style>
