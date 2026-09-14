import { useState } from "react";

export const PROJECT_DRAFT_PREFIX = "air_project_draft:";

// Only restore the expected tree of strings. Stored browser data is untrusted.
function matchesShape(value: unknown, shape: unknown): boolean {
  if (typeof shape === "string") return typeof value === "string";
  if (
    !value ||
    typeof value !== "object" ||
    !shape ||
    typeof shape !== "object"
  )
    return false;
  return Object.entries(shape).every(([key, child]) =>
    matchesShape((value as Record<string, unknown>)[key], child)
  );
}

export function useProjectDraft<T>(identity: string, initial: T) {
  const key = PROJECT_DRAFT_PREFIX + identity;
  const [value, setValue] = useState<T>(() => {
    try {
      const stored: unknown = JSON.parse(sessionStorage.getItem(key) || "null");
      if (matchesShape(stored, initial)) return stored as T;
    } catch {
      /* Storage may be disabled. The save-to-account action still works. */
    }
    return initial;
  });
  const [savedValue, setSavedValue] = useState(initial);
  function update(next: T) {
    setValue(next);
    try {
      sessionStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }
  function clear() {
    setSavedValue(value);
    try {
      sessionStorage.removeItem(key);
    } catch {}
  }
  return {
    value,
    update,
    clear,
    dirty: JSON.stringify(value) !== JSON.stringify(savedValue),
  };
}
