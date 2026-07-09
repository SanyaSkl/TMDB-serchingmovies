import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Movie} from "../types/types.ts";



const loadFavorites = (): Movie[] => {
    try {
        const stored = localStorage.getItem("favorites")
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

const saveFavorite = (favorites: Movie[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}



export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: loadFavorites(),
    reducers: (create) => ({
        addFavorite: create.reducer((state, action: PayloadAction<Movie>) => {
            const exists = state.some(movie => movie.id === action.payload.id)
            if (!exists) {
                state.push(action.payload)
                saveFavorite(state)
            }
        }),
        removeFavorite: create.reducer((state, action: PayloadAction<number>) => {
            const newState = state.filter(movie => movie.id !== action.payload)
            saveFavorite(newState)
            return newState
        })
    })
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
