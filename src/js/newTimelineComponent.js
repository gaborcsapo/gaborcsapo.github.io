// New Timeline Component - Gallery-Inspired Journey Visualization
// Scroll-based interaction with vertical sidebar (desktop) and horizontal header (mobile)

import { chapters } from './data.js';
import { throttle, debounce } from './main.js';
import { analytics } from './analytics.js';

// Minimal state management for scroll-to-top only
let state = {
  isDesktop: window.innerWidth >= 1024
};

// Initialize the simplified timeline system
export function initTimelineComponent() {
  console.log('Initializing simplified timeline component...');
  
  try {
    // Build HTML structure
    buildTimelineStructure();
    
    // Initialize event listeners
    initializeEventListeners();
    
    console.log('Simplified timeline component initialized successfully');
  } catch (error) {
    console.error('Error initializing timeline component:', error);
  }
}


// Build new HTML structure replacing the old timeline
function buildTimelineStructure() {
  const timelineContainer = document.querySelector('.timeline-container');
  if (!timelineContainer) return;
  
  // Replace timeline structure - minimal content only
  timelineContainer.innerHTML = `
    <!-- Main content area -->
    <main class="timeline-content" id="timelineContent">
      ${renderAllChapters()}
      
      <!-- Scroll to top button -->
      <button class="scroll-to-top" id="scrollToTop" aria-label="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 14l5-5 5 5" />
        </svg>
      </button>
    </main>
  `;
}



// Render all chapters as a continuous scroll (reverse chronological - latest first)
function renderAllChapters() {
  const reversedChapters = [...chapters].reverse();
  return reversedChapters.map((chapter, chapterIndex) => `
    <section class="timeline-chapter" data-chapter="${chapterIndex}" id="chapter-${chapterIndex}">
      <!-- Sticky chapter header -->
      <header class="chapter-header sticky-header" data-chapter="${chapterIndex}">
        <h2 class="chapter-title">${chapter.title}</h2>
        <div class="chapter-meta">
          <span class="chapter-years">${chapter.years}</span>
        </div>
      </header>
      
      <!-- Chapter description -->
      <div class="chapter-description">
        <p>${chapter.description}</p>
      </div>
      
      <!-- Projects -->
      <div class="projects-container">
        ${chapter.projects.map((project, projectIndex) => 
          renderProject(project, chapterIndex, projectIndex)
        ).join('')}
      </div>
    </section>
  `).join('');
}

// Render individual project card
function renderProject(project, chapterIndex, projectIndex) {
  const projectId = `${chapterIndex}-${projectIndex}`;
  
  return `
    <article class="project-card" 
             data-project="${projectId}" 
             id="project-${projectId}">
      ${project.image ? `
        <div class="project-image-container">
          <img class="project-image" 
               src="${project.image}" 
               alt="${project.title}" 
               loading="lazy">
        </div>
      ` : ''}
      
      <div class="project-content">
        <header class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <div class="project-metadata">
            <span class="project-company">${project.company}</span>
            <span class="metadata-divider">•</span>
            <span class="project-year">${project.year}</span>
            <span class="metadata-divider">•</span>
            <span class="project-type ${project.type.toLowerCase()}">${project.type}</span>
          </div>
        </header>
        
        <div class="project-description">
          <p>${project.description}</p>
        </div>
      </div>
    </article>
  `;
}





// Initialize event listeners
function initializeEventListeners() {
  // Scroll to top button
  initScrollToTopButton();
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Responsive breakpoint handling
  window.addEventListener('resize', debounce(handleResize, 250));
  
  // Simple scroll handling for scroll-to-top button
  window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });
}


// Initialize scroll to top functionality
function initScrollToTopButton() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    analytics.trackScrollToTop();
  });
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  
  switch (event.key) {
    case 'Home':
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'End':
      event.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      break;
    case 'ArrowUp':
      if (event.shiftKey) {
        event.preventDefault();
        scrollToNearestChapter(-1);
      }
      break;
    case 'ArrowDown':
      if (event.shiftKey) {
        event.preventDefault();
        scrollToNearestChapter(1);
      }
      break;
  }
}

// Scroll to nearest chapter in given direction
function scrollToNearestChapter(direction) {
  const chapterHeaders = document.querySelectorAll('.chapter-header');
  const viewportCenter = window.innerHeight / 2;
  
  let targetHeader = null;
  
  for (let i = 0; i < chapterHeaders.length; i++) {
    const header = chapterHeaders[i];
    const rect = header.getBoundingClientRect();
    
    if (direction > 0 && rect.top > viewportCenter) {
      targetHeader = header;
      break;
    } else if (direction < 0 && rect.bottom < viewportCenter) {
      targetHeader = header;
    }
  }
  
  if (targetHeader) {
    targetHeader.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Handle resize events
function handleResize() {
  state.isDesktop = window.innerWidth >= 1024;
}

// Handle scroll events
function handleScroll() {
  updateScrollToTopButton();
}

// Update scroll to top button visibility
function updateScrollToTopButton() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;
  
  const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
  
  if (scrollProgress > 0.5) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
}


// Cleanup function for component destruction
export function destroyTimelineComponent() {
  // Reset minimal state
  state = {
    isDesktop: window.innerWidth >= 1024
  };
}