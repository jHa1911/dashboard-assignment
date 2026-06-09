export interface Widget {
    id: string;
    title: string;
    text: string;
}

export interface Category {
    id: string;
    title: string;
    widgets: Widget[];
}