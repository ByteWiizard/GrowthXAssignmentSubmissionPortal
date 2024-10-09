import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/user': 'http://localhost:5000',
        '/admin': 'http://localhost:5000',
    },
  }
})
