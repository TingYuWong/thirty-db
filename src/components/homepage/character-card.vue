<template>
  <div class="character-card" ref="cardRef">
    <img
      :src="image"
      :alt="name"
      class="character-image"
      :class="{ 'character__image--visible': imgLoaded }"
      @load="handleImageLoading"
    />
    <div v-if="imgLoaded" class="character-info">
      <h2 class="character-name" ref="nameRef">{{ name }}</h2>
      <p class="character-description" ref="descriptionRef">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const emit = defineEmits<{
  (e: 'next-image'): void
}>()

const handleImageLoading = () => {
  imgLoaded.value = true
}

gsap.registerPlugin(SplitText)

const props = defineProps({
  image: String,
  name: String,
  description: String,
})

const imgLoaded = ref(false)
const cardRef = ref(null)
const nameRef = ref(null)
const descriptionRef = ref(null)

let splitInstances = []
let timeline

const cleanup = () => {
  timeline?.kill()
  splitInstances.forEach(split => split.revert())
  splitInstances = []
}

const playAnimation = async () => {
  cleanup()

  await document.fonts.ready
  await nextTick()

  const names = new SplitText(nameRef.value, { type: 'chars' })
  const description = new SplitText(descriptionRef.value, { type: 'chars' })

  splitInstances = [names, description]

  timeline = gsap.timeline()

  timeline.from(cardRef.value, {
    x: [100, -100][Math.floor(Math.random() * 2)],
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
  })

  timeline.from(
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

  timeline.from(
    description.chars,
    {
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    },
    '-=0.2'
  )

  timeline.to(
    cardRef.value,
    {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        imgLoaded.value = false
        emit('next-image')
      },
    },
    '+=0.1'
  )
}

watch(
  () => imgLoaded.value,
  () => {
    if (imgLoaded.value) {
      playAnimation()
    }
  }
)

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
.character-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100%;
  overflow: hidden;
}

.character-image {
  width: 300px;
  max-width: 45vw;
  border-radius: 1rem;
  object-fit: cover;
  visibility: hidden;
}

.character__image--visible {
  visibility: visible;
}

.character-info {
  color: #fff;
  width: 500px;
  overflow: hidden;
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
@media (max-width: 768px) and (orientation: portrait) {
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

@media (max-width: 900px) and (orientation: landscape) {
  .character-image {
    width: 25%;
    max-width: 25%;
  }

  .character-info {
    max-width: 30%;
  }
}
</style>
