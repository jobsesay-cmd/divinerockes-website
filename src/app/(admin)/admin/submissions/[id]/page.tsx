import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInquiryById } from '@/domains/inquiries/service';

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getInquiryById(id, true);

  if (!submission) notFound();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Submission Details</h1>
          <p className="text-sm text-slate-600">View full inquiry submission metadata and message.</p>
        </div>
        <Link href="/admin/submissions" className="text-sm font-medium text-blue-700 hover:underline">
          ← Back to submissions
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold">Sender Information</h2>
        <div className="space-y-1 text-sm text-slate-800">
          <p><strong>Name:</strong> {submission.name}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Phone:</strong> {submission.phone ?? '—'}</p>
          <p><strong>Subject:</strong> {submission.subject ?? '—'}</p>
          <p><strong>Source Page:</strong> {submission.sourcePage ?? '—'}</p>
          <p><strong>Lifecycle:</strong> {submission.deletedAt ? 'Archived' : 'Active'}</p>
          <p><strong>Submitted:</strong> {submission.createdAt.toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {submission.updatedAt.toLocaleString()}</p>
        </div>

        <h2 className="mb-3 mt-6 text-xl font-semibold">Message</h2>
        <pre className="overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm text-slate-800">
          {submission.message}
        </pre>
      </div>
    </section>
  );
}