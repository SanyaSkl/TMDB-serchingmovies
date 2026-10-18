import { describe, expect, it } from 'vitest'
import { setTheme, themeSlice, toggleTheme } from '@/store/themeSlice.ts'

const reducer = themeSlice.reducer

describe('themeSlice', () => {
  it('toggles light to dark and persists the choice', () => {
    const nextMode = reducer('light', toggleTheme())

    expect(nextMode).toBe('dark')
    expect(localStorage.getItem('themeMode')).toBe('dark')
  })

  it('toggles dark to light and persists the choice', () => {
    const nextMode = reducer('dark', toggleTheme())

    expect(nextMode).toBe('light')
    expect(localStorage.getItem('themeMode')).toBe('light')
  })

  it('sets a specific theme', () => {
    const nextMode = reducer('light', setTheme('dark'))

    expect(nextMode).toBe('dark')
    expect(localStorage.getItem('themeMode')).toBe('dark')
  })
})
