import Link from 'next/link';
import { listInquiries } from '@/domains/inquiries/service';

type SearchParams = Promise<{ q?: string }>;

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || undefined;

  const { items } = await listInquiries({
    query,
    includeArchived: true,
    pageSize: 100,
  });

  const submissions = items.filter((s) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(needle) ||
      s.email.toLowerCase().includes(needle) ||
      (s.subject ?? '').toLowerCase().includes(needle) ||
      s.message.toLowerCase().includes(needle)
    );
  });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Submissions</h1>
        <p className="text-sm text-slate-600">
          General contact submissions from website visitors.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {submissions.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{s.email}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{s.subject ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{s.deletedAt ? 'Archived' : 'Active'}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <Link
                    className="font-medium text-blue-700 hover:underline"
                    href={`/admin/submissions/${s.id}`}
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}

            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                  No submissions found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}