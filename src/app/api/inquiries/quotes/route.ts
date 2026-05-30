import { NextRequest } from 'next/server';
import { QuoteStatus } from '@prisma/client';
import { fail, ok } from '@/lib/api/response';
import { quoteSchema, quoteStatusUpdateSchema } from '@/domains/inquiries/schema';
import { archiveQuote, createQuote, listQuotes, restoreQuote, updateQuoteStatus } from '@/domains/inquiries/service';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? undefined;
  const includeArchived = url.searchParams.get('includeArchived') === 'true';
  const page = Number(url.searchParams.get('page') ?? '1');
  const pageSize = Number(url.searchParams.get('pageSize') ?? '20');

  return ok(await listQuotes({ query: q, includeArchived, page, pageSize }));
}

export async function POST(req: NextRequest) {
  const parsed = quoteSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  return ok(await createQuote(parsed.data), { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);

  // Accept id from query OR body (browser-safe fallback)
  const rawBody = (await req.json().catch(() => ({}))) as {
    id?: string;
    status?: QuoteStatus;
    action?: 'archive' | 'restore';
  };

  const idFromQuery = url.searchParams.get('id');
  const id = idFromQuery ?? rawBody.id;
  if (!id) return fail('Quote id is required', 400);

  if (rawBody.action === 'archive') {
    return ok(await archiveQuote(id));
  }

  if (rawBody.action === 'restore') {
    return ok(await restoreQuote(id));
  }

  const parsed = quoteStatusUpdateSchema.safeParse({ status: rawBody.status });
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await updateQuoteStatus(id, parsed.data.status));
}