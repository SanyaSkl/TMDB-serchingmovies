import {ThemeProvider} from '@mui/material'
import {getTheme} from '../theme.ts'
import {selectThemeMode} from '../store/themeSlice.ts'
import {useEffect} from 'react'
import {Routing} from "@/components/Layout/Routing/Routing.tsx";
import {useAppSelector} from "@/hooks/useAppSelector.ts";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    // Сохранение темы в body
    useEffect(() => {
        document.body.setAttribute('data-theme', themeMode)
        return () => {
            document.body.removeAttribute('data-theme')
        }
    }, [themeMode])

    return (
        <ThemeProvider theme={theme}>
            <Routing/>
        </ThemeProvider>
    )
}
