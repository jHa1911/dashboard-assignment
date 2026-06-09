import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddWidgetModal from "./components/AddWidgetModal";
import "./styles/dashboard.css";

function App() {
    const [openModal, setOpenModal] =
        useState(false);

    return (
        <div className="app-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    CNAPP Dashboard
                </h1>

                <button
                    className="add-widget-btn"
                    onClick={() =>
                        setOpenModal(true)
                    }
                >
                    + Add Widget
                </button>
            </div>

            <Dashboard />

            {openModal && (
                <AddWidgetModal
                    isOpen={openModal}
                    onClose={() =>
                        setOpenModal(false)
                    }
                />
            )}
        </div>
    );
}

export default App;