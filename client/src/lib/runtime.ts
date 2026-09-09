type AirRuntimeConfig = { apiOrigin?: string };

// Optional runtime override. The published static site ships an editable
// `air-config.js` that sets `window.AIR_CONFIG = { apiOrigin: "https://..." }`
// so the frontend can be pointed at a new AiR server without rebuilding.
const runtimeConfig: AirRuntimeConfig =
  (typeof window !== "undefined" && (window as Window & { AIR_CONFIG?: AirRuntimeConfig }).AIR_CONFIG) || {};

export const IS_GITHUB_PAGES = import.meta.env.VITE_GITHUB_PAGES === "true";
export const API_ORIGIN = String(runtimeConfig.apiOrigin || import.meta.env.VITE_API_ORIGIN || "").replace(/\/$/, "");
export const HAS_PLATFORM_API = !IS_GITHUB_PAGES || Boolean(API_ORIGIN);

export function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${normalized}`;
}

export function appPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${normalized}` || "/";
}
