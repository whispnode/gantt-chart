"use client";

import { TaskProvider } from "@/hooks/context/task-context";
import { ThemeProvider } from "@/hooks/context/theme-context";
import { DefaultProp } from "@/types/default-prop";
import { useEffect, useState } from "react";

export default function Providers({ children }: DefaultProp) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // to avoid rehydration errors

    return (
        <ThemeProvider>
            <TaskProvider>{children}</TaskProvider>
        </ThemeProvider>
    );
}
