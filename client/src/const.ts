import { API_ORIGIN, apiUrl, appPath, HAS_PLATFORM_API } from "@/lib/runtime";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Start Google sign-in. The AiR server owns the whole flow: it mints the
// one-time nonce, sets the state cookie, and sends the browser to Google.
// Call this from an event handler or effect, e.g. `onClick={() => startLogin()}`.
export const startLogin = () => {
  if (!HAS_PLATFORM_API) {
    window.location.href = appPath("/launch");
    return;
  }

  const startUrl = new URL(apiUrl("/api/oauth/start"), API_ORIGIN || window.location.origin);
  const memberPath = /\/(dashboard|projects|learn|community|studio|members|trainers|present|onboarding)(\/|$)/.test(window.location.pathname);
  const destination = memberPath ? window.location.pathname + window.location.search : appPath(window.location.pathname.endsWith("/admin/login") ? "/admin" : "/dashboard");
  startUrl.searchParams.set("returnTo", new URL(destination, window.location.origin).toString());
  window.location.href = startUrl.toString();
};

// Every visible entry point is Google. Keep the intent explicit in the name.
export const startGoogleLogin = startLogin;
