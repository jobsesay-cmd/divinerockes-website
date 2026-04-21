import { LogAction } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listServices(page: number, pageSize: number) {
  return prisma.service.findMany({ ...buildPagination(page, pageSize), where: { deletedAt: null }, orderBy: { updatedAt: 'desc' } });
}

export async function upsertService(id: string | null, payload: any, actorId: string) {
  const data = {
    name: payload.name,
    slug: payload.slug,
    summary: payload.summary,
    content: payload.content,
    status: payload.workflow.status,
    publishedAt: payload.workflow.publishedAt,
    createdById: actorId,
  };

  const service = id
    ? await prisma.service.update({ where: { id }, data: { ...data, version: { increment: 1 } } })
    : await prisma.service.create({ data });

  await logAudit({ userId: actorId, action: id ? LogAction.UPDATE : LogAction.CREATE, entityType: 'Service', entityId: service.id });
  return service;
}
