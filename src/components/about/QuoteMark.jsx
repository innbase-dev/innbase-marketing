export default function QuoteMark({ className = "" }) {
    return (
        <svg
            viewBox="0 0 32 24"
            className={className}
            aria-hidden="true"
            fill="none"
        >
            <path
                d="M13.5 0C6.6 2.6 2 8.4 2 15.4 2 20.3 5.2 24 9.8 24c4 0 6.9-3 6.9-6.8 0-3.6-2.5-6.2-5.9-6.2-.6 0-1.1.1-1.5.2C9.9 6.8 12.4 3.4 16.6 1.4L13.5 0Z"
                fill="currentColor"
            />
            <path
                d="M28.5 0c-6.9 2.6-11.5 8.4-11.5 15.4 0 4.9 3.2 8.6 7.8 8.6 4 0 6.9-3 6.9-6.8 0-3.6-2.5-6.2-5.9-6.2-.6 0-1.1.1-1.5.2C24.9 6.8 27.4 3.4 31.6 1.4L28.5 0Z"
                fill="currentColor"
            />
        </svg>
    );
}
