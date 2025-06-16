import { defineStore } from 'pinia'
import { useCharacter } from '@/composables/useCharacter'
import { ref } from 'vue'

export const useLandingPageStore = defineStore('landing-page', () => {
  const profileData = ref([])

  const fetchProfileData = async () => {
    const { getCharacters } = useCharacter()
    try {
      profileData.value = await getCharacters()
    } catch (err) {
      throw err
    }
  }

  return { profileData, fetchProfileData }
})
