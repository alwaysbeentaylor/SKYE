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

// For Vercel, we'll use a simple in-memory store
// In production, replace this with a proper database
let visitorsStore: Map<string, VisitorData> = new Map();

async function loadFromStorage(): Promise<Map<string, VisitorData>> {
  return visitorsStore;
}

// This function should be called from track-visitor to sync the store
// In production, use a shared database instead
export function syncVisitorsStore(visitors: Map<string, VisitorData>): void {
  visitorsStore = visitors;
}

// Simple password check (in production, use proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function loadVisitors(): Promise<VisitorData[]> {
  const visitors = await loadFromStorage();
  return Array.from(visitors.values());
}

export default async function handler(req: Request): Promise<Response> {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Check authentication
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { password } = body;

      if (password !== ADMIN_PASSWORD) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: corsHeaders }
        );
      }

      // Return visitors data
      const visitors = await loadVisitors();
      
      // Calculate statistics
      const totalVisitors = visitors.length;
      const totalVisits = visitors.reduce((sum, v) => sum + v.visitCount, 0);
      const uniqueCountries = new Set(visitors.map(v => v.country).filter(Boolean));
      const countryStats: Record<string, number> = {};
      
      visitors.forEach(visitor => {
        if (visitor.country) {
          countryStats[visitor.country] = (countryStats[visitor.country] || 0) + visitor.visitCount;
        }
      });

      // Sort by last visit (most recent first)
      const sortedVisitors = visitors.sort((a, b) => 
        new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      );

      return new Response(
        JSON.stringify({
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
        }),
        { status: 200, headers: corsHeaders }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Server error' }),
        { status: 500, headers: corsHeaders }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: corsHeaders }
  );
}

