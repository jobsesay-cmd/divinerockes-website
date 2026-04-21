import { fail, ok } from '@/lib/api/response';
import { logout } from '@/domains/auth/service';
import { getSessionUser } from '@/lib/auth/session';

export async function POST() {
  const session = await getSessionUser();
  if (!session) return fail('Unauthorized', 401);
  await logout(session.user.id);
  return ok({ loggedOut: true });
}
