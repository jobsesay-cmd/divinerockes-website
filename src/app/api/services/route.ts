import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().trim().min(2).max(140),
  summary: z.string().trim().min(20).max(1200),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal server error';
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || 'service';
  let slug = root;
  let i = 1;

  while (true) {
    const existing = await prisma.service.findFirst({
      where: { slug },
      select: { id: true },
    });
    if (!existing) return slug;
    slug = `${root}-${i++}`;
  }
}

export async function GET() {
  try {
    const items = await prisma.service.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        name: true,
        summary: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ok({ items });
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission('services:manage');
    if (auth.error) return auth.error;

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

    const slug = await uniqueSlug(parsed.data.name);
    const status = parsed.data.status ?? 'PUBLISHED';

    const created = await prisma.service.create({
      data: {
        name: parsed.data.name,
        slug,
        summary: parsed.data.summary,
        content: { blocks: [] },
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        createdById: auth.session.user.id,
      },
      select: {
        id: true,
        name: true,
        summary: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ok(created);
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}