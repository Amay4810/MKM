import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers — reduces polyfill bloat
    target: 'es2020',
    // Warn if a chunk exceeds 600 kB (Framer Motion is large)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate chunks for better caching
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react/')) return 'react-vendor';
        },
      },
    },
  },
  // Speed up cold starts in dev
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react', 'react-helmet-async'],
  },
});
