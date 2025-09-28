"use client";

import { useDraggable } from "@/hooks/useDraggable";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { useEffect, useRef, useState } from "react";

type GanttItemProps = {
    id: string;
    startDate: Date;
    dueDate: Date;
    name: string;
    description: string;
    assignees: string[];
    ganttCalendar: GanttCalendarType;
    color: string;
    onDateUpdate?: (start: Date, due: Date, position: number) => void;
};

export default function GanttItem({
    id,
    startDate,
    dueDate,
    name,
    description,
    assignees,
    ganttCalendar,
    color,
    onDateUpdate,
}: GanttItemProps) {
    const [initLeft, setInitLeft] = useState<number | undefined>(undefined);
    const [taskWidth, setTaskWidth] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLDivElement>(null);

    const visibleAssignees = assignees.slice(0, 3);

    // Calculate initLeft
    useEffect(() => {
        if (initLeft === undefined) {
            const timeDiff =
                startDate.getTime() - ganttCalendar.startDate.getTime();
            const dayDiff = timeDiff / (1000 * 3600 * 24);
            setInitLeft(Math.floor(dayDiff) * ganttCalendar.gantt_box_size);
        }
    }, [initLeft, startDate, ganttCalendar]);

    // Calculate taskWidth
    useEffect(() => {
        if (taskWidth === undefined && initLeft !== undefined) {
            const timeDiff =
                dueDate.getTime() - ganttCalendar.startDate.getTime();
            const dayDiff = timeDiff / (1000 * 3600 * 24);
            const endLeft = Math.floor(dayDiff) * ganttCalendar.gantt_box_size;
            setTaskWidth(endLeft - initLeft);
        }
    }, [taskWidth, dueDate, ganttCalendar, initLeft]);

    // Setup dragging
    useDraggable(ref, {
        data: id,
        gridSpacing: ganttCalendar.gantt_box_size,
        initLeft,
        maxTimelineWidth:
            ganttCalendar.timelineWidth * ganttCalendar.gantt_box_size,
        onPositionUpdate: (newPosition) => {
            if (taskWidth === undefined) return;

            setInitLeft(newPosition);

            const newStart = new Date(ganttCalendar.startDate);
            newStart.setDate(
                newStart.getDate() + newPosition / ganttCalendar.gantt_box_size
            );

            const newDue = new Date(newStart);
            newDue.setDate(
                newDue.getDate() + taskWidth / ganttCalendar.gantt_box_size
            );

            if (onDateUpdate) onDateUpdate(newStart, newDue, newPosition);
        },
    });

    return (
        <div
            ref={ref}
            style={{ left: `${initLeft}px`, width: `${taskWidth}px` }}
            className={`bg-${color}-500 z-[4] flex items-center px-4 h-[45px] absolute cursor-pointer`}
        >
            <div
                className={`text-white w-full h-full flex items-center gap-x-3`}
            >
                <div className="flex w-max items-center -space-x-3 text-black">
                    {visibleAssignees.map((a, i) => (
                        <div
                            key={i}
                            className={`size-8 bg-lime-50 grid place-items-center text-sm rounded-full`}
                        >
                            {a.charAt(1).toUpperCase()}
                        </div>
                    ))}
                    {assignees.length - visibleAssignees.length > 0 && (
                        <div className="size-8 text-card-foreground bg-card grid place-items-center text-sm rounded-full">
                            +{assignees.length - visibleAssignees.length}
                        </div>
                    )}
                </div>
                <div
                    style={{
                        width: `calc(100% - ${
                            (assignees.length - visibleAssignees.length > 0
                                ? visibleAssignees.length + 1
                                : visibleAssignees.length) * 32
                        }px - 16px)`,
                    }}
                    className="flex-col flex"
                >
                    <p className="text-sm font-medium text-nowrap overflow-hidden text-ellipsis">
                        {name}
                    </p>
                    <span className="text-xs overflow-hidden text-nowrap text-ellipsis">
                        {description}
                    </span>
                </div>
            </div>
        </div>
    );
}
