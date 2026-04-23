import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth/session';

export async function requireAdminSession() {
  const session = await getSessionUser();
  if (!session) redirect('/');
  return session;
}
