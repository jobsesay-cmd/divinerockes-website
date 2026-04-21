import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { settingSchema } from '@/domains/settings/schema';
import { upsertSetting } from '@/domains/settings/service';

export async function POST(req: NextRequest) {
  const auth = await requirePermission('settings:manage');
  if (auth.error) return auth.error;

  const parsed = settingSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await upsertSetting(parsed.data));
}
