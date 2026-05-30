import type { ApiResponse } from '@/types/api';

function getCsrfFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((item) => item.startsWith('dr_csrf='))
    ?.split('=')[1];
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  if (typeof window !== 'undefined') {
    return path;
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  return `${base}${path}`;
}

async function parseError(res: Response): Promise<string> {
  const payload = await res.json().catch(() => null);
  return payload?.error?.message ?? payload?.message ?? `Request failed: ${res.status}`;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(buildUrl(path), {
    ...init,
    credentials: 'include',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const csrf = getCsrfFromCookie();
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return ((await res.json()) as ApiResponse<T>).data;
}


export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const csrf = getCsrfFromCookie();
  const res = await fetch(buildUrl(path), {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return ((await res.json()) as ApiResponse<T>).data;
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  const csrf = getCsrfFromCookie();
  const res = await fetch(buildUrl(path), {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  return json?.data as T;
}