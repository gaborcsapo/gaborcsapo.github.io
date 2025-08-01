# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Gabor Csapo built using modern web technologies with Vite as the build system. The site features an interactive timeline showcasing life chapters with horizontally scrollable project portfolios, Three.js animated backgrounds, and a blog section.

## Architecture & Structure

### Core Components
- **Main Portfolio (`index.html`)**: Interactive homepage with Three.js animated background, color picker functionality, and a timeline-based journey section
- **Timeline Section**: Vertical timeline of life chapters (Studies, London, Taipei, San Francisco) with horizontal scrolling project cards
- **Blog Section (`pages/blog.html`, `pages/blog1.html`, `pages/blog2.html`)**: Multi-page blog with navigation between posts
- **Sub-projects**: Self-contained demo applications in subdirectories:
  - `pages/gender-bias/`: D3.js data visualization project
  - `pages/perfect-weather/`: Weather application demo
  - `pages/essays/`: TypeIt.js powered essay presentation

### File Organization
- **Source Files (`src/`)**:
  - `src/js/main.js`: Main JavaScript entry point with ES modules
  - `src/js/data.js`: Timeline data organized by life chapters
  - `src/js/animation.js`: Three.js p5.js animation logic
  - `src/styles/main.css`: Main stylesheet with timeline styling
- **Build Files**:
  - `dist/`: Vite build output directory
  - `assets/`: Built and minified assets (CSS/JS bundles)
  - `index.html`: Production build copied to root for GitHub Pages
- **Development Files**:
  - `index.dev.html`: Source HTML file used as Vite entry point
  - `vite.config.js`: Vite configuration
  - `package.json`: Dependencies and build scripts
- **Static Assets**:
  - `img/`: All images including favicons and blog assets organized in subdirectories
  - `pages/`: Secondary pages and sub-applications (preserved as-is)

### Development Approach
- **Modern Build System**: Uses Vite for ES module bundling, hot reload, and optimization
- **ES Modules**: Modern JavaScript with import/export statements
- **Template Rendering**: Mustache.js for dynamic timeline content generation
- **Responsive Design**: Mobile-first design with horizontal scrolling project cards
- **Styling**: Custom CSS with CSS custom properties, no external framework dependencies
- **Interactive Elements**: p5.js/Three.js for 3D animations, horizontal touch/mouse scrolling
- **Analytics**: Google Analytics integration throughout pages

## Common Development Tasks

### Local Development
**Important**: ES modules require HTTP protocol, not file:// protocol.

1. **Development server** (recommended):
   ```bash
   npm run dev
   ```
   Starts Vite dev server at `http://localhost:3000`

2. **Preview built site**:
   ```bash
   npm run build
   npm run preview
   ```
   Serves production build at `http://localhost:4173`

3. **Alternative HTTP servers**:
   ```bash
   # From project root
   python3 -m http.server 8080
   # Or from dist/ directory after build
   cd dist && python3 -m http.server 8080
   ```

### Making Changes

1. **Edit source files**:
   - `src/js/main.js`: Main application logic
   - `src/js/data.js`: Timeline data and project information
   - `src/styles/main.css`: Styling and responsive design
   - `index.dev.html`: HTML structure and templates

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```
   Builds and copies files to root directory for GitHub Pages

### Timeline Data Management
- Edit `src/js/data.js` to add/modify life chapters and projects
- Each chapter has: `id`, `title`, `location`, `years`, `description`, `projects[]`
- Projects are classified as `type: "work"` or `type: "hobby"`
- Work projects appear first, then hobby projects in descending importance

### Adding Blog Posts
- Follow existing pattern in `pages/blog1.html`, `pages/blog2.html`
- Update navigation links in blog pages
- Add corresponding images to `img/blog/` directory

### Sub-project Structure
Each demo project in `pages/` is self-contained with its own dependencies and can be developed independently.

### Design Verification
**Critical**: Always serve via HTTP for proper ES module loading.

For testing with Puppeteer MCP server:
1. Start local server: `npm run preview` or `python3 -m http.server 8080`
2. Navigate to `http://localhost:4173/` (or appropriate port)
3. Use Puppeteer with no-sandbox option: `allowDangerous: true, launchOptions: {"headless": true, "args": ["--no-sandbox", "--disable-setuid-sandbox"]}`
4. Test both desktop (1200x800) and mobile (375x800) viewports
5. Verify timeline rendering, horizontal scrolling, and animations
6. Animations need to be tested for 5 seconds with a screenshot every 300ms

