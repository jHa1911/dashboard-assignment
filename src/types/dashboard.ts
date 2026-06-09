export interface Widget {
    id: string;
    title: string;
    description: string;
    type: "text" | "chart" | "progress";
}

export interface Category {
    id: string;
    title: string;
    widgets: Widget[];
}
