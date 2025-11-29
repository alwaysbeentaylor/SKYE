# Cookie Consent Implementatie & GDPR Compliance

## 📋 Wat zijn cookies en waarom zijn ze belangrijk?

### Wat zijn cookies?
Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen wanneer je een website bezoekt. Ze helpen websites om informatie te onthouden over je bezoek.

### Waarom cookie consent nodig is

#### 1. **GDPR/AVG Compliance (Wettelijk Verplicht)** ✅
- In België en Nederland is cookie consent **verplicht** volgens de GDPR/AVG
- Je moet gebruikers informeren over welke cookies je gebruikt
- Gebruikers moeten kunnen kiezen welke cookies ze accepteren
- Alleen noodzakelijke cookies mogen zonder toestemming

#### 2. **Voor SEO & Analytics** 📊
- **Directe impact op SEO**: Minimale invloed
- **Wel belangrijk voor**:
  - Analytics data (Google Analytics, etc.)
  - User behavior tracking
  - Conversion tracking
  - A/B testing data

#### 3. **User Trust & Transparantie** 🛡️
- Gebruikers verwachten transparantie over data gebruik
- Verbetert vertrouwen in je website
- Kan conversion rates positief beïnvloeden

## ✅ Wat is geïmplementeerd

### Cookie Consent Component
- ✅ Cookie banner met opties
- ✅ Cookie instellingen modal
- ✅ Categorieën: Noodzakelijk, Analytics, Marketing
- ✅ Preferences worden opgeslagen in localStorage
- ✅ Dark mode support

### Hoe het werkt:
1. **Eerste bezoek**: Banner verschijnt na 1 seconde
2. **Keuzes**:
   - "Accepteren" - alle cookies accepteren
   - "Alleen Noodzakelijk" - alleen essentiële cookies
   - "Instellingen" - kies per categorie
3. **Opslag**: Voorkeuren worden opgeslagen in localStorage
4. **Volgende bezoeken**: Keuze wordt onthouden

## 🔧 Hoe Analytics cookies implementeren

### Stap 1: Google Analytics toevoegen (optioneel)

Als je Google Analytics wilt gebruiken, voeg dit toe aan `index.html` **NA** de cookie consent:

```html
<!-- In index.html, na de cookie consent logic -->
<script>
  // Load Google Analytics only if analytics cookies are accepted
  function loadGoogleAnalytics() {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const prefs = JSON.parse(consent);
      if (prefs.analytics) {
        // Google Analytics code hier
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
      }
    }
  }
  
  // Check on page load
  loadGoogleAnalytics();
</script>
```

### Stap 2: Update CookieConsent component

Uncomment de analytics code in `components/CookieConsent.tsx`:

```typescript
// In applyCookiePreferences functie:
if (prefs.analytics) {
  // Load Google Analytics
  loadGoogleAnalytics();
} else {
  // Disable/clear analytics
  // Clear GA cookies if needed
}
```

## 📊 Impact op SEO

### Directe SEO Impact: **Minimaal** ⚠️
- Google indexeert je site met of zonder cookies
- Cookie banners hebben geen directe impact op rankings
- Search engines kunnen sites crawlen zonder cookie consent

### Indirecte SEO Impact: **Positief** ✅
- **User Experience**: Transparantie verbetert trust
- **Bounce Rate**: Goede UX kan bounce rate verlagen
- **Analytics Data**: Betere data = betere optimalisatie
- **Compliance**: Voorkomt boetes die reputatie kunnen schaden

## 🚨 Belangrijk voor België/Nederland

### Verplichtingen:
1. ✅ **Informatie verstrekken** - Wat voor cookies gebruik je?
2. ✅ **Toestemming vragen** - Voor niet-noodzakelijke cookies
3. ✅ **Opt-out mogelijkheid** - Gebruikers moeten kunnen weigeren
4. ✅ **Cookie policy pagina** - Maak een `/cookie-policy` pagina

### Noodzakelijke vs. Optionele Cookies:

**Noodzakelijk (geen toestemming nodig):**
- Session cookies
- Security cookies
- Load balancing cookies
- Functionele cookies (zoals winkelwagen)

**Optioneel (toestemming vereist):**
- Analytics cookies (Google Analytics)
- Marketing cookies (Facebook Pixel, etc.)
- Advertising cookies
- Social media cookies

## 📝 Volgende Stappen

### 1. Cookie Policy Pagina maken
Maak een `/cookie-policy` pagina met:
- Welke cookies gebruikt je website
- Waarom je ze gebruikt
- Hoe lang ze bewaard worden
- Hoe gebruikers ze kunnen verwijderen

### 2. Privacy Policy bijwerken
Zorg dat je privacy policy cookies vermeldt

### 3. Analytics implementeren (optioneel)
Als je analytics wilt:
- Voeg Google Analytics toe
- Link naar CookieConsent component
- Test dat analytics alleen laadt na toestemming

### 4. Testen
- Test cookie banner op verschillende devices
- Test dat preferences correct worden opgeslagen
- Test dat analytics pas laadt na toestemming

## ⚖️ Wettelijke Disclaimer

Dit is geen juridisch advies. Voor volledige GDPR compliance raadpleeg een juridisch expert, vooral als je:
- Persoonlijke gegevens verzamelt
- Europese gebruikers hebt
- E-commerce functionaliteit hebt
- Lead generatie doet

## 🔗 Handige Links

- [GDPR.eu - Cookie Consent](https://gdpr.eu/cookies/)
- [Autoriteit Persoonsgegevens (NL)](https://autoriteitpersoonsgegevens.nl/)
- [Gegevensbeschermingsautoriteit (BE)](https://www.gegevensbeschermingsautoriteit.be/)

---

**Status**: ✅ Cookie consent component geïmplementeerd
**Volgende**: Cookie policy pagina maken en analytics configureren (indien gewenst)

