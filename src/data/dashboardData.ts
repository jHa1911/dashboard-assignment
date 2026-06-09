import type { Category } from "../types/dashboard";

export const dashboardData: Category[] = [
    {
        id: "cspm",
        title: "CSPM Executive Dashboard",
        widgets: [
            {
                id: "w1",
                title: "Cloud Accounts",
                description: "2 Total",
                type: "donut",
                data: {
                    total: 2,
                    segments: [
                        { label: "Connected", value: 2, color: "#2563eb" },
                        { label: "Not Connected", value: 2, color: "#d1d5db" },
                    ],
                },
            },
            {
                id: "w2",
                title: "Cloud Account Risk Assessment",
                description: "9659 Total",
                type: "donut",
                data: {
                    total: 9659,
                    segments: [
                        { label: "Failed", value: 1689, color: "#ef4444" },
                        { label: "Warning", value: 681, color: "#f59e0b" },
                        { label: "Not available", value: 36, color: "#f97316" },
                        { label: "Passed", value: 7253, color: "#22c55e" },
                    ],
                },
            },
        ],
    },
    {
        id: "cwpp",
        title: "CWPP Dashboard",
        widgets: [
            {
                id: "w3",
                title: "Top 5 Namespace Specific Alerts",
                description: "No Graph data available!",
                type: "empty",
            },
            {
                id: "w4",
                title: "Workload Alerts",
                description: "No Graph data available!",
                type: "empty",
            },
        ],
    },
    {
        id: "registry",
        title: "Registry Scan",
        widgets: [
            {
                id: "w5",
                title: "Image Risk Assessment",
                description: "1470 Total Vulnerabilities",
                type: "progress",
                data: {
                    segments: [
                        { label: "Critical", value: 9, color: "#ef4444" },
                        { label: "High", value: 150, color: "#f97316" },
                        { label: "Medium", value: 900, color: "#f59e0b" },
                        { label: "Low", value: 411, color: "#84cc16" },
                    ],
                },
            },
            {
                id: "w6",
                title: "Image Security Issues",
                description: "2 Total Images",
                type: "progress",
                data: {
                    segments: [
                        { label: "Critical", value: 2, color: "#ef4444" },
                        { label: "High", value: 2, color: "#f97316" },
                        { label: "Medium", value: 1, color: "#f59e0b" },
                        { label: "Low", value: 0, color: "#d1d5db" },
                    ],
                },
            },
        ],
    },
];
