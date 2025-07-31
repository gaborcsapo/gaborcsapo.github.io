// Main JavaScript module
import Mustache from 'mustache';
import { portfolioData } from './data.js';
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
  // Render projects
  const projectTemplate = document.getElementById('project-template');
  const projectsList = document.getElementById('projectsList');
  
  if (projectTemplate && projectsList) {
    const projectHtml = Mustache.render(projectTemplate.innerHTML, portfolioData);
    projectsList.innerHTML = projectHtml;
  }
  
  // Render experiences
  const experienceTemplate = document.getElementById('experience-template');
  const experienceList = document.getElementById('experienceList');
  
  if (experienceTemplate && experienceList) {
    const experienceHtml = Mustache.render(experienceTemplate.innerHTML, portfolioData);
    experienceList.innerHTML = experienceHtml;
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
  const animatedElements = document.querySelectorAll('.project-item, .experience-item, .skill-category');
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