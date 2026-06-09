import type { Category } from "../types/dashboard";
import WidgetCard from "./WidgetCard";

interface CategorySectionProps {
    category: Category;
}

function CategorySection({
    category,
}: CategorySectionProps) {

    return (
        <section className="category-section">
            <h2 className="category-title">
                {category.title}
            </h2>

            <div className="widgets-grid">
                {category.widgets.length === 0 ? (
                    <div className="widget-card">
                        No widgets available
                    </div>
                ) : (
                    category.widgets.map((widget) => (
                        <WidgetCard
                            key={widget.id}
                            widget={widget}
                            categoryId={category.id}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default CategorySection;