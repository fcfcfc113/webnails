<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({ src: String, poster: String, label: { type: String, default: 'Play video' }, ratio: { type: String, default: '16 / 9' } })
const video = ref(null)
const playing = ref(false)
const muted = ref(true)

function play() {
  const v = video.value
  if (!v) return
  if (v.paused) { v.play(); playing.value = true } else { v.pause(); playing.value = false }
}
function toggleMute() { muted.value = !muted.value; if (video.value) video.value.muted = muted.value }
</script>

<template>
  <div class="frame" :class="{ playing }" :style="{ aspectRatio: ratio }">
    <video
      ref="video"
      :src="src"
      :poster="poster"
      muted
      playsinline
      loop
      preload="none"
      @pause="playing = false"
      @play="playing = true"
    />
    <button type="button" class="play glass" :aria-label="playing ? 'Pause video' : label" @click="play">
      <Icon :name="playing ? 'pause' : 'play'" />
    </button>
    <button v-show="playing" type="button" class="mute glass" :aria-label="muted ? 'Unmute' : 'Mute'" @click="toggleMute">
      <Icon :name="muted ? 'mute' : 'volume'" />
    </button>
    <slot />
  </div>
</template>

<style scoped>
.frame { position: relative; border-radius: var(--r); overflow: hidden; background: #1c141f; box-shadow: var(--shadow); }
video { width: 100%; height: 100%; object-fit: cover; }
.play {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 76px; height: 76px; border: 0; border-radius: 50%;
  display: grid; place-items: center; color: var(--ink); font-size: 1.6rem;
  transition: transform 0.4s var(--ease), opacity 0.3s;
}
.play:hover { transform: translate(-50%, -50%) scale(1.06); }
.playing .play { opacity: 0; }
.playing:hover .play, .play:focus-visible { opacity: 1; }
.mute { position: absolute; right: 14px; bottom: 14px; width: 40px; height: 40px; border: 0; border-radius: 50%; display: grid; place-items: center; color: var(--ink); }
</style>
