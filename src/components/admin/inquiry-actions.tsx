'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiDelete, apiPatch } from '@/lib/api/client';

type Props = {
  id: string;
  currentStatus: 'NEW' | 'REVIEWED' | 'QUOTED' | 'APPROVED';
};

const transitionOptions: Record<Props['currentStatus'], Props['currentStatus'][]> = {
  NEW: ['REVIEWED'],
  REVIEWED: ['QUOTED'],
  QUOTED: ['APPROVED'],
  APPROVED: [],
};

export function InquiryActions({ id, currentStatus }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextStatuses = transitionOptions[currentStatus];

  async function updateStatus(status: Props['currentStatus']) {
    setBusy(true);
    setError(null);
    try {
      await apiPatch(`/api/inquiries/quotes?id=${id}`, { status });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update status');
    } finally {
      setBusy(false);
    }
  }

  async function archive() {
    setBusy(true);
    setError(null);
    try {
      await apiDelete(`/api/inquiries/quotes?id=${id}`);
      router.push('/admin/inquiries');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to archive inquiry');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3 rounded border border-slate-200 p-4">
      <p className="text-sm font-medium">Actions</p>

      {nextStatuses.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {nextStatuses.map((status) => (
            <button
              key={status}
              type="button"
              disabled={busy}
              onClick={() => updateStatus(status)}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
            >
              Mark as {status}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No further status transitions available.</p>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={archive}
        className="rounded bg-amber-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
      >
        Archive inquiry
      </button>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}