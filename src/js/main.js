// Main JavaScript module
import { initTimelineComponent } from './timelineComponent.js';
// Animation will be loaded separately since p5 needs to be in global scope

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize components
  initTimelineComponent();
  initColorPicker();
  initSmoothScrolling();
  initScrollAnimations();
  
  // Initialize animation after p5 is loaded
  loadP5Animation();
  
  // Add Google Analytics if needed
  initAnalytics();
}

async function loadP5Animation() {
  // Simple check for p5.js availability
  if (typeof window.p5 === 'undefined') {
    console.warn('p5.js not available, skipping animation');
    return;
  }
  
  try {
    const { initAnimation, changeTheme } = await import('./heroAnimation.js');
    initAnimation();
    window.changeTheme = changeTheme;
  } catch (error) {
    console.error('Failed to load hero animation:', error);
  }
}


function initColorPicker() {
  // Hero area click handler - click anywhere on hero to change theme
  const heroElement = document.querySelector('.hero');
  const clickHint = document.querySelector('.click-hint');
  
  if (heroElement) {
    // Add click handler to entire hero area
    heroElement.addEventListener('click', (e) => {
      // Don't trigger if clicking on navigation links
      if (e.target.matches('a, a *')) {
        return;
      }
      
      e.preventDefault();
      
      // Call changeTheme if available
      if (typeof window.changeTheme === 'function') {
        window.changeTheme();
      }
      
      // Add visual feedback to click hint
      if (clickHint) {
        clickHint.style.transform = 'translateX(-50%) scale(0.95)';
        setTimeout(() => {
          clickHint.style.transform = 'translateX(-50%) scale(1)';
        }, 150);
      }
    });
    
    // Make hero area appear clickable
    heroElement.style.cursor = 'pointer';
  }
}

function initSmoothScrolling() {
  // Handle navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate in
  // Note: project cards are now dynamically created by timeline component
  const animatedElements = document.querySelectorAll('.skill-category');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

function initAnalytics() {
  // Analytics placeholder - add Google Analytics script to HTML if needed
  console.log('Analytics initialized');
}

// Utility functions
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Handle resize events
window.addEventListener('resize', debounce(() => {
  // Any resize handling can go here
  console.log('Window resized');
}, 250));

// Handle scroll events for additional effects if needed
window.addEventListener('scroll', throttle(() => {
  const scrollTop = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    // Subtle parallax effect on hero
    hero.style.transform = `translateY(${scrollTop * 0.1}px)`;
  }
}, 16)); // ~60fps