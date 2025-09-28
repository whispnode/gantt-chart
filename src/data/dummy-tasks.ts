import { Task } from "@/types/gantt/tasks";
import { faker } from "@faker-js/faker";

export function getDummyTasks(): Task[] {
    return [
        {
            id: "1",
            name: "Design Homepage",
            description: "Create the layout and UI for the homepage",
            status: "Active",
            avator: faker.image.avatar(),
            startDate: new Date("2025-09-15"),
            dueDate: new Date("2025-09-25"),
            owner: "@alice.jane",
            assignee: ["@bob.don", "@carol.jib"],
            dependencies: [
                { id: "1-issue-1", type: "Issue" },
                { id: "1-1", type: "SubTask" },
            ],
            priority: "High",
            subtasks: [
                {
                    id: "1-1",
                    name: "Wireframe",
                    description: "Draw basic wireframes",
                    status: "Done",
                    avator: faker.image.avatar(),
                    startDate: new Date("2025-09-20"),
                    dueDate: new Date("2025-09-30"),
                    owner: "@alice.jane",
                    assignee: ["@bob.don"],
                    dependencies: [{ id: "1-issue-2", type: "Issue" }],
                    issues: [
                        {
                            id: "1-issue-2",
                            name: "Figma plan reached",
                            avator: faker.image.avatar(),
                            description:
                                "Current figma free plan is not enough",
                            status: "Not Started",
                            startDate: new Date("2025-10-02"),
                            dueDate: new Date("2025-10-10"),
                            owner: "@carol.jib",
                            assignee: ["@carol.jib"],
                        },
                    ],
                },
            ],
            issues: [
                {
                    id: "1-issue-1",
                    name: "Missing icons",
                    description: "Icons not loading on mobile",
                    status: "Not Started",
                    avator: faker.image.avatar(),
                    startDate: new Date(),
                    dueDate: new Date("2025-10-01"),
                    owner: "@carol.jib",
                    assignee: ["@carol.jib"],
                },
            ],
        },
        {
            id: "2",
            name: "Implement Auth",
            description: "Set up login/signup functionality",
            status: "Not Started",
            startDate: new Date("2025-10-01"),
            avator: faker.image.avatar(),
            dueDate: new Date("2025-10-15"),
            owner: "@jane.doe",
            assignee: ["@eve.alice"],
            priority: "Critical",
        },
    ];
}
