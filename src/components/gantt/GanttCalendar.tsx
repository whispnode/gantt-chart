import { GanttCalendarType } from "@/types/gantt/gantt-calendar";
import { Fragment } from "react";

type Props = {
    ganttCalendar: GanttCalendarType;
};
export default function GanttCalendar({ ganttCalendar }: Props) {
    return (
        <>
            <div className="w-max h-full absolute flex left-0 top-0 z-0">
                {ganttCalendar.calendarList.map((month, monthIndex) => (
                    <Fragment key={monthIndex}>
                        {month.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                style={{
                                    minWidth: `${ganttCalendar.gantt_box_size}px`,
                                    width: `${ganttCalendar.gantt_box_size}px`,
                                    maxWidth: `${ganttCalendar.gantt_box_size}px`,
                                }}
                                className={`h-full border-dashed border-l ${
                                    monthIndex === 0 && dayIndex === 0
                                        ? "border-l-0"
                                        : "border-l"
                                } ${
                                    monthIndex !== 0 && day === 1
                                        ? "border-l-secondary z-[2]"
                                        : "border-l-border"
                                } ${
                                    ganttCalendar.currentDate.toDateString() ===
                                    new Date(
                                        ganttCalendar.startDate.getFullYear(),
                                        ganttCalendar.startDate.getMonth() +
                                            monthIndex,
                                        day
                                    ).toDateString()
                                        ? "!border-l-blue-500 !border-solid left-10 !z-[4]"
                                        : ""
                                }  
								 ${
                                     new Date(
                                         ganttCalendar.startDate.getFullYear(),
                                         ganttCalendar.startDate.getMonth() +
                                             monthIndex,
                                         day
                                     ).getDay() === 6 ||
                                     new Date(
                                         ganttCalendar.startDate.getFullYear(),
                                         ganttCalendar.startDate.getMonth() +
                                             monthIndex,
                                         day
                                     ).getDay() === 0
                                         ? "bg-muted"
                                         : ""
                                 } 
								  `}
                            ></div>
                        ))}
                    </Fragment>
                ))}
            </div>
            <div className="w-max h-[55px] bg-muted sticky top-0 z-[5] border-b border-b-border flex items-center">
                {ganttCalendar.calendarList.map((month, monthIndex) => (
                    <div
                        className="h-full flex flex-col justify-between"
                        key={monthIndex}
                    >
                        <p
                            className={`font-medium text-xs pl-[6px] w-full ${
                                monthIndex !== 0
                                    ? "border-l border-l-border border-dashed"
                                    : ""
                            } z-0 bg-clip-content pt-1 pb-1`}
                        >
                            <span className="sticky left-[400px]">
                                {new Intl.DateTimeFormat("local", {
                                    month: "short",
                                }).format(
                                    new Date(
                                        ganttCalendar.startDate.getFullYear(),
                                        ganttCalendar.startDate.getMonth() +
                                            monthIndex,
                                        1
                                    )
                                )}
                                <sup className="text-[8px] opacity-50">
                                    {new Date(
                                        ganttCalendar.startDate.getFullYear(),
                                        ganttCalendar.startDate.getMonth() +
                                            monthIndex,
                                        1
                                    ).getFullYear() !==
                                    ganttCalendar.currentDate.getFullYear()
                                        ? `’${`${new Date(
                                              ganttCalendar.startDate.getFullYear(),
                                              ganttCalendar.startDate.getMonth() +
                                                  monthIndex,
                                              1
                                          ).getFullYear()}`.slice(2, 4)}`
                                        : ""}
                                </sup>
                            </span>
                        </p>
                        <div className="flex items-center">
                            {month.map((day, dayIndex) => (
                                <p
                                    key={dayIndex}
                                    style={{
                                        width: `${ganttCalendar.gantt_box_size}px`,
                                        minWidth: `${ganttCalendar.gantt_box_size}px`,
                                        maxWidth: `${ganttCalendar.gantt_box_size}px`,
                                    }}
                                    className={`opacity-60 flex items-end justify-center text-xs py-1
									${
                                        ganttCalendar.currentDate.toDateString() ===
                                        new Date(
                                            ganttCalendar.startDate.getFullYear(),
                                            ganttCalendar.startDate.getMonth() +
                                                monthIndex,
                                            day
                                        ).toDateString()
                                            ? "bg-blue-300/20 z-0 sticky left-[400px]"
                                            : ""
                                    }
									`}
                                >
                                    {new Intl.DateTimeFormat("local", {
                                        weekday: "narrow",
                                    }).format(
                                        new Date(
                                            ganttCalendar.startDate.getFullYear(),
                                            ganttCalendar.startDate.getMonth() +
                                                monthIndex,
                                            day
                                        )
                                    )}
                                    {day}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
