export function buildOAuthLoginUrl(
  portalUrl: string,
  appId: string,
  redirectUri: string,
  state: string,
) {
  const url = new URL("/login", portalUrl);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("redirect_url", redirectUri);
  url.searchParams.set("state", state);
  return url.toString();
}
