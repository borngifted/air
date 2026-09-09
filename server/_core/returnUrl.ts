/**
 * Where may the sign-in flow send a browser back to? Only origins the operator
 * has declared: the public frontend, the API host itself (single-host
 * deployments), and the GitHub Pages site.
 */
export const DEFAULT_ALLOWED_RETURNS = ["https://borngifted.github.io/air/"] as const;

export function resolveAllowedReturns(input: { frontendOrigin?: string; publicApiOrigin?: string }) {
  return [input.frontendOrigin, input.publicApiOrigin, ...DEFAULT_ALLOWED_RETURNS]
    .filter((value): value is string => Boolean(value && value.trim().length > 0));
}

export function safeReturnUrl(raw: string | undefined, allowed: readonly string[]): string | undefined {
  if (!raw) return undefined;
  try {
    const target = new URL(raw);
    if (target.protocol !== "https:" && target.hostname !== "localhost" && target.hostname !== "127.0.0.1") {
      return undefined;
    }
    const permitted = allowed.some(value => {
      try {
        const base = new URL(value);
        const basePath = base.pathname.endsWith("/") ? base.pathname : `${base.pathname}/`;
        return target.origin === base.origin
          && (target.pathname === base.pathname || target.pathname.startsWith(basePath));
      } catch {
        return false;
      }
    });
    return permitted ? target.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function resolveAllowedOrigins(allowedReturns: readonly string[]) {
  const origins = new Set<string>();
  for (const value of allowedReturns) {
    try {
      origins.add(new URL(value).origin);
    } catch {
      // ignore malformed entries
    }
  }
  return origins;
}
