import { useEffect, useState } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  threshold?: number; // Distance from top in pixels
  delay?: number; // Delay before showing popup (ms)
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const { enabled = true, threshold = 50, delay = 0 } = options;
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if user has already seen popup (within last 7 days)
    const lastShown = localStorage.getItem('exit-intent-last-shown');
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving towards top of viewport
      if (e.clientY <= threshold && e.relatedTarget === null) {
        setTimeout(() => {
          setShouldShow(true);
          localStorage.setItem('exit-intent-last-shown', Date.now().toString());
        }, delay);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, threshold, delay]);

  const dismiss = () => {
    setShouldShow(false);
  };

  return { shouldShow, dismiss };
};






