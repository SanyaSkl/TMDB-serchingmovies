import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../types/movie.types.ts'

const FAVORITES_STORAGE_KEY = 'favorites'

const loadFavorites = (): Movie[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: create => ({
    addFavorite: create.reducer<Movie>((state, action: PayloadAction<Movie>) => {
      const exists = state.some(movie => movie.id === action.payload.id)
      if (!exists) {
        state.push(action.payload)
      }
    }),
    removeFavorite: create.reducer<number>((state, action: PayloadAction<number>) => {
      const index = state.findIndex(movie => movie.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    clearFavorites: create.reducer(() => {
      return []
    }),
  }),
  selectors: {
    selectFavorites: state => state,
    selectFavoritesCount: state => state.length,
    selectIsFavorite: (state, movieId: number) => state.some(movie => movie.id === movieId),
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export const { selectFavorites, selectIsFavorite } = favoritesSlice.selectors
