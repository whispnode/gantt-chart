import { Task, SubTask, Issues } from "@/types/gantt/tasks";
import { useTasks } from "../context/task-context";

export default function useTaskActions() {
    const { dispatch } = useTasks();

    // Task actions
    function createTask(task: Task) {
        dispatch({ type: "CREATE_TASK", payload: task });
    }

    function updateTask(task: Task) {
        dispatch({ type: "UPDATE_TASK", payload: task });
    }

    function deleteTask(id: string) {
        dispatch({ type: "DELETE_TASK", payload: id });
    }

    // SubTask actions
    function createSubtask(taskId: string, subtask: SubTask) {
        dispatch({ type: "CREATE_SUBTASK", payload: { taskId, subtask } });
    }

    function updateSubtask(taskId: string, subtask: SubTask) {
        dispatch({ type: "UPDATE_SUBTASK", payload: { taskId, subtask } });
    }

    function deleteSubtask(taskId: string, subtaskId: string) {
        dispatch({ type: "DELETE_SUBTASK", payload: { taskId, subtaskId } });
    }

    // Issue actions
    function createIssue(taskId: string, issue: Issues, subtaskId?: string) {
        dispatch({
            type: "CREATE_ISSUE",
            payload: { taskId, subtaskId, issue },
        });
    }

    function updateIssue(taskId: string, issue: Issues, subtaskId?: string) {
        dispatch({
            type: "UPDATE_ISSUE",
            payload: { taskId, subtaskId, issue },
        });
    }

    function deleteIssue(taskId: string, issueId: string, subtaskId?: string) {
        dispatch({
            type: "DELETE_ISSUE",
            payload: { taskId, subtaskId, issueId },
        });
    }

    return {
        // Tasks
        createTask,
        updateTask,
        deleteTask,

        // Subtasks
        createSubtask,
        updateSubtask,
        deleteSubtask,

        // Issues
        createIssue,
        updateIssue,
        deleteIssue,
    };
}
