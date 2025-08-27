// Hero Animation Module - p5.js based floating circles with artistic color palettes
// Extracted and adapted from hero.html component

import { SmartResizeHandler } from './smartResizeHandler.js';

// Enhanced color palette system with artistic themes
const artPalettes = [
    {
        name: "Monet's Garden",
        colors: ["#862B0D", "#FFF9C9", "#FFC95F", "#333333"],
        bgColor: "#9DB779",
        grainTint: [255, 252, 201],
    },
    {
        name: "Forest Mist",
        colors: ["#7A8C68", "#99A686", "#BFB7A8", "#333333", "#59404B"],
        bgColor: "#4B5940",
        grainTint: [153, 166, 134],
    },
    {
        name: "Sunset",
        colors: ["#6B240C", "#48240D", "#E48F45", "#F5CCA0", "#6B240C", "#333333"],
        bgColor: "#994D1C",
        grainTint: [245, 204, 160],
    },
    {
        name: "Arctic Aurora",
        colors: ["#001219", "#00734D", "#0a9396", "#94d2bd", "#333333"],
        bgColor: "#005f73",
        grainTint: [148, 210, 189],
    },
    {
        name: "Golden Hour",
        colors: ["#333333", "#E47D6A", "#787D46", "#7D4E25", "#222B1B"],
        bgColor: "#E4BA6A",
        grainTint: [140, 120, 110],
    },
    {
        name: "Kandinsky",
        colors: ["#8D95A6", "#F28705", "#D98825", "#333333"],
        bgColor: "#0A7360",
        grainTint: [250, 170, 25],
    },
    {
        name: "Twilight",
        colors: ["#AAABA8", "#AB5A55", "#CD9B9D", "#DBC7C9", "#033540"],
        bgColor: "#BC7B77",
        grainTint: [219, 199, 201],
    },
    {
        name: "Ocean Depths",
        colors: ["#19A7CE", "#B0DAFF", "#FEFF86"],
        bgColor: "#146C94",
        grainTint: [176, 218, 255],
    },
];

// Global p5.js instance variable
let p5Instance = null;

