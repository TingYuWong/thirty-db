<template>
  <div class="parallax-container" ref="containerRef">
    <div
      v-for="(layer, index) in layers"
      :key="index"
      class="bg-layer"
      :ref="el => (layerRefs[index] = el)"
      :data-speed="layer.speed"
    >
      <img
        v-for="n in layer.count"
        :key="n"
        class="heart"
        :src="heartSrc"
        :style="randomStyle()"
        alt="bg-heart"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const containerRef = ref(null)
const layerRefs = []
const heartSrc = new URL('@/assets/smoother-element/white-heart.png', import.meta.url).href

const layers = [
  { speed: 0.1, count: 25 },
  { speed: 1, count: 20 },
  { speed: 1.5, count: 15 },
  { speed: 2, count: 10 },
]

function randomStyle() {
  const top = Math.random() * 200 + 'vh'
  const left = Math.random() * 100 + 'vw'
  const scale = 0.5 + Math.random() * 2.5
  const rotate = Math.random() * 360 + 'deg'
  return {
    top,
    left,
    transform: `scale(${scale}) rotate(${rotate})`,
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  layerRefs.forEach((layer, index) => {
    const speed = layers[index].speed
    gsap.to(layer, {
      y: () => -(window.innerHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
})
</script>

<style scoped>
.parallax-container {
  position: relative;
  width: 100%;
  min-height: 200vh;
  overflow: hidden;
  /* background-color: #fbf6ff; */
}

.bg-layer {
  position: absolute;
  width: 100%;
  height: 200vh;
  top: 0;
  left: 0;
  pointer-events: none;
}

.heart {
  width: 50px;
  position: absolute;
  opacity: 0.6;
  animation: float 10s ease-in-out infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1) rotate(0);
  }
  100% {
    transform: translateY(-20px) scale(1.05) rotate(5deg);
  }
}

.content {
  position: relative;
  z-index: 10;
  padding-top: 100vh;
}
</style>
