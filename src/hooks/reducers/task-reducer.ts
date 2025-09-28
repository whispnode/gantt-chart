import { Task, TaskAction } from "@/types/gantt/tasks";

export const initTasks: Task[] = [];

export function TaskReducer(state: Task[] = initTasks, action: TaskAction): Task[] {
    switch (action.type) {
        case "CREATE_TASK":
            return [...state, action.payload];

        case "UPDATE_TASK":
            return state.map(task =>
                task.id === action.payload.id ? action.payload : task
            );

        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);

        // === SubTask Actions ===
        case "CREATE_SUBTASK":
            return state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: [...(task.subtasks || []), action.payload.subtask]
                    }
                    : task
            );

        case "UPDATE_SUBTASK":
            return state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: (task.subtasks || []).map(subtask =>
                            subtask.id === action.payload.subtask.id
                                ? action.payload.subtask
                                : subtask
                        )
                    }
                    : task
            );

        case "DELETE_SUBTASK":
            return state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: (task.subtasks || []).filter(subtask => subtask.id !== action.payload.subtaskId)
                    }
                    : task
            );

        // === Issue Actions ===
        case "CREATE_ISSUE":
            return state.map(task => {
                if (task.id !== action.payload.taskId) return task;

                // Issue belongs to a subtask
                if (action.payload.subtaskId) {
                    return {
                        ...task,
                        subtasks: (task.subtasks || []).map(subtask =>
                            subtask.id === action.payload.subtaskId
                                ? {
                                    ...subtask,
                                    issues: [...(subtask.issues || []), action.payload.issue]
                                }
                                : subtask
                        )
                    };
                }

                // Issue belongs directly to the task
                return {
                    ...task,
                    issues: [...(task.issues || []), action.payload.issue]
                };
            });

        case "UPDATE_ISSUE":
            return state.map(task => {
                if (task.id !== action.payload.taskId) return task;

                if (action.payload.subtaskId) {
                    return {
                        ...task,
                        subtasks: (task.subtasks || []).map(subtask =>
                            subtask.id === action.payload.subtaskId
                                ? {
                                    ...subtask,
                                    issues: (subtask.issues || []).map(issue =>
                                        issue.id === action.payload.issue.id
                                            ? action.payload.issue
                                            : issue
                                    )
                                }
                                : subtask
                        )
                    };
                }

                return {
                    ...task,
                    issues: (task.issues || []).map(issue =>
                        issue.id === action.payload.issue.id
                            ? action.payload.issue
                            : issue
                    )
                };
            });

        case "DELETE_ISSUE":
            return state.map(task => {
                if (task.id !== action.payload.taskId) return task;

                if (action.payload.subtaskId) {
                    return {
                        ...task,
                        subtasks: (task.subtasks || []).map(subtask =>
                            subtask.id === action.payload.subtaskId
                                ? {
                                    ...subtask,
                                    issues: (subtask.issues || []).filter(issue => issue.id !== action.payload.issueId)
                                }
                                : subtask
                        )
                    };
                }

                return {
                    ...task,
                    issues: (task.issues || []).filter(issue => issue.id !== action.payload.issueId)
                };
            });

        default:
            return state;
    }
}
