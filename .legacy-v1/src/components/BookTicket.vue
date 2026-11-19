<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { salon } from '../data.js'
import { designs, fullMenu as menu, season } from '../season.js'
import NailTip from './NailTip.vue'
import { booking } from '../store.js'

const form = reactive({ name: '', phone: '' })
const errors = reactive({})
const state = ref('idle') // idle | sending | done
const ticketNo = ref(String(Math.floor(1000 + Math.random() * 9000)))

const slot = computed(() => booking.slots.find((s) => s.id === booking.slotId))
const design = computed(() => designs.value.find((d) => d.id === booking.designId))
const service = computed(() => menu.value.flatMap((g) => g.items).find((i) => i.name === booking.serviceName))

// Switching season drops picks that no longer exist in the new print run.
watch(season, () => {
  if (!design.value) booking.designId = ''
  if (booking.serviceName && !service.value) booking.serviceName = ''
})

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!booking.serviceName) errors.service = 'Pick a service so we can hold the right chair.'
  if (!booking.slotId) errors.slot = 'Choose a time — tap any open slot.'
  if (form.name.trim().length < 2) errors.name = 'Add your first name.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Use a 10-digit US number so the salon can reply.'
  return Object.keys(errors).length === 0
}

// Clear a field's error as soon as the visitor fixes it.
watch(() => booking.serviceName, (v) => v && delete errors.service)
watch(() => booking.slotId, (v) => v && delete errors.slot)
watch(() => form.name, (v) => v.trim().length >= 2 && delete errors.name)
watch(() => form.phone, (v) => v.replace(/\D/g, '').length >= 10 && delete errors.phone)

const prettyPhone = computed(() => {
  const d = form.phone.replace(/\D/g, '').slice(-10)
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : form.phone
})

// No booking backend yet: the request goes out as a prefilled text to the salon.
// To use a real API, POST { service, design, slot, name, phone } here instead.
const smsHref = computed(() => {
  const body = [
    `Hi ${salon.name}! I'd like to book:`,
    `${booking.serviceName}${design.value ? ` (${design.value.name})` : ''}`,
    slot.value ? `${slot.value.day} ${slot.value.date} at ${slot.value.time}` : '',
    `— ${form.name.trim()}, ${prettyPhone.value}`,
  ].filter(Boolean).join('\n')
  return `sms:${salon.phoneHref.replace('tel:', '')}?&body=${encodeURIComponent(body)}`
})

function submit() {
  if (!validate()) return
  state.value = 'done'
}

function reset() {
  state.value = 'idle'
  booking.slotId = null
  form.name = ''
  form.phone = ''
  ticketNo.value = String(Math.floor(1000 + Math.random() * 9000))
}
</script>

