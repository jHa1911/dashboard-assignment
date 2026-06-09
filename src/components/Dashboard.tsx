import { useState } from "react";
import CategorySection from "./CategorySection";
import SearchBar from "./SearchBar";
import { useDashboardStore } from "../store/dashboardStore";

function Dashboard() {
    const categories =
        useDashboardStore(
            (state) => state.categories
        );

    const [searchTerm, setSearchTerm] =
        useState("");

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
                            ) ||
                        widget.text
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
                    />
                )
            )}
        </>
    );
}

export default Dashboard;