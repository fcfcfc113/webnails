<script setup>
import { designs, season } from '../season.js'
import NailTip from './NailTip.vue'
import { booking, pickDesign } from '../store.js'

function toggle(id) {
  pickDesign(booking.designId === id ? '' : id)
}
</script>

<template>
  <section id="designs" class="rail-sec" aria-labelledby="designs-title">
    <div class="wrap head">
      <h2 id="designs-title" class="h2">{{ season.railTitle[0] }}<br />{{ season.railTitle[1] }}</h2>
      <p class="lede">{{ season.railLede }}</p>
    </div>

    <ul :key="season.id" class="rail" aria-label="Nail designs">
      <li v-for="(d, i) in designs" :key="d.id" :style="{ '--tilt': (i % 2 ? 4 : -3) + 'deg' }">
        <button
          type="button"
          class="card"
          :aria-pressed="booking.designId === d.id"
          @click="toggle(d.id)"
        >
          <NailTip :design="d" />
          <span class="meta">
            <span class="dname">{{ d.name }}</span>
            <span class="vibe">{{ d.vibe }}</span>
          </span>
          <span class="picked" aria-hidden="true">Added</span>
        </button>
      </li>
    </ul>
    <p class="wrap fine"><span class="sample">Illustrated previews</span> Ask to see photos of real sets in the salon.</p>
  </section>
</template>

<style scoped>
.rail-sec {
  background: var(--aqua);
  color: var(--on-secondary);
  padding-block: clamp(64px, 10vw, 128px) clamp(40px, 6vw, 72px);
  position: relative;
  overflow: hidden;
}
.rail-sec::before {
  content: '';
  position: absolute;
  inset: auto -10% -40% 40%;
  height: 90%;
  border-radius: 50%;
  background-image: radial-gradient(circle, rgb(255 255 255 / 0.55) 0 36%, transparent 38%);
  background-size: 14px 14px;
  pointer-events: none;
}
.head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 16px 48px;
  margin-bottom: clamp(32px, 5vw, 56px);
  position: relative;
}
.head .h2 { margin: 0; }
.head .lede { max-width: 38ch; }

.rail {
  list-style: none;
  margin: 0;
  padding: 24px max(var(--gutter), calc((100vw - var(--max)) / 2)) 36px;
  display: flex;
  gap: clamp(14px, 2vw, 24px);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  position: relative;
  scrollbar-color: var(--ink) transparent;
}
.rail li { scroll-snap-align: start; flex: none; position: relative; }
/* second-ink plate printed off-register under each card */
.rail li::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: var(--ink);
  transform: rotate(var(--tilt)) translate(6px, 7px);
}

.card {
  width: clamp(172px, 17vw, 210px);
  border: 0;
  border-radius: 22px;
  background: var(--paper);
  color: var(--ink);
  padding: 28px 18px 18px;
  display: grid;
  justify-items: center;
  gap: 18px;
  position: relative;
  transform: rotate(var(--tilt));
  transition: transform 0.5s var(--ease-out), background-color 0.3s;

}
.card:hover { transform: rotate(0deg) translateY(-6px); }
.card .tip { --w: clamp(84px, 7.5vw, 104px); transition: transform 0.6s var(--ease-out); }
.card:hover .tip { transform: rotate(-6deg) scale(1.04); }

.meta { display: grid; gap: 2px; text-align: center; }
.dname { font-family: var(--display); font-weight: 800; font-size: 1.2rem; letter-spacing: -0.02em; }
.vibe { font-size: 0.9rem; }

.picked {
  position: absolute;
  top: 14px;
  right: -10px;
  background: var(--pink);
  color: var(--on-primary);
  font-family: var(--display);
  font-weight: 800;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 99px;
  transform: rotate(12deg) scale(0);
  transition: transform 0.45s var(--ease-out);
}
.card[aria-pressed='true'] { background: var(--card); transform: rotate(0) translateY(-6px); outline: 3px solid var(--ink); }
.card[aria-pressed='true'] .picked { transform: rotate(12deg) scale(1); }

.fine { font-size: 0.85rem; margin-top: 0; }
.fine code { font-size: 0.85em; background: rgb(255 255 255 / 0.5); padding: 1px 6px; border-radius: 6px; }
</style>
