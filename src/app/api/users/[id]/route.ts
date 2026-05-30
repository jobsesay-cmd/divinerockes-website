import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { deleteUser, updateUser } from '@/domains/users/service';
import { userUpdateSchema } from '@/domains/users/schema';

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const parsed = userUpdateSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  try {
    const user = await updateUser(id, parsed.data, auth.session.user.id);
    return ok(user);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to update user', 400);
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission('users:manage');
  if (auth.error) return auth.error;

  const { id } = await context.params;

  // Prevent deleting currently authenticated user at API level too.
  if (id === auth.session.user.id) {
    return fail('You cannot delete your own account.', 403);
  }

  try {
    await deleteUser(id, auth.session.user.id);
    return ok({ deleted: true });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to delete user', 400);
  }
}