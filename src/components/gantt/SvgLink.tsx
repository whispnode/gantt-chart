"use client";

import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { Issues, SubTask, Task } from "@/types/gantt/tasks";
import { Fragment, useCallback, useEffect, useState } from "react";

type TaskType = Task | SubTask | Issues;

type Props = {
    ganttCalendar: GanttCalendarType;
    parentItem: TaskType;
    activeList: (Task | SubTask | Issues)[];
};

type ChildPosition = {
    left: number;
    height: number;
    childItem: TaskType;
};

type UndefinedNumber = number | undefined;

export default function SvgLink({ ...props }: Props) {
    const { ganttCalendar, parentItem, activeList } = props;
    const [childPositions, setChildPositions] = useState<ChildPosition[]>([]);

    const [parentLeft, setParentLeft] = useState<UndefinedNumber>(undefined);
    const [parentWidth, setParentWidth] = useState<UndefinedNumber>(undefined);
    const [parentHeight, setParentHeight] = useState<number>(0);

    const calcChildLeft = useCallback(
        (task: TaskType) => {
            const timeDifference =
                new Date(task.startDate).getTime() -
                new Date(ganttCalendar.startDate).getTime();
            const dayDifference = timeDifference / (1000 * 3600 * 24);
            return Math.floor(dayDifference) * ganttCalendar.gantt_box_size;
        },
        [ganttCalendar]
    );

    useEffect(() => {
        if (
            parentLeft === undefined ||
            parentWidth === undefined ||
            !Array.isArray(activeList) ||
            !Array.isArray(parentItem?.dependencies)
        ) {
            setChildPositions([]); // Optional: reset if conditions are not met
            return;
        }

        const newChildPositions: ChildPosition[] = [];

        activeList.forEach((item: TaskType, index: number) => {
            parentItem.dependencies?.forEach((depTask) => {
                if (
                    (depTask.type === "Task" ||
                        depTask.type === "SubTask" ||
                        depTask.type === "Issue") &&
                    item.id === depTask.id
                ) {
                    const childTaskLeft = calcChildLeft(item);
                    const childTaskHeight = index * 60 + 30;

                    newChildPositions.push({
                        left: childTaskLeft,
                        height: childTaskHeight,
                        childItem: item,
                    });
                }
            });
        });

        setChildPositions(newChildPositions);
    }, [parentLeft, parentWidth, activeList, parentItem, calcChildLeft]);

    useEffect(() => {
        if (parentItem) {
            setParentLeft(undefined);
            setParentWidth(undefined);
        }
    }, [parentItem]);

    // set parentHeight
    useEffect(() => {
        if (parentHeight === 0) {
            if (parentLeft !== undefined && parentWidth !== undefined) {
                if (activeList.length !== 0) {
                    activeList.forEach((item: TaskType, index: number) => {
                        if (item.id === parentItem.id) {
                            setParentHeight(index * 60 + 30);
                        }
                    });
                }
            }
        }
    }, [parentHeight, parentLeft, parentWidth, activeList, parentItem]);

    // calc parentLeft
    useEffect(() => {
        if (parentLeft === undefined) {
            if (parentItem && parentItem.dependencies?.length !== 0) {
                const timeDifference =
                    new Date(parentItem.startDate).getTime() -
                    ganttCalendar.startDate.getTime();
                const dayDifference = timeDifference / (1000 * 3600 * 24);
                setParentLeft(
                    Math.floor(dayDifference) * ganttCalendar.gantt_box_size
                );
            }
        }
    }, [parentItem, ganttCalendar, parentLeft]);

    // calc parentWidth
    useEffect(() => {
        if (parentWidth === undefined) {
            if (
                parentItem &&
                parentLeft !== undefined &&
                parentItem.dependencies?.length !== 0
            ) {
                const timeDifference =
                    new Date(parentItem.dueDate).getTime() -
                    ganttCalendar.startDate.getTime();
                const dayDifference = timeDifference / (1000 * 3600 * 24);
                const endLeft =
                    Math.floor(dayDifference) * ganttCalendar.gantt_box_size;
                setParentWidth(endLeft - parentLeft);
            }
        }
    }, [parentItem, parentWidth, parentLeft, ganttCalendar]);

    const renderPaths = () => {
        return childPositions.map(
            ({ left: childTaskLeft, height: childTaskHeight }, index) => {
                if (parentLeft === undefined || parentWidth === undefined)
                    return;

                const isParentAboveChild = parentHeight > childTaskHeight;
                const controlY1 =
                    parentLeft + parentWidth >= childTaskLeft
                        ? isParentAboveChild
                            ? parentHeight - 15
                            : parentHeight + 15
                        : isParentAboveChild
                        ? parentHeight + 15
                        : parentHeight - 15;

                const controlY2 =
                    parentLeft + parentWidth >= childTaskLeft
                        ? isParentAboveChild
                            ? childTaskHeight + 15
                            : childTaskHeight - 15
                        : isParentAboveChild
                        ? childTaskHeight - 15
                        : childTaskHeight + 15;

                const d = `M ${parentLeft + parentWidth} ${parentHeight} C ${
                    parentLeft + parentWidth + ganttCalendar.gantt_box_size * 2
                } ${controlY1}, ${
                    childTaskLeft - ganttCalendar.gantt_box_size * 2
                } ${controlY2}, ${childTaskLeft} ${childTaskHeight}`;

                return (
                    <Fragment key={index}>
                        <path
                            d={d}
                            stroke="currentColor"
                            strokeWidth={1.8}
                            fill="none"
                            className="focus:border-none focus:outline-none"
                        />
                        <circle
                            cx={parentLeft + parentWidth}
                            cy={parentHeight}
                            r="5"
                            fill="currentColor"
                        />
                        <polygon
                            points={`${childTaskLeft}, ${childTaskHeight - 5} ${
                                childTaskLeft - 5
                            }, ${childTaskHeight} ${childTaskLeft},${
                                childTaskHeight + 5
                            } ${childTaskLeft + 5}, ${childTaskHeight}`}
                            fill="currentColor"
                        />
                    </Fragment>
                );
            }
        );
    };

    return (
        <>
            {parentLeft !== undefined &&
                parentWidth !== undefined &&
                parentHeight !== undefined &&
                activeList.length !== 0 && (
                    <svg
                        width={
                            ganttCalendar.timelineWidth *
                            ganttCalendar.gantt_box_size
                        }
                        height={activeList.length * 60}
                        viewBox={`0 0 ${
                            ganttCalendar.timelineWidth *
                            ganttCalendar.gantt_box_size
                        } ${activeList.length * 60}`}
                        className="absolute z-[3] text-secondary"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {renderPaths()}
                    </svg>
                )}
        </>
    );
}
