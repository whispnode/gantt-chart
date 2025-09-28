import { Theme, ThemeAction } from "@/types/theme";

export const initTheme: Theme = "dark";

export function ThemeReducer(state: Theme = initTheme, action: ThemeAction) {
    switch (action.type) {
        case "TOGGLE_THEME":
            return state === "dark" ? "light" : "dark";
        default:
            return state;
    }
}
