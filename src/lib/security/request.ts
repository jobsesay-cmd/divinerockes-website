import { NextRequest } from 'next/server';

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function isUnsafeMethod(method: string): boolean {
  return UNSAFE_METHODS.has(method.toUpperCase());
}

/**
 * Prevent open redirects by allowing only same-origin relative paths.
 */
export function getSafeRedirectPath(candidate: string | null | undefined, fallback = '/admin'): string {
  if (!candidate) return fallback;

  // Allow only app-internal absolute paths.
  if (!candidate.startsWith('/')) return fallback;

  // Block protocol-relative and malformed paths.
  if (candidate.startsWith('//') || candidate.startsWith('/\\')) return fallback;

  return candidate;
}

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (!xff) return 'unknown';
  return xff.split(',')[0]?.trim() || 'unknown';
}