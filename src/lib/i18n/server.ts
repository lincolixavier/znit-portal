import { createTranslator } from './translator';
import { messages } from '@/messages';
import { DEFAULT_LOCALE, isValidLocale } from './config';
import type { Locale } from '@/messages';

// Server-side translator function
export function getTranslator(locale: Locale) {
  // Validate locale and fallback to default if invalid
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const localeMessages = messages[validLocale];
  
  if (!localeMessages) {
    console.warn(`Messages not found for locale: ${validLocale}, falling back to ${DEFAULT_LOCALE}`);
    return createTranslator(messages[DEFAULT_LOCALE] as unknown as Parameters<typeof createTranslator>[0]);
  }
  
  return createTranslator(localeMessages as unknown as Parameters<typeof createTranslator>[0]);
}

// Server-side function to get locale from params
export function getLocaleFromParams(params: { locale: string }): Locale {
  const locale = params.locale as Locale;
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}

// Server-side function to get all available locales
export function getAllLocales() {
  return Object.keys(messages) as Locale[];
}
