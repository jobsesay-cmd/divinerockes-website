type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function assertSafeApiPath(path: string): string {
  if (path.startsWith('/')) {
    if (!path.startsWith('/api/')) {
      throw new Error('Only /api/* paths are allowed');
    }
    return path;
  }

  let url: URL;
  try {
    url = new URL(path);
  } catch {
    throw new Error('Invalid API path');
  }

  const appBase = process.env.NEXT_PUBLIC_APP_URL;
  if (!appBase) {
    throw new Error('NEXT_PUBLIC_APP_URL is required for absolute API URL validation');
  }

  const base = new URL(appBase);
  if (url.origin !== base.origin) {
    throw new Error('Cross-origin API calls are not allowed');
  }

  if (!url.pathname.startsWith('/api/')) {
    throw new Error('Only /api/* paths are allowed');
  }

  return url.toString();
}

async function parseJsonSafe(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiClient<TResponse>(
  path: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  headers?: HeadersInit
): Promise<TResponse> {
  const safePath = assertSafeApiPath(path);

  const res = await fetch(safePath, {
    method,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...(headers ?? {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const payload = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(payload?.error?.message ?? 'Request failed');
  }

  if (!payload?.success) {
    throw new Error(payload?.error?.message ?? 'Request failed');
  }

  return payload.data as TResponse;
}

// ---- Compatibility exports expected by existing code ----
export function apiGet<TResponse>(path: string, headers?: HeadersInit): Promise<TResponse> {
  return apiClient<TResponse>(path, 'GET', undefined, headers);
}

export function apiPost<TResponse>(path: string, body?: unknown, headers?: HeadersInit): Promise<TResponse> {
  return apiClient<TResponse>(path, 'POST', body, headers);
}

export function apiPut<TResponse>(path: string, body?: unknown, headers?: HeadersInit): Promise<TResponse> {
  return apiClient<TResponse>(path, 'PUT', body, headers);
}

export function apiPatch<TResponse>(path: string, body?: unknown, headers?: HeadersInit): Promise<TResponse> {
  return apiClient<TResponse>(path, 'PATCH', body, headers);
}

export function apiDelete<TResponse>(path: string, body?: unknown, headers?: HeadersInit): Promise<TResponse> {
  return apiClient<TResponse>(path, 'DELETE', body, headers);
}

export async function serverApiClient<TResponse>(base: string, path: string, init?: RequestInit): Promise<TResponse> {
  if (!base) throw new Error('Missing server API base URL');

  const url = new URL(path, base);
  const baseUrl = new URL(base);

  if (url.origin !== baseUrl.origin) {
    throw new Error('Cross-origin server API calls are not allowed');
  }

  if (!url.pathname.startsWith('/api/')) {
    throw new Error('Only /api/* paths are allowed');
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const payload = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(payload?.error?.message ?? 'Request failed');
  }

  if (!payload?.success) {
    throw new Error(payload?.error?.message ?? 'Request failed');
  }

  return payload.data as TResponse;
}