// Export functions for integration
export function initAnimation() {
    const heroElement = document.getElementById('heroAnimation');
    if (!heroElement) {
        console.error('Hero animation container not found');
        return;
    }

    // Create p5.js instance with explicit sketch function
    const sketch = (p) => {
        // Animation variables (scoped to this p5 instance)
        let circles = [];
        let currentPaletteIndex = 0;
        let currentPalette = artPalettes[0];
        let renderingPalette = artPalettes[0]; // Separate palette reference for actual rendering
        let bgColor;
        let baseCircleRadius = 100;

        // Animation state
        const animationState = {
            isOpening: true,
            startTime: 0,
            duration: 4000,
            progress: 0
        };


        // Grain fade control (only for initial load)
        const grainFade = {
            duration: 2000, // 2 seconds for initial fade-in
            opacity: 0,
            isActive: false,
            startTime: 0,
            isInitialLoad: true // Track if this is the first texture
        };

        // Speed control
        const speedControl = {
            current: 1,
            target: 1,
            transitionRate: 0.02
        };

        // Smart resize handler for mobile optimization
        const smartResize = new SmartResizeHandler();


        // Size control
        const sizeControl = {
            transitionProgress: 0,
            transitionRate: 0.007,
            isFirstBreathing: true // Track if this is the first breathing cycle
        };

        let globalSpeedMultiplier = 1;

        // Floating circle class
        class FloatingCircle {
            constructor(x, y, radius, startPhase, rotationAngle, speedMultiplier, initialRadius) {
                this.centerX = x;
                this.centerY = y;
                this.baseRadius = radius;
                this.radius = radius;
                this.targetRadius = radius;
                this.phase = startPhase;
                this.rotationAngle = rotationAngle;
                this.floatSpeed = 0.01 * speedMultiplier;
                this.colorIndex = p.floor(p.random(renderingPalette.colors.length));
                this.initialRadius = initialRadius;

                // Movement properties - these will transition smoothly
                this.floatRadius = 30;
                this.targetFloatRadius = p.min(30, baseCircleRadius * 0.12);

                // Ripple effect properties
                this.rippleAmount = 0;
                this.rippleDecay = 0.9;
                this.rippleStrength = 40;
                this.targetRippleStrength = p.min(30, baseCircleRadius * 0.12);

                // Calculate initial position
                this.updatePosition();
            }

            updatePosition() {
                let baseX = p.cos(this.phase) * this.floatRadius;
                let baseY = p.sin(this.phase * 2) * this.floatRadius * 0.5;

                this.x = this.centerX + baseX * p.cos(this.rotationAngle) - baseY * p.sin(this.rotationAngle);
                this.y = this.centerY + baseX * p.sin(this.rotationAngle) + baseY * p.cos(this.rotationAngle);
            }

            update() {
                this.phase += this.floatSpeed * globalSpeedMultiplier;

                // Smoothly transition float radius and ripple strength
                this.floatRadius += (this.targetFloatRadius - this.floatRadius) * 0.02;
                this.rippleStrength += (this.targetRippleStrength - this.rippleStrength) * 0.02;

                this.updatePosition();
                this.checkHover();

                if (animationState.isOpening) {
                    // During opening, use baseRadius
                    this.radius = this.baseRadius + this.rippleAmount;
                } else {
                    // During breathing animation, smoothly transition to targetRadius
                    let targetWithRipple = this.targetRadius + this.rippleAmount;
                    this.radius += (targetWithRipple - this.radius) * 0.014;
                }
            }

            display() {
                if (!this.radius || this.radius <= 0) return;

                p.noFill();
                let c = p.color(renderingPalette.colors[this.colorIndex]);
                let alpha = this.rippleAmount > 0 ? p.min(80 + this.rippleAmount, 120) : 80;
                c.setAlpha(alpha);

                p.stroke(c);
                let minDimension = p.min(p.width || p.windowWidth, p.height || p.windowHeight);
                p.strokeWeight(minDimension < 540 ? 3 : 2); // Simplified screen size check
                p.circle(this.x, this.y, this.radius * 2);
            }

            setTargetRadius(minSize, maxSize) {
                this.targetRadius = p.random(minSize, maxSize);
            }

            updateColorIndex() {
                this.colorIndex = p.floor(p.random(renderingPalette.colors.length));
            }

            checkHover() {
                if (p.mouseX !== undefined && p.mouseY !== undefined) {
                    let distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);
                    if (distance < this.radius) {
                        this.rippleAmount = this.rippleStrength; // Use current rippleStrength, not fixed value
                    }
                }

                this.rippleAmount *= this.rippleDecay;
                if (this.rippleAmount < 0.1) {
                    this.rippleAmount = 0;
                }
            }

            // Method to update target properties smoothly
            updateTargets() {
                this.targetFloatRadius = p.min(30, baseCircleRadius * 0.12);
                this.targetRippleStrength = p.min(30, baseCircleRadius * 0.12);
            }
        }

        function calculateBaseRadius() {
            let minDimension = p.min(p.width || p.windowWidth, p.height || p.windowHeight);
            let scaleFactor = minDimension < 540 ? 0.46 : minDimension < 768 ? 0.4 : 0.35;
            return minDimension * scaleFactor;
        }

        function createCircles() {
            circles = [];
            const numCircles = 7;

            for (let i = 0; i < numCircles; i++) {
                let startPhase = (p.TWO_PI / numCircles) * i;
                let rotationAngle = (p.PI / numCircles) * i;
                let speedMultiplier = p.random(0.8, 1.2);
                let circleInitialRadius = p.random(baseCircleRadius * 8, baseCircleRadius * 15);

                let circle = new FloatingCircle(
                    p.width / 2, p.height / 2, circleInitialRadius,
                    startPhase, rotationAngle, speedMultiplier, circleInitialRadius
                );
                circles.push(circle);
            }
        }

        function updateCircleSizes() {
            if (circles.length === 0) return;

            let minRadius = baseCircleRadius * 0.8;
            let maxRadius = baseCircleRadius * 1.0;

            circles.forEach(circle => {
                if (p.random() < 0.5) {
                    circle.setTargetRadius(baseCircleRadius, maxRadius);
                } else {
                    circle.setTargetRadius(minRadius, baseCircleRadius);
                }
            });
        }

        function updateTextColors() {
            // Extract RGB values from background color
            let bgR = p.red(bgColor);
            let bgG = p.green(bgColor);
            let bgB = p.blue(bgColor);

            // Hero text: darken by 35% (keep existing behavior)
            let heroR = Math.round(bgR * 0.35);
            let heroG = Math.round(bgG * 0.35);
            let heroB = Math.round(bgB * 0.35);

            // Interactive elements: create analogous/monochromatic colors that work on white
            // Convert to HSL for easier color manipulation
            let hsl = rgbToHsl(bgR, bgG, bgB);

            // Create a color that's harmonious with the background but suitable for white backgrounds
            // Increase saturation slightly and adjust lightness for good contrast
            let interactiveHsl = {
                h: hsl.h,
                s: Math.min(hsl.s * 1.2, 0.8), // Boost saturation but cap it
                l: Math.max(0.25, Math.min(0.45, hsl.l * 0.8)) // Ensure good contrast on white
            };

            let interactiveRgb = hslToRgb(interactiveHsl.h, interactiveHsl.s, interactiveHsl.l);
            let interactiveColor = `rgb(${Math.round(interactiveRgb.r)}, ${Math.round(interactiveRgb.g)}, ${Math.round(interactiveRgb.b)})`;

            // Set CSS custom properties
            // Hero text colors (existing behavior)
            document.documentElement.style.setProperty('--hero-text-color', `rgb(${heroR}, ${heroG}, ${heroB})`);
            document.documentElement.style.setProperty('--hero-text-color-dim', `rgba(${heroR}, ${heroG}, ${heroB}, 0.6)`);
            document.documentElement.style.setProperty('--hero-text-color-light', `rgba(${heroR}, ${heroG}, ${heroB}, 0.5)`);

            // Interactive element colors (new dynamic colors)
            document.documentElement.style.setProperty('--interactive-color', interactiveColor);
            document.documentElement.style.setProperty('--secondary-color', interactiveColor);
            document.documentElement.style.setProperty('--timeline-accent-primary', interactiveColor);
            document.documentElement.style.setProperty('--timeline-accent-hover', interactiveColor);

            // Set shadow colors with the same base color but different opacity
            document.documentElement.style.setProperty('--timeline-accent-shadow', `rgba(${Math.round(interactiveRgb.r)}, ${Math.round(interactiveRgb.g)}, ${Math.round(interactiveRgb.b)}, 0.25)`);
            document.documentElement.style.setProperty('--timeline-accent-glow', `rgba(${Math.round(interactiveRgb.r)}, ${Math.round(interactiveRgb.g)}, ${Math.round(interactiveRgb.b)}, 0.1)`);
            document.documentElement.style.setProperty('--timeline-accent-focus', `rgba(${Math.round(interactiveRgb.r)}, ${Math.round(interactiveRgb.g)}, ${Math.round(interactiveRgb.b)}, 0.15)`);

            // Fix regular text color to proper dark gray instead of green
            document.documentElement.style.setProperty('--text-color', '#1f2937'); // Dark gray
            document.documentElement.style.setProperty('--text-light', '#6b7280'); // Medium gray
        }

        // Helper functions for color conversion
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return { h, s, l };
        }

        function hslToRgb(h, s, l) {
            let r, g, b;

            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return { r: r * 255, g: g * 255, b: b * 255 };
        }


        // Grain Texture System - CPU-based grain generation with caching
        class GrainTextureManager {
            constructor(p5Instance) {
                this.p = p5Instance;
                this.cpuRenderer = null;
                this.currentTileSize = 128;
                this.textureCache = new Map(); // Cache textures by tint key
                this.maxCacheSize = 10; // Reasonable limit for texture cache

                this.initCPURenderer();
            }


            initCPURenderer() {
                this.cpuRenderer = new CPUGrainRenderer(this.p);
            }

            generateTexture(tint, onComplete) {
                this.calculateTileSize();

                // Create cache key from tint and tile size
                const cacheKey = `${tint[0]}-${tint[1]}-${tint[2]}-${this.currentTileSize}`;

                // Check cache first
                if (this.textureCache.has(cacheKey)) {
                    const cachedTexture = this.textureCache.get(cacheKey);
                    onComplete(cachedTexture, true);
                    return;
                }

                // Generate new texture
                const cacheTexture = (texture) => {
                    if (texture) {
                        // Manage cache size
                        if (this.textureCache.size >= this.maxCacheSize) {
                            // Remove oldest entry (first in Map)
                            const firstKey = this.textureCache.keys().next().value;
                            const oldTexture = this.textureCache.get(firstKey);
                            if (oldTexture && oldTexture.remove) {
                                oldTexture.remove(); // Clean up p5 graphics object
                            }
                            this.textureCache.delete(firstKey);
                        }

                        // Add to cache
                        this.textureCache.set(cacheKey, texture);
                    }
                    onComplete(texture, false); // Pass false to indicate new texture
                };

                if (this.cpuRenderer) {
                    this.cpuRenderer.generateTexture(this.currentTileSize, tint, cacheTexture);
                } else {
                    console.error('No grain texture renderer available');
                    onComplete(null, false);
                }
            }

            calculateTileSize() {
                this.currentTileSize = Math.max(64, Math.floor(this.p.width / 2));
            }

            draw(texture, opacity = 1) {
                if (!texture || opacity <= 0) return;

                if (opacity < 1) {
                    this.p.tint(255, opacity * 255);
                }

                // Tile the grain texture across the entire canvas
                for (let x = 0; x < this.p.width; x += this.currentTileSize) {
                    for (let y = 0; y < this.p.height; y += this.currentTileSize) {
                        this.p.image(texture, x, y);
                    }
                }

                if (opacity < 1) {
                    this.p.noTint();
                }
            }

            dispose() {
                // Clean up cached textures
                for (let texture of this.textureCache.values()) {
                    if (texture && texture.remove) {
                        texture.remove();
                    }
                }
                this.textureCache.clear();

                if (this.cpuRenderer) this.cpuRenderer.dispose();
            }
        }

        // CPU Grain Renderer Class (Fallback)
        class CPUGrainRenderer {
            constructor(p5Instance) {
                this.p = p5Instance;
                this.noiseLookup = new Map();
                this.maxCacheSize = 10000;
                this.progressiveGeneration = {
                    isGenerating: false,
                    progress: 0,
                    totalPixels: 0,
                    pixelsPerFrame: 0,
                    currentTint: null,
                    onComplete: null,
                    grainBuffer: null
                };
            }

            getCachedNoise(x, y, z = 0) {
                const key = `${Math.round(x * 3)},${Math.round(y * 3)},${Math.round(z * 50)}`;

                if (this.noiseLookup.has(key)) {
                    return this.noiseLookup.get(key);
                }

                if (this.noiseLookup.size > this.maxCacheSize) {
                    this.noiseLookup.clear();
                }

                const noiseValue = this.p.noise(x / 3, y / 3, z);
                this.noiseLookup.set(key, noiseValue);
                return noiseValue;
            }

            generateTexture(tileSize, tint, onComplete) {
                try {
                    // Start progressive generation
                    this.progressiveGeneration.grainBuffer = this.p.createGraphics(tileSize, tileSize);
                    this.progressiveGeneration.currentTint = [...tint];
                    // Use integer division to prevent floating point precision issues
                    this.progressiveGeneration.blocksPerRow = Math.ceil(tileSize / 2);
                    this.progressiveGeneration.blocksPerCol = Math.ceil(tileSize / 2);
                    this.progressiveGeneration.totalPixels = this.progressiveGeneration.blocksPerRow * this.progressiveGeneration.blocksPerCol;
                    this.progressiveGeneration.pixelsPerFrame = Math.max(1, Math.floor(this.progressiveGeneration.totalPixels / 30));
                    this.progressiveGeneration.progress = 0;
                    this.progressiveGeneration.isGenerating = true;
                    this.progressiveGeneration.onComplete = onComplete;
                    this.progressiveGeneration.tileSize = tileSize;

                    this.progressiveGeneration.grainBuffer.loadPixels();

                } catch (error) {
                    console.error('CPU grain texture generation failed:', error);
                    if (onComplete) onComplete(null);
                }
            }

            continueGeneration() {
                if (!this.progressiveGeneration.isGenerating) return false;

                const gen = this.progressiveGeneration;
                const tint = gen.currentTint;
                let pixelsProcessed = 0;
                let blockIndex = gen.progress;

                while (pixelsProcessed < gen.pixelsPerFrame && blockIndex < gen.totalPixels) {
                    const blockX = (blockIndex % gen.blocksPerRow) * 2;
                    const blockY = Math.floor(blockIndex / gen.blocksPerRow) * 2;

                    const noiseVal = this.getCachedNoise(blockX, blockY, (blockX * blockY) / 50);
                    const opacity = noiseVal * this.p.random(2, 80);
                    const grainColor = this.p.color(tint[0], tint[1], tint[2], opacity);

                    // Set 2x2 pixel blocks
                    gen.grainBuffer.set(blockX, blockY, grainColor);
                    if (blockX + 1 < gen.tileSize) gen.grainBuffer.set(blockX + 1, blockY, grainColor);
                    if (blockY + 1 < gen.tileSize) gen.grainBuffer.set(blockX, blockY + 1, grainColor);
                    if (blockX + 1 < gen.tileSize && blockY + 1 < gen.tileSize) {
                        gen.grainBuffer.set(blockX + 1, blockY + 1, grainColor);
                    }

                    blockIndex++;
                    pixelsProcessed++;
                }

                gen.progress = blockIndex;

                if (blockIndex >= gen.totalPixels) {
                    gen.grainBuffer.updatePixels();
                    gen.isGenerating = false;

                    if (gen.onComplete) gen.onComplete(gen.grainBuffer);
                    return true;
                }

                return false;
            }

            isGenerating() {
                return this.progressiveGeneration.isGenerating;
            }

            dispose() {
                if (this.progressiveGeneration.grainBuffer) {
                    this.progressiveGeneration.grainBuffer.remove();
                    this.progressiveGeneration.grainBuffer = null;
                }
                this.noiseLookup.clear();
            }
        }

        // Grain texture manager instance
        let grainTextureManager = null;
        let currentGrainTexture = null;

        function handleOpeningAnimation() {
            let elapsed = p.millis() - animationState.startTime;
            animationState.progress = p.min(elapsed / animationState.duration, 1);

            // Quartic ease-out easing function
            let easedProgress = 1 - p.pow(1 - animationState.progress, 4);

            circles.forEach(circle => {
                let currentAnimRadius = p.lerp(circle.initialRadius, baseCircleRadius, easedProgress);
                circle.baseRadius = currentAnimRadius;
            });

            if (animationState.progress >= 1) {
                animationState.isOpening = false;

                circles.forEach(circle => {
                    circle.baseRadius = baseCircleRadius;
                    circle.radius = baseCircleRadius + circle.rippleAmount;
                    circle.targetRadius = baseCircleRadius; // Start breathing from base size
                    circle.updateTargets(); // Smoothly transition movement properties
                });

                // Start breathing animation with gentle initial targets
                updateCircleSizes();
            }
        }

        function handleSpeedTransition() {
            globalSpeedMultiplier += (speedControl.target - globalSpeedMultiplier) * speedControl.transitionRate;

            if (p.abs(globalSpeedMultiplier - speedControl.target) < 0.01) {
                speedControl.target = p.random(0, 0.6);
                if (p.random() < 0.2) speedControl.target = 0;
                speedControl.transitionRate = p.random(0.01, 0.03);
            }
        }

        function startGrainFadeIn() {
            grainFade.isActive = true;
            grainFade.startTime = p.millis();
            grainFade.opacity = 0;
        }

        function handleGrainFade() {
            if (grainFade.isActive) {
                let elapsed = p.millis() - grainFade.startTime;
                let fadeProgress = p.min(elapsed / grainFade.duration, 1);

                // Smooth easing for fade in (ease-out)
                grainFade.opacity = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);

                if (fadeProgress >= 1) {
                    grainFade.isActive = false;
                    grainFade.opacity = 1; // Ensure it's exactly 1 at the end
                }
            }
        }

        function handleSizeTransition() {
            sizeControl.transitionProgress += sizeControl.transitionRate;

            if (sizeControl.transitionProgress >= 1) {
                sizeControl.transitionProgress = 0;

                // After the first gentle breathing cycle, use normal variations
                if (sizeControl.isFirstBreathing) {
                    sizeControl.isFirstBreathing = false;
                    updateCircleSizes(); // Now use full breathing range
                } else {
                    updateCircleSizes(); // Normal breathing variations
                }

                sizeControl.transitionRate = p.random(0.007, 0.02);
            }
        }

        // p5.js setup function
        p.setup = function() {
            // Get hero section dimensions instead of full window
            const heroElement = document.getElementById('hero');
            const heroRect = heroElement ? heroElement.getBoundingClientRect() : { width: p.windowWidth, height: p.windowHeight };

            let canvasWidth = p.max(100, heroRect.width);
            let canvasHeight = p.max(100, heroRect.height);

            // Optimize pixel density based on device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                // Force pixel density to 1 for better mobile performance
                // High pixel density (2-3x) causes massive performance issues on mobile
                p.pixelDensity(1);
            }
            // Desktop keeps default pixel density for crisp visuals

            let canvas = p.createCanvas(canvasWidth, canvasHeight);
            canvas.parent('heroAnimation');

            // Add click handler directly to the p5.js canvas element
            canvas.elt.addEventListener('click', function(event) {
                if (animationState.isOpening) return;

                event.stopPropagation(); // Prevent event bubbling

                currentPaletteIndex = (currentPaletteIndex + 1) % artPalettes.length;
                currentPalette = artPalettes[currentPaletteIndex];

                // Track color switching with Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'color_switch', {
                        event_category: 'Hero Animation',
                        event_label: currentPalette.name,
                        palette_index: currentPaletteIndex,
                        previous_palette: artPalettes[(currentPaletteIndex - 1 + artPalettes.length) % artPalettes.length].name,
                        interaction_method: 'click'
                    });
                }
                // Don't change bgColor or circle colors immediately - wait for texture to be ready

                // Generate new grain texture with updated palette
                if (grainTextureManager) {
                    grainTextureManager.generateTexture(currentPalette.grainTint, (texture, isFromCache) => {
                        currentGrainTexture = texture;
                        // Change everything atomically when texture is ready
                        renderingPalette = currentPalette; // Update the rendering palette
                        bgColor = p.color(currentPalette.bgColor);
                        circles.forEach(circle => circle.updateColorIndex());
                        // For color switching, always show immediately (no fade)
                        if (texture) {
                            grainFade.opacity = 1;
                            grainFade.isActive = false;
                        }

                        // Update HTML elements synchronously with canvas changes
                        updateTextColors();
                    });
                }
            });

            baseCircleRadius = calculateBaseRadius();

            currentPalette = artPalettes[currentPaletteIndex];
            bgColor = p.color(currentPalette.bgColor);
            p.background(bgColor);

            updateTextColors();

            // Initialize animation timing BEFORE creating circles
            animationState.startTime = p.millis();
            animationState.isOpening = true;

            createCircles();
            updateCircleSizes();

            // Grain texture will be initialized in draw loop
        };

        // p5.js draw function
        p.draw = function() {
            if (!p.width || !p.height || p.width <= 0 || p.height <= 0) return;

            p.background(bgColor);

            handleSpeedTransition();
            handleGrainFade(); // Update grain fade opacity

            if (animationState.isOpening) {
                handleOpeningAnimation();
            } else {
                handleSizeTransition();
            }

            // Update and display circles
            if (circles.length > 0) {
                circles.forEach(circle => {
                    circle.update();
                    circle.display();
                });
            }

            // Initialize grain texture manager if needed
            if (!grainTextureManager && p.frameCount > 5) {
                grainTextureManager = new GrainTextureManager(p);

                // Generate initial grain texture
                grainTextureManager.generateTexture(currentPalette.grainTint, (texture, isFromCache) => {
                    currentGrainTexture = texture;
                    if (texture && grainFade.isInitialLoad) {
                        startGrainFadeIn();
                        grainFade.isInitialLoad = false; // Mark that initial load is complete
                    }
                });
            }

            // Continue CPU progressive texture generation if needed
            if (grainTextureManager && grainTextureManager.cpuRenderer &&
                grainTextureManager.cpuRenderer.isGenerating()) {
                grainTextureManager.cpuRenderer.continueGeneration();
            }

            // Apply grain texture with conditional opacity
            if (grainTextureManager && currentGrainTexture) {
                grainTextureManager.draw(currentGrainTexture, grainFade.opacity);
            }
        };

        // Canvas click handler is added directly during canvas creation

        // Smart resize handler with mobile-aware filtering
        p.windowResized = function() {
            // Use smart resize handler to filter mobile address bar resizes
            smartResize.handleResize((width, height) => {
                performActualResize(width, height);
            });
        };

        // Actual resize implementation (only called for legitimate resizes)
        function performActualResize(canvasWidth, canvasHeight) {
            // Get updated hero section dimensions
            const heroElement = document.getElementById('hero');
            const heroRect = heroElement ? heroElement.getBoundingClientRect() : { width: canvasWidth, height: canvasHeight };

            if (heroRect.width <= 0 || heroRect.height <= 0) return;

            let oldBaseRadius = baseCircleRadius;

            p.resizeCanvas(heroRect.width, heroRect.height);
            p.background(bgColor);

            baseCircleRadius = calculateBaseRadius();
            let scaleRatio = oldBaseRadius > 0 ? baseCircleRadius / oldBaseRadius : 1;

            if (circles.length === 0) {
                createCircles();
            } else {
                circles.forEach(circle => {
                    circle.centerX = p.width / 2;
                    circle.centerY = p.height / 2;
                    circle.updateTargets(); // Use smooth transition method

                    if (animationState.isOpening) {
                        circle.initialRadius *= scaleRatio;
                    } else {
                        // During breathing animation
                        circle.radius *= scaleRatio;
                        circle.baseRadius = baseCircleRadius;
                        circle.targetRadius *= scaleRatio;
                    }
                });
            }

            // Regenerate grain texture for new canvas size
            if (grainTextureManager) {
                grainTextureManager.generateTexture(currentPalette.grainTint, (texture, isFromCache) => {
                    currentGrainTexture = texture;
                    // For resize, show immediately (no fade)
                    if (texture) {
                        grainFade.opacity = 1;
                        grainFade.isActive = false;
                    }
                });
            }

            if (!animationState.isOpening) {
                updateCircleSizes();
            }
        }

        // Store reference to trigger theme changes externally
        p.triggerThemeChange = function() {
            // Manually trigger the theme change logic without mouse press
            if (animationState.isOpening) return;

            currentPaletteIndex = (currentPaletteIndex + 1) % artPalettes.length;
            currentPalette = artPalettes[currentPaletteIndex];

            // Track programmatic color switching with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'color_switch', {
                    event_category: 'Hero Animation',
                    event_label: currentPalette.name,
                    palette_index: currentPaletteIndex,
                    previous_palette: artPalettes[(currentPaletteIndex - 1 + artPalettes.length) % artPalettes.length].name,
                    interaction_method: 'programmatic'
                });
            }
            // Don't change bgColor or circle colors immediately - wait for texture to be ready

            // Generate new grain texture with updated palette
            if (grainTextureManager) {
                grainTextureManager.generateTexture(currentPalette.grainTint, (texture, isFromCache) => {
                    currentGrainTexture = texture;
                    // Change everything atomically when texture is ready
                    renderingPalette = currentPalette; // Update the rendering palette
                    bgColor = p.color(currentPalette.bgColor);
                    circles.forEach(circle => circle.updateColorIndex());
                    // For color switching, always show immediately (no fade)
                    if (texture) {
                        grainFade.opacity = 1;
                        grainFade.isActive = false;
                    }

                    // Update HTML elements synchronously with canvas changes
                    updateTextColors();
                });
            }
        };
    };

    // Create the p5 instance
    p5Instance = new p5(sketch);
}

export function changeTheme() {
    // Trigger palette change
    if (p5Instance && p5Instance.triggerThemeChange) {
        p5Instance.triggerThemeChange();
    }
}