'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  inquiryId: string;
  currentStatus: 'NEW' | 'REVIEWED' | 'QUOTED' | 'APPROVED' | string;
  isArchived: boolean;
};

async function sendPatch(id: string, payload: Record<string, unknown>) {
  const res = await fetch(`/api/inquiries/quotes?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...payload }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const message = json?.error?.message ?? `Request failed with ${res.status}`;
    throw new Error(message);
  }
}

export default function InquiryActions({ inquiryId, currentStatus, isArchived }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const normalizedStatus = useMemo(() => String(currentStatus).toUpperCase(), [currentStatus]);
  const canMarkReviewed = normalizedStatus === 'NEW' && !isArchived;

  const run = (payload: Record<string, unknown>) => {
    setError(null);
    startTransition(async () => {
      try {
        await sendPatch(inquiryId, payload);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Action failed');
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => run({ status: 'REVIEWED' })}
          disabled={!canMarkReviewed || isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark as reviewed
        </button>

        {!isArchived ? (
          <button
            type="button"
            onClick={() => run({ action: 'archive' })}
            disabled={isPending}
            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Archive inquiry
          </button>
        ) : (
          <button
            type="button"
            onClick={() => run({ action: 'restore' })}
            disabled={isPending}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Restore inquiry
          </button>
        )}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}