import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⬇️ Name deines Repos bei GitHub Pages
export default defineConfig({
  base: '/2do-app/', // <- anpassen!
  plugins: [react()],
})
