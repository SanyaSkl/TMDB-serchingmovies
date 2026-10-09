import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {ZodType} from 'zod'
import {env} from '../config/env'
import {
    type CreditsResponse,
    creditsResponseSchema,
    type Genre,
    genresResponseSchema,
    type MovieDetails,
    movieDetailsSchema,
    type MovieResponse,
    movieResponseSchema,
} from '@/validations'

const validate = <T>(schema: ZodType<T>) => (data: unknown): T => {
    if (import.meta.env.DEV) {
        return schema.parse(data)
    }
    return data as T
}

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: env.VITE_BASE_URL,
    }),
    endpoints: build => ({
        getPopularMovie: build.query<MovieResponse, number>({
            query: page => `/movie/popular?page=${page}&api_key=${env.VITE_API_KEY}`,  // ← ИЗ ENV
            transformResponse: validate(movieResponseSchema),
        }),
        getCategoryMovies: build.query<MovieResponse, { category: string; page: number }>({
            query: ({category, page}) =>
                `/movie/${category}?page=${page}&api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(movieResponseSchema),
        }),
        getSearchMovies: build.query<MovieResponse, { query: string; page: number }>({
            query: ({query, page}) =>
                `/search/movie?query=${query}&page=${page}&api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(movieResponseSchema),
        }),
        getMovieDetails: build.query<MovieDetails, number>({
            query: id => `/movie/${id}?api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(movieDetailsSchema),
        }),
        getMovieCredits: build.query<CreditsResponse, number>({
            query: id => `/movie/${id}/credits?api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(creditsResponseSchema),
        }),
        getSimilarMovies: build.query<MovieResponse, { id: number; page: number }>({
            query: ({id, page}) =>
                `/movie/${id}/similar?page=${page}&api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(movieResponseSchema),
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
                searchParams.append('api_key', env.VITE_API_KEY)
                return `/discover/movie?${searchParams.toString()}`
            },
            transformResponse: validate(movieResponseSchema),
        }),
        getGenres: build.query<{ genres: Genre[] }, void>({
            query: () => `/genre/movie/list?api_key=${env.VITE_API_KEY}`,
            transformResponse: validate(genresResponseSchema),
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