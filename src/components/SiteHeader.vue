<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { salon } from '../data.js'
import { SOCIALS } from '../media.js'
import SeasonSwitcher from './SeasonSwitcher.vue'
import Icon from './Icon.vue'

const onHero = ref(true)
const sheet = ref(null)
const onScroll = () => (onHero.value = window.scrollY < window.innerHeight - 120)
onMounted(() => { onScroll(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll) })
onBeforeUnmount(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) })

const links = [
  { href: '#studio', label: 'Studio' },
  { href: '#menu', label: 'Menu' },
  { href: '#collection', label: 'Collection' },
  { href: '#sets', label: 'Sets' },
  { href: '#reels', label: 'Reels' },
  { href: '#visit', label: 'Visit' },
]
function openMenu() { sheet.value?.showModal(); document.documentElement.style.overflow = 'hidden' }
function closeMenu() { sheet.value?.close() }
function onClose() { document.documentElement.style.overflow = '' }
</script>

<template>
  <header class="head" :class="{ 'on-hero': onHero }">
    <div class="bar">
      <a class="brand" href="#top" aria-label="Petal & Polish, home">
        <span class="mark" aria-hidden="true">
          <svg viewBox="0 0 32 32"><path d="M16 3c5 0 8 6 8 14 0 7-3.6 12-8 12s-8-5-8-12C8 9 11 3 16 3z" fill="currentColor"/><path d="M12 9.5c.8-2.4 2.2-3.7 4-3.9" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
        </span>
        <span class="name">{{ salon.name }}</span>
      </a>

      <nav aria-label="Main">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <div class="right">
        <SeasonSwitcher />
        <a class="round call" :href="salon.phoneHref" :aria-label="`Call ${salon.phone}`"><Icon name="phone" /></a>
        <a class="btn btn--sm book" href="#book">Book</a>
        <button type="button" class="round burger" aria-label="Open menu" aria-haspopup="dialog" @click="openMenu">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
        </button>
      </div>
    </div>

    <dialog ref="sheet" class="sheet" aria-label="Menu" @close="onClose" @click.self="closeMenu">
      <div class="sheet__panel">
        <div class="sheet__top">
          <span class="name">{{ salon.name }}</span>
          <button type="button" class="round" aria-label="Close menu" @click="closeMenu"><Icon name="close" /></button>
        </div>
        <nav aria-label="Mobile">
          <a v-for="(l, n) in links" :key="l.href" :href="l.href" :style="{ '--d': n * 40 + 'ms' }" @click="closeMenu">{{ l.label }}<Icon name="arrowRight" /></a>
        </nav>
        <div class="sheet__cta">
          <a class="btn btn--lg" href="#book" @click="closeMenu"><Icon name="calendar" /> Book a set</a>
          <a class="btn btn--lg btn--ghost" :href="salon.phoneHref"><Icon name="phone" /> <span class="num">{{ salon.phone }}</span></a>
        </div>
        <div class="sheet__social">
          <a v-for="s in SOCIALS" :key="s.id" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name" class="round"><Icon :name="s.id" /></a>
        </div>
      </div>
    </dialog>
  </header>
</template>

<style scoped>
.head { position: sticky; top: 0; z-index: 50; height: var(--head-h); padding: 10px var(--gutter) 0; padding-top: max(10px, env(safe-area-inset-top)); }
.bar {
  max-width: 1440px; margin-inline: auto; height: calc(var(--head-h) - 16px);
  display: flex; align-items: center; gap: 20px;
  padding: 0 8px 0 18px; border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 76%, transparent);
  backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--surface) 60%, transparent), var(--shadow-sm);
  transition: background-color 0.4s var(--ease), box-shadow 0.4s var(--ease), color 0.4s;
}

.on-hero .bar { background: rgb(20 10 20 / 0.22); color: #fff; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2); }
.on-hero .mark { color: #fff; }
.on-hero nav a:hover { background: rgb(255 255 255 / 0.16); }
.on-hero .round { background: rgb(255 255 255 / 0.14); color: #fff; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25); }
.on-hero :deep(.trigger) { background: rgb(255 255 255 / 0.14); color: #fff; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25); }
.on-hero :deep(.trigger small) { color: rgb(255 255 255 / 0.8); }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; min-height: 44px; }
.mark { width: 28px; height: 28px; color: var(--accent); transform: rotate(-14deg); transition: color 0.3s; }
.mark svg { width: 100%; height: 100%; }
.name { font-family: var(--display); font-size: 1.35rem; letter-spacing: -0.01em; white-space: nowrap; }
nav { display: flex; gap: 2px; margin-left: auto; }
nav a { text-decoration: none; font-weight: 500; font-size: 0.96rem; padding: 10px 14px; border-radius: 999px; transition: background-color 0.25s; }
nav a:hover { background: color-mix(in srgb, var(--accent-soft) 80%, transparent); }
.right { display: flex; align-items: center; gap: 8px; }
.round {
  width: 44px; height: 44px; flex: none; border: 0; border-radius: 50%; display: grid; place-items: center;
  background: color-mix(in srgb, var(--surface) 70%, transparent); color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line); transition: background-color 0.3s, color 0.3s;
}
.burger { display: none; }
.burger svg { width: 22px; height: 22px; }

/* menu sheet (phones & tablets) */
.sheet { border: 0; padding: 0; margin: 0 0 0 auto; width: min(420px, 100vw); max-width: none; height: 100dvh; max-height: none; background: transparent; color: var(--ink); }
.sheet::backdrop { background: rgb(20 10 20 / 0.45); backdrop-filter: blur(4px); }
.sheet[open] .sheet__panel { animation: slide-in 0.45s var(--ease) both; }
@keyframes slide-in { from { transform: translateX(100%); } }
.sheet__panel {
  height: 100%; background: var(--bg); display: flex; flex-direction: column; gap: 24px;
  padding: max(16px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom));
  overflow-y: auto;
}
.sheet__top { display: flex; justify-content: space-between; align-items: center; }
.sheet nav { display: grid; margin: 0; gap: 0; }
.sheet nav a {
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--display); font-size: 2rem; padding: 14px 4px; border-radius: 0;
  border-bottom: 1px solid var(--line); animation: rise 0.5s var(--ease) both; animation-delay: var(--d);
}
.sheet nav a .icon { color: var(--accent); }
@keyframes rise { from { opacity: 0; transform: translateY(10px); } }
.sheet__cta { display: grid; gap: 10px; margin-top: auto; }
.sheet__cta .btn--ghost { --b-bg: var(--surface); }
.btn--lg { min-height: 54px; }
.sheet__social { display: flex; gap: 10px; justify-content: center; }
.sheet__social .round { --yt-play: var(--surface); }

@media (max-width: 1080px) {
  .bar > nav { display: none; }
  .right { margin-left: auto; }
  .burger { display: grid; }
}
@media (max-width: 680px) {
  .head { padding-inline: 10px; }
  .bar { gap: 8px; padding-left: 14px; padding-right: 6px; }
  .name { font-size: 1.15rem; }
  .call, .book { display: none; }
}
@media (max-width: 430px) { .bar > .brand .name { display: none; } }
</style>
