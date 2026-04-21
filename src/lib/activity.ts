import { prisma } from '@/lib/prisma';

export async function logActivity(activityType: string, message: string, userId?: string, metadata?: unknown) {
  await prisma.activityLog.create({
    data: {
      userId,
      activityType,
      message,
      metadata: (metadata as never) ?? undefined,
    },
  });
}
