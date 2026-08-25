import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light';

const loadTheme = (): ThemeMode => {
    try {
        const stored = localStorage.getItem("themeMode");
        return stored === 'dark' || stored === 'light' ? stored : 'light';
    } catch {
        return 'light';
    }
};

const saveTheme = (mode: ThemeMode) => {
    localStorage.setItem("themeMode", mode);
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: loadTheme(),
    reducers: (create) => ({
        toggleTheme: create.reducer((state) => {
            const newMode: ThemeMode = state === 'light' ? 'dark' : 'light';
            saveTheme(newMode);
            return newMode;
        }),
        setTheme: create.reducer((_state, action: { payload: ThemeMode }) => {
            saveTheme(action.payload);
            return action.payload;
        }),
    }),
    selectors: {
        selectThemeMode: (state) => state,
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const { selectThemeMode } = themeSlice.selectors;
