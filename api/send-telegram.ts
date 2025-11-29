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
      JSON.stringify({ error: 'Server configuration error. Please contact the administrator.' }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Telegram API from server (no CORS issues)
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
      // Better error messages
      if (telegramData.description?.includes('chat not found')) {
        return new Response(
          JSON.stringify({ error: 'Chat niet gevonden. Zorg ervoor dat je eerst een bericht naar de bot hebt gestuurd.' }),
          { status: 400, headers: corsHeaders }
        );
      }
      
      return new Response(
        JSON.stringify({ error: telegramData.description || 'Kon bericht niet verzenden naar Telegram' }),
        { status: telegramResponse.status, headers: corsHeaders }
      );
    }

    // Success
    return new Response(
      JSON.stringify({ success: true, data: telegramData }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error in send-telegram API:', error);
    return new Response(
      JSON.stringify({ error: 'Netwerkfout bij het verzenden naar Telegram' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
