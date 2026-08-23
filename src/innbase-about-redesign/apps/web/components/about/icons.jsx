/**
 * components/about/icons.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * The rest of the app resolves icons through the shared <Icon name="..." />
 * wrapper around iconsax-react. This file only exists for the handful of
 * About-page icons (role cards, checkmark node, quote glyph) where we
 * wanted a guaranteed-to-render mark without guessing at iconsax icon
 * names that may not exist in the shared set. Swap any of these for
 * <Icon name="..." /> once a designer confirms the matching iconsax icon.
 */

const base = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export function PhoneIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M3 9V5a2 2 0 0 1 2-2h4M21 15v4a2 2 0 0 1-2 2h-4" />
            <path d="M8.5 15.5 3 21m0-5v5h5" />
        </svg>
    );
}

export function CashIcon(props) {
    return (
        <svg {...base} {...props}>
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M6 9v.01M18 15v.01" />
        </svg>
    );
}

export function ChatIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    );
}

export function HomeIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M3 9.5 12 3l9 6.5" />
            <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
        </svg>
    );
}

export const ROLE_ICONS = {
    phone: PhoneIcon,
    cash: CashIcon,
    chat: ChatIcon,
    home: HomeIcon,
};

export function CheckIcon(props) {
    return (
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 13l4 4L19 7" />
        </svg>
    );
}

export function QuoteMarkIcon(props) {
    return (
        <svg width={40} height={40} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M9.5 4C6 4 3 7.5 3 11.5c0 3 2 5 4.5 5 2 0 3.5-1.5 3.5-3.5S9.5 9.5 7.5 9.5c-.3 0-.6 0-.9.1C7.1 7 8.6 5.5 10.5 5.2L9.5 4Zm10 0c-3.5 0-6.5 3.5-6.5 7.5 0 3 2 5 4.5 5 2 0 3.5-1.5 3.5-3.5S19.5 9.5 17.5 9.5c-.3 0-.6 0-.9.1.5-2.6 2-4.1 3.9-4.4L19.5 4Z" />
        </svg>
    );
}
