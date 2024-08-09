import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { createBlockletPlugin } from 'vite-plugin-blocklet'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createBlockletPlugin()],
})
