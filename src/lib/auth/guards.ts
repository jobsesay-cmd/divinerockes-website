import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth/session';

function hasPermission(
  session: NonNullable<Awaited<ReturnType<typeof getSessionUser>>>,
  permission: string
): boolean {
  return session.user.userRoles.some((userRole) =>
    userRole.role.rolePermissions.some((rp) => rp.permission.key === permission)
  );
}

export async function requireAdminSession() {
  const session = await getSessionUser();
  if (!session?.user) redirect('/login?auth=required&next=/admin');
  return session;
}

export async function requireAdminPermission(permission: string) {
  const session = await requireAdminSession();
  if (!hasPermission(session, permission)) {
    redirect('/admin?forbidden=1');
  }
  return session;
}