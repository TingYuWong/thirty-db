<template>
  <div v-if="loading"><Loading /></div>
  <div v-else class="landing">
    <section v-for="(section, index) in sections" :key="index" class="landing__section">
      <component :is="section.component" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '@/components/landing-page/hero-section.vue'
import Profile from '@/components/landing-page/profiles.vue'
// import SpecialThanks from '@/components/landing-page/special-thanks.vue'
import Quotes from '@/components/landing-page/quotes.vue'
import RollCard from '@/components/landing-page/roll-card.vue'
import DataSpeed from '@/components/landing-page/data-speed.vue'
import DbPath from '@/components/landing-page/db-path.vue'
// import Comic from '@/components/landing-page/comic.vue'
import Loading from '@/components/landing-page/loading.vue'

import { useLandingPageStore } from '@/stores/landingPage'

const sections = [
  { component: HeroSection },
  { component: DbPath },
  { component: Profile },
  { component: Quotes },
  // { component: SpecialThanks },
  // { component: Comic },
  { component: DataSpeed },
  { component: RollCard },
]

const loading = ref(true)

const handleProfileData = async () => {
  const { fetchProfileData } = useLandingPageStore()
  loading.value = true
  try {
    await fetchProfileData()
  } catch {
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handleProfileData()
})
</script>

<style scoped>
.loading {
  opacity: 1;
  transition: opacity 0.3 ease;
}

.loading--invisible {
  opacity: 0;
}

.landing {
  overflow-y: scroll;
  width: 100%;
  scroll-behavior: smooth;
}

.landing__section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: none;
  transition: all 0.6s ease;
}

.landing__cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 87, 112, 0.9), rgba(255, 160, 122, 0.8));
  backdrop-filter: blur(6px);
  color: white;
  border: none;
  box-shadow: 0 8px 24px rgba(255, 0, 43, 0.15);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}

.landing__cta:hover {
  box-shadow: 0 12px 30px rgba(255, 0, 43, 0.35);
  background: linear-gradient(135deg, rgba(255, 112, 147, 0.95), rgba(255, 180, 140, 0.85));
}

.landing__icon {
  width: 30px;
  height: 30px;
}

@media screen and (max-width: 500px) {
  .landing__cta {
    width: 80px;
    height: 80px;
    font-size: 16px;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
  }

  .landing__icon {
    width: 40px;
    height: 40px;
  }
}
</style>
