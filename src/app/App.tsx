import {Routing} from "../components/Routing/Routing.tsx";
import {ThemeProvider} from "@mui/material";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {getTheme} from "../theme.ts";
import {selectThemeMode} from "../store/themeSlice.ts";
import {useEffect} from "react";



export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    useEffect(() => {
        document.body.setAttribute("data-theme", themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            <div data-theme={themeMode}>
                <Routing/>
            </div>
        </ThemeProvider>
    )
}
