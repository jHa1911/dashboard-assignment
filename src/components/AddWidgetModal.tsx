import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDashboardStore } from "../store/dashboardStore";
import { dashboardData } from "../data/dashboardData";
import type { Widget } from "../types/dashboard";

interface AddWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategoryId?: string | null;
}

function AddWidgetModalInner({
    onClose,
    initialTab,
}: {
    onClose: () => void;
    initialTab: string;
}) {
    const categories = useDashboardStore((state) => state.categories);
    const addWidget = useDashboardStore((state) => state.addWidget);
    const removeWidget = useDashboardStore((state) => state.removeWidget);

    const [activeTab, setActiveTab] = useState<string>(initialTab);
    const [searchTerm, setSearchTerm] = useState("");
    const [newWidgetTitle, setNewWidgetTitle] = useState("");
    const [newWidgetText, setNewWidgetText] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const allPossibleWidgets: (Widget & { categoryId: string })[] = dashboardData.flatMap(
        (cat) => cat.widgets.map((w) => ({ ...w, categoryId: cat.id }))
    );
    const originalIds = new Set(allPossibleWidgets.map((w) => w.id));
    categories.forEach((cat) => {
        cat.widgets.forEach((w) => {
            if (!originalIds.has(w.id)) {
                allPossibleWidgets.push({ ...w, categoryId: cat.id });
                originalIds.add(w.id);
            }
        });
    });

    const activeCategory = categories.find((c) => c.id === activeTab);

    const displayWidgets = searchTerm
        ? allPossibleWidgets.filter(
              (w, idx, arr) =>
                  arr.findIndex((x) => x.id === w.id) === idx &&
                  w.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allPossibleWidgets.filter(
              (w, idx, arr) =>
                  arr.findIndex((x) => x.id === w.id) === idx &&
                  w.categoryId === activeTab
          );

    const isChecked = (widgetId: string) => {
        return (activeCategory?.widgets || []).some((w) => w.id === widgetId);
    };

    const handleToggle = (widget: Widget & { categoryId: string }) => {
        const categoryIdToUse = searchTerm ? widget.categoryId : activeTab;
        const cat = categories.find((c) => c.id === categoryIdToUse);
        if (!cat) return;
        const exists = cat.widgets.some((w) => w.id === widget.id);
        if (exists) {
            removeWidget(categoryIdToUse, widget.id);
        } else {
            addWidget(categoryIdToUse, {
                id: widget.id,
                title: widget.title,
                description: widget.description,
                type: widget.type,
                data: widget.data,
            });
        }
    };

    const handleAddNewWidget = () => {
        if (!newWidgetTitle.trim()) return;
        addWidget(activeTab, {
            id: uuid(),
            title: newWidgetTitle.trim(),
            description: newWidgetText.trim() || "Custom widget",
            type: "text",
        });
        setNewWidgetTitle("");
        setNewWidgetText("");
        setShowAddForm(false);
    };

    const tabLabels: Record<string, string> = {
        cspm: "CSPM",
        cwpp: "CWPP",
        registry: "Image",
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title">Add Widget</h2>
                        <p className="modal-subtitle">
                            Personalise your dashboard by adding the following widget
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Search */}
                <div className="modal-search-wrap">
                    <span className="modal-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search widgets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="modal-search-input"
                    />
                </div>

                {!searchTerm && (
                    <div className="modal-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`modal-tab ${activeTab === cat.id ? "modal-tab--active" : ""}`}
                                onClick={() => setActiveTab(cat.id)}
                            >
                                {tabLabels[cat.id] || cat.title.split(" ")[0]}
                            </button>
                        ))}
                    </div>
                )}

                <div className="modal-widget-list">
                    {displayWidgets.length === 0 && (
                        <p className="modal-empty">No widgets found.</p>
                    )}
                    {displayWidgets.map((widget) => {
                        const checked = searchTerm
                            ? categories
                                  .find((c) => c.id === widget.categoryId)
                                  ?.widgets.some((w) => w.id === widget.id) || false
                            : isChecked(widget.id);

                        return (
                            <label key={widget.id} className="modal-widget-item">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleToggle(widget)}
                                    className="modal-checkbox"
                                />
                                <span className="modal-widget-name">{widget.title}</span>
                            </label>
                        );
                    })}
                </div>

                {!searchTerm && (
                    <div className="modal-add-form-section">
                        {!showAddForm ? (
                            <button
                                className="modal-add-new-btn"
                                onClick={() => setShowAddForm(true)}
                            >
                                + Create new widget
                            </button>
                        ) : (
                            <div className="modal-add-form">
                                <input
                                    type="text"
                                    placeholder="Widget name *"
                                    value={newWidgetTitle}
                                    onChange={(e) => setNewWidgetTitle(e.target.value)}
                                    className="modal-input"
                                    autoFocus
                                />
                                <textarea
                                    placeholder="Widget description (optional)"
                                    value={newWidgetText}
                                    onChange={(e) => setNewWidgetText(e.target.value)}
                                    className="modal-textarea"
                                    rows={3}
                                />
                                <div className="modal-form-actions">
                                    <button
                                        className="modal-btn modal-btn--secondary"
                                        onClick={() => setShowAddForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="modal-btn modal-btn--primary"
                                        onClick={handleAddNewWidget}
                                        disabled={!newWidgetTitle.trim()}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="modal-footer">
                    <button className="modal-btn modal-btn--secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-btn modal-btn--primary" onClick={onClose}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

function AddWidgetModal({ isOpen, onClose, selectedCategoryId }: AddWidgetModalProps) {
    const categories = useDashboardStore((state) => state.categories);
    if (!isOpen) return null;
    const initialTab = selectedCategoryId || categories[0]?.id || "";
    return (
        <AddWidgetModalInner
            key={initialTab} 
            onClose={onClose}
            initialTab={initialTab}
        />
    );
}

export default AddWidgetModal;
