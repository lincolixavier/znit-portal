import { en } from './en';
import { pt } from './pt';
import { es } from './es';

export const messages = {
  en,
  pt,
  es,
} as const;

export type { Messages } from './en';
export type Locale = keyof typeof messages;
