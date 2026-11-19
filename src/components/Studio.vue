<script setup>
import { TOUR, photo } from '../media.js'
import { decor } from '../season.js'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'
import VideoFrame from './VideoFrame.vue'

const points = [
  { icon: 'sparkle', title: 'Gel, Gel-X, dip & acrylic', text: 'Any length, any shape. Almond, coffin, square or oval.' },
  { icon: 'heart', title: 'Russian e-file manicures', text: 'Clean cuticles and polish that sits right at the edge.' },
  { icon: 'shield', title: 'Fresh tools for every client', text: 'Sanitized metal tools and single-use files and buffers.' },
  { icon: 'chat', title: 'A real consultation first', text: 'We talk shape, length and color before anything starts.' },
]
</script>

<template>
  <section id="studio" class="section studio pat" aria-labelledby="studio-title">
    <div class="glow" aria-hidden="true" />
    <div class="wrap grid">
      <div class="copy">
        <h2 id="studio-title" class="h2">A little studio with <em>big</em> attention to detail.</h2>
        <p class="lede">
          Petal &amp; Polish is a neighborhood nail studio for clean, long-lasting sets and art that
          looks great up close. Come in for a quick polish change or stay for a full Gel-X set —
          either way, you leave with nails you keep looking at.
        </p>
        <ul class="points">
          <li v-for="p in points" :key="p.title">
            <span class="ic"><Icon :name="p.icon" /></span>
            <span><b>{{ p.title }}</b>{{ p.text }}</span>
          </li>
        </ul>
        <p class="note"><span class="sample">sample copy</span> Replace with your studio’s own story.</p>
      </div>

      <div class="media">
        <VideoFrame :src="TOUR.src" :poster="photo(TOUR.poster, 1200, 675)" label="Play the studio tour">
          <span class="tag glass"><Icon name="play" /> 30-sec studio tour</span>
        </VideoFrame>
        <div class="collage" aria-hidden="true">
          <figure class="polaroid p1"><span class="tape" /><img :src="photo('polishWall', 500, 500)" alt="" loading="lazy" /><figcaption>pick your shade</figcaption></figure>
          <figure class="polaroid p2"><span class="tape" /><img :src="photo('tools', 500, 500)" alt="" loading="lazy" /><figcaption>fresh tools ✓</figcaption></figure>
          <div class="st"><Sticker :icon="decor.rail[0]" /></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.studio { overflow: hidden; }
.grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 6vw, 96px); align-items: center; }
.copy { display: grid; gap: 22px; }
.points { list-style: none; margin: 8px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 18px 24px; }
.points li { display: flex; gap: 12px; align-items: flex-start; }
.points b { display: block; font-weight: 700; margin-bottom: 2px; }
.points li > span:last-child { color: var(--muted); font-size: 0.95rem; line-height: 1.45; }
.points b { color: var(--ink); }
.ic { width: 40px; height: 40px; flex: none; border-radius: 14px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
.note { margin: 0; font-size: 0.85rem; color: var(--muted); display: flex; gap: 8px; align-items: center; }

.media { position: relative; padding-bottom: 120px; }
.tag { position: absolute; left: 14px; top: 14px; padding: 6px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; display: flex; gap: 6px; align-items: center; color: var(--ink); }
.collage { position: absolute; left: 0; right: 0; bottom: 0; height: 200px; pointer-events: none; }
.polaroid { position: absolute; width: 180px; }
.polaroid figcaption { font-size: 1.2rem; }
.p1 { left: 6%; bottom: -10px; transform: rotate(-6deg); }
.p2 { left: 36%; bottom: 10px; transform: rotate(5deg); }
.collage .st { position: absolute; right: 6%; bottom: 30px; width: 110px; transform: rotate(-8deg); }

@media (max-width: 920px) {
  .grid { grid-template-columns: 1fr; }
  .points { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .polaroid { width: 140px; }
  .p2 { left: 44%; }
  .collage .st { display: none; }
}
</style>
