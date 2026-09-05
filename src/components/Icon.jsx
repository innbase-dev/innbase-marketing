"use client";

import {
    ArrowLeft,
    ArrowRight,
    Export,
    Money,
    Briefcase,
    CalendarTick,
    TickCircle,
    ArrowDown2,
    ClipboardText,
    Home2,
    Glass,
    HambergerMenu,
    BoxSearch,
    PlayCircle,
    Add,
    MagicStar,
    People,
    CloseCircle,
    Buildings,
    DocumentText,
    Home,
    Lock1,
    Sms,
    MessageText1,
    Edit2,
    CallCalling,
    ReceiptText,
    SearchNormal1,
    ShieldTick,
    FlashCircle,
    InfoCircle,
    Lifebuoy,
    Login,
    Call,
    Profile2User,
    ArrowDown,
    Heart,
    NoteText,
    ScanBarcode,
    Coffee,
    Broom,
    Setting2,
    MessageQuestion,
    CallSlash,
    Mobile,
    Activity,
    Send2,
    Layer,
    ShoppingBag,
} from "iconsax-react";

/**
 * Maps the original design's lucide-react icon names to their closest
 * Iconsax equivalents, so every icon in the app resolves through a single,
 * swappable source of truth.
 */
const ICONS = {
    "arrow-left": ArrowLeft,
    "arrow-right": ArrowRight,
    "arrow-up-right": Export,
    banknote: Money,
    briefcase: Briefcase,
    "calendar-clock": CalendarTick,
    check: TickCircle,
    "chevron-down": ArrowDown2,
    "clipboard-list": ClipboardText,
    "door-open": Home2,
    martini: Glass,
    menu: HambergerMenu,
    "package-search": BoxSearch,
    "play-circle": PlayCircle,
    plus: Add,
    sparkles: MagicStar,
    users: People,
    x: CloseCircle,
    "building-2": Buildings,
    "file-text": DocumentText,
    home: Home,
    lock: Lock1,
    mail: Sms,
    "message-circle": MessageText1,
    "pencil-line": Edit2,
    "phone-call": CallCalling,
    "receipt-text": ReceiptText,
    "search-check": SearchNormal1,
    "shield-check": ShieldTick,
    zap: FlashCircle,
    handshake: Profile2User,
    info: InfoCircle,
    "life-buoy": Lifebuoy,
    "log-in": Login,
    phone: Call,
    "arrow-down": ArrowDown,
    heart: Heart,
    list: NoteText,
    // Added for /guest-companion — not needed by any earlier page, so not
    // part of the original lucide->iconsax mapping table above.
    scan: ScanBarcode,
    coffee: Coffee,
    broom: Broom,
    gear: Setting2,
    "message-question": MessageQuestion,
    "call-slash": CallSlash,
    mobile: Mobile,
    activity: Activity,
    send: Send2,
    layer: Layer,
    "shopping-bag": ShoppingBag,
};

export default function Icon({
    name,
    className,
    style,
    size,
    variant = "Linear",
    ...rest
}) {
    const Cmp = ICONS[name];
    if (!Cmp) return null;

    // Original markup sized icons either via the shared `.icon` CSS class
    // (18px) or an inline width/height override — replicate both paths.
    const resolvedSize = size || style?.width || 18;

    return (
        <Cmp
            size={resolvedSize}
            variant={variant}
            color="currentColor"
            className={className}
            style={style}
            {...rest}
        />
    );
}
