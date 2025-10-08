// app/i18n/i18n-util.ts
import type { Locale } from './i18n-types';

// Default locale
export const defaultLocale: Locale = 'ko';

// Supported locales
export const locales: Locale[] = ['en', 'ko'];

// Load translation resources
async function loadLocaleData(locale: Locale) {
  const resources = await import(`./locales/${locale}.json`);
  return resources.default;
}

// Translation function
export async function getTranslation(locale: Locale, key: string) {
  const resources = await loadLocaleData(locale);
  const keys = key.split('.');
  
  let current: any = resources;
  for (const k of keys) {
    current = current?.[k];
  }
  
  return current || key;
}

// Get all translations for a locale
export async function getTranslations(locale: Locale) {
  try {
    const resources = await loadLocaleData(locale);
    return resources;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return {};
  }
}

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}