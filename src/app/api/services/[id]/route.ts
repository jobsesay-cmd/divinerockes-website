import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().trim().min(2).max(140).optional(),
  summary: z.string().trim().min(20).max(1200).nullable().optional(),
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

async function uniqueSlugForUpdate(base: string, currentId: string): Promise<string> {
  const root = slugify(base) || 'service';
  let slug = root;
  let i = 1;

  while (true) {
    const existing = await prisma.service.findFirst({
      where: {
        slug,
        NOT: { id: currentId },
      },
      select: { id: true },
    });

    if (!existing) return slug;
    slug = `${root}-${i++}`;
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requirePermission('services:manage');
    if (auth.error) return auth.error;

    const { id } = await context.params;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

    const existing = await prisma.service.findFirst({
      where: { id, deletedAt: null },
      select: { id: true, name: true, status: true },
    });

    if (!existing) return fail('Service not found', 404);

    let nextSlug: string | undefined;
    if (parsed.data.name && parsed.data.name !== existing.name) {
      nextSlug = await uniqueSlugForUpdate(parsed.data.name, id);
    }

    const nextStatus = parsed.data.status ?? existing.status;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
        ...(nextSlug ? { slug: nextSlug } : {}),
        ...(parsed.data.summary !== undefined ? { summary: parsed.data.summary } : {}),
        ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
        ...(parsed.data.status !== undefined
          ? { publishedAt: nextStatus === 'PUBLISHED' ? new Date() : null }
          : {}),
        version: { increment: 1 },
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

    return ok(updated);
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requirePermission('services:manage');
    if (auth.error) return auth.error;

    const { id } = await context.params;

    const existing = await prisma.service.findFirst({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    if (!existing) return fail('Service not found', 404);

    await prisma.service.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: 'ARCHIVED',
        version: { increment: 1 },
      },
    });

    return ok({ deleted: true });
  } catch (error) {
    return fail(toMessage(error), 500);
  }
}