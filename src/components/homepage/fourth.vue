<template>
  <div class="gsap-wrap">
    <div class="split" ref="quoteOneEl">Welcome to our show</div>
    <div class="split" ref="quoteTwoEl">She speaks at 30 dB</div>
    <div class="keyword" ref="quoteThreeEl">Your keyword: {{ keyword }}</div>
    <div class="decoy" ref="decoysEl">
      {{ keywords.join(' ') }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

const keywords = [
  'introspection',
  'vulnerability',
  'authenticity',
  'self-worth',
  'reclaiming',
  'self-acceptance',
  'resilience',
  'awakening',
  'clarity',
  'boundaries',
  'unlearning',
  'unshakable',
  'mellow',
  'kindness',
  'outgrowing',
  'breathe',
]

gsap.registerPlugin(SplitText)

const quoteOneEl = ref(null)
const quoteTwoEl = ref(null)
const quoteThreeEl = ref(null)
const keyword = ref(keywords[Math.floor(Math.random() * keywords.length)])

const decoysEl = ref(null)
const emit = defineEmits(['done'])

let splitInstances = []
let timeline

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (1 + max - min) + min)
}

const cleanup = () => {
  // 清除舊動畫與拆字
  timeline?.kill()
  splitInstances.forEach(split => split.revert())
  splitInstances = []
}

const playIntro = () => {
  cleanup()

  const quoteOne = quoteOneEl.value
  const quoteTwo = quoteTwoEl.value
  const quoteThree = quoteThreeEl.value

  const decoy = decoysEl.value

  const quoteOneSplit = SplitText.create(quoteOne, { type: 'words' })
  const quoteTwoSplit = SplitText.create(quoteTwo, { type: 'words' })
  const quoteThreeSplit = SplitText.create(quoteThree, { type: 'words' })
  const decoySplit = SplitText.create(decoy, { type: 'words' })

  splitInstances = [quoteOneSplit, quoteTwoSplit, quoteThreeSplit, decoySplit]
  const allWords = [
    ...quoteOneSplit.words,
    ...quoteTwoSplit.words,
    ...quoteThreeSplit.words,
    ...decoySplit.words,
  ]

  gsap.set([quoteOne, quoteTwo, quoteThree, decoy], { visibility: 'visible' })
  gsap.set(allWords, {
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    padding: '3px 5px',
    borderRadius: '1px',
    userSelect: 'none',
  })

  timeline = gsap.timeline({ delay: 0 })

  // 散開動畫
  allWords.forEach(word => {
    timeline.to(
      word,
      {
        duration: 0.4 + Math.random() * 0.5,
        force3D: true,
        rotation: randomInteger(-60, 60),
        x: randomInteger(-350, 350),
        y: randomInteger(60, 200),
        autoAlpha: 1,
        ease: 'power2.out',
        startAt: {
          x: randomInteger(-400, 400),
          y: randomInteger(-300, 300),
          autoAlpha: 0,
        },
      },
      Math.random() * 0.5
    )
  })

  // 聚焦句子
  quoteOneSplit.words.forEach((word, i) => {
    timeline.to(
      word,
      {
        duration: 0.5,
        rotation: randomInteger(-6, 10),
        x: randomInteger(-2, 2),
        y: randomInteger(-4, 4),
      },
      'sentence+=' + i * 0.3
    )
  })

  quoteTwoSplit.words.forEach((word, i) => {
    timeline.to(
      word,
      {
        delay: 1.5,
        duration: 0.5,
        rotation: randomInteger(-6, 10),
        x: randomInteger(-2, 2),
        y: randomInteger(-4, 4),
      },
      'sentence+=' + i * 0.3
    )
  })

  quoteThreeSplit.words.forEach((word, i) => {
    timeline.to(
      word,
      {
        delay: 3.5,
        duration: 0.7,
        rotation: randomInteger(-6, 10),
        x: randomInteger(-2, 2),
        y: randomInteger(-4, 4),
      },
      'sentence+=' + i * 0.3
    )
  })
}

onMounted(() => {
  document.fonts.ready.then(() => {
    playIntro()
    window.addEventListener('resize', playIntro)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', playIntro)
  cleanup()
})
</script>

<style scoped>
.gsap-wrap {
  overflow: hidden;
  padding: 1rem;
  background:
    radial-gradient(129% 99% at 112% 85%, rgb(223, 220, 255) 20%, rgb(255, 158, 194) 90%),
    url('@/assets/noise.png');
  background-blend-mode: color-dodge;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.split,
.keyword,
.decoy {
  transform: translate3d(0, 0, 0);
  font-size: 24px;
  padding: 10px;
  width: 75%;
  visibility: hidden;
}

.split {
  color: #ff3b83;
}

.keyword {
  color: #723bff;
}

.decoy {
  color: gray;
}

@media screen and (max-width: 750px) {
  .decoy {
    font-size: 1rem;
  }
}

@media screen and (max-width: 400px) {
  .split {
    font-size: 1rem;
  }
}
</style>
