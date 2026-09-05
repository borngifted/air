export const IS_GITHUB_PAGES = import.meta.env.VITE_GITHUB_PAGES === "true";
export const API_ORIGIN = String(import.meta.env.VITE_API_ORIGIN ?? "").replace(/\/$/, "");
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
