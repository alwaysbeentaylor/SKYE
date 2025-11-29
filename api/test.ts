export default async function handler(req: Request): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      message: 'API is working!',
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    }),
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      } 
    }
  );
}

