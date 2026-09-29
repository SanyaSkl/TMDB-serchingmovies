import { useState } from 'react'

type Filters = {
  genres: number[]
  sortBy: string
  minRating: number
  maxRating: number
  minYear: string
  maxYear: string
}

const getCurrentYear = () => String(new Date().getFullYear())

const initialFilters: Filters = {
  genres: [],
  sortBy: 'popularity.desc',
  minRating: 0,
  maxRating: 10,
  minYear: '1920',
  maxYear: getCurrentYear(),
}

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters)

  /** Обновление одного поля */
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  /** Сброс всех фильтров */
  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, updateFilter, resetFilters }
}
