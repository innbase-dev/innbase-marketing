export default function HeroDashboard() {
  return (
    <div className="hero-visual reveal in" style={{transitionDelay: '.36s'}}>
      <div className="hero-dash rh-hero-dash">
        <svg className="rh-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated preview of the Innbase reconciliation workspace matching a bank transfer to a guest booking">
          <title>Innbase — Reconciliation, live</title>
          {/* ═══ background ═══ */}
          <rect className="rh-bg" x={0} y={0} width={1000} height={600} />
          {/* ═══ sidebar rail ═══ */}
          <rect className="rh-sidebar-bg" x={0} y={0} width={56} height={600} />
          <rect x={16} y={20} width={24} height={24} rx={7} fill="var(--rh-sidebar-ic)" />
          <circle cx={28} cy={156} r={16} fill="var(--rh-accent)" opacity=".16" />
          {/* sidebar nav icons (lucide) */}
          <g fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            {/* 1. Dashboard */}
            <g transform="translate(18,66) scale(0.8333)" stroke="var(--rh-sidebar-ic)">
              <rect width={7} height={9} x={3} y={3} rx={1} />
              <rect width={7} height={5} x={14} y={3} rx={1} />
              <rect width={7} height={9} x={14} y={12} rx={1} />
              <rect width={7} height={5} x={3} y={16} rx={1} />
            </g>
            {/* 2. Calendar (Cog) */}
            <g transform="translate(18,106) scale(0.8333)" stroke="var(--rh-sidebar-ic)">
              <path d="m15.228 16.852-.923-.383" />
              <path d="m15.228 19.148-.923.383" />
              <path d="M16 2v4" />
              <path d="m16.47 14.305.382.923" />
              <path d="m16.852 20.772-.383.924" />
              <path d="m19.148 15.228.383-.923" />
              <path d="m19.53 21.696-.382-.924" />
              <path d="m20.772 16.852.924-.383" />
              <path d="m20.772 19.148.924.383" />
              <path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
              <path d="M3 10h18" />
              <path d="M8 2v4" />
              <circle cx={18} cy={18} r={3} />
            </g>
            {/* 3. Finance (Landmark) — active */}
            <g transform="translate(18,146) scale(0.8333)" stroke="var(--rh-accent)">
              <path d="M10 18v-7" />
              <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
              <path d="M14 18v-7" />
              <path d="M18 18v-7" />
              <path d="M3 22h18" />
              <path d="M6 18v-7" />
            </g>
            {/* 4. Truck */}
            <g transform="translate(18,186) scale(0.8333)" stroke="var(--rh-sidebar-ic)">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx={17} cy={18} r={2} />
              <circle cx={7} cy={18} r={2} />
            </g>
            {/* 5. Users */}
            <g transform="translate(18,226) scale(0.8333)" stroke="var(--rh-sidebar-ic)">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx={9} cy={7} r={4} />
            </g>
          </g>
          <line x1={14} y1={256} x2={42} y2={256} className="rh-line" />
          <circle cx={28} cy={566} r={13} fill="url(#rhAvaGrad)" />
          <text x={28} y={570} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={700}>A</text>
          {/* ═══ top bar ═══ */}
          <text x={84} y={48} fontSize={14}>
            <tspan className="rh-muted">Commerce</tspan>
            <tspan className="rh-muted" dx={6}>/</tspan>
            <tspan className="rh-strong" dx={6}>Reconciliation</tspan>
          </text>
          <rect x={700} y={26} width={82} height={28} rx={8} className="rh-btn-ghost" />
          <text x={741} y={44} textAnchor="middle" className="rh-t" fontSize="11.5" fontWeight={700}>Export</text>
          <rect x={792} y={26} width={180} height={28} rx={8} className="rh-btn-dark" />
          <text x={882} y={44} textAnchor="middle" fill="var(--rh-white)" fontSize="11.5" fontWeight={700}>✨ Accept all matches</text>
          {/* ═══ commerce health strip ═══ */}
          <rect className="rh-panel" x={84} y={70} width={888} height={56} rx={10} />
          <g transform="translate(128,98)">
            <circle r={17} fill="none" stroke="var(--rh-border-soft)" strokeWidth={5} />
            <circle r={17} fill="none" stroke="var(--rh-green)" strokeWidth={5} strokeLinecap="round" strokeDasharray="106.8" strokeDashoffset="2.1" transform="rotate(-90)" />
          </g>
          <text x={156} y={92} className="rh-muted" fontSize="8.5" letterSpacing="0.4">COMMERCE
            HEALTH</text>
          <text x={156} y={108} className="rh-strong" fontSize="13.5">Excellent</text>
          <g fontSize={11} className="rh-t">
            <g transform="translate(340,98)">
              <circle r={4} className="rh-green-fill" /><text x={12} y={4}>Sales balanced</text>
            </g>
            <g transform="translate(548,98)">
              <circle r={4} className="rh-green-fill" /><text x={12} y={4}>Payments reconciled</text>
            </g>
            <g transform="translate(766,98)">
              <circle r={4} className="rh-green-fill" /><text style={{display: 'none'}} x={12} y={4}>No
                duplicate settlements</text>
            </g>
          </g>
          <text x={956} y={94} textAnchor="end" className="rh-strong rh-mono" fontSize={18}>98.2%</text>
          <text x={956} y={110} textAnchor="end" className="rh-muted" fontSize={9}>reconciliation
            complete</text>
          {/* ═══ KPI row ═══ */}
          <g>
            <rect className="rh-panel" x={84} y={142} width={210} height={68} rx={10} />
            <text x={100} y={164} className="rh-muted" fontSize="8.5" letterSpacing="0.4">TODAY&apos;S
              MATCH RATE</text>
            <text x={100} y={192} className="rh-strong rh-mono" fontSize={18}>98.2%</text>
          </g>
          <g className="rh-kpi-bump" style={{transformOrigin: '415px 176px'}}>
            <rect className="rh-panel" x={310} y={142} width={210} height={68} rx={10} />
            <text x={326} y={164} className="rh-muted" fontSize="8.5" letterSpacing="0.4">MATCHED</text>
            <text className="rh-fade-old rh-strong rh-mono" x={326} y={192} fontSize={18} fill="var(--rh-text-strong)">₦8.23M</text>
            <text className="rh-fade-new rh-mono" x={326} y={192} fontWeight={700} fontSize={18} fill="var(--rh-text-strong)" opacity={0}>₦8.24M</text>
          </g>
          <g>
            <rect className="rh-panel" x={536} y={142} width={210} height={68} rx={10} />
            <text x={552} y={164} className="rh-muted" fontSize="8.5" letterSpacing="0.4">NEEDS
              REVIEW</text>
            <text className="rh-fade-old rh-mono" x={552} y={192} fontWeight={700} fontSize={18} fill="var(--rh-amber)">₦59,100</text>
            <text className="rh-fade-new rh-mono" x={552} y={192} fontWeight={700} fontSize={18} fill="var(--rh-amber)" opacity={0}>₦46,800</text>
            <text className="rh-fade-old rh-muted" x={552} y={204} fontSize={8}>5 open items</text>
            <text className="rh-fade-new rh-muted" x={552} y={204} fontSize={8} opacity={0}>4 open
              items</text>
          </g>
          <g>
            <rect className="rh-panel" x={762} y={142} width={210} height={68} rx={10} />
            <text x={778} y={164} className="rh-muted" fontSize="8.5" letterSpacing="0.4">AI
              SUGGESTIONS</text>
            <text x={778} y={192} fontWeight={700} fontSize={18} className="rh-mono rh-strong">4</text>
            <text x={778} y={204} className="rh-muted" fontSize={8}>of 5 open items</text>
          </g>
          {/* ═══ workspace: queue / matching / inspector ═══ */}
          <rect className="rh-panel" x={84} y={224} width={230} height={368} rx={10} />
          <rect className="rh-panel" x={330} y={224} width={360} height={368} rx={10} />
          <rect className="rh-panel" x={706} y={224} width={266} height={368} rx={10} />
          {/* left: queue */}
          <text x={100} y={252} className="rh-strong" fontSize="12.5">Needs Review</text>
          <rect className="rh-fade-old" x={266} y={240} width={32} height={17} rx="8.5" fill="var(--rh-amber-soft)" />
          <text className="rh-fade-old" x={282} y={252} textAnchor="middle" fontSize="9.5" fontWeight={700} fill="var(--rh-amber)">5</text>
          <rect className="rh-fade-new" x={266} y={240} width={32} height={17} rx="8.5" fill="var(--rh-amber-soft)" opacity={0} />
          <text className="rh-fade-new" x={282} y={252} textAnchor="middle" fontSize="9.5" fontWeight={700} fill="var(--rh-amber)" opacity={0}>4</text>
          <line x1={100} y1={266} x2={298} y2={266} className="rh-line" />
          <g className="rh-row-bump">
            <rect className="rh-fillsoft-toGreen" x={96} y={268} width={206} height={56} rx={8} fill="var(--rh-accent-soft)" />
            <rect className="rh-fill-toGreen" x={96} y={268} width={3} height={56} fill="var(--rh-accent)" />
            <text x={112} y={284} className="rh-strong" fontSize={12}>A. Bello</text>
            <text x={286} y={284} textAnchor="end" className="rh-strong rh-mono" fontSize={12}>₦12,300</text>
            <text x={112} y={300} className="rh-muted" fontSize="9.5">UBA · Bank Transfer</text>
            <g className="rh-fade-old">
              <circle cx={115} cy={313} r={3} className="rh-accent-fill" />
              <text x={122} y={317} fontSize={9} fontWeight={700} fill="var(--rh-accent)">Matching…</text>
            </g>
            <g className="rh-fade-new" opacity={0}>
              <circle cx={115} cy={313} r={3} className="rh-green-fill" />
              <text x={122} y={317} fontSize={9} fontWeight={700} fill="var(--rh-green)">✓
                Matched</text>
            </g>
          </g>
          <g>
            <text x={112} y={350} className="rh-strong" fontSize={12}>Chidinma O.</text>
            <text x={286} y={350} textAnchor="end" className="rh-strong rh-mono" fontSize={12}>₦61,000</text>
            <text x={112} y={366} className="rh-muted" fontSize="9.5">GTBank · Transfer · 91%</text>
          </g>
          <g>
            <text x={112} y={416} className="rh-strong" fontSize={12}>Card •••• 4432</text>
            <text x={286} y={416} textAnchor="end" className="rh-strong rh-mono" fontSize={12}>₦12,000</text>
            <text x={112} y={432} className="rh-muted" fontSize="9.5">Moniepoint · Possible
              duplicate</text>
          </g>
          <g>
            <text x={112} y={482} className="rh-strong" fontSize={12}>Unknown Sender</text>
            <text x={286} y={482} textAnchor="end" className="rh-strong rh-mono" fontSize={12}>₦8,600</text>
            <text x={112} y={498} className="rh-muted" fontSize="9.5">Access Bank · No match yet</text>
          </g>
          <text x={100} y={572} className="rh-muted" fontSize="9.5">+1 more in queue</text>
          {/* center: matching workspace */}
          <text x={346} y={266} className="rh-strong rh-mono" fontSize={22}>₦12,300</text>
          <text x={346} y={284} className="rh-muted" fontSize="10.5">Bank Transfer · UBA · Today, 11:42
            AM</text>
          <rect x={346} y={294} width={240} height={22} rx={7} className="rh-btn-ghost" />
          <text x={358} y={309} className="rh-t rh-mono" fontSize="9.5">#TRF-28482 · from A. Bello</text>
          <text x={346} y={340} className="rh-muted" fontSize="9.5" letterSpacing="0.5">POSSIBLE
            MATCHES</text>
          <rect className="rh-fillsoft-toGreen rh-strokeline-toGreen" x={346} y={352} width={320} height={168} rx={10} fill="var(--rh-accent-soft)" stroke="var(--rh-accent-line)" strokeWidth="1.4" />
          <text x={362} y={378} className="rh-strong" fontSize="12.5">Aisha Bello · Booking
            LG-0109</text>
          <rect x={590} y={362} width={64} height={20} rx={7} fill="var(--rh-panel)" />
          <text x={622} y={376} textAnchor="middle" className="rh-strong rh-mono" fontSize="10.5" fill="var(--rh-accent)">98%</text>
          <rect x={362} y={398} width={288} height={5} rx="2.5" fill="var(--rh-border-soft)" />
          <rect className="rh-anim-bar" x={362} y={398} width={0} height={5} rx="2.5" fill="var(--rh-accent)" />
          <g className="rh-t" fontSize="10.5">
            <g transform="translate(366,424)">
              <circle r={4} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.2" />
              <path d="M-1.8,0 L-0.4,1.6 L2,-1.6" className="rh-check-ic" stroke="var(--rh-green)" />
              <text x={12} y="3.5">Same amount, received 2 min after invoice</text>
            </g>
            <g transform="translate(366,444)">
              <circle r={4} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.2" />
              <path d="M-1.8,0 L-0.4,1.6 L2,-1.6" className="rh-check-ic" stroke="var(--rh-green)" />
              <text x={12} y="3.5">Paid by transfer before</text>
            </g>
            <g transform="translate(366,464)">
              <circle r={4} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.2" />
              <path d="M-1.8,0 L-0.4,1.6 L2,-1.6" className="rh-check-ic" stroke="var(--rh-green)" />
              <text x={12} y="3.5">Reference contains booking ID</text>
            </g>
          </g>
          <g className="rh-anim-accept" style={{transformOrigin: '437px 503px'}}>
            <rect x={-75} y={-17} width={150} height={24} rx={4} className="rh-btn-dark" />
            <text x={0} y={-1} textAnchor="middle" fill="var(--rh-white)" fontSize="10.5" fontWeight={700}>✓ Accept match</text>
          </g>
          <rect x={524} y={486} width={88} height={24} rx={4} className="rh-btn-ghost" />
          <text x={568} y={502} textAnchor="middle" className="rh-t" fontSize={10} fontWeight={700}>Not
            right</text>
          <text x={346} y={538} className="rh-muted" fontSize="9.5">AI auto-matched 4 of 5 items
            today</text>
          <g className="rh-toast">
            <rect x={346} y={548} width={320} height={34} rx={8} fill="var(--rh-green-soft)" stroke="var(--rh-green-line)" />
            <circle cx={366} cy={565} r={7} fill="var(--rh-green)" />
            <path d="M363,565 l2,2.6 l4.5,-5.4" className="rh-check-ic" />
            <text x={380} y={569} fontSize="10.5" fontWeight={700} fill="var(--rh-green)">Accepted
              — matched to Booking LG-0109</text>
          </g>
          {/* right: inspector */}
          <text x={722} y={252} className="rh-strong" fontSize="12.5">Payment Journey</text>
          <line x1={722} y1={266} x2={956} y2={266} className="rh-line" />
          <line x1={732} y1={300} x2={732} y2={474} stroke="var(--rh-border-soft)" strokeWidth={2} />
          <g transform="translate(732,296)">
            <circle r={9} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.4" />
            <path d="M-3,0 L-1,2.4 L3.4,-3" className="rh-check-ic" stroke="var(--rh-green)" />
          </g>
          <text x={750} y={292} className="rh-strong" fontSize="10.5">Guest checked in</text>
          <text x={750} y={306} className="rh-muted" fontSize={9}>Booking LG-0109</text>
          <g transform="translate(732,356)">
            <circle r={9} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.4" />
            <path d="M-3,0 L-1,2.4 L3.4,-3" className="rh-check-ic" stroke="var(--rh-green)" />
          </g>
          <text x={750} y={352} className="rh-strong" fontSize="10.5">Payment imported</text>
          <text x={750} y={366} className="rh-muted" fontSize={9}>Today · 11:42 AM</text>
          <g transform="translate(732,416)">
            <circle r={9} fill="var(--rh-accent-soft)" stroke="var(--rh-accent)" strokeWidth="1.4" />
            <path d="M0,-3.4 C0.3,-1 1,-0.3 3.4,0 C1,0.3 0.3,1 0,3.4 C-0.3,1 -1,0.3 -3.4,0 C-1,-0.3 -0.3,-1 0,-3.4 Z" fill="var(--rh-accent)" />
          </g>
          <text x={750} y={412} className="rh-strong" fontSize="10.5">AI suggested a match</text>
          <text x={750} y={426} className="rh-muted" fontSize={9}>98% confidence</text>
          <circle className="rh-pending-ring" cx={732} cy={476} r={9} fill="none" stroke="var(--rh-amber)" strokeWidth="1.4" />
          <g transform="translate(732,476)">
            <circle className="rh-fade-old" r={9} fill="var(--rh-amber-soft)" stroke="var(--rh-amber)" strokeWidth="1.4" />
            <circle className="rh-fade-new" r={9} fill="var(--rh-green-soft)" stroke="var(--rh-green)" strokeWidth="1.4" opacity={0} />
            <path className="rh-fade-new rh-check-ic" d="M-3,0 L-1,2.4 L3.4,-3" stroke="var(--rh-green)" opacity={0} />
          </g>
          <text className="rh-fade-old rh-strong" x={750} y={472} fontSize="10.5">Awaiting
            confirmation</text>
          <text className="rh-fade-new" x={750} y={472} fontWeight={700} fontSize="10.5" fill="var(--rh-text-strong)" opacity={0}>Confirmed</text>
          <text className="rh-fade-old rh-muted" x={750} y={486} fontSize={9}>One click to close it
            out</text>
          <text className="rh-fade-new rh-muted" x={750} y={486} fontSize={9} opacity={0}>Matched to
            Booking LG-0109</text>
          {/* ghost cursor */}
          <g className="rh-anim-cursor">
            <path d="M0,0 L0,15.5 L3.6,12.2 L6.2,18.4 L8.3,17.5 L5.7,11.4 L10.6,11.1 Z" fill="var(--rh-white)" stroke="var(--rh-dark)" strokeWidth="1.1" strokeLinejoin="round" />
          </g>
          <circle className="rh-anim-ring" r={14} fill="none" stroke="var(--rh-accent)" strokeWidth={2} />
        </svg>
      </div>
    </div>

  );
}
