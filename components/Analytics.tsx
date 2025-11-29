import { useEffect } from 'react';

const Analytics: React.FC = () => {
  useEffect(() => {
    // Check cookie consent
    const checkAndLoadAnalytics = () => {
      try {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) return;

        const prefs = JSON.parse(consent);
        if (!prefs.analytics) return;

        // Google Analytics 4
        const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
        if (ga4Id) {
          // Load GA4 script
          const script1 = document.createElement('script');
          script1.async = true;
          script1.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
          document.head.appendChild(script1);

          // Initialize GA4
          (window as any).dataLayer = (window as any).dataLayer || [];
          function gtag(...args: any[]) {
            (window as any).dataLayer.push(args);
          }
          (window as any).gtag = gtag;
          gtag('js', new Date());
          gtag('config', ga4Id, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        }

        // Plausible Analytics
        const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
        if (plausibleDomain) {
          const script2 = document.createElement('script');
          script2.defer = true;
          script2.setAttribute('data-domain', plausibleDomain);
          script2.src = 'https://plausible.io/js/script.js';
          document.head.appendChild(script2);
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
      }
    };

    // Initial load
    checkAndLoadAnalytics();

    // Listen for consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        // Reload page to apply new consent settings
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null;
};

export default Analytics;






