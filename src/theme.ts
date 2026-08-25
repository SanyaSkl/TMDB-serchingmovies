import type {ThemeMode} from "./store/themeSlice.ts";
import {createTheme} from "@mui/material/styles";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#01b4e4"
            },
            background: {
                default: themeMode === 'light' ? '#f5f5f5' : '#121212',
                paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
            },
            text: {
                primary: themeMode === 'light' ? '#333333' : '#ffffff',
                secondary: themeMode === 'light' ? '#666666' : '#aaaaaa',
            },
        },
    });
};