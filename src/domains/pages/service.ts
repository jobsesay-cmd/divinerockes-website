import { LogAction, Prisma } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listPages(page: number, pageSize: number, status?: string) {
  const where: Prisma.PageWhereInput = {
    deletedAt: null,
    ...(status ? { status: status as never } : {}),
  };
  return prisma.page.findMany({ ...buildPagination(page, pageSize), where, orderBy: { updatedAt: 'desc' } });
}

export async function upsertPage(id: string | null, payload: any, actorId: string) {
  const data = {
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    content: payload.content,
    status: payload.workflow.status,
    publishedAt: payload.workflow.publishedAt,
    createdById: actorId,
  };

  const page = id
    ? await prisma.page.update({ where: { id }, data: { ...data, version: { increment: 1 } } })
    : await prisma.page.create({ data });

  await logAudit({ userId: actorId, action: id ? LogAction.UPDATE : LogAction.CREATE, entityType: 'Page', entityId: page.id });
  return page;
}
