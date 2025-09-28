"use client";

import { DefaultProp } from "@/types/default-prop";
import { Theme, ThemeContextData } from "@/types/theme";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initTheme, ThemeReducer } from "../reducers/theme-reducer";

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ThemeProvider = ({ children }: DefaultProp) => {
    const [theme, dispatch] = useReducer(ThemeReducer, initTheme, () => {
        if (typeof window !== "undefined") {
            const prefLocal = localStorage.getItem("theme") as Theme | null;
            if (prefLocal) return prefLocal;

            const prefSystem = window.matchMedia(
                "prefers-color-scheme: dark"
            ).matches;

            return prefSystem ? "dark" : "light";
        }
        return initTheme;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
            
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};

function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
}

export { ThemeProvider, useTheme };
