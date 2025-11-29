# EmailJS Setup Instructies

## Overzicht

Het contactformulier gebruikt EmailJS om emails te verzenden naar `table.23@icloud.com`. EmailJS werkt client-side, dus er is geen serverless functie nodig en geen Gmail App Password vereist.

## Stap 1: Maak een EmailJS Account

1. Ga naar [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klik op **Sign Up** (gratis account)
3. Maak een account aan met je email adres
4. Bevestig je email adres

## Stap 2: Maak een Email Service

1. Log in op je EmailJS dashboard
2. Ga naar **Email Services** in het linkermenu
3. Klik op **Add New Service**
4. Kies je email provider:
   - **Gmail** (aanbevolen - gebruik je eigen Gmail account)
   - Of een andere provider (Outlook, Yahoo, etc.)
5. Volg de instructies om je email account te verbinden
6. **Kopieer de Service ID** - je hebt deze later nodig

## Stap 3: Maak een Email Template

1. Ga naar **Email Templates** in het linkermenu
2. Klik op **Create New Template**
3. Kies een template of start met een lege template
4. Configureer het template:

   **Template Settings:**
   - **To Email:** `table.23@icloud.com`
   - **From Name:** `{{from_name}}`
   - **From Email:** `{{from_email}}`
   - **Reply To:** `{{reply_to}}`
   - **Subject:** `Nieuw contactformulier bericht van {{from_name}}`

   **Email Body (HTML of Plain Text):**
   ```
   🔔 Nieuw Contactformulier Bericht

   👤 Naam: {{from_name}}
   📧 Email: {{from_email}}
   🏢 Bedrijf: {{company}}
   🎯 Project Type: {{project_type}}
   💰 Budget: {{budget}}
   ⏰ Timeline: {{timeline}}

   💬 Bericht:
   {{message}}
   ```

   Of gebruik de formatted_message variabele:
   ```
   {{formatted_message}}
   ```

5. Klik op **Save**
6. **Kopieer de Template ID** - je hebt deze later nodig

## Stap 4: Haal je Public Key op

1. Ga naar **Account** → **General** in het linkermenu
2. Zoek naar **Public Key** (ook wel User ID genoemd)
3. **Kopieer de Public Key** - je hebt deze later nodig

## Stap 5: Voeg Environment Variables toe

Je hebt twee opties:

### Optie A: Via Vercel Environment Variables (Aanbevolen voor Production)

1. Ga naar je Vercel project dashboard
2. Klik op **Settings** → **Environment Variables**
3. Voeg de volgende variabelen toe:

   **Variabele 1:**
   - Key: `VITE_EMAILJS_SERVICE_ID`
   - Value: [Je Service ID van Stap 2]
   - Environment: Selecteer **Production** (en eventueel Preview/Development)
   - Klik **Save**

   **Variabele 2:**
   - Key: `VITE_EMAILJS_TEMPLATE_ID`
   - Value: [Je Template ID van Stap 3]
   - Environment: Selecteer **Production** (en eventueel Preview/Development)
   - Klik **Save**

   **Variabele 3:**
   - Key: `VITE_EMAILJS_PUBLIC_KEY`
   - Value: [Je Public Key van Stap 4]
   - Environment: Selecteer **Production** (en eventueel Preview/Development)
   - Klik **Save**

### Optie B: Via .env bestand (Voor Local Development)

1. Maak een `.env` bestand in de root van je project (als deze nog niet bestaat)
2. Voeg de volgende regels toe:

   ```
   VITE_EMAILJS_SERVICE_ID=je_service_id_hier
   VITE_EMAILJS_TEMPLATE_ID=je_template_id_hier
   VITE_EMAILJS_PUBLIC_KEY=je_public_key_hier
   ```

3. **Belangrijk:** Voeg `.env` toe aan `.gitignore` om je keys niet te committen!

## Stap 6: Redeploy

1. Ga naar **Deployments** tab in Vercel
2. Klik op de drie puntjes (...) naast je laatste deployment
3. Klik op **Redeploy**
4. Wacht tot de deployment klaar is

## Testen

Na de deployment zou het contactformulier moeten werken. Test het door:

1. Ga naar je website
2. Vul het contactformulier in
3. Verstuur het bericht
4. Je zou het bericht moeten ontvangen op `table.23@icloud.com`

## Troubleshooting

### "Email service is niet geconfigureerd"
- Controleer of alle drie de environment variables zijn ingesteld
- Zorg ervoor dat de variabelen beginnen met `VITE_` prefix
- Controleer of de environment variables voor **Production** zijn ingesteld

### "Failed to send email"
- Controleer of je EmailJS service correct is geconfigureerd
- Controleer of je template correct is ingesteld
- Bekijk de EmailJS dashboard voor error logs
- Controleer of je EmailJS account niet is beperkt (gratis tier heeft limieten)

### Email komt niet aan
- Controleer je spam/junk folder
- Controleer of het "To Email" adres correct is ingesteld in je template
- Controleer de EmailJS logs in je dashboard

## EmailJS Gratis Tier Limieten

- **200 emails per maand** (gratis)
- Genoeg voor de meeste websites
- Upgrade naar betaald plan voor meer emails

## Belangrijke Veiligheidstips

- **Gebruik Vercel Environment Variables** voor production (niet .env in git)
- Je Public Key is veilig om te delen (het is een public key)
- Service ID en Template ID zijn ook relatief veilig, maar deel ze niet publiekelijk
- EmailJS encrypteert alle data in transit

## Voordelen van EmailJS

- ✅ Geen serverless functie nodig
- ✅ Geen Gmail App Password nodig
- ✅ Werkt direct vanuit de browser
- ✅ Eenvoudig te configureren
- ✅ Gratis tier beschikbaar
- ✅ Betrouwbare email delivery
