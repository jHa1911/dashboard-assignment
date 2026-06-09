import { useState } from "react";
import CategorySection from "./CategorySection";
import SearchBar from "./SearchBar";
import AddWidgetModal from "./AddWidgetModal";
import { useDashboardStore } from "../store/dashboardStore";

function Dashboard() {
    const categories = useDashboardStore(
        (state) => state.categories
    );

    const [searchTerm, setSearchTerm] =
        useState("");

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [
        selectedCategoryId,
        setSelectedCategoryId,
    ] = useState<string | null>(null);

    const handleAddWidget = (
        categoryId: string
    ) => {
        setSelectedCategoryId(categoryId);
        setIsModalOpen(true);
    };

    const filteredCategories =
        categories.map((category) => ({
            ...category,
            widgets:
                category.widgets.filter(
                    (widget) =>
                        widget.title
                            .toLowerCase()
                            .includes(
                                searchTerm.toLowerCase()
                            )
                ),
        }));

    return (
        <>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {filteredCategories.map(
                (category) => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        onAddWidget={
                            handleAddWidget
                        }
                    />
                )
            )}

            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={() =>
                    setIsModalOpen(false)
                }
                selectedCategoryId={
                    selectedCategoryId
                }
            />
        </>
    );
}

export default Dashboard;