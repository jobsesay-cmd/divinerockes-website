import { createHash, randomBytes } from 'crypto';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'dr_session';

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const csrfToken = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      userId,
      tokenHash: sha256(token),
      csrfTokenHash: sha256(csrfToken),
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
  cookieStore.set('dr_csrf', csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return token;
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      tokenHash: sha256(token),
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: {
      user: {
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: { permission: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session) return null;
  await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
  return session;
}

export async function revokeCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.updateMany({
      where: { tokenHash: sha256(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete('dr_csrf');
}

export async function assertCsrfToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const csrfHeader = headerStore.get('x-csrf-token');
  const csrfCookie = cookieStore.get('dr_csrf')?.value;
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (!csrfHeader || !csrfCookie || !sessionToken) return false;

  const session = await prisma.session.findUnique({ where: { tokenHash: sha256(sessionToken) } });
  return Boolean(session && session.csrfTokenHash === sha256(csrfHeader) && csrfCookie === csrfHeader);
}
