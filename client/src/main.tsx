import { trpc } from '@/lib/trpc';
import { SESSION_STORAGE_KEY, UNAUTHED_ERR_MSG } from '@shared/const';
import { getAuthReturnErrorMessage } from '@shared/auth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import superjson from "superjson";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";
import { apiUrl, HAS_PLATFORM_API } from "./lib/runtime";

// Legacy links: the site used to live at borngifted.github.io/air/. GitHub
// forwards those to aireadiness.me/air/..., so drop the old prefix here.
if (import.meta.env.BASE_URL === "/" && /^\/air(\/|$)/.test(window.location.pathname)) {
  const stripped = window.location.pathname.replace(/^\/air/, "") || "/";
  window.history.replaceState({}, document.title, `${stripped}${window.location.search}${window.location.hash}`);
}

const hashParams = new URLSearchParams(window.location.hash.slice(1));
const sessionFromHash = hashParams.get("air_session");
const authReturnError = getAuthReturnErrorMessage(hashParams.get("air_auth_error"));
if (sessionFromHash) {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionFromHash);
    window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
  } catch {}
}

if (authReturnError) {
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
}

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsWebsiteId) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;
  document.head.appendChild(script);
}

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!HAS_PLATFORM_API) return;
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  startLogin();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl("/api/trpc"),
      transformer: superjson,
      headers() {
        // Cross-origin frontend (GitHub Pages): the sign-in callback hands the
        // session over in the URL fragment and we keep it in sessionStorage,
        // forwarding it as a Bearer token. Same-origin deployments rely on the
        // session cookie, which the server checks first.
        try {
          const token = sessionStorage.getItem(SESSION_STORAGE_KEY);
          if (token) {
            return { Authorization: `Bearer ${token}` };
          }
        } catch {
          // sessionStorage unavailable
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);

if (authReturnError) {
  window.setTimeout(() => toast.error(authReturnError), 0);
}
