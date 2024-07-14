import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 2560,
        })
      ]
    }
  }
})
