import { onMounted, onBeforeUnmount } from 'vue'

export function useViewportHeight() {
  const setVH = () => {
    const vh =
      window.visualViewport?.height != null
        ? window.visualViewport.height * 0.01
        : window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  onMounted(() => {
    setVH()
    window.addEventListener('resize', setVH)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setVH)
  })
}
