import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { paginationSchema } from '@/lib/api/pagination';
import { fail, ok } from '@/lib/api/response';
import { assertCsrfToken, getSessionUser } from '@/lib/auth/session';
import { projectSchema } from '@/domains/projects/schema';
import { listProjects, upsertProject } from '@/domains/projects/service';

export async function GET(req: NextRequest) {
  const parsed = paginationSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());
  return ok(await listProjects(parsed.data.page, parsed.data.pageSize));
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session?.user?.id) return fail('Unauthorized', 401);
  if (!(await assertCsrfToken())) return fail('CSRF validation failed', 403);

  const parsed = projectSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  try {
    return ok(await upsertProject(null, parsed.data, session.user.id), { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return fail('A project with this slug already exists', 409);
    }
    return fail('Unable to save project', 500);
  }
}