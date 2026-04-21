import { LogAction } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listNews(page: number, pageSize: number) {
  return prisma.newsArticle.findMany({ ...buildPagination(page, pageSize), where: { deletedAt: null }, orderBy: { updatedAt: 'desc' } });
}

export async function upsertNews(id: string | null, payload: any, actorId: string) {
  const data = {
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    body: payload.body,
    coverImageUrl: payload.coverImageUrl,
    status: payload.workflow.status,
    publishedAt: payload.workflow.publishedAt,
    authorId: actorId,
  };

  const item = id
    ? await prisma.newsArticle.update({ where: { id }, data: { ...data, version: { increment: 1 } } })
    : await prisma.newsArticle.create({ data });

  await logAudit({ userId: actorId, action: id ? LogAction.UPDATE : LogAction.CREATE, entityType: 'NewsArticle', entityId: item.id });
  return item;
}
