// ─────────────────────────────────────────────────────────────
//  Seasonal "print runs". Same flyer, different Riso inks, stock,
//  copy, nail designs and menu specials per season.
//  Specials prices are SAMPLES like the rest of the menu.
// ─────────────────────────────────────────────────────────────

// Flat-ink pattern helpers (tone = dot screens & stripes, never smooth blends)
const dots = (c, size = 10, p = 38, off = '0 0') =>
  `radial-gradient(circle, ${c} 0 ${p}%, transparent ${p + 2}%) ${off} / ${size}px ${size}px`
const stripes = (a, b, w = 8, deg = 45) => `repeating-linear-gradient(${deg}deg, ${a} 0 ${w}px, ${b} ${w}px ${w * 2}px)`
const french = (c, depth = 34) => `radial-gradient(120% ${depth}% at 50% 0%, ${c} 0 62%, transparent 63%)`
const cuticle = (c, size = 6) =>
  [36, 50, 64].map((x) => `radial-gradient(circle at ${x}% 82%, ${c} 0 ${size}%, transparent ${size + 1}%)`).join(',')
const speckle = (c) =>
  [[22, 18, 4], [64, 26, 3], [40, 44, 5], [72, 58, 3.5], [28, 66, 3], [55, 80, 4.5], [80, 84, 2.5], [18, 88, 3]]
    .map(([x, y, r]) => `radial-gradient(circle at ${x}% ${y}%, ${c} 0 ${r}%, transparent ${r + 0.6}%)`)
    .join(',')
const plaid = (a, b, base) =>
  `repeating-linear-gradient(0deg, ${a} 0 5px, transparent 5px 16px), repeating-linear-gradient(90deg, ${a} 0 5px, transparent 5px 16px), repeating-linear-gradient(0deg, transparent 0 9px, ${b} 9px 10px, transparent 10px 16px), repeating-linear-gradient(90deg, transparent 0 9px, ${b} 9px 10px, transparent 10px 16px), ${base}`
const citrus = (flesh, pith, rind, base) =>
  `radial-gradient(circle at 50% 58%, ${pith} 0 7%, transparent 8%), radial-gradient(circle at 50% 58%, transparent 0 36%, ${rind} 37% 43%, transparent 44%), radial-gradient(circle at 50% 58%, transparent 0 43%, ${base} 44%), repeating-conic-gradient(from 0deg at 50% 58%, ${flesh} 0 26deg, ${pith} 26deg 30deg)`

