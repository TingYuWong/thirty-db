<template>
  <div class="thanks-wrapper" ref="wrapperRef">
    <div class="thanks-track" ref="trackRef">
      <div class="thanks-slide" v-for="(item, index) in specialThanks" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref(null)
const trackRef = ref(null)

const scrollTriggerId = 'special-thanks-scroll'
let tween = null

const specialThanks = [
  '感謝在夜晚陪伴我們的那碗泡麵',
  '感謝借我們場地的學校警衛阿伯',
  '感謝沒退追我們的朋友',
  '感謝你願意花時間看完這齣戲',
  '感謝所有曾經支持表演藝術的人',
  '感謝在夜晚陪伴我們的那碗泡麵',
  '感謝借我們場地的學校警衛阿伯',
  '感謝沒退追我們的朋友',
  '感謝你願意花時間看完這齣戲',
]

const setupScroll = () => {
  // 清除舊的
  ScrollTrigger.getById(scrollTriggerId)?.kill()
  tween?.kill()

  const slides = trackRef.value.children
  const totalSlides = slides.length
  const totalWidth = totalSlides * window.innerWidth
  trackRef.value.style.width = `${totalWidth}px`

  tween = gsap.to(trackRef.value, {
    x: `-${totalWidth - window.innerWidth}px`,
    ease: 'none',
    scrollTrigger: {
      id: scrollTriggerId,
      trigger: wrapperRef.value,
      start: 'top top',
      end: `+=${totalWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      snap: 1 / (totalSlides - 1),
    },
  })

  ScrollTrigger.refresh()
}

onMounted(async () => {
  await nextTick()
  setupScroll()
  window.addEventListener('resize', setupScroll)
})

onBeforeUnmount(() => {
  ScrollTrigger.getById(scrollTriggerId)?.kill()
  window.removeEventListener('resize', setupScroll)
  tween?.kill()
})
</script>

<style scoped>
.thanks-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  /* background: black; */
  color: white;
}

.thanks-track {
  display: flex;
  height: 100%;
  width: max-content;
}

.thanks-slide {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: 'Noto Sans TC', sans-serif;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
