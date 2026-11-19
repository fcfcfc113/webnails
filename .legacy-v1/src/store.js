import { reactive } from 'vue'
import { upcomingSlots } from './data.js'

// Tiny shared booking state — no Pinia needed for one page.
export const booking = reactive({
  slots: upcomingSlots(10),
  slotId: null,
  serviceName: '',
  designId: '',
  torn: new Set(),
})

export function pickSlot(id) {
  booking.slotId = id
  booking.torn.add(id)
}

export function pickDesign(id) {
  booking.designId = id
}

export function goToBooking() {
  const el = document.getElementById('book')
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  setTimeout(() => el.querySelector('select, input')?.focus({ preventScroll: true }), reduce ? 0 : 650)
}
