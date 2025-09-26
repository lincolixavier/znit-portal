import type { Messages } from '@/messages';

// Simple interpolation parameters type
type InterpolationParams = Record<string, string | number>;

// Type for nested translator with dot notation access
type NestedTranslator<T> = {
  [K in keyof T]: T[K] extends string 
    ? (params?: InterpolationParams) => string
    : NestedTranslator<T[K]>
} & {
  t: (key: string, params?: InterpolationParams) => string;
  ns: (namespace: string) => (key: string, params?: InterpolationParams) => string;
  plural: (key: string, count: number, params?: InterpolationParams) => string;
};

// Create translator function
export function createTranslator(messages: Messages) {
  // Helper to get nested value using dot notation
  function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj as unknown) as string | undefined;
  }

  // Interpolation function
  function interpolate(template: string, params: InterpolationParams = {}): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key]?.toString() ?? match;
    });
  }

  // Main translation function (string-based)
  function t(key: string, params?: InterpolationParams): string {
    const value = getNestedValue(messages, key);
    
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }

    return params ? interpolate(value, params) : value;
  }

  // Create nested translator with property access
  function createNestedTranslator(obj: Record<string, unknown>, path: string = ''): NestedTranslator<Messages> {
    return new Proxy({} as NestedTranslator<Messages>, {
      get(target, prop: string) {
        // Handle special functions
        if (prop === 't') return t;
        if (prop === 'ns') return ns;
        if (prop === 'plural') return plural;
        
        const fullPath = path ? `${path}.${prop}` : prop;
        const value = getNestedValue(messages, fullPath);
        
        if (typeof value === 'string') {
          // Return a function that can be called with params
          return (params?: InterpolationParams) => {
            return params ? interpolate(value, params) : value;
          };
        } else if (value && typeof value === 'object') {
          // Return nested translator for objects
          return createNestedTranslator(value as Record<string, unknown>, fullPath);
        } else {
          // Key not found, return function that warns and returns the key
          return () => {
            console.warn(`Translation key "${fullPath}" not found`);
            return fullPath;
          };
        }
      }
    });
  }

  // Namespace function
  function ns(namespace: string) {
    return function(key: string, params?: InterpolationParams): string {
      return t(`${namespace}.${key}`, params);
    };
  }

  // Pluralization helper
  function plural(key: string, count: number, params?: InterpolationParams): string {
    const pluralKey = count === 1 ? key.replace(/_other$/, '_one') : key.replace(/_one$/, '_other');
    return t(pluralKey, { ...params, count });
  }

  // Create the main translator with both string and property access
  return createNestedTranslator(messages);
}

export type Translator = ReturnType<typeof createTranslator>;
