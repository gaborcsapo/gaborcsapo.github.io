// Main JavaScript module
import Mustache from 'mustache';
import { timelineData } from './data.js';
// Animation will be loaded separately since p5 needs to be in global scope

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize components
  renderTemplates();
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
    const { initAnimation, changeTheme } = await import('./animation.js');
    initAnimation();
    window.changeTheme = changeTheme;
  } catch (error) {
    console.error('Failed to load animation:', error);
  }
}

function renderTemplates() {
  // Render timeline
  const timelineTemplate = document.getElementById('timeline-template');
  const timelineContainer = document.getElementById('timelineContainer');
  
  if (timelineTemplate && timelineContainer) {
    const timelineHtml = Mustache.render(timelineTemplate.innerHTML, timelineData);
    timelineContainer.innerHTML = timelineHtml;
    
    // Initialize horizontal scrolling for project cards
    initProjectScrolling();
  }
}

function initColorPicker() {
  const colorPicker = document.querySelector('.color-picker');
  
  if (colorPicker) {
    colorPicker.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Call changeTheme if available
      if (typeof window.changeTheme === 'function') {
        window.changeTheme();
      }
      
      // Add visual feedback
      colorPicker.style.transform = 'translateY(-4px) scale(0.95)';
      setTimeout(() => {
        colorPicker.style.transform = 'translateY(-2px) scale(1)';
      }, 150);
    });
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

function initProjectScrolling() {
  // Initialize horizontal scrolling for project cards
  const scrollContainers = document.querySelectorAll('.projects-scroll-container');
  
  scrollContainers.forEach(container => {
    const scrollArea = container.querySelector('.projects-scroll');
    let isScrolling = false;
    
    // Add mouse wheel horizontal scroll
    container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollArea.scrollLeft += e.deltaY;
      }
    }, { passive: false });
    
    // Add touch support for mobile
    let startX = 0;
    let scrollLeft = 0;
    
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = scrollArea.scrollLeft;
    });
    
    container.addEventListener('touchmove', (e) => {
      if (!startX) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      scrollArea.scrollLeft = scrollLeft - walk;
    });
    
    container.addEventListener('touchend', () => {
      startX = 0;
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
  const animatedElements = document.querySelectorAll('.timeline-chapter, .project-card, .skill-category');
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