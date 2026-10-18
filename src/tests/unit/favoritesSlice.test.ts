import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie } from '@/validations'
import { addFavorite, clearFavorites, favoritesSlice, removeFavorite } from '@/store/favoritesSlice.ts'

const movie: Movie = {
  id: 123,
  title: 'Test Movie',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.2,
  vote_count: 100,
  release_date: '2025-01-15',
  overview: 'A sample plot.',
}

const reducer = favoritesSlice.reducer

describe('favoritesSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a movie to favorites and persists the result', () => {
    const nextState = reducer([], addFavorite(movie))

    expect(nextState).toEqual([movie])
    expect(JSON.parse(localStorage.getItem('favorites') ?? 'null')).toEqual([movie])
  })

  it('does not add a duplicate movie', () => {
    const stateWithMovie = reducer([], addFavorite(movie))
    const persistedBeforeDuplicate = localStorage.getItem('favorites')
    const nextState = reducer(stateWithMovie, addFavorite(movie))

    expect(nextState).toHaveLength(1)
    expect(nextState[0].id).toBe(movie.id)
    expect(localStorage.getItem('favorites')).toBe(persistedBeforeDuplicate)
  })

  it('removes a movie by ID and persists the remaining list', () => {
    const nextState = reducer([movie], removeFavorite(movie.id))

    expect(nextState).toEqual([])
    expect(localStorage.getItem('favorites')).toBe('[]')
  })

  it('clears every favorite and persists an empty list', () => {
    const nextState = reducer([movie], clearFavorites())

    expect(nextState).toEqual([])
    expect(localStorage.getItem('favorites')).toBe('[]')
  })

  it('loads valid favorites from localStorage during initialization', async () => {
    localStorage.setItem('favorites', JSON.stringify([movie]))
    vi.resetModules()

    const { favoritesSlice: freshSlice } = await import('../../store/favoritesSlice.ts')

    expect(freshSlice.getInitialState()).toEqual([movie])
  })

  it('recovers from malformed JSON in localStorage and clears the broken value', async () => {
    localStorage.setItem('favorites', '{broken json')
    vi.resetModules()

    const { favoritesSlice: freshSlice } = await import('../../store/favoritesSlice.ts')

    expect(freshSlice.getInitialState()).toEqual([])
    expect(localStorage.getItem('favorites')).toBeNull()
  })

  it('falls back to an empty list and removes structurally invalid stored data', async () => {
    localStorage.setItem('favorites', JSON.stringify([{ id: 0, title: 'Invalid' }]))
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.resetModules()

    const { favoritesSlice: freshSlice } = await import('../../store/favoritesSlice.ts')

    expect(freshSlice.getInitialState()).toEqual([])
    expect(localStorage.getItem('favorites')).toBeNull()
    expect(warning).toHaveBeenCalledTimes(1)
  })
})
