import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dashboardData } from "../data/dashboardData";
import type { Category, Widget } from "../types/dashboard";

interface DashboardStore {
    categories: Category[];

    addWidget: (
        categoryId: string,
        widget: Widget
    ) => void;

    removeWidget: (
        categoryId: string,
        widgetId: string
    ) => void;
}

export const useDashboardStore =
    create<DashboardStore>()(
        persist(
            (set) => ({
                categories: dashboardData,

                addWidget: (categoryId, widget) =>
                    set((state) => ({
                        categories: state.categories.map(
                            (category) =>
                                category.id === categoryId
                                    ? {
                                        ...category,
                                        widgets: [
                                            ...category.widgets,
                                            widget,
                                        ],
                                    }
                                    : category
                        ),
                    })),

                removeWidget: (
                    categoryId,
                    widgetId
                ) =>
                    set((state) => ({
                        categories: state.categories.map(
                            (category) =>
                                category.id === categoryId
                                    ? {
                                        ...category,
                                        widgets:
                                            category.widgets.filter(
                                                (widget) =>
                                                    widget.id !== widgetId
                                            ),
                                    }
                                    : category
                        ),
                    })),
            }),
            {
                name: "dashboard-store",
            }
        ));
