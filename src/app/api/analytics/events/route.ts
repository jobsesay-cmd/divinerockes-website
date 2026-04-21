import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { analyticsEventSchema } from '@/domains/analytics/schema';
import { createAnalyticsEvent } from '@/domains/analytics/service';
import { getSessionUser } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  const parsed = analyticsEventSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  const session = await getSessionUser();
  return ok(await createAnalyticsEvent(parsed.data, session?.userId), { status: 201 });
}
