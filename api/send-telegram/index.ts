export default async function handler(req: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { status: 405, headers: corsHeaders }
    );
  }

  // Get environment variables
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_USER_ID = process.env.TELEGRAM_USER_ID;

  // Validate environment variables
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_USER_ID) {
    return new Response(
      JSON.stringify({ 
        error: 'Server configuration error',
        details: 'Missing Telegram credentials. Check Vercel environment variables.'
      }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Telegram API
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: String(TELEGRAM_USER_ID),
        text: message,
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      if (telegramData.description?.includes('chat not found')) {
        return new Response(
          JSON.stringify({ error: 'Chat niet gevonden. Stuur eerst een bericht naar de bot.' }),
          { status: 400, headers: corsHeaders }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: telegramData.description || 'Kon bericht niet verzenden naar Telegram',
          telegramError: telegramData
        }),
        { status: telegramResponse.status, headers: corsHeaders }
      );
    }

    // Success
    return new Response(
      JSON.stringify({ success: true, data: telegramData }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Server error',
        details: errorMessage
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
