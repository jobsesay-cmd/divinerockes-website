'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiDelete, apiPatch } from '@/lib/api/client';

export function SubmissionActions({ id, isResolved }: { id: string; isResolved: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleStatus() {
    setBusy(true);
    setError(null);
    try {
      await apiPatch(`/api/submissions?id=${id}`, { isResolved: !isResolved });
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
      await apiDelete(`/api/submissions?id=${id}`);
      router.push('/admin/submissions');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to archive');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3 rounded border border-slate-200 p-4">
      <p className="text-sm font-medium">Actions</p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={toggleStatus}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
        >
          Mark as {isResolved ? 'Open' : 'Resolved'}
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={archive}
          className="rounded bg-amber-600 px-3 py-1.5 text-sm text-white disabled:opacity-60"
        >
          Archive
        </button>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}