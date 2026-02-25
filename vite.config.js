import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('@mui')) return 'mui'
          if (id.includes('react-router')) return 'router'
          if (id.includes('qrcode')) return 'qr'
          if (id.includes('marked')) return 'markdown'
          if (id.includes('pdf-lib')) return 'pdf'
          return 'vendor'
        },
      },
    },
  },
})
