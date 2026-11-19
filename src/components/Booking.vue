<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { salon } from '../data.js'
import { designs, fullMenu as menu, season, decor } from '../season.js'
import { booking } from '../store.js'
import { photo } from '../media.js'
import NailTip from './NailTip.vue'
import Icon from './Icon.vue'
import Sticker from './Sticker.vue'

const form = reactive({ name: '', phone: '', note: '' })
const errors = reactive({})
const state = ref('idle') // idle | done

const slot = computed(() => booking.slots.find((s) => s.id === booking.slotId))
const design = computed(() => designs.value.find((d) => d.id === booking.designId))
const service = computed(() => menu.value.flatMap((g) => g.items).find((i) => i.name === booking.serviceName))
const days = computed(() => [...new Set(booking.slots.map((s) => s.day))])
const day = ref('')
const daySlots = computed(() => booking.slots.filter((s) => s.day === (day.value || days.value[0])))
watch(() => booking.slotId, () => { if (slot.value) day.value = slot.value.day })

watch(season, () => {
  if (!design.value) booking.designId = ''
  if (booking.serviceName && !service.value) booking.serviceName = ''
})
watch(() => booking.serviceName, (v) => v && delete errors.service)
watch(() => booking.slotId, (v) => v && delete errors.slot)
watch(() => form.name, (v) => v.trim().length >= 2 && delete errors.name)
watch(() => form.phone, (v) => v.replace(/\D/g, '').length >= 10 && delete errors.phone)

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!booking.serviceName) errors.service = 'Pick a service so we can hold the right chair.'
  if (!booking.slotId) errors.slot = 'Choose a time — tap any open slot.'
  if (form.name.trim().length < 2) errors.name = 'Add your first name.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Use a 10-digit US number so the salon can reply.'
  return Object.keys(errors).length === 0
}
const prettyPhone = computed(() => {
  const d = form.phone.replace(/\D/g, '').slice(-10)
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : form.phone
})
// No booking backend yet: the request goes out as a prefilled text to the salon.
const smsHref = computed(() => {
  const body = [
    `Hi ${salon.name}! I'd like to book:`,
    `${booking.serviceName}${design.value ? ` (${design.value.name})` : ''}`,
    slot.value ? `${slot.value.day} ${slot.value.date} at ${slot.value.time}` : '',
    form.note.trim() ? `Note: ${form.note.trim()}` : '',
    `— ${form.name.trim()}, ${prettyPhone.value}`,
  ].filter(Boolean).join('\n')
  return `sms:${salon.phoneHref.replace('tel:', '')}?&body=${encodeURIComponent(body)}`
})
function submit() { if (validate()) state.value = 'done' }
function reset() { state.value = 'idle'; booking.slotId = null; form.name = ''; form.phone = ''; form.note = '' }
</script>

<template>
  <section id="book" class="section book pat" aria-labelledby="book-title">
    <div class="glow" aria-hidden="true" />
    <div class="wrap grid">
      <aside class="summary">
        <img :src="photo('studioWork', 800, 1000)" alt="" class="bg" loading="lazy" />
        <div class="summary__inner">
          <h2 id="book-title" class="h2">Book your <em>chair.</em></h2>
          <p>Pick a service and a time, then send it to us by text. We’ll reply to confirm.</p>
          <dl class="recap glass" aria-live="polite">
            <div><dt>Service</dt><dd>{{ booking.serviceName || '—' }} <span v-if="service" class="num">· ${{ service.price }}</span></dd></div>
            <div><dt>Time</dt><dd>{{ slot ? `${slot.day}, ${slot.date} · ${slot.time}` : '—' }}</dd></div>
            <div v-if="design"><dt>Design</dt><dd class="d"><NailTip :design="design" /> {{ design.name }}</dd></div>
          </dl>
        </div>
        <div class="st" aria-hidden="true"><Sticker :icon="['polish', ...decor.polish]" /></div>
      </aside>

      <div class="panel">
        <form v-if="state !== 'done'" novalidate @submit.prevent="submit">
          <div class="field">
            <label for="f-service">Service</label>
            <select id="f-service" v-model="booking.serviceName" :aria-invalid="!!errors.service" aria-describedby="e-service">
              <option value="" disabled>Choose a service…</option>
              <optgroup v-for="g in menu" :key="g.id" :label="g.id === 'season' ? season.name + ' specials' : g.title">
                <option v-for="it in g.items.filter((i) => !i.from)" :key="it.name" :value="it.name">{{ it.name }} — ${{ it.price }}</option>
              </optgroup>
            </select>
            <p v-if="errors.service" id="e-service" class="err">{{ errors.service }}</p>
          </div>

          <fieldset class="field">
            <legend>Day &amp; time <span class="sample">sample times</span></legend>
            <div class="days" role="group" aria-label="Day">
              <button v-for="d in days" :key="d" type="button" class="day" :aria-pressed="(day || days[0]) === d" @click="day = d">{{ d }}</button>
            </div>
            <div class="slots" role="radiogroup" aria-describedby="e-slot">
              <label v-for="s in daySlots" :key="s.id" class="slot">
                <input type="radio" name="slot" :value="s.id" v-model="booking.slotId" />
                <span class="num">{{ s.time }}</span>
              </label>
            </div>
            <p v-if="errors.slot" id="e-slot" class="err">{{ errors.slot }}</p>
          </fieldset>

          <div class="field">
            <label for="f-design">Design <span class="opt">(optional)</span></label>
            <select id="f-design" v-model="booking.designId">
              <option value="">Decide in the chair</option>
              <option v-for="d in designs" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>

          <div class="two">
            <div class="field">
              <label for="f-name">First name</label>
              <input id="f-name" v-model="form.name" autocomplete="given-name" :aria-invalid="!!errors.name" aria-describedby="e-name" />
              <p v-if="errors.name" id="e-name" class="err">{{ errors.name }}</p>
            </div>
            <div class="field">
              <label for="f-phone">Mobile</label>
              <input id="f-phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(555) 123-4567" :aria-invalid="!!errors.phone" aria-describedby="e-phone" />
              <p v-if="errors.phone" id="e-phone" class="err">{{ errors.phone }}</p>
            </div>
          </div>
          <div class="field">
            <label for="f-note">Anything we should know? <span class="opt">(optional)</span></label>
            <input id="f-note" v-model="form.note" placeholder="Inspo photo, removal needed, nail length…" />
          </div>

          <button class="btn submit" type="submit"><Icon name="calendar" /> Request this time</button>
          <p class="hint"><span class="sample">sample policy</span> Free to cancel up to 2 hours before.</p>
        </form>

        <div v-else class="done" role="status">
          <span class="done__icon"><Icon name="check" /></span>
          <p class="h3">One last tap, {{ form.name.trim() }}.</p>
          <p>Send us the text below to lock in <b>{{ booking.serviceName }}</b> on <b>{{ slot?.day }} at {{ slot?.time }}</b>. We’ll reply to <span class="num">{{ prettyPhone }}</span> to confirm.</p>
          <div class="done__row">
            <a class="btn" :href="smsHref"><Icon name="chat" /> Text the salon</a>
            <a class="btn btn--ghost" :href="salon.phoneHref"><Icon name="phone" /> Call instead</a>
          </div>
          <button class="again" type="button" @click="reset">Start over</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book { overflow: hidden; }
