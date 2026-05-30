'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ServiceRow = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiListResponse = { items: ServiceRow[] };

type Message = { type: 'success' | 'error'; text: string };

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const row = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.split('=')[1]) : null;
}

async function parseJsonSafe(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const payload = await parseJsonSafe(res);

  if (!res.ok) {
    const msg = payload?.error?.message || payload?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return (payload?.data ?? payload) as T;
}

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('PUBLISHED');

  async function loadItems() {
    setLoading(true);
    try {
      const data = await request<ApiListResponse>('/api/services');
      setItems(data.items ?? []);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to load services.',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  function resetForm() {
    setEditingId(null);
    setName('');
    setSummary('');
    setStatus('PUBLISHED');
  }

  async function onSave() {
    setMessage(null);

    const cleanName = name.trim();
    const cleanSummary = summary.trim();

    if (cleanName.length < 2) {
      setMessage({ type: 'error', text: 'Name must be at least 2 characters.' });
      return;
    }

    if (cleanSummary.length < 20) {
      setMessage({ type: 'error', text: 'Summary must be at least 20 characters.' });
      return;
    }

    const csrf = getCookie('dr_csrf');
    const csrfHeader = csrf ? { 'x-csrf-token': csrf } : undefined;

    setSaving(true);
    try {
      if (editingId) {
        await request(`/api/services/${editingId}`, {
          method: 'PATCH',
          headers: csrfHeader,
          body: JSON.stringify({
            name: cleanName,
            summary: cleanSummary,
            status,
          }),
        });
        setMessage({ type: 'success', text: 'Service updated.' });
      } else {
        await request('/api/services', {
          method: 'POST',
          headers: csrfHeader,
          body: JSON.stringify({
            name: cleanName,
            summary: cleanSummary,
            status,
          }),
        });
        setMessage({ type: 'success', text: 'Service created.' });
      }

      await loadItems();
      resetForm();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Save failed.',
      });
    } finally {
      setSaving(false);
    }
  }

  function onEdit(item: ServiceRow) {
    setEditingId(item.id);
    setName(item.name);
    setSummary(item.summary ?? '');
    setStatus(item.status);
    setMessage(null);
  }

  async function onDelete(item: ServiceRow) {
    if (!window.confirm(`Delete "${item.name}"?`)) return;

    const csrf = getCookie('dr_csrf');
    const csrfHeader = csrf ? { 'x-csrf-token': csrf } : undefined;

    setDeletingId(item.id);
    try {
      await request(`/api/services/${item.id}`, {
        method: 'DELETE',
        headers: csrfHeader,
      });
      setMessage({ type: 'success', text: 'Service deleted.' });
      await loadItems();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Delete failed.',
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">Services Management</h1>

      {message ? (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            message.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border border-rose-200 bg-rose-50 text-rose-700'
          }`}
        >
          {message.text}
        </p>
      ) : null}

      <div className="space-y-3 rounded-lg border bg-white p-4">
        <h2 className="font-semibold">{editingId ? 'Edit Service' : 'Create Service'}</h2>

        <Input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="min-h-[120px] w-full rounded border p-2 text-sm"
          placeholder="Service summary (used as frontend excerpt)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <label className="text-sm font-medium">Status</label>
        <select
          className="w-full rounded border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED')}
        >
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="DRAFT">DRAFT</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>

        <div className="flex gap-2">
          <Button type="button" onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm} disabled={saving}>
              Cancel
            </Button>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Summary</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-slate-500" colSpan={5}>
                  Loading services...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="p-4 text-slate-500" colSpan={5}>
                  No services found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3 text-slate-700">{item.summary ?? '-'}</td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">{item.slug}</td>
                  <td className="p-3 flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => onEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => onDelete(item)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}