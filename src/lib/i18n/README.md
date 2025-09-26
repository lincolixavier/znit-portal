Aqui está a versão enxuta.

# Sistema tipado, sem dependências.

## Uso rápido

### Server Component

```tsx
import { getTranslator, getLocaleFromParams } from '@/lib/i18n';

export default function Page({ params }: { params: { locale: string } }) {
  const t = getTranslator(getLocaleFromParams(params));
  return <h1>{t.home.title()}</h1>;
}
```

### Client Component

```tsx
'use client';
import { useI18n } from '@/lib/i18n';

export default function Component() {
  const { translator: t } = useI18n();
  return <h1>{t.home.title()}</h1>;
}
```

## Estrutura

```
src/
  messages/
    en|pt|es/
      common.ts  home.ts  auth.ts  index.ts
  lib/i18n/
    config.ts   translator.ts
    context.tsx server.ts  index.ts
```

## Tradução

Tipado e com helpers.

```tsx
t.common.save();                // "Salvar" | "Salvar"
t.home.title();                 // "Bem vindo.."
t.auth.login.title();           // "Login"
t.common.hello({ name: 'A' });  // Interpolação
t.common.items_one({ count: 1 });
t.common.items_other({ count: 5 });

// Sintaxe antiga, opcional
t.ns('common')('save');
t.t('common.save');
```

## Adicionando chaves

```ts
// en
export const common = { newKey: 'New Value' } as const;

// pt
export const common: Messages['common'] = { newKey: 'Novo Valor' } as const;
```

Uso:

```tsx
t.common.newKey();
```

## Configuração

```ts
// src/lib/i18n/config.ts
export const LOCALES = ['en','pt','es'] as const;
export const DEFAULT_LOCALE = 'en';
```

Middleware redireciona `/` → `/<DEFAULT_LOCALE>/`.

## Comportamento de fallback

Chave ausente: log de warning e retorno da própria chave.
