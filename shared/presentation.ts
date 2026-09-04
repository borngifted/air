export type AirTheme = "light" | "dark";

export function resolveAirTheme(stored: string | null, _prefersLight: boolean, fallback: AirTheme = "dark"): AirTheme {
  if (stored === "light" || stored === "dark") return stored;
  return fallback;
}

export function clampPresentationIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(total - 1, Math.round(index)));
}

export function sceneFromHandX(x: number, total: number) {
  const normalized = Math.max(0, Math.min(1, x));
  return clampPresentationIndex(normalized * (total - 1), total);
}

export function formatPresentationTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  return `${minutes}:${(safe % 60).toString().padStart(2, "0")}`;
}
