import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { isRateLimited } from '@/lib/security/rate-limit';
import { loginSchema } from '@/domains/auth/schema';
import { login } from '@/domains/auth/service';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(`login:${ip}`, 60_000, 10)) {
    return fail('Too many login attempts', 429);
  }

  const parsed = loginSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const user = await login(parsed.data.email, parsed.data.password);
  if (!user) return fail('Invalid credentials', 401);

  return ok({ id: user.id, email: user.email, fullName: user.fullName });
}
