
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationKey, TranslationKeys } from '@/types/i18n';
import { translations } from '@/i18n/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  translateApiData: (data: any, field: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({ children, defaultLanguage = 'en' }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then browser language, then default to English
    const stored = localStorage.getItem('kahoot-language') as Language;
    if (stored && (stored === 'fr' || stored === 'en')) {
      return stored;
    }
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('en')) return 'en';
    
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
    let translation = translations[language][key] || translations['en'][key] || key;
    
    // Handle interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        translation = translation.replace(regex, String(value));
      });
    }
    
    return translation;
  };

  const translateApiData = (data: any, field: string): string => {
    if (!data) return '';
    
    // Try to get localized field first (field_en, field_fr)
    const localizedField = `${field}_${language}`;
    if (data[localizedField]) {
      return data[localizedField];
    }
    
    // Fallback to English version
    const englishField = `${field}_en`;
    if (data[englishField]) {
      return data[englishField];
    }
    
    // Fallback to French version
    const frenchField = `${field}_fr`;
    if (data[frenchField]) {
      return data[frenchField];
    }
    
    // Fallback to original field
    return data[field] || '';
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    translateApiData,
    isRTL: false,
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

export function useTranslation() {
  const { t, translateApiData } = useI18n();
  return { t, translateApiData };
}
