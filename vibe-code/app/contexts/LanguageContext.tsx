// app/contexts/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '../i18n/i18n-types';
import { defaultLocale, getTranslations, isValidLocale } from '../i18n/i18n-util';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: any;
  switchLanguage: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<any>({});

  // Initialize language from localStorage or default
  useEffect(() => {
    const savedLocale = localStorage.getItem('language');
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocale(savedLocale);
    } else {
      setLocale(defaultLocale);
    }
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    async function loadTranslations() {
      const translations = await getTranslations(locale);
      setTranslations(translations);
    }
    
    loadTranslations();
    
    // Save to localStorage
    localStorage.setItem('language', locale);
    
    // Update document language for accessibility
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLanguage = (newLocale: Locale) => {
    if (isValidLocale(newLocale)) {
      setLocale(newLocale);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      locale, 
      setLocale, 
      translations, 
      switchLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}