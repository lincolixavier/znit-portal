import type { Translator } from './translator';

// Pluralization rules for different locales
const pluralRules: Record<string, (n: number) => string> = {
  en: (n) => n === 1 ? 'one' : 'other',
  pt: (n) => n === 1 ? 'one' : 'other',
  es: (n) => n === 1 ? 'one' : 'other',
};

// Helper function to get plural form
export function getPluralForm(locale: string, count: number): string {
  const rule = pluralRules[locale] || pluralRules.en;
  return rule(count);
}

// Enhanced pluralization function
export function createPluralTranslator(translator: Translator, locale: string) {
  return function<K extends string>(
    baseKey: K,
    count: number,
    params?: Record<string, string | number>
  ): string {
    const pluralForm = getPluralForm(locale, count);
    const pluralKey = `${baseKey}_${pluralForm}` as any;
    
    try {
      return translator.t(pluralKey, { ...params, count });
    } catch {
      // Fallback to other form if one form doesn't exist
      const fallbackKey = `${baseKey}_other` as any;
      return translator.t(fallbackKey, { ...params, count });
    }
  };
}
