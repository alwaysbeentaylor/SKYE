# Admin Panel - Bezoekerstracking

## Overzicht

Het admin panel houdt bij wie op de site is geweest, hoe vaak, en uit welke landen ze komen.

## Toegang

- URL: `http://localhost:3000/#/admin` (lokaal) of `https://jouw-domein.be/#/admin` (productie)
- Standaard wachtwoord: `admin123`

⚠️ **BELANGRIJK**: Wijzig het wachtwoord in productie door de environment variable `ADMIN_PASSWORD` in te stellen in Vercel.

## Features

### Dashboard Statistieken
- **Unieke Bezoekers**: Totaal aantal unieke bezoekers
- **Totaal Bezoeken**: Totaal aantal paginaweergaven
- **Landen**: Aantal verschillende landen
- **Gemiddelde Bezoeken per Bezoeker**: Engagement metric

### Top Landen
Toont de top 10 landen waar bezoekers vandaan komen, gesorteerd op aantal bezoeken.

### Bezoekerslijst
Tabel met alle bezoekers, inclusief:
- Land van herkomst
- Aantal bezoeken per bezoeker
- Laatste bezoek datum/tijd
- Laatst bezochte pagina

## Technische Details

### Tracking
Bezoekers worden automatisch getrackt wanneer ze de site bezoeken. De tracking gebeurt:
- Bij eerste pagina load
- Bij navigatie tussen pagina's (SPA routing)

### Data Opslag
**Huidige implementatie**: In-memory storage (data gaat verloren bij server restart)

**Voor productie**: Vervang de storage functies in `api/track-visitor/index.ts` en `api/get-visitors/index.ts` met een echte database zoals:
- Supabase (PostgreSQL)
- MongoDB Atlas
- Vercel KV (Redis)
- Firebase Firestore

### API Endpoints

#### POST `/api/track-visitor`
Trackt een nieuwe bezoeker of update een bestaande.

**Request Body:**
```json
{
  "path": "/",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0..."
}
```

#### POST `/api/get-visitors`
Haalt bezoekersdata op (vereist authenticatie).

**Request Body:**
```json
{
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "visitors": [...],
    "stats": {
      "totalVisitors": 100,
      "totalVisits": 250,
      "uniqueCountries": 15,
      "countryStats": {
        "Netherlands": 50,
        "Belgium": 30,
        ...
      }
    }
  }
}
```

## Installatie voor Productie

### 1. Wachtwoord Instellen
In Vercel dashboard, voeg environment variable toe:
- Key: `ADMIN_PASSWORD`
- Value: Je sterke wachtwoord

### 2. Database Integratie (Aanbevolen)
Voor persistente data opslag:

1. Kies een database service (bijv. Supabase)
2. Update `api/track-visitor/index.ts` en `api/get-visitors/index.ts`
3. Vervang de `saveToStorage()` en `loadFromStorage()` functies

**Voorbeeld met Supabase:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

async function saveToStorage(visitors: Map<string, VisitorData>) {
  const data = Array.from(visitors.values());
  await supabase.from('visitors').upsert(data);
}

async function loadFromStorage() {
  const { data } = await supabase.from('visitors').select('*');
  const map = new Map();
  data?.forEach(v => map.set(v.id, v));
  return map;
}
```

## Privacy & GDPR

⚠️ **Let op**: Deze tracking verzamelt IP-adressen en user agents. Zorg ervoor dat:
1. Je cookie consent hebt geïmplementeerd (✅ al gedaan)
2. Je privacy policy bijwerkt met tracking informatie
3. Je data regelmatig opruimt (oude bezoekers verwijderen)
4. Je GDPR compliant bent voor EU bezoekers

## Toekomstige Verbeteringen

- [ ] Database integratie voor persistente opslag
- [ ] Grafieken en trends over tijd
- [ ] Export functionaliteit (CSV/JSON)
- [ ] Real-time updates (WebSocket)
- [ ] Meer gedetailleerde analytics (browsers, devices, etc.)
- [ ] Automatische data cleanup (oude records verwijderen)
- [ ] Multi-user support met rollen





