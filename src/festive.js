// Festival framing per issue: greeting, real holiday countdown, hanging ornaments,
// top garland, bottom edge and background pattern.

const easter = (y) => {
  // Anonymous Gregorian algorithm
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(y, month - 1, day)
}
const thanksgiving = (y) => { const d = new Date(y, 10, 1); const first = (11 - d.getDay()) % 7; return new Date(y, 10, 1 + first + 21) }
const fixed = (m, d) => (y) => new Date(y, m - 1, d)

export const FESTIVE = {
  signature: { greeting: 'Hello, gorgeous', holiday: null, top: 'flags', edge: 'scallop',
    hang: [['heart', '#ff7aa8'], ['sparkle', '#ffe14d'], ['bow', '#ff9ac9'], ['heart', '#5b7cf0'], ['sparkle', '#ffd1e6']] },
  valentine: { greeting: 'Happy Valentine’s Day', holiday: { name: 'Valentine’s Day', at: fixed(2, 14) }, top: 'hearts', edge: 'scallop',
    hang: [['heart', '#e8173f'], ['heart', '#ff8fb1'], ['envelope'], ['heart', '#c8102e'], ['heart', '#ffd3e1'], ['bow', '#ff5c8f']] },
  spring: { greeting: 'Hello, Spring!', holiday: { name: 'Easter', at: easter }, top: 'flags', edge: 'grass',
    hang: [['daisy'], ['butterfly'], ['egg'], ['daisy', '#ffb0d0', '#ffd23f'], ['egg', '#ffe66d', '#b6e8c6'], ['tulip']] },
  prom: { greeting: 'Prom & Wedding Season', holiday: null, top: 'pearls', edge: 'scallop',
    hang: [['sparkle', '#e9c766'], ['ring'], ['sparkle', '#fff'], ['champagne'], ['sparkle', '#f3c6d4']] },
  summer: { greeting: 'Happy 4th of July', holiday: { name: 'the 4th of July', at: fixed(7, 4) }, top: 'flags', edge: 'waves',
    hang: [['star', '#ff3d66'], ['star', '#ffffff'], ['firework'], ['star', '#0b3ccc'], ['sun'], ['star', '#ff3d66']] },
  fall: { greeting: 'Hello, Autumn', holiday: null, top: 'leaves', edge: 'leaves',
    hang: [['leaf', '#d35f27'], ['acorn'], ['leaf', '#e3a93a'], ['apple'], ['leaf', '#a0522d']] },
  halloween: { greeting: 'Happy Halloween', holiday: { name: 'Halloween', at: fixed(10, 31) }, top: 'webs', edge: 'graves',
    hang: [['spider'], ['bat'], ['ghost'], ['spider'], ['bat'], ['candycorn']] },
  thanksgiving: { greeting: 'Happy Thanksgiving', holiday: { name: 'Thanksgiving', at: thanksgiving }, top: 'leaves', edge: 'leaves',
    hang: [['leaf', '#c27a33'], ['wheat'], ['leaf', '#d8b23c'], ['acorn'], ['leaf', '#8e1b33']] },
  winter: { greeting: 'Winter Wonderland', holiday: null, top: 'icicles', edge: 'snow',
    hang: [['snowflake', '#9fd3ff'], ['mitten'], ['snowflake', '#3a6fd8'], ['snowflake', '#cfe6ff'], ['mitten', '#e63950']] },
  christmas: { greeting: 'Merry Christmas', holiday: { name: 'Christmas', at: fixed(12, 25) }, top: 'lights', edge: 'snow',
    hang: [['ornament', '#cf1530'], ['star', '#ffd23f'], ['ornament', '#e9c766'], ['candycane'], ['ornament', '#0e6b43'], ['snowflake', '#9fc3e6']] },
}

// Days until the season's holiday (next occurrence), or null.
export function countdown(id, now = new Date()) {
  const h = FESTIVE[id]?.holiday
  if (!h) return null
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let d = h.at(today.getFullYear())
  if (d < today) d = h.at(today.getFullYear() + 1)
  const days = Math.round((d - today) / 86400000)
  return { days, name: h.name }
}
