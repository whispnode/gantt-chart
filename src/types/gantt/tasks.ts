// Define the structure for status categories
export type StatusCategory = "Not Started" | "Active" | "Done" | "Closed";

// Define Dependency Types for tasks, subtasks, and issues
export type Dependency = {
    id: string;
    type: "Task" | "SubTask" | "Issue";
};

// BaseItem: common fields for tasks, subtasks, and issues
type BaseItem = {
    id: string;
    name: string;
    avator:string;
    description: string;
    status: StatusCategory;
    startDate: Date;
    dueDate: Date;
    owner: string;
    assignee: string[];
    dependencies?: Dependency[];
};

// Issues type extending BaseItem
export type Issues = BaseItem & {};

// SubTask type extending BaseItem, with optional issues
export type SubTask = BaseItem & {
    issues?: Issues[];
};

// Task type extending BaseItem, with subtasks and issues
export type Task = BaseItem & {
    priority: "Low" | "Medium" | "High" | "Critical";
    subtasks?: SubTask[];
    issues?: Issues[];
};

export type TaskAction =
    | { type: "CREATE_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string } // task ID
    | { type: "UPDATE_TASK"; payload: Task }

    // SubTask actions
    | { type: "CREATE_SUBTASK"; payload: { taskId: string; subtask: SubTask } }
    | { type: "UPDATE_SUBTASK"; payload: { taskId: string; subtask: SubTask } }
    | { type: "DELETE_SUBTASK"; payload: { taskId: string; subtaskId: string } }

    // Issue actions
    | {
          type: "CREATE_ISSUE";
          payload: { taskId: string; subtaskId?: string; issue: Issues };
      }
    | {
          type: "UPDATE_ISSUE";
          payload: { taskId: string; subtaskId?: string; issue: Issues };
      }
    | {
          type: "DELETE_ISSUE";
          payload: { taskId: string; subtaskId?: string; issueId: string };
      };

export type TaskContextData = {
    tasks: Task[];
    dispatch: React.Dispatch<TaskAction>;
};
