import { LogAction } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

type NewsPayload = {
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  coverImageUrl?: string;
  category: 'PROJECT_UPDATE' | 'ANNOUNCEMENT' | 'INSIGHT' | 'EVENT';
  isFeatured: boolean;
  workflow: {
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    publishedAt: string | null;
  };
  seo?: unknown;
};

export async function listNews(page: number, pageSize: number) {
  const [items, total] = await Promise.all([
    prisma.newsArticle.findMany({
      ...buildPagination(page, pageSize),
      where: { deletedAt: null },
      orderBy: [{ updatedAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        status: true,
        publishedAt: true,
        updatedAt: true,
        createdAt: true,
        body: true,
      },
    }),
    prisma.newsArticle.count({ where: { deletedAt: null } }),
  ]);

  return { total, items };
}

export async function getNewsById(id: string) {
  return prisma.newsArticle.findFirst({
    where: { id, deletedAt: null },
    select: { id: true },
  });
}

export async function upsertNews(id: string | null, payload: NewsPayload, actorId: string) {
  const wrappedBody = {
    html: payload.body,
    meta: {
      category: payload.category,
      isFeatured: payload.isFeatured,
    },
  };

  const data = {
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    body: wrappedBody,
    coverImageUrl: payload.coverImageUrl,
    status: payload.workflow.status,
    publishedAt: payload.workflow.publishedAt,
    authorId: actorId,
  };

  const item = id
    ? await prisma.newsArticle.update({
        where: { id },
        data: { ...data, version: { increment: 1 } },
      })
    : await prisma.newsArticle.create({ data });

  await logAudit({
    userId: actorId,
    action: id ? LogAction.UPDATE : LogAction.CREATE,
    entityType: 'NewsArticle',
    entityId: item.id,
  });

  return item;
}

export async function deleteNews(id: string, actorId: string) {
  await prisma.newsArticle.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: 'ARCHIVED',
      version: { increment: 1 },
    },
  });

  await logAudit({
    userId: actorId,
    action: LogAction.DELETE,
    entityType: 'NewsArticle',
    entityId: id,
  });
}