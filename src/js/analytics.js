// Centralized Analytics Tracking Module
// Consolidates all Google Analytics (gtag) calls across the application

class Analytics {
  constructor() {
    this.isAvailable = typeof gtag !== 'undefined';
    this.isInitialized = false;
  }

  init() {
    if (!this.isAvailable) {
      console.log('Google Analytics not available');
      return;
    }

    console.log('Google Analytics initialized');
    this.trackPageView();
    this.isInitialized = true;
  }

  trackPageView() {
    if (!this.isAvailable) return;

    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href
    });
  }

  trackColorSwitch(paletteName, paletteIndex, previousPalette, method = 'click') {
    if (!this.isAvailable) return;

    gtag('event', 'color_switch', {
      event_category: 'Hero Animation',
      event_label: paletteName,
      palette_index: paletteIndex,
      previous_palette: previousPalette,
      interaction_method: method
    });
  }

  trackSocialLinkClick(linkText, linkUrl, isExternal) {
    if (!this.isAvailable) return;

    gtag('event', 'social_link_click', {
      event_category: 'Social Links',
      event_label: linkText,
      link_url: linkUrl,
      link_type: isExternal ? 'external' : 'internal',
      destination: linkText.toLowerCase()
    });
  }

  trackScrollToTop() {
    if (!this.isAvailable) return;

    gtag('event', 'scroll_to_top', {
      event_category: 'Navigation'
    });
  }

  trackCustomEvent(eventName, eventCategory, eventLabel, customParams = {}) {
    if (!this.isAvailable) return;

    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      ...customParams
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export both the class and singleton instance
export { Analytics, analytics };