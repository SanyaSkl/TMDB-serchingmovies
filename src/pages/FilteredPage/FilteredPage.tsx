import {useState} from 'react';
import {useGetDiscoverMoviesQuery} from '../../api/tmdbApi';
import {useFilters} from '../../hooks/useFilters';
import {MovieCard} from '../../components/MovieCard/MovieCard';
import {Pagination} from '../../components/Pagination/Pagination';
import {ErrorMessage} from '../../components/ErrorMessage/ErrorMessage';
import style from './FilteredPage.module.css';
import {GenreFilter} from "../../components/GenreFilter/GenreFilter.tsx";

export const FilteredPage = () => {
    const [page, setPage] = useState(1);
    const {filters, updateFilter, resetFilters, queryParams} = useFilters();
    const [showFilters, setShowFilters] = useState(true);

    const {data, isLoading, error} = useGetDiscoverMoviesQuery({
        ...queryParams,
        page,
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleGenreToggle = (genreId: number) => {
        const currentGenres = filters.genres;
        const newGenres = currentGenres.includes(genreId)
            ? currentGenres.filter((id) => id !== genreId)
            : [...currentGenres, genreId];
        updateFilter('genres', newGenres);
    };

    if (isLoading) return <div className={style.loader}>Loading...</div>;
    if (error) return <ErrorMessage error={error} title="Filter error:"/>;

    return (
        <div className={style.page}>
            <h1 className={style.title}>Filtered Movies</h1>

            {/* Кнопка показать/скрыть фильтры */}
            <button className={style.toggleFilters} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && (
                <div className={style.filters}>
                    {/* Сортировка */}
                    <div className={style.filterGroup}>
                        <label>Sort By</label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => updateFilter('sortBy', e.target.value)}
                            className={style.select}
                        >
                            <option value="popularity.desc">Popularity (Desc)</option>
                            <option value="vote_average.desc">Rating (Desc)</option>
                            <option value="release_date.desc">Release Date (Desc)</option>
                            <option value="revenue.desc">Revenue (Desc)</option>
                        </select>
                    </div>

                    {/* Рейтинг */}
                    <div className={style.filterGroup}>
                        <label>Rating: {filters.minRating} - {filters.maxRating}</label>
                        <div className={style.ratingSlider}>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.5"
                                value={filters.minRating}
                                onChange={(e) => updateFilter('minRating', Number(e.target.value))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.5"
                                value={filters.maxRating}
                                onChange={(e) => updateFilter('maxRating', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Годы */}
                    <div className={style.filterGroup}>
                        <label>Year Range</label>
                        <div className={style.yearRange}>
                            <input
                                type="number"
                                min="1900"
                                max={filters.maxYear}
                                value={filters.minYear}
                                onChange={(e) => updateFilter('minYear', e.target.value)}
                                className={style.yearInput}
                            />
                            <span>—</span>
                            <input
                                type="number"
                                min={filters.minYear}
                                max={new Date().getFullYear()}
                                value={filters.maxYear}
                                onChange={(e) => updateFilter('maxYear', e.target.value)}
                                className={style.yearInput}
                            />
                        </div>
                    </div>

                    {/* Жанры */}
                    <div className={style.filterGroup}>
                        <label>Genres</label>
                        <div className={style.genresList}>
                            {/* Здесь будет компонент с жанрами */}
                            <GenreFilter
                                selectedGenres={filters.genres}
                                onToggle={handleGenreToggle}
                            />
                        </div>
                    </div>

                    <button className={style.resetButton} onClick={resetFilters}>
                        Reset Filters
                    </button>
                </div>
            )}

            <div className={style.moviesGrid}>
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>

            {data && (
                <Pagination
                    currentPage={page}
                    totalPages={data.total_pages}
                    totalResults={data.total_results}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};