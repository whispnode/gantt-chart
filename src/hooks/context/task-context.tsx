"use client";

import { DefaultProp } from "@/types/default-prop";
import { Task, TaskContextData } from "@/types/gantt/tasks";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initTasks, TaskReducer } from "../reducers/task-reducer";
import { getDummyTasks } from "@/data/dummy-tasks";

const TaskContext = createContext<TaskContextData | undefined>(undefined);

function TaskProvider({ children }: DefaultProp) {
    const [tasks, dispatch] = useReducer(TaskReducer, initTasks, () => {
        //lazy init from localstorage
        if (typeof window !== "undefined") {
            const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) {
                try {
                    const parsedTask = JSON.parse(storedTasks) as Task[];
                    return parsedTask;
                } catch (error) {
                    console.warn("failed to parse tasked: ", error);
                }
            }
        }
        return getDummyTasks();
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

const useTasks = () => {
    const context = useContext<TaskContextData | undefined>(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within TaskProvider");
    }
    return context;
};

export { TaskProvider, useTasks };
