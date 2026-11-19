<script setup>
import SiteHeader from './components/SiteHeader.vue'
import Cover from './components/Cover.vue'
import Studio from './components/Studio.vue'
import Perks from './components/Perks.vue'
import MoodStrip from './components/MoodStrip.vue'
import OfferBand from './components/OfferBand.vue'
import SeasonBoard from './components/SeasonBoard.vue'
import Bunting from './components/Bunting.vue'
import { decor } from './season.js'
import MenuSection from './components/MenuSection.vue'
import Collection from './components/Collection.vue'
import TrendEdit from './components/TrendEdit.vue'
import Gallery from './components/Gallery.vue'
import Reels from './components/Reels.vue'
import Booking from './components/Booking.vue'
import Visit from './components/Visit.vue'
import SiteFooter from './components/SiteFooter.vue'
import MobileBookBar from './components/MobileBookBar.vue'
</script>

<template>
  <a class="skip" href="#book">Skip to booking</a>
  <SiteHeader />
  <main>
    <Cover />
    <Perks />
    <SeasonBoard />
    <MoodStrip />
    <Bunting :config="decor.bunting" class="divider" />
    <Studio />
    <MenuSection />
    <Collection />
    <TrendEdit />
    <Gallery />
    <Reels />
    <OfferBand />
    <Bunting :config="decor.bunting" class="divider" />
    <Booking />
    <Visit />
  </main>
  <SiteFooter />
  <MobileBookBar />
</template>

<style>
.skip { position: absolute; left: 12px; top: -60px; z-index: 200; background: var(--ink); color: var(--bg); padding: 10px 16px; border-radius: 999px; text-decoration: none; }
.skip:focus { top: 12px; }
.divider { margin-block: -28px; position: relative; z-index: 2; }
</style>
