import { z } from 'zod';

const envBoolean = z
  .union([z.string(), z.boolean(), z.undefined()])
  .transform((value) => {
    if (typeof value === 'boolean') return value;
    if (value === undefined) return false;

    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on';
  });

const securityEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  AUTH_SESSION_SECRET: z.string().min(32, 'AUTH_SESSION_SECRET must be at least 32 characters'),
  AUTH_SESSION_TTL_MINUTES: z.coerce.number().int().min(15).max(60 * 24 * 14).default(60 * 8),
  AUTH_IDLE_TIMEOUT_MINUTES: z.coerce.number().int().min(5).max(60 * 24 * 7).default(30),
  AUTH_COOKIE_NAME: z.string().min(3).default('dr_session'),
  AUTH_CSRF_COOKIE_NAME: z.string().min(3).default('dr_csrf'),
  AUTH_REQUIRE_2FA: envBoolean.default(false),

  AUTH_LOGIN_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(10_000).max(15 * 60_000).default(60_000),
  AUTH_LOGIN_RATE_LIMIT_MAX_ATTEMPTS: z.coerce.number().int().min(3).max(100).default(10),
  AUTH_LOGIN_LOCKOUT_THRESHOLD: z.coerce.number().int().min(3).max(20).default(5),
  AUTH_LOGIN_LOCKOUT_MS: z.coerce.number().int().min(60_000).max(24 * 60 * 60_000).default(15 * 60_000),

  AUTH_CAPTCHA_ENABLED: envBoolean.default(false),
  AUTH_CAPTCHA_SECRET: z.string().optional(),

  SECURITY_ALLOWED_OUTBOUND_HOSTS: z.string().default('api.cloudinary.com,res.cloudinary.com'),
  SECURITY_ALLOWED_MEDIA_HOSTS: z.string().default('res.cloudinary.com'),
});

const parsed = securityEnvSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid security environment configuration: ${details}`);
}

if (parsed.data.AUTH_CAPTCHA_ENABLED && !parsed.data.AUTH_CAPTCHA_SECRET) {
  throw new Error('AUTH_CAPTCHA_SECRET is required when AUTH_CAPTCHA_ENABLED=true');
}

function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

export const securityConfig = {
  ...parsed.data,
  allowedOutboundHosts: splitCsv(parsed.data.SECURITY_ALLOWED_OUTBOUND_HOSTS),
  allowedMediaHosts: splitCsv(parsed.data.SECURITY_ALLOWED_MEDIA_HOSTS),
};