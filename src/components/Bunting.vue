<script setup>
import { computed } from 'vue'

// A festive garland strung across a section edge: flags, hearts, leaves, pearls or string lights.
const props = defineProps({ config: { type: Object, required: true } })

const unit = 180 // px per swag
const svg = computed(() => {
  const { type = 'flags', colors = ['#f5a'] } = props.config
  const c = (i) => colors[i % colors.length]
  const string = `<path d="M0 6 Q${unit / 2} 34 ${unit} 6" fill="none" stroke="rgba(60,40,60,.45)" stroke-width="1.6"/>`
  // points along the sag curve
  const pts = [0.17, 0.39, 0.61, 0.83].map((t) => {
    const x = t * unit
    const y = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 34 + t * t * 6
    return [x, y]
  })
  let items = ''
  pts.forEach(([x, y], i) => {
    const col = c(i)
    if (type === 'flags') items += `<path d="M${x - 13} ${y - 2}L${x + 13} ${y + 1}L${x + 1} ${y + 30}z" fill="${col}" stroke="rgba(0,0,0,.08)"/>`
    if (type === 'hearts') items += `<path transform="translate(${x} ${y + 12}) scale(1.7)" d="M0 5C-2 3.4-6 1-6-2.4-6-4.6-4.4-6-2.6-6-1.4-6-.6-5.3 0-4.4.6-5.3 1.4-6 2.6-6 4.4-6 6-4.6 6-2.4 6 1 2 3.4 0 5z" fill="${col}"/>`
    if (type === 'leaves') items += `<path transform="translate(${x} ${y + 12}) rotate(${i % 2 ? 20 : -20}) scale(1.6)" d="M0-7C4-4 6 0 0 7-6 0-4-4 0-7z" fill="${col}"/>`
    if (type === 'pearls') items += `<circle cx="${x}" cy="${y + 1}" r="6" fill="${col}" stroke="rgba(0,0,0,.08)"/><circle cx="${x - 2}" cy="${y - 1}" r="1.8" fill="#fff" opacity=".8"/>`
    if (type === 'lights') items += `<rect x="${x - 3}" y="${y - 2}" width="6" height="6" rx="1" fill="#556"/><path d="M${x} ${y + 4}c-6 4-6 14 0 18 6-4 6-14 0-18z" fill="${col}"/><circle cx="${x}" cy="${y + 13}" r="12" fill="${col}" opacity=".18"/>`
  })
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${unit}" height="56" viewBox="0 0 ${unit} 56">${string}${items}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(markup)}")`
})
</script>

<template>
  <div class="bunting" :class="'bunting--' + config.type" :style="{ backgroundImage: svg }" aria-hidden="true" />
</template>

<style scoped>
.bunting {
  height: 56px;
  background-repeat: repeat-x;
  background-position: center top;
  pointer-events: none;
}
.bunting--lights { animation: twinkle 2.4s ease-in-out infinite alternate; }
@keyframes twinkle { from { filter: brightness(0.9) saturate(0.9); } to { filter: brightness(1.15) saturate(1.2); } }
</style>
