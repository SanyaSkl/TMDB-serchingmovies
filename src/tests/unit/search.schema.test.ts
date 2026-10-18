import { describe, expect, it } from 'vitest'
import { searchQuerySchema } from '@/validations'

describe('searchQuerySchema', () => {
  it('accepts a query of 2–100 characters', () => {
    expect(searchQuerySchema.safeParse('Up').success).toBe(true)
    expect(searchQuerySchema.safeParse('A movie title').success).toBe(true)
  })

  it('trims leading and trailing whitespace', () => {
    expect(searchQuerySchema.parse('  Dune  ')).toBe('Dune')
  })

  it('rejects empty or too-short queries', () => {
    expect(searchQuerySchema.safeParse('').success).toBe(false)
    expect(searchQuerySchema.safeParse(' A ').success).toBe(false)
    expect(searchQuerySchema.safeParse('   ').success).toBe(false)
  })

  it('rejects queries longer than 100 characters', () => {
    expect(searchQuerySchema.safeParse('x'.repeat(101)).success).toBe(false)
  })
})
