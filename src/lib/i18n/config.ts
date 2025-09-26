import type { Locale } from '@/messages';

// Supported locales
export const LOCALES: Locale[] = ['en', 'pt', 'es'];

// Default locale
export const DEFAULT_LOCALE: Locale = 'pt';

// Check if a locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Get locale from Accept-Language header
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      return {
        locale: locale.split('-')[0], // Extract language code (en from en-US)
        quality: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first supported locale
  for (const { locale } of languages) {
    if (isValidLocale(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}
