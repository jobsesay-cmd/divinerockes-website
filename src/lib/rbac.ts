import { fail } from '@/lib/api/response';
import { getSessionUser } from '@/lib/auth/session';

export async function requirePermission(permission: string) {
  const session = await getSessionUser();
  if (!session?.user) {
    return { error: fail('Unauthorized', 401) };
  }

  const allowed = session.user.userRoles.some((userRole) =>
    userRole.role.rolePermissions.some((rp) => rp.permission.key === permission)
  );

  if (!allowed) {
    return { error: fail('Forbidden', 403) };
  }

  return { session };
}
