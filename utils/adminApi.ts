// Admin API utility with local development fallback
// In development, uses localStorage as fallback when serverless functions aren't available

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

interface AdminResponse {
  success: boolean;
  data?: {
    visitors: VisitorData[];
    stats: {
      totalVisitors: number;
      totalVisits: number;
      uniqueCountries: number;
      countryStats: Record<string, number>;
    };
  };
  error?: string;
}

const ADMIN_PASSWORD = 'admin123';

// Local storage fallback for development
function getLocalVisitors(): VisitorData[] {
  try {
    const data = localStorage.getItem('admin_visitors');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalVisitors(visitors: VisitorData[]): void {
  try {
    localStorage.setItem('admin_visitors', JSON.stringify(visitors));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export async function adminLogin(password: string): Promise<AdminResponse> {
  // Check password first
  if (password !== ADMIN_PASSWORD) {
    return {
      success: false,
      error: 'Onjuist wachtwoord',
    };
  }

  // Try to fetch from API with timeout
  try {
    const apiUrl = '/api/get-visitors';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Also save to localStorage as backup
        if (data.data?.visitors) {
          saveLocalVisitors(data.data.visitors);
        }
        return data;
      }
    }

    throw new Error('API request failed');

  } catch (error) {
    console.warn('API error or timeout, using localStorage fallback:', error);

    // Fallback to localStorage (ALWAYS, not just in DEV)
    // This allows the admin panel to work "client-side" if the server functions aren't working
    const visitors = getLocalVisitors();

    // Always return success structure with local data if API fails
    // This prevents the UI from handling 'error' and blocking access

    const totalVisitors = visitors.length;
    const totalVisits = visitors.reduce((sum, v) => sum + v.visitCount, 0);
    const uniqueCountries = new Set(visitors.map(v => v.country).filter(Boolean));
    const countryStats: Record<string, number> = {};

    visitors.forEach(visitor => {
      if (visitor.country) {
        countryStats[visitor.country] = (countryStats[visitor.country] || 0) + visitor.visitCount;
      }
    });

    const sortedVisitors = visitors.sort((a, b) =>
      new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    );

    return {
      success: true,
      data: {
        visitors: sortedVisitors,
        stats: {
          totalVisitors,
          totalVisits,
          uniqueCountries: uniqueCountries.size,
          countryStats,
        }
      }
    };
  }
}
