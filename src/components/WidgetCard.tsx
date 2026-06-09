import { FaTimes } from "react-icons/fa";
import type { Widget } from "../types/dashboard";
import { useDashboardStore } from "../store/dashboardStore";

interface WidgetCardProps {
    widget: Widget;
    categoryId: string;
}

function WidgetCard({
    widget,
    categoryId,
}: WidgetCardProps) {
    const removeWidget =
        useDashboardStore(
            (state) => state.removeWidget
        );

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h4 className="widget-title">
                    {widget.title}
                </h4>

                <FaTimes
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        removeWidget(
                            categoryId,
                            widget.id
                        )
                    }
                />
            </div>

            <p className="widget-content">
                {widget.description}
            </p>
        </div>
    );
}

export default WidgetCard;