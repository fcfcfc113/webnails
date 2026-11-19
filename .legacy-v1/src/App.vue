<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroFlyer from './components/HeroFlyer.vue'
import TipRail from './components/TipRail.vue'
import PriceMenu from './components/PriceMenu.vue'
import BookTicket from './components/BookTicket.vue'
import VisitUs from './components/VisitUs.vue'
import SiteFooter from './components/SiteFooter.vue'
import MobileBookBar from './components/MobileBookBar.vue'
</script>

<template>
  <a class="skip" href="#book">Skip to booking</a>
  <SiteHeader />
  <main>
    <HeroFlyer />
    <TipRail />
    <PriceMenu />
    <BookTicket />
    <VisitUs />
  </main>
  <SiteFooter />
  <MobileBookBar />
</template>

<style>
.skip {
  position: absolute;
  left: 12px;
  top: -60px;
  z-index: 200;
  background: var(--ink);
  color: var(--on-ink);
  padding: 10px 16px;
  border-radius: 999px;
  text-decoration: none;
}
.skip:focus { top: 12px; }
</style>
