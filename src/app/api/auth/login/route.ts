import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { isRateLimited } from '@/lib/security/rate-limit';
import { loginSchema } from '@/domains/auth/schema';
import { login } from '@/domains/auth/service';
import { securityConfig } from '@/lib/security/config';
import {
  clearLoginFailures,
  getClientIp,
  getLockoutRemainingMs,
  registerLoginFailure,
} from '@/lib/security/login-guard';
import { verifyCaptchaToken } from '@/lib/security/captcha';

const AUTH_FAILED_MESSAGE = 'Invalid credentials';

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = getClientIp(forwardedFor);

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return fail('Invalid request body', 400);
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return fail('Validation failed', 422, parsed.error.flatten());
  }

  const principal = `${ip}:${parsed.data.email}`;
  const ipRateLimitKey = `login:ip:${ip}`;
  const principalRateLimitKey = `login:principal:${principal}`;

  if (
    isRateLimited(
      ipRateLimitKey,
      securityConfig.AUTH_LOGIN_RATE_LIMIT_WINDOW_MS,
      securityConfig.AUTH_LOGIN_RATE_LIMIT_MAX_ATTEMPTS
    ) ||
    isRateLimited(
      principalRateLimitKey,
      securityConfig.AUTH_LOGIN_RATE_LIMIT_WINDOW_MS,
      securityConfig.AUTH_LOGIN_RATE_LIMIT_MAX_ATTEMPTS
    )
  ) {
    return fail('Too many login attempts', 429);
  }

  const lockRemaining = getLockoutRemainingMs(principal);
  if (lockRemaining > 0) {
    return fail('Account temporarily locked due to repeated failed logins', 423, {
      retryAfterSeconds: Math.ceil(lockRemaining / 1000),
    });
  }

  if (securityConfig.AUTH_CAPTCHA_ENABLED) {
    const captchaOk = await verifyCaptchaToken(parsed.data.captchaToken ?? '', ip);
    if (!captchaOk) return fail('CAPTCHA verification failed', 400);
  }

  const user = await login(parsed.data.email, parsed.data.password);
  if (!user) {
    registerLoginFailure(
      principal,
      securityConfig.AUTH_LOGIN_LOCKOUT_THRESHOLD,
      securityConfig.AUTH_LOGIN_LOCKOUT_MS
    );
    return fail(AUTH_FAILED_MESSAGE, 401);
  }

  clearLoginFailures(principal);

  return ok({ id: user.id, email: user.email, fullName: user.fullName });
}