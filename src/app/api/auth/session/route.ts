import { fail, ok } from '@/lib/api/response';
import { getSessionUser } from '@/lib/auth/session';

export async function GET() {
  const session = await getSessionUser();
  if (!session) return fail('Unauthorized', 401);

  return ok({
    user: {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      roles: session.user.userRoles.map((item) => item.roleId),
    },
    expiresAt: session.expiresAt,
  });
}