## Design Philosophy

Beautiful web applications transcend mere functionality - they evoke emotion and form memorable experiences. Each app should follow these core principles:

### Foundational Principles

* **Simplicity Through Reduction**: Identify the essential purpose and eliminate everything that distracts from it. Begin with complexity, then deliberately remove until reaching the simplest effective solution.
* **Material Honesty**: Digital materials have unique properties. Buttons should feel pressable, cards should feel substantial, and animations should reflect real-world physics while embracing digital possibilities.
* **Obsessive Detail**: Consider every pixel, every interaction, and every transition. Excellence emerges from hundreds of thoughtful decisions that collectively project a feeling of quality.
* **Coherent Design Language**: Every element should visually communicate its function and feel like part of a unified system. Nothing should feel arbitrary.
* **Invisibility of Technology**: The best technology disappears. Users should focus on their content and goals, not on understanding your interface.
* **Start With Why**: Before designing any feature, clearly articulate its purpose and value. This clarity should inform every subsequent decision.

### Typographic Excellence

* **Purposeful Typography**: Typography should be treated as a core design element, not an afterthought. Every typeface choice should serve the app's purpose and personality.
* **Typographic Hierarchy**: Construct clear visual distinction between different levels of information. Headlines, subheadings, body text, and captions should each have a distinct but harmonious appearance that guides users through content.
* **Limited Font Selection**: Choose no more than 2-3 typefaces for the entire application. Consider San Francisco, Helvetica Neue, or similarly clean sans-serif fonts that emphasize legibility.
* **Type Scale Harmony**: Establish a mathematical relationship between text sizes (like the golden ratio or major third). This forms visual rhythm and cohesion across the interface.
* **Breathing Room**: Allow generous spacing around text elements. Line height should typically be 1.5x font size for body text, with paragraph spacing that forms clear visual separation without disconnection.

### Color Theory Application

* **Intentional Color**: Every color should have a specific purpose. Avoid decorative colors that don't communicate function or hierarchy.
* **Color as Communication**: Use color to convey meaning - success, warning, information, or action. Maintain consistency in these relationships throughout the app.
* **Sophisticated Palettes**: Prefer subtle, slightly desaturated colors rather than bold primary colors. Consider colors that feel "photographed" rather than "rendered."
* **Contextual Adaptation**: Colors should respond to their environment. Consider how colors appear how they interact with surrounding elements.
* **Focus Through Restraint**: Limit accent colors to guide attention to the most important actions. The majority of the interface should use neutral tones that recede and let content shine.

### Spatial Awareness

* **Compositional Balance**: Every screen should feel balanced, with careful attention to visual weight and negative space. Elements should feel purposefully placed rather than arbitrarily positioned.
* **Grid Discipline**: Maintain a consistent underlying grid system that forms a sense of order while allowing for meaningful exceptions when appropriate.
* **Breathing Room**: Use generous negative space to focus attention and design a sense of calm. Avoid cluttered interfaces where elements compete for attention.
* **Spatial Relationships**: Related elements should be visually grouped through proximity, alignment, and shared attributes. The space between elements should communicate their relationship.

## Human Interface Elements

This section provides comprehensive guidance for creating interactive elements that feel intuitive, responsive, and delightful.

### Core Interaction Principles

* **Direct Manipulation**: Design interfaces where users interact directly with their content rather than through abstract controls. Elements should respond in ways that feel physically intuitive.
* **Immediate Feedback**: Every interaction must provide instantaneous visual feedback (within 100ms), even if the complete action takes longer to process.
* **Perceived Continuity**: Maintain context during transitions. Users should always understand where they came from and where they're going.
* **Consistent Behavior**: Elements that look similar should behave similarly. Build trust through predictable patterns.
* **Forgiveness**: Make errors difficult, but recovery easy. Provide clear paths to undo actions and recover from mistakes.
* **Discoverability**: Core functions should be immediately visible. Advanced functions can be progressively revealed as needed.

