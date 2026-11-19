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
