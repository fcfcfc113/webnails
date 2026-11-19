<script setup>
import Icon from './Icon.vue'
import { offer, season } from '../season.js'
</script>

<template>
  <div class="promo">
    <p class="wrap">
      <Icon name="sparkle" />
      <span><b>{{ season.name }} issue</b> · {{ offer }}</span>
      <a href="#book">Book now</a>
    </p>
  </div>
</template>

<style scoped>
.promo { background: var(--ink); color: var(--bg); font-size: 0.9rem; }
p { margin: 0 auto; padding-block: 9px; display: flex; align-items: center; justify-content: center; gap: 10px; text-align: center; }
p .icon { color: var(--accent-soft); }
b { font-weight: 700; }
a { font-weight: 700; white-space: nowrap; }
@media (max-width: 640px) { p { font-size: 0.8rem; justify-content: flex-start; text-align: left; } p a { display: none; } }
</style>
