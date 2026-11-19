import { computed, reactive } from 'vue'
import { SEASONS, findSeason, seasonForMonth } from './seasons.js'
import { menu } from './data.js'
import { PALETTES } from './palettes.js'

const KEY = 'pp-season'

function readInitial() {
  try {
    const q = new URLSearchParams(location.search).get('season')
    if (q && (q === 'auto' || SEASONS.some((s) => s.id === q))) return q
  } catch {}
  try {
    const v = localStorage.getItem(KEY)
    if (v && (v === 'auto' || SEASONS.some((s) => s.id === v))) return v
  } catch {}
  return 'auto'
}

export const theme = reactive({ choice: readInitial() }) // 'auto' | season id

export const season = computed(() => findSeason(theme.choice === 'auto' ? seasonForMonth() : theme.choice))
export const designs = computed(() => season.value.designs)
export const fullMenu = computed(() => (season.value.special ? [season.value.special, ...menu] : menu))

function paint(s) {
  const root = document.documentElement
  const p = PALETTES[s.id] || PALETTES.signature
  for (const [k, v] of Object.entries(p)) if (k !== 'scheme') root.style.setProperty(`--${k}`, v)
  root.dataset.season = s.id
  root.style.colorScheme = p.scheme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', p.bg)
}

export function initSeason() {
  paint(season.value)
}

// The signature moment: the new print run rolls down over the old one.
export function setSeason(choice) {
  if (choice === theme.choice) return
  const apply = () => {
    theme.choice = choice
    paint(season.value)
  }
  try { localStorage.setItem(KEY, choice) } catch {}
  try {
    const url = new URL(location.href)
    choice === 'auto' ? url.searchParams.delete('season') : url.searchParams.set('season', choice)
    history.replaceState(null, '', url)
  } catch {}

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce) return apply()
  document.startViewTransition(async () => {
    apply()
    await new Promise((r) => requestAnimationFrame(() => r()))
  })
}

// Decorations + media for the current issue
import { DECOR } from './decor.js'
import { COVERS, OFFERS } from './media.js'
export const decor = computed(() => DECOR[season.value.id] || DECOR.signature)
export const cover = computed(() => COVERS[season.value.id] || COVERS.signature)
export const offer = computed(() => OFFERS[season.value.id] || OFFERS.signature)

// Festival framing + art + background pattern for the current issue
import { FESTIVE, countdown } from './festive.js'
import { SEASON_ART } from './media.js'
import { iconMarkup } from './decor.js'
export const festive = computed(() => FESTIVE[season.value.id] || FESTIVE.signature)
export const art = computed(() => SEASON_ART[season.value.id] || SEASON_ART.signature)
export const daysTo = computed(() => countdown(season.value.id))

function paintPattern(id) {
  const d = DECOR[id] || DECOR.signature
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><g opacity=".16" transform="translate(16 18) scale(.62)">${iconMarkup(d.hero[0])}</g><g opacity=".16" transform="translate(124 120) rotate(14) scale(.56)">${iconMarkup(d.big)}</g></svg>`
  document.documentElement.style.setProperty('--pattern', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`)
}
import { watch as _watch } from 'vue'
_watch(() => season.value.id, (id) => paintPattern(id), { immediate: true })
