import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
    },
  },
  build: {
    // Optimize output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs during development
      },
    },
    // Better chunking for caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Output settings
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable source maps in production
    chunkSizeWarningLimit: 1000,
  },
  // Performance optimizations
  server: {
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  },
})