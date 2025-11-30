import React, { useState, useEffect } from 'react';
import { Globe, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../translations';

const LANGUAGE_STORAGE_KEY = 'skye-language-preference';
const LANGUAGE_PROMPT_SHOWN_KEY = 'skye-language-prompt-shown';

interface LanguageDetectionResponse {
  language: Language;
  source: 'ip' | 'default' | 'error';
  country?: string;
}

// Map language codes to country names for display - will be used dynamically based on current language
const getCountryName = (detectedLang: Language, currentLang: Language): string => {
  if (currentLang === 'nl') {
    // Dutch translations
    return detectedLang === 'nl' ? 'Nederland of België' : 'een Engelssprekend land';
  } else {
    // English translations
    return detectedLang === 'nl' ? 'the Netherlands or Belgium' : 'an English-speaking country';
  }
};

const LanguagePrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<Language | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [rememberPreference, setRememberPreference] = useState(true);
  const { theme, language, setLanguage, t } = useApp();

  // Expose functions to window for testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Reset all language preferences and reload
      (window as any).resetLanguagePrompt = () => {
        console.log('[LanguagePrompt] Resetting language preferences...');
        localStorage.removeItem(LANGUAGE_PROMPT_SHOWN_KEY);
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
        localStorage.removeItem('FORCE_LANGUAGE_PROMPT');
        window.location.reload();
      };
      
      // Force show the prompt immediately
      (window as any).showLanguagePrompt = (lang?: 'nl' | 'en') => {
        console.log('[LanguagePrompt] Force showing prompt with language:', lang || 'en');
        const detected = lang || 'en';
        setDetectedLanguage(detected);
        setShowPrompt(true);
        setIsDetecting(false);
      };
      
      // Enable force mode (prompt always shows)
      (window as any).enableLanguagePromptForce = () => {
        console.log('[LanguagePrompt] Enabling force mode...');
        localStorage.setItem('FORCE_LANGUAGE_PROMPT', 'true');
        window.location.reload();
      };
      
      // Disable force mode
      (window as any).disableLanguagePromptForce = () => {
        console.log('[LanguagePrompt] Disabling force mode...');
        localStorage.removeItem('FORCE_LANGUAGE_PROMPT');
        window.location.reload();
      };
      
      console.log('[LanguagePrompt] Test functions available:');
      console.log('  - resetLanguagePrompt() - Reset all preferences');
      console.log('  - showLanguagePrompt("en"|"nl") - Show prompt immediately');
      console.log('  - enableLanguagePromptForce() - Always show prompt');
      console.log('  - disableLanguagePromptForce() - Disable force mode');
    }
  }, []);

  useEffect(() => {
    // DEVELOPMENT MODE: Force show prompt (remove in production)
    const FORCE_SHOW = import.meta.env.DEV && localStorage.getItem('FORCE_LANGUAGE_PROMPT') === 'true';
    
    // Check if prompt was already shown
    const promptShown = localStorage.getItem(LANGUAGE_PROMPT_SHOWN_KEY);
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    
    console.log('[LanguagePrompt] Checking localStorage:', { 
      promptShown, 
      savedLanguage, 
      currentLanguage: language,
      FORCE_SHOW 
    });
    
    // If forcing show, skip all checks
    if (FORCE_SHOW) {
      console.log('[LanguagePrompt] FORCE_SHOW mode enabled, showing prompt');
      detectLanguageFromIP();
      return;
    }
    
    // If user already has a saved preference, use it but still check if prompt was shown
    if (savedLanguage && (savedLanguage === 'nl' || savedLanguage === 'en')) {
      console.log('[LanguagePrompt] Found saved language preference:', savedLanguage);
      setLanguage(savedLanguage);
      
      // If prompt was already shown, don't show again
      if (promptShown === 'true') {
        console.log('[LanguagePrompt] Prompt already shown, skipping');
        return;
      }
      
      // If language is saved but prompt wasn't shown yet, show it anyway
      // This handles the case where language was set manually but prompt wasn't shown
      console.log('[LanguagePrompt] Language saved but prompt not shown, showing now');
      setDetectedLanguage(savedLanguage);
      setTimeout(() => {
        setShowPrompt(true);
        setIsDetecting(false);
      }, 1500);
      return;
    }

    // If prompt was already shown but no language saved, don't show again
    if (promptShown === 'true') {
      console.log('[LanguagePrompt] Prompt already shown, skipping');
      return;
    }

    console.log('[LanguagePrompt] Starting language detection...');
    // Detect language from IP
    detectLanguageFromIP();
  }, []);

  const detectLanguageFromIP = async () => {
    try {
      setIsDetecting(true);
      
      let detected: Language | null = null;
      
      // Try API endpoint first (works on Vercel)
      try {
        const response = await fetch('/api/detect-language');
        
        if (response.ok) {
          const data: LanguageDetectionResponse = await response.json();
          detected = data.language;
        }
      } catch (apiError) {
        // API endpoint not available (e.g., local dev without vercel dev)
        // Fallback to browser-based detection
        console.log('API endpoint not available, using browser-based detection');
      }
      
      // Fallback: Use browser-based IP geolocation API (HTTPS)
      if (!detected) {
        try {
          // Use ipapi.co which supports HTTPS and CORS
          const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            const countryCode = data.country_code;
            
            // Map country codes to languages
            if (countryCode === 'NL' || countryCode === 'BE') {
              detected = 'nl';
            } else if (['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'].includes(countryCode)) {
              detected = 'en';
            } else {
              detected = 'nl'; // Default to Dutch
            }
          }
        } catch (browserError) {
          console.error('Browser-based detection failed:', browserError);
          // Try alternative service as last resort
          try {
            const altResponse = await fetch('https://ip-api.com/json/?fields=countryCode');
            if (altResponse.ok) {
              const altData = await altResponse.json();
              const countryCode = altData.countryCode;
              if (countryCode === 'NL' || countryCode === 'BE') {
                detected = 'nl';
              } else if (['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'].includes(countryCode)) {
                detected = 'en';
              } else {
                detected = 'nl';
              }
            }
          } catch (altError) {
            console.error('Alternative detection also failed:', altError);
            detected = null;
          }
        }
      }
      
      // If detection fails, use browser language as fallback
      if (!detected) {
        console.log('[LanguagePrompt] IP detection failed, trying browser language');
        try {
          const browserLang = navigator.language || (navigator as any).userLanguage || 'nl';
          if (browserLang.startsWith('nl')) {
            detected = 'nl';
          } else if (browserLang.startsWith('en')) {
            detected = 'en';
          } else {
            detected = 'nl'; // Default to Dutch
          }
          console.log('[LanguagePrompt] Using browser language:', detected, 'from:', browserLang);
        } catch (e) {
          console.error('[LanguagePrompt] Browser language detection failed:', e);
          detected = 'nl'; // Ultimate fallback
        }
      }
      
      // Ensure we always have a detected language
      if (!detected) {
        detected = 'nl'; // Final fallback
      }
      
      setDetectedLanguage(detected);
      console.log('[LanguagePrompt] Final detected language:', detected, 'Current language:', language);
      
      // Always show prompt on first visit to let user confirm or change
      // Only skip if language matches AND user already confirmed (but we check that earlier)
      setTimeout(() => {
        console.log('[LanguagePrompt] Showing prompt with language:', detected);
        setShowPrompt(true);
        setIsDetecting(false);
      }, 1500); // Show after 1.5 seconds for better UX
      
    } catch (error) {
      console.error('Error detecting language:', error);
      // On error, don't show prompt (use default)
      setDetectedLanguage(null);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleKeepLanguage = () => {
    // Keep the detected language
    if (detectedLanguage) {
      setLanguage(detectedLanguage);
      
      if (rememberPreference) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLanguage);
      }
    }
    
    localStorage.setItem(LANGUAGE_PROMPT_SHOWN_KEY, 'true');
    setShowPrompt(false);
  };

  const handleChangeLanguage = () => {
    // Change to the other language
    const newLanguage: Language = detectedLanguage === 'nl' ? 'en' : 'nl';
    setLanguage(newLanguage);
    
    if (rememberPreference) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    }
    
    localStorage.setItem(LANGUAGE_PROMPT_SHOWN_KEY, 'true');
    setShowPrompt(false);
  };

  // Debug: Log current state
  useEffect(() => {
    console.log('[LanguagePrompt] State:', { 
      showPrompt, 
      detectedLanguage, 
      isDetecting, 
      currentLanguage: language 
    });
  }, [showPrompt, detectedLanguage, isDetecting, language]);

  if (!showPrompt || !detectedLanguage || isDetecting) {
    return null;
  }

  const countryName = getCountryName(detectedLanguage, language);
  const message = t.languagePrompt.message.replace('{country}', countryName);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`max-w-md w-full rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-navy border border-white/10' : 'bg-white border border-slate-200'
      } p-6 md:p-8 animate-in zoom-in duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe size={24} className="text-primary" />
            </div>
            <h2 className={`font-bold text-2xl ${theme === 'dark' ? 'text-white' : 'text-navy'}`}>
              {t.languagePrompt.title}
            </h2>
          </div>
          <button
            onClick={handleKeepLanguage}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-100'
            }`}
            aria-label="Close"
          >
            <X size={20} className={theme === 'dark' ? 'text-white' : 'text-navy'} />
          </button>
        </div>

        {/* Message */}
        <p className={`text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-6 leading-relaxed`}>
          {message}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleKeepLanguage}
            className="w-full px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primaryDark text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2"
          >
            <Check size={18} />
            {t.languagePrompt.keep}
          </button>
          
          <button
            onClick={handleChangeLanguage}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-slate-100 hover:bg-slate-200 text-navy border border-slate-300'
            }`}
          >
            {t.languagePrompt.change}
          </button>

          {/* Remember Preference Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={rememberPreference}
              onChange={(e) => setRememberPreference(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-2"
            />
            <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.languagePrompt.remember}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LanguagePrompt;

