<template>
  <div class="character-wrapper">
    <div v-for="(img, i) in images" :key="i" class="character-card" :ref="el => (cardRefs[i] = el)">
      <img :src="img" class="character-img" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImageOne from '@/assets/characters/1.png'
import ImageTwo from '@/assets/characters/2.png'
import ImageThree from '@/assets/characters/3.png'
import ImageFour from '@/assets/characters/4.png'
import ImageFive from '@/assets/characters/5.png'
import ImageSix from '@/assets/characters/6.png'
import ImageSeven from '@/assets/characters/7.png'
import ImageEight from '@/assets/characters/8.png'
import ImageNine from '@/assets/characters/9.png'
import ImageTen from '@/assets/characters/10.png'
import ImageEleven from '@/assets/characters/11.png'
import ImageTwelve from '@/assets/characters/12.png'
import ImageThirteen from '@/assets/characters/13.png'
import Triangle from '@/assets/smoother-element/weird.png'

gsap.registerPlugin(ScrollTrigger)

const images = [
  ImageOne,
  ImageTwo,
  ImageThree,
  ImageFour,
  ImageFive,
  ImageSix,
  ImageSeven,
  ImageEight,
  ImageNine,
  ImageTen,
  ImageEleven,
  ImageTwelve,
  ImageThirteen,
]

const cardRefs = []

onMounted(async () => {
  ScrollTrigger.refresh()

  await nextTick()

  cardRefs.forEach(card => {
    gsap.set(card, { opacity: 0, scale: 0.8 })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom 30%',
          scrub: true,
          toggleActions: 'play reverse play reverse',
        },
      })
      .to(card, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(card, {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power2.in',
      })
  })
})
</script>

<style scoped>
.character-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 8rem 2rem;
  width: 100vw;
  min-height: 300vh;
  position: relative;
  overflow: hidden;
}

.character-card {
  width: 50vw;
  /* background: white; */
  border-radius: 12px;
  /* box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); */
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.character-img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
