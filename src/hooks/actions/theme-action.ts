import { useTheme } from "../context/theme-context";

export default function useThemeActions() {
    const { theme, dispatch } = useTheme();

    function toggle_theme() {
        const newTheme = theme === "dark" ? "light" : "dark";
       
        dispatch({ type: "TOGGLE_THEME" });

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);

            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(theme);
        }
    }

    return { toggle_theme };
}
