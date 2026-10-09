import {useMemo, useState} from 'react'
import {useGetDiscoverMoviesQuery} from '@/api/tmdbApi.ts'
import {useFilters} from '@/hooks/useFilters.ts'
import {useDebounce} from '@/hooks/useDebounce.ts'
import {useMediaQuery} from '@/hooks/useMediaQuery.ts'
import {Slider, TextField} from '@mui/material'
import style from './FilteredPage.module.css'
import {MovieGridSkeleton} from '@/components/skeletons'
import {GenreFilter} from '@/components/movie/GenreFilter/GenreFilter.tsx'
import {ErrorMessage} from '@/components/ui/ErrorMessage/ErrorMessage.tsx'
import {MovieCard} from '@/components/movie/MovieCard/MovieCard.tsx'
import {Pagination} from '@/components/ui/Pagination/Pagination'

export const FilteredPage = () => {
    const [page, setPage] = useState(1)
    const [showFilters, setShowFilters] = useState(true)
    const isMobile = useMediaQuery('(max-width: 900px)')
    const shouldShowFilters = isMobile ? showFilters : true

    const {filters, updateFilter, resetFilters} = useFilters()

    const debouncedMinRating = useDebounce(filters.minRating, 200)
    const debouncedMaxRating = useDebounce(filters.maxRating, 200)

    const handleSortChange = (value: string) => {
        updateFilter('sortBy', value)
        setPage(1)
    }

    const handleRatingChange = (_: Event, value: number | number[]) => {
        const [min, max] = value as number[]
        updateFilter('minRating', min)
        updateFilter('maxRating', max)
        setPage(1)
    }

    const handleYearChange = (key: 'minYear' | 'maxYear', value: string) => {
        updateFilter(key, value)
        setPage(1)
    }

    const handleGenreToggle = (genreId: number) => {
        const newGenres = filters.genres.includes(genreId)
            ? filters.genres.filter(id => id !== genreId)
            : [...filters.genres, genreId]
        updateFilter('genres', newGenres)
        setPage(1)
    }

    const handleReset = () => {
        resetFilters()
        setPage(1)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const queryParams = useMemo(
        () => ({
            sort_by: filters.sortBy,
            with_genres: filters.genres.length > 0 ? filters.genres.join(',') : undefined,
            'vote_average.gte': debouncedMinRating > 0 ? debouncedMinRating : undefined,
            'vote_average.lte': debouncedMaxRating < 10 ? debouncedMaxRating : undefined,
            'release_date.gte': filters.minYear ? `${filters.minYear}-01-01` : undefined,
            'release_date.lte': filters.maxYear ? `${filters.maxYear}-12-31` : undefined,
        }),
        [
            filters.sortBy,
            filters.genres,
            filters.minYear,
            filters.maxYear,
            debouncedMinRating,
            debouncedMaxRating,
        ]
    )

    const {data, isLoading, isFetching, error} = useGetDiscoverMoviesQuery({
        ...queryParams,
        page,
    })

    const showFullLoader = isLoading && !data
    const showUpdating = isFetching && !isLoading

    return (
        <div className={style.page}>
            <h1 className={style.title}>Filtered Movies</h1>

            {isMobile && (
                <button className={style.toggleFilters} onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            )}

            <div className={style.layout}>
                {shouldShowFilters && (
                    <aside className={style.sidebar}>
                        <div className={style.filters}>
                            <h2 className={style.filtersTitle}>Filters</h2>

                            {/* Sort */}
                            <div className={style.filterGroup}>
                                <label>Sort By</label>
                                <select
                                    value={filters.sortBy}
                                    onChange={e => handleSortChange(e.target.value)}
                                    className={style.select}
                                >
                                    <option value="popularity.desc">Popularity (Desc)</option>
                                    <option value="vote_average.desc">Rating (Desc)</option>
                                    <option value="release_date.desc">Release Date (Desc)</option>
                                    <option value="revenue.desc">Revenue (Desc)</option>
                                </select>
                            </div>

                            {/* Rating (MUI Slider) */}
                            <div className={style.filterGroup}>
                                <label>
                                    Rating: {filters.minRating} — {filters.maxRating}
                                </label>
                                <Slider
                                    className={style.ratingSlider}
                                    value={[filters.minRating, filters.maxRating]}
                                    onChange={handleRatingChange}
                                    min={0}
                                    max={10}
                                    step={0.5}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            </div>

                            {/* Year */}
                            <div className={style.filterGroup}>
                                <label>Year Range</label>
                                <div className={style.yearRange}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={filters.minYear}
                                        onChange={e => handleYearChange('minYear', e.target.value)}
                                        slotProps={{htmlInput: {min: 1920, max: filters.maxYear}}}
                                    />
                                    <span>—</span>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={filters.maxYear}
                                        onChange={e => handleYearChange('maxYear', e.target.value)}
                                        slotProps={{
                                            htmlInput: {min: filters.minYear, max: new Date().getFullYear()},
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Genres */}
                            <div className={style.filterGroup}>
                                <label>Genres</label>
                                <GenreFilter selectedGenres={filters.genres} onToggle={handleGenreToggle}/>
                            </div>

                            <button className={style.resetButton} onClick={handleReset}>
                                Reset Filters
                            </button>
                        </div>
                    </aside>
                )}

                <main className={style.results}>
                    {showFullLoader && <MovieGridSkeleton count={12}/>}

                    {error && <ErrorMessage error={error} title="Filter error:"/>}

                    {data && data.results.length === 0 && (
                        <div className={style.emptyState}>
                            <div className={style.emptyIcon}>🎬</div>
                            <h3>No movies match your filters</h3>
                            <p>Try changing your filters or reset them</p>
                            <button className={style.resetButton} onClick={handleReset}>
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {data && data.results.length > 0 && (
                        <>
                            <div
                                className={`${style.resultsInfo} ${showUpdating ? style.dimmed : ''}`}
                                aria-live="polite"
                            >
                                Найдено фильмов: <strong>{data.total_results}</strong>
                            </div>

                            <div className={style.moviesGrid}>
                                {data.results.map(movie => (
                                    <MovieCard key={movie.id} movie={movie}/>
                                ))}
                            </div>

                            <Pagination
                                currentPage={page}
                                totalPages={data.total_pages}
                                totalResults={data.total_results}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}
