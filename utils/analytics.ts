// Analytics utility for tracking events
// Supports multiple analytics providers (GA4, Plausible, custom)

interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

// Check if analytics cookies are accepted
const isAnalyticsEnabled = (): boolean => {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    const prefs = JSON.parse(consent);
    return prefs.analytics === true;
  } catch {
    return false;
  }
};

// Track custom events
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled()) return;

  const { action, category = 'engagement', label, value } = event;

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(action, {
      props: {
        category,
        label,
        value,
      },
    });
  }

  // Custom analytics (console log for debugging)
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', { action, category, label, value });
  }
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsEnabled()) return;

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID || '', {
      page_path: path,
      page_title: title,
    });
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview');
  }
};

// Track conversions
export const trackConversion = (conversionType: string, value?: number): void => {
  trackEvent({
    action: 'conversion',
    category: conversionType,
    value: value,
  });
};

// Track form interactions
export const trackFormStart = (formName: string): void => {
  trackEvent({
    action: 'form_start',
    category: 'form',
    label: formName,
  });
};

export const trackFormSubmit = (formName: string, success: boolean = true): void => {
  trackEvent({
    action: success ? 'form_submit' : 'form_error',
    category: 'form',
    label: formName,
  });
  
  if (success) {
    trackConversion('form_submission', 1);
  }
};

export const trackFormAbandonment = (formName: string, fieldsCompleted: number): void => {
  trackEvent({
    action: 'form_abandon',
    category: 'form',
    label: formName,
    value: fieldsCompleted,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaText: string, location: string): void => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaText} - ${location}`,
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (location: string): void => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'engagement',
    label: location,
  });
  
  trackConversion('whatsapp_contact', 1);
};

// Track leadmagnet downloads
export const trackLeadMagnetDownload = (magnetName: string): void => {
  trackEvent({
    action: 'leadmagnet_download',
    category: 'lead_generation',
    label: magnetName,
  });
  
  trackConversion('leadmagnet', 1);
};






