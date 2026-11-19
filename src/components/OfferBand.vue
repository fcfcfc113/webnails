<script setup>
import { season, decor, festive, offer, fullMenu } from '../season.js'
import { goToBooking, booking } from '../store.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'

function bookSpecial() {
  const first = fullMenu.value[0]?.items?.find((i) => !i.from)
  if (first) booking.serviceName = first.name
  goToBooking()
}
</script>

<template>
  <section id="offer" class="band" aria-labelledby="offer-title">
    <div class="glowdots" aria-hidden="true" />
    <div class="side side--l" aria-hidden="true">
      <div class="s1"><Sticker :icon="decor.footer[0]" /></div>
      <div class="s2"><Sticker :icon="decor.big" /></div>
    </div>
    <div class="wrap inner">
      <h2 id="offer-title" class="script">{{ season.name }} Special</h2>
      <p class="line"><span>{{ offer }}</span></p>
      <p class="sub">{{ festive.greeting }} from all of us at the studio. <span class="sample">sample offer</span></p>
      <button type="button" class="btn btn--lg cta" @click="bookSpecial"><Icon name="gift" /> Book the special</button>
    </div>
    <div class="side side--r" aria-hidden="true">
      <div class="s1"><Sticker :icon="['polish', ...decor.polish]" /></div>
      <div class="s2"><Sticker :icon="decor.footer[3]" /></div>
    </div>
  </section>
</template>

<style scoped>
.band {
  position: relative; overflow: hidden; color: var(--on-accent);
  background: radial-gradient(80% 140% at 50% 0%, color-mix(in srgb, var(--accent) 80%, #fff) 0%, var(--accent) 55%, color-mix(in srgb, var(--accent) 70%, #000) 100%);
  padding-block: clamp(56px, 8vw, 96px);
}
.glowdots { position: absolute; inset: 0; background-image: var(--pattern); background-size: 220px; opacity: 0.6; mix-blend-mode: screen; }
.inner { position: relative; z-index: 2; display: grid; justify-items: center; text-align: center; gap: 14px; }
h2 { margin: 0; font-size: clamp(3.2rem, 7.4vw, 6.4rem); text-shadow: 0 4px 30px rgb(0 0 0 / 0.25); }
.line { margin: 0; filter: drop-shadow(0 10px 16px rgb(0 0 0 / 0.2)); }
.line span {
  display: inline-block; padding: 12px 40px; background: #fff; color: var(--accent);
  font-family: var(--display); font-size: clamp(1.1rem, 2vw, 1.6rem); line-height: 1.25; max-width: 760px;
  clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 50%, 100% 100%, 0 100%, 18px 50%);
}
.sub { margin: 0; opacity: 0.92; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
.cta { --b-bg: #fff; --b-fg: var(--accent); margin-top: 6px; }
.btn--lg { min-height: 56px; padding: 0 1.8em; font-size: 1.05rem; }
.side { position: absolute; top: 0; bottom: 0; width: 22%; z-index: 1; pointer-events: none; }
.side--l { left: 0; }
.side--r { right: 0; }
.side > div { position: absolute; animation: bob 6s ease-in-out infinite alternate; }
@keyframes bob { to { transform: translateY(-10px) rotate(5deg); } }
.side--l .s1 { width: 120px; left: 8%; top: 18%; transform: rotate(-12deg); }
.side--l .s2 { width: 90px; left: 30%; bottom: 12%; animation-delay: -2s; }
.side--r .s1 { width: 110px; right: 10%; top: 16%; transform: rotate(10deg); animation-delay: -3s; }
.side--r .s2 { width: 96px; right: 30%; bottom: 10%; animation-delay: -1s; }
@media (max-width: 900px) { .side--l .s2, .side--r .s2 { display: none; } .side { width: 18%; } .side > .s1 { width: 70px !important; top: 8% !important; } }
@media (max-width: 560px) { .side { display: none; } .line span { padding: 10px 26px; } }
</style>
