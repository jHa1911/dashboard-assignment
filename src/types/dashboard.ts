export interface Widget {
    id: string;
    title: string;
    description: string;
    type: "text" | "chart" | "progress" | "donut" | "bar" | "empty";
    data?: Record<string, unknown>;
}

export interface Category {
    id: string;
    title: string;
    widgets: Widget[];
}
