export type Theme = "light" | "dark";

export type ThemeAction = { type: "TOGGLE_THEME" };

export type ThemeContextData = {
    theme: Theme;
    dispatch: React.Dispatch<ThemeAction>;
};
