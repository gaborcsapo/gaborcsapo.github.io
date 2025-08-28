// Timeline Component Module - Horizontal timeline with sliding navigation
// Extracted and adapted from timeline.html component

import { chapters } from './data.js';

// State
let activeChapter = chapters.length - 1;
let isTransitioning = false;
let hasNavigated = false;

// DOM Elements
let timelineSlider;
let timelineSection;
let chapterDescription;
let projectsGrid;
let prevButton;
let nextButton;
let timelinePrev;
let timelineNext;
let timelineHintContainer;

// Initialize timeline with improved error handling
function initTimeline() {
    // Get DOM elements with error handling
    const elements = {
        timelineSlider: document.getElementById('timelineSlider'),
        timelineSection: document.getElementById('timelineSection'),
        chapterDescription: document.getElementById('chapterDescription'),
        projectsGrid: document.getElementById('projectsGrid'),
        prevButton: document.getElementById('prevButton'),
        nextButton: document.getElementById('nextButton'),
        timelinePrev: document.getElementById('timelinePrev'),
        timelineNext: document.getElementById('timelineNext'),
        timelineHintContainer: document.getElementById('timelineHintContainer')
    };

    // Check for critical elements
    const criticalElements = ['timelineSlider', 'chapterDescription', 'projectsGrid'];
    const missingElements = criticalElements.filter(key => !elements[key]);
    
    if (missingElements.length > 0) {
        console.error('Critical timeline elements not found:', missingElements);
        return false;
    }

    // Assign to module variables
    timelineSlider = elements.timelineSlider;
    timelineSection = elements.timelineSection;
    chapterDescription = elements.chapterDescription;
    projectsGrid = elements.projectsGrid;
    prevButton = elements.prevButton;
    nextButton = elements.nextButton;
    timelinePrev = elements.timelinePrev;
    timelineNext = elements.timelineNext;
    timelineHintContainer = elements.timelineHintContainer;

    // Generate timeline dots
    generateTimelineDots();

    // Set initial state
    updateTimeline();
    renderContent();
    
    return true;
}

// Simplified dot generation using CSS Grid
function generateTimelineDots() {
    // Clear existing elements
    timelineSlider.innerHTML = '';

    // Create dots for each chapter using modern approach
    const fragment = document.createDocumentFragment();
    
    chapters.forEach((chapter, index) => {
        const wrapper = createDotWrapper(chapter, index);
        fragment.appendChild(wrapper);
    });
    
    timelineSlider.appendChild(fragment);
}

// Factory function for creating dot wrappers
function createDotWrapper(chapter, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-dot-wrapper';
    wrapper.dataset.chapterIndex = index;

    wrapper.innerHTML = `
        <div class="timeline-year" id="year-${index}">${chapter.years}</div>
        <button class="timeline-dot-button" aria-label="Go to ${chapter.title}">
            <div class="timeline-dot" id="dot-${index}"></div>
        </button>
        <div class="timeline-label" id="label-${index}">${chapter.title}</div>
    `;

    // Add event listeners using event delegation
    wrapper.addEventListener('click', (e) => {
        // Prevent double-firing and allow button/label clicks
        if (e.target.closest('.timeline-dot-button') || e.target.closest('.timeline-label')) {
            navigateToChapter(index);
        }
    });

    return wrapper;
}

// Update timeline position - active dot centered on timeline-line
function updateTimeline() {
    // Get timeline wrapper and slider for updates
    const timelineWrapper = document.querySelector('.timeline-section-wrapper');
    const timelineSection = document.getElementById('timelineSection');
    
    if (!timelineWrapper || !timelineSlider || !timelineSection) return;
    
    // Update CSS custom property for other uses
    timelineWrapper.style.setProperty('--timeline-active-chapter', activeChapter);
    
    // Calculate positioning to center active dot on timeline-line
    const dotSpacing = window.matchMedia('(max-width: 767px)').matches ? 100 : 200;
    const sectionWidth = timelineSection.offsetWidth;
    const sectionCenter = sectionWidth / 2;
    
    // Position so the active dot (at index activeChapter) aligns with section center
    const activeDotPosition = (activeChapter * dotSpacing) + (dotSpacing / 2);
    const sliderOffset = sectionCenter - activeDotPosition;
    
    // Apply transform: translateY(-50%) for vertical centering, translateX for horizontal positioning
    timelineSlider.style.transform = `translateY(-50%) translateX(${sliderOffset}px)`;
    
    // Remove all previous chapter classes
    for (let i = 0; i < chapters.length; i++) {
        timelineWrapper.classList.remove(`timeline-chapter-${i}`);
    }
    
    // Add current chapter class for CSS-based state management
    timelineWrapper.classList.add(`timeline-chapter-${activeChapter}`);

    // Update all navigation buttons
    const isFirst = activeChapter === 0;
    const isLast = activeChapter === chapters.length - 1;

    if (prevButton) prevButton.disabled = isFirst;
    if (nextButton) nextButton.disabled = isLast;
    if (timelinePrev) timelinePrev.disabled = isFirst;
    if (timelineNext) timelineNext.disabled = isLast;
}