.grid { display: grid; grid-template-columns: 0.9fr 1.3fr; gap: 20px; align-items: stretch; }
.summary { position: relative; border-radius: var(--r-lg); overflow: visible; color: #fff; min-height: 520px; display: flex; }
.summary .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: var(--r-lg); }
.summary::after { content: ''; position: absolute; inset: 0; border-radius: var(--r-lg); background: linear-gradient(to top, rgb(20 10 20 / 0.85), rgb(20 10 20 / 0.25)); }
.summary__inner { position: relative; z-index: 1; margin-top: auto; padding: clamp(22px, 3vw, 36px); display: grid; gap: 14px; }
.summary .h2 em { color: var(--glow-1); }
.summary p { margin: 0; color: rgb(255 255 255 / 0.88); }
.recap { margin: 6px 0 0; padding: 14px 16px; border-radius: 18px; color: var(--ink); display: grid; gap: 8px; }
.recap div { display: flex; justify-content: space-between; gap: 16px; font-size: 0.95rem; }
.recap dt { color: var(--muted); }
.recap dd { margin: 0; font-weight: 600; text-align: right; }
.recap .d { display: flex; align-items: center; gap: 8px; }
.recap .d .tip { --w: 16px; }
.summary .st { position: absolute; z-index: 2; width: 110px; right: -24px; top: -30px; transform: rotate(10deg); }

.panel { background: var(--surface); border-radius: var(--r-lg); padding: clamp(22px, 3.4vw, 44px); box-shadow: var(--shadow-sm); }
form { display: grid; gap: 20px; }
.field { display: grid; gap: 8px; border: 0; margin: 0; padding: 0; min-width: 0; }
label, legend { font-weight: 600; font-size: 0.95rem; padding: 0; display: flex; align-items: center; gap: 8px; }
.opt { font-weight: 400; color: var(--muted); }
select, input:not([type='radio']) {
  width: 100%; min-height: 50px; padding: 0 16px;
  background: var(--bg); color: var(--ink);
  border: 1.5px solid var(--line); border-radius: 14px;
  caret-color: var(--accent);
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}
select:hover, input:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--line)); }
select:focus-visible, input:focus-visible { outline: 0; border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); background: var(--surface); }
[aria-invalid='true'] { border-color: #c0264e !important; }
::placeholder { color: color-mix(in srgb, var(--muted) 85%, transparent); }
.err { margin: 0; color: #b3163f; font-size: 0.9rem; font-weight: 500; }
.days, .slots { display: flex; flex-wrap: wrap; gap: 8px; }
.day { border: 0; padding: 8px 16px; border-radius: 999px; font-weight: 600; background: var(--bg-2); }
.day[aria-pressed='true'] { background: var(--ink); color: var(--bg); }
.slot input { position: absolute; opacity: 0; pointer-events: none; }
.slot span { display: inline-block; padding: 10px 16px; border-radius: 12px; border: 1.5px solid var(--line); cursor: pointer; font-weight: 600; transition: all 0.2s; }
.slot:hover span { border-color: var(--accent); }
.slot input:checked + span { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
.slot input:focus-visible + span { outline: 3px solid var(--accent); outline-offset: 2px; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.submit { justify-self: start; min-height: 54px; padding: 0 1.8em; font-size: 1.05rem; }
.hint { margin: -6px 0 0; font-size: 0.88rem; color: var(--muted); display: flex; gap: 8px; align-items: center; }

.done { display: grid; gap: 14px; justify-items: start; align-content: center; min-height: 100%; }
.done p { margin: 0; max-width: 48ch; }
.done__icon { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); font-size: 1.5rem; }
.done__row { display: flex; flex-wrap: wrap; gap: 10px; }
.again { border: 0; background: none; padding: 0; text-decoration: underline; color: var(--muted); }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .summary { min-height: 380px; }
  .two { grid-template-columns: 1fr; }
}
</style>
