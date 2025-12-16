
import nodemailer from 'nodemailer';

export default async function handler(req: Request): Promise<Response> {
    // CORS headers
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

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const EMAIL_TO = process.env.EMAIL_TO || 'table.23@icloud.com';

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        return new Response(
            JSON.stringify({ error: 'Server configuration error' }),
            { status: 500, headers: corsHeaders }
        );
    }

    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return new Response(
                JSON.stringify({ error: 'Email is required' }),
                { status: 400, headers: corsHeaders }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"SKYE Unsubscribe System" <${GMAIL_USER}>`,
            to: EMAIL_TO,
            subject: `🛑 Iemand heeft zich uitgeschreven: ${email}`,
            text: `De volgende gebruiker heeft zich uitgeschreven voor de mails:\n\n${email}\n\nHaal deze gebruiker uit de verzendlijst.`,
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #ef4444;">🛑 Nieuwe Uitschrijving</h2>
          <p>De volgende gebruiker wil geen mails meer ontvangen:</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            ${email}
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Actie vereist: Haal deze gebruiker uit je actieve mailinglijst.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        // Write to local file (UnscMails.txt)
        try {
            const fs = require('fs');
            const path = require('path');
            const logFilePath = path.join(process.cwd(), 'UnscMails.txt');
            const logEntry = `${new Date().toISOString()} - ${email}\n`;

            fs.appendFileSync(logFilePath, logEntry);
        } catch (fileError) {
            console.error('Error writing to UnscMails.txt:', fileError);
            // We don't fail the request if file logging fails, as email was sent
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error sending unsubscribe notification:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to process unsubscribe' }),
            { status: 500, headers: corsHeaders }
        );
    }
}
