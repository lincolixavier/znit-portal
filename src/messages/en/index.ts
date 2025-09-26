import { common } from './common';
import { home } from './home';
import { auth } from './auth';
import { dashboard } from './dashboard';
import { enrollment } from './enrollment';

export const en = {
  common,
  home,
  auth,
  dashboard,
  enrollment,
} as const;

// Export the type for other languages to extend
export type Messages = typeof en;
