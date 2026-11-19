<script setup>
import { fullMenu as menu } from '../season.js'
import { booking, goToBooking } from '../store.js'

function bookService(name) {
  booking.serviceName = name
  goToBooking()
}
</script>

<template>
  <section id="menu" class="menu" aria-labelledby="menu-title">
    <div class="wrap">
      <div class="top">
        <h2 id="menu-title" class="h2">The menu.<br />Prices up front.</h2>
        <p class="lede">No “starting at” surprises. Tap any line to book it.</p>
      </div>

      <div class="groups">
        <section v-for="g in menu" :key="g.id" class="group" :class="{ 'group--season': g.id === 'season' }" :aria-labelledby="'g-' + g.id">
          <h3 :id="'g-' + g.id">{{ g.title }}</h3>
          <p class="note">{{ g.note }}</p>
          <ul>
            <li v-for="it in g.items" :key="it.name">
              <button type="button" class="row" @click="bookService(it.name)" :aria-label="`Book ${it.name}, $${it.price}`">
                <span class="svc">
                  <span class="svc__name">{{ it.name }}</span>
                  <span class="svc__time">{{ it.time }}<template v-if="it.tag"> · <em>{{ it.tag }}</em></template></span>
                </span>
                <span class="leader" aria-hidden="true"></span>
                <span class="price num"><small v-if="it.from">from</small><sup>$</sup>{{ it.price }}</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
      <p class="fine"><span class="sample">Sample prices</span> Gratuity not included.</p>
    </div>
  </section>
</template>

<style scoped>
.menu {
  background: var(--pink);
  color: var(--on-primary);
  padding-block: clamp(72px, 11vw, 140px) clamp(48px, 7vw, 88px);
  position: relative;
}
.top {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px 48px;
  align-items: end;
  margin-bottom: clamp(40px, 6vw, 80px);
}
.top .h2 { margin: 0; }

.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(40px, 6vw, 88px) clamp(32px, 6vw, 96px);
}
h3 {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  letter-spacing: -0.025em;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 3px solid currentColor;
}
.note { margin: 10px 0 8px; font-size: 0.95rem; }
ul { list-style: none; margin: 0; padding: 0; }
li + li { border-top: 2px dotted color-mix(in srgb, currentColor 45%, transparent); }

.row {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 14px 8px;
  text-align: left;
  border-radius: 12px;
  transition: background-color 0.2s, padding 0.35s var(--ease-out);
}
.row:hover { background: rgb(255 255 255 / 0.32); padding-inline: 16px; }
.svc { display: grid; }
.svc__name { font-weight: 600; font-size: 1.1rem; }
.svc__time { font-size: 0.88rem; }
.svc__time em { font-style: normal; font-weight: 600; color: var(--ink-deep); background: var(--sun); padding: 0 6px; border-radius: 4px; }
.leader { flex: 1; }
/* Size = volume: the price is the loudest thing on the line */
.price {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(2rem, 3.6vw, 3rem);
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;
}
.price sup { font-size: 0.45em; vertical-align: 0.9em; margin-right: 1px; }
.price small { font-family: var(--body); font-size: 0.8rem; font-weight: 600; letter-spacing: 0; margin-right: 6px; }

.group--season { grid-column: 1 / -1; }
.group--season ul { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: clamp(20px, 3vw, 40px); }
.group--season li + li { border-top: 0; }
.group--season li { border-bottom: 2px dotted color-mix(in srgb, currentColor 45%, transparent); }
.group--season h3 { display: flex; align-items: center; gap: 12px; }
.group--season h3::after { content: "Limited"; font-family: var(--body); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: var(--sun); color: var(--ink-deep); padding: 4px 10px; border-radius: 99px; transform: rotate(-3deg); }
.fine { margin: clamp(32px, 5vw, 56px) 0 0; font-size: 0.85rem; }
.fine code { font-size: 0.85em; background: rgb(255 255 255 / 0.35); padding: 1px 6px; border-radius: 6px; }

@media (max-width: 820px) {
  .top, .groups { grid-template-columns: 1fr; }
  .group--season ul { grid-template-columns: 1fr; }
  .group--season li + li { border-top: 2px dotted color-mix(in srgb, currentColor 45%, transparent); }
  .group--season li { border-bottom: 0; }
}
</style>
