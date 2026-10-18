import {envSchema} from "@/validations/env.schema.ts";
import {describe, expect, it} from 'vitest'

const validEnv = {
    VITE_BASE_URL: 'https://api.themoviedb.org/3',
    VITE_API_KEY: '835a7613256cf91d6b930d5102e1d02d',
};

describe('envSchema', () => {
    it('accepts a valid TMDB base URL and API key', () => {
        const result = envSchema.safeParse(validEnv);

        expect(result.success).toBe(true);
    })

    it('rejects an invalid base URL', () => {
        expect(envSchema.safeParse({...validEnv, VITE_BASE_URL: 'not-a-url'}).success).toBe(false)
    })

    it('rejects a missing or too-short API key', () => {
        expect(envSchema.safeParse({...validEnv, VITE_API_KEY: ''}).success).toBe(false)
        expect(envSchema.safeParse({...validEnv, VITE_API_KEY: 'short'}).success).toBe(false)
    })
})