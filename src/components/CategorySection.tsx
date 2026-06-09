import type { Category } from "../types/dashboard";
import WidgetCard from "./WidgetCard";

interface CategorySectionProps {
    category: Category;
    onAddWidget: (categoryId: string) => void;
}

function CategorySection({
    category,
    onAddWidget,
}: CategorySectionProps) {
    return (
        <section className="category-section">
            <h2 className="category-title">
                {category.title}
            </h2>

            <div className="widgets-grid">
                {category.widgets.map((widget) => (
                    <WidgetCard
                        key={widget.id}
                        widget={widget}
                        categoryId={category.id}
                    />
                ))}

                <button
                    type="button"
                    className="add-widget-card"
                    onClick={() =>
                        onAddWidget(category.id)
                    }
                >
                    + Add Widget
                </button>
            </div>
        </section>
    );
}

export default CategorySection;