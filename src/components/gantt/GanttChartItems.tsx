import React, { Fragment } from "react";
import GanttSubtask from "./GanttSubtask";
import GanttIssue from "./GanttIssue";
import GanttTask from "./GanttTask";
import SvgLink from "./SvgLink";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { useTasks } from "@/hooks/context/task-context";
import { Task, SubTask, Issues } from "@/types/gantt/tasks";

type Props = {
    ganttCalendar: GanttCalendarType;
    contents: (Task | SubTask | Issues)[];
};

export default function GanttChartItems({ ...props }: Props) {
    const { tasks } = useTasks();
    const { ganttCalendar, contents } = props;

    return (
        <div
            className="flex flex-col relative h-[calc(100%-55px)]"
            style={{
                width: `${
                    ganttCalendar.timelineWidth * ganttCalendar.gantt_box_size
                }px`,
            }}
        >
            {tasks.map((task, taskId) => (
                <Fragment key={taskId}>
                    <div
                        className={`relative overflow-hidden border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                    >
                        <GanttTask task={task} ganttCalendar={ganttCalendar} />
                    </div>
                    {task.subtasks?.map((subtask, subtaskId) => (
                        <Fragment key={subtaskId}>
                            <div
                                className={`relative overflow-hidden border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                            >
                                <GanttSubtask
                                    ganttCalendar={ganttCalendar}
                                    subtask={subtask}
                                    taskId={task.id}
                                />
                            </div>
                            {subtask.issues?.map((issue, issueId) => (
                                <div
                                    key={issueId}
                                    className={`relative overflow-hidden border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                                >
                                    <GanttIssue
                                        subtaskId={subtask.id}
                                        taskId={task.id}
                                        issue={issue}
                                        ganttCalendar={ganttCalendar}
                                    />
                                </div>
                            ))}
                        </Fragment>
                    ))}
                    {task.issues?.map((issue, issueId) => (
                        <div
                            key={issueId}
                            className={`relative overflow-hidden border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                        >
                            <GanttIssue
                                taskId={task.id}
                                issue={issue}
                                ganttCalendar={ganttCalendar}
                            />
                        </div>
                    ))}
                </Fragment>
            ))}
            {contents &&
                contents.map((content, index) => (
                    <SvgLink
                        key={index}
                        ganttCalendar={ganttCalendar}
                        parentItem={content}
                        activeList={contents}
                    />
                ))}
        </div>
    );
}
