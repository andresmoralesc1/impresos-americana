/**
 * Safely trigger ultra-short mobile haptic feedback via the Web Vibration API.
 * Gracefully no-ops in unsupported desktop or restricted environments.
 */
export function triggerHaptic(durationMs: number = 10) {
  if (typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Silently ignore if blocked by permissions policy
    }
  }
}
