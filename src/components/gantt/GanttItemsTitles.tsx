import { useTasks } from "@/hooks/context/task-context";
import React, { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function GanttItemsTitles() {
    const {tasks} = useTasks();
    
    return (
        <div className="flex flex-col relative h-[calc(100%-55px)] w-full">
            {tasks.map((task, taskId) => (
                <Fragment key={taskId}>
                    <div
                        className={`pl-5 pr-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                    >
                        <div className="text-sm py-1 text-lime-500 flex items-center gap-x-3">
                            {task.subtasks?.length !== 0 ||
                            task.issues?.length !== 0 ? (
                                <BiChevronDown size={14} />
                            ) : (
                                <span className="min-w-[14px] min-h-[14px] grid place-items-center">
                                    <svg
                                        width="5"
                                        height="6"
                                        viewBox="0 0 5 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="2.5"
                                            cy="3"
                                            r="2.5"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                            )}
                            <span className="line-clamp-1">{task.name}</span>
                        </div>
                    </div>
                    {task.subtasks?.map((subtask, subtaskId) => (
                        <Fragment key={subtaskId}>
                            <div
                                className={`pl-[40px] pr-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                            >
                                <div className="text-sm text-yellow-500 py-1 flex items-center gap-x-3">
                                    {subtask.issues?.length !== 0 ? (
                                        <BiChevronDown size={14} />
                                    ) : (
                                        <span className="min-w-[14px] min-h-[14px] grid place-items-center">
                                            <svg
                                                width="5"
                                                height="6"
                                                viewBox="0 0 5 6"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="2.5"
                                                    cy="3"
                                                    r="2.5"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                    <span className="line-clamp-1">
                                        {subtask.name}
                                    </span>
                                </div>
                            </div>
                            {subtask.issues?.map((issue, issueId) => (
                                <Fragment key={issueId}>
                                    <div
                                        className={`pl-[60px] pr-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                                    >
                                        <div className="text-sm text-red-500 py-1 flex items-center gap-x-3">
                                            <span className="min-w-[14px] min-h-[14px] grid place-items-center">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10 9.33333V8.222C10 7.39133 10 6.976 9.82133 6.66666C9.70431 6.46399 9.53601 6.29568 9.33333 6.17866C9.024 6 8.60867 6 7.778 6H5.55533C4.72467 6 4.30933 6 4 6.17866C3.79732 6.29568 3.62902 6.46399 3.512 6.66666C3.33333 6.976 3.33333 7.39133 3.33333 8.222V9.33333M10 9.33333C10 9.95333 10 10.2627 9.94867 10.52C9.84579 11.0373 9.5918 11.5125 9.21883 11.8855C8.84586 12.2585 8.37066 12.5125 7.85333 12.6153C7.596 12.6667 7.28667 12.6667 6.66667 12.6667C6.04667 12.6667 5.73733 12.6667 5.48 12.6153C4.96267 12.5125 4.48747 12.2585 4.1145 11.8855C3.74153 11.5125 3.48754 11.0373 3.38467 10.52C3.33333 10.2627 3.33333 9.95333 3.33333 9.33333M10 9.33333H13.3333M3.33333 9.33333H0M6.66667 6V8.66666M8.66667 0.666664L7.33333 2.66666M4.66667 0.666664L6 2.66666M12 4.66666V5.33333C12 5.86376 11.7893 6.37247 11.4142 6.74754C11.0391 7.12262 10.5304 7.33333 10 7.33333M12 13.3333C12 12.8029 11.7893 12.2942 11.4142 11.9191C11.0391 11.544 10.5304 11.3333 10 11.3333M1.33333 4.66666V5.33333C1.33333 5.86376 1.54405 6.37247 1.91912 6.74754C2.29419 7.12262 2.8029 7.33333 3.33333 7.33333M1.33333 13.3333C1.33333 12.8029 1.54405 12.2942 1.91912 11.9191C2.29419 11.544 2.8029 11.3333 3.33333 11.3333M4.66667 4.66666C4.66667 4.04533 4.66667 3.73466 4.768 3.49C4.83501 3.32812 4.93326 3.18103 5.05715 3.05715C5.18103 2.93326 5.32812 2.83501 5.49 2.768C5.73467 2.66666 6.04533 2.66666 6.66667 2.66666C7.288 2.66666 7.59867 2.66666 7.84333 2.768C8.00521 2.83501 8.1523 2.93326 8.27618 3.05715C8.40007 3.18103 8.49832 3.32812 8.56533 3.49C8.66667 3.73466 8.66667 4.04533 8.66667 4.66666V6H4.66667V4.66666Z"
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0.666667"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="line-clamp-1">
                                                {issue.name}
                                            </span>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
                    {task.issues?.map((issue, issueId) => (
                        <Fragment key={issueId}>
                            <div
                                className={`pl-[40px] pr-5 relative border-b border-dashed border-border min-h-[60px] w-full flex items-center`}
                            >
                                <div className="text-sm text-red-500 py-1 flex items-center gap-x-3">
                                    <span className="min-w-[14px] min-h-[14px] grid place-items-center">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 9.33333V8.222C10 7.39133 10 6.976 9.82133 6.66666C9.70431 6.46399 9.53601 6.29568 9.33333 6.17866C9.024 6 8.60867 6 7.778 6H5.55533C4.72467 6 4.30933 6 4 6.17866C3.79732 6.29568 3.62902 6.46399 3.512 6.66666C3.33333 6.976 3.33333 7.39133 3.33333 8.222V9.33333M10 9.33333C10 9.95333 10 10.2627 9.94867 10.52C9.84579 11.0373 9.5918 11.5125 9.21883 11.8855C8.84586 12.2585 8.37066 12.5125 7.85333 12.6153C7.596 12.6667 7.28667 12.6667 6.66667 12.6667C6.04667 12.6667 5.73733 12.6667 5.48 12.6153C4.96267 12.5125 4.48747 12.2585 4.1145 11.8855C3.74153 11.5125 3.48754 11.0373 3.38467 10.52C3.33333 10.2627 3.33333 9.95333 3.33333 9.33333M10 9.33333H13.3333M3.33333 9.33333H0M6.66667 6V8.66666M8.66667 0.666664L7.33333 2.66666M4.66667 0.666664L6 2.66666M12 4.66666V5.33333C12 5.86376 11.7893 6.37247 11.4142 6.74754C11.0391 7.12262 10.5304 7.33333 10 7.33333M12 13.3333C12 12.8029 11.7893 12.2942 11.4142 11.9191C11.0391 11.544 10.5304 11.3333 10 11.3333M1.33333 4.66666V5.33333C1.33333 5.86376 1.54405 6.37247 1.91912 6.74754C2.29419 7.12262 2.8029 7.33333 3.33333 7.33333M1.33333 13.3333C1.33333 12.8029 1.54405 12.2942 1.91912 11.9191C2.29419 11.544 2.8029 11.3333 3.33333 11.3333M4.66667 4.66666C4.66667 4.04533 4.66667 3.73466 4.768 3.49C4.83501 3.32812 4.93326 3.18103 5.05715 3.05715C5.18103 2.93326 5.32812 2.83501 5.49 2.768C5.73467 2.66666 6.04533 2.66666 6.66667 2.66666C7.288 2.66666 7.59867 2.66666 7.84333 2.768C8.00521 2.83501 8.1523 2.93326 8.27618 3.05715C8.40007 3.18103 8.49832 3.32812 8.56533 3.49C8.66667 3.73466 8.66667 4.04533 8.66667 4.66666V6H4.66667V4.66666Z"
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0.666667"
                                            />
                                        </svg>
                                    </span>
                                    <span className="line-clamp-1">
                                        {issue.name}
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </div>
    );
}
