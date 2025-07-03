<template>
  <div class="cookie-wrapper" @click="handleClick" role="button" tabindex="0">
    <!-- Lottie 動畫容器 -->
    <div class="lottie-container" ref="lottieContainer"></div>
    <!-- 幸運字條 -->
    <div class="fortune-strip" :class="{ slideIn: isOpened }">
      {{ fortuneText }}
    </div>

    <!-- 煙火粒子 -->
    <teleport to="body">
      <div v-for="group in fireworkGroups" :key="group.id">
        <div
          v-for="(particle, index) in group.particles"
          :key="index"
          class="particle"
          :class="particle.variant"
          :style="{
            left: `${group.x}px`,
            top: `${group.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.variant === 'filled' ? particle.color : 'transparent',
            borderColor: particle.variant === 'outlined' ? particle.color : 'transparent',
          }"
          :ref="el => animateParticle(el, particle, group.id)"
        />
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import lottie from 'lottie-web'
import { gsap } from 'gsap'

const emit = defineEmits<{
  (e: 'next-section'): void
}>()

const fortunes = [
  '好運將降臨在你身上。',
  '未來充滿無限可能。',
  '今天是一個新開始。',
  '耐心是成功的關鍵。',
  '你的努力即將得到回報。',
  '微笑能帶來奇蹟。',
  '新的機會正等待著你。',
  '學會放下，才能擁有更多。',
  '幸福往往在意想不到的角落出現。',
  '善良會讓世界更美好。',
  '相信直覺，它正在指引你正確的方向。',
  '你的夢想值得被實現。',
  '不要害怕改變，那是新生的開始。',
  '你的堅持將打動他人。',
  '冒險會帶來奇妙的收穫。',
  '你將遇見值得信賴的夥伴。',
]

const isOpened = ref(false)
const fortuneText = ref(fortunes[Math.floor(Math.random() * fortunes.length)])
const lottieContainer = ref(null)
let animationInstance = null
let hasPlayed = false

const fireworkGroups = reactive([])
const colorOptions = ['#f0cf65', '#EC368D', '#f0a1ec', '#EB6424', '#ffffff']

const triggerFirework = (x, y) => {
  const particles = Array.from({ length: 25 }, () => {
    const angle = Math.random() * Math.PI * 2
    const radius = 80 + Math.random() * 40
    const size = 50 + Math.random() * 12
    const variant = Math.random() > 0.5 ? 'filled' : 'outlined'
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    return {
      dx: Math.cos(angle) * radius,
      dy: Math.sin(angle) * radius,
      size,
      variant,
      color,
    }
  })

  const id = Date.now() + Math.random()
  fireworkGroups.push({ id, x, y, particles })
}

const animateParticle = (el, particle, groupId) => {
  if (!el) return
  gsap.to(el, {
    x: particle.dx,
    y: particle.dy,
    scale: 0,
    opacity: 0,
    duration: 1 + Math.random() * 0.5,
    ease: 'power3.out',
    onComplete: () => {
      const idx = fireworkGroups.findIndex(g => g.id === groupId)
      if (idx !== -1) fireworkGroups.splice(idx, 1)
    },
  })
}

onMounted(() => {
  if (!lottieContainer.value) return
  animationInstance = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://lottie.host/ab6ca04b-3bf2-463f-a711-c59fbca19d58/qZmmhQLaGA.json',
  })
  animationInstance.goToAndStop(0, true)
})

const handleClick = event => {
  triggerFirework(event.clientX, event.clientY)
  if (hasPlayed || !animationInstance) return
  hasPlayed = true
  animationInstance.play()
  animationInstance.addEventListener('complete', () => {
    isOpened.value = true
    setTimeout(() => emit('next-section'), 3000)
  })
}
</script>

<style scoped>
.cookie-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  user-select: none;
  outline: none;
  padding: 0;
  background:
    radial-gradient(129% 99% at 112% 85%, rgb(223, 220, 255) 20%, rgb(255, 179, 158) 90%),
    url('@/assets/noise.png');
  background-blend-mode: color-dodge;
}

.fortune-strip {
  width: 70vw;
  padding: 1rem;
  background-color: #fff9e1;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  font-weight: 700;
  color: #c76f00;
  text-align: center;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.35s ease;
  user-select: none;
}

.slideIn {
  transform: translateY(0);
  opacity: 1;
}

.lottie-container {
  width: 50%;
  min-width: 350px;
  pointer-events: none;
  margin-left: 2rem;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(1);
  border: 2px solid transparent;
}
</style>
