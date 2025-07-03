<!-- <template>
    <div>podcast page: {{ id }}</div>
</template> -->
<!--
<script setup lang="ts">
import Rain from '@/assets/rain.mp3'
defineProps<{ id: string }>()
</script> -->

<template>
  <div class="player" ref="playerRef">
    <div>podcast page: {{ id }}</div>
    <canvas ref="canvasRef" class="visualizer"></canvas>

    <!-- 播放進度圈 + 圖示 -->
    <svg viewBox="0 0 120 120" class="icon" @click="toggle">
      <!-- 背景圓圈 -->
      <circle cx="60" cy="60" r="54" stroke="#ffffff33" stroke-width="4" fill="none" />
      <!-- 播放進度圓圈 -->
      <circle
        ref="progressCircleRef"
        cx="60"
        cy="60"
        r="54"
        stroke="#fff"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-dasharray="339.292"
        :stroke-dashoffset="progressOffset"
        style="transition: stroke-dashoffset 0.1s linear"
      />
      <!-- Play/Pause 圖示 -->
      <path ref="iconPathRef" :d="currentPath" fill="#ffffff" transform="translate(30,30)" />
    </svg>

    <audio ref="audioRef" :src="Rain" @ended="onEnded" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Rain from '@/assets/rain.mp3'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
gsap.registerPlugin(MorphSVGPlugin)

defineProps<{ id: string }>()

// Heroicons 風格
const playPath = 'M6 4l20 12-20 12V4z' // 簡化 Heroicons
const pausePath = 'M6 4h6v24H6zM18 4h6v24h-6z'

const currentPath = ref(playPath)
const progressOffset = ref(339.292) // 初始進度條 (2πr ≈ 339.292)

const iconPathRef = ref(null)
const audioRef = ref(null)
const canvasRef = ref(null)
const playerRef = ref(null)
const progressCircleRef = ref(null)
const audioSrc = '/your-audio.mp3'

let isPlaying = false
let audioCtx = null
let analyser = null
let source = null
let dataArray = null
let animationId = null
let bgTween = null
let progressInterval = null

const toggle = async () => {
  const audio = audioRef.value

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    source = audioCtx.createMediaElementSource(audio)
    analyser = audioCtx.createAnalyser()
    source.connect(analyser)
    analyser.connect(audioCtx.destination)

    analyser.fftSize = 256
    dataArray = new Uint8Array(analyser.frequencyBinCount)
  }

  if (audioCtx.state === 'suspended') {
    await audioCtx.resume()
  }

  if (isPlaying) {
    audio.pause()
    morphTo(playPath)
    cancelAnimationFrame(animationId)
    clearInterval(progressInterval)
    stopBackgroundLoop()
  } else {
    audio.play()
    morphTo(pausePath)
    startVisualizer()
    startProgressTracker()
    startBackgroundLoop()
  }

  isPlaying = !isPlaying
}

const onEnded = () => {
  morphTo(playPath)
  cancelAnimationFrame(animationId)
  clearInterval(progressInterval)
  stopBackgroundLoop()
  progressOffset.value = 339.292
  isPlaying = false
}

const morphTo = targetPath => {
  gsap.to(iconPathRef.value, {
    duration: 0.4,
    morphSVG: { shape: targetPath },
    ease: 'power2.out',
    onUpdate: () => {
      currentPath.value = targetPath
    },
  })
}

const startProgressTracker = () => {
  const audio = audioRef.value
  const circleLength = 2 * Math.PI * 54 // r = 54

  progressInterval = setInterval(() => {
    if (audio.duration) {
      const percent = audio.currentTime / audio.duration
      progressOffset.value = circleLength * (1 - percent)
    }
  }, 100)
}

// 背景漸層變換
const startBackgroundLoop = () => {
  const player = playerRef.value
  const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#8fd3f4']

  let index = 0
  const nextColor = () => {
    const from = colors[index % colors.length]
    const to = colors[(index + 1) % colors.length]
    bgTween = gsap.to(player, {
      background: `linear-gradient(135deg, ${from}, ${to})`,
      duration: 4,
      ease: 'power1.inOut',
      onComplete: () => {
        index++
        nextColor()
      },
    })
  }

  nextColor()
}

const stopBackgroundLoop = () => {
  if (bgTween) bgTween.kill()
  playerRef.value.style.background = '#000'
}

// 音波動畫
const startVisualizer = () => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  resizeCanvas()

  const draw = () => {
    animationId = requestAnimationFrame(draw)
    analyser.getByteFrequencyData(dataArray)

    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / dataArray.length) * 2.5
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i]
      ctx.fillStyle = `rgb(${barHeight + 100},50,150)`
      ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
      x += barWidth + 1
    }
  }

  draw()
}

// Canvas resize
const resizeCanvas = () => {
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationId)
  clearInterval(progressInterval)
})
</script>

<style scoped>
.player {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
  transition: background 1s ease;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  width: 120px;
  height: 120px;
  padding: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.visualizer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
