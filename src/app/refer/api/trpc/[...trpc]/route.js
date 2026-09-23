import { auth, currentUser } from "@clerk/nextjs/server";
import { createReferralProxy } from "@/lib/referralProxy";

async function identityHeaders() {
  const { userId, getToken } = await auth();
  if (!userId) return null;
  const token = await getToken();
  if (!token) return null;
  const headers = { authorization: `Bearer ${token}` };

  // Compatibility with the supplied development API only. The public API must
  // verify the Bearer token itself; a browser must never supply these headers.
  if (process.env.INNBASE_REFERRALS_DEV_IDENTITY === "true" && process.env.NODE_ENV !== "production") {
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) throw new Error("No primary email");
    headers["x-dev-clerk-user-id"] = userId;
    headers["x-dev-clerk-email"] = user.primaryEmailAddress.emailAddress;
    headers["x-dev-clerk-name"] = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.primaryEmailAddress.emailAddress;
  }
  return headers;
}

const forward = createReferralProxy({ getIdentityHeaders: identityHeaders, getBaseUrl: () => process.env.INNBASE_API_URL });
export { forward as GET, forward as POST };
