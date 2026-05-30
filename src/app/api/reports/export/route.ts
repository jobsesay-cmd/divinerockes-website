import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { getSessionUser, assertCsrfToken } from '@/lib/auth/session';
import {
  createReportExport,
  listReportExports,
  processNextQueuedReport,
} from '@/domains/reports/service';
import { reportExportSchema } from '@/domains/reports/schema';

async function requireApiSession() {
  const session = await getSessionUser();
  if (!session?.user) return null;
  return session;
}

export async function GET(req: NextRequest) {
  const session = await requireApiSession();
  if (!session) return fail('Unauthorized', 401);

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '20');
  const status = searchParams.get('status') ?? undefined;
  const reportType = searchParams.get('reportType') ?? undefined;

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 100 ? pageSize : 20;

  const result = await listReportExports({
    page: safePage,
    pageSize: safePageSize,
    status,
    reportType,
  });

  return ok(result);
}

export async function POST(req: NextRequest) {
  const session = await requireApiSession();
  if (!session) return fail('Unauthorized', 401);

  const csrfOk = await assertCsrfToken();
  if (!csrfOk) return fail('CSRF validation failed', 403);

  const parsed = reportExportSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const report = await createReportExport(parsed.data, session.user.id);
  return ok(report, { status: 202 });
}

/**
 * Manual safe trigger: process ONE queued report.
 * PATCH /api/reports/export?run=1
 */
export async function PATCH(req: NextRequest) {
  const session = await requireApiSession();
  if (!session) return fail('Unauthorized', 401);

  const csrfOk = await assertCsrfToken();
  if (!csrfOk) return fail('CSRF validation failed', 403);

  const { searchParams } = new URL(req.url);
  const run = searchParams.get('run');
  if (run !== '1') {
    return fail('Manual processor not executed. Pass ?run=1 to process one queued report.', 400);
  }

  const result = await processNextQueuedReport();

  if (!result.processed) {
    return ok({ message: 'No queued reports found.' });
  }

  if (result.status === 'FAILED') {
    return ok({
      message: 'Report processing failed.',
      reportExportId: result.id,
      error: result.error,
    });
  }

  return ok({
    message: 'Report processed successfully.',
    reportExportId: result.id,
    fileUrl: result.fileUrl ?? null,
  });
}