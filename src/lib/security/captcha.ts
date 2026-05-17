import { securityConfig } from '@/lib/security/config';

type CaptchaVerificationResult = {
  success: boolean;
};

export async function verifyCaptchaToken(token: string, remoteIp?: string): Promise<boolean> {
  if (!securityConfig.AUTH_CAPTCHA_ENABLED) return true;
  if (!token) return false;

  // This endpoint format is compatible with common CAPTCHA providers like Turnstile.
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: securityConfig.AUTH_CAPTCHA_SECRET ?? '',
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    }),
    cache: 'no-store',
  });

  if (!response.ok) return false;

  const data = (await response.json()) as CaptchaVerificationResult;
  return Boolean(data.success);
}