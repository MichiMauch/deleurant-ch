/**
 * Client-side tracker for in-flight save requests.
 *
 * Inline-editable fields (text, rich-text, image, …) write to /api/save-content
 * asynchronously on blur. List-management actions (add item, remove item) need
 * to wait for those saves to land before posting the full array — otherwise
 * the bulk-save races with the per-field save and one of them clobbers the
 * other.
 *
 * Usage:
 *   - On blur, call `trackSave(fetch(...))` to register the promise.
 *   - Before a bulk save, call `await waitForPendingSaves()` to drain.
 */

let pending = 0;
const listeners = new Set<() => void>();

export function trackSave<T>(promise: Promise<T>): Promise<T> {
  pending += 1;
  promise.finally(() => {
    pending -= 1;
    if (pending === 0) {
      for (const cb of listeners) cb();
    }
  });
  return promise;
}

export function waitForPendingSaves(): Promise<void> {
  if (pending === 0) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const cb = () => {
      if (pending === 0) {
        listeners.delete(cb);
        resolve();
      }
    };
    listeners.add(cb);
  });
}
