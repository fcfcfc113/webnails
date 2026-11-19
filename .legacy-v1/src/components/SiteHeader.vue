<script setup>
import { salon } from '../data.js'
import { goToBooking } from '../store.js'
import SeasonSwitcher from './SeasonSwitcher.vue'
</script>

<template>
  <header class="head wrap">
    <a class="brand" href="#top" aria-label="Petal & Polish, home">
      <span class="stamp" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs><path id="ring" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" /></defs>
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="3" />
          <text font-size="11.5" font-weight="700" letter-spacing="2.6" fill="currentColor">
            <textPath href="#ring">NAIL STUDIO · EST. HERE · NAIL STUDIO ·</textPath>
          </text>
          <text x="50" y="59" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor">P&amp;P</text>
        </svg>
      </span>
      <span class="name">{{ salon.name }}</span>
    </a>

    <nav aria-label="Main">
      <ul>
        <li><a href="#designs">Designs</a></li>
        <li><a href="#menu">Prices</a></li>
        <li><a href="#visit">Visit</a></li>
        <li class="phone"><a :href="salon.phoneHref" class="num">{{ salon.phone }}</a></li>
      </ul>
    </nav>

    <SeasonSwitcher />
    <button class="btn" type="button" @click="goToBooking">Book now</button>
  </header>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 40px);
  padding-block: 18px;
  position: relative;
  z-index: 5;
}
.brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.stamp {
  width: 58px;
  height: 58px;
  color: var(--ink);
  font-family: var(--display);
  transform: rotate(-12deg);
  transition: transform 0.6s var(--ease-out);
}
.brand:hover .stamp { transform: rotate(20deg); }
.name {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.45rem;
  letter-spacing: -0.03em;
}
nav { margin-left: auto; }
ul { display: flex; gap: clamp(14px, 2.4vw, 32px); list-style: none; margin: 0; padding: 0; align-items: center; }
nav a {
  text-decoration: none;
  font-weight: 600;
  background: linear-gradient(var(--pink), var(--pink)) 0 92% / 0 40% no-repeat;
  transition: background-size 0.4s var(--ease-out);
  padding: 2px 2px;
}
nav a:hover { background-size: 100% 40%; }
.phone a { opacity: 0.85; }

@media (max-width: 860px) {
  nav li:not(.phone) { display: none; }
}
@media (max-width: 560px) {
  nav, .head > .btn { display: none; }
  .head > .switch { margin-left: auto; }
}
@media (max-width: 430px) {
  .name { display: none; }
  .stamp { width: 48px; height: 48px; }
}
</style>