<template>
  <section id="book" class="book" aria-labelledby="book-title">
    <div class="wrap">
      <h2 id="book-title" class="h2">Your ticket.</h2>

      <div class="plate">
      <div class="ticket">
        <!-- stub -->
        <div class="stub" aria-live="polite">
          <p class="stub__no num">No. {{ ticketNo }}</p>
          <p class="stub__time">
            <template v-if="slot">
              <span class="d">{{ slot.day }}, {{ slot.date }}</span>
              <span class="t num">{{ slot.time }}</span>
            </template>
            <template v-else>
              <span class="d">No time yet</span>
              <span class="t t--empty">Pick a time</span>
            </template>
          </p>
          <p class="stub__svc">
            {{ booking.serviceName || 'Service' }}
            <span v-if="service" class="num"> · ${{ service.price }}</span>
          </p>
          <div v-if="design" class="stub__design">
            <NailTip :design="design" />
            <span>{{ design.name }}</span>
          </div>
          <p class="stub__fine">Keep this stub · {{ salon.name }}</p>
        </div>

        <!-- form -->
        <div class="body">
          <form v-if="state !== 'done'" novalidate @submit.prevent="submit">
            <div class="field">
              <label for="f-service">Service</label>
              <select id="f-service" v-model="booking.serviceName" :aria-invalid="!!errors.service" aria-describedby="e-service">
                <option value="" disabled>Choose a service…</option>
                <optgroup v-for="g in menu" :key="g.id" :label="g.title">
                  <option v-for="it in g.items.filter((i) => !i.from)" :key="it.name" :value="it.name">
                    {{ it.name }} — ${{ it.price }}
                  </option>
                </optgroup>
              </select>
              <p v-if="errors.service" id="e-service" class="err">{{ errors.service }}</p>
            </div>

            <div class="field">
              <label for="f-design">Design <span class="opt">(optional)</span></label>
              <select id="f-design" v-model="booking.designId">
                <option value="">Surprise me / decide in the chair</option>
                <option v-for="d in designs" :key="d.id" :value="d.id">{{ d.name }}</option>
              </select>
            </div>

            <fieldset class="field">
              <legend>Time</legend>
              <div class="slots" role="radiogroup" aria-describedby="e-slot">
                <label v-for="s in booking.slots" :key="s.id" class="slot">
                  <input type="radio" name="slot" :value="s.id" v-model="booking.slotId" />
                  <span><b>{{ s.day }}</b> <span class="num">{{ s.time }}</span></span>
                </label>
              </div>
              <p v-if="errors.slot" id="e-slot" class="err">{{ errors.slot }}</p>
            </fieldset>

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

            <button class="btn btn--pink submit" type="submit">Hold my chair</button>
            <p class="hint">Free to cancel up to 2 hours before <span class="sample">sample policy</span></p>
          </form>

          <div v-else class="done" role="status">
            <p class="done__big">One last tap, {{ form.name.trim() }}.</p>
            <p>
              Send us the text below to lock in <b>{{ booking.serviceName }}</b>
              on <b>{{ slot?.day }} at {{ slot?.time }}</b>. We'll reply to
              <span class="num">{{ prettyPhone }}</span> to confirm.
            </p>
            <div class="done__row">
              <a class="btn btn--pink" :href="smsHref">Text the salon</a>
              <a class="call" :href="salon.phoneHref">or call <span class="num">{{ salon.phone }}</span></a>
            </div>
            <button class="again" type="button" @click="reset">Start over</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book { padding-block: clamp(72px, 11vw, 140px); }
.book .h2 { margin-bottom: clamp(28px, 4vw, 48px); }

