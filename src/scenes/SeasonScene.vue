<script setup>
import { computed } from 'vue'
import { season } from '../season.js'
import ChristmasScene from './ChristmasScene.vue'
import HalloweenScene from './HalloweenScene.vue'
import AutumnScene from './AutumnScene.vue'
import SpringScene from './SpringScene.vue'
import ValentineScene from './ValentineScene.vue'
import SummerScene from './SummerScene.vue'
import PromScene from './PromScene.vue'
import WinterScene from './WinterScene.vue'
import SignatureScene from './SignatureScene.vue'

// One big, animated, hand-drawn scene per issue.
const map = { christmas: ChristmasScene, halloween: HalloweenScene, fall: AutumnScene, thanksgiving: AutumnScene, spring: SpringScene, valentine: ValentineScene, summer: SummerScene, prom: PromScene, winter: WinterScene, signature: SignatureScene }
const comp = computed(() => map[season.value.id] || SignatureScene)
</script>

<template>
  <div class="season-scene"><component :is="comp" :key="season.id" :thanks="season.id === 'thanksgiving'" /></div>
</template>

<style scoped>
.season-scene { position: absolute; inset: 0 0 50px 0; z-index: 4; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .season-scene :deep(*) { animation-play-state: paused !important; } }
</style>
