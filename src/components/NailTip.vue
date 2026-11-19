<script setup>
import { computed } from 'vue'
import { MOTIFS } from '../seasons.js'

const props = defineProps({ design: { type: Object, required: true } })
const m = computed(() => (props.design.motif ? MOTIFS[props.design.motif] : null))
const box = computed(() => {
  const d = props.design
  if (m.value?.top) return { left: '0', top: '0', width: '100%', transform: 'none' }
  const size = d.size ?? 58
  return { left: '50%', top: `${d.y ?? 52}%`, width: `${size}%`, transform: 'translate(-50%, -50%)' }
})
</script>

<template>
  <span
    class="tip"
    :class="{ 'tip--matte': design.gloss === false, 'tip--key': design.keyline }"
    :style="{ background: design.bg }"
  >
    <span v-if="design.band" class="band" :style="{ background: design.band }" />
    <svg v-if="m" class="motif" viewBox="0 0 24 24" :style="box" aria-hidden="true">
      <path v-if="m.d" :d="m.d" :fill="design.ink" />
      <path v-if="m.stroke" :d="m.stroke" fill="none" :stroke="design.ink" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path v-if="m.vein" :d="m.vein" fill="none" stroke="rgb(0 0 0 / .25)" stroke-width="1.2" stroke-linecap="round" />
      <circle v-if="m.center" cx="12" cy="12" r="2.6" :fill="design.dot || '#ffd23f'" />
      <template v-if="m.eyes">
        <ellipse cx="9.4" cy="11" rx="1.4" ry="1.9" :fill="design.eyes || '#000'" />
        <ellipse cx="14.6" cy="11" rx="1.4" ry="1.9" :fill="design.eyes || '#000'" />
      </template>
      <path v-if="m.ribs" d="M12 8v13M8 9c-1.5 3-1.5 9 0 11.5M16 9c1.5 3 1.5 9 0 11.5" fill="none" stroke="rgb(0 0 0 / .3)" stroke-width="1" />
    </svg>
  </span>
</template>

<style scoped>
.band {
  position: absolute;
  inset: -20% 38% -20% 38%;
  transform: rotate(18deg);
}
.motif { position: absolute; height: auto; display: block; }
.tip--matte::after { display: none; }
</style>
