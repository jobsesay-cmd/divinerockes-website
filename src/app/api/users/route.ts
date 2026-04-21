import { NextRequest } from 'next/server';
import { paginationSchema } from '@/lib/api/pagination';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { createUser, listUsers } from '@/domains/users/service';
import { userCreateSchema } from '@/domains/users/schema';

export async function GET(req: NextRequest) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const parsed = paginationSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const data = await listUsers(parsed.data.page, parsed.data.pageSize, parsed.data.search);
  return ok(data);
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const parsed = userCreateSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const user = await createUser(parsed.data, auth.session.user.id);
  return ok(user, { status: 201 });
}
