import { NextRequest } from 'next/server';
import { paginationSchema } from '@/lib/api/pagination';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken } from '@/lib/auth/session';
import { requirePermission } from '@/lib/rbac';
import { newsSchema } from '@/domains/news/schema';
import { listNews, upsertNews } from '@/domains/news/service';

function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Internal server error';
}

function toIsoOrNull(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission('news:manage');
    if (auth.error) return auth.error;

    const parsed = paginationSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
    if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

    const data = await listNews(parsed.data.page, parsed.data.pageSize);
    return ok(data);
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission('news:manage');
    if (auth.error) return auth.error;

    if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

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

    return ok(await upsertNews(null, normalized, auth.session.user.id), { status: 201 });
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}