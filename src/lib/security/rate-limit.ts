const requestStore = new Map<string, number[]>();

export function isRateLimited(key: string, windowMs = 60_000, max = 60): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (requestStore.get(key) ?? []).filter((ts) => ts > windowStart);
  hits.push(now);
  requestStore.set(key, hits);
  return hits.length > max;
}
