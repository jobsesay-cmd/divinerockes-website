import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken } from '@/lib/auth/session';
import { requirePermission } from '@/lib/rbac';
import { newsSchema } from '@/domains/news/schema';
import { deleteNews, getNewsById, upsertNews } from '@/domains/news/service';

function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Internal server error';
}

function toIsoOrNull(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission('news:manage');
    if (auth.error) return auth.error;

    if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

    const { id } = await context.params;
    const existing = await getNewsById(id);
    if (!existing) return fail('News article not found', 404);

    const parsed = newsSchema.safeParse(await req.json());
    if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

    const normalized = {
      ...parsed.data,
      workflow: {
        ...parsed.data.workflow,
        status: parsed.data.workflow.status === 'SCHEDULED' ? 'PUBLISHED' : parsed.data.workflow.status,
        publishedAt: toIsoOrNull(parsed.data.workflow.publishedAt),
      },
    };

    return ok(await upsertNews(id, normalized, auth.session.user.id));
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission('news:manage');
    if (auth.error) return auth.error;

    if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

    const { id } = await context.params;
    const existing = await getNewsById(id);
    if (!existing) return fail('News article not found', 404);

    await deleteNews(id, auth.session.user.id);
    return ok({ deleted: true });
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}