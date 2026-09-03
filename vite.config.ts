import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('gsap')) {
              return 'animation';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Minify and compress
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets as base64
    cssCodeSplit: true,
  },
  server: {
    port: 5173,
    open: true,
  }
})
