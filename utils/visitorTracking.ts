// Visitor tracking utility
// Tracks visitors and sends data to backend
// Falls back to localStorage in development

interface TrackingData {
  path: string;
  referrer: string;
  userAgent: string;
}

interface VisitorData {
  id: string;
  ip: string;
  country?: string;
  city?: string;
  userAgent: string;
  referrer: string;
  path: string;
  timestamp: string;
  visitCount: number;
  lastVisit: string;
  firstVisit: string;
}

let hasTracked = false;

// Generate visitor ID
function generateVisitorId(userAgent: string): string {
  // Use a combination of user agent and a random component
  const str = `${userAgent}-${navigator.language}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Save to localStorage (development fallback)
function saveVisitorLocal(visitor: VisitorData): void {
  try {
    const existing = localStorage.getItem('admin_visitors');
    const visitors: VisitorData[] = existing ? JSON.parse(existing) : [];
    
    const index = visitors.findIndex(v => v.id === visitor.id);
    if (index >= 0) {
      visitors[index] = visitor;
    } else {
      visitors.push(visitor);
    }
    
    localStorage.setItem('admin_visitors', JSON.stringify(visitors));
  } catch (e) {
    console.error('Error saving visitor to localStorage:', e);
  }
}

export const trackVisitor = async (path?: string): Promise<void> => {
  // Only track once per page load
  if (hasTracked) return;
  hasTracked = true;

  try {
    const trackingData: TrackingData = {
      path: path || window.location.pathname,
      referrer: document.referrer || 'Direct',
      userAgent: navigator.userAgent,
    };

    // Try to send to backend API
    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3000/api/track-visitor'
        : '/api/track-visitor';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });

      if (response.ok) {
        return; // Success, no need for fallback
      }
    } catch (apiError) {
      // API failed, use localStorage fallback
    }

    // Fallback to localStorage (development)
    if (import.meta.env.DEV) {
      const visitorId = generateVisitorId(trackingData.userAgent);
      const now = new Date().toISOString();
      
      // Try to get existing visitor
      const existing = localStorage.getItem('admin_visitors');
      const visitors: VisitorData[] = existing ? JSON.parse(existing) : [];
      const existingVisitor = visitors.find(v => v.id === visitorId);

      if (existingVisitor) {
        existingVisitor.visitCount += 1;
        existingVisitor.lastVisit = now;
        existingVisitor.path = trackingData.path;
        existingVisitor.referrer = trackingData.referrer;
        saveVisitorLocal(existingVisitor);
      } else {
        const newVisitor: VisitorData = {
          id: visitorId,
          ip: 'local',
          country: 'Local',
          userAgent: trackingData.userAgent,
          referrer: trackingData.referrer,
          path: trackingData.path,
          timestamp: now,
          visitCount: 1,
          lastVisit: now,
          firstVisit: now,
        };
        saveVisitorLocal(newVisitor);
      }
    }
  } catch (error) {
    // Silently fail - don't break the user experience
    console.error('Error tracking visitor:', error);
  }
};

// Reset tracking flag on navigation (for SPA)
export const resetTracking = (): void => {
  hasTracked = false;
};

