// ─────────────────────────────────────────────────────────────
//  Hand-authored sticker illustrations (viewBox 0 0 64 64).
//  Each renders as a die-cut sticker: white cut border + flat inks + dark keyline.
// ─────────────────────────────────────────────────────────────
const K = '#2b1d33' // keyline / dark details
const r1 = (n) => Math.round(n * 10) / 10
const polar = (cx, cy, r, deg) => [r1(cx + r * Math.cos((deg * Math.PI) / 180)), r1(cy + r * Math.sin((deg * Math.PI) / 180))]
const starPath = (cx, cy, R, r, n = 5, rot = -90) =>
  'M' + Array.from({ length: n * 2 }, (_, i) => polar(cx, cy, i % 2 ? r : R, rot + (i * 180) / n).join(' ')).join('L') + 'Z'
const heartPath = (cx, cy, s) =>
  `M${cx} ${cy + 10 * s}c${-4 * s} ${-3 * s} ${-11 * s} ${-8 * s} ${-11 * s} ${-14 * s} 0 ${-4 * s} ${3 * s} ${-7 * s} ${6.5 * s} ${-7 * s} ${2 * s} 0 ${3.6 * s} ${1.3 * s} ${4.5 * s} ${3 * s} ${0.9 * s} ${-1.7 * s} ${2.5 * s} ${-3 * s} ${4.5 * s} ${-3 * s} ${3.5 * s} 0 ${6.5 * s} ${3 * s} ${6.5 * s} ${7 * s} 0 ${6 * s} ${-7 * s} ${11 * s} ${-11 * s} ${14 * s}z`
const shine = (d) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" class="no-key"/>`

