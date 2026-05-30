import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { deleteRole, updateRole } from '@/domains/users/service';
import { roleUpdateSchema } from '@/domains/users/schema';

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const parsed = roleUpdateSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  try {
    const role = await updateRole(id, parsed.data, auth.session.user.id);
    return ok(role);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to update role', 400);
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const { id } = await context.params;

  try {
    await deleteRole(id, auth.session.user.id);
    return ok({ deleted: true });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to delete role', 400);
  }
}