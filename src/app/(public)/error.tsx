'use client';

import { Button } from '@/components/ui/button';

export default function PublicError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-4 rounded-lg border border-rose-200 bg-rose-50 p-6">
      <h2 className="text-xl font-bold text-rose-700">Something went wrong</h2>
      <p className="text-sm text-rose-600">We could not load this page right now.</p>
      <Button type="button" onClick={reset}>Try again</Button>
    </div>
  );
}
