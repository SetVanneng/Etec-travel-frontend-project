import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite configuration file.
// The Vue plugin makes Vite understand .vue files (single-file components).
export default defineConfig({
  plugins: [vue()],
})