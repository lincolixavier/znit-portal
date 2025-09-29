import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale, isValidLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = pathname.split('/').some(segment => 
    isValidLocale(segment)
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const locale = detectLocale(acceptLanguage);
  
  // Redirect to the localized path
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, images, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)',
  ],
};
