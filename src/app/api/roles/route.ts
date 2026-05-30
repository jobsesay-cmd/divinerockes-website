import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { createRole, listRoles } from '@/domains/users/service';
import { roleCreateSchema } from '@/domains/users/schema';

export async function GET() {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const items = await listRoles();
  return ok({ items });
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const parsed = roleCreateSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  try {
    const role = await createRole(parsed.data, auth.session.user.id);
    return ok(role, { status: 201 });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to create role', 400);
  }
}