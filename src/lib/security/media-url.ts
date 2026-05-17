import { securityConfig } from '@/lib/security/config';

export function isAllowedMediaUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }

  if (url.protocol !== 'https:') return false;

  const host = url.hostname.toLowerCase();
  return securityConfig.allowedMediaHosts.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`)
  );
}