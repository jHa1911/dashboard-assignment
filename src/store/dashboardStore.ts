import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dashboardData } from "../data/dashboardData";
import type { Category, Widget } from "../types/dashboard";

interface DashboardStore {
    categories: Category[];
    addWidget: (categoryId: string, widget: Widget) => void;
    removeWidget: (categoryId: string, widgetId: string) => void;
    toggleWidget: (categoryId: string, widgetId: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set) => ({
            categories: dashboardData,

            addWidget: (categoryId, widget) =>
                set((state) => ({
                    categories: state.categories.map((cat) =>
                        cat.id === categoryId
                            ? { ...cat, widgets: [...cat.widgets, widget] }
                            : cat
                    ),
                })),

            removeWidget: (categoryId, widgetId) =>
                set((state) => ({
                    categories: state.categories.map((cat) =>
                        cat.id === categoryId
                            ? {
                                ...cat,
                                widgets: cat.widgets.filter(
                                    (w) => w.id !== widgetId
                                ),
                            }
                            : cat
                    ),
                })),

            toggleWidget: (categoryId, widgetId) =>
                set((state) => {
                    const allWidgets = dashboardData
                        .flatMap((c) => c.widgets)
                        .concat(
                            state.categories.flatMap((c) => c.widgets)
                        );
                    const widget = allWidgets.find((w) => w.id === widgetId);
                    const category = state.categories.find(
                        (c) => c.id === categoryId
                    );
                    if (!category || !widget) return state;
                    const exists = category.widgets.some(
                        (w) => w.id === widgetId
                    );
                    return {
                        categories: state.categories.map((cat) =>
                            cat.id === categoryId
                                ? {
                                    ...cat,
                                    widgets: exists
                                        ? cat.widgets.filter(
                                            (w) => w.id !== widgetId
                                        )
                                        : [...cat.widgets, widget],
                                }
                                : cat
                        ),
                    };
                }),
        }),
        { name: "dashboard-store" }
    )
);
