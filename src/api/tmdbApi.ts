import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CreditsResponse, Genre, MovieDetails, MovieResponse } from '../types/movie.types.ts'

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: build => ({
    getPopularMovie: build.query<MovieResponse, number>({
      query: page => `/movie/popular?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getCategoryMovies: build.query<MovieResponse, { category: string; page: number }>({
      query: ({ category, page }) =>
        `/movie/${category}?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getSearchMovies: build.query<MovieResponse, { query: string; page: number }>({
      query: ({ query, page }) =>
        `/search/movie?query=${query}&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getMovieDetails: build.query<MovieDetails, number>({
      query: id => `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getMovieCredits: build.query<CreditsResponse, number>({
      query: id => `/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getSimilarMovies: build.query<MovieResponse, { id: number; page: number }>({
      query: ({ id, page }) =>
        `/movie/${id}/similar?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
    }),
    getDiscoverMovies: build.query<
      MovieResponse,
      {
        page: number
        sort_by?: string
        with_genres?: string
        'vote_average.gte'?: number
        'vote_average.lte'?: number
        'release_date.gte'?: string
        'release_date.lte'?: string
      }
    >({
      query: params => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value))
          }
        })
        searchParams.append('api_key', import.meta.env.VITE_API_KEY)
        return `/discover/movie?${searchParams.toString()}`
      },
    }),
    getGenres: build.query<{ genres: Genre[] }, void>({
      query: () => `/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`,
    }),
  }),
})

export const {
  useGetPopularMovieQuery,
  useGetCategoryMoviesQuery,
  useGetSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetDiscoverMoviesQuery,
  useGetGenresQuery,
} = tmdbApi
