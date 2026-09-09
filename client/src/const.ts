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
  startUrl.searchParams.set("returnTo", window.location.href);
  window.location.href = startUrl.toString();
};

// Every visible entry point is Google. Keep the intent explicit in the name.
export const startGoogleLogin = startLogin;
