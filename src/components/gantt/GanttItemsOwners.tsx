import { useTasks } from "@/hooks/context/task-context";
import React, { Fragment } from "react";

export default function GanttItemsOwners() {
    const { tasks } = useTasks();
    return (
        <div className="flex flex-col relative h-[calc(100%-55px)] w-full">
            {tasks.map((task, taskId) => (
                <Fragment key={taskId}>
                    <div
                        className={`px-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                    >
                        <div className="text-sm py-1 text-blue-500 flex items-center gap-x-3">
                            <img
                                src={task.avator}
                                className="size-8 rounded-full "
                                alt="random avator"
                            />
                            {task.owner}
                        </div>
                    </div>
                    {task.subtasks?.map((subtask, subtaskId) => (
                        <Fragment key={subtaskId}>
                            <div
                                className={`px-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                            >
                                <div className="text-sm text-blue-500 py-1 flex items-center gap-x-3">
                                    <img
                                        src={subtask.avator}
                                        className="size-8 rounded-full "
                                        alt="random avator"
                                    />
                                    {subtask.owner}
                                </div>
                            </div>
                            {subtask.issues?.map((issue, issueId) => (
                                <div
                                    key={issueId}
                                    className={`px-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                                >
                                    <div className="text-sm text-blue-500 py-1 flex items-center gap-x-3">
                                        <img
                                            src={issue.avator}
                                            className="size-8 rounded-full "
                                            alt="random avator"
                                        />
                                        {issue.owner}
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ))}
                    {task.issues?.map((issue, issueId) => (
                        <div
                            key={issueId}
                            className={`px-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                        >
                            <div className="text-sm text-blue-500 py-1 flex items-center gap-x-3">
                                <img
                                    src={issue.avator}
                                    className="size-8 rounded-full "
                                    alt="random avator"
                                />
                                {issue.owner}
                            </div>
                        </div>
                    ))}
                </Fragment>
            ))}
        </div>
    );
}
