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
    }),
});

export const { useGetPopularMovieQuery } = tmdbApi;