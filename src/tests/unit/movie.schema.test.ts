import { describe, expect, it } from 'vitest'
import { movieResponseSchema, movieSchema } from '@/validations'

const validMovie = {
  id: 123,
  title: 'Test Movie',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.2,
  vote_count: 100,
  release_date: '2025-01-15',
  overview: 'A sample plot.',
}

describe('movieSchema', () => {
  it('accepts a valid movie', () => {
    expect(movieSchema.safeParse(validMovie).success).toBe(true)
  })

  it('rejects a non-positive movie ID', () => {
    expect(movieSchema.safeParse({ ...validMovie, id: 0 }).success).toBe(false)
  })

  it('rejects a rating outside the 0–10 range', () => {
    expect(movieSchema.safeParse({ ...validMovie, vote_average: 10.1 }).success).toBe(false)
    expect(movieSchema.safeParse({ ...validMovie, vote_average: -0.1 }).success).toBe(false)
  })

  it('rejects a negative vote count', () => {
    expect(movieSchema.safeParse({ ...validMovie, vote_count: -1 }).success).toBe(false)
  })

  it('uses the fallback title when the received title has the wrong type', () => {
    const result = movieSchema.safeParse({ ...validMovie, title: 123 })

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.title).toBe('Untitled')
  })

  it('uses an empty release date when the date format is invalid', () => {
    const result = movieSchema.safeParse({ ...validMovie, release_date: '15/01/2025' })

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.release_date).toBe('')
  })

  it('defaults a missing overview to an empty string', () => {
    const movieWithoutOverview = {
      id: validMovie.id,
      title: validMovie.title,
      poster_path: validMovie.poster_path,
      backdrop_path: validMovie.backdrop_path,
      vote_average: validMovie.vote_average,
      vote_count: validMovie.vote_count,
      release_date: validMovie.release_date,
    }
    const result = movieSchema.safeParse(movieWithoutOverview)

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.overview).toBe('')
  })
})

describe('movieResponseSchema', () => {
  it('accepts a paginated TMDB response', () => {
    const response = {
      page: 1,
      results: [validMovie],
      total_pages: 1,
      total_results: 1,
    }

    expect(movieResponseSchema.safeParse(response).success).toBe(true)
  })

  it('rejects a response with a missing results array', () => {
    expect(
      movieResponseSchema.safeParse({ page: 1, total_pages: 1, total_results: 0 }).success
    ).toBe(false)
  })
})
