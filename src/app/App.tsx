import { Routing } from '../components/Routing/Routing.tsx'
import { ThemeProvider } from '@mui/material'
import { useAppSelector } from '../hooks/useAppSelector.ts'
import { getTheme } from '../theme.ts'
import { selectThemeMode } from '../store/themeSlice.ts'
import { useEffect } from 'react'
import { selectFavorites } from '../store/favoritesSlice.ts'

const FAVORITES_STORAGE_KEY = 'favorites'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const favorites = useAppSelector(selectFavorites)
  const theme = getTheme(themeMode)

  // Сохранение темы в body
  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode)
  }, [themeMode])

  // Сохранение избранного в localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  }, [favorites])

  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  )
}
