<template>
  <div class="character-card" ref="cardRef">
    <img :src="image" :alt="name" class="character-image" />
    <div class="character-info">
      <h2 class="character-name" ref="nameRef">{{ name }}</h2>
      <p class="character-description" ref="descriptionRef">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const props = defineProps({
  image: String,
  name: String,
  description: String,
})

const cardRef = ref(null)
const nameRef = ref(null)
const descriptionRef = ref(null)

onMounted(async () => {
  await document.fonts.ready

  const names = new SplitText(nameRef.value, { type: 'chars' })
  const description = new SplitText(descriptionRef.value, { type: 'chars' })

  const tl = gsap.timeline({})

  tl.from(cardRef.value, {
    x: [100, -100][Math.floor(Math.random() * 2)],
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  })

  tl.from(
    names.chars,
    {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    },
    '-=0.2'
  )

  tl.from(description.chars, {
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out',
  })
})
</script>

<style scoped>
.character-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;
}

.character-image {
  width: 300px;
  max-width: 45vw;
  border-radius: 1rem;
  object-fit: cover;
}

.morph-bg {
}

.character-info {
  width: 500px;
}

.character-name {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.character-description {
  font-size: 1.1rem;
  line-height: 1.6;
}

/* 手機版 */
@media (max-width: 768px) {
  .character-card {
    flex-direction: column;
    text-align: center;
  }

  .character-image {
    width: 50%;
    max-width: 50%;
  }

  .character-info {
    max-width: 70%;
  }
}
</style>
