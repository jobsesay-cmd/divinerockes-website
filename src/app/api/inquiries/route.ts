import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { inquirySchema } from '@/domains/inquiries/schema';
import { createInquiry } from '@/domains/inquiries/service';

export async function POST(req: NextRequest) {
  const parsed = inquirySchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  return ok(await createInquiry(parsed.data), { status: 201 });
}
