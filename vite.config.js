import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
    "/api/v1/photo-gallery": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  },
    "/api/v1/photo-home": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  },
    "/api/v1/photo-user-collection": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  },
    "/api/v1/photo-user-like": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  }
}},
  plugins: [react()],
})
