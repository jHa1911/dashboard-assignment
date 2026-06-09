import type { Category } from "../types/dashboard";

export const dashboardData: Category[] = [
    {
        id: "cspm",
        title: "CSPM Executive Dashboard",
        widgets: [
            {
                id: "w1",
                title: "Cloud Accounts",
                description: "Connected: 2, Not Connected: 2",
                type: "chart",
            },
            {
                id: "w2",
                title: "Cloud Account Risk Assessment",
                description: "Failed: 1689, Passed: 7253",
                type: "chart",
            },
        ],
    },

    {
        id: "cwpp",
        title: "CWPP Dashboard",
        widgets: [
            {
                id: "w3",
                title: "Top 5 Namespace Alerts",
                description: "No graph data available",
                type: "chart",
            },
            {
                id: "w4",
                title: "Workload Alerts",
                description: "No graph data available",
                type: "chart",
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
                description: "1470 vulnerabilities",
                type: "progress",
            },
            {
                id: "w6",
                title: "Image Security Issues",
                description: "2 total images",
                type: "progress",
            },
        ],
    },
];