'use client';

import { useEffect, useMemo, useState } from 'react';
import { RoleType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiGet } from '@/lib/api/client';

type UserRow = {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  userRoles: Array<{ role: { key: RoleType; name: string } }>;
};

type UsersResponse = { total: number; items: UserRow[] };
type SessionUserPayload = { user: { id: string } | null; authenticated: boolean };
type RoleRow = { id: string; key: RoleType; name: string; description: string | null };

type Message = { type: 'success' | 'error' | 'info'; text: string };

const roleLabel: Record<RoleType, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  AUTHOR: 'Author',
  REVIEWER: 'Reviewer',
  SUPPORT: 'Support',
  PROJECTS_MANAGER: 'Projects Manager',
  INQUIRIES_MANAGER: 'Inquiries Manager',
};

const fallbackRoleOptions: RoleType[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'EDITOR',
  'AUTHOR',
  'REVIEWER',
  'SUPPORT',
  'PROJECTS_MANAGER',
  'INQUIRIES_MANAGER',
];

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length < 2) return null;
  return decodeURIComponent(parts.pop()!.split(';').shift() || '');
}

function flattenValidation(payload: any): string[] {
  const fieldErrors = payload?.error?.details?.fieldErrors;
  if (!fieldErrors || typeof fieldErrors !== 'object') return [];
  return Object.values(fieldErrors).flat().filter(Boolean) as string[];
}

async function safeJson<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validation = flattenValidation(payload);
    if (validation.length) throw new Error(validation.join(' | '));

    const msg = payload?.error?.message || payload?.message || `Request failed (${response.status})`;
    throw new Error(msg);
  }

  return (payload?.data ?? payload) as T;
}

async function apiMutate<T>(url: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown): Promise<T> {
  const csrf = getCookie('dr_csrf');
  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return safeJson<T>(response);
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    roleKeys: ['EDITOR'] as RoleType[],
    isActive: true,
  });

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const resetUserForm = () => {
    setEditingId(null);
    setForm({
      fullName: '',
      email: '',
      password: '',
      roleKeys: ['EDITOR'],
      isActive: true,
    });
  };

  async function loadUsers() {
    setLoadingUsers(true);
    try {
      const data = await apiGet<UsersResponse>('/api/users?page=1&pageSize=100');
      setUsers(data.items ?? []);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to load users.' });
    } finally {
      setLoadingUsers(false);
    }
  }

  async function loadRoles() {
    try {
      const data = await apiGet<{ items: RoleRow[] }>('/api/roles');
      setRoles(data.items ?? []);
    } catch {
      // keep fallback roles silently
    }
  }

  async function loadCurrentUser() {
    try {
      const data = await apiGet<SessionUserPayload>('/api/auth/session');
      setCurrentUserId(data.user?.id ?? null);
    } catch {
      setCurrentUserId(null);
    }
  }

  useEffect(() => {
    void loadUsers();
    void loadRoles();
    void loadCurrentUser();
  }, []);

  const onSaveUser = async () => {
    setMessage(null);

    const name = form.fullName.trim();
    const email = form.email.trim();
    const password = form.password;
    const roleKey = form.roleKeys[0];

    if (name.length < 2) {
      setMessage({ type: 'error', text: 'Full name must be at least 2 characters.' });
      return;
    }
    if (!email.includes('@')) {
      setMessage({ type: 'error', text: 'Please provide a valid email address.' });
      return;
    }
    if (!roleKey) {
      setMessage({ type: 'error', text: 'Please select a role.' });
      return;
    }
    if (!isEditing && password.length < 12) {
      setMessage({ type: 'error', text: 'Password must be at least 12 characters.' });
      return;
    }

    setSavingUser(true);
    try {
      if (editingId) {
        await apiMutate(`/api/users/${editingId}`, 'PATCH', {
          fullName: name,
          email,
          password: password.trim() ? password : undefined,
          roleKeys: [roleKey],
          isActive: form.isActive,
        });
        setMessage({ type: 'success', text: 'User updated successfully.' });
      } else {
        await apiMutate('/api/users', 'POST', {
          fullName: name,
          email,
          password,
          roleKeys: [roleKey],
        });
        setMessage({ type: 'success', text: 'User created successfully.' });
      }

      await loadUsers();
      resetUserForm();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save user.' });
    } finally {
      setSavingUser(false);
    }
  };

  const onEditUser = (user: UserRow) => {
    setEditingId(user.id);
    setForm({
      fullName: user.fullName,
      email: user.email,
      password: '',
      roleKeys: [user.userRoles[0]?.role.key ?? 'EDITOR'],
      isActive: user.isActive,
    });
    setMessage(null);
  };

  const onDeleteUser = async (user: UserRow) => {
    if (currentUserId && user.id === currentUserId) {
      setMessage({ type: 'error', text: 'You cannot delete your own account.' });
      return;
    }

    if (!window.confirm(`Delete "${user.fullName}"?`)) return;

    setDeletingUserId(user.id);
    try {
      await apiMutate(`/api/users/${user.id}`, 'DELETE');
      setMessage({ type: 'success', text: 'User deleted successfully.' });
      await loadUsers();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to delete user.' });
    } finally {
      setDeletingUserId(null);
    }
  };

  // Always include fallback roles, even if DB returns a partial role list.
  const roleChoices: RoleType[] = useMemo(() => {
    const merged = [...fallbackRoleOptions, ...roles.map((r) => r.key)];
    return Array.from(new Set(merged)) as RoleType[];
  }, [roles]);

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-bold">User Management</h1>

      {message ? (
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
      ) : null}

      <div className="space-y-3 rounded-lg border bg-white p-4">
        <h2 className="font-semibold">{isEditing ? 'Update User' : 'Create User'}</h2>

        <Input
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
        />
        <Input
          placeholder={isEditing ? 'Password (optional to keep existing)' : 'Password (min 12 chars)'}
          type="password"
          value={form.password}
          onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
        />

        <label className="text-sm font-medium">Role</label>
        <select
          className="w-full rounded border p-2"
          value={form.roleKeys[0]}
          onChange={(e) => setForm((v) => ({ ...v, roleKeys: [e.target.value as RoleType] }))}
        >
          {roleChoices.map((role) => (
            <option key={role} value={role}>
              {roleLabel[role]}
            </option>
          ))}
        </select>

        {isEditing ? (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((v) => ({ ...v, isActive: e.target.checked }))}
            />
            Active
          </label>
        ) : null}

        <div className="flex gap-2">
          <Button type="button" onClick={onSaveUser} disabled={savingUser}>
            {savingUser ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
          </Button>
          {isEditing ? (
            <Button type="button" variant="secondary" onClick={resetUserForm} disabled={savingUser}>
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
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr><td className="p-4 text-slate-500" colSpan={5}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td className="p-4 text-slate-500" colSpan={5}>No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.userRoles.map((r) => r.role.key).join(', ') || '-'}</td>
                  <td className="p-3">{user.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="p-3 flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => onEditUser(user)}>
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => onDeleteUser(user)}
                      disabled={deletingUserId === user.id || currentUserId === user.id}
                      title={currentUserId === user.id ? 'You cannot delete your own account.' : 'Delete user'}
                    >
                      {deletingUserId === user.id ? 'Deleting...' : 'Delete'}
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