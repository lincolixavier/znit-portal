// Client-side exports
export { I18nProvider, useI18n } from './context';
export { createTranslator, type Translator } from './translator';
export { getPluralForm, createPluralTranslator } from './plural';

// Server-side exports
export { getTranslator, getLocaleFromParams, getAllLocales } from './server';

// Config exports
export { LOCALES, DEFAULT_LOCALE, isValidLocale, detectLocale } from './config';
export type { Locale } from '@/messages';