export const ICONS = {
  // ── nail anchor ──
  polish: (body = '#ff48b0', cap = K, mark = '#fff') => `
    <rect x="23" y="3" width="18" height="20" rx="4" fill="${cap}"/>
    <rect x="20" y="20" width="24" height="7" rx="2" fill="${cap}"/>
    <rect x="10" y="25" width="44" height="35" rx="13" fill="${body}"/>
    <path d="${heartPath(32, 38, 0.55)}" fill="${mark}"/>
    ${shine('M17 34c0-3 2-5 4-5')}`,

  // ── love ──
  heart: (c = '#ff4d7d') => `<path d="${heartPath(32, 33, 1.9)}" fill="${c}"/>${shine('M15 23c0-5 3-8 7-8')}`,
  envelope: () => `
    <rect x="7" y="15" width="50" height="36" rx="4" fill="#fff"/>
    <path d="M7 19L32 37L57 19" fill="none"/>
    <path d="${heartPath(32, 33, 0.6)}" fill="#e63950"/>`,
  rose: () => `
    <path d="M32 34C31 44 33 52 32 61" fill="none" stroke="#2f8f4e" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="41" cy="48" rx="8" ry="3.8" transform="rotate(-30 41 48)" fill="#3cb371"/>
    <path d="M18 22c0-9 6-14 14-14s14 5 14 14c0 8-6 14-14 14S18 30 18 22z" fill="#e63950"/>
    <path d="M26 23c0-5 4-8 8-6s3 8-1 9c-3 1-5-2-3-4" fill="none" stroke="#9e1230" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M19 18c4 2 6 6 6 10M45 18c-4 2-6 6-6 10" fill="none" stroke="#9e1230" stroke-width="2"/>`,
  arrow: () => `
    <path d="M10 54L50 14" stroke="#8a5a3c" stroke-width="4" stroke-linecap="round"/>
    <path d="M42 10L57 7L54 22z" fill="#e63950"/>
    <path d="M10 54l-1-11 6 5zM10 54l11 1-5-6z" fill="#ffb3c9"/>`,
  lips: () => `
    <path d="M7 32c6-9 12-12 18-10 3 1 5 3 7 3s4-2 7-3c6-2 12 1 18 10-6 9-14 14-25 14S13 41 7 32z" fill="#e63950"/>
    <path d="M7 32c8 3 17 4 25 2 8 2 17 1 25-2" fill="none" stroke="#9e1230" stroke-width="2"/>
    ${shine('M20 26c3-1 5-1 7 0')}`,
  bow: (c = '#ff7aa8') => `
    <path d="M32 31C24 19 10 15 9 23s12 14 23 8zM32 31C40 19 54 15 55 23s-12 14-23 8z" fill="${c}"/>
    <path d="M30 33L21 55l7-3 3 5 2-24zM34 33l9 22-7-3-3 5-2-24z" fill="${c}"/>
    <circle cx="32" cy="31" r="5.5" fill="${c}"/>`,

  // ── spring ──
  daisy: (petal = '#fff', mid = '#ffd23f') =>
    Array.from({ length: 8 }, (_, i) => `<ellipse cx="32" cy="17" rx="6.5" ry="12" fill="${petal}" transform="rotate(${i * 45} 32 32)"/>`).join('') +
    `<circle cx="32" cy="32" r="9" fill="${mid}"/>`,
  tulip: () => `
    <path d="M32 36V60" stroke="#2f8f4e" stroke-width="4" stroke-linecap="round"/>
    <path d="M32 58C22 54 17 44 19 37c8 3 12 11 13 21z" fill="#3cb371"/>
    <path d="M19 12l7 9 6-11 6 11 7-9c2 16-4 25-13 25S17 28 19 12z" fill="#ff7aa8"/>`,
  bunny: () => `
    <ellipse cx="24" cy="18" rx="6" ry="15" transform="rotate(-10 24 18)" fill="#fff"/>
    <ellipse cx="40" cy="18" rx="6" ry="15" transform="rotate(10 40 18)" fill="#fff"/>
    <ellipse cx="24" cy="19" rx="2.6" ry="9" transform="rotate(-10 24 19)" fill="#ffb3c9" class="no-key"/>
    <ellipse cx="40" cy="19" rx="2.6" ry="9" transform="rotate(10 40 19)" fill="#ffb3c9" class="no-key"/>
    <circle cx="32" cy="42" r="17" fill="#fff"/>
    <circle cx="26" cy="40" r="2.2" fill="${K}"/><circle cx="38" cy="40" r="2.2" fill="${K}"/>
    <ellipse cx="32" cy="46" rx="2.6" ry="2" fill="#ff7aa8" class="no-key"/>
    <circle cx="22" cy="47" r="3" fill="#ffd0df" class="no-key"/><circle cx="42" cy="47" r="3" fill="#ffd0df" class="no-key"/>`,
  egg: (base = '#b9e3ec', band = '#ffb0d0') => `
    <ellipse cx="32" cy="35" rx="19" ry="25" fill="${base}"/>
    <path d="M14 32l6 6 6-6 6 6 6-6 6 6 6-6v8l-6 6-6-6-6 6-6-6-6 6-6-6z" fill="${band}" class="no-key"/>
    <circle cx="25" cy="20" r="2.6" fill="#fff" class="no-key"/><circle cx="38" cy="22" r="2.6" fill="#fff" class="no-key"/>
    <circle cx="24" cy="52" r="2.6" fill="#fff" class="no-key"/><circle cx="40" cy="51" r="2.6" fill="#fff" class="no-key"/>`,
  butterfly: () => `
    <ellipse cx="21" cy="23" rx="13" ry="10" transform="rotate(-25 21 23)" fill="#ffb0d0"/>
    <ellipse cx="43" cy="23" rx="13" ry="10" transform="rotate(25 43 23)" fill="#ffb0d0"/>
    <ellipse cx="23" cy="42" rx="9" ry="8" fill="#b6e8c6"/><ellipse cx="41" cy="42" rx="9" ry="8" fill="#b6e8c6"/>
    <circle cx="20" cy="23" r="3.5" fill="#fff" class="no-key"/><circle cx="44" cy="23" r="3.5" fill="#fff" class="no-key"/>
    <ellipse cx="32" cy="34" rx="3.2" ry="15" fill="${K}"/>
    <path d="M31 20c-2-6-5-8-8-9M33 20c2-6 5-8 8-9" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`,
  sun: () => {
    const rays = Array.from({ length: 8 }, (_, i) => { const [a, b] = polar(32, 32, 19, i * 45); const [c, d] = polar(32, 32, 28, i * 45); return `M${a} ${b}L${c} ${d}` }).join('')
    return `<path d="${rays}" stroke="#ffb81c" stroke-width="5.5" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="15" fill="#ffd23f"/>
      <circle cx="27" cy="30" r="1.8" fill="${K}"/><circle cx="37" cy="30" r="1.8" fill="${K}"/>
      <path d="M27 36c3 3 7 3 10 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="23" cy="35" r="2.4" fill="#ff9aa8" class="no-key"/><circle cx="41" cy="35" r="2.4" fill="#ff9aa8" class="no-key"/>`
  },

  // ── prom & wedding ──
  ring: () => `
    <circle cx="32" cy="41" r="16" fill="none" stroke="#e9c766" stroke-width="7"/>
    <path d="M23 17l9-11 9 11-9 12z" fill="#cfe9ff"/>
    <path d="M23 17h18M28 17l4 12 4-12" fill="none" stroke="${K}" stroke-width="1.5"/>`,
  champagne: () => `
    <g transform="rotate(-14 24 34)"><path d="M17 8h13l-2 21c0 5-4 7-4 7v15h6v4H14v-4h6V36s-4-2-4-7z" fill="#f1e3bf"/><path d="M17 8h13l-.6 7H17.6z" fill="#fff" class="no-key"/></g>
    <g transform="rotate(14 40 34)"><path d="M34 8h13l-2 21c0 5-4 7-4 7v15h6v4H31v-4h6V36s-4-2-4-7z" fill="#f1e3bf"/><path d="M34 8h13l-.6 7H34.6z" fill="#fff" class="no-key"/></g>
    <circle cx="32" cy="6" r="2" fill="#e9c766"/><circle cx="26" cy="3" r="1.4" fill="#e9c766"/><circle cx="38" cy="3" r="1.4" fill="#e9c766"/>`,
  pearls: () =>
    [[50.8, 28.8], [47.3, 34.9], [42, 39.3], [35.5, 41.7], [28.5, 41.7], [22, 39.3], [16.7, 34.9], [13.2, 28.8], [11.5, 22], [52.5, 22]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#fff"/>`).join('') +
    `<path d="M32 46c4 5 5 9 0 13-5-4-4-8 0-13z" fill="#f3c6d4"/>`,
  bouquet: () => `
    <ellipse cx="18" cy="28" rx="5" ry="9" transform="rotate(-35 18 28)" fill="#3cb371"/>
    <ellipse cx="46" cy="28" rx="5" ry="9" transform="rotate(35 46 28)" fill="#3cb371"/>
    <path d="M20 34h24L35 60h-6z" fill="#fff"/>
    <circle cx="24" cy="25" r="8" fill="#f3c6d4"/><circle cx="40" cy="25" r="8" fill="#fff"/>
    <circle cx="32" cy="16" r="8.5" fill="#f8d0d5"/><circle cx="32" cy="31" r="7" fill="#fff"/>
    <circle cx="32" cy="16" r="3" fill="#e9c766" class="no-key"/>
    <path d="M27 42c3 3 7 3 10 0" fill="none" stroke="#e9c766" stroke-width="3" stroke-linecap="round"/>`,
  tiara: () => `
    <path d="M9 45L15 23l9 13 8-23 8 23 9-13 6 22z" fill="#e9c766"/>
    <rect x="9" y="44" width="46" height="7" rx="3.5" fill="#e9c766"/>
    <circle cx="32" cy="28" r="4" fill="#ff7aa8"/><circle cx="17" cy="35" r="2.8" fill="#cfe9ff"/><circle cx="47" cy="35" r="2.8" fill="#cfe9ff"/>`,
  sparkle: (c = '#ffe14d') => `
    <path d="M30 6C32 24 37 29 55 31 37 33 32 38 30 56 28 38 23 33 5 31 23 29 28 24 30 6z" fill="${c}"/>
    <path d="M52 6c.7 5 2 6.5 7 7-5 .7-6.3 2-7 7-.7-5-2-6.3-7-7 5-.5 6.3-2 7-7z" fill="${c}"/>`,

  // ── summer ──
  palm: () => `
    <path d="M29 61c0-15 2-27 7-37l4 1c-4 11-5 23-4 36z" fill="#a0703c"/>
    <path d="M37 23C28 14 16 14 9 20c10-2 19 0 28 4zM37 23c8-10 20-11 25-4-9-3-17-1-24 5zM37 22C35 12 27 5 20 5c8 4 12 10 15 18zM38 22c5-10 13-14 17-13-6 4-11 9-16 15z" fill="#3cb371"/>
    <circle cx="34" cy="26" r="3.4" fill="#8a5a3c"/><circle cx="40" cy="27" r="3.4" fill="#8a5a3c"/>`,
  sunglasses: () => `
    <path d="M6 25h52" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
    <path d="${heartPath(18, 33, 1)}" fill="#ff3d66"/><path d="${heartPath(46, 33, 1)}" fill="#ff3d66"/>
    <path d="M28 29c3-3 5-3 8 0" fill="none" stroke="${K}" stroke-width="3"/>
    ${shine('M12 29c1-2 3-3 5-3')}${shine('M40 29c1-2 3-3 5-3')}`,
  watermelon: () => `
    <path d="M5 24a27 27 0 0 0 54 0z" fill="#2fbf55"/>
    <path d="M9 24a23 23 0 0 0 46 0z" fill="#e9fbe6" class="no-key"/>
    <path d="M12 24a20 20 0 0 0 40 0z" fill="#ff5577" class="no-key"/>
    ${[[23, 31], [32, 37], [41, 31], [27, 40], [37, 40]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.6" fill="${K}" class="no-key"/>`).join('')}`,
  firework: (a = '#ff3d66', b = '#2fe3c6') =>
    Array.from({ length: 12 }, (_, i) => {
      const [x1, y1] = polar(32, 32, 9, i * 30); const [x2, y2] = polar(32, 32, 25, i * 30); const [x3, y3] = polar(32, 32, 29.5, i * 30)
      return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${i % 2 ? a : b}" stroke-width="4" stroke-linecap="round"/><circle cx="${x3}" cy="${y3}" r="2.3" fill="${i % 2 ? b : a}" class="no-key"/>`
    }).join('') + `<circle cx="32" cy="32" r="5" fill="#ffee32"/>`,
  star: (c = '#ffe14d') => `<path d="${starPath(32, 33, 28, 12)}" fill="${c}" stroke-linejoin="round"/>${shine('M24 22l3-6')}`,
  beachball: () => {
    const w = (a, b, c) => { const [x1, y1] = polar(32, 32, 26, a); const [x2, y2] = polar(32, 32, 26, b); return `<path d="M32 32L${x1} ${y1}A26 26 0 0 1 ${x2} ${y2}z" fill="${c}" class="no-key"/>` }
    return `<circle cx="32" cy="32" r="26" fill="#fff"/>${w(-90, -30, '#ff3d66')}${w(30, 90, '#0b3ccc')}${w(150, 210, '#ffd23f')}<circle cx="32" cy="32" r="26" fill="none"/><circle cx="32" cy="32" r="5" fill="#fff"/>`
  },
  popsicle: () => `
    <rect x="28" y="42" width="8" height="18" rx="4" fill="#d9a066"/>
    <path d="M17 18a15 15 0 0 1 30 0v26H17z" fill="#ff7ab0"/>
    <path d="M17 30h30v14H17z" fill="#ffd23f" class="no-key"/>
    <path d="M17 44h30v-3c-3 0-3 4-6 4s-3-4-6-4-3 5-6 5-3-5-6-5-3 3-6 3z" fill="#2fe3c6" class="no-key"/>
    ${shine('M22 16c1-3 3-5 6-6')}`,

  // ── fall / thanksgiving ──
  leaf: (c = '#d35f27') => `
    <path d="M32 61V44" stroke="#5a3720" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M32 5l5 12 10-6-2 13h12l-8 8 6 9-14-2-4 12-5-6-5 6-4-12-14 2 6-9-8-8h12l-2-13 10 6z" fill="${c}" stroke-linejoin="round"/>
    <path d="M32 16v28M32 34l9-8M32 34l-9-8" fill="none" stroke="rgb(0 0 0 / .25)" stroke-width="2" class="no-key"/>`,
  pumpkin: (face = false) => `
    <path d="M31 19c0-7 4-10 8-11l2 3c-4 2-6 4-6 9z" fill="#5a7a2a"/>
    <ellipse cx="20" cy="39" rx="13" ry="17" fill="#ff8a1a"/><ellipse cx="44" cy="39" rx="13" ry="17" fill="#ff8a1a"/>
    <ellipse cx="32" cy="39" rx="13" ry="19" fill="#ffa13d"/>
    ${face ? `<path d="M21 34l5-7 5 7zM33 34l5-7 5 7z" fill="${K}" class="no-key"/><path d="M19 43q13 11 26 0l-3 5-3-3-3 4-4-4-3 4-3-4-3 3z" fill="${K}" class="no-key"/>` : ''}`,
  acorn: () => `
    <path d="M31 12c0-4 2-6 5-7" fill="none" stroke="#5a3720" stroke-width="3" stroke-linecap="round"/>
    <path d="M18 27c0 17 10 27 14 29 4-2 14-12 14-29z" fill="#d9a066"/>
    <path d="M14 28c0-11 8-16 18-16s18 5 18 16z" fill="#8a5a3c"/>
    <path d="M20 22l4 5M28 17l3 9M36 17l-3 9M44 22l-4 5" stroke="rgb(0 0 0 / .3)" stroke-width="2" class="no-key"/>`,
  mushroom: () => `
    <rect x="24" y="33" width="16" height="23" rx="7" fill="#fff3e0"/>
    <path d="M7 35C7 17 18 8 32 8s25 9 25 27z" fill="#e63950"/>
    <circle cx="20" cy="24" r="4" fill="#fff" class="no-key"/><circle cx="34" cy="17" r="3.5" fill="#fff" class="no-key"/><circle cx="45" cy="27" r="4.5" fill="#fff" class="no-key"/>`,
  latte: () => `
    <path d="M24 12c-2-3 2-5 0-8M32 12c-2-3 2-5 0-8M40 12c-2-3 2-5 0-8" fill="none" stroke="#c9b8a6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M16 23h32l-4 35H20z" fill="#fff"/>
    <path d="M17.6 34h28.8l-1.2 11H18.8z" fill="#c27a33" class="no-key"/>
    <rect x="13" y="16" width="38" height="8" rx="3" fill="#f2e8db"/>
    <path d="${heartPath(32, 38, 0.4)}" fill="#fff" class="no-key"/>`,
  apple: () => `
    <path d="M32 18C20 10 8 20 12 36c3 13 12 21 20 17 8 4 17-4 20-17 4-16-8-26-20-18z" fill="#cf3a2a"/>
    <path d="M32 18c0-5 1-9 4-12" fill="none" stroke="#5a3720" stroke-width="3" stroke-linecap="round"/>
    <path d="M35 12c4-5 10-5 13-3-3 4-8 5-13 3z" fill="#3cb371"/>
    ${shine('M18 28c1-4 4-6 7-7')}`,
  turkey: () =>
    [-60, -30, 0, 30, 60].map((a, i) => `<ellipse cx="32" cy="22" rx="7.5" ry="17" fill="${['#c2531c', '#e3a93a', '#a0522d', '#e3a93a', '#c2531c'][i]}" transform="rotate(${a} 32 40)"/>`).join('') +
    `<circle cx="32" cy="43" r="13" fill="#8a5a3c"/><circle cx="32" cy="29" r="7.5" fill="#a0703c"/>
     <circle cx="29.5" cy="28" r="1.5" fill="${K}"/><circle cx="34.5" cy="28" r="1.5" fill="${K}"/>
     <path d="M30 31h4l-2 4z" fill="#ffb81c"/><path d="M33 33c2 2 2 5 0 6" fill="none" stroke="#e63950" stroke-width="2.5" stroke-linecap="round"/>
     <path d="M27 56v5M37 56v5" stroke="#ffb81c" stroke-width="3" stroke-linecap="round"/>`,
  pie: () => `
    <circle cx="32" cy="34" r="26" fill="#e3a05a"/>
    ${Array.from({ length: 16 }, (_, i) => { const [x, y] = polar(32, 34, 23, i * 22.5); return `<circle cx="${x}" cy="${y}" r="3" fill="#f0bd7c" class="no-key"/>` }).join('')}
    <circle cx="32" cy="34" r="18" fill="#c2531c"/>
    <path d="M24 30c2-6 14-6 16 0 3 1 3 6 0 7-2 4-14 4-16 0-3-1-3-6 0-7z" fill="#fff"/>`,
  wheat: () => `
    <path d="M32 61V10" stroke="#c99a3a" stroke-width="3" stroke-linecap="round"/>
    ${[12, 21, 30, 39].map((y) => `<ellipse cx="25" cy="${y}" rx="4" ry="7" transform="rotate(-35 25 ${y})" fill="#e3a93a"/><ellipse cx="39" cy="${y}" rx="4" ry="7" transform="rotate(35 39 ${y})" fill="#e3a93a"/>`).join('')}
    <ellipse cx="32" cy="7" rx="3.5" ry="6" fill="#e3a93a"/>`,

  // ── halloween ──
  ghost: () => `
    <path d="M13 58V28C13 15 21 7 32 7s19 8 19 21v30l-6.3-5-6.4 5-6.3-5-6.3 5-6.4-5z" fill="#fff"/>
    <ellipse cx="25" cy="27" rx="3" ry="4.5" fill="${K}"/><ellipse cx="39" cy="27" rx="3" ry="4.5" fill="${K}"/>
    <ellipse cx="32" cy="38" rx="3.5" ry="4.5" fill="${K}"/>
    <circle cx="20" cy="34" r="3" fill="#ffb3c9" class="no-key"/><circle cx="44" cy="34" r="3" fill="#ffb3c9" class="no-key"/>`,
  bat: () => `
    <path d="M32 27c-4-4-8-2-10 2-4-4-12-4-18 2 6 0 8 4 8 8 4-4 10-2 12 2 2-4 6-6 8-4 2-2 6 0 8 4 2-4 8-6 12-2 0-4 2-8 8-8-6-6-14-6-18-2-2-4-6-6-10-2z" fill="#3a2f4a"/>
    <path d="M28 25l1-6 3 4 3-4 1 6z" fill="#3a2f4a"/>
    <circle cx="29.5" cy="28" r="1.6" fill="#b8ff3c" class="no-key"/><circle cx="34.5" cy="28" r="1.6" fill="#b8ff3c" class="no-key"/>`,
  witchhat: () => `
    <ellipse cx="32" cy="51" rx="27" ry="7" fill="#3a2f4a"/>
    <path d="M17 50c6-14 12-30 26-43-2 13 0 30 5 43z" fill="#3a2f4a"/>
    <path d="M19 43h27l2 7H17z" fill="#a07cff" class="no-key"/>
    <rect x="28" y="42" width="8" height="9" rx="1.5" fill="#b8ff3c" class="no-key"/>`,
  spider: () => `
    <path d="M32 0v22" stroke="#cfcfd6" stroke-width="1.6"/>
    <path d="M24 30c-6-4-10-4-14 2M24 35c-6 0-11 2-13 7M25 40c-5 3-8 7-8 12M40 30c6-4 10-4 14 2M40 35c6 0 11 2 13 7M39 40c5 3 8 7 8 12" fill="none" stroke="#3a2f4a" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="36" r="10" fill="#3a2f4a"/><circle cx="32" cy="24" r="6" fill="#3a2f4a"/>
    <circle cx="29.5" cy="23" r="1.8" fill="#fff" class="no-key"/><circle cx="34.5" cy="23" r="1.8" fill="#fff" class="no-key"/>`,
  candycorn: () => `
    <path d="M32 6c7 13 15 33 17 46-9 5-25 5-34 0 2-13 10-33 17-46z" fill="#ffd23f"/>
    <path d="M32 6c5 10 10 23 13 34-8 3-18 3-26 0 3-11 8-24 13-34z" fill="#ff7a1a" class="no-key"/>
    <path d="M32 6c3 6 6 13 8 20-5 1-11 1-16 0 2-7 5-14 8-20z" fill="#fff" class="no-key"/>`,
  moon: () => `
    <path d="M40 7a25 25 0 1 0 17 37A21 21 0 1 1 40 7z" fill="#ffe66d"/>
    <circle cx="27" cy="36" r="3" fill="#f2cf3a" class="no-key"/><circle cx="20" cy="26" r="2" fill="#f2cf3a" class="no-key"/>
    <path d="${starPath(52, 14, 5, 2)}" fill="#ffe66d"/>`,
  cat: () => `
    <path d="M15 32l2-20 12 11zM49 32l-2-20-12 11z" fill="#2a2433"/>
    <ellipse cx="32" cy="39" rx="19" ry="17" fill="#2a2433"/>
    <ellipse cx="24" cy="37" rx="4" ry="5" fill="#b8ff3c" class="no-key"/><ellipse cx="40" cy="37" rx="4" ry="5" fill="#b8ff3c" class="no-key"/>
    <ellipse cx="24" cy="37" rx="1.3" ry="4" fill="${K}" class="no-key"/><ellipse cx="40" cy="37" rx="1.3" ry="4" fill="${K}" class="no-key"/>
    <path d="M30 45h4l-2 2.5z" fill="#ff8fb3" class="no-key"/>
    <path d="M14 44l10 1M14 49l10-2M50 44l-10 1M50 49l-10-2" stroke="#fff" stroke-width="1.4" class="no-key"/>`,
  cauldron: () => `
    <ellipse cx="32" cy="22" rx="24" ry="6" fill="#b8ff3c"/>
    <circle cx="24" cy="15" r="4" fill="#b8ff3c"/><circle cx="36" cy="11" r="3" fill="#b8ff3c"/>
    <path d="M9 24c0 20 10 32 23 32s23-12 23-32z" fill="#3a2f4a"/>
    <path d="M18 56l-3 5M46 56l3 5" stroke="#3a2f4a" stroke-width="4" stroke-linecap="round"/>`,

  // ── christmas / NYE ──
  tree: () => `
    <rect x="28" y="52" width="8" height="9" rx="1.5" fill="#8a5a3c"/>
    <path d="M32 7l15 19h-7l12 15h-9l12 14H9l12-14h-9l12-15h-7z" fill="#1f7a52" stroke-linejoin="round"/>
    <path d="M22 27c7 4 14 4 20 0M17 42c10 5 21 5 30 0" fill="none" stroke="#e9c766" stroke-width="2.4" class="no-key"/>
    ${[[26, 34, '#cf1530'], [40, 36, '#e9c766'], [22, 49, '#e9c766'], [33, 47, '#cf1530'], [44, 50, '#9fc3e6'], [32, 21, '#9fc3e6']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${c}" class="no-key"/>`).join('')}
    <path d="${starPath(32, 7, 7, 3)}" fill="#ffd23f"/>`,
  ornament: (c = '#cf1530') => `
    <circle cx="32" cy="12" r="4" fill="none" stroke="#c9a75d" stroke-width="2.5"/>
    <rect x="25" y="14" width="14" height="8" rx="2" fill="#e9c766"/>
    <circle cx="32" cy="40" r="20" fill="${c}"/>
    <path d="M13 38l5 4 5-4 5 4 4-4 4 4 5-4 5 4 5-4" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" class="no-key"/>
    ${shine('M21 31c2-4 5-6 9-7')}`,
  candycane: () => `
    <path d="M26 59V24a10 10 0 0 1 20 0v4" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
    <path d="M26 59V24a10 10 0 0 1 20 0v4" fill="none" stroke="#cf1530" stroke-width="11" stroke-dasharray="5 6" class="no-key"/>`,
  gift: () => `
    <rect x="10" y="29" width="44" height="29" rx="3" fill="#cf1530"/>
    <rect x="7" y="21" width="50" height="10" rx="3" fill="#e01e3c"/>
    <rect x="29" y="21" width="6" height="37" fill="#e9c766" class="no-key"/>
    <path d="M32 21c-6-10-15-11-15-5s9 6 15 5zM32 21c6-10 15-11 15-5s-9 6-15 5z" fill="#e9c766"/>`,
  snowflake: (c = '#6fa8dc') => {
    const arms = Array.from({ length: 6 }, (_, i) => {
      const a = i * 60 - 90; const [x, y] = polar(32, 32, 26, a); const [bx, by] = polar(32, 32, 16, a)
      const [l1, l2] = polar(bx, by, 8, a - 45); const [r1x, r1y] = polar(bx, by, 8, a + 45)
      return `M32 32L${x} ${y}M${bx} ${by}L${l1} ${l2}M${bx} ${by}L${r1x} ${r1y}`
    }).join('')
    return `<path d="${arms}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4.5" fill="${c}"/>`
  },
  snowman: () => `
    <circle cx="32" cy="46" r="15" fill="#fff"/><circle cx="32" cy="23" r="11" fill="#fff"/>
    <rect x="22" y="9" width="20" height="4" rx="2" fill="${K}"/><rect x="25" y="1" width="14" height="10" rx="2" fill="${K}"/>
    <path d="M22 31c6 3 14 3 20 0l2 4-4 1 1 9-5-1-1-7c-4 0-8 0-12-2z" fill="#cf1530"/>
    <circle cx="28" cy="21" r="1.7" fill="${K}"/><circle cx="36" cy="21" r="1.7" fill="${K}"/>
    <path d="M32 24l8 2-8 1.5z" fill="#ff8a1a"/>
    <circle cx="32" cy="42" r="1.8" fill="${K}"/><circle cx="32" cy="49" r="1.8" fill="${K}"/>`,
  holly: () => `
    <path d="M30 34c-6-3-10-9-11-16 3 1 4-2 6-1 0-3 3-3 4-5 2 4 6 8 7 13-2 0-2 3-4 3 0 3-2 4-2 6z" fill="#1f7a52"/>
    <path d="M34 34c6-3 12-5 18-3-1 3 2 4 1 6 3 1 2 4 4 6-5 1-10 1-14-1 0 2-3 2-4 4-2-2-5-2-5-4z" fill="#1f7a52"/>
    <circle cx="28" cy="40" r="5" fill="#cf1530"/><circle cx="37" cy="42" r="5" fill="#cf1530"/><circle cx="31" cy="49" r="5" fill="#cf1530"/>`,
  clock: () => `
    <circle cx="32" cy="34" r="25" fill="#fff"/>
    ${Array.from({ length: 12 }, (_, i) => { const [a, b] = polar(32, 34, 20, i * 30); const [c, d] = polar(32, 34, 23, i * 30); return `<path d="M${a} ${b}L${c} ${d}" stroke="${K}" stroke-width="${i % 3 ? 1.5 : 3}" class="no-key"/>` }).join('')}
    <path d="M32 34V16M32 34l-3-12" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="34" r="3" fill="#cf1530"/>`,
  bubbly: () => `
    <path d="M26 24h12v6c5 4 7 9 7 15v13a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V45c0-6 2-11 7-15z" fill="#0e5a39"/>
    <rect x="25" y="14" width="14" height="12" rx="2" fill="#e9c766"/>
    <rect x="19" y="40" width="26" height="12" fill="#f1e3bf" class="no-key"/>
    <path d="M30 13l-2-8h8l-2 8z" fill="#d9a066"/>
    <circle cx="22" cy="6" r="2" fill="#e9c766"/><circle cx="44" cy="8" r="2.5" fill="#e9c766"/><circle cx="40" cy="3" r="1.5" fill="#e9c766"/>`,

  // ── winter ──
  mitten: (c = '#3a6fd8') => `
    <path d="M19 52V29c0-12 6-18 14-18s13 6 13 16v6c4-4 10-2 8 4l-8 13v2z" fill="${c}"/>
    <rect x="16" y="49" width="33" height="11" rx="3" fill="#fff"/>
    <path d="M26 30l2 2 2-2M34 24l2 2 2-2M30 40l2 2 2-2" fill="none" stroke="#fff" stroke-width="2" class="no-key"/>`,
  cocoa: () => `
    <path d="M22 12c-2-3 2-5 0-8M31 12c-2-3 2-5 0-8" fill="none" stroke="#c9d6e6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M46 28c10 0 10 16 0 16" fill="none" stroke="#e63950" stroke-width="5"/>
    <rect x="10" y="20" width="38" height="38" rx="8" fill="#e63950"/>
    <ellipse cx="29" cy="21" rx="18" ry="4" fill="#7a4a2a"/>
    <rect x="19" y="14" width="7" height="7" rx="2" fill="#fff"/><rect x="29" y="13" width="7" height="7" rx="2" fill="#fff" transform="rotate(15 32 16)"/>
    <path d="${heartPath(29, 40, 0.55)}" fill="#fff" class="no-key"/>`,
  beanie: () => `
    <circle cx="32" cy="10" r="7" fill="#fff"/>
    <path d="M10 44C10 24 20 15 32 15s22 9 22 29z" fill="#3a6fd8"/>
    <path d="M18 22v20M26 17v25M38 17v25M46 22v20" stroke="rgb(255 255 255 / .35)" stroke-width="3" class="no-key"/>
    <rect x="7" y="41" width="50" height="14" rx="5" fill="#fff"/>
    <path d="M12 48h40" stroke="#e63950" stroke-width="3" stroke-dasharray="4 3" class="no-key"/>`,
  skate: () => `
    <path d="M18 6h17v24c9 0 19 4 19 12v6H18z" fill="#fff"/>
    <path d="M22 14h9M22 20h9M22 26h9" stroke="#e63950" stroke-width="2.5" stroke-linecap="round" class="no-key"/>
    <path d="M22 48v7M48 48v7" stroke="#9aa5b4" stroke-width="3"/>
    <path d="M10 56h44c4 0 6-3 5-6" fill="none" stroke="#9aa5b4" stroke-width="4" stroke-linecap="round"/>`,

  // ── signature ──
  macaron: (a = '#ff9ac9', b = '#fff') => `
    <path d="M10 27c0-11 10-17 22-17s22 6 22 17z" fill="${a}"/>
    <rect x="11" y="27" width="42" height="9" rx="4" fill="${b}"/>
    <path d="M10 37c0 11 10 17 22 17s22-6 22-17z" fill="${a}"/>
    ${shine('M18 20c3-4 7-5 11-5')}`,
  eiffel: () => `
    <path d="M30 4h4l2 14h-8z" fill="#2b3e91"/>
    <path d="M27 18h10l4 18H23z" fill="#2b3e91"/>
    <path d="M20 36h24l8 24h-9c-2-7-6-11-11-11s-9 4-11 11h-9z" fill="#2b3e91"/>
    <rect x="18" y="34" width="28" height="4" rx="1" fill="#ff48b0"/><rect x="25" y="17" width="14" height="3" rx="1" fill="#ff48b0"/>`,
}

// Per-season decoration sets. Icons accept optional color args: ['name', ...args]
export const DECOR = {
  signature: {
    polish: ['#ff48b0', '#2b3e91'], big: ['eiffel'],
    hero: [['macaron'], ['bow', '#ff48b0'], ['sparkle'], ['heart', '#ff48b0'], ['daisy']],
    rail: [['macaron', '#5ec8e5'], ['sparkle', '#fff']], menu: [['bow', '#fff'], ['polish', '#5ec8e5', '#2b3e91']],
    visit: ['eiffel'], footer: [['macaron'], ['polish', '#ffe14d', '#ff48b0'], ['heart', '#ff48b0'], ['daisy'], ['sparkle']],
    particles: { shape: 'sparkle', colors: ['#ff48b0', '#5ec8e5', '#ffe14d'], count: 16 },
    bunting: { type: 'flags', colors: ['#ff48b0', '#5ec8e5', '#ffe14d', '#2b3e91'] },
  },
  valentine: {
    polish: ['#e8173f', '#ffd3e1'], big: ['heart', '#c8102e'],
    hero: [['envelope'], ['rose'], ['lips'], ['arrow'], ['bow', '#ff5c8f']],
    rail: [['heart', '#fff'], ['envelope']], menu: [['rose'], ['heart', '#c8102e']],
    visit: ['envelope'], footer: [['heart', '#ff5c8f'], ['lips'], ['polish', '#ff5c8f', '#a8102f'], ['rose'], ['bow', '#ffd3e1']],
    particles: { shape: 'heart', colors: ['#ff5c8f', '#c8102e', '#ffb3c9'], count: 26 },
    bunting: { type: 'hearts', colors: ['#ff5c8f', '#c8102e', '#ffd3e1'] },
  },
  spring: {
    polish: ['#b9a2ff', '#ffe66d'], big: ['bunny'],
    hero: [['tulip'], ['egg'], ['butterfly'], ['daisy'], ['sun']],
    rail: [['butterfly'], ['egg', '#ffe66d', '#7f62c9']], menu: [['tulip'], ['daisy', '#fff', '#ffd23f']],
    visit: ['sun'], footer: [['egg'], ['daisy'], ['polish', '#b6e8c6', '#3a4db0'], ['bunny'], ['tulip']],
    particles: { shape: 'petal', colors: ['#ffb0d0', '#ffffff', '#ffe66d', '#b6e8c6'], count: 28 },
    bunting: { type: 'flags', colors: ['#ffb0d0', '#b6e8c6', '#ffe66d', '#bfe6ff', '#d9c8ff'] },
  },
  prom: {
    polish: ['#f3c6d4', '#e9c766'], big: ['ring'],
    hero: [['champagne'], ['tiara'], ['pearls'], ['bouquet'], ['sparkle', '#e9c766']],
    rail: [['bouquet'], ['sparkle', '#fff']], menu: [['champagne'], ['ring']],
    visit: ['bouquet'], footer: [['tiara'], ['pearls'], ['polish', '#fff', '#e9c766'], ['champagne'], ['ring']],
    particles: { shape: 'sparkle', colors: ['#e9c766', '#ffffff', '#f3c6d4'], count: 22 },
    bunting: { type: 'pearls', colors: ['#ffffff', '#f3c6d4', '#e9c766'] },
  },
  summer: {
    polish: ['#ff3d66', '#0b3ccc'], big: ['sun'],
    hero: [['firework'], ['watermelon'], ['sunglasses'], ['palm'], ['star', '#0b3ccc']],
    rail: [['beachball'], ['popsicle']], menu: [['firework', '#ffee32', '#0b3ccc'], ['watermelon']],
    visit: ['palm'], footer: [['star', '#ff3d66'], ['beachball'], ['polish', '#2fe3c6', '#ff3d66'], ['popsicle'], ['firework']],
    particles: { shape: 'confetti', colors: ['#ff3d66', '#0b3ccc', '#ffee32', '#2fe3c6', '#ffffff'], count: 34 },
    bunting: { type: 'flags', colors: ['#ff3d66', '#ffffff', '#0b3ccc'] },
  },
  fall: {
    polish: ['#c2531c', '#5a3720'], big: ['pumpkin'],
    hero: [['leaf'], ['acorn'], ['latte'], ['mushroom'], ['apple']],
    rail: [['leaf', '#e3a93a'], ['acorn']], menu: [['latte'], ['leaf', '#8a8d48']],
    visit: ['latte'], footer: [['leaf'], ['apple'], ['polish', '#e3a93a', '#5a3720'], ['mushroom'], ['acorn']],
    particles: { shape: 'leaf', colors: ['#d35f27', '#e3a93a', '#8a8d48', '#a0522d'], count: 24 },
    bunting: { type: 'leaves', colors: ['#d35f27', '#e3a93a', '#8a8d48', '#a0522d'] },
  },
  halloween: {
    polish: ['#3a2f4a', '#b8ff3c', '#b8ff3c'], big: ['pumpkin', true],
    hero: [['ghost'], ['bat'], ['witchhat'], ['spider'], ['candycorn']],
    rail: [['cat'], ['ghost']], menu: [['cauldron'], ['bat']],
    visit: ['moon'], footer: [['bat'], ['candycorn'], ['polish', '#ff7a1a', '#3a2f4a'], ['ghost'], ['pumpkin', true]],
    particles: { shape: 'bat', colors: ['#a07cff', '#b8ff3c', '#ff7a1a'], count: 18 },
    bunting: { type: 'flags', colors: ['#ff7a1a', '#3a2f4a', '#a07cff', '#b8ff3c'] },
  },
  thanksgiving: {
    polish: ['#c27a33', '#6a3b1b', '#e9c766'], big: ['turkey'],
    hero: [['pie'], ['wheat'], ['leaf', '#c27a33'], ['acorn'], ['pumpkin']],
    rail: [['wheat'], ['leaf', '#d8b23c']], menu: [['pie'], ['turkey']],
    visit: ['pie'], footer: [['leaf', '#c27a33'], ['wheat'], ['polish', '#d8b23c', '#6a3b1b'], ['acorn'], ['turkey']],
    particles: { shape: 'leaf', colors: ['#c27a33', '#d8b23c', '#96603c', '#8e1b33'], count: 22 },
    bunting: { type: 'leaves', colors: ['#c27a33', '#d8b23c', '#96603c', '#8e1b33'] },
  },
  christmas: {
    polish: ['#cf1530', '#e9c766'], big: ['tree'],
    hero: [['gift'], ['ornament'], ['candycane'], ['snowman'], ['holly']],
    rail: [['ornament', '#e9c766'], ['gift']], menu: [['bubbly'], ['clock']],
    visit: ['snowman'], footer: [['ornament'], ['candycane'], ['polish', '#0e5a39', '#e9c766'], ['gift'], ['bubbly']],
    particles: { shape: 'snow', colors: ['#9fc3e6', '#cbd5cf', '#e9c766'], count: 40 },
    bunting: { type: 'lights', colors: ['#cf1530', '#e9c766', '#1f7a52', '#9fc3e6'] },
  },
  winter: {
    polish: ['#9fd3ff', '#1f3f8a', '#fff'], big: ['snowflake', '#6fa8dc'],
    hero: [['mitten'], ['cocoa'], ['beanie'], ['skate'], ['snowman']],
    rail: [['snowflake', '#fff'], ['mitten', '#e63950']], menu: [['cocoa'], ['beanie']],
    visit: ['cocoa'], footer: [['snowflake'], ['mitten'], ['polish', '#fff', '#3a6fd8'], ['skate'], ['beanie']],
    particles: { shape: 'snow', colors: ['#ffffff', '#cfe6ff', '#9fd3ff'], count: 46 },
    bunting: { type: 'flags', colors: ['#3a6fd8', '#ffffff', '#9fd3ff', '#e63950'] },
  },
}

export function iconMarkup(spec) {
  const [name, ...args] = Array.isArray(spec) ? spec : [spec]
  const fn = ICONS[name]
  return fn ? fn(...args) : ''
}
