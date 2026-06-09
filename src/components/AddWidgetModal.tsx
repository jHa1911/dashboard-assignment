import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDashboardStore } from "../store/dashboardStore";

interface AddWidgetModalProps {
    onClose: () => void;
}

function AddWidgetModal({
    onClose,
}: AddWidgetModalProps) {
    const addWidget = useDashboardStore(
        (state) => state.addWidget
    );

    const categories = useDashboardStore(
        (state) => state.categories
    );

    const [selectedCategory, setSelectedCategory] =
        useState(categories[0]?.id || "");

    const [title, setTitle] = useState("");

    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!title.trim()) return;

        addWidget(selectedCategory, {
            id: uuid(),
            title,
            text,
        });

        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "450px",
                }}
            >
                <h2>Add Widget</h2>

                <div
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <label>Category</label>

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                        }}
                    >
                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    placeholder="Widget Name"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />

                <textarea
                    placeholder="Widget Text"
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        minHeight: "100px",
                    }}
                />

                <div
                    style={{
                        marginTop: "15px",
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <button
                        style={{
                            padding: "10px 16px",
                            background: "#1976d2",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                        onClick={handleSubmit}
                    >
                        Add Widget
                    </button>

                    <button
                        style={{
                            padding: "10px 16px",
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddWidgetModal;