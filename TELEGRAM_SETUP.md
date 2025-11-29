# Telegram Bot Setup Instructies

## Stap 1: Maak een Telegram Bot

1. Open Telegram en zoek naar **@BotFather**
2. Stuur het commando: `/newbot`
3. Geef je bot een naam (bijvoorbeeld: "SKYE Contact Bot")
4. Geef je bot een username (moet eindigen op `bot`, bijvoorbeeld: `skye_contact_bot`)
5. BotFather geeft je een **Bot Token** - kopieer deze!

   Voorbeeld token: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

## Stap 2: Krijg je User ID

1. Zoek in Telegram naar **@userinfobot**
2. Start een chat en stuur een willekeurig bericht
3. De bot stuurt je je **User ID** terug - kopieer dit nummer!

   Voorbeeld User ID: `123456789`

## Stap 3: Stuur een testbericht naar je bot

1. Zoek je nieuwe bot op in Telegram (bijvoorbeeld: `@skye_contact_bot`)
2. Stuur een testbericht naar de bot (bijvoorbeeld: "Hello")
3. Dit is nodig zodat de bot je chat ID kan vinden

## Stap 4: Voeg Environment Variables toe in Vercel

1. Ga naar je Vercel project dashboard
2. Klik op **Settings** → **Environment Variables**
3. Voeg de volgende variabelen toe:

   **Variabele 1:**
   - Key: `TELEGRAM_BOT_TOKEN`
   - Value: [Plak hier je Bot Token van Stap 1]
   - Environment: Selecteer **Production** (en eventueel Preview/Development)
   - Klik **Save**

   **Variabele 2:**
   - Key: `TELEGRAM_USER_ID`
   - Value: [Plak hier je User ID van Stap 2]
   - Environment: Selecteer **Production** (en eventueel Preview/Development)
   - Klik **Save**

## Stap 5: Redeploy

1. Ga naar **Deployments** tab
2. Klik op de drie puntjes (...) naast je laatste deployment
3. Klik op **Redeploy**
4. Wacht tot de deployment klaar is

## Testen

Na de deployment zou het contactformulier moeten werken. Test het door:
1. Ga naar je website
2. Vul het contactformulier in
3. Verstuur het bericht
4. Je zou het bericht moeten ontvangen in Telegram!

## Troubleshooting

- **"Missing Telegram credentials"**: Controleer of beide environment variables zijn ingesteld
- **"Chat niet gevonden"**: Zorg ervoor dat je een bericht naar de bot hebt gestuurd (Stap 3)
- **Timeout errors**: Controleer of de environment variables correct zijn en voor Production zijn ingesteld

