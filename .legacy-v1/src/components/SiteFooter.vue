<script setup>
import { salon } from '../data.js'
import { goToBooking } from '../store.js'
import { season } from '../season.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="wrap">
      <p class="sign display" aria-hidden="true">
        <span class="misreg" :data-ink="salon.name">{{ salon.name }}</span>
      </p>
      <div class="row">
        <p class="cta">{{ season.cta }}</p>
        <button class="btn btn--pink" type="button" @click="goToBooking">Book a chair</button>
      </div>
      <div class="small">
        <span>© {{ year }} {{ salon.name }}</span>
        <span>{{ salon.street }}, {{ salon.city }}</span>
        <a :href="salon.phoneHref" class="num">{{ salon.phone }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  background: var(--ink);
  color: var(--on-ink);
  padding-block: clamp(56px, 8vw, 104px) 32px;
  overflow: hidden;
}
.sign {
  font-size: clamp(3.4rem, 13.5vw, 13rem);
  color: var(--on-ink);
  white-space: nowrap;
  margin-left: -0.04em;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: clamp(28px, 4vw, 48px);
  padding-top: 28px;
  border-top: 2px dashed color-mix(in srgb, var(--on-ink) 50%, transparent);
}
.cta { font-family: var(--display); font-weight: 700; font-size: clamp(1.4rem, 2.4vw, 2rem); letter-spacing: -0.02em; margin: 0; }
.btn--pink::before { background: var(--on-ink); }
.small { display: flex; flex-wrap: wrap; gap: 8px 28px; margin-top: 48px; font-size: 0.9rem; opacity: 0.85; }
@media (max-width: 640px) { .foot { padding-bottom: 96px; } }
</style>
