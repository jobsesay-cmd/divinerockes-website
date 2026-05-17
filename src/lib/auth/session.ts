import { createHash, createHmac, randomBytes } from 'crypto';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { securityConfig } from '@/lib/security/config';

function digest(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function signedDigest(value: string): string {
  return createHmac('sha256', securityConfig.AUTH_SESSION_SECRET).update(value).digest('hex');
}

function getExpiryDate(): Date {
  return new Date(Date.now() + securityConfig.AUTH_SESSION_TTL_MINUTES * 60_000);
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(48).toString('hex');
  const csrfToken = randomBytes(32).toString('hex');
  const expiresAt = getExpiryDate();

  await prisma.session.create({
    data: {
      userId,
      tokenHash: signedDigest(token),
      csrfTokenHash: digest(csrfToken),
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(securityConfig.AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: securityConfig.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  cookieStore.set(securityConfig.AUTH_CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: false,
    secure: securityConfig.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return token;
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(securityConfig.AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      tokenHash: signedDigest(token),
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

  const idleLimit = new Date(Date.now() - securityConfig.AUTH_IDLE_TIMEOUT_MINUTES * 60_000);
  if (session.lastSeenAt < idleLimit) {
    await prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
    return null;
  }

  await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
  return session;
}

export async function revokeCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(securityConfig.AUTH_COOKIE_NAME)?.value;

  if (token) {
    await prisma.session.updateMany({
      where: { tokenHash: signedDigest(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  cookieStore.delete(securityConfig.AUTH_COOKIE_NAME);
  cookieStore.delete(securityConfig.AUTH_CSRF_COOKIE_NAME);
}

export async function assertCsrfToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const csrfHeader = headerStore.get('x-csrf-token');
  const csrfCookie = cookieStore.get(securityConfig.AUTH_CSRF_COOKIE_NAME)?.value;
  const sessionToken = cookieStore.get(securityConfig.AUTH_COOKIE_NAME)?.value;

  if (!csrfHeader || !csrfCookie || !sessionToken || csrfHeader !== csrfCookie) return false;

  const session = await prisma.session.findUnique({ where: { tokenHash: signedDigest(sessionToken) } });
  return Boolean(session && session.csrfTokenHash === digest(csrfHeader));
}