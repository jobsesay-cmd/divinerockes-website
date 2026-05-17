const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^\[?::1\]?$/i,
];

function isPrivateHost(hostname: string): boolean {
  return PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

/**
 * Validate outbound URLs to reduce SSRF risk.
 * - Enforces https
 * - Enforces hostname allowlist
 * - Blocks localhost/private ranges
 */
export function assertSafeOutboundUrl(rawUrl: string, allowedHostnames: string[]): URL {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error('Invalid URL');
  }

  if (url.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs are allowed');
  }

  if (isPrivateHost(url.hostname)) {
    throw new Error('Private/loopback hosts are not allowed');
  }

  const allowed = allowedHostnames.some(
    (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
  );

  if (!allowed) {
    throw new Error('Host is not allowlisted');
  }

  return url;
}