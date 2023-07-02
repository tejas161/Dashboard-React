import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://tejas161.github.io/Dashboard-React/",
  plugins: [react()],
})
