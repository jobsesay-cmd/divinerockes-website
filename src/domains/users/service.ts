import { LogAction } from '@prisma/client';
import { hashPassword } from '@/lib/auth/password';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listUsers(page: number, pageSize: number, search?: string) {
  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' as const } },
          { fullName: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};
  return prisma.user.findMany({ ...buildPagination(page, pageSize), where, orderBy: { createdAt: 'desc' } });
}

export async function createUser(payload: { email: string; fullName: string; password: string; roleKeys: string[] }, actorId: string) {
  const passwordHash = await hashPassword(payload.password);
  const roles = await prisma.role.findMany({ where: { key: { in: payload.roleKeys as never[] } } });

  const created = await prisma.user.create({
    data: {
      email: payload.email,
      fullName: payload.fullName,
      passwordHash,
      userRoles: {
        create: roles.map((role) => ({ roleId: role.id })),
      },
    },
  });

  await logAudit({ userId: actorId, action: LogAction.CREATE, entityType: 'User', entityId: created.id });
  return created;
}
