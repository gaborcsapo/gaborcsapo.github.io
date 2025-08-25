import { defineConfig } from 'vite'

export default defineConfig({
  // Use index.html as single entry point (Vite default)
  // No need to specify custom input

  // Proper base for GitHub Pages
  // Use repository name if deploying to username.github.io/repo-name
  // Use '/' if deploying to custom domain or username.github.io
  base: '/', // Change this to '/' if using custom domain

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Remove custom rollupOptions - let Vite handle optimally
    rollupOptions: {
      // Only specify input if you need multiple entry points
      // For single-page apps, Vite auto-detects index.html
    }
  },

  // Public directory for static assets
  publicDir: 'public',

  server: {
    port: 3000,
    open: true,
    host: true, // Allow external connections (useful for network testing)
  },

  preview: {
    port: 4173,
    open: true,
    host: true,
  }
})