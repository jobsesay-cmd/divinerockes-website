type AttemptState = {
  failures: number;
  firstFailureAt: number;
  lockUntil?: number;
};

const attemptsByPrincipal = new Map<string, AttemptState>();

export function getClientIp(forwardedForHeader: string | null): string {
  if (!forwardedForHeader) return 'unknown';
  return forwardedForHeader.split(',')[0]?.trim() || 'unknown';
}

export function getLockoutRemainingMs(principal: string): number {
  const state = attemptsByPrincipal.get(principal);
  if (!state?.lockUntil) return 0;
  return Math.max(0, state.lockUntil - Date.now());
}

export function registerLoginFailure(principal: string, threshold: number, lockoutMs: number): void {
  const now = Date.now();
  const state = attemptsByPrincipal.get(principal);

  if (!state) {
    attemptsByPrincipal.set(principal, {
      failures: 1,
      firstFailureAt: now,
    });
    return;
  }

  if (state.lockUntil && state.lockUntil > now) {
    return;
  }

  state.failures += 1;

  if (state.failures >= threshold) {
    state.lockUntil = now + lockoutMs;
  }

  attemptsByPrincipal.set(principal, state);
}

export function clearLoginFailures(principal: string): void {
  attemptsByPrincipal.delete(principal);
}