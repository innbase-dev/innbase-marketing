"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, createReferralsTrpcClient } from "@/lib/trpc/referralsClient";

/**
 * Wraps the /refer/(auth) pages (sign-in, sign-up and portal) with the
 * tRPC + React Query providers the referral portal needs.
 *
 * `@tanstack/react-query` was already a declared dependency of this repo
 * but unused anywhere -- this is that dependency finally doing its job,
 * not a new addition. Scoped to /refer only; the rest of the marketing
 * site has no reason to pay for a QueryClient.
 *
 * Client and queryClient are created once per mount via useState's lazy
 * initializer, per the standard React Query SSR guidance -- creating
 * them at module scope would leak cached data between different
 * visitors on the server.
 */
export default function ReferralsTrpcProvider({ children }) {
  const { userId } = useAuth();
  return <SessionProvider key={userId ?? "anonymous"}>{children}</SessionProvider>;
}

function SessionProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createReferralsTrpcClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
