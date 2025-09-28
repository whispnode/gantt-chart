import GanttItem from "@/components/gantt/GanttItem";
import useTaskActions from "@/hooks/actions/task-action";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { SubTask } from "@/types/gantt/tasks";

type Props = {
    subtask: SubTask;
    ganttCalendar: GanttCalendarType;
    taskId: string;
};

export default function GanttSubtask({
    subtask,
    ganttCalendar,
    taskId,
}: Props) {
    const { updateSubtask } = useTaskActions();

    return (
        <GanttItem
            id={subtask.id}
            startDate={new Date(subtask.startDate)}
            dueDate={new Date(subtask.dueDate)}
            name={subtask.name}
            description={subtask.description}
            assignees={subtask.assignee}
            ganttCalendar={ganttCalendar}
            color="bg-yellow-500"
            onDateUpdate={(start, due) => {
                updateSubtask(taskId, {
                    ...subtask,
                    startDate: start,
                    dueDate: due,
                });
            }}
        />
    );
}
