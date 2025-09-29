import { common } from './common';
import { home } from './home';
import { auth } from './auth';
import { dashboard } from './dashboard';
import { enrollment } from './enrollment';

export const pt = {
  common,
  home,
  auth,
  dashboard,
  enrollment,
} as const;

export type Messages = typeof pt;