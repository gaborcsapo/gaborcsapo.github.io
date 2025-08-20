// Hero Animation Module - p5.js based floating circles with artistic color palettes
// Extracted and adapted from hero.html component

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
    console.log('Initializing p5.js hero animation...');
    
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
        let bgColor;
        let overAllTexture;
        let baseCircleRadius = 100;

        // Animation state
        const animationState = {
            isOpening: true,
            startTime: 0,
            duration: 4000,
            progress: 0
        };

        // Grain fade control
        const grainFade = {
            duration: 3000, // 3 seconds
            opacity: 0,
            isComplete: false
        };

        // Speed control
        const speedControl = {
            current: 1,
            target: 1,
            transitionRate: 0.02
        };

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
                this.colorIndex = p.floor(p.random(currentPalette.colors.length));
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
                let c = p.color(currentPalette.colors[this.colorIndex]);
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
                this.colorIndex = p.floor(p.random(currentPalette.colors.length));
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
            // Extract RGB values and darken by 35%
            let r = Math.round(p.red(bgColor) * 0.35);
            let g = Math.round(p.green(bgColor) * 0.35);
            let b = Math.round(p.blue(bgColor) * 0.35);

            // Set CSS custom properties - match the existing CSS variable names
            document.documentElement.style.setProperty('--hero-text-color', `rgb(${r}, ${g}, ${b})`);
            document.documentElement.style.setProperty('--text-color-dim', `rgba(${r}, ${g}, ${b}, 0.6)`);
            document.documentElement.style.setProperty('--text-color-light', `rgba(${r}, ${g}, ${b}, 0.5)`);
        }

        function showPaletteName() {
            let nameElement = document.getElementById('palette-name');
            if (nameElement) {
                nameElement.textContent = currentPalette.name;
                nameElement.classList.add('show');
                setTimeout(() => {
                    nameElement.classList.remove('show');
                }, 2000);
            }
        }

        function makeGrainTexture() {
            if (!p.width || !p.height || p.width <= 0 || p.height <= 0) {
                console.warn('Invalid canvas dimensions for texture creation');
                return;
            }

            overAllTexture = p.createGraphics(p.width, p.height);
            overAllTexture.loadPixels();

            let tint = currentPalette.grainTint;

            // Optimized grain generation - sample every 2 pixels for performance
            for (let i = 0; i < p.width; i += 2) {
                for (let j = 0; j < p.height; j += 2) {
                    let noiseVal = p.noise(i / 3, j / 3, (i * j) / 50);
                    let opacity = noiseVal * p.random(2, 80);

                    let grainColor = p.color(tint[0], tint[1], tint[2], opacity);
                    overAllTexture.set(i, j, grainColor);
                    if (i + 1 < p.width) overAllTexture.set(i + 1, j, grainColor);
                    if (j + 1 < p.height) overAllTexture.set(i, j + 1, grainColor);
                    if (i + 1 < p.width && j + 1 < p.height) overAllTexture.set(i + 1, j + 1, grainColor);
                }
            }
            overAllTexture.updatePixels();
        }

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

        function handleGrainFade() {
            if (!grainFade.isComplete) {
                let elapsed = p.millis() - animationState.startTime; // Use same start time as opening
                let fadeProgress = p.min(elapsed / grainFade.duration, 1);

                // Smooth easing for fade in
                grainFade.opacity = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);

                if (fadeProgress >= 1) {
                    grainFade.isComplete = true;
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
            let canvasWidth = p.max(100, p.windowWidth);
            let canvasHeight = p.max(100, p.windowHeight);

            let canvas = p.createCanvas(canvasWidth, canvasHeight);
            canvas.parent('heroAnimation');

            baseCircleRadius = calculateBaseRadius();

            currentPalette = artPalettes[currentPaletteIndex];
            bgColor = p.color(currentPalette.bgColor);
            p.background(bgColor);

            showPaletteName();
            updateTextColors();

            // Initialize animation timing BEFORE creating circles
            animationState.startTime = p.millis();
            animationState.isOpening = true;

            createCircles();
            updateCircleSizes();

            // Mark texture for creation in draw loop
            overAllTexture = null;

            console.log('p5.js setup complete, circles created:', circles.length);
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

            // Create texture if needed
            if (!overAllTexture && p.frameCount > 5) {
                makeGrainTexture();
            }

            // Apply grain texture with fade effect
            if (overAllTexture && grainFade.opacity > 0) {
                // Apply tint based on fade opacity
                p.tint(255, grainFade.opacity * 255);
                p.image(overAllTexture, 0, 0);
                p.noTint(); // Reset tint for future drawing operations
            }
        };

        // p5.js mouse pressed function
        p.mousePressed = function() {
            if (animationState.isOpening) return;

            currentPaletteIndex = (currentPaletteIndex + 1) % artPalettes.length;
            currentPalette = artPalettes[currentPaletteIndex];
            bgColor = p.color(currentPalette.bgColor);

            circles.forEach(circle => circle.updateColorIndex());
            makeGrainTexture();
            showPaletteName();
            updateTextColors();

            // Reset grain fade to full opacity for palette changes
            grainFade.opacity = 1;
            grainFade.isComplete = true;
        };

        // Debounced resize handler to prevent excessive calls
        let resizeTimeout;
        p.windowResized = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (p.windowWidth <= 0 || p.windowHeight <= 0) return;

                let oldBaseRadius = baseCircleRadius;
                p.resizeCanvas(p.windowWidth, p.windowHeight);
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

                makeGrainTexture();
                if (!animationState.isOpening) {
                    updateCircleSizes();
                    // Ensure grain doesn't fade in again after resize
                    grainFade.opacity = 1;
                    grainFade.isComplete = true;
                }
            }, 150); // 150ms debounce
        };

        // Store reference to trigger theme changes externally
        p.triggerThemeChange = function() {
            p.mousePressed();
        };
    };

    // Create the p5 instance
    p5Instance = new p5(sketch);
    console.log('p5.js instance created successfully');
}

export function changeTheme() {
    // Trigger palette change
    if (p5Instance && p5Instance.triggerThemeChange) {
        p5Instance.triggerThemeChange();
    }
}