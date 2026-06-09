import type { Widget } from "../types/dashboard";
import { useDashboardStore } from "../store/dashboardStore";
import DonutWidget from "./DonutWidget";
import ProgressWidget from "./ProgressWidget";
import EmptyWidget from "./EmptyWidget";

interface WidgetCardProps {
    widget: Widget;
    categoryId: string;
}

function WidgetCard({ widget, categoryId }: WidgetCardProps) {
    const removeWidget = useDashboardStore((state) => state.removeWidget);

    const renderContent = () => {
        const d = widget.data as Record<string, unknown> | undefined;

        switch (widget.type) {
            case "donut":
                return (
                    <DonutWidget
                        total={d?.total as number}
                        segments={d?.segments as { label: string; value: number; color: string }[]}
                    />
                );
            case "progress":
                return (
                    <ProgressWidget
                        description={widget.description}
                        segments={d?.segments as { label: string; value: number; color: string }[]}
                    />
                );
            case "empty":
                return <EmptyWidget message={widget.description} />;
            default:
                return (
                    <p className="widget-text">{widget.description}</p>
                );
        }
    };

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h4 className="widget-title">{widget.title}</h4>
                <button
                    className="widget-remove-btn"
                    onClick={() => removeWidget(categoryId, widget.id)}
                    title="Remove widget"
                    aria-label="Remove widget"
                >
                    ✕
                </button>
            </div>
            <div className="widget-body">{renderContent()}</div>
        </div>
    );
}

export default WidgetCard;
