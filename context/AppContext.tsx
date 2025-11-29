
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Content } from '../translations';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State - Forced to dark initially for that premium feel
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Language State - Load from localStorage or default to Dutch
  const [language, setLanguage] = useState<Language>(() => {
    // Try to load saved language preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skye-language-preference') as Language | null;
      if (saved === 'nl' || saved === 'en') {
        return saved;
      }
    }
    return 'nl'; // Default to Dutch
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Update language and save to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skye-language-preference', lang);
    }
  };

  const t = translations[language as keyof typeof translations] || translations.nl;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, setLanguage: handleSetLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
