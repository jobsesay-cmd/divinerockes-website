import Link from 'next/link';
import { listQuotes } from '@/domains/inquiries/service';

function badgeClasses(archived: boolean) {
  return archived
    ? 'inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'
    : 'inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700';
}

export default async function InquiriesPage() {
  const quotes = await listQuotes({ includeArchived: true, pageSize: 100 });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Inquiry Manager</h1>
        <p className="text-sm text-slate-600">Manage quote inquiries, status updates, and archived requests.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Client</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Service</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Lifecycle</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes.items.map((q) => {
              const archived = Boolean(q.deletedAt);
              return (
                <tr key={q.id}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{q.client.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{q.client.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{q.serviceType}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{q.status}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={badgeClasses(archived)}>{archived ? 'Archived' : 'Active'}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <Link className="font-medium text-blue-700 hover:underline" href={`/admin/inquiries/${q.id}`}>
                      View details
                    </Link>
                  </td>
                </tr>
              );
            })}

            {quotes.items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                  No inquiries found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}