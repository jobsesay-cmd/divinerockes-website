import { ContentStatus, LogAction, type Prisma } from '@prisma/client';
import { buildPagination } from '@/lib/api/pagination';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/prisma';

type ProjectMediaInput = {
  coverImageUrl?: string | null;
  galleryImageUrls?: string[] | null;
};

function galleryFromStructuredData(value: Prisma.JsonValue | null | undefined): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];

  const gallery = (value as { galleryImageUrls?: unknown }).galleryImageUrls;
  return Array.isArray(gallery) ? gallery.filter((url): url is string => typeof url === 'string' && url.length > 0) : [];
}

function structuredDataWithGallery(existing: Prisma.JsonValue | null | undefined, galleryImageUrls: string[]): Prisma.InputJsonValue {
  const base = existing && typeof existing === 'object' && !Array.isArray(existing) ? existing : {};
  return { ...base, galleryImageUrls } as Prisma.InputJsonValue;
}

async function saveProjectMedia(projectId: string, media: ProjectMediaInput) {
  const currentSeo = await prisma.seoMetadata.findUnique({ where: { projectId } });
  const existingGallery = galleryFromStructuredData(currentSeo?.structuredData);
  const galleryImageUrls = media.galleryImageUrls ?? existingGallery;

  if (!media.coverImageUrl && galleryImageUrls.length === 0 && !currentSeo) return;

  await prisma.seoMetadata.upsert({
    where: { projectId },
    create: {
      projectId,
      ogImageUrl: media.coverImageUrl ?? galleryImageUrls[0],
      keywords: [],
      structuredData: structuredDataWithGallery(undefined, galleryImageUrls),
    },
    update: {
      ...(media.coverImageUrl ? { ogImageUrl: media.coverImageUrl } : {}),
      structuredData: structuredDataWithGallery(currentSeo?.structuredData, galleryImageUrls),
    },
  });
}

export function getProjectGalleryImages(project: { seo?: { structuredData?: Prisma.JsonValue | null } | null }) {
  return galleryFromStructuredData(project.seo?.structuredData);
}

export async function listProjects(page: number, pageSize: number, featured?: boolean) {
  return prisma.project.findMany({
    ...buildPagination(page, pageSize),
    where: { deletedAt: null, ...(typeof featured === 'boolean' ? { featured } : {}) },
    include: { projectCategories: true, seo: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function listProjectCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, type: true },
  });
}

export async function listProjectsPublic(page: number, pageSize: number, categorySlug?: string) {
  const where: Prisma.ProjectWhereInput = {
    deletedAt: null,
    status: 'PUBLISHED',
    ...(categorySlug
      ? {
          projectCategories: {
            some: {
              category: {
                slug: categorySlug,
              },
            },
          },
        }
      : {}),
  };

  const [total, items] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      ...buildPagination(page, pageSize),
      where,
      include: {
        seo: true,
        projectCategories: {
          include: {
            category: {
              select: { id: true, name: true, slug: true, type: true },
            },
          },
        },
      },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { updatedAt: 'desc' }],
    }),
  ]);

  return { total, items, page, pageSize };
}

export async function getProjectPublicBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, deletedAt: null, status: 'PUBLISHED' },
    include: {
      seo: true,
      projectCategories: {
        include: {
          category: { select: { id: true, name: true, slug: true, type: true } },
        },
      },
    },
  });
}

export async function upsertProject(id: string | null, payload: any, actorId: string) {
  const data: Prisma.ProjectUncheckedCreateInput = {
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

  await saveProjectMedia(project.id, {
    coverImageUrl: payload.coverImageUrl,
    galleryImageUrls: payload.galleryImageUrls,
  });

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

export async function updateProject(id: string, payload: any, actorId: string) {
  const status = typeof payload.status === 'string' ? payload.status : payload.workflow?.status;
  const nextStatus = Object.values(ContentStatus).includes(status) ? status : undefined;
  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...(typeof payload.title === 'string' ? { title: payload.title } : {}),
      ...(typeof payload.slug === 'string' ? { slug: payload.slug } : {}),
      ...(typeof payload.summary === 'string' ? { summary: payload.summary } : {}),
      ...(typeof payload.description === 'string' ? { description: payload.description } : {}),
      ...(typeof payload.completedOn === 'string' ? { completedOn: new Date(payload.completedOn) } : {}),
      ...(typeof payload.featured === 'boolean' ? { featured: payload.featured } : {}),
      ...(nextStatus ? { status: nextStatus } : {}),
      ...(payload.workflow?.publishedAt ? { publishedAt: payload.workflow.publishedAt } : {}),
      version: { increment: 1 },
    },
  });

  await saveProjectMedia(id, {
    coverImageUrl: payload.coverImageUrl,
    galleryImageUrls: payload.galleryImageUrls,
  });

  if (Array.isArray(payload.categoryIds)) {
    await prisma.projectCategory.deleteMany({ where: { projectId: id } });
    if (payload.categoryIds.length) {
      await prisma.projectCategory.createMany({
        data: payload.categoryIds.map((categoryId: string) => ({ projectId: id, categoryId })),
        skipDuplicates: true,
      });
    }
  }

  await logAudit({ userId: actorId, action: LogAction.UPDATE, entityType: 'Project', entityId: id });
  return updated;
}

export async function deleteProject(id: string, actorId: string) {
  const deleted = await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date(), version: { increment: 1 } },
  });

  await logAudit({ userId: actorId, action: LogAction.DELETE, entityType: 'Project', entityId: id });
  return deleted;
}