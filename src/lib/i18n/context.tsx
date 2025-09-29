'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { createTranslator, type Translator } from './translator';
import type { Messages, Locale } from '@/messages';

interface I18nContextValue {
  locale: Locale;
  translator: Translator;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps<T = unknown> {
  locale: Locale;
  messages: T;
  children: ReactNode;
}

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  const translator = createTranslator(messages as Messages);

  return (
    <I18nContext.Provider value={{ locale, translator }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}
