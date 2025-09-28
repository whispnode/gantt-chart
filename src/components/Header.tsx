"use client";

import useThemeActions from "@/hooks/actions/theme-action";
import { useTheme } from "@/hooks/context/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Header() {
    const { toggle_theme } = useThemeActions();
    const { theme } = useTheme();

    return (
        <div className="flex items-center justify-between w-full mx-auto px-12 h-14 border-b border-b-border">
            <p className="text-lg font-bold">Gantt Chart</p>
            <button
                type="button"
                className="size-12 rounded-full flex items-center justify-center"
                onClick={toggle_theme}
            >
                {theme === 'light' ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
        </div>
    );
}
