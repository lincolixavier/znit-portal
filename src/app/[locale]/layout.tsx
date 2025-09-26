import { I18nProvider } from '@/lib/i18n';
import { messages } from '@/messages';
import type { Locale } from '@/messages';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const localeMessages = messages[locale];

  return (
    <I18nProvider locale={locale} messages={localeMessages}>
      {children}
    </I18nProvider>
  );
}
