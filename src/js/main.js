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
  // Color picker is now handled directly by the p5.js canvas
  // The canvas has its own mousePressed handler in heroAnimation.js
  // No additional setup needed here
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
  
  // Note: project cards are now dynamically created by timeline component
  // No static elements need animation observers currently
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