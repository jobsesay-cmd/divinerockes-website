'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type WorkflowStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
type NewsCategory = 'PROJECT_UPDATE' | 'ANNOUNCEMENT' | 'INSIGHT' | 'EVENT';

type NewsRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: WorkflowStatus;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  body: unknown;
};

type ApiListResponse = {
  total?: number;
  items?: NewsRow[];
};

type Message = { type: 'success' | 'error'; text: string };

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const row = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.split('=')[1]) : null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function isoOrNow(status: WorkflowStatus): string | null {
  return status === 'PUBLISHED' ? new Date().toISOString() : null;
}

function extractMeta(body: unknown): { category: NewsCategory; isFeatured: boolean; html: string } {
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const b = body as any;
    const meta = b.meta ?? {};
    const category =
      meta.category === 'PROJECT_UPDATE' ||
      meta.category === 'ANNOUNCEMENT' ||
      meta.category === 'INSIGHT' ||
      meta.category === 'EVENT'
        ? meta.category
        : 'ANNOUNCEMENT';
    const isFeatured = Boolean(meta.isFeatured);
    const html = typeof b.html === 'string' ? b.html : typeof b.body === 'string' ? b.body : '';
    return { category, isFeatured, html };
  }
  if (typeof body === 'string') return { category: 'ANNOUNCEMENT', isFeatured: false, html: body };
  return { category: 'ANNOUNCEMENT', isFeatured: false, html: '' };
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

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [status, setStatus] = useState<WorkflowStatus>('DRAFT');
  const [category, setCategory] = useState<NewsCategory>('ANNOUNCEMENT');
  const [isFeatured, setIsFeatured] = useState(false);

  const autoSlug = useMemo(() => slugify(title), [title]);

  async function loadItems() {
    setLoading(true);
    try {
      const data = await request<ApiListResponse>('/api/news?page=1&pageSize=100');
      setItems(data.items ?? []);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to load news.',
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
    setTitle('');
    setSlug('');
    setExcerpt('');
    setBody('');
    setCoverImageUrl('');
    setStatus('DRAFT');
    setCategory('ANNOUNCEMENT');
    setIsFeatured(false);
  }

  async function onSave() {
    setMessage(null);

    const cleanTitle = title.trim();
    const cleanSlug = (slug.trim() || autoSlug).trim();
    const cleanExcerpt = excerpt.trim();
    const cleanBody = body.trim();
    const cleanCover = coverImageUrl.trim();

    if (cleanTitle.length < 2) {
      setMessage({ type: 'error', text: 'Title must be at least 2 characters.' });
      return;
    }
    if (!cleanSlug || !/^[a-z0-9-]+$/.test(cleanSlug)) {
      setMessage({ type: 'error', text: 'Slug must contain lowercase letters, numbers, and hyphens only.' });
      return;
    }
    if (!cleanBody) {
      setMessage({ type: 'error', text: 'Body is required.' });
      return;
    }

    const csrf = getCookie('dr_csrf');
    const csrfHeader = csrf ? { 'x-csrf-token': csrf } : undefined;

    const payload = {
      title: cleanTitle,
      slug: cleanSlug,
      excerpt: cleanExcerpt || undefined,
      body: cleanBody,
      coverImageUrl: cleanCover || undefined,
      category,
      isFeatured,
      workflow: {
        status,
        publishedAt: isoOrNow(status),
      },
    };

    setSaving(true);
    try {
      if (editingId) {
        await request(`/api/news/${editingId}`, {
          method: 'PATCH',
          headers: csrfHeader,
          body: JSON.stringify(payload),
        });
        setMessage({ type: 'success', text: 'News updated successfully.' });
      } else {
        await request('/api/news', {
          method: 'POST',
          headers: csrfHeader,
          body: JSON.stringify(payload),
        });
        setMessage({ type: 'success', text: 'News created successfully.' });
      }

      await loadItems();
      resetForm();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save news.',
      });
    } finally {
      setSaving(false);
    }
  }

  function onEdit(item: NewsRow) {
    const meta = extractMeta(item.body);

    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setExcerpt(item.excerpt ?? '');
    setBody(meta.html);
    setCoverImageUrl('');
    setStatus(item.status);
    setCategory(meta.category);
    setIsFeatured(meta.isFeatured);
    setMessage(null);
  }

  async function onDelete(item: NewsRow) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    const csrf = getCookie('dr_csrf');
    const csrfHeader = csrf ? { 'x-csrf-token': csrf } : undefined;

    setDeletingId(item.id);
    try {
      await request(`/api/news/${item.id}`, {
        method: 'DELETE',
        headers: csrfHeader,
      });
      setMessage({ type: 'success', text: 'News deleted successfully.' });
      await loadItems();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete news.',
      });
    } finally {
      setDeletingId(null);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void onSave();
  }

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">News Manager</h1>

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

      <form className="space-y-3 rounded-lg border bg-white p-4" onSubmit={onSubmit}>
        <h2 className="font-semibold">{editingId ? 'Edit News' : 'Create News'}</h2>

        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <Input
          placeholder="Slug (optional, auto from title)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        {!slug && autoSlug ? <p className="text-xs text-slate-500">Auto slug: {autoSlug}</p> : null}

        <textarea
          className="min-h-[90px] w-full rounded border p-2 text-sm"
          placeholder="Excerpt (optional)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          className="min-h-[180px] w-full rounded border p-2 text-sm"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Input
          placeholder="Cover image URL (Cloudinary)"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />

        <label className="text-sm font-medium">Category</label>
        <select
          className="w-full rounded border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value as NewsCategory)}
        >
          <option value="PROJECT_UPDATE">Project Update</option>
          <option value="ANNOUNCEMENT">Company Announcement</option>
          <option value="INSIGHT">Industry Insight</option>
          <option value="EVENT">Event</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          Mark as Featured Story
        </label>

        <label className="text-sm font-medium">Status</label>
        <select
          className="w-full rounded border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as WorkflowStatus)}
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>

        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update News' : 'Create News'}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm} disabled={saving}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Updated</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4 text-slate-500" colSpan={5}>Loading news...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-4 text-slate-500" colSpan={5}>No news found.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">{item.slug}</td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">{new Date(item.updatedAt).toLocaleString()}</td>
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