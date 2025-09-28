import GanttItem from "@/components/gantt/GanttItem";
import useTaskActions from "@/hooks/actions/task-action";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { Task } from "@/types/gantt/tasks";

type Props = {
    task: Task;
    ganttCalendar: GanttCalendarType;
};

export default function GanttTask({ task, ganttCalendar }: Props) {
    const { updateTask } = useTaskActions();

    return (
        <GanttItem
            id={task.id}
            startDate={new Date(task.startDate)}
            dueDate={new Date(task.dueDate)}
            name={task.name}
            description={task.description}
            assignees={task.assignee}
            ganttCalendar={ganttCalendar}
            color="bg-lime-500"
            onDateUpdate={(start, due) => {
                updateTask({ ...task, startDate: start, dueDate: due });
            }}
        />
    );
}
