import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDashboardStore } from "../store/dashboardStore";

interface AddWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategoryId?: string | null;
}

function AddWidgetModal({
    isOpen,
    onClose,
    selectedCategoryId,
}: AddWidgetModalProps) {
    const addWidget = useDashboardStore(
        (state) => state.addWidget
    );

    const categories = useDashboardStore(
        (state) => state.categories
    );

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState<string>("");

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title.trim()) return;

        const categoryId =
            selectedCategory ||
            selectedCategoryId ||
            categories[0]?.id;

        if (!categoryId) return;

        addWidget(categoryId, {
            id: uuid(),
            title,
            description,
            type: "text",
        });

        setTitle("");
        setDescription("");
        setSelectedCategory("");

        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background:
                    "rgba(0,0,0,0.35)",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "420px",
                    height: "100vh",
                    background: "#fff",
                    padding: "24px",
                    boxShadow:
                        "-4px 0 16px rgba(0,0,0,0.1)",
                    overflowY: "auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                        }}
                    >
                        Add Widget
                    </h2>

                    <button
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <label>
                        Category
                    </label>

                    <select
                        value={
                            selectedCategory ||
                            selectedCategoryId ||
                            categories[0]?.id ||
                            ""
                        }
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "5px",
                            border:
                                "1px solid #d1d5db",
                            borderRadius: "8px",
                        }}
                    >
                        {categories.map(
                            (category) => (
                                <option
                                    key={
                                        category.id
                                    }
                                    value={
                                        category.id
                                    }
                                >
                                    {
                                        category.title
                                    }
                                </option>
                            )
                        )}
                    </select>
                </div>

                <input
                    placeholder="Widget Name"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        border:
                            "1px solid #d1d5db",
                        borderRadius: "8px",
                        marginBottom: "16px",
                    }}
                />

                <textarea
                    placeholder="Widget Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        minHeight: "120px",
                        border:
                            "1px solid #d1d5db",
                        borderRadius: "8px",
                    }}
                />

                <div
                    style={{
                        marginTop: "24px",
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "12px",
                    }}
                >
                    <button
                        style={{
                            padding: "10px 18px",
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                        onClick={
                            handleSubmit
                        }
                    >
                        Add Widget
                    </button>

                    <button
                        style={{
                            padding: "10px 18px",
                            border:
                                "1px solid #d1d5db",
                            borderRadius: "8px",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                        onClick={
                            onClose
                        }
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddWidgetModal;