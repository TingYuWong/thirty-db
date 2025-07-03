<template>
  <div class="intro-container">
    <p ref="quoteEl" class="quote-text">{{ currentQuote }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{
  (e: 'next-section'): void
}>()

const quotes = [
  '30分貝，不是喧囂中的高聲吶喊，是一種溫柔、堅定的存在',
  '「小時候覺得30歲是自由，長大後才知道，小時候的心，才是自由」',
  '「誰在感情裡談公平、道義、先來後到，你都坐在這了，還不明白嗎」',
  '「如果這件事可以不考慮任何人的感受，你心裡最想說的話是什麼？」',
  '「我不好，但我正在學習怎麼變好，為了自己，我想要變得更好」',
  '「從來不好奇、把一切視為理所當然，所以我丟掉自己了，所以我不能再愛你了」',
  '「在連我都不相信自己的時候，是你選擇相信了我」',
  '「謝謝每個你，出現在我的生命裡」',
  '微弱而清晰，30分貝，就足以撐起完整的自己',
]

const currentQuote = ref('')
const quoteEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline()

  quotes.forEach((quote, index) => {
    tl.call(() => {
      currentQuote.value = quote
    })
      .to(quoteEl.value, { opacity: 1, duration: 1 }) // fade in
      .to({}, { duration: 2.5 }) // stay visible
      .to(quoteEl.value, { opacity: 0, duration: 1 }) // fade out
  })

  tl.call(() => emit('next-section')) // 進入主頁
})
</script>

<style scoped>
.intro-container {
  width: 100vw;
  height: 100%;
  background:
    radial-gradient(129% 99% at 112% 85%, rgb(223, 220, 255) 20%, rgb(255, 158, 194) 90%),
    url('@/assets/noise.png');
  background-blend-mode: color-dodge;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  padding: 2rem;
}

.quote-text {
  opacity: 0;
  white-space: pre-line;
  line-height: 1.8;
}
</style>
