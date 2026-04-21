import { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';
import { createReportExport } from '@/domains/reports/service';
import { reportExportSchema } from '@/domains/reports/schema';

export async function POST(req: NextRequest) {
  const auth = await requirePermission('logs:read');
  if (auth.error) return auth.error;

  const parsed = reportExportSchema.safeParse(await req.json());
  if (!parsed.success) return fail('Validation failed', 422, parsed.error.flatten());

  const report = await createReportExport(parsed.data, auth.session.user.id);
  return ok(report, { status: 202 });
}
