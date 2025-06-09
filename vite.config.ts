import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
// import { fileURLToPath } from 'url'
import { fileURLToPath, URL } from 'node:url'

// 模擬 __dirname
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
