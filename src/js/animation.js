// P5.js animation for hero background
let particles = [];
let colorPalette = [];
let currentPalette = 0;

const palettes = [
  ['#2c3e50', '#3498db', '#e74c3c', '#f39c12'],
  ['#27ae60', '#2ecc71', '#16a085', '#1abc9c'],
  ['#8e44ad', '#9b59b6', '#e67e22', '#f39c12'],
  ['#d35400', '#e67e22', '#c0392b', '#e74c3c'],
  ['#c0392b', '#e74c3c', '#8e44ad', '#9b59b6']
];

export function initAnimation() {
  // Check if p5 is available
  if (typeof window.p5 === 'undefined') {
    console.error('p5.js is not loaded');
    return;
  }
  
  
  // Create p5 sketch
  const sketch = (p) => {
    let noiseScale = 0.01;
    let time = 0;
    
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('heroAnimation');
      
      // Initialize color palette
      colorPalette = palettes[0];
      
      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(20, 60),
          speedX: p.random(-0.5, 0.5),
          speedY: p.random(-0.5, 0.5),
          alpha: p.random(0.1, 0.3),
          color: p.random(colorPalette),
          noiseOffsetX: p.random(1000),
          noiseOffsetY: p.random(1000)
        });
      }
      
      p.background(colorPalette[0]);
    };
    
    p.draw = () => {
      // Create gradient background
      drawGradientBackground(p);
      
      // Update and draw particles
      updateParticles(p);
      
      time += 0.01;
    };
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    
    p.mousePressed = () => {
      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        changeColorPalette(p);
      }
    };
    
    function drawGradientBackground(p) {
      for (let y = 0; y <= p.height; y++) {
        const inter = p.map(y, 0, p.height, 0, 1);
        const c = p.lerpColor(p.color(colorPalette[0]), p.color(colorPalette[1]), inter);
        p.stroke(c);
        p.line(0, y, p.width, y);
      }
    }
    
    function updateParticles(p) {
      particles.forEach(particle => {
        // Add Perlin noise for organic movement
        const noiseX = p.noise(particle.noiseOffsetX + time) * 2 - 1;
        const noiseY = p.noise(particle.noiseOffsetY + time) * 2 - 1;
        
        particle.x += particle.speedX + noiseX * 0.5;
        particle.y += particle.speedY + noiseY * 0.5;
        
        // Wrap around screen
        if (particle.x < -particle.size) particle.x = p.width + particle.size;
        if (particle.x > p.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = p.height + particle.size;
        if (particle.y > p.height + particle.size) particle.y = -particle.size;
        
        // Draw particle
        p.push();
        p.translate(particle.x, particle.y);
        p.fill(p.red(p.color(particle.color)), p.green(p.color(particle.color)), p.blue(p.color(particle.color)), particle.alpha * 255);
        p.noStroke();
        p.ellipse(0, 0, particle.size);
        p.pop();
      });
    }
    
    function changeColorPalette(p) {
      currentPalette = (currentPalette + 1) % palettes.length;
      colorPalette = palettes[currentPalette];
      
      // Update particle colors
      particles.forEach(particle => {
        particle.color = p.random(colorPalette);
      });
      
      // Update CSS custom properties for theme
      const themes = ['theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-red'];
      document.body.className = themes[currentPalette];
      
      // Update color placeholder
      const placeholder = document.querySelector('.color-placeholder');
      if (placeholder) {
        placeholder.style.background = `linear-gradient(135deg, ${colorPalette[0]}, ${colorPalette[1]})`;
      }
    }
  };
  
  // Initialize p5 sketch
  new window.p5(sketch);
}

export function changeTheme() {
  // This function can be called externally to change themes
  currentPalette = (currentPalette + 1) % palettes.length;
  colorPalette = palettes[currentPalette];
  
  const themes = ['theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-red'];
  document.body.className = themes[currentPalette];
  
  const placeholder = document.querySelector('.color-placeholder');
  if (placeholder) {
    placeholder.style.background = `linear-gradient(135deg, ${colorPalette[0]}, ${colorPalette[1]})`;
  }
}