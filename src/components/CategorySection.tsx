import type { Category } from "../types/dashboard";
import WidgetCard from "./WidgetCard";

interface CategorySectionProps {
    category: Category;
    onAddWidget: (categoryId: string) => void;
}

function CategorySection({ category, onAddWidget }: CategorySectionProps) {
    return (
        <section className="category-section">
            <h3 className="category-title">{category.title}</h3>
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
                    onClick={() => onAddWidget(category.id)}
                >
                    <span className="add-widget-plus">+</span>
                    <span>Add Widget</span>
                </button>
            </div>
        </section>
    );
}

export default CategorySection;
