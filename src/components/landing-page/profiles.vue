<template>
  <div class="profile-page">
    <section ref="profileRef" class="profile">
      <div
        v-if="characters_front.length !== 0 && characters_back.length !== 0"
        class="profile__list"
        ref="cardGroupRef"
      >
        <div v-for="(person, i) in characters_front" :key="i" class="profile__card">
          <div
            class="profile__card-inner"
            :class="{ 'profile__card-inner--flipped': flippedMap[person.id] }"
            @click="() => handleFlipped(person.id)"
          >
            <!-- 正面 -->
            <div class="profile__face profile__face--front">
              <img class="profile__image" :src="person.image" :alt="person.name" />
              <div class="profile__name">{{ person.name }}</div>
              <div class="profile__content">
                <div>{{ `MBTI：${person.mbti}` }}</div>
                <div>{{ `Motto：${person.motto}` }}</div>
                <div>{{ `Habit：${person.habit}` }}</div>
              </div>
            </div>

            <!-- 背面 -->
            <div class="profile__face profile__face--back">
              <img
                class="profile__image"
                :src="characters_back[i].image"
                :alt="characters_back[i].name"
              />
              <div class="profile__name">{{ characters_back[i].name }}</div>
              <div class="profile__content">
                <div>{{ `MBTI：${characters_back[i].mbti}` }}</div>
                <div>{{ `Motto：${characters_back[i].motto}` }}</div>
                <div>{{ `Habit：${characters_back[i].habit}` }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLandingPageStore } from '@/stores/landingPage'
import cardBg from '@/assets/card-bg.png'

const { profileData } = useLandingPageStore()
const flippedMap = ref(Object.fromEntries(profileData.map(item => [item.id, false])))
const characters_front = computed(() =>
  profileData.filter(item => item.type === 'drama').sort((a, b) => a.order - b.order)
)
const characters_back = computed(() =>
  profileData.filter(item => item.type === 'reality').sort((a, b) => a.order - b.order)
)

gsap.registerPlugin(ScrollTrigger)

const profileRef = ref(null)
const cardGroupRef = ref(null)

const handleAnimation = () => {
  const cards = cardGroupRef.value.querySelectorAll('.profile__card')

  cards.forEach((card, i) => {
    gsap.from(card, {
      x: i % 2 === 0 ? -100 : 100,
      y: 50,
      opacity: 0,
      scale: 0.8,
      duration: 3,
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
      },
    })
  })
}

const handleFlipped = (id: string) => {
  flippedMap.value[id] = !flippedMap.value[id]
}

onMounted(async () => {
  handleAnimation()
})
</script>

<style scoped>
.profile-page {
  width: 100%;
  min-height: 100vh;
  /* background-color: #fbf6ff; */
}

.profile {
  min-height: 100vh;
  padding: 4rem;
}

.profile__list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.profile__card {
  width: 90%;
  max-width: 700px;
  height: 700px;
  perspective: 1500px;
  border-radius: 10px;
}

.profile__card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;
}

.profile__card-inner--flipped {
  transform: rotateY(-180deg);
}

.profile__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  background-size: cover; /* 覆蓋整個卡片 */
  background-repeat: no-repeat;
  background-position: center;
}

.profile__face--front {
  background-image: url('@/assets/card-bg.png');
  /* background-color: rgba(255, 255, 255, 0.8); */
  z-index: 2;
}

.profile__face--back {
  background-image: url('@/assets/card-bg2.png');
  /* background-color: rgba(255, 255, 255, -0.8); */
  transform: rotateY(-180deg);
  z-index: 1;
}

.profile__image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

.profile__name {
  padding-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.profile__content {
  width: 100%;
  text-align: left;
  font-size: 1rem;
}

@media screen and (max-width: 600px) {
  .profile__card {
    height: 500px;
  }

  .profile__image {
    height: 300px;
  }
}
</style>
