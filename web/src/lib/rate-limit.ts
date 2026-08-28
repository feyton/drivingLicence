// Minimal fixed-window rate limiter. In-memory is fine for a single pm2 process;
// swap the store for Redis/Mongo if the app ever runs clustered.
const windows = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const w = windows.get(key);
  if (!w || w.resetAt < now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  w.count++;
  if (w.count > limit) return { ok: false, remaining: 0 };
  return { ok: true, remaining: limit - w.count };
}

// Periodic cleanup so the map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [k, w] of windows) if (w.resetAt < now) windows.delete(k);
}, 60_000).unref?.();
