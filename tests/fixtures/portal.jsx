import React from 'react';
import { createRoot } from 'react-dom/client';
import { usePathname } from './next-navigation';
import ReferralsTrpcProvider from '../../src/components/referral/ReferralsTrpcProvider';
import PortalShell from '../../src/components/referral/PortalShell';
import OverviewPage from '../../src/components/referral/OverviewPage';
import ReferralsPage from '../../src/components/referral/ReferralsPage';
import ReferralDetail from '../../src/components/referral/ReferralDetail';
import RewardsPage from '../../src/components/referral/RewardsPage';
import AccountPage from '../../src/components/referral/AccountPage';
import HelpPage from '../../src/components/referral/HelpPage';
import ReferralTokenCapture from '../../src/components/referral/ReferralTokenCapture';
import '../../src/app/marketing.css';
import '../../src/app/refer/(auth)/portal/portal.css';

function App() {
  const path = usePathname();
  if (path === '/refer') return <main><h1>Public referral fixture</h1><ReferralTokenCapture /></main>;
  const pages = {
    '/refer/portal': <OverviewPage />,
    '/refer/portal/referrals': <ReferralsPage />,
    '/refer/portal/rewards': <RewardsPage />,
    '/refer/portal/account': <AccountPage />,
    '/refer/portal/help': <HelpPage />,
  };
  return <PortalShell>{pages[path] || <ReferralDetail id={decodeURIComponent(path.split('/').at(-1))} />}</PortalShell>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><ReferralsTrpcProvider><App /></ReferralsTrpcProvider></React.StrictMode>);
