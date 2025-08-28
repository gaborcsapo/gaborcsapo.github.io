import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  // Multi-page application support
  appType: 'mpa',
  

  // Proper base for GitHub Pages
  // Use repository name if deploying to username.github.io/repo-name
  // Use '/' if deploying to custom domain or username.github.io
  base: '/', // Change this to '/' if using custom domain
  
  // Image optimization plugin
  plugins: [
    imagetools({
      // Default optimizations for different formats
      defaultDirectives: (url) => {
        // Apply WebP conversion and quality optimization to JPEG/PNG images
        if (url.searchParams.has('optimize') || 
            /\.(jpe?g|png)$/i.test(url.pathname)) {
          return new URLSearchParams({
            format: 'webp',
            quality: '80'
          })
        }
        return new URLSearchParams()
      }
    })
  ],

  build: {
    target: 'es2020', // Required for import.meta.url support
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // Enhanced asset organization for better caching
    rollupOptions: {
      output: {
        // Organize assets by type with content hashing
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1)
          
          if (/png|jpe?g|svg|gif|webp|avif/i.test(extType)) {
            return `images/[name]-[hash][extname]`
          }
          if (/css/i.test(extType)) {
            return `css/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
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