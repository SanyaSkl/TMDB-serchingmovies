import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../api/tmdbApi.ts'
import { favoritesSlice } from './favoritesSlice.ts'
import { themeSlice } from './themeSlice.ts'

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [favoritesSlice.name]: favoritesSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tmdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
