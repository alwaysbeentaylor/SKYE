# Language Prompt Test Instructies

## Probleem: Popup verschijnt niet lokaal

Als de popup niet verschijnt, is dit waarschijnlijk omdat localStorage al gevuld is.

## Oplossing: localStorage wissen

### Optie 1: Via Browser Console (Aanbevolen)

1. Open je browser (Chrome/Firefox/Edge)
2. Druk op `F12` om Developer Tools te openen
3. Ga naar de **Console** tab
4. Voer het volgende commando uit:

```javascript
localStorage.removeItem('skye-language-prompt-shown');
localStorage.removeItem('skye-language-preference');
location.reload();
```

5. De pagina herlaadt en de popup zou nu moeten verschijnen

### Optie 2: Via Application Tab

1. Open Developer Tools (`F12`)
2. Ga naar **Application** tab (Chrome) of **Storage** tab (Firefox)
3. Klik op **Local Storage** in de linker sidebar
4. Selecteer je website URL
5. Zoek en verwijder deze keys:
   - `skye-language-prompt-shown`
   - `skye-language-preference`
6. Herlaad de pagina (`F5`)

### Optie 3: Force Show Mode (Development)

1. Open Developer Tools (`F12`)
2. Ga naar **Console** tab
3. Voer uit:

```javascript
localStorage.setItem('FORCE_LANGUAGE_PROMPT', 'true');
location.reload();
```

Dit forceert de popup om altijd te verschijnen, zelfs als deze al eerder is getoond.

### Optie 4: Test Functie

1. Open Developer Tools (`F12`)
2. Ga naar **Console** tab
3. Voer uit:

```javascript
showLanguagePrompt();
```

Dit toont de popup direct zonder detectie.

## Debugging

Als de popup nog steeds niet verschijnt, check de console voor logs die beginnen met `[LanguagePrompt]`:

```javascript
// In console zie je:
[LanguagePrompt] Checking localStorage: {...}
[LanguagePrompt] Starting language detection...
[LanguagePrompt] Detected language: ...
[LanguagePrompt] Showing prompt
```

## Verwachte Gedrag

1. **Eerste bezoek**: Popup verschijnt na ~1.5 seconden
2. **Na keuze**: Popup verschijnt niet meer (opgeslagen in localStorage)
3. **Volgende bezoek**: Taal wordt automatisch geladen uit localStorage

## API Endpoint Test

De API endpoint werkt alleen op Vercel. Lokaal gebruikt het de browser fallback (ipapi.co of ip-api.com).

Als je de API endpoint lokaal wilt testen:
- Installeer Vercel CLI: `npm i -g vercel`
- Run: `vercel dev`
- Dit start een lokale server die de API routes ondersteunt





