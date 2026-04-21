import { LogAction } from '@prisma/client';
import { createSession, revokeCurrentSession } from '@/lib/auth/session';
import { verifyPassword } from '@/lib/auth/password';
import { logActivity } from '@/lib/activity';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { userRoles: true } });
  if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }

  await createSession(user.id);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await logAudit({ userId: user.id, action: LogAction.LOGIN, entityType: 'User', entityId: user.id });
  await logActivity('auth.login', `${user.email} signed in`, user.id);

  return user;
}

export async function logout(userId?: string) {
  await revokeCurrentSession();
  if (userId) {
    await logAudit({ userId, action: LogAction.LOGOUT, entityType: 'Session', entityId: userId });
    await logActivity('auth.logout', 'User signed out', userId);
  }
}
