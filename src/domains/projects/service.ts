import { LogAction } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

export async function listProjects(page: number, pageSize: number, featured?: boolean) {
  return prisma.project.findMany({
    ...buildPagination(page, pageSize),
    where: { deletedAt: null, ...(typeof featured === 'boolean' ? { featured } : {}) },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function upsertProject(id: string | null, payload: any, actorId: string) {
  const data = {
    title: payload.title,
    slug: payload.slug,
    summary: payload.summary,
    description: payload.description,
    location: payload.location,
    completedOn: payload.completedOn,
    featured: payload.featured,
    status: payload.workflow.status,
    publishedAt: payload.workflow.publishedAt,
    createdById: actorId,
  };

  const project = id
    ? await prisma.project.update({ where: { id }, data: { ...data, version: { increment: 1 } } })
    : await prisma.project.create({ data });

  await prisma.projectCategory.deleteMany({ where: { projectId: project.id } });
  if (payload.categoryIds.length) {
    await prisma.projectCategory.createMany({
      data: payload.categoryIds.map((categoryId: string) => ({ projectId: project.id, categoryId })),
      skipDuplicates: true,
    });
  }

  await logAudit({ userId: actorId, action: id ? LogAction.UPDATE : LogAction.CREATE, entityType: 'Project', entityId: project.id });
  return project;
}
