import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Segment {
    label: string;
    value: number;
    color: string;
}

interface DonutWidgetProps {
    total: number | string;
    segments: Segment[];
}

function DonutWidget({ total, segments }: DonutWidgetProps) {
    return (
        <div className="donut-widget">
            <div className="donut-chart-wrap">
                <ResponsiveContainer width={130} height={130}>
                    <PieChart>
                        <Pie
                            data={segments}
                            dataKey="value"
                            innerRadius={38}
                            outerRadius={58}
                            startAngle={90}
                            endAngle={-270}
                            strokeWidth={0}
                        >
                            {segments.map((seg, i) => (
                                <Cell key={i} fill={seg.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="donut-center-label">{total}</div>
            </div>
            <div className="donut-legend">
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

export default DonutWidget;
