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

  // Try to fetch from API
  try {
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3000/api/get-visitors'
      : '/api/get-visitors';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

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

    // If API fails, try localStorage fallback (development only)
    if (import.meta.env.DEV) {
      console.warn('API call failed, using localStorage fallback');
      const visitors = getLocalVisitors();
      
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

    return {
      success: false,
      error: 'Kon geen verbinding maken met de server',
    };
  } catch (error) {
    // Fallback to localStorage in development
    if (import.meta.env.DEV) {
      console.warn('API error, using localStorage fallback:', error);
      const visitors = getLocalVisitors();
      
      if (visitors.length === 0) {
        return {
          success: true,
          data: {
            visitors: [],
            stats: {
              totalVisitors: 0,
              totalVisits: 0,
              uniqueCountries: 0,
              countryStats: {},
            }
          }
        };
      }

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

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Onbekende fout',
    };
  }
}





