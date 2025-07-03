<template>
  <div class="character-wrap">
    <CharacterCard
      :key="currentItem.name"
      :image="currentItem.image"
      :name="currentItem.name"
      :description="currentItem.description"
    />
  </div>
</template>

<script setup lang="ts">
import CharacterCard from '@/components/homepage/character-card.vue'
import MooChanOne from '@/assets/characters/4.png'
import MooChanTwo from '@/assets/characters/7.png'
import Helen from '@/assets/characters/12.png'
import Mom from '@/assets/characters/11.png'
import Dad from '@/assets/characters/10.png'
import PeiYeng from '@/assets/characters/9.png'
import Luu from '@/assets/characters/8.png'
import Guardian from '@/assets/characters/6.png'
import Summer from '@/assets/characters/5.png'
import Ex from '@/assets/characters/3.png'
import BadFriend from '@/assets/characters/2.png'
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits<{
  (e: 'next-section'): void
}>()

const femaleLead = [MooChanOne, MooChanTwo]

const characters = [
  {
    name: '簡沐橙',
    description: '深深地愛著、感受著，對重要的人事物有一種近乎使命感的投入與守護',
    image: femaleLead[Math.floor(Math.random() * femaleLead.length)],
  },
  {
    name: '方芯蕾',
    description: '野心勃勃、利益導向，所有人際互動不過是一種互相利用的商業關係',
    image: BadFriend,
  },
  {
    name: '林渝晴',
    description: '善於療癒與引導，用溫柔默默點亮他人的夜空',
    image: Summer,
  },
  {
    name: '黃小鷺',
    description: '心思細膩，透過音樂梳理情緒，渴望被理解與看見',
    image: Luu,
  },
  {
    name: '簡媽',
    description: '敏銳、強大，能給予身邊的人適當的建議與關懷',
    image: Mom,
  },
  {
    name: '簡爸',
    description: '幽默、柔軟，習慣用行動表達自己的關愛',
    image: Dad,
  },
  {
    name: '薛沛妍',
    description: '魅力強大，善於操縱人心，做任何事都只是為了滿足自己的優越感與虛榮心',
    image: PeiYeng,
  },
  {
    name: 'Helen',
    description: '專業幹練，比起同事及下屬的感受，更在意眼前的工作是否能順利完成',
    image: Helen,
  },
  {
    name: '吳建勳',
    description: '在不安面前，總是選擇先保護自己，即使知道那會傷害深愛自己的人',
    image: Ex,
  },
  {
    name: '保全大叔',
    description: '豁達、爽朗，輕鬆自在地活在每個當下',
    image: Guardian,
  },
]

const index = ref(0)
const currentItem = computed(() => characters[index.value])
let intervalTimer = null

onMounted(() => {
  intervalTimer = setInterval(() => {
    if (index.value >= characters.length - 1) {
      clearInterval(intervalTimer)
      emit('next-section')
      return
    }
    index.value++
  }, 6500)
})
</script>

<style scoped>
.character-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(129% 99% at 112% 85%, rgb(255, 158, 158) 20%, rgb(255, 237, 195) 90%),
    url('@/assets/noise.png');
  background-blend-mode: color-dodge;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
