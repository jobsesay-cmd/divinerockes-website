import { NextRequest } from 'next/server';
import { paginationSchema } from '@/lib/api/pagination';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken } from '@/lib/auth/session';
import { requirePermission } from '@/lib/rbac';
import { newsSchema } from '@/domains/news/schema';
import { listNews, upsertNews } from '@/domains/news/service';

export async function GET(req: NextRequest) {
  const parsed = paginationSchema.safeParse({
    page: req.nextUrl.searchParams.get('page') ?? undefined,
    pageSize: req.nextUrl.searchParams.get('pageSize') ?? undefined,
    search: req.nextUrl.searchParams.get('search') ?? undefined,
  });
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  return ok(await listNews(parsed.data.page, parsed.data.pageSize));
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission('news:manage');
  if (auth.error) return auth.error;
  if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

  const parsed = newsSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await upsertNews(null, parsed.data, auth.session!.user.id), { status: 201 });
}
