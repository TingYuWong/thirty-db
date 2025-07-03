<template>
  <section ref="heroRef" class="hero">
    <img
      @load="e => (e.target.style.opacity = 1)"
      :src="Bg"
      alt="劇組合照"
      ref="heroBgRef"
      class="hero__bg"
      :class="{ 'hero__bg--visible': isImgLoaded }"
    />
    <div class="hero__overlay"></div>
    <div class="hero__title" ref="titleRef">
      <div
        v-for="(char, i) in titleText"
        :key="i"
        class="char"
        :ref="el => (charRefs[i] = el as HTMLElement)"
      >
        {{ char }}
      </div>
    </div>
  </section>
</template>

<!-- src="https://firebasestorage.googleapis.com/v0/b/thirty-db.firebasestorage.app/o/hero-section%2FDSC05091.JPG?alt=media&token=736e0b7c-8931-490b-82c8-47bd8fb959d3" -->

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Bg from '@/assets/watercolor-final.png'

gsap.registerPlugin(ScrollTrigger)
const { t } = useI18n()

const heroRef = ref(null)
const heroBgRef = ref(null)
const isImgLoaded = ref(false)
const titleText = computed(() => t('home.hero.title'))
const titleRef = ref(null)
const charRefs = ref<HTMLElement[]>([])

const handleAnimation = () => {
  // 字母動畫
  gsap.from(charRefs.value, {
    x: () => (Math.random() - 0.5) * 800,
    y: () => (Math.random() - 0.5) * 800,
    opacity: 0,
    rotate: () => (Math.random() - 0.5) * 360,
    duration: 2.5,
    ease: 'power4.out',
    stagger: 0.05,
  })

  // 視差動畫
  gsap.to(heroBgRef.value, {
    y: () => window.innerHeight * 0.3, // 視差最大移動距離
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true, // 平滑跟隨捲動
    },
  })
}

onMounted(async () => {
  // await nextTick()
  handleAnimation()
})

onUnmounted(() => {
  // 清理所有 ScrollTrigger
  // ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.3s ease-out,
    opacity 0.8s ease;
  opacity: 0;
  will-change: transform, opacity;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 213, 213, 0.171), rgba(187, 187, 187, 0.6));
  z-index: 1;
}

.hero__title {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  animation: fadeIn 1.2s ease-out forwards;
  animation-delay: 0.4s;
  font-size: 3.5rem;
  line-height: 1.4;
  letter-spacing: 0.1em;
  padding: 2rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}

.char {
  font-size: 3rem;
  color: white;
  will-change: transform, opacity;
  min-width: 10px;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
