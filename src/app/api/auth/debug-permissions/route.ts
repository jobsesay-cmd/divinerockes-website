import { ok } from '@/lib/api/response';
import { requirePermission } from '@/lib/rbac';

export async function GET() {
  // Probe permission using existing auth/rbac pipeline
  const auth = await requirePermission('news:manage');

  if (auth.error) {
    return ok({
      authenticated: false,
      hasNewsManage: false,
      reason: 'Unauthorized',
    });
  }

  return ok({
    authenticated: true,
    hasNewsManage: true,
    userId: auth.session.user.id,
  });
}