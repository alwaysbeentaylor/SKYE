import nodemailer from 'nodemailer';

export default async function handler(req: Request): Promise<Response> {
  // CORS headers with security considerations
  // Note: '*' allows all origins. For production, consider restricting to specific domains
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
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
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
  const EMAIL_TO = process.env.EMAIL_TO || 'table.23@icloud.com';

  // Validate environment variables
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return new Response(
      JSON.stringify({
        error: 'Server configuration error',
        details: 'Missing Gmail credentials. Check Vercel environment variables.'
      }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Security: Input validation and sanitization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Security: Limit input length to prevent abuse
    if (name.length > 200 || email.length > 200 || (company && company.length > 200) || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Input too long. Please shorten your message.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // Format project type labels
    const projectTypeLabels: Record<string, string> = {
      'basis-website': 'Basis Website (€297/mnd)',
      'maatwerk': 'Maatwerk Project',
      'webshop': 'Webshop / E-commerce',
      'web-app': 'Web Applicatie / SaaS',
      'redesign': 'Redesign Bestaande Site',
      'anders': 'Anders / Vraag',
    };

    const budgetLabels: Record<string, string> = {
      '150-500': '€297 - €500/maand',
      '500-1000': '€500 - €1.000/maand',
      '1000-5000': '€1.000 - €5.000 eenmalig',
      '5000+': '€5.000+ eenmalig',
      'bespreken': 'Laten we bespreken',
    };

    const timelineLabels: Record<string, string> = {
      'direct': 'Zo snel mogelijk',
      '2-weken': 'Binnen 2 weken',
      '1-maand': 'Binnen 1 maand',
      '2-3-maanden': 'Binnen 2-3 maanden',
      'later': 'Later dit jaar',
      'verkennen': 'Nog aan het verkennen',
    };

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e3a8a; }
            .value { margin-top: 5px; color: #4b5563; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #1e3a8a; margin-top: 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔔 Nieuw Contactformulier Bericht</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Naam:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="label">🏢 Bedrijf:</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              
              ${projectType ? `
              <div class="field">
                <div class="label">🎯 Project Type:</div>
                <div class="value">${projectTypeLabels[projectType] || projectType}</div>
              </div>
              ` : ''}
              
              ${budget ? `
              <div class="field">
                <div class="label">💰 Budget:</div>
                <div class="value">${budgetLabels[budget] || budget}</div>
              </div>
              ` : ''}
              
              ${timeline ? `
              <div class="field">
                <div class="label">⏰ Timeline:</div>
                <div class="value">${timelineLabels[timeline] || timeline}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">💬 Bericht:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Dit bericht is verzonden via het contactformulier op skye-unlimited.be</p>
              <p>Antwoord direct op deze email om te reageren naar: ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
🔔 Nieuw Contactformulier Bericht

👤 Naam: ${name}
📧 Email: ${email}
${company ? `🏢 Bedrijf: ${company}\n` : ''}${projectType ? `🎯 Project Type: ${projectTypeLabels[projectType] || projectType}\n` : ''}${budget ? `💰 Budget: ${budgetLabels[budget] || budget}\n` : ''}${timeline ? `⏰ Timeline: ${timelineLabels[timeline] || timeline}\n` : ''}
💬 Bericht:
${message}

---
Dit bericht is verzonden via het contactformulier op skye-unlimited.be
Antwoord direct op deze email om te reageren naar: ${email}
    `.trim();

    // Send email
    const mailOptions = {
      from: `"SKYE Contact Form" <${GMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Nieuw contactformulier bericht van ${name}`,
      text: textContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    // Success
    return new Response(
      JSON.stringify({ success: true, message: 'Email successfully sent' }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending email:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to send email',
        details: errorMessage
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

