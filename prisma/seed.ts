import { PrismaClient, RoleType, ProjectCategoryType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

async function main() {
  const permissions = [
    ['dashboard:read', 'Read dashboard'],
    ['users:manage', 'Manage users'],
    ['roles:manage', 'Manage roles and permissions'],
    ['pages:manage', 'Manage pages'],
    ['services:manage', 'Manage services'],
    ['projects:manage', 'Manage projects'],
    ['news:manage', 'Manage news articles'],
    ['inquiries:manage', 'Manage contact inquiries'],
    ['quotes:manage', 'Manage quote requests'],
    ['settings:manage', 'Manage settings'],
    ['logs:read', 'Read audit and activity logs'],
  ] as const;

  for (const [key, name] of permissions) {
    await prisma.permission.upsert({
      where: { key },
      update: { name },
      create: { key, name },
    });
  }

  const roleMatrix: Record<RoleType, string[]> = {
    SUPER_ADMIN: permissions.map(([key]) => key),
    ADMIN: [
      'dashboard:read',
      'users:manage',
      'pages:manage',
      'services:manage',
      'projects:manage',
      'news:manage',
      'inquiries:manage',
      'quotes:manage',
      'settings:manage',
      'logs:read',
    ],
    EDITOR: ['dashboard:read', 'pages:manage', 'services:manage', 'projects:manage', 'news:manage'],
    AUTHOR: ['dashboard:read', 'news:manage', 'pages:manage'],
    REVIEWER: ['dashboard:read', 'news:manage', 'projects:manage'],
    SUPPORT: ['dashboard:read', 'inquiries:manage', 'quotes:manage'],
  };

  for (const roleType of Object.values(RoleType)) {
    const role = await prisma.role.upsert({
      where: { key: roleType },
      update: { name: roleType.replace('_', ' ') },
      create: {
        key: roleType,
        name: roleType.replace('_', ' '),
      },
    });

    for (const permissionKey of roleMatrix[roleType]) {
      const permission = await prisma.permission.findUniqueOrThrow({ where: { key: permissionKey } });
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@divinerockes.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMeImmediately!123';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      fullName: 'Divinerock Super Admin',
      isActive: true,
    },
    create: {
      email: adminEmail,
      fullName: 'Divinerock Super Admin',
      passwordHash: hashPassword(adminPassword),
    },
  });

  const superAdminRole = await prisma.role.findUniqueOrThrow({ where: { key: RoleType.SUPER_ADMIN } });
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: superAdminRole.id,
    },
  });

  for (const type of Object.values(ProjectCategoryType)) {
    const slug = type.toLowerCase();
    await prisma.category.upsert({
      where: { slug },
      update: { name: type.replace('_', ' ') },
      create: {
        slug,
        name: type.replace('_', ' '),
        type,
      },
    });
  }

  await prisma.settings.upsert({
    where: { key: 'site' },
    update: {},
    create: {
      key: 'site',
      value: {
        siteName: 'Divinerock Engineering Services',
        supportEmail: 'info@divinerockes.com',
      },
      isPublic: true,
      description: 'Public-facing site settings',
    },
  });

  console.log('Database seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
