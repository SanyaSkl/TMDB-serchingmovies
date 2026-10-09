import {z} from 'zod';

// БАЗОВЫЕ СХЕМЫ
export const genreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const movieSchema = z.object({
    id: z.number().positive(),
    title: z.string().catch('Untitled'),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable().optional(),
    vote_average: z.number().min(0).max(10),
    vote_count: z.number().nonnegative(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).catch(''),
    overview: z.string().default(''),
});

// MOVIE RESPONSE (для /popular, /search, /discover)
export const movieResponseSchema = z.object({
    page: z.number().positive(),
    results: z.array(movieSchema),
    total_pages: z.number().nonnegative(),
    total_results: z.number().nonnegative(),
});

// MOVIE DETAILS (для /movie/{id})
export const movieDetailsSchema = movieSchema.extend({
    backdrop_path: z.string().nullable(),
    runtime: z.number().nullable(),
    status: z.string(),
    tagline: z.string().nullable(),
    budget: z.number(),
    revenue: z.number(),
    genres: z.array(genreSchema),
});

// CREDITS (для /movie/{id}/credits)
export const actorSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
    order: z.number().optional(),
});

export const creditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(actorSchema),
});

// GENRES (для /genre/movie/list)
export const genresResponseSchema = z.object({
    genres: z.array(genreSchema),
});

// TYPES через z.infer
export type Genre = z.infer<typeof genreSchema>;
export type Movie = z.infer<typeof movieSchema>;
export type MovieResponse = z.infer<typeof movieResponseSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type Actor = z.infer<typeof actorSchema>;
export type CreditsResponse = z.infer<typeof creditsResponseSchema>;