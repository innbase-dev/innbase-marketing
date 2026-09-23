/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  /* config options here */
  async redirects() {
    return [
      // Referral naming standardization (Sept 2026): the public referral
      // landing page moved from /refer-hotels to /refer, and the
      // authenticated referrer dashboard moved from /refer to /refer/portal
      // (Clerk auth is now scoped to /refer/portal, /refer/sign-in, and
      // /refer/sign-up only — never the main platform).
      {
        source: "/refer-hotels",
        destination: "/refer",
        permanent: true,
      },
      {
        source: "/refer/referrals/:path*",
        destination: "/refer/portal/referrals/:path*",
        permanent: true,
      },
      {
        source: "/refer/rewards",
        destination: "/refer/portal/rewards",
        permanent: true,
      },
      {
        source: "/refer/account",
        destination: "/refer/portal/account",
        permanent: true,
      },
      {
        source: "/refer/help",
        destination: "/refer/portal/help",
        permanent: true,
      },
      {
        source: "/sign-in/:path*",
        destination: "/refer/sign-in/:path*",
        permanent: true,
      },
      {
        source: "/sign-up/:path*",
        destination: "/refer/sign-up/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
