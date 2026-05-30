import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken, getSessionUser } from '@/lib/auth/session';
import { deleteProject, updateProject } from '@/domains/projects/service';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session?.user?.id) return fail('Unauthorized', 401);
  if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

  const { id } = await params;
  const payload = await req.json().catch(() => null);
  if (!payload) return fail('Invalid payload', 400);

  try {
    return ok(await updateProject(id, payload, session.user.id));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return fail('A project with this slug already exists', 409);
    }
    return fail('Unable to update project', 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session?.user?.id) return fail('Unauthorized', 401);
  if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

  const { id } = await params;
  return ok(await deleteProject(id, session.user.id));
}