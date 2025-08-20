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

// Check if mobile
function isMobile() {
    return window.innerWidth < 768;
}

// Initialize timeline
function initTimeline() {
    // Get DOM elements
    timelineSlider = document.getElementById('timelineSlider');
    timelineSection = document.getElementById('timelineSection');
    chapterDescription = document.getElementById('chapterDescription');
    projectsGrid = document.getElementById('projectsGrid');
    prevButton = document.getElementById('prevButton');
    nextButton = document.getElementById('nextButton');
    timelinePrev = document.getElementById('timelinePrev');
    timelineNext = document.getElementById('timelineNext');
    timelineHintContainer = document.getElementById('timelineHintContainer');

    if (!timelineSlider) {
        console.error('Timeline elements not found');
        return;
    }

    // Clear existing elements
    timelineSlider.innerHTML = '';

    // Create dots for each chapter
    chapters.forEach((chapter, index) => {
        // Create dot wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'timeline-dot-wrapper';

        // Create button
        const button = document.createElement('button');
        button.className = 'timeline-dot-button';
        button.setAttribute('aria-label', `Go to ${chapter.title}`);
        button.onclick = () => navigateToChapter(index);

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.id = `dot-${index}`;

        // Create label
        const label = document.createElement('div');
        label.className = 'timeline-label';
        label.id = `label-${index}`;
        label.textContent = chapter.title;
        // Add click handler to the label as well
        label.onclick = (e) => {
            e.stopPropagation(); // Prevent event bubbling
            navigateToChapter(index);
        };

        // Assemble
        button.appendChild(dot);
        wrapper.appendChild(button);
        wrapper.appendChild(label);
        timelineSlider.appendChild(wrapper);
    });

    // Set initial position
    updateTimeline();
    renderContent();
}

// Update timeline position
function updateTimeline() {
    // Calculate transform based on active chapter
    const dotWidth = isMobile() ? 130 : 200; // Width of each dot wrapper
    const offset = -(activeChapter * dotWidth) + (window.innerWidth / 2) - (dotWidth / 2);

    timelineSlider.style.transform = `translateX(${offset}px)`;

    // Update visual states
    chapters.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        const label = document.getElementById(`label-${index}`);

        // Remove all state classes first
        dot.classList.remove('active', 'adjacent');
        label.classList.remove('active', 'adjacent');

        if (index === activeChapter) {
            dot.classList.add('active');
            label.classList.add('active');
        } else {
            // On mobile, add proximity classes
            if (isMobile()) {
                const distance = Math.abs(index - activeChapter);
                if (distance === 1) {
                    dot.classList.add('adjacent');
                    label.classList.add('adjacent');
                }
            }
        }
    });

    // Update edge fade indicators on mobile
    if (isMobile() && timelineSection) {
        timelineSection.classList.toggle('has-prev', activeChapter > 0);
        timelineSection.classList.toggle('has-next', activeChapter < chapters.length - 1);
    }

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
                    <div class="project-header">
                        <span class="project-type ${typeClass}">${project.type}</span>
                        <span class="project-year">${project.year}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-company">${project.company}</p>
                    <p class="project-description">${project.description}</p>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }
}

// Navigate to chapter with animation
function navigateToChapter(newIndex) {
    if (isTransitioning || newIndex === activeChapter) return;

    // Hide the hint after first navigation
    if (!hasNavigated && timelineHintContainer) {
        hasNavigated = true;
        timelineHintContainer.classList.add('hidden');
    }

    isTransitioning = true;
    const direction = newIndex > activeChapter ? 'next' : 'prev';

    // Calculate timeline position
    const timelineElement = document.querySelector('.timeline-section');
    const timelinePosition = timelineElement.getBoundingClientRect().top + window.pageYOffset - 20;

    // Function to perform the slide animations
    const performSlideAnimation = () => {
        // Animate content out
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        if (chapterDescription) {
            chapterDescription.className = `chapter-description ${outClass}`;
        }
        if (projectsGrid) {
            projectsGrid.className = `projects-grid ${outClass}`;
        }

        // After content slides out
        setTimeout(() => {
            // Update active chapter
            activeChapter = newIndex;

            // Update timeline position
            updateTimeline();

            // Render new content
            renderContent();

            // Animate content in
            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            if (chapterDescription) {
                chapterDescription.className = `chapter-description ${inClass}`;
            }
            if (projectsGrid) {
                projectsGrid.className = `projects-grid ${inClass}`;
            }

            // Reset classes after animation
            setTimeout(() => {
                if (chapterDescription) {
                    chapterDescription.className = 'chapter-description';
                }
                if (projectsGrid) {
                    projectsGrid.className = 'projects-grid';
                }
                isTransitioning = false;
            }, 500);
        }, 500);
    };

    // Check if we need to scroll first
    if (window.pageYOffset > timelinePosition + 100) {
        // Scroll first, then animate
        window.scrollTo({
            top: timelinePosition,
            behavior: 'smooth'
        });

        // Wait for scroll to complete (roughly), then perform animations
        setTimeout(performSlideAnimation, 400);
    } else {
        // Already in view, just animate
        performSlideAnimation();
    }
}

// Navigate with buttons
function navigate(direction) {
    const newIndex = direction === 'next'
        ? Math.min(activeChapter + 1, chapters.length - 1)
        : Math.max(activeChapter - 1, 0);
    navigateToChapter(newIndex);
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
        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'ArrowRight') navigate('next');
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateTimeline();
        }, 250);
    });
}

// Main initialization function
export function initTimelineComponent() {
    console.log('Initializing timeline component...');
    
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        initTimeline();
        initEventListeners();
        console.log('Timeline component initialized');
    }, 100);
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