interface Segment {
    label: string;
    value: number;
    color: string;
}

interface ProgressWidgetProps {
    description: string;
    segments: Segment[];
}

function ProgressWidget({ description, segments }: ProgressWidgetProps) {
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

    return (
        <div className="progress-widget">
            <p className="progress-total">{description}</p>
            <div className="progress-bar-track">
                {segments.map((seg, i) => (
                    <div
                        key={i}
                        className="progress-bar-segment"
                        style={{
                            width: `${(seg.value / total) * 100}%`,
                            background: seg.color,
                        }}
                        title={`${seg.label}: ${seg.value}`}
                    />
                ))}
            </div>
            <div className="progress-legend">
                {segments.map((seg, i) => (
                    <div key={i} className="legend-item">
                        <span
                            className="legend-dot"
                            style={{ background: seg.color }}
                        />
                        <span className="legend-text">
                            {seg.label} ({seg.value})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressWidget;
