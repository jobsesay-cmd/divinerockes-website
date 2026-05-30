import { ok } from '@/lib/api/response';
import { getSessionUser } from '@/lib/auth/session';

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return ok({ user: null, authenticated: false });
  }

  return ok({
    authenticated: true,
    user: {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      isActive: session.user.isActive,
    },
  });
}