import { ok } from '@/lib/api/response';
import { listProjectCategories } from '@/domains/projects/service';

export async function GET() {
  return ok(await listProjectCategories());
}