import { prisma } from '@/lib/prisma';

export async function upsertSetting(payload: any) {
  return prisma.settings.upsert({
    where: { key: payload.key },
    update: payload,
    create: payload,
  });
}
