
import { MovieCard } from "../../components/MovieCard/MovieCard.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.tsx";
import { GENRES, SORT_OPTIONS, type GenreId, type SortOptionId } from "../../constants/filters.ts";
import style from "./FilteredPage.module.css";
import React, {useCallback, useState} from "react";
import {useGetDiscoverMoviesQuery} from "../../api/tmdbApi.ts";

type Filters = {
    genres: GenreId[];
    sortBy: SortOptionId;
    minRating: number;
    maxRating: number;
    minYear: string;
    maxYear: string;
};

const currentYear = new Date().getFullYear();

export const FilteredPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>({
        genres: [],
        sortBy: 'popularity.desc',
        minRating: 0,
        maxRating: 10,
        minYear: '1900',
        maxYear: String(currentYear),
    });
    const [showFilters, setShowFilters] = useState(true);

    // Формируем параметры запроса
    const queryParams = {
        page,
        sort_by: filters.sortBy,
        with_genres: filters.genres.length > 0 ? filters.genres.join(',') : undefined,
        'vote_average.gte': filters.minRating > 0 ? filters.minRating : undefined,
        'vote_average.lte': filters.maxRating < 10 ? filters.maxRating : undefined,
        'release_date.gte': filters.minYear ? `${filters.minYear}-01-01` : undefined,
        'release_date.lte': filters.maxYear ? `${filters.maxYear}-12-31` : undefined,
    };

    const { data, isLoading, error } = useGetDiscoverMoviesQuery(queryParams);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleGenreToggle = useCallback((genreId: GenreId) => {
        setFilters(prev => ({
            ...prev,
            genres: prev.genres.includes(genreId)
                ? prev.genres.filter(id => id !== genreId)
                : [...prev.genres, genreId],
        }));
        setPage(1);
    }, []);

    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOptionId }));
        setPage(1);
    }, []);

    const handleRatingChange = useCallback((type: 'min' | 'max', value: number) => {
        setFilters(prev => ({
            ...prev,
            [type === 'min' ? 'minRating' : 'maxRating']: value,
        }));
        setPage(1);
    }, []);

    const handleYearChange = useCallback((type: 'min' | 'max', value: string) => {
        setFilters(prev => ({
            ...prev,
            [type === 'min' ? 'minYear' : 'maxYear']: value,
        }));
        setPage(1);
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters({
            genres: [],
            sortBy: 'popularity.desc',
            minRating: 0,
            maxRating: 10,
            minYear: '1900',
            maxYear: String(currentYear),
        });
        setPage(1);
    }, []);

    const handleToggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
    }, []);

    const hasActiveFilters = filters.genres.length > 0 ||
        filters.minRating > 0 ||
        filters.maxRating < 10 ||
        filters.minYear !== '1900' ||
        filters.maxYear !== String(currentYear);

    if (isLoading && page === 1) {
        return <div className={style.loader}>Loading movies...</div>;
    }

    if (error) {
        return <ErrorMessage error={error} title="Failed to load movies:" />;
    }

    return (
        <div className={style.page}>
            <div className={style.header}>
                <h2 className={style.title}>Discover Movies</h2>
                <div className={style.headerActions}>
                    <button
                        className={style.toggleFiltersBtn}
                        onClick={handleToggleFilters}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    {hasActiveFilters && (
                        <button
                            className={style.resetBtn}
                            onClick={handleResetFilters}
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className={style.filtersPanel}>
                    {/* Сортировка */}
                    <div className={style.filterGroup}>
                        <label className={style.filterLabel}>Sort By</label>
                        <select
                            className={style.select}
                            value={filters.sortBy}
                            onChange={handleSortChange}
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Жанры */}
                    <div className={style.filterGroup}>
                        <label className={style.filterLabel}>Genres</label>
                        <div className={style.genresGrid}>
                            {GENRES.map(genre => (
                                <button
                                    key={genre.id}
                                    className={`${style.genreBtn} ${filters.genres.includes(genre.id) ? style.active : ''}`}
                                    onClick={() => handleGenreToggle(genre.id)}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Рейтинг */}
                    <div className={style.filterGroup}>
                        <label className={style.filterLabel}>Rating</label>
                        <div className={style.ratingRange}>
                            <div className={style.ratingInputs}>
                                <div>
                                    <span>Min</span>
                                    <input
                                        type="number"
                                        className={style.ratingInput}
                                        value={filters.minRating}
                                        onChange={(e) => handleRatingChange('min', Number(e.target.value))}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                </div>
                                <div>
                                    <span>Max</span>
                                    <input
                                        type="number"
                                        className={style.ratingInput}
                                        value={filters.maxRating}
                                        onChange={(e) => handleRatingChange('max', Number(e.target.value))}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                className={style.ratingSlider}
                                min={0}
                                max={10}
                                step={0.1}
                                value={filters.minRating}
                                onChange={(e) => handleRatingChange('min', Number(e.target.value))}
                            />
                            <input
                                type="range"
                                className={style.ratingSlider}
                                min={0}
                                max={10}
                                step={0.1}
                                value={filters.maxRating}
                                onChange={(e) => handleRatingChange('max', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Год */}
                    <div className={style.filterGroup}>
                        <label className={style.filterLabel}>Year</label>
                        <div className={style.yearInputs}>
                            <div>
                                <span>From</span>
                                <input
                                    type="number"
                                    className={style.yearInput}
                                    value={filters.minYear}
                                    onChange={(e) => handleYearChange('min', e.target.value)}
                                    min={1900}
                                    max={currentYear}
                                />
                            </div>
                            <div>
                                <span>To</span>
                                <input
                                    type="number"
                                    className={style.yearInput}
                                    value={filters.maxYear}
                                    onChange={(e) => handleYearChange('max', e.target.value)}
                                    min={1900}
                                    max={currentYear}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Результаты */}
            <div className={style.results}>
                <div className={style.resultsInfo}>
                    <span>{data?.total_results?.toLocaleString() || 0} movies found</span>
                    {isLoading && <span className={style.loadingIndicator}>Loading...</span>}
                </div>

                <div className={style.moviesGrid}>
                    {data?.results?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {data && data.total_pages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.total_pages}
                        totalResults={data.total_results}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};