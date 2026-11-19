<script setup>
import { salon } from '../data.js'
import { SOCIALS } from '../media.js'
import { season, decor } from '../season.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'
import Bunting from './Bunting.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <Bunting :config="decor.bunting" />
    <div class="wrap">
      <div class="cta">
        <p class="display big">{{ season.cta }}</p>
        <a class="btn" href="#book"><Icon name="calendar" /> Book a set</a>
      </div>
      <ul class="stickers" aria-hidden="true">
        <li v-for="(s, n) in decor.footer" :key="n" :style="{ '--r': (n % 2 ? 8 : -8) + 'deg', '--d': n * -1.2 + 's' }"><Sticker :icon="s" /></li>
      </ul>
      <div class="cols">
        <div>
          <p class="name">{{ salon.name }}</p>
          <p class="muted">{{ salon.street }}, {{ salon.city }}</p>
          <a :href="salon.phoneHref" class="num">{{ salon.phone }}</a>
        </div>
        <nav aria-label="Footer">
          <a href="#studio">Studio</a><a href="#menu">Menu</a><a href="#sets">Sets</a><a href="#reels">Reels</a><a href="#book">Book</a><a href="#visit">Visit</a>
        </nav>
        <div class="social">
          <a v-for="s in SOCIALS" :key="s.id" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name"><Icon :name="s.id" /></a>
        </div>
      </div>
      <p class="fine">© {{ year }} {{ salon.name }} · Photos: Unsplash · Videos: Pexels · <span class="sample">demo content</span></p>
    </div>
  </footer>
</template>

<style scoped>
.foot { background: var(--bg-2); padding-bottom: 32px; position: relative; }
.cta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; padding: clamp(40px, 6vw, 72px) 0 24px; }
.big { font-size: clamp(2rem, 4.4vw, 3.6rem); line-height: 1.05; max-width: 16ch; }
.stickers { list-style: none; margin: 0 0 24px; padding: 0; display: flex; gap: clamp(8px, 3vw, 40px); justify-content: center; }
.stickers li { width: clamp(56px, 8vw, 96px); transform: rotate(var(--r)); animation: bob 6s ease-in-out infinite alternate; animation-delay: var(--d); }
@keyframes bob { to { transform: rotate(calc(var(--r) * -1)) translateY(-6px); } }
.cols { display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 24px; align-items: start; padding: 28px 0; border-top: 1px solid var(--line); }
.name { font-family: var(--display); font-size: 1.6rem; margin: 0 0 4px; }
.muted { color: var(--muted); margin: 0 0 4px; }
nav { display: flex; flex-wrap: wrap; gap: 6px 18px; }
nav a { text-decoration: none; font-weight: 500; }
nav a:hover { color: var(--accent); }
.social { display: flex; gap: 8px; }
.social a { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); box-shadow: var(--shadow-sm); --yt-play: var(--surface); transition: transform 0.3s var(--ease), color 0.2s; }
.social a:hover { transform: translateY(-2px); color: var(--accent); }
.fine { margin: 0; font-size: 0.85rem; color: var(--muted); display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
@media (max-width: 760px) { .cols { grid-template-columns: 1fr; } .foot { padding-bottom: 96px; } }
</style>
