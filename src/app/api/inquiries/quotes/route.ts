import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { quoteSchema, quoteStatusUpdateSchema } from '@/domains/inquiries/schema';
import { createQuote, updateQuoteStatus } from '@/domains/inquiries/service';
import { requirePermission } from '@/lib/rbac';

export async function POST(req: NextRequest) {
  const parsed = quoteSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  return ok(await createQuote(parsed.data), { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const auth = await requirePermission('quotes:manage');
  if (auth.error) return auth.error;

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return fail('Quote id is required', 400);

  const parsed = quoteStatusUpdateSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await updateQuoteStatus(id, parsed.data.status));
}