// Render chapter content
function renderContent() {
    const chapter = chapters[activeChapter];

    // Update description
    if (chapterDescription) {
        chapterDescription.textContent = chapter.description;
    }

    // Update projects grid
    if (projectsGrid) {
        projectsGrid.innerHTML = '';

        chapter.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            // Build card HTML with optional image
            const imageHTML = project.image ? `
                <div class="project-image-container">
                    <img class="project-image" src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
            ` : '';

            // Add class based on project type
            const typeClass = project.type.toLowerCase();

            card.innerHTML = `
                ${imageHTML}
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-metadata">
                        <span class="project-company">${project.company}</span><span class="project-metadata-bullet">•</span><span class="project-year">${project.year}</span><span class="project-metadata-bullet">•</span><span class="project-type ${typeClass}">${project.type}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }
}

// Navigate to chapter with CSS transition-based animation
function navigateToChapter(newIndex, interactionMethod = 'click') {
    if (isTransitioning || newIndex === activeChapter) return;

    // Hide the hint after first navigation
    if (!hasNavigated && timelineHintContainer) {
        hasNavigated = true;
        timelineHintContainer.classList.add('hidden');
    }

    isTransitioning = true;
    const direction = newIndex > activeChapter ? 'next' : 'prev';

    // Track timeline navigation with Google Analytics
    if (typeof gtag !== 'undefined') {
        const chapterName = chapters[newIndex]?.title || `Chapter ${newIndex}`;
        gtag('event', 'timeline_navigation', {
            event_category: 'Timeline',
            event_label: chapterName,
            chapter_index: newIndex,
            direction: direction,
            previous_chapter: activeChapter,
            interaction_method: interactionMethod
        });
    }

    // Calculate timeline position
    const timelineElement = document.querySelector('.timeline-section');
    const timelinePosition = timelineElement.getBoundingClientRect().top + window.pageYOffset - 20;

    // Function to perform the slide animations using CSS transitions
    const performSlideAnimation = () => {
        // Start slide out animation
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        
        if (chapterDescription) {
            chapterDescription.classList.add('content-transitioning-out', outClass);
        }
        if (projectsGrid) {
            projectsGrid.classList.add('content-transitioning-out', outClass);
        }

        // Listen for transition end on description (primary element)
        const handleTransitionOut = (event) => {
            // Only proceed if this is the transform transition completing
            if (event.propertyName === 'transform' && event.target === chapterDescription) {
                chapterDescription.removeEventListener('transitionend', handleTransitionOut);
                
                // Update active chapter
                activeChapter = newIndex;

                // Update timeline position
                updateTimeline();

                // Render new content
                renderContent();

                // Start slide in animation
                const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
                
                // Reset out classes and add in classes
                if (chapterDescription) {
                    chapterDescription.classList.remove('content-transitioning-out', outClass);
                    chapterDescription.classList.add('content-transitioning-in', inClass);
                }
                if (projectsGrid) {
                    projectsGrid.classList.remove('content-transitioning-out', outClass);
                    projectsGrid.classList.add('content-transitioning-in', inClass);
                }

                // Listen for transition end on slide in
                const handleTransitionIn = (event) => {
                    if (event.propertyName === 'transform' && event.target === chapterDescription) {
                        chapterDescription.removeEventListener('transitionend', handleTransitionIn);
                        
                        // Clean up all transition classes
                        if (chapterDescription) {
                            chapterDescription.classList.remove('content-transitioning-in', inClass);
                        }
                        if (projectsGrid) {
                            projectsGrid.classList.remove('content-transitioning-in', inClass);
                        }
                        
                        isTransitioning = false;
                    }
                };

                if (chapterDescription) {
                    chapterDescription.addEventListener('transitionend', handleTransitionIn);
                }
            }
        };

        if (chapterDescription) {
            chapterDescription.addEventListener('transitionend', handleTransitionOut);
        }
    };

    // Check if we need to scroll first using Intersection Observer data
    if (shouldScrollToTimeline()) {
        // Scroll first, then animate
        window.scrollTo({
            top: timelinePosition,
            behavior: 'smooth'
        });

        // Wait for scroll to complete using a more reliable method
        const scrollToComplete = () => {
            if (timelineInView) {
                performSlideAnimation();
            } else {
                // Check again in a short interval
                setTimeout(scrollToComplete, 100);
            }
        };
        
        // Start checking after a minimum delay
        setTimeout(scrollToComplete, 200);
    } else {
        // Already in view, just animate
        performSlideAnimation();
    }
}

// Navigate with buttons
function navigate(direction, interactionMethod = 'button') {
    const newIndex = direction === 'next'
        ? Math.min(activeChapter + 1, chapters.length - 1)
        : Math.max(activeChapter - 1, 0);
    navigateToChapter(newIndex, interactionMethod);
}

// Initialize event listeners
function initEventListeners() {
    // Button navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => navigate('prev'));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigate('next'));
    }
    if (timelinePrev) {
        timelinePrev.addEventListener('click', () => navigate('prev'));
    }
    if (timelineNext) {
        timelineNext.addEventListener('click', () => navigate('next'));
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigate('prev', 'keyboard');
        if (e.key === 'ArrowRight') navigate('next', 'keyboard');
    });

    // Touch gesture navigation
    initTouchGestures();

    // Intersection Observer for scroll effects
    initIntersectionObserver();

    // Handle resize - minimal since CSS handles responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // CSS handles positioning, just update buttons and custom properties if needed
            updateTimeline();
        }, 100);
    });
}

// Intersection Observer for scroll effects
let timelineInView = false;

function initIntersectionObserver() {
    // Timeline intersection observer
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            timelineInView = entry.isIntersecting;
            
            // Optional: Add visual feedback when timeline comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-in-view');
            } else {
                entry.target.classList.remove('timeline-in-view');
            }
        });
    }, {
        rootMargin: '-20px 0px -20px 0px', // Slightly reduce detection area
        threshold: 0.1
    });

    // Observe timeline section
    const timelineElement = document.querySelector('.timeline-section');
    if (timelineElement) {
        timelineObserver.observe(timelineElement);
    }
}

// Updated navigation function using Intersection Observer data
function shouldScrollToTimeline() {
    return !timelineInView;
}

// Touch gesture support
function initTouchGestures() {
    if (!timelineSection) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    // Minimum distance for a swipe to register (in pixels)
    const minSwipeDistance = 50;
    // Maximum vertical movement allowed for horizontal swipe
    const maxVerticalDeviation = 100;

    // Touch start
    timelineSection.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Touch end
    timelineSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    // Handle swipe gesture
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);

        // Check if this was primarily a horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalDeviation) {
            // Prevent navigation if already transitioning
            if (isTransitioning) return;

            // Swipe right (positive deltaX) = go to previous chapter
            // Swipe left (negative deltaX) = go to next chapter
            if (deltaX > 0) {
                navigate('prev', 'swipe');
            } else {
                navigate('next', 'swipe');
            }
        }
    }
}

// Main initialization function with better error handling
export function initTimelineComponent() {
    console.log('Initializing timeline component...');

    // Wait for DOM to be ready
    setTimeout(() => {
        try {
            // Initialize timeline with error checking
            const timelineInitialized = initTimeline();
            
            if (timelineInitialized) {
                initEventListeners();
                console.log('Timeline component initialized successfully');
            } else {
                console.error('Timeline component failed to initialize');
            }
        } catch (error) {
            console.error('Error initializing timeline component:', error);
        }
    }, 100);
}

// State management helpers
function setState(updates) {
    const oldState = { activeChapter, isTransitioning, hasNavigated };
    
    // Update state variables directly
    if (updates.activeChapter !== undefined) activeChapter = updates.activeChapter;
    if (updates.isTransitioning !== undefined) isTransitioning = updates.isTransitioning;
    if (updates.hasNavigated !== undefined) hasNavigated = updates.hasNavigated;
    
    // Trigger updates if needed
    if (updates.activeChapter !== undefined && updates.activeChapter !== oldState.activeChapter) {
        updateTimeline();
        renderContent();
    }
}

function getState() {
    return { activeChapter, isTransitioning, hasNavigated, timelineInView };
}

// Export function to scroll timeline into view
export function scrollToTimeline() {
    const timelineElement = document.querySelector('.timeline-section-wrapper');
    if (timelineElement) {
        timelineElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}