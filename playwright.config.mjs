import { defineConfig } from '@playwright/test';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
// Synthetic keys exercise the real SDK's signed-out routing only. They do
// not identify a Clerk application or create a session, and live only in tests.
const anonymousClerkKey = `pk_live_${Buffer.from('clerk.referral-test.example$').toString('base64')}`;
export default defineConfig({
  testDir: './tests/browser', timeout: 30000, workers: 1, fullyParallel: false,
  reporter: [['list'], ['json', {outputFile:'test-results/referral-report.json'}]],
  use: {baseURL:'http://127.0.0.1:3036',viewport:{width:1440,height:1000},trace:'retain-on-failure',screenshot:'only-on-failure',
    launchOptions: executablePath ? {executablePath,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote']} : {}},
  webServer: [
    {command:'npm run start -- --hostname 127.0.0.1 --port 3035',url:'http://127.0.0.1:3035',reuseExistingServer:false,env:{NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:'',CLERK_SECRET_KEY:'',INNBASE_API_URL:'http://127.0.0.1:3036'}},
    {command:'node tests/fixtures/server.mjs',url:'http://127.0.0.1:3036',reuseExistingServer:false},
    // Keep the bind hostname and URL identical: Clerk normalizes numeric
    // loopback hosts to localhost when constructing its internal rewrite.
    {command:'npm run start -- --hostname localhost --port 3037',url:'http://localhost:3037',reuseExistingServer:false,env:{NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:anonymousClerkKey,CLERK_SECRET_KEY:'sk_live_synthetic_test_only_not_a_real_secret',NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED:'true'}},
  ],
});
