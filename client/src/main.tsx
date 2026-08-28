import { COOKIE_NAME } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") console.error("[API Query Error]", event.query.state.error);
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") console.error("[API Mutation Error]", event.mutation.state.error);
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        try {
          const raw = sessionStorage.getItem("manus-cookie");
          if (raw) {
            const prefix = `${COOKIE_NAME}=`;
            const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
            const token = pair?.trim().slice(prefix.length);
            if (token) return { Authorization: `Bearer ${token}` };
          }
        } catch {
          // The demo works without a session token.
        }
        return {};
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(<QueryClientProvider client={queryClient}><trpc.Provider client={trpcClient} queryClient={queryClient}><App /></trpc.Provider></QueryClientProvider>);
