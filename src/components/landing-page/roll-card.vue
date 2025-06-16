<template>
  <div class="credit-wrapper">
    <div class="credit-mask">
      <div class="credit-content" ref="creditContent">
        <div v-for="(item, index) in credits" :key="index" class="credit-line">
          {{ `${item.role}: ${item.names.join(', ')}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const creditContent = ref(null)

const credits = [
  { role: '導演', names: ['藹馨'] },
  { role: '劇本', names: ['亭融'] },
  { role: '服裝', names: ['Linda', 'Lisa'] },
  { role: '前台設計', names: ['婷瑜'] },
  { role: '舞台設計', names: ['昕宜', '張瑄'] },
  { role: '宣傳', names: ['欣儒'] },
  { role: '燈光', names: ['宛庭', '大書', '阿福哥'] },
  { role: '音效', names: ['知儀', '婷瑜'] },
  {
    role: '演員',
    names: [
      '昕宜',
      '張瑄',
      'Linda',
      'Lisa',
      '藹馨',
      'Tyson',
      '宛庭',
      '大書',
      '知儀',
      '欣儒',
      '阿福哥',
    ],
  },
  { role: '影像', names: ['藹馨', 'Tyson'] },
]

onMounted(() => {
  const height = creditContent.value.scrollHeight
  gsap.fromTo(
    creditContent.value,
    { y: '100%' },
    {
      y: `-${height}px`,
      duration: 20,
      ease: 'none',
      repeat: -1, // 無限滾動
    }
  )
})
</script>

<style scoped>
.credit-wrapper {
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
}

.credit-mask {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.credit-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2.5;
}

.credit-line {
  white-space: nowrap;
}
</style>
