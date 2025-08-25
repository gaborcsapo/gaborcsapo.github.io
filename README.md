# gaborcsapo.github.io

Modern portfolio website built with Vite, featuring interactive timeline, p5.js animations, and responsive design. Optimized for performance with automated deployment.

[Click here to check out the website](https://gaborcsapo.com/)

## 🚀 Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start development server with hot reload (http://localhost:3000)
npm run build      # Build for production (outputs to dist/)
npm run preview    # Preview production build (http://localhost:4173)
```

## 📁 Project Structure

```
├── src/                    # Source files
│   ├── js/
│   │   ├── main.js        # Main JavaScript entry point
│   │   ├── data.js        # Timeline data and projects
│   │   └── animation.js   # p5.js animations
│   └── styles/
│       └── main.css       # Main stylesheet
├── public/                 # Static assets (copied as-is)
│   ├── img/               # Images and favicons
│   └── pages/             # Sub-projects and blog pages
├── index.html             # Main HTML entry point
├── vite.config.js         # Vite configuration
└── .github/workflows/     # GitHub Actions for deployment
    └── deploy.yml
```

## 🚀 Automated Deployment

The site uses **GitHub Actions** for automated deployment to GitHub Pages with a custom domain (`gaborcsapo.com`).

### How It Works

1. **Push to master branch**:
   ```bash
   git add .
   git commit -m "Update site content"
   git push origin master
   ```

2. **GitHub Actions automatically**:
   - Installs dependencies (`npm ci`)
   - Builds production version (`npm run build`)
   - Deploys to GitHub Pages from `dist/` directory
   - Updates live site at [gaborcsapo.com](https://gaborcsapo.com/)

### Deployment Features

- ✅ **Automated**: No manual build steps required
- ✅ **Optimized**: Vite handles minification and asset hashing
- ✅ **Fast**: Only builds when code changes
- ✅ **Reliable**: GitHub Actions ensures consistent deployments
- ✅ **Clean**: No build artifacts in repository root

### Configuration

- **Workflow**: `.github/workflows/deploy.yml`
- **Build**: Outputs to `dist/` directory 
- **Base Path**: Configured in `vite.config.js` for GitHub Pages
- **Custom Domain**: CNAME file in `public/` directory

## 🔧 Development Workflow

### Daily Development
1. **Start development server**: `npm run dev`
   - Opens `http://localhost:3000`
   - Hot module replacement for instant updates
   - Edit `src/` files and see changes immediately

2. **Edit content**:
   - **Timeline data**: Edit `src/js/data.js` to add projects and experiences
   - **Styling**: Modify `src/styles/main.css` for design changes
   - **HTML structure**: Update `index.html` for layout changes
   - **Animations**: Adjust `src/js/animation.js` for p5.js effects

3. **Test production build**: 
   ```bash
   npm run build    # Creates optimized dist/ folder
   npm run preview  # Test at http://localhost:4173
   ```

4. **Deploy**: Simply push to master branch - GitHub Actions handles the rest!

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Modern build tool with fast HMR
- **HTML5** - Semantic markup and ES modules
- **Modern CSS** - Grid, Flexbox, Custom Properties, responsive design
- **JavaScript ES6+** - Modular architecture with import/export
- **[p5.js](https://p5js.org/)** - Interactive background animations
- **[Mustache.js](https://mustache.github.io/)** - Template rendering for timeline
- **GitHub Actions** - Automated CI/CD deployment

## 🎨 Features

- **Interactive Timeline**: Horizontal scrolling project showcase
- **Animated Background**: Dynamic p5.js visual effects with color themes
- **Responsive Design**: Mobile-first approach with touch interactions
- **Performance Optimized**: Vite's automatic code splitting and optimization
- **Modern Architecture**: ES modules, semantic HTML, CSS custom properties
