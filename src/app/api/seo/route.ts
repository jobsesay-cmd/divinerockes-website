import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { seoSchema } from '@/domains/shared/schemas';
import { requirePermission } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const auth = await requirePermission('pages:manage');
  if (auth.error) return auth.error;

  const parsed = seoSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const params = req.nextUrl.searchParams;
  const pageId = params.get('pageId');
  const serviceId = params.get('serviceId');
  const projectId = params.get('projectId');
  const newsArticleId = params.get('newsArticleId');

  if (![pageId, serviceId, projectId, newsArticleId].some(Boolean)) {
    return fail('A content target id is required', 400);
  }

  const seo = await prisma.seoMetadata.create({
    data: {
      ...parsed.data,
      pageId: pageId ?? undefined,
      serviceId: serviceId ?? undefined,
      projectId: projectId ?? undefined,
      newsArticleId: newsArticleId ?? undefined,
    },
  });

  return ok(seo, { status: 201 });
}
