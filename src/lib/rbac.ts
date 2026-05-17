import { fail } from '@/lib/api/response';
import { getSessionUser } from '@/lib/auth/session';

function userHasPermission(
  session: NonNullable<Awaited<ReturnType<typeof getSessionUser>>>,
  permission: string
): boolean {
  return session.user.userRoles.some((userRole) =>
    userRole.role.rolePermissions.some((rp) => rp.permission.key === permission)
  );
}

export async function requirePermission(permission: string) {
  const session = await getSessionUser();
  if (!session?.user) {
    return { error: fail('Unauthorized', 401) };
  }

  if (!userHasPermission(session, permission)) {
    return { error: fail('Forbidden', 403) };
  }

  return { session };
}

export async function requireAnyPermission(permissions: string[]) {
  const session = await getSessionUser();
  if (!session?.user) {
    return { error: fail('Unauthorized', 401) };
  }

  const allowed = permissions.some((permission) => userHasPermission(session, permission));
  if (!allowed) {
    return { error: fail('Forbidden', 403) };
  }

  return { session };
}

export async function requireAllPermissions(permissions: string[]) {
  const session = await getSessionUser();
  if (!session?.user) {
    return { error: fail('Unauthorized', 401) };
  }

  const allowed = permissions.every((permission) => userHasPermission(session, permission));
  if (!allowed) {
    return { error: fail('Forbidden', 403) };
  }

  return { session };
}