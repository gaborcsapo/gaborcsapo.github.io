import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './', // Relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.dev.html'
    }
  },
  publicDir: 'public',  
  server: {
    port: 3000,
    open: true
  }
})