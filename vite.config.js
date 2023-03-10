import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
    "/api/v1/photo-entry": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  },
    "/api/v1/home-photos": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  },
    "/api/v1/user-photo-collection": {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true
  }
}},
  plugins: [react()],
})
