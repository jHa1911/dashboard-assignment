function EmptyWidget({ message }: { message: string }) {
    return (
        <div className="empty-widget">
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="empty-icon"
            >
                <rect x="6" y="30" width="8" height="12" rx="2" fill="#d1d5db" />
                <rect x="18" y="22" width="8" height="20" rx="2" fill="#d1d5db" />
                <rect x="30" y="14" width="8" height="28" rx="2" fill="#d1d5db" />
                <rect x="4" y="42" width="40" height="2" rx="1" fill="#9ca3af" />
            </svg>
            <p className="empty-text">{message}</p>
        </div>
    );
}

export default EmptyWidget;