.plate { position: relative; --split: 34%; --notch: 18px; }
.plate::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: var(--pink);
  transform: translate(8px, 9px);
  /* punch the same notches through the plate so the holes show the page */
  -webkit-mask:
    radial-gradient(circle var(--notch) at calc(var(--split) - 8px) -9px, transparent 98%, #000) top / 100% 51% no-repeat,
    radial-gradient(circle var(--notch) at calc(var(--split) - 8px) calc(100% - 9px), transparent 98%, #000) bottom / 100% 51% no-repeat;
  mask:
    radial-gradient(circle var(--notch) at calc(var(--split) - 8px) -9px, transparent 98%, #000) top / 100% 51% no-repeat,
    radial-gradient(circle var(--notch) at calc(var(--split) - 8px) calc(100% - 9px), transparent 98%, #000) bottom / 100% 51% no-repeat;
}
.ticket {
  position: relative;
  --notch: 18px;
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) 1.6fr;
  background: var(--card);
  border-radius: 26px;

  /* punched notches where the stub meets the body */
  -webkit-mask:
    radial-gradient(circle var(--notch) at var(--split) 0, transparent 98%, #000) top / 100% 51% no-repeat,
    radial-gradient(circle var(--notch) at var(--split) 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
  mask:
    radial-gradient(circle var(--notch) at var(--split) 0, transparent 98%, #000) top / 100% 51% no-repeat,
    radial-gradient(circle var(--notch) at var(--split) 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
  --split: 34%;
}

.stub {
  background: var(--ink);
  color: var(--on-ink);
  border-radius: 26px 0 0 26px;
  padding: clamp(24px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-right: 3px dashed var(--paper);
  position: relative;
  overflow: hidden;
}
.stub::after {
  content: '';
  position: absolute;
  right: -90px;
  bottom: -90px;
  width: 260px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: radial-gradient(circle, var(--pink) 0 38%, transparent 40%);
  background-size: 11px 11px;
  opacity: 0.9;
  pointer-events: none;
}
.stub p { margin: 0; position: relative; z-index: 1; }
.stub__no { font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.85; }
.stub__time { display: grid; }
.stub__time .d { font-weight: 600; }
.stub__time .t {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(3rem, 6vw, 4.8rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--accent-on-ink);
}
.stub__time .t--empty { font-size: clamp(2rem, 3.4vw, 2.6rem); color: var(--on-ink); opacity: 0.9; }
.stub__svc { font-family: var(--display); font-weight: 700; font-size: 1.3rem; letter-spacing: -0.01em; }
.stub__design { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
.stub__design .tip { --w: 30px; }
.stub__fine { margin-top: auto !important; font-size: 0.8rem; opacity: 0.8; }

.body { padding: clamp(24px, 3.4vw, 48px); }
form { display: grid; gap: 22px; }
.field { display: grid; gap: 8px; border: 0; margin: 0; padding: 0; min-width: 0; }
label, legend { font-weight: 600; font-size: 0.95rem; padding: 0; }
.opt { font-weight: 400; }
select, input:not([type='radio']) {
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 0.8em 1em;
  width: 100%;
  caret-color: var(--pink);
  transition: border-color 0.2s, background-color 0.2s;
}
select:focus-visible, input:focus-visible { outline: 0; border-color: var(--pink); background: var(--card); }
[aria-invalid='true'] { border-color: var(--error) !important; }
::placeholder { color: color-mix(in srgb, var(--ink) 80%, transparent); }
.err { margin: 0; color: var(--error); font-size: 0.9rem; font-weight: 500; }

.slots { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
.slot input { position: absolute; opacity: 0; pointer-events: none; }
.slot span {
  display: inline-block;
  padding: 0.55em 1em;
  border: 2px dashed color-mix(in srgb, var(--ink) 45%, transparent);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s, border-color 0.2s, transform 0.3s var(--ease-out);
}
.slot span span { display: inline; padding: 0; border: 0; }
.slot:hover > span { background: var(--pink-soft); }
.slot input:checked + span { background: var(--ink); color: var(--on-ink); border: 2px solid var(--ink); transform: rotate(-2deg); }
.slot input:focus-visible + span { outline: 3px solid var(--pink); outline-offset: 2px; }

.two { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.submit { justify-self: start; font-size: 1.1rem; padding: 1em 1.8em; }
.hint { margin: -6px 0 0; font-size: 0.9rem; }

.done { display: grid; gap: 16px; justify-items: start; align-content: center; min-height: 100%; }
.done p { margin: 0; max-width: 46ch; }
.done__row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 22px; }
.call { font-weight: 600; }
.again { border: 0; background: none; padding: 0; text-decoration: underline; text-underline-offset: 0.2em; font-size: 0.95rem; }
.done__big { font-family: var(--display); font-weight: 800; font-size: clamp(2.2rem, 4vw, 3.4rem); letter-spacing: -0.035em; line-height: 1; }

@media (max-width: 820px) {
  .ticket { grid-template-columns: 1fr; -webkit-mask: none; mask: none; }
  .plate::before { -webkit-mask: none; mask: none; }
  .stub { border-radius: 26px 26px 0 0; border-right: 0; border-bottom: 3px dashed var(--paper); }
  .two { grid-template-columns: 1fr; }
}
</style>
