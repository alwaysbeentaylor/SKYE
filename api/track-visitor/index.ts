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
// In production, replace this with a proper database (Supabase, MongoDB, etc.)
let visitorsStore: Map<string, VisitorData> = new Map();

// Helper to persist to external storage (for production, use a real database)
async function saveToStorage(visitors: Map<string, VisitorData>): Promise<void> {
  // In production, save to database here
  // For now, we keep it in memory (will reset on serverless function restart)
  // To persist data, integrate with: Supabase, MongoDB, Vercel KV, etc.
  visitorsStore = visitors;
}

async function loadFromStorage(): Promise<Map<string, VisitorData>> {
  // In production, load from database here
  return visitorsStore;
}

// Helper to get country from IP (using a free service)
async function getCountryFromIP(ip: string): Promise<string> {
  try {
    // Skip localhost IPs
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return 'Local';
    }
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`);
    const data = await response.json();
    return data.country || 'Unknown';
  } catch (error) {
    console.error('Error fetching country:', error);
    return 'Unknown';
  }
}

// Helper to generate visitor ID from IP + User Agent
function generateVisitorId(ip: string, userAgent: string): string {
  // Simple hash function
  const str = `${ip}-${userAgent}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Load visitors data
async function loadVisitors(): Promise<Map<string, VisitorData>> {
  return await loadFromStorage();
}

// Save visitors data
async function saveVisitors(visitors: Map<string, VisitorData>): Promise<void> {
  await saveToStorage(visitors);
}

export default async function handler(req: Request): Promise<Response> {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();
    const { path, referrer, userAgent } = body;

    // Get IP address from request headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               req.headers.get('x-real-ip') || 
               'unknown';

    // Generate visitor ID
    const visitorId = generateVisitorId(ip, userAgent || '');

    // Load existing visitors
    const visitors = await loadVisitors();
    const existingVisitor = visitors.get(visitorId);

    // Get country
    const country = await getCountryFromIP(ip);

    const now = new Date().toISOString();

    if (existingVisitor) {
      // Update existing visitor
      existingVisitor.visitCount += 1;
      existingVisitor.lastVisit = now;
      existingVisitor.path = path || existingVisitor.path;
      existingVisitor.referrer = referrer || existingVisitor.referrer;
      if (country !== 'Unknown' && country !== 'Local') {
        existingVisitor.country = country;
      }
      visitors.set(visitorId, existingVisitor);
    } else {
      // New visitor
      const newVisitor: VisitorData = {
        id: visitorId,
        ip,
        country,
        userAgent: userAgent || 'Unknown',
        referrer: referrer || 'Direct',
        path: path || '/',
        timestamp: now,
        visitCount: 1,
        lastVisit: now,
        firstVisit: now,
      };
      visitors.set(visitorId, newVisitor);
    }

    // Save visitors
    await saveVisitors(visitors);

    return new Response(
      JSON.stringify({ success: true, visitorId }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error tracking visitor:', errorMessage);
    return new Response(
      JSON.stringify({ error: 'Server error', details: errorMessage }),
      { status: 500, headers: corsHeaders }
    );
  }
}

