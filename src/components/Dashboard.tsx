import { useState } from "react";
import CategorySection from "./CategorySection";
import AddWidgetModal from "./AddWidgetModal";
import { useDashboardStore } from "../store/dashboardStore";

function Dashboard() {
    const categories = useDashboardStore((state) => state.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddWidget = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setIsModalOpen(true);
    };

    const filteredCategories = categories.map((cat) => ({
        ...cat,
        widgets: cat.widgets.filter((w) =>
            w.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));

    return (
        <div className="app-container">
            <header className="top-bar">
                <nav className="breadcrumb">
                    <span className="breadcrumb-home">Home</span>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Dashboard V2</span>
                </nav>
                <div className="top-bar-center">
                    <div className="search-wrap">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search anything..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="global-search"
                        />
                    </div>
                </div>
                <div className="top-bar-right">
                    <button className="icon-btn" title="Notifications">🔔</button>
                    <button className="icon-btn" title="Settings">⚙️</button>
                    <div className="avatar">A</div>
                </div>
            </header>

            <div className="dashboard-header">
                <h1 className="dashboard-title">CNAPP Dashboard</h1>
                <div className="dashboard-actions">
                    <button
                        className="add-widget-btn"
                        onClick={() => {
                            setSelectedCategoryId(null);
                            setIsModalOpen(true);
                        }}
                    >
                        + Add Widget
                    </button>
                    <button className="icon-action-btn" title="Refresh">↻</button>
                    <button className="icon-action-btn" title="More options">⋮</button>
                    <button className="time-filter-btn">
                        🕒 Last 2 days ▾
                    </button>
                </div>
            </div>

            <main className="dashboard-body">
                {filteredCategories.map((cat) => (
                    <CategorySection
                        key={cat.id}
                        category={cat}
                        onAddWidget={handleAddWidget}
                    />
                ))}
            </main>

            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedCategoryId={selectedCategoryId}
            />
        </div>
    );
}

export default Dashboard;
