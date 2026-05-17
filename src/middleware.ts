import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityConfig } from '@/lib/security/config';
import { isUnsafeMethod } from '@/lib/security/request';

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // Keep CSP conservative for now to avoid breaking existing inline assets.
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );

  if (securityConfig.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  return response;
}

function csrfFailed(): NextResponse {
  return applySecurityHeaders(
    NextResponse.json(
      { success: false, error: { message: 'CSRF validation failed' } },
      { status: 403 }
    )
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isApiRoute = pathname.startsWith('/api');

  const sessionCookie = request.cookies.get(securityConfig.AUTH_COOKIE_NAME)?.value;

  if (isAdminRoute && !sessionCookie) {
    const loginUrl = new URL('/?auth=required', request.url);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  // Enforce double-submit CSRF for authenticated mutating API requests.
  if (isApiRoute && isUnsafeMethod(request.method) && sessionCookie) {
    const csrfHeader = request.headers.get('x-csrf-token');
    const csrfCookie = request.cookies.get(securityConfig.AUTH_CSRF_COOKIE_NAME)?.value;

    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return csrfFailed();
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};