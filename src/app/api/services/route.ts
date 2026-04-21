import { NextRequest } from 'next/server';
import { paginationSchema } from '@/lib/api/pagination';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken } from '@/lib/auth/session';
import { requirePermission } from '@/lib/rbac';
import { serviceSchema } from '@/domains/services/schema';
import { listServices, upsertService } from '@/domains/services/service';

export async function GET(req: NextRequest) {
  const parsed = paginationSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  return ok(await listServices(parsed.data.page, parsed.data.pageSize));
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission('services:manage');
  if (auth.error) return auth.error;
  if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

  const parsed = serviceSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await upsertService(null, parsed.data, auth.session.user.id), { status: 201 });
}
