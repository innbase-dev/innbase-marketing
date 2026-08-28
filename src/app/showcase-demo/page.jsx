import { FixIssuesScene } from '@/showcase/scenes/fix-issues-scene';

export const metadata = {
    title: 'Showcase demo — internal',
    robots: { index: false, follow: false },
};

export default function ShowcaseDemoPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0b0e13', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
            <div style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
                <FixIssuesScene />
            </div>
        </div>
    );
}
