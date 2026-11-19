// ─────────────────────────────────────────────────────────────
//  SAMPLE CONTENT — replace with the salon's real details.
//  Name, prices, address, phone and hours below are placeholders.
// ─────────────────────────────────────────────────────────────

export const salon = {
  name: 'Petal & Polish',
  short: 'P&P',
  phone: '(555) 014-2290',
  phoneHref: 'tel:+15550142290',
  street: '214 Bedford Ave',
  city: 'Brooklyn, NY 11211',
  instagram: '@petalandpolish',
  hours: [
    { days: 'Mon – Fri', time: '10:00 AM – 8:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 7:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ],
}

export const menu = [
  {
    id: 'mani',
    title: 'Manicures',
    note: 'Includes shaping, cuticle care & a hand massage',
    items: [
      { name: 'Classic Manicure', time: '30 min', price: 25 },
      { name: 'Gel Manicure', time: '45 min', price: 40 },
      { name: 'Russian Manicure', time: '75 min', price: 55, tag: 'Euro favorite' },
      { name: 'Milky French Gel', time: '60 min', price: 50 },
    ],
  },
  {
    id: 'pedi',
    title: 'Pedicures',
    note: 'Warm soak, scrub, mask & polish of your choice',
    items: [
      { name: 'Classic Pedicure', time: '40 min', price: 35 },
      { name: 'Spa Pedicure', time: '55 min', price: 50 },
      { name: 'Jelly Pedicure', time: '60 min', price: 60, tag: 'So squishy' },
    ],
  },
  {
    id: 'ext',
    title: 'Extensions',
    note: 'Any length, any shape — almond, coffin, square, oval',
    items: [
      { name: 'Gel-X Full Set', time: '90 min', price: 70 },
      { name: 'Acrylic Full Set', time: '80 min', price: 55 },
      { name: 'Dip Powder', time: '60 min', price: 48 },
      { name: 'Fill-in', time: '50 min', price: 40 },
    ],
  },
  {
    id: 'art',
    title: 'Art & little extras',
    note: 'Add to any service',
    items: [
      { name: 'Hand-painted art', time: 'per nail', price: 5, from: true },
      { name: 'Chrome / glazed finish', time: '+10 min', price: 10 },
      { name: 'Gel removal', time: '15 min', price: 10 },
      { name: 'Paraffin dip', time: '10 min', price: 10 },
    ],
  },
]


// Open slots: generated from "now" so the demo always looks live.
// Swap for real availability from your booking system.
const TIMES = ['10:30', '11:45', '13:00', '14:30', '16:00', '17:15', '18:30']

export function upcomingSlots(count = 8, now = new Date()) {
  const out = []
  for (let d = 0; out.length < count && d < 7; d++) {
    const day = new Date(now)
    day.setDate(now.getDate() + d)
    for (const t of TIMES) {
      const [h, m] = t.split(':').map(Number)
      const at = new Date(day)
      at.setHours(h, m, 0, 0)
      if (at - now < 45 * 60 * 1000) continue
      // deterministic "already booked" gaps so the strip looks real
      if ((day.getDate() + h) % 3 === 0) continue
      out.push({
        id: at.toISOString(),
        day: d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : at.toLocaleDateString('en-US', { weekday: 'short' }),
        date: at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: at.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      })
      if (out.length >= count) break
    }
  }
  return out
}
