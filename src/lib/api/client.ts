import type { ApiResponse } from '@/types/api';

function getCsrfFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((item) => item.startsWith('dr_csrf='))
    ?.split('=')[1];
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${base}${path}`, {
    ...init,
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const csrf = getCsrfFromCookie();
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error?.message ?? `Request failed: ${res.status}`);
  }

  return ((await res.json()) as ApiResponse<T>).data;
}
