import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { z } from 'zod'
import { type Movie, movieSchema } from '@/validations'

const FAVORITES_STORAGE_KEY = 'favorites'

const favoritesSchema = z.array(movieSchema)

const loadFavorites = (): Movie[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    const result = favoritesSchema.safeParse(parsed)

    if (!result.success) {
      console.warn('⚠️ Invalid favorites in localStorage. Resetting.', result.error.issues)
      localStorage.removeItem(FAVORITES_STORAGE_KEY)
      return []
    }

    return result.data
  } catch {
    return []
  }
}

const saveFavorites = (favorites: Movie[]) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: create => ({
    addFavorite: create.reducer<Movie>((state, action: PayloadAction<Movie>) => {
      const exists = state.some(movie => movie.id === action.payload.id)
      if (!exists) {
        state.push(action.payload)
        saveFavorites(state)
      }
    }),
    removeFavorite: create.reducer<number>((state, action: PayloadAction<number>) => {
      const newState = state.filter(movie => movie.id !== action.payload)
      saveFavorites(newState)
      return newState
    }),
    clearFavorites: create.reducer(() => {
      saveFavorites([])
      return []
    }),
  }),
  selectors: {
    selectFavorites: state => state,
    selectFavoritesCount: state => state.length,
    selectIsFavorite: (state, movieId: number) => state.some(movie => movie.id === movieId),
  },
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export const { selectFavorites, selectFavoritesCount, selectIsFavorite } = favoritesSlice.selectors
export default favoritesSlice.reducer
