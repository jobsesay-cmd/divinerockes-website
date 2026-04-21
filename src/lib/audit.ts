import { LogAction } from '@prisma/client';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function logAudit(params: {
  userId: string;
  action: LogAction;
  entityType: string;
  entityId: string;
  metadata?: unknown;
}) {
  const h = await headers();
  await prisma.auditLog.create({
    data: {
      ...params,
      metadata: (params.metadata as never) ?? undefined,
      ipAddress: h.get('x-forwarded-for') ?? undefined,
      userAgent: h.get('user-agent') ?? undefined,
    },
  });
}
