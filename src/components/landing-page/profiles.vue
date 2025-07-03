<template>
  <section class="profile">
    <div
      v-for="(character, index) in characters"
      :key="character.id"
      :ref="el => (charRefs[index] = el)"
      class="profile__character-item"
    >
      <img
        :src="character.image"
        :alt="character.name"
        :ref="el => (imgRefs[index] = el)"
        class="profile__img"
      />
      <p class="profile__quote">{{ character.quote }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import A from '@/assets/characters/1.png'
import B from '@/assets/characters/2.png'
import C from '@/assets/characters/3.png'
import D from '@/assets/characters/4.png'
import E from '@/assets/characters/5.png'
import F from '@/assets/characters/6.png'
import G from '@/assets/characters/7.png'
import H from '@/assets/characters/8.png'
import I from '@/assets/characters/9.png'
import J from '@/assets/characters/10.png'
import K from '@/assets/characters/11.png'
import L from '@/assets/characters/12.png'
import M from '@/assets/characters/13.png'

const characters = [
  { id: 1, name: 'A', image: A, quote: '我一直都在努力活成值得被喜歡的樣子' },
  { id: 2, name: 'B', image: B, quote: '其實我一直都知道你不喜歡我' },
  { id: 3, name: 'C', image: C, quote: '每個音符，都是我想說卻不敢說的話' },
  { id: 4, name: 'D', image: D, quote: '你可以看不起我，但不能阻止我' },
  { id: 5, name: 'E', image: E, quote: '如果重來一次，我會勇敢說不要' },
  { id: 6, name: 'F', image: F, quote: '我不再為了被接納而討好所有人' },
  { id: 7, name: 'G', image: G, quote: '我不是弱，只是不想裝堅強了' },
  { id: 8, name: 'H', image: H, quote: '那天我沉默，不代表我不在乎' },
  { id: 9, name: 'I', image: I, quote: '我只是累了，不想再說服誰了' },
  { id: 10, name: 'J', image: J, quote: '我笑，是因為我怕哭' },
  { id: 11, name: 'K', image: K, quote: '我不完美，但我值得被愛' },
  { id: 12, name: 'L', image: L, quote: '你沒錯，我也沒錯，我們只是不同' },
  { id: 13, name: 'M', image: M, quote: '謝謝你讓我知道，溫柔不是軟弱' },
]

const charRefs = ref([])
const imgRefs = ref([])

onMounted(async () => {
  imgRefs.value.forEach((img, index) => {
    const fromX = index % 2 === 0 ? -100 : 100

    gsap.fromTo(
      img,
      { x: fromX, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: charRefs.value[index],
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    )
  })
})
</script>

<style scoped>
.profile {
  padding: 1rem;
}

.profile__character-item {
  padding: 1rem;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile__img {
  width: 60%;
  max-height: 100%;
  object-fit: cover;
  opacity: 0;
}

.profile__quote {
  padding: 1rem;
  font-size: 30px;
  color: gray;
}
</style>
