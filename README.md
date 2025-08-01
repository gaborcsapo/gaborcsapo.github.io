# gaborcsapo.github.io

Modern portfolio website built with HTML5, CSS3, p5.js, and Mustache.js. Optimized for performance and responsive design.

[Click here to check out the website](https://gaborcsapo.com/)

## 🚀 Development

```bash
npm install        # Install dependencies
npm run dev        # Start development server with hot reload (http://localhost:3000)
npm run build      # Build for production (outputs to dist/)
npm run preview    # Preview production build (http://localhost:4173)
npm run deploy     # Build and prepare for GitHub Pages (cleans old assets)
```

## 📦 Deployment to GitHub Pages

The site is configured to deploy from the root directory to GitHub Pages with a custom domain (`gaborcsapo.com`).

### Complete Deployment Process

1. **Build and prepare files for GitHub Pages**:
   ```bash
   npm run deploy
   ```
   This will:
   - Build the production version in `dist/`
   - Clean old asset files from root
   - Copy `index.html` and `assets/` to root directory

2. **Commit and push the changes**:
   ```bash
   git add .
   git commit -m "Deploy: Update site content"
   git push
   ```

3. **Automatic deployment**: GitHub Pages will automatically serve the updated site from the root `index.html`

### What Happens During Deploy

- ✅ Vite builds optimized production files
- ✅ Old duplicate asset files are removed from root
- ✅ Fresh `index.html` and `assets/` copied to root
- ✅ CNAME file preserved for custom domain
- ✅ GitHub Pages serves from root directory

**Note**: The deploy script automatically handles cleanup of old hashed asset files to prevent accumulation.

## 🔧 Workflow

- **Development**: `npm run dev` - Hot reload dev server for active coding
- **Production Testing**: `npm run preview` - Test the final optimized build

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **Modern CSS** - Grid, Flexbox, Custom Properties
- **JavaScript ES6+** - Modular architecture
- **p5.js** - Interactive background animation
- **Mustache.js** - Template rendering
- **Vite** - Build tool and dev server
