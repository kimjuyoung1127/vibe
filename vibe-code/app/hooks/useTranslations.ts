// app/hooks/useTranslations.ts
import { useLanguage } from '../contexts/LanguageContext';

export function useTranslations() {
  const { translations, locale, switchLanguage } = useLanguage();

  // Recursive function to get nested translation with parameter support
  const t = (key: string, fallback?: string, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    let current: any = translations;

    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k];
      } else {
        return fallback || key;
      }
    }

    let result = typeof current === 'string' ? current : (fallback || key);
    
    // If parameters are provided, replace placeholders in the translation
    if (params && typeof result === 'string') {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }

    return result;
  };

  return {
    t,
    currentLocale: locale,
    switchLanguage
  };
}