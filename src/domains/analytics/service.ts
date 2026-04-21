import { prisma } from '@/lib/prisma';

export async function createAnalyticsEvent(payload: any, userId?: string) {
  return prisma.analyticsEvent.create({
    data: {
      ...payload,
      userId,
    },
  });
}