// Motifs: authored 24×24 SVG paths, filled flat in one ink.
export const MOTIFS = {
  heart: { d: 'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.2 0 3.6 1.3 5.4 3.3 1.8-2 3.2-3.3 5.4-3.3 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z' },
  star: { d: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z' },
  sparkle: { d: 'M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z' },
  bow: { d: 'M12 11.5C9.5 8 4.5 5.8 3.4 8.8s3.6 5.6 8.6 3.7zm0 0c2.5-3.5 7.5-5.7 8.6-2.7s-3.6 5.6-8.6 3.7zM11 12.5l-3.2 8.2 2.3-.9 1.2 2 .7-9.3zm2 0l3.2 8.2-2.3-.9-1.2 2-.7-9.3zM12 10.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  bunny: { d: 'M8.4 12.5C6.6 8 6.4 2.5 8.2 2.5s2.5 5.4 1.9 10zm7.2 0c1.8-4.5 2-10 .2-10s-2.5 5.4-1.9 10zM12 10.5a5.5 5 0 1 1 0 10 5.5 5 0 0 1 0-10z' },
  daisy: { d: 'M12 3.5a2.4 2.4 0 0 1 2.3 3.1 2.4 2.4 0 0 1 3.6 2.6 2.4 2.4 0 0 1 0 5.6 2.4 2.4 0 0 1-3.6 2.6 2.4 2.4 0 0 1-4.6 0 2.4 2.4 0 0 1-3.6-2.6 2.4 2.4 0 0 1 0-5.6 2.4 2.4 0 0 1 3.6-2.6A2.4 2.4 0 0 1 12 3.5z', center: true },
  ghost: { d: 'M12 2.5a7.2 7.2 0 0 0-7.2 7.2v11.6l2.4-1.8 2.4 1.8 2.4-1.8 2.4 1.8 2.4-1.8 2.4 1.8V9.7A7.2 7.2 0 0 0 12 2.5z', eyes: true },
  web: { stroke: 'M12 12V1.5M12 12l9.5-5.5M12 12l9.5 5.5M12 12v10.5M12 12l-9.5 5.5M12 12L2.5 6.5M12 4.5l6.5 3.8v7.4L12 19.5l-6.5-3.8V8.3zM12 8.2l3.3 1.9v3.8L12 15.8l-3.3-1.9v-3.8z' },
  drip: { d: 'M0 0h24v6c-1 0-1 4-2 4s-1-3-2-3-1 7-2.5 7S16 6 15 6s-1 3-2 3-1-3-2-3-1 9-2.5 9S7 6 6 6s-1 4-2 4-1-4-2-4V0z', top: true },
  leaf: { d: 'M4 20C4 10 10 4 20 4c0 10-6 16-16 16z', vein: 'M5 19L15 9' },
  snowflake: { stroke: 'M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5M3 10.3l3.4.7-1.1 3.3M21 10.3l-3.4.7 1.1 3.3' },
  cat: { d: 'M5 21V9l2.2-5.5L10 8h4l2.8-4.5L19 9v12z', eyes: true },
  pumpkin: { d: 'M12 7c5.5 0 8.5 3 8.5 7S17.5 21 12 21s-8.5-3-8.5-7S6.5 7 12 7zM11 3h2.5l-.5 4h-2z', ribs: true },
}

const SIGNATURE = {
  id: 'signature',
  name: 'Signature',
  months: 'Year-round',
  tokens: {
    paper: '#f5f6f8', 'paper-2': '#eceef3', card: '#ffffff',
    ink: '#2b3e91', 'ink-deep': '#151f55', 'on-ink': '#ffffff', 'accent-on-ink': '#ff48b0',
    pink: '#ff48b0', 'pink-soft': '#ffc2e3', 'on-primary': '#151f55',
    aqua: '#5ec8e5', 'on-secondary': '#151f55',
    sun: '#ffe14d', violet: '#5a2e84', error: '#b0124f', blend: 'multiply',
  },
  hero: ['Paris-pretty', 'nails, ready', 'by lunch.'],
  lede: "Russian manicures, Gel-X and hand-painted art by a small crew who sweat the cuticle details. Tear off a time below — it's yours.",
  stamp: ['Tear', 'a tab'],
  railTitle: ['Pick a tip,', 'any tip.'],
  railLede: "This season's most-asked sets. Tap one and we'll add it to your booking — your tech will tweak it to your hands.",
  cta: 'Your hands deserve a little Paris.',
  fan: ['milky', 'cherry', 'glaze', 'checker', 'aura'],
  designs: [
    { id: 'milky', name: 'Milky French', vibe: 'Clean-girl classic', bg: `${french('#fff')}, #f9dbe9` },
    { id: 'cherry', name: 'Cherry Dots', vibe: 'Picnic in Montmartre', bg: `${dots('#2b3e91', 14, 26)}, #ff48b0` },
    { id: 'checker', name: 'Blue Gingham', vibe: 'Café tablecloth', bg: plaid('rgb(43 62 145 / .5)', 'rgb(43 62 145 / .25)', '#fff') },
    { id: 'glaze', name: 'Glazed Pearl', vibe: 'Donut-shine pearl', bg: `${dots('#5ec8e5', 7, 30, '3px 3px')}, ${dots('#ffc2e3', 10, 44)}, #fff` },
    { id: 'daisy', name: 'Daisy Chain', vibe: 'Sunday market', bg: '#5ec8e5', motif: 'daisy', ink: '#fff', dot: '#ffe14d' },
    { id: 'aura', name: 'Pink Aura', vibe: 'Soft-focus blush', bg: `radial-gradient(42% 30% at 50% 58%, #ff48b0 0 100%, transparent 101%), ${dots('#ff48b0', 8, 40)}, #ffe6f3` },
    { id: 'swirl', name: 'Aqua Swirl', vibe: 'Riviera water', bg: 'repeating-radial-gradient(circle at 30% 80%, #5ec8e5 0 7px, #fff 7px 13px, #2b3e91 13px 15px, #fff 15px 21px)' },
    { id: 'bow', name: 'Ribbon Tip', vibe: 'Coquette bow', bg: `${french('#ff48b0', 22)}, #ffeef7`, motif: 'bow', ink: '#ff48b0' },
  ],
  special: null,
}

export const SEASONS = [
  SIGNATURE,
  {
    id: 'valentine',
    name: "Valentine's",
    months: 'February',
    tokens: {
      paper: '#fff4f7', 'paper-2': '#fbe1ea', card: '#ffffff',
      ink: '#a8102f', 'ink-deep': '#4a0516', 'on-ink': '#ffffff', 'accent-on-ink': '#ffb8cf',
      pink: '#ff5c8f', 'pink-soft': '#ffd3e1', 'on-primary': '#3d0412',
      aqua: '#ffc7d8', 'on-secondary': '#4a0516',
      sun: '#ffe9ef', violet: '#6e0a2b', error: '#a8102f', blend: 'multiply',
    },
    hero: ['Hearts on', 'every tip,', 'be mine.'],
    lede: 'Chrome hearts, heart-French tips and coquette bows, painted by hand for date night, Galentine’s, or just because.',
    stamp: ['Be', 'mine'],
    railTitle: ['Love at', 'first tip.'],
    railLede: 'Our February sets. Tap one and we’ll add it to your booking.',
    cta: 'Your hands deserve a little love note.',
    fan: ['heartfrench', 'chromeheart', 'bow', 'redlove', 'kiss'],
    designs: [
      { id: 'heartfrench', name: 'Heart French', vibe: 'Tiny hearts on the tip', bg: `${french('#ff5c8f', 30)}, #fde3ea`, motif: 'heart', ink: '#ff5c8f', size: 30, y: 14 },
      { id: 'chromeheart', name: 'Chrome Hearts', vibe: 'Silver mirror shine', bg: `${dots('#c9d1dc', 6, 44, '2px 2px')}, ${dots('#ffffff', 9, 38)}, #e4e8ee`, motif: 'heart', ink: '#a8b3c2' },
      { id: 'bow', name: 'Coquette Bow', vibe: 'Ribbon & pearls', bg: `${cuticle('#fff', 5)}, #ffd3e1`, motif: 'bow', ink: '#ff5c8f' },
      { id: 'redlove', name: 'Red Velvet', vibe: 'Classic crimson', bg: `${dots('#7a0a22', 7, 30)}, #c8102e` },
      { id: 'kiss', name: 'XOXO', vibe: 'Love letters', bg: `${stripes('#fff', '#ffd3e1', 6, -45)}`, motif: 'heart', ink: '#c8102e', size: 38 },
      { id: 'candyheart', name: 'Candy Hearts', vibe: 'Conversation hearts', bg: `${speckle('#ff5c8f')}, #fff0b8`, motif: 'heart', ink: '#ff8fb3', size: 40 },
      { id: 'sheerblush', name: 'Sheer Blush', vibe: 'Barely-there pink', bg: `${dots('#ffb3c9', 9, 30)}, #ffe8ef` },
      { id: 'cupid', name: 'Cupid’s Arrow', vibe: 'Red & pink stripes', bg: stripes('#ff5c8f', '#c8102e', 7, 0) },
    ],
    special: {
      id: 'season', title: 'Valentine’s specials', note: 'February only',
      items: [
        { name: 'Heart French Gel', time: '60 min', price: 55, tag: 'Most booked' },
        { name: 'Chrome Hearts Set', time: '75 min', price: 65 },
        { name: 'Galentine’s Duo Mani', time: '2 chairs', price: 90 },
      ],
    },
  },
  {
    id: 'spring',
    name: 'Spring & Easter',
    months: 'March – April',
    tokens: {
      paper: '#f6fbf3', 'paper-2': '#e5f2df', card: '#ffffff',
      ink: '#3a4db0', 'ink-deep': '#1a2466', 'on-ink': '#ffffff', 'accent-on-ink': '#ffd36b',
      pink: '#ffb0d0', 'pink-soft': '#ffe0ec', 'on-primary': '#1a2466',
      aqua: '#b6e8c6', 'on-secondary': '#1a2466',
      sun: '#ffe66d', violet: '#7f62c9', error: '#b0124f', blend: 'multiply',
    },
    hero: ['Fresh petals,', 'pastel tips,', 'hello spring.'],
    lede: 'Daisies, speckled-egg pastels, bunny ears and soft aura nails. Spring cleaning, but for your cuticles.',
    stamp: ['Hello', 'spring'],
    railTitle: ['In full', 'bloom.'],
    railLede: 'Pastel sets for brunch, Easter and every sunny Saturday.',
    cta: 'Your hands deserve a fresh start.',
    fan: ['daisy', 'egg', 'bunny', 'lilac', 'mintaura'],
    designs: [
      { id: 'daisy', name: 'Daisy Nails', vibe: 'Picked this morning', bg: '#bfe6ff', motif: 'daisy', ink: '#fff', dot: '#ffd23f' },
      { id: 'egg', name: 'Speckled Egg', vibe: 'Robin’s egg blue', bg: `${speckle('#3a4db0')}, #b9e3ec` },
      { id: 'bunny', name: 'Bunny Ears', vibe: 'Hop to it', bg: '#ffe0ec', motif: 'bunny', ink: '#ffffff', keyline: true },
      { id: 'lilac', name: 'Lilac Milk', vibe: 'Pastel purple', bg: `${french('#fff', 28)}, #d9c8ff` },
      { id: 'mintaura', name: 'Mint Aura', vibe: 'Soft-focus mint', bg: `radial-gradient(40% 28% at 50% 58%, #7ddfa8 0 100%, transparent 101%), ${dots('#7ddfa8', 8, 38)}, #ecfff3` },
      { id: 'peach', name: 'Peach Pastel', vibe: 'Sorbet stripes', bg: stripes('#ffc9a8', '#fff1e6', 7, 90) },
      { id: 'tulip', name: 'Tulip Field', vibe: 'Pink petals, green stems', bg: `${dots('#ff8fb8', 13, 30)}, ${stripes('#c9f0d2', '#e8fbe9', 4, 90)}` },
      { id: 'butter', name: 'Butter Yellow', vibe: 'Spring’s it-color', bg: `${dots('#ffd23f', 9, 28)}, #fff3b0` },
    ],
    special: {
      id: 'season', title: 'Spring specials', note: 'March & April',
      items: [
        { name: 'Daisy Art Gel Mani', time: '60 min', price: 52, tag: 'New' },
        { name: 'Speckled Egg Set', time: '60 min', price: 50 },
        { name: 'Mommy & Me Mani', time: '2 chairs', price: 60 },
      ],
    },
  },
  {
    id: 'prom',
    name: 'Prom & Wedding',
    months: 'April – June',
    tokens: {
      paper: '#f6f5f8', 'paper-2': '#eae8ef', card: '#ffffff',
      ink: '#433b5a', 'ink-deep': '#1e1a2c', 'on-ink': '#ffffff', 'accent-on-ink': '#f0cfdb',
      pink: '#f3c6d4', 'pink-soft': '#fae5ec', 'on-primary': '#1e1a2c',
      aqua: '#dad6ee', 'on-secondary': '#1e1a2c',
      sun: '#ead6a8', violet: '#5f4f78', error: '#a3123f', blend: 'multiply',
    },
    hero: ['Bridal glaze,', 'pearl chrome,', 'photo-ready.'],
    lede: 'Glazed-donut pearls, sheer pink, the perfect French and a little rhinestone sparkle. Booked for prom, the wedding, or the whole bridal party.',
    stamp: ['Say', 'yes'],
    railTitle: ['Ready for', 'the aisle.'],
    railLede: 'Elegant sets that photograph beautifully, from prom night to the wedding day.',
    cta: 'Your hands deserve their close-up.',
    fan: ['classicfrench', 'pearlglaze', 'sheer', 'stones', 'bridal'],
    designs: [
      { id: 'classicfrench', name: 'Classic French', vibe: 'Timeless white tip', bg: `${french('#fff', 30)}, #f7dfe6` },
      { id: 'pearlglaze', name: 'Glazed Donut', vibe: 'Pearl chrome shine', bg: `${dots('#ffffff', 6, 46, '2px 2px')}, ${dots('#e9dfee', 10, 40)}, #f6eef3` },
      { id: 'sheer', name: 'Sheer Pink', vibe: 'Your nails, but better', bg: `${dots('#f3c6d4', 8, 26)}, #fbe9ee` },
      { id: 'stones', name: 'Rhinestone Cuticle', vibe: 'A little sparkle', bg: `${cuticle('#ffffff', 6)}, ${dots('#ffffff', 5, 24, '1px 1px')}, #f0d9e2`, motif: 'sparkle', ink: '#fff', size: 26, y: 22 },
      { id: 'bridal', name: 'Bridal Lace', vibe: 'Something blue? No, white', bg: `${dots('#ffffff', 9, 42)}, ${dots('#ffffff', 9, 20, '4.5px 4.5px')}, #e9e4f2` },
      { id: 'champagne', name: 'Champagne Toast', vibe: 'Gold shimmer', bg: `${dots('#c9a75d', 5, 34)}, #f1e3bf` },
      { id: 'mauve', name: 'Mauve Bridesmaid', vibe: 'For the whole party', bg: `${french('#f3c6d4', 26)}, #b99aaa` },
      { id: 'microfrench', name: 'Micro French', vibe: 'Hair-thin tip', bg: `${french('#fff', 16)}, #f5d7df` },
    ],
    special: {
      id: 'season', title: 'Prom & wedding', note: 'Book 2+ weeks ahead for parties',
      items: [
        { name: 'Bridal Gel-X Set', time: '100 min', price: 95, tag: 'Bride' },
        { name: 'Prom Glam Set', time: '90 min', price: 75 },
        { name: 'Bridal Party Mani', time: 'per person', price: 40, from: true },
      ],
    },
  },
  {
    id: 'summer',
    name: 'Summer & 4th of July',
    months: 'June – July',
    tokens: {
      paper: '#ffffff', 'paper-2': '#eaf3ff', card: '#ffffff',
      ink: '#0b3ccc', 'ink-deep': '#071d5c', 'on-ink': '#ffffff', 'accent-on-ink': '#ffee32',
      pink: '#ff3d66', 'pink-soft': '#ffccd7', 'on-primary': '#071d5c',
      aqua: '#2fe3c6', 'on-secondary': '#071d5c',
      sun: '#ffee32', violet: '#5a1ba8', error: '#c5002f', blend: 'multiply',
    },
    hero: ['Neon tips,', 'sun’s out,', 'pool’s open.'],
    lede: 'Neon brights, tropical fruit, beach blues and star-spangled sets for the pool party, the BBQ and the fireworks.',
    stamp: ['Stay', 'cool'],
    railTitle: ['Hot girl', 'summer.'],
    railLede: 'Bright sets that survive sunscreen, salt water and sparklers.',
    cta: 'Your hands deserve a vacation.',
    fan: ['stars', 'lemon', 'neonpink', 'flag', 'wave'],
    designs: [
      { id: 'stars', name: 'Star-Spangled', vibe: 'Fourth of July', bg: '#0b3ccc', motif: 'star', ink: '#ffffff', size: 44 },
      { id: 'flag', name: 'Red, White & Blue', vibe: 'Stripes for the parade', bg: `${french('#0b3ccc', 30)}, ${stripes('#ff3d66', '#ffffff', 7, 0)}` },
      { id: 'lemon', name: 'Lemon Slice', vibe: 'Fresh-squeezed', bg: citrus('#ffe14d', '#fffbe0', '#7ed957', '#fffbe0') },
      { id: 'neonpink', name: 'Neon Pink', vibe: 'Glows by the pool', bg: `${dots('#ff006e', 7, 30)}, #ff4fa3` },
      { id: 'wave', name: 'Ocean Wave', vibe: 'Beach day blues', bg: 'repeating-radial-gradient(circle at 50% 120%, #2fe3c6 0 8px, #ffffff 8px 12px, #0b3ccc 12px 16px, #ffffff 16px 20px)' },
      { id: 'lime', name: 'Lime Neon', vibe: 'Margarita green', bg: citrus('#b6f23a', '#f4ffe0', '#3e9b1e', '#f4ffe0') },
      { id: 'watermelon', name: 'Watermelon', vibe: 'Seeds included', bg: `${french('#2fbf55', 18)}, ${speckle('#1b1b1b')}, #ff5577` },
      { id: 'sunset', name: 'Sunset Stripe', vibe: 'Golden hour', bg: stripes('#ff9f1c', '#ff3d66', 9, 0) },
    ],
    special: {
      id: 'season', title: 'Summer specials', note: 'June & July',
      items: [
        { name: 'Neon Gel Pedicure', time: '55 min', price: 55, tag: 'Pool-proof' },
        { name: 'Fourth of July Art', time: '+15 min', price: 15 },
        { name: 'Tropical Fruit Set', time: '75 min', price: 65 },
      ],
    },
  },
  {
    id: 'fall',
    name: 'Fall / Autumn',
    months: 'September – October',
    tokens: {
      paper: '#f2e8db', 'paper-2': '#e6d8c5', card: '#fbf6ef',
      ink: '#5a3720', 'ink-deep': '#2a170b', 'on-ink': '#fbf3e8', 'accent-on-ink': '#f2a85b',
      pink: '#c2531c', 'pink-soft': '#f2c6a5', 'on-primary': '#ffffff',
      aqua: '#6f7336', 'on-secondary': '#ffffff',
      sun: '#e3a93a', violet: '#5e2a14', error: '#9c1f12', blend: 'multiply',
    },
    hero: ['Cozy tips,', 'matte plaid,', 'hello fall.'],
    lede: 'Tortoiseshell, plaid, burnt orange and matte top coats that feel like your favorite sweater. Pumpkin spice optional.',
    stamp: ['Cozy', 'vibes'],
    railTitle: ['Sweater', 'weather.'],
    railLede: 'Earth tones and textures for apple picking, game day and everything in between.',
    cta: 'Your hands deserve a cozy season.',
    fan: ['tortoise', 'plaid', 'burnt', 'sweater', 'olive'],
    designs: [
      { id: 'tortoise', name: 'Tortoiseshell', vibe: 'Vintage glasses frame', bg: `radial-gradient(circle at 30% 30%, #2a170b 0 9%, transparent 10%), radial-gradient(circle at 70% 48%, #2a170b 0 7%, transparent 8%), radial-gradient(circle at 40% 70%, #2a170b 0 10%, transparent 11%), radial-gradient(circle at 25% 52%, #8a4a17 0 14%, transparent 15%), radial-gradient(circle at 66% 22%, #8a4a17 0 12%, transparent 13%), radial-gradient(circle at 64% 80%, #8a4a17 0 13%, transparent 14%), #c47a2c` },
      { id: 'plaid', name: 'Flannel Plaid', vibe: 'Cabin weekend', bg: plaid('rgb(90 20 10 / .55)', 'rgb(255 230 180 / .55)', '#d35f27') },
      { id: 'burnt', name: 'Burnt Orange Matte', vibe: 'Velvet-flat finish', bg: '#d35f27', gloss: false },
      { id: 'sweater', name: 'Cable Knit', vibe: 'Sweater texture', bg: `${stripes('rgb(255 255 255 / .35)', 'transparent', 3, 60)}, ${stripes('rgb(0 0 0 / .12)', 'transparent', 3, -60)}, #e8dccb`, gloss: false },
      { id: 'olive', name: 'Olive Grove', vibe: 'Muted green matte', bg: `${dots('#6e7136', 7, 30)}, #8a8d48`, gloss: false },
      { id: 'leaf', name: 'Falling Leaf', vibe: 'Maple season', bg: '#f2c6a5', motif: 'leaf', ink: '#d35f27' },
      { id: 'chocolate', name: 'Chocolate Milk', vibe: 'Mocha French', bg: `${french('#5a3720', 30)}, #e8d3bf` },
      { id: 'mustard', name: 'Mustard Fleck', vibe: 'Harvest gold', bg: `${speckle('#5a3720')}, #e3a93a` },
    ],
    special: {
      id: 'season', title: 'Fall specials', note: 'September & October',
      items: [
        { name: 'Matte Tortoise Set', time: '75 min', price: 62, tag: 'Cozy pick' },
        { name: 'Pumpkin Spice Pedicure', time: '60 min', price: 58 },
        { name: 'Plaid Accent Nails', time: '+15 min', price: 12 },
      ],
    },
  },
  {
    id: 'halloween',
    name: 'Halloween',
    months: 'October',
    tokens: {
      paper: '#131015', 'paper-2': '#211b26', card: '#1d1822',
      ink: '#b8ff3c', 'ink-deep': '#131015', 'on-ink': '#131015', 'accent-on-ink': '#131015',
      pink: '#ff7a1a', 'pink-soft': '#2e2536', 'on-primary': '#131015',
      aqua: '#a07cff', 'on-secondary': '#131015',
      sun: '#b8ff3c', violet: '#ff3df0', error: '#ff6b6b', blend: 'screen',
    },
    hero: ['Boo-tiful', 'nails,', 'after dark.'],
    lede: 'Ghosts, spiderwebs, blood drips, velvet cat-eye and glow-in-the-dark tips. Spooky season starts at your fingertips.',
    stamp: ['Trick', 'or treat'],
    railTitle: ['Spooky', 'season.'],
    railLede: 'Pick your poison. Glow-in-the-dark top coat available on any set.',
    cta: 'Your hands deserve a little haunting.',
    fan: ['ghost', 'web', 'drip', 'cateye', 'glow'],
    designs: [
      { id: 'ghost', name: 'Little Ghost', vibe: 'Boo!', bg: '#131015', motif: 'ghost', ink: '#ffffff', eyes: '#131015', keyline: true },
      { id: 'web', name: 'Spiderweb', vibe: 'Itsy bitsy', bg: '#131015', motif: 'web', ink: '#ffffff', size: 80, keyline: true },
      { id: 'drip', name: 'Blood Drip', vibe: 'Vampire French', bg: '#f3eee8', motif: 'drip', ink: '#b3001b' },
      { id: 'cateye', name: 'Velvet Cat-Eye', vibe: 'Magnetic shimmer', bg: `${dots('#a07cff', 5, 40, '1px 1px')}, #2a0f3d`, band: '#c9b2ff' },
      { id: 'glow', name: 'Glow Tips', vibe: 'Glows in the dark', bg: `${french('#b8ff3c', 32)}, #131015`, keyline: true },
      { id: 'pumpkin', name: 'Jack-o’-Lantern', vibe: 'Carved & cute', bg: '#131015', motif: 'pumpkin', ink: '#ff7a1a', keyline: true },
      { id: 'blackcat', name: 'Black Cat', vibe: 'Bad luck, good nails', bg: '#ff7a1a', motif: 'cat', ink: '#131015', eyes: '#b8ff3c' },
      { id: 'slime', name: 'Toxic Slime', vibe: 'Neon green ooze', bg: `${dots('#7ccf00', 8, 34)}, #b8ff3c` },
    ],
    special: {
      id: 'season', title: 'Halloween specials', note: 'October only',
      items: [
        { name: 'Velvet Cat-Eye Gel', time: '60 min', price: 55, tag: 'Spooky fave' },
        { name: 'Glow-in-the-Dark Top Coat', time: '+10 min', price: 10 },
        { name: 'Spooky Art (2 nails)', time: '+15 min', price: 12 },
      ],
    },
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    months: 'November',
    tokens: {
      paper: '#f5ede3', 'paper-2': '#e9dccb', card: '#fcf8f2',
      ink: '#6a3b1b', 'ink-deep': '#2d180a', 'on-ink': '#fdf6ec', 'accent-on-ink': '#e9c46a',
      pink: '#c27a33', 'pink-soft': '#ecd1ae', 'on-primary': '#2d180a',
      aqua: '#96603c', 'on-secondary': '#ffffff',
      sun: '#d8b23c', violet: '#5a2a10', error: '#9c1f12', blend: 'multiply',
    },
    hero: ['Thankful for', 'warm tones', '& gold foil.'],
    lede: 'Amber, brown chrome, gold-foil flakes and minimal autumn leaves. Neutral enough for dinner with the in-laws, pretty enough to show off.',
    stamp: ['Give', 'thanks'],
    railTitle: ['Warm &', 'grateful.'],
    railLede: 'Minimal fall art and warm neutrals for the long weekend.',
    cta: 'Your hands deserve a warm welcome.',
    fan: ['foil', 'amber', 'brownchrome', 'leafmin', 'nude'],
    designs: [
      { id: 'foil', name: 'Gold Foil Flake', vibe: 'Flecks of 24k', bg: `${speckle('#d8b23c')}, ${dots('#d8b23c', 6, 18)}, #f1e3d0` },
      { id: 'amber', name: 'Amber Glass', vibe: 'Honey-warm', bg: `${dots('#a85a12', 8, 30)}, #e59a3c` },
      { id: 'brownchrome', name: 'Brown Chrome', vibe: 'Mirror cocoa', bg: `${dots('#c99a6b', 6, 40, '2px 2px')}, ${dots('#8a5530', 9, 36)}, #6a3b1b` },
      { id: 'leafmin', name: 'Minimal Leaf', vibe: 'One little leaf', bg: '#efe2d0', motif: 'leaf', ink: '#c27a33', size: 40 },
      { id: 'nude', name: 'Warm Nude', vibe: 'Goes with everything', bg: `${french('#f6ead9', 24)}, #d9b394` },
      { id: 'cranberry', name: 'Cranberry', vibe: 'Sauce on the side', bg: `${dots('#5a0d1c', 7, 28)}, #8e1b33` },
      { id: 'pie', name: 'Pumpkin Pie', vibe: 'Whipped-cream tip', bg: `${french('#fff6e8', 28)}, #d9792b` },
      { id: 'goldfrench', name: 'Gold-Line French', vibe: 'Thin gilded tip', bg: `radial-gradient(120% 30% at 50% 0%, transparent 0 58%, #d8b23c 59% 64%, transparent 65%), #f1e3d0` },
    ],
    special: {
      id: 'season', title: 'Thanksgiving specials', note: 'November',
      items: [
        { name: 'Gold Foil Gel Mani', time: '60 min', price: 52, tag: 'Holiday pick' },
        { name: 'Brown Chrome Set', time: '75 min', price: 65 },
        { name: 'Family Pedi Party', time: 'per person', price: 35, from: true },
      ],
    },
  },
  {
    id: 'winter',
    name: 'Winter',
    months: 'January',
    tokens: {},
    hero: ['Frosted tips', 'for cold', 'bright days.'],
    lede: 'Icy blue chrome, milky snow-white French and cozy sweater textures. Your hot-cocoa season manicure.',
    stamp: ['Stay', 'cozy'],
    railTitle: ['Winter', 'wonderland.'],
    railLede: 'Cool tones and frosty shimmer to brighten the coldest weeks.',
    cta: 'Your hands deserve a warm-up.',
    fan: ['icechrome', 'snowfrench', 'flake', 'sweaterwhite', 'midnight'],
    designs: [
      { id: 'icechrome', name: 'Ice Chrome', vibe: 'Glacier mirror shine', bg: `${dots('#ffffff', 6, 40, '2px 2px')}, ${dots('#9fd3ff', 9, 36)}, #cfe6ff` },
      { id: 'snowfrench', name: 'Snow French', vibe: 'Milky white tip', bg: `${french('#ffffff', 30)}, #e4eef9` },
      { id: 'flake', name: 'Snowflake', vibe: 'One perfect flake', bg: '#3a6fd8', motif: 'snowflake', ink: '#ffffff', size: 56 },
      { id: 'sweaterwhite', name: 'Sweater White', vibe: 'Cable-knit matte', bg: `${stripes('rgb(255 255 255 / .5)', 'transparent', 3, 60)}, ${stripes('rgb(0 0 0 / .08)', 'transparent', 3, -60)}, #eef2f7`, gloss: false },
      { id: 'midnight', name: 'Midnight Shimmer', vibe: 'Deep navy sparkle', bg: `${dots('#9fd3ff', 5, 30, '1px 1px')}, #1f3f8a` },
      { id: 'frost', name: 'Frosted Lilac', vibe: 'Cold-weather pastel', bg: `${dots('#ffffff', 8, 30)}, #cdbff2` },
      { id: 'cocoa', name: 'Hot Cocoa', vibe: 'Marshmallow French', bg: `${french('#fff6ee', 26)}, #8a5a3c` },
      { id: 'icicle', name: 'Icicle Stripe', vibe: 'Blue & white', bg: stripes('#9fd3ff', '#ffffff', 5, 90) },
    ],
    special: {
      id: 'season', title: 'Winter specials', note: 'January',
      items: [
        { name: 'Ice Chrome Gel Mani', time: '60 min', price: 52, tag: 'New year pick' },
        { name: 'Paraffin Hand Warm-up', time: '15 min', price: 15 },
        { name: 'Hot Stone Pedicure', time: '60 min', price: 62 },
      ],
    },
  },
  {
    id: 'christmas',
    name: 'Christmas & NYE',
    months: 'December',
    tokens: {
      paper: '#f7f8f5', 'paper-2': '#e8ede6', card: '#ffffff',
      ink: '#0e5a39', 'ink-deep': '#06281a', 'on-ink': '#ffffff', 'accent-on-ink': '#f2d27a',
      pink: '#cf1530', 'pink-soft': '#f8d0d5', 'on-primary': '#ffffff',
      aqua: '#cbd5cf', 'on-secondary': '#06281a',
      sun: '#e9c766', violet: '#4a0811', error: '#b00d24', blend: 'multiply',
    },
    hero: ['Velvet tips,', 'candy canes', '& champagne.'],
    lede: 'Red velvet, snowflakes, candy canes, silver & gold glitter and champagne shimmer for the office party and the countdown.',
    stamp: ['Merry', '& bright'],
    railTitle: ['Festive', 'glam.'],
    railLede: 'Holiday sets that sparkle under string lights and survive gift-wrapping.',
    cta: 'Your hands deserve to sparkle.',
    fan: ['candycane', 'velvet', 'snow', 'goldglitter', 'champagne'],
    designs: [
      { id: 'candycane', name: 'Candy Cane', vibe: 'Peppermint stripes', bg: stripes('#cf1530', '#ffffff', 6, 45) },
      { id: 'velvet', name: 'Red Velvet', vibe: 'Magnetic shimmer', bg: `${dots('#ff5a6e', 5, 36, '1px 1px')}, #8a0c1f` },
      { id: 'snow', name: 'Snowflake', vibe: 'Let it snow', bg: '#9fc3e6', motif: 'snowflake', ink: '#ffffff', size: 54 },
      { id: 'goldglitter', name: 'Gold Glitter', vibe: 'All that glitters', bg: `${dots('#fff3c4', 5, 30, '2px 1px')}, ${dots('#b8902c', 7, 36)}, #e9c766` },
      { id: 'champagne', name: 'Champagne Shimmer', vibe: 'Midnight toast', bg: `${dots('#ffffff', 6, 26)}, #ead9b5` },
      { id: 'silver', name: 'Silver Disco', vibe: 'NYE countdown', bg: `${dots('#ffffff', 6, 40, '3px 3px')}, ${dots('#8d98a6', 6, 40)}, #c5ccd5` },
      { id: 'pine', name: 'Evergreen', vibe: 'Forest velvet', bg: `${dots('#1f7a52', 6, 34)}, #0e5a39` },
      { id: 'holly', name: 'Holly French', vibe: 'Red berries', bg: `${french('#0e5a39', 26)}, ${cuticle('#cf1530', 7)}, #fbf3f0` },
    ],
    special: {
      id: 'season', title: 'Holiday specials', note: 'December & New Year’s Eve',
      items: [
        { name: 'Velvet Gel Mani', time: '60 min', price: 55, tag: 'Party pick' },
        { name: 'NYE Glitter Set', time: '80 min', price: 70 },
        { name: 'Gift Card Mani Duo', time: '2 chairs', price: 85 },
      ],
    },
  },
]

// Month (1-12) → season id used in "Auto" mode.
const BY_MONTH = { 1: 'winter', 2: 'valentine', 3: 'spring', 4: 'spring', 5: 'prom', 6: 'prom', 7: 'summer', 8: 'summer', 9: 'fall', 10: 'halloween', 11: 'thanksgiving', 12: 'christmas' }
export const seasonForMonth = (m = new Date().getMonth() + 1) => BY_MONTH[m] || 'signature'
export const findSeason = (id) => SEASONS.find((s) => s.id === id) || SIGNATURE
