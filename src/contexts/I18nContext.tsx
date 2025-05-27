import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationKey, TranslationKeys } from '@/types/i18n';
import { translations } from '@/i18n/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({ children, defaultLanguage = 'fr' }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then browser language, then default
    const stored = localStorage.getItem('kahoot-language') as Language;
    if (stored && (stored === 'fr' || stored === 'en')) {
      return stored;
    }
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('fr')) return 'fr';
    
    return defaultLanguage;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kahoot-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || translations['fr'][key] || key;
    
    // Handle interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        translation = translation.replace(regex, String(value));
      });
    }
    
    return translation;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    isRTL: false, // Only supporting LTR languages for now (fr/en)
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Convenience hook for translation only
export function useTranslation() {
  const { t } = useI18n();
  return { t };
}
