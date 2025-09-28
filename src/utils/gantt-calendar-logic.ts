import { GanttCalendarType } from "@/types/gantt/gantt-calendar";

export const GanttCalendarLogic = {
    generateCalendarList: function (ganttCalendar: GanttCalendarType) {
        ganttCalendar.calendarList.length = 0;
        const yearDuration =
            ganttCalendar.endDate.getFullYear() -
            ganttCalendar.startDate.getFullYear() +
            1;

        for (let year = 0; year < yearDuration; year++) {
            const currentYear = ganttCalendar.startDate.getFullYear() + year;
            const endMonth =
                year === yearDuration - 1
                    ? ganttCalendar.endDate.getMonth()
                    : 11;

            for (
                let month = year === 0 ? ganttCalendar.startDate.getMonth() : 0;
                month <= endMonth;
                month++
            ) {
                const daysInMonth = new Date(
                    currentYear,
                    month + 1,
                    0
                ).getDate();
                const monthList: number[] = [];

                for (
                    let day =
                        year === 0 &&
                        month === ganttCalendar.startDate.getMonth()
                            ? ganttCalendar.startDate.getDate()
                            : 1;
                    day <=
                    (year === yearDuration - 1 &&
                    month === ganttCalendar.endDate.getMonth()
                        ? ganttCalendar.endDate.getDate()
                        : daysInMonth);
                    day++
                ) {
                    monthList.push(day);
                }
                ganttCalendar.calendarList.push(monthList);
            }
        }
    },
    setTimelineWidth: function (ganttCalendar: GanttCalendarType) {
        ganttCalendar.calendarList.forEach((value) => {
            value.forEach(() => {
                ganttCalendar.timelineWidth += 1;
            });
        });
    },
};
