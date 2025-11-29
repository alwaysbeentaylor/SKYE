// API endpoint to detect language based on IP address
// Uses ip-api.com for geolocation (free tier: 45 requests/minute)

interface IPGeoResponse {
  country?: string;
  countryCode?: string;
  city?: string;
  status?: string;
}

// Map country codes to languages
// Default: Dutch (nl) for Netherlands, Belgium
// English (en) for English-speaking countries
// Add more mappings as needed
const countryToLanguage: Record<string, 'nl' | 'en'> = {
  'NL': 'nl', // Netherlands
  'BE': 'nl', // Belgium (Dutch/French, defaulting to Dutch)
  'US': 'en', // United States
  'GB': 'en', // United Kingdom
  'CA': 'en', // Canada
  'AU': 'en', // Australia
  'NZ': 'en', // New Zealand
  'IE': 'en', // Ireland
  'ZA': 'en', // South Africa
  // Add more English-speaking countries as needed
};

// Default language if country not found
const DEFAULT_LANGUAGE: 'nl' | 'en' = 'nl';

async function getLanguageFromIP(ip: string): Promise<'nl' | 'en'> {
  try {
    // Skip localhost IPs
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return DEFAULT_LANGUAGE;
    }
    
    // Use ip-api.com free tier (no API key needed)
    // Note: HTTP is fine for server-side calls, but HTTPS is preferred
    const response = await fetch(`https://ip-api.com/json/${ip}?fields=countryCode`);
    
    if (!response.ok) {
      console.error('IP API response not OK:', response.status);
      return DEFAULT_LANGUAGE;
    }
    
    const data: IPGeoResponse = await response.json();
    
    if (data.status === 'fail' || !data.countryCode) {
      return DEFAULT_LANGUAGE;
    }
    
    // Map country code to language
    const language = countryToLanguage[data.countryCode] || DEFAULT_LANGUAGE;
    return language;
    
  } catch (error) {
    console.error('Error detecting language from IP:', error);
    return DEFAULT_LANGUAGE;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    // Get IP address from request headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               req.headers.get('x-real-ip') || 
               req.headers.get('cf-connecting-ip') || // Cloudflare
               'unknown';

    if (ip === 'unknown') {
      return new Response(
        JSON.stringify({ language: DEFAULT_LANGUAGE, source: 'default' }),
        { status: 200, headers: corsHeaders }
      );
    }

    const language = await getLanguageFromIP(ip);
    
    return new Response(
      JSON.stringify({ 
        language,
        source: 'ip',
        ip: ip.substring(0, 7) + '...' // Partial IP for logging (privacy)
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error detecting language:', errorMessage);
    return new Response(
      JSON.stringify({ 
        language: DEFAULT_LANGUAGE,
        source: 'error',
        error: errorMessage 
      }),
      { status: 200, headers: corsHeaders } // Return 200 with default language
    );
  }
}

