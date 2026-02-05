import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Generate unique filenames for each build to prevent caching issues
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Ensure source maps are generated for debugging
    sourcemap: true
  },
  // Configure dev server
  server: {
    // Disable caching in development
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  }
})
