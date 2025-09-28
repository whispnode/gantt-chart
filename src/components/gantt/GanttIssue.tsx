import GanttItem from "@/components/gantt/GanttItem";
import useTaskActions from "@/hooks/actions/task-action";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { Issues } from "@/types/gantt/tasks";

type Props = {
    issue: Issues;
    ganttCalendar: GanttCalendarType;
    taskId: string;
    subtaskId?: string;
};

export default function GanttIssue({
    issue,
    ganttCalendar,
    taskId,
    subtaskId,
}: Props) {
    const { updateIssue } = useTaskActions();

    return (
        <GanttItem
            id={issue.id}
            startDate={new Date(issue.startDate)}
            dueDate={new Date(issue.dueDate)}
            name={issue.name}
            description={issue.description}
            assignees={issue.assignee}
            ganttCalendar={ganttCalendar}
            color="bg-red-500"
            onDateUpdate={(start, due) => {
                updateIssue(
                    taskId,
                    {
                        ...issue,
                        startDate: start,
                        dueDate: due,
                    },
                    subtaskId
                );
            }}
        />
    );
}
