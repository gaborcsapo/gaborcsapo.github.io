// Smart Resize Handler - Mobile-Aware Filtering and Debouncing
// Specifically designed to handle mobile browser address bar resize artifacts

class SmartResizeHandler {
    constructor() {
        // Mobile detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isAndroid = /Android/i.test(navigator.userAgent);
        this.isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        // Dimension tracking
        this.lastDimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
            timestamp: performance.now()
        };
        
        // Visual Viewport API support
        this.hasVisualViewport = !!window.visualViewport;
        
        // Debounce timers
        this.resizeTimeout = null;
        this.pendingCallback = null;
        
        // Statistics for debugging
        this.stats = {
            totalResizeEvents: 0,
            filteredEvents: 0,
            legitimateResizes: 0,
            addressBarEvents: 0
        };
        
    }
    
    /**
     * Determines if a resize event should be filtered out (mobile address bar)
     */
    shouldFilterResize(newWidth, newHeight) {
        const oldWidth = this.lastDimensions.width;
        const oldHeight = this.lastDimensions.height;
        
        // Calculate differences
        const widthDiff = Math.abs(newWidth - oldWidth);
        const heightDiff = Math.abs(newHeight - oldHeight);
        const widthChanged = widthDiff > 5; // Allow small tolerance
        const heightChanged = heightDiff > 5;
        
        // If not mobile, don't filter
        if (!this.isMobile) {
            return false;
        }
        
        // No change at all
        if (!widthChanged && !heightChanged) {
            return true; // Filter out (no real change)
        }
        
        // Width changed - likely legitimate resize (orientation, window resize)
        if (widthChanged) {
            return false; // Don't filter
        }
        
        // Only height changed - potential mobile address bar
        if (!widthChanged && heightChanged) {
            const isLikelyAddressBar = this.detectMobileAddressBarResize(heightDiff);
            
            if (isLikelyAddressBar) {
                this.stats.addressBarEvents++;
                return true; // Filter out
            }
        }
        
        return false; // Don't filter
    }
    
    /**
     * Detects mobile browser address bar show/hide patterns
     */
    detectMobileAddressBarResize(heightDiff) {
        if (this.isAndroid) {
            // Android Chrome address bar: typically 48-56px
            // Android Firefox: typically 40-50px
            return heightDiff >= 30 && heightDiff <= 80;
        }
        
        if (this.isIOS) {
            // iOS Safari address bar: typically 44-50px
            // iOS Chrome: similar to Safari
            return heightDiff >= 30 && heightDiff <= 65;
        }
        
        // Generic mobile detection
        return heightDiff >= 25 && heightDiff <= 100;
    }
    
    /**
     * Get appropriate debounce delay based on device type
     */
    getDebounceDelay() {
        if (this.isMobile) {
            return 300; // Longer debounce for mobile (handles rapid scroll events)
        } else {
            return 150; // Shorter debounce for desktop (maintains responsiveness)
        }
    }
    
    /**
     * Handle resize event with smart filtering and debouncing
     */
    handleResize(callback, forceResize = false) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const timestamp = performance.now();
        
        this.stats.totalResizeEvents++;
        
        // Store the callback for potential execution
        this.pendingCallback = callback;
        
        // Clear existing timeout
        clearTimeout(this.resizeTimeout);
        
        // Check if we should filter this resize
        if (!forceResize && this.shouldFilterResize(newWidth, newHeight)) {
            this.stats.filteredEvents++;
            return; // Don't execute callback or set new timeout
        }
        
        // Set up debounced callback execution
        const delay = this.getDebounceDelay();
        this.resizeTimeout = setTimeout(() => {
            // Double-check dimensions haven't changed during debounce
            const finalWidth = window.innerWidth;
            const finalHeight = window.innerHeight;
            
            // Update stored dimensions before callback
            this.updateDimensions(finalWidth, finalHeight, timestamp);
            
            // Execute the callback
            if (this.pendingCallback) {
                this.stats.legitimateResizes++;
                this.pendingCallback(finalWidth, finalHeight);
                this.pendingCallback = null;
            }
        }, delay);
    }
    
    /**
     * Handle resize using Visual Viewport API (mobile-specific)
     */
    handleVisualViewportResize(callback) {
        if (!this.hasVisualViewport) {
            return this.handleResize(callback);
        }
        
        const vvWidth = Math.round(window.visualViewport.width);
        const vvHeight = Math.round(window.visualViewport.height);
        
        // For mobile, mainly care about width changes (orientation) via visual viewport
        const widthChanged = Math.abs(vvWidth - this.lastDimensions.width) > 5;
        
        if (widthChanged) {
            this.handleResize(callback, true); // Force resize for width changes
        }
        // Don't trigger resize for height-only changes in visual viewport
    }
    
    /**
     * Update stored dimensions
     */
    updateDimensions(width, height, timestamp = performance.now()) {
        this.lastDimensions = { width, height, timestamp };
    }
    
    /**
     * Get statistics for debugging
     */
    getStats() {
        const filteredPercentage = this.stats.totalResizeEvents > 0 ? 
            Math.round((this.stats.filteredEvents / this.stats.totalResizeEvents) * 100) : 0;
        
        return {
            ...this.stats,
            filteredPercentage: filteredPercentage + '%',
            effectivenessRatio: `${this.stats.filteredEvents}/${this.stats.totalResizeEvents}`
        };
    }
    
    /**
     * Reset statistics
     */
    resetStats() {
        this.stats = {
            totalResizeEvents: 0,
            filteredEvents: 0,
            legitimateResizes: 0,
            addressBarEvents: 0
        };
    }
    
    /**
     * Force cleanup of pending operations
     */
    cleanup() {
        clearTimeout(this.resizeTimeout);
        this.pendingCallback = null;
    }
}

// Export for use in other modules
export { SmartResizeHandler };