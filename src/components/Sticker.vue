<script setup>
import { computed } from 'vue'
import { iconMarkup } from '../decor.js'

// A die-cut sticker: the illustration drawn twice — a fat white cut border underneath,
// then the inks with a soft dark keyline on top.
const props = defineProps({ icon: { type: [Array, String], required: true } })
const markup = computed(() => iconMarkup(props.icon))
</script>

<template>
  <svg class="sticker" viewBox="-6 -6 76 76" aria-hidden="true">
    <g class="cut" v-html="markup" />
    <g class="ink" v-html="markup" />
  </svg>
</template>

<style scoped>
.sticker { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(0 6px 10px rgb(30 10 40 / 0.18)); }
.cut :deep(*) { fill: #fff !important; stroke: #fff !important; stroke-width: 9px; stroke-linejoin: round; stroke-linecap: round; }
.ink :deep(:not(.no-key):not(g)) { stroke-linejoin: round; }
.ink :deep(path:not(.no-key):not([stroke])),
.ink :deep(circle:not(.no-key):not([stroke])),
.ink :deep(ellipse:not(.no-key):not([stroke])),
.ink :deep(rect:not(.no-key):not([stroke])) { stroke: rgb(43 29 51 / 0.85); stroke-width: 1.6px; }
</style>
