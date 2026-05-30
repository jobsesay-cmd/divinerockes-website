import Link from 'next/link';
import { notFound } from 'next/navigation';
import InquiryActions from './InquiryActions';
import { getQuoteById } from '@/domains/inquiries/service';

function formatMoney(value: unknown) {
  if (value == null) return '—';
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) return String(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(asNumber);
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await getQuoteById(id, true);
  if (!inquiry) notFound();

  const isArchived = Boolean(inquiry.deletedAt);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inquiry Details</h1>
          <p className="text-sm text-slate-600">Review status, requirements, and lifecycle actions for this inquiry.</p>
        </div>
        <Link href="/admin/inquiries" className="text-sm font-medium text-blue-700 hover:underline">
          ← Back to inquiries
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold">Client Information</h2>
        <div className="space-y-1 text-sm text-slate-800">
          <p><strong>Name:</strong> {inquiry.client.name}</p>
          <p><strong>Email:</strong> {inquiry.client.email}</p>
          <p><strong>Phone:</strong> {inquiry.client.phone ?? '—'}</p>
          <p><strong>Company:</strong> {inquiry.client.company ?? '—'}</p>
        </div>

        <h2 className="mb-3 mt-6 text-xl font-semibold">Quote Request</h2>
        <div className="space-y-1 text-sm text-slate-800">
          <p><strong>Service Type:</strong> {inquiry.serviceType}</p>
          <p><strong>Timeline:</strong> {inquiry.timeline ?? '—'}</p>
          <p><strong>Budget Min:</strong> {formatMoney(inquiry.budgetMin)}</p>
          <p><strong>Budget Max:</strong> {formatMoney(inquiry.budgetMax)}</p>
          <p><strong>Status:</strong> {inquiry.status}</p>
          <p><strong>Lifecycle:</strong> {isArchived ? 'Archived' : 'Active'}</p>
          <p><strong>Submitted:</strong> {inquiry.createdAt.toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {inquiry.updatedAt.toLocaleString()}</p>
        </div>

        <h2 className="mb-3 mt-6 text-xl font-semibold">Requirements</h2>
        <pre className="overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm text-slate-800">
          {inquiry.requirements || 'No additional requirements provided.'}
        </pre>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold">Actions</h2>
        <InquiryActions inquiryId={inquiry.id} currentStatus={inquiry.status} isArchived={isArchived} />
      </div>
    </section>
  );
}