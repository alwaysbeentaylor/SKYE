export default async function handler(req: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
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
          error: 'Server configuration error. Please contact the administrator.',
          details: 'Missing Telegram credentials'
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { message } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Telegram API from server (no CORS issues)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    let telegramResponse;
    try {
      telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_USER_ID),
          text: message,
        }),
      });
    } catch (fetchError) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to connect to Telegram API',
          details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    let telegramData;
    try {
      telegramData = await telegramResponse.json();
    } catch (jsonError) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response from Telegram API',
          status: telegramResponse.status
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (!telegramResponse.ok) {
      // Better error messages
      if (telegramData.description?.includes('chat not found')) {
        return new Response(
          JSON.stringify({ error: 'Chat niet gevonden. Zorg ervoor dat je eerst een bericht naar de bot hebt gestuurd.' }),
          { status: 400, headers: corsHeaders }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: telegramData.description || 'Kon bericht niet verzenden naar Telegram',
          details: telegramData
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
    // Catch any unexpected errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Unexpected server error',
        details: errorMessage
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

