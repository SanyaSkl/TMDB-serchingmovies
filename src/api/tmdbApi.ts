import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {MovieResponse} from "../types/types.ts";


export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
    }),
    endpoints: (build) => ({
        getPopularMovie: build.query<MovieResponse, number>({
            query: (page) => `/movie/popular?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`,
        }),
        getCategoryMovies: build.query<MovieResponse, {category: string, page: number}>({
            query: ({category, page}) => `/movie/${category}?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`
        }),
        getSearchMovies: build.query<MovieResponse, {query: string, page:number}>({
            query: ({query, page}) => `/search/movie?query=${query}&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`
        }),
    }),
});

export const { useGetPopularMovieQuery, useGetCategoryMoviesQuery, useGetSearchMoviesQuery } = tmdbApi;