import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Altijd aan (verplicht)
    analytics: false,
    marketing: false
  });
  const { theme } = useApp();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setCookiePreferences(saved);
        applyCookiePreferences(saved);
      } catch (e) {
        // If parsing fails, use defaults
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: typeof cookiePreferences) => {
    // Hier kun je tracking scripts in- of uitschakelen op basis van preferences
    // Bijvoorbeeld: Google Analytics alleen laden als analytics is toegestaan
    
    // Voorbeeld voor Google Analytics (uncomment als je GA gebruikt):
    // if (prefs.analytics) {
    //   // Load Google Analytics
    //   // @ts-ignore
    //   window.gtag = window.gtag || function(){(window.gtag.q=window.gtag.q||[]).push(arguments)};
    // } else {
    //   // Disable Google Analytics
    //   // Clear any existing GA cookies
    // }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setCookiePreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setCookiePreferences(necessaryOnly);
    savePreferences(necessaryOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  const savePreferences = (prefs: typeof cookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    applyCookiePreferences(prefs);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 ${
          theme === 'dark' ? 'bg-navy border-t border-white/10' : 'bg-white border-t border-slate-200'
        } shadow-2xl animate-in slide-in-from-bottom duration-300`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie size={20} className="text-primary" />
                <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                  Wij gebruiken cookies
                </h3>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                Wij gebruiken cookies om je website ervaring te verbeteren, website gebruik te analyseren en voor marketing doeleinden. 
                Door op "Accepteren" te klikken, ga je akkoord met het gebruik van alle cookies. 
                Je kunt je voorkeuren aanpassen via de instellingen.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-navy border border-slate-300'
                }`}
              >
                <Settings size={16} className="inline mr-2" />
                Instellingen
              </button>
              <button
                onClick={handleAcceptNecessary}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-navy border border-slate-300'
                }`}
              >
                Alleen Noodzakelijk
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primaryDark text-white transition-colors"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`max-w-2xl w-full rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-navy' : 'bg-white'
          } p-6 md:p-8 animate-in zoom-in duration-200`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cookie size={24} className="text-primary" />
                <h2 className={`font-bold text-2xl ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                  Cookie Instellingen
                </h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                }`}
              >
                <X size={20} className={theme === 'dark' ? 'text-white' : 'text-navy'} />
              </button>
            </div>

            <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-6 leading-relaxed`}>
              Kies welke cookies je wilt accepteren. Noodzakelijke cookies zijn altijd actief omdat ze essentieel zijn voor het functioneren van de website.
            </p>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                      Noodzakelijke Cookies
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                      Altijd actief
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    Verplicht
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Deze cookies zijn essentieel voor de basisfuncties van de website en kunnen niet worden uitgeschakeld.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                      Analytics Cookies
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                      Optioneel
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        analytics: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${
                      cookiePreferences.analytics
                        ? 'bg-primary'
                        : theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Deze cookies helpen ons begrijpen hoe bezoekers de website gebruiken door informatie te verzamelen en te rapporteren.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                      Marketing Cookies
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                      Optioneel
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        marketing: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${
                      cookiePreferences.marketing
                        ? 'bg-primary'
                        : theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Deze cookies worden gebruikt om relevante advertenties en marketing campagnes weer te geven.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptNecessary}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-navy border border-slate-300'
                }`}
              >
                Alleen Noodzakelijk
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-3 rounded-lg font-medium bg-primary hover:bg-primaryDark text-white transition-colors"
              >
                Voorkeuren Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
