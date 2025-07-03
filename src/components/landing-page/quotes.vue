<template>
  <div class="morph-container">
    <svg
      ref="svgRef"
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffc2a1" />
          <stop offset="100%" stop-color="#ff9eb5" />
        </linearGradient>
      </defs>
      <g transform="translate(479.88686076514455 284.0750457015751)">
        <path ref="pathRef" :d="pathA" :transform="currentTransform" fill="url(#gradientFill)" />
      </g>
    </svg>

    <transition name="fade" mode="out-in">
      <div class="motto" :key="currentLine">
        {{ currentLine }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const pathRef = ref(null)

const pathA = ref(
  'M122.3 -203.9C154.7 -193.2 174.3 -152.6 180.2 -113.6C186 -74.7 178 -37.3 179.4 0.8C180.9 39 191.8 78 178.3 103.8C164.9 129.7 127.2 142.3 93.4 151C59.7 159.6 29.8 164.2 -2.1 167.8C-34 171.4 -68 174 -93.5 160.7C-119.1 147.3 -136.2 117.9 -158.7 88.4C-181.2 59 -209.1 29.5 -221.1 -6.9C-233.1 -43.3 -229.1 -86.7 -207.2 -117.1C-185.3 -147.6 -145.4 -165.2 -107.9 -172.8C-70.3 -180.5 -35.2 -178.2 4.9 -186.8C45 -195.3 90 -214.6 122.3 -203.9'
)
const pathB =
  'M94.4 -175.5C120.8 -148.3 139.7 -119.9 163.2 -90.4C186.7 -61 214.8 -30.5 218.9 2.3C222.9 35.2 202.8 70.3 179.2 99.6C155.7 128.9 128.6 152.4 98.1 173.5C67.7 194.5 33.8 213.3 1.9 209.9C-30 206.6 -60 181.3 -99 165.1C-137.9 148.9 -185.9 142 -206.4 116C-226.9 90 -219.9 45 -205.3 8.4C-190.7 -28.1 -168.4 -56.3 -154.2 -93.1C-139.9 -129.9 -133.7 -175.4 -109.4 -203.8C-85 -232.2 -42.5 -243.6 -4.3 -236.3C34 -228.9 68 -202.8 94.4 -175.5'

const morph = () => {
  gsap.to(pathRef.value, {
    duration: 2,
    morphSVG: pathB,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  })
}

// 📝 舞台劇台詞句子們
const quotes = [
  '「你不用一直這麼努力，也可以被喜歡。」',
  '「我一直以為只要夠好，就不會被拋下。」',
  '「其實我也想要一個人陪。」',
  '「不是我不努力，是我真的累了。」',
  '「原來，我也可以只是我自己。」',
]

const currentLine = ref(quotes[0])
let index = 0

const cycleQuotes = () => {
  setInterval(() => {
    index = (index + 1) % quotes.length
    currentLine.value = quotes[index]
  }, 4000)
}

onMounted(() => {
  morph()
  cycleQuotes()
})
</script>

<style scoped>
.morph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

svg {
  width: 100%;
  min-width: 300px;
  height: auto;
  display: block;
  transform: scale(1.1);
}

.motto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  width: 80%;
  line-height: 1.6;
  transition: opacity 0.5s ease;
  white-space: pre-line;
}

/* ✨ 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1100px) {
  svg {
    transform: scale(1.7);
  }
}
</style>
