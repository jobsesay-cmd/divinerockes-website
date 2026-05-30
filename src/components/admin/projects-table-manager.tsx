'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type Category = { id: string; name: string };
type Project = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  description?: unknown;
  completedOn?: string | Date | null;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  featured: boolean;
  updatedAt: string | Date;
  projectCategories: { categoryId: string }[];
  seo?: {
    ogImageUrl?: string | null;
    structuredData?: unknown;
  } | null;
};

function getCsrfFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((item) => item.startsWith('dr_csrf='))
    ?.split('=')[1];
}

async function parseError(res: Response) {
  const payload = await res.json().catch(() => null);
  return payload?.error?.message ?? payload?.message ?? `Request failed: ${res.status}`;
}

function ProjectsTableManager({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [rows, setRows] = useState(projects);
  const [busyId, setBusyId] = useState<string | null>(null);

  const updateRow = (id: string, patch: Partial<Project>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const editRow = (row: Project) => {
    window.dispatchEvent(new CustomEvent('admin:edit-project', { detail: row }));
    toast.info('Project loaded in the Projects Manager form');
  };

  const saveRow = async (row: Project) => {
    setBusyId(row.id);
    try {
      const csrf = getCsrfFromCookie();
      const res = await fetch(`/api/projects/${row.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({
          title: row.title,
          slug: row.slug,
          summary: row.summary,
          featured: row.featured,
          status: row.status,
          categoryIds: row.projectCategories.map((x) => x.categoryId),
        }),
      });
      if (!res.ok) throw new Error(await parseError(res));

      const payload = await res.json().catch(() => null);
      if (payload?.data?.updatedAt) updateRow(row.id, { updatedAt: payload.data.updatedAt });
      toast.success('Project updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update project');
    } finally {
      setBusyId(null);
    }
  };

  const deleteRow = async (id: string) => {
    if (!window.confirm('Delete this project? It will be removed from public listings.')) return;

    setBusyId(id);
    try {
      const csrf = getCsrfFromCookie();
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: csrf ? { 'x-csrf-token': csrf } : undefined,
      });
      if (!res.ok) throw new Error(await parseError(res));
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete project');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead>
          <tr className="text-left text-slate-600">
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Slug</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Featured</th>
            <th className="px-3 py-2">Updated</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((p) => (
            <tr key={p.id}>
              <td className="px-3 py-2">
                <input className="w-full rounded border px-2 py-1" value={p.title} onChange={(e) => updateRow(p.id, { title: e.target.value })} />
              </td>
              <td className="px-3 py-2">
                <input className="w-full rounded border px-2 py-1" value={p.slug} onChange={(e) => updateRow(p.id, { slug: e.target.value })} />
              </td>
              <td className="px-3 py-2">
                <select className="rounded border px-2 py-1" value={p.status} onChange={(e) => updateRow(p.id, { status: e.target.value as Project['status'] })}>
                  <option>DRAFT</option>
                  <option>PUBLISHED</option>
                  <option>SCHEDULED</option>
                  <option>ARCHIVED</option>
                </select>
              </td>
              <td className="px-3 py-2">
                <select
                  className="rounded border px-2 py-1"
                  value={p.projectCategories[0]?.categoryId ?? ''}
                  onChange={(e) => updateRow(p.id, { projectCategories: e.target.value ? [{ categoryId: e.target.value }] : [] })}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (<option value={c.id} key={c.id}>{c.name}</option>))}
                </select>
              </td>
              <td className="px-3 py-2">
                <input type="checkbox" checked={p.featured} onChange={(e) => updateRow(p.id, { featured: e.target.checked })} />
              </td>
              <td className="px-3 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
              <td className="px-3 py-2 space-x-2">
                <button className="rounded bg-slate-700 px-3 py-1 text-white disabled:opacity-50" disabled={busyId === p.id} onClick={() => editRow(p)}>
                  Edit
                </button>
                <button className="rounded bg-blue-600 px-3 py-1 text-white disabled:opacity-50" disabled={busyId === p.id} onClick={() => saveRow(p)}>
                  {busyId === p.id ? 'Saving...' : 'Save row'}
                </button>
                <button className="rounded bg-rose-600 px-3 py-1 text-white disabled:opacity-50" disabled={busyId === p.id} onClick={() => deleteRow(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ProjectsTableManager };
export default ProjectsTableManager;