### Control Design Guidelines

#### Buttons

* **Purpose-Driven Design**: Visually express the importance and function of each button through its appearance. Primary actions should be visually distinct from secondary or tertiary actions.
* **States**: Every button must have distinct, carefully designed states for:
  - Default (rest)
  - Hover
  - Active/Pressed
  - Focused
  - Disabled

* **Visual Affordance**: Buttons should appear "pressable" through subtle shadows, highlights, or dimensionality cues that respond to interaction.
* **Size and Touch Targets**: Minimum touch target size of 44×44px for all interactive elements, regardless of visual size.
* **Label Clarity**: Use concise, action-oriented verbs that clearly communicate what happens when pressed.

#### Input Controls

* **Form Fields**: Design fields that guide users through correct input with:
  - Clear labeling that remains visible during input
  - Smart defaults when possible
  - Format examples for complex inputs
  - Inline validation with constructive error messages
  - Visual confirmation of successful input

* **Selection Controls**: Toggles, checkboxes, and radio buttons should:
  - Have a clear visual difference between selected and unselected states
  - Provide generous hit areas beyond the visible control
  - Group related options visually
  - Animate state changes to reinforce selection

* **Field Focus**: Highlight the active input with a subtle but distinct focus state. Consider using a combination of color change, subtle animation, and lighting effects.

#### Menus and Lists

* **Hierarchical Organization**: Structure content in a way that communicates relationships clearly.
* **Progressive Disclosure**: Reveal details as needed rather than overwhelming users with options.
* **Selection Feedback**: Provide immediate, satisfying feedback when items are selected.
* **Empty States**: Design thoughtful empty states that guide users toward appropriate actions.

### Motion and Animation

* **Purposeful Animation**: Every animation must serve a functional purpose:
  - Orient users during navigation changes
  - Establish relationships between elements
  - Provide feedback for interactions
  - Guide attention to important changes

* **Natural Physics**: Movement should follow real-world physics with appropriate:
  - Acceleration and deceleration
  - Mass and momentum characteristics
  - Elasticity appropriate to the context

* **Subtle Restraint**: Animations should be felt rather than seen. Avoid animations that:
  - Delay user actions unnecessarily
  - Call attention to themselves
  - Feel mechanical or artificial

* **Timing Guidelines**:
  - Quick actions (button press): 100-150ms
  - State changes: 200-300ms
  - Page transitions: 300-500ms
  - Attention-directing: 200-400ms

* **Spatial Consistency**: Maintain a coherent spatial model. Elements that appear to come from off-screen should return in that direction.

### Responsive States and Feedback

* **State Transitions**: Design smooth transitions between all interface states. Nothing should change abruptly without appropriate visual feedback.
* **Loading States**: Replace generic spinners with purpose-built, branded loading indicators that communicate progress clearly.
* **Success Confirmation**: Acknowledge completed actions with subtle but clear visual confirmation.
* **Error Handling**: Present errors with constructive guidance rather than technical details. Errors should never feel like dead ends.

### Gesture and Input Support

* **Precision vs. Convenience**: Design for both precise (mouse, stylus) and convenience (touch, keyboard) inputs, adapting the interface appropriately.

* **Natural Gestures**: Implement common gestures that match user expectations:
  - Tap for primary actions
  - Long-press for contextual options
  - Swipe for navigation or dismissal
  - Pinch for scaling content

* **Keyboard Navigation**: Ensure complete keyboard accessibility with logical tab order and visible focus states.

### Micro-Interactions

* **Moment of Delight**: Identify key moments in user flows where subtle animations or feedback can form emotional connection.
* **Reactive Elements**: Design elements that respond subtly to cursor proximity or scroll position, creating a sense of liveliness.
* **Progressive Enhancement**: Layer micro-interactions so they enhance but never obstruct functionality.

### Finishing Touches

