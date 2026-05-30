import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { archiveInquiry, listInquiries, restoreInquiry } from '@/domains/inquiries/service';
import { requirePermission } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  const auth = await requirePermission('quotes:read');
  if (auth.error) return auth.error;

  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? undefined;
  const includeArchived = url.searchParams.get('includeArchived') === 'true';
  const page = Number(url.searchParams.get('page') ?? '1');
  const pageSize = Number(url.searchParams.get('pageSize') ?? '20');

  return ok(await listInquiries({ query: q, includeArchived, page, pageSize }));
}

export async function PATCH(req: NextRequest) {
  const auth = await requirePermission('quotes:manage');
  if (auth.error) return auth.error;

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return fail('Inquiry id is required', 400);

  const body = (await req.json().catch(() => ({}))) as { action?: 'archive' | 'restore' };

  if (body.action === 'archive') {
    return ok(await archiveInquiry(id));
  }

  if (body.action === 'restore') {
    return ok(await restoreInquiry(id));
  }

  return fail('Unsupported action', 422);
}