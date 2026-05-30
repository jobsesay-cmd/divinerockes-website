import { LogAction, RoleType } from '@prisma/client';
import { hashPassword } from '@/lib/auth/password';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listUsers(page: number, pageSize: number, search?: string) {
  const where = {
    deletedAt: null as null,
    ...(search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { fullName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      ...buildPagination(page, pageSize),
      where,
      orderBy: { createdAt: 'desc' },
      include: { userRoles: { include: { role: true } } },
    }),
    prisma.user.count({ where }),
  ]);

  return { total, items };
}

export async function createUser(
  payload: { email: string; fullName: string; password: string; roleKeys: RoleType[] },
  actorId: string,
) {
  const existing = await prisma.user.findFirst({
    where: { email: payload.email, deletedAt: null },
    select: { id: true },
  });
  if (existing) {
    throw new Error('A user with this email already exists.');
  }

  const passwordHash = await hashPassword(payload.password);
  const roles = await prisma.role.findMany({ where: { key: { in: payload.roleKeys } } });

  if (roles.length !== payload.roleKeys.length) {
    throw new Error('One or more selected roles are invalid.');
  }

  const created = await prisma.user.create({
    data: {
      email: payload.email,
      fullName: payload.fullName,
      passwordHash,
      userRoles: {
        create: roles.map((role) => ({ roleId: role.id })),
      },
    },
    include: { userRoles: { include: { role: true } } },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.CREATE,
    entityType: 'User',
    entityId: created.id,
  });

  return created;
}

export async function updateUser(
  id: string,
  payload: {
    email?: string;
    fullName?: string;
    password?: string;
    roleKeys?: RoleType[];
    isActive?: boolean;
  },
  actorId: string,
) {
  const existingUser = await prisma.user.findFirst({
    where: { id, deletedAt: null },
    select: { id: true, email: true },
  });

  if (!existingUser) {
    throw new Error('User not found.');
  }

  if (payload.email && payload.email !== existingUser.email) {
    const duplicate = await prisma.user.findFirst({
      where: { email: payload.email, deletedAt: null },
      select: { id: true },
    });
    if (duplicate) {
      throw new Error('Another user already uses that email.');
    }
  }

  const roles = payload.roleKeys
    ? await prisma.role.findMany({ where: { key: { in: payload.roleKeys } } })
    : null;

  if (payload.roleKeys && roles && roles.length !== payload.roleKeys.length) {
    throw new Error('One or more selected roles are invalid.');
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      email: payload.email,
      fullName: payload.fullName,
      isActive: payload.isActive,
      ...(payload.password ? { passwordHash: await hashPassword(payload.password) } : {}),
      ...(roles
        ? {
            userRoles: {
              deleteMany: {},
              create: roles.map((role) => ({ roleId: role.id })),
            },
          }
        : {}),
    },
    include: { userRoles: { include: { role: true } } },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.UPDATE,
    entityType: 'User',
    entityId: id,
  });

  return updated;
}

export async function deleteUser(id: string, actorId: string) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true, deletedAt: true },
  });

  if (!existingUser) {
    throw new Error('User not found.');
  }

  if (existingUser.deletedAt) {
    throw new Error('User is already deleted.');
  }

  await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date(), isActive: false },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.DELETE,
    entityType: 'User',
    entityId: id,
  });
}

/** Roles */

export async function listRoles() {
  return prisma.role.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, key: true, name: true, description: true },
  });
}

export async function createRole(
  payload: { key: RoleType; name: string; description?: string },
  actorId: string,
) {
  const existing = await prisma.role.findUnique({ where: { key: payload.key } });
  if (existing) {
    throw new Error(`${payload.key} role already exists.`);
  }

  const role = await prisma.role.create({
    data: {
      key: payload.key,
      name: payload.name,
      description: payload.description,
    },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.CREATE,
    entityType: 'Role',
    entityId: role.id,
  });

  return role;
}

export async function updateRole(
  id: string,
  payload: { name?: string; description?: string },
  actorId: string,
) {
  const role = await prisma.role.findUnique({
    where: { id },
    select: { id: true, key: true },
  });

  if (!role) {
    throw new Error('Role not found.');
  }

  if (role.key === 'SUPER_ADMIN') {
    throw new Error('SUPER_ADMIN role cannot be edited.');
  }

  const updated = await prisma.role.update({
    where: { id },
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.UPDATE,
    entityType: 'Role',
    entityId: id,
  });

  return updated;
}

export async function deleteRole(id: string, actorId: string) {
  const role = await prisma.role.findUnique({
    where: { id },
    include: { userRoles: { select: { userId: true } } },
  });

  if (!role) {
    throw new Error('Role not found.');
  }

  if (role.key === 'SUPER_ADMIN') {
    throw new Error('SUPER_ADMIN role cannot be deleted.');
  }

  if (role.userRoles.length > 0) {
    throw new Error('Cannot delete a role currently assigned to users.');
  }

  await prisma.role.delete({ where: { id } });

  await logAudit({
    userId: actorId,
    action: LogAction.DELETE,
    entityType: 'Role',
    entityId: id,
  });
}