* **Micro-Interactions**: Add small, delightful details that reward attention and form emotional connection. These should be discovered naturally rather than announcing themselves.
* **Fit and Finish**: Obsess over pixel-perfect execution. Alignment, spacing, and proportions should be mathematically precise and visually harmonious.
* **Content-Focused Design**: The interface should ultimately serve the content. When content is present, the UI should recede; when guidance is needed, the UI should emerge.
* **Consistency with Surprise**: Establish consistent patterns that build user confidence, but introduce occasional moments of delight that form memorable experiences.


## Design Direction

### Visual Tone & Identity
- **Emotional Response**: What specific feelings should the design evoke in users?
- **Design Personality**: Should the design feel playful, serious, elegant, rugged, cutting-edge, or classic?
- **Visual Metaphors**: What imagery or concepts reflect the site's purpose?
- **Simplicity Spectrum**: Minimal vs. rich interface - which better serves the core purpose?

### Color Strategy
- **Color Scheme Type**:
  - Monochromatic (variations of one hue)
  - Analogous (adjacent colors on color wheel)
  - Complementary (opposite colors)
  - Triadic (three equally spaced colors)
  - Custom palette
- **Primary Color**: Main brand color and what it communicates
- **Secondary Colors**: Supporting colors and their purposes
- **Accent Color**: Attention-grabbing highlight color for CTAs and important elements
- **Color Psychology**: How selected colors influence user perception and behavior
- **Color Accessibility**: Ensuring sufficient contrast and colorblind-friendly combinations
- **Foreground/Background Pairings**: Explicitly define and list the primary text color (foreground) to be used on each key background color (background, card, primary, secondary, accent, muted). Validate these pairings against WCAG AA contrast ratios (4.5:1 for normal, 3:1 for large).

### Typography System
- **Font Pairing Strategy**: How heading and body fonts will work together
- **Typographic Hierarchy**: Size, weight, and spacing relationships between text elements
- **Font Personality**: What characteristics should the typefaces convey?
- **Readability Focus**: Line length, spacing, and size considerations for optimal reading
- **Typography Consistency**: Rules for maintaining cohesive type treatment
- **Which fonts**: Now, which Google fonts will be used?
- **Legibility Check**: Are the selected fonts legible?

### Visual Hierarchy & Layout
- **Attention Direction**: How the design guides the user's eye to important elements
- **White Space Philosophy**: How negative space will be used to create rhythm and focus
- **Grid System**: Underlying structure for organizing content and creating alignment
- **Responsive Approach**: How the design adapts across device sizes
- **Content Density**: Balancing information richness with visual clarity

### Animations
- **Purposeful Meaning**: Consider how motion can communicate your brand personality and guide users' attention
- **Hierarchy of Movement**: Determine which elements deserve animation focus based on their importance
- **Contextual Appropriateness**: Balance between subtle functionality and moments of delight

### UI Elements & Component Selection
- **Component Usage**: Which specific components best serve each function (Dialogs, Cards, Forms, etc.)
- **Component Customization**: Specific Tailwind modifications needed for brand alignment
- **Component States**: How interactive elements (buttons, inputs, dropdowns) should behave in different states
- **Icon Selection**: Which icons from the set best represent each action or concept
- **Component Hierarchy**: Primary, secondary, and tertiary UI elements and their visual treatment
- **Spacing System**: Consistent padding and margin values using Tailwind's spacing scale
- **Mobile Adaptation**: How components should adapt or reconfigure on smaller screens

### Visual Consistency Framework
- **Design System Approach**: Component-based vs. page-based design
- **Style Guide Elements**: Key design decisions to document
- **Visual Rhythm**: Creating patterns that make the interface predictable
- **Brand Alignment**: How the design reinforces brand identity

### Accessibility & Readability
- **Contrast Goal**: Target WCAG AA compliance as a minimum for all text and meaningful non-text elements.

## Edge Cases & Problem Scenarios
- **Potential Obstacles**: What might prevent users from succeeding?
- **Edge Case Handling**: How will the site handle unexpected user behaviors?
- **Technical Constraints**: What limitations should we be aware of?

## Implementation Considerations
- **Scalability Needs**: How might this grow over time?
- **Testing Focus**: What assumptions need validation?
- **Critical Questions**: What unknowns could impact the project's success?

## Reflection
- What makes this approach uniquely suited to this particular need?
- What assumptions have we made that should be challenged?
- What would make this solution truly exceptional?


