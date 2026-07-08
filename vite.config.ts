import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project at https://<user>.github.io/task-board/
  base: command === 'build' ? '/task-board/' : '/',
  plugins: [react()],
}))
