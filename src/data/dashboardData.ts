import type { Category } from "../types/dashboard";

export const dashboardData: Category[] = [
    {
        id: "cspm",
        title: "CSPM Executive Dashboard",
        widgets: [
            {
                id: "w1",
                title: "Cloud Accounts",
                text: "Connected: 2, Not Connected: 2",
            },
            {
                id: "w2",
                title: "Cloud Account Risk Assessment",
                text: "Failed: 1689, Passed: 7253",
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
                text: "No graph data available",
            },
            {
                id: "w4",
                title: "Workload Alerts",
                text: "No graph data available",
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
                text: "1470 vulnerabilities",
            },
            {
                id: "w6",
                title: "Image Security Issues",
                text: "2 total images",
            },
        ],
    },
];