"use client";

import { useTasks } from "@/hooks/context/task-context";
import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { GanttCalendarLogic } from "@/utils/gantt-calendar-logic";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Issues, SubTask, Task } from "@/types/gantt/tasks";
import GanttCalendar from "./GanttCalendar";
import GanttChartItems from "./GanttChartItems";
import GanttItemsTitles from "./GanttItemsTitles";
import GanttItemsOwners from "./GanttItemsOwners";

export default function GanttMain() {
    const { tasks } = useTasks();

    const [ganttCalendar, setGanttCalendar] = useState<GanttCalendarType>({
        currentDate: new Date(),
        calendarList: [],
        startDate: new Date(new Date().getFullYear(), 8, 10),
        endDate: new Date(new Date().getFullYear() + 1, 11, 31),
        timelineWidth: 0,
        gantt_box_size: 40,
    });

    const [contents, setContents] = useState<(Task | SubTask | Issues)[]>([]);

    //generate contents
    useEffect(() => {
        if (tasks.length === 0) {
            setContents([]);
            return;
        }

        const tempContents: (Task | SubTask | Issues)[] = [];

        tasks.forEach((task) => {
            tempContents.push(task);
            task.subtasks?.forEach((subtask) => {
                tempContents.push(subtask);
                subtask.issues?.forEach((issue) => {
                    tempContents.push(issue);
                });
            });
            task.issues?.forEach((issue) => {
                tempContents.push(issue);
            });
        });

        setContents(tempContents);
    }, [tasks]);

    // generate calendarlist
    useEffect(() => {
        const updateGanttCalendar = { ...ganttCalendar };
        if (updateGanttCalendar.calendarList.length === 0) {
            GanttCalendarLogic.generateCalendarList(updateGanttCalendar);
            setGanttCalendar(updateGanttCalendar);
        }
    }, [ganttCalendar]);

    // update timelinewidth
    useEffect(() => {
        const updateGanttCalendar = { ...ganttCalendar };
        if (updateGanttCalendar.timelineWidth === 0) {
            if (updateGanttCalendar.calendarList.length !== 0) {
                GanttCalendarLogic.setTimelineWidth(updateGanttCalendar);
                setGanttCalendar(updateGanttCalendar);
            }
        }
    }, [ganttCalendar]);

    return (
        <div className="w-full h-[calc(100vh-3.5rem)] flex relative overflow-auto">
            <div className="w-max sticky h-full left-0 z-[6] bg-background">
                <div className="max-w-[250px] h-max relative border-r border-r-border">
                    <div className="w-full bg-background">
                        <div className="px-5 min-w-[250px] sticky top-0 z-[5] border-r border-r-border border-b border-b-border h-[55px] flex items-center gap-x-3 text-[0.9375rem]">
                            <BiChevronDown size={14} />
                            Task[s]
                        </div>
                        <GanttItemsTitles />
                    </div>
                </div>
            </div>
            <div className="w-max sticky h-full left-[250px] z-[6] bg-background">
                <div className="max-w-[150px] h-max relative border-r border-r-border">
                    <div className="w-full bg-background">
                        <div className="px-5 min-w-[150px] bg-muted sticky top-0 z-[5] border-r border-r-border border-b border-b-border h-[55px] flex items-center text-[0.9375rem]">
                            Owner
                        </div>
                        <GanttItemsOwners />
                    </div>
                </div>
            </div>
            <div className="w-full h-full">
                <div className="w-full h-max relative">
                    {ganttCalendar.calendarList.length !== 0 && (
                        <>
                            <GanttCalendar ganttCalendar={ganttCalendar} />
                            {ganttCalendar.timelineWidth !== 0 && (
                                <GanttChartItems
                                    contents={contents}
                                    ganttCalendar={ganttCalendar}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
