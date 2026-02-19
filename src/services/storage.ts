// EM Decision Trees — LocalStorage Wrapper
// Safe JSON-based storage with error handling.

/** Read a value from LocalStorage, parsed from JSON. Returns fallback on error. */
export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Write a value to LocalStorage as JSON. */
export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
    console.warn(`Failed to save to localStorage key: ${key}`);
  }
}

/** Remove a key from LocalStorage. */
export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Fail silently
  }
}
