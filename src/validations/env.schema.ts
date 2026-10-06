import { z } from 'zod';

export const envSchema = z.object({
    VITE_BASE_URL: z.httpUrl('VITE_BASE_URL must be a valid URL'),
    VITE_API_KEY: z
        .string()
        .min(1, 'VITE_API_KEY is required')
        .min(32, 'VITE_API_KEY looks too short'),
})