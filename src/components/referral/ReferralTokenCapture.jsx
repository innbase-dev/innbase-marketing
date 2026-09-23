"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createReferralsTrpcClient } from "@/lib/trpc/referralsClient";

const STORAGE_KEY = "innbase_referral_token";

/**
 * ADD §32/§33: a referral link is an attribution AID, not attribution
 * truth -- Innbase staff still confirm attribution manually during
 * onboarding (ADD §8 Path B), and word-of-mouth without a link is
 * explicitly first-class. So this component does nothing visible and
 * creates no referral: it only validates the token (via the one public
 * query the backend exposes, `resolveReferralToken`) and remembers it
 * for the length of the visit, so that if the visitor later reaches
 * Innbase through Contact, staff have something to correlate.
 *
 * Deliberately NOT wired to any "create referral" call -- there is no
 * such public mutation on the backend, by design (ADD §40: no
 * self-service hotel signup, no automated attribution as sole source
 * of truth).
 */
export default function ReferralTokenCapture() {
  const searchParams = useSearchParams();
  const token = searchParams.get("ref");
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const client = createReferralsTrpcClient();

    // This lookup needs no session or React Query provider. Keep it separate
    // from page rendering so a backend outage cannot hide the landing page.
    client.referrals.resolveReferralToken
      .query({ referralToken: token }, { signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted && result?.referrerId) {
          sessionStorage.setItem(STORAGE_KEY, token);
        }
      })
      .catch(() => {
        // Invalid tokens, blocked storage and unavailable services are safe
        // to ignore here: Innbase staff still confirm attribution manually.
      });

    return () => controller.abort();
  }, [token]);

  return null;
}
