'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ReportType = 'inquiries' | 'quotes' | 'projects' | 'news' | 'audit_logs';
type ReportFormat = 'csv' | 'json';
type Message = { type: 'success' | 'error' | 'info'; text: string };

type ReportQueueItem = {
  id: string;
  reportType: string;
  format: string;
  status: string;
  fileUrl: string | null;
  createdAt: string;
  completedAt: string | null;
  requestedBy?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
};

type ReportListResponse = {
  data?: {
    total: number;
    items: ReportQueueItem[];
  };
  error?: {
    message?: string;
  };
  message?: string;
};

const reportOptions: Array<{ type: ReportType; label: string; description: string }> = [
  { type: 'inquiries', label: 'Inquiries Pipeline', description: 'Track inquiry volume and response backlog.' },
  { type: 'quotes', label: 'Quotes Performance', description: 'Review quote requests and turnaround trends.' },
  { type: 'projects', label: 'Projects Delivery', description: 'Export project delivery records.' },
  { type: 'news', label: 'News Publishing', description: 'Audit publishing output over time.' },
  { type: 'audit_logs', label: 'Audit & Security Logs', description: 'Export admin/security activity.' },
];

function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toPrettyDate(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function normalizeStatus(status: string): string {
  const upper = String(status || '').toUpperCase();
  if (upper === 'PENDING' || upper === 'QUEUED') return 'QUEUED';
  if (upper === 'PROCESSING' || upper === 'IN_PROGRESS' || upper === 'RUNNING') return 'PROCESSING';
  if (upper === 'DONE' || upper === 'COMPLETED' || upper === 'SUCCESS') return 'COMPLETED';
  if (upper === 'FAILED' || upper === 'ERROR') return 'FAILED';
  return upper || 'UNKNOWN';
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('inquiries');
  const [format, setFormat] = useState<ReportFormat>('csv');
  const [dateFrom, setDateFrom] = useState<string>(formatDateForInput(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)));
  const [dateTo, setDateTo] = useState<string>(formatDateForInput(new Date()));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [isProcessingNext, setIsProcessingNext] = useState(false);

  const [message, setMessage] = useState<Message | null>(null);
  const [queue, setQueue] = useState<ReportQueueItem[]>([]);
  const [total, setTotal] = useState(0);

  const selected = useMemo(() => reportOptions.find((r) => r.type === reportType), [reportType]);

  async function loadQueue(silent = false) {
    if (!silent) setIsLoadingQueue(true);

    try {
      const res = await fetch('/api/reports/export?page=1&pageSize=20', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      const payload = (await res.json().catch(() => ({}))) as ReportListResponse;

      if (!res.ok) {
        const msg = payload?.error?.message || payload?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      setQueue(payload.data?.items ?? []);
      setTotal(payload.data?.total ?? 0);
    } catch (error) {
      setQueue([]);
      setTotal(0);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to load report queue.',
      });
    } finally {
      if (!silent) setIsLoadingQueue(false);
    }
  }

  useEffect(() => {
    void loadQueue();

    const intervalId = window.setInterval(() => {
      void loadQueue(true);
    }, 15_000);

    return () => window.clearInterval(intervalId);
  }, []);

  async function onCreateReport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (dateFrom && dateTo && dateFrom > dateTo) {
      setMessage({ type: 'error', text: 'Date From cannot be later than Date To.' });
      return;
    }

    const csrfToken = getCookie('dr_csrf');
    if (!csrfToken) {
      setMessage({ type: 'error', text: 'CSRF token missing. Refresh page and try again.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reports/export', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          reportType,
          format,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(payload?.error?.message || payload?.message || `Request failed (${res.status})`);
      }

      setMessage({
        type: 'success',
        text: `Report queued successfully (${reportType}, ${format.toUpperCase()}). Export request ID: ${payload?.data?.id ?? 'N/A'}`,
      });

      await loadQueue(true);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create report export.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onProcessNextQueuedReport() {
    setMessage(null);

    const csrfToken = getCookie('dr_csrf');
    if (!csrfToken) {
      setMessage({ type: 'error', text: 'CSRF token missing. Refresh page and try again.' });
      return;
    }

    setIsProcessingNext(true);
    try {
      const res = await fetch('/api/reports/export?run=1', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'include',
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.error?.message || payload?.message || `Request failed (${res.status})`);
      }

      setMessage({
        type: 'success',
        text: payload?.data?.message || 'Processed next queued report.',
      });

      await loadQueue(true);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to process next queued report.',
      });
    } finally {
      setIsProcessingNext(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3 p-5">
        <h1 className="text-2xl font-bold">Reports Management</h1>
        <p className="text-slate-700">Queue and process exports. If you see Unauthorized, log out and log in again in this browser.</p>
      </Card>

      {message ? (
        <Card className="p-4">
          <p
            className={`rounded-md px-3 py-2 text-sm ${
              message.type === 'success'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : message.type === 'error'
                ? 'border border-rose-200 bg-rose-50 text-rose-700'
                : 'border border-slate-200 bg-slate-50 text-slate-700'
            }`}
          >
            {message.text}
          </p>
        </Card>
      ) : null}

      <Card className="space-y-4 p-5">
        <h2 className="text-lg font-semibold">Create Report Export</h2>
        <form className="space-y-4" onSubmit={onCreateReport}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Report type</label>
              <select className="w-full rounded border p-2" value={reportType} onChange={(e) => setReportType(e.target.value as ReportType)}>
                {reportOptions.map((item) => (
                  <option key={item.type} value={item.type}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">{selected?.description}</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Format</label>
              <select className="w-full rounded border p-2" value={format} onChange={(e) => setFormat(e.target.value as ReportFormat)}>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Date from</label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Date to</label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Queueing...' : 'Queue Export'}
          </Button>
        </form>
      </Card>

      <Card className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Export Queue History</h2>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Total: {total}</div>
            <Button type="button" variant="secondary" onClick={onProcessNextQueuedReport} disabled={isProcessingNext}>
              {isProcessingNext ? 'Processing...' : 'Process Next Queued'}
            </Button>
          </div>
        </div>

        {isLoadingQueue ? (
          <p className="text-sm text-slate-600">Loading queued reports...</p>
        ) : queue.length === 0 ? (
          <p className="text-sm text-slate-600">No report exports found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  <th className="px-3 py-2 font-semibold">Request ID</th>
                  <th className="px-3 py-2 font-semibold">Type</th>
                  <th className="px-3 py-2 font-semibold">Format</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                  <th className="px-3 py-2 font-semibold">Requested</th>
                  <th className="px-3 py-2 font-semibold">Completed</th>
                  <th className="px-3 py-2 font-semibold">Requested By</th>
                  <th className="px-3 py-2 font-semibold">Download</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-3 py-2 font-mono text-xs">{item.id}</td>
                    <td className="px-3 py-2">{item.reportType}</td>
                    <td className="px-3 py-2 uppercase">{item.format}</td>
                    <td className="px-3 py-2">{normalizeStatus(item.status)}</td>
                    <td className="px-3 py-2">{toPrettyDate(item.createdAt)}</td>
                    <td className="px-3 py-2">{toPrettyDate(item.completedAt)}</td>
                    <td className="px-3 py-2">
                      {item.requestedBy ? `${item.requestedBy.fullName} (${item.requestedBy.email})` : '—'}
                    </td>
                    <td className="px-3 py-2">
                      {item.fileUrl ? (
                        <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                          Download
                        </a>
                      ) : (
                        <span className="text-slate-500">Not ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}