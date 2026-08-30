import { type ChangeEvent, type KeyboardEvent, useCallback, useState } from "react";
import { useGetSearchMoviesQuery } from "../../api/tmdbApi.ts";
import { MovieCard } from "../../components/MovieCard/MovieCard.tsx";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import style from "./SearchPage.module.css";
import { useSearchParams } from "react-router-dom";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [search, setSearch] = useState(initialQuery);
    const [page, setPage] = useState(1);
    const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
    const [showMinLengthWarning, setShowMinLengthWarning] = useState(false);

    const { data, isLoading, error } = useGetSearchMoviesQuery(
        { query: submittedQuery, page },
        { skip: !submittedQuery || submittedQuery.trim().length < 2 }
    );

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
        // Скрываем предупреждение, когда пользователь начинает печатать
        if (showMinLengthWarning) {
            setShowMinLengthWarning(false);
        }
    };

    const handleSearch = useCallback(() => {
        const trimmedQuery = search.trim();

        // Проверка минимальной длины
        if (trimmedQuery.length < 2) {
            setShowMinLengthWarning(true);
            return;
        }

        setShowMinLengthWarning(false);
        setSubmittedQuery(trimmedQuery);
        setPage(1);
        setSearchParams({ q: trimmedQuery });
    }, [search, setSearchParams]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className={style.searchPage}>
            <div className={style.searchContainer}>
                <input
                    className={`${style.searchInput} ${showMinLengthWarning ? style.searchInputError : ''}`}
                    type="text"
                    placeholder="Search movie title..."
                    value={search}
                    onChange={handleChangeText}
                    onKeyDown={handleKeyDown}
                    aria-label="Search movies"
                />
                <button className={style.searchButton} onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* Уведомление о минимальной длине */}
            {showMinLengthWarning && (
                <p className={style.warningMessage}>
                    ⚠️ Please enter at least 2 characters
                </p>
            )}

            {!submittedQuery && !showMinLengthWarning && (
                <p className={style.searchHint}>Enter at least 2 characters to search</p>
            )}

            {submittedQuery && isLoading && (
                <p className={style.message}>⏳ Loading...</p>
            )}

            {submittedQuery && error && <ErrorMessage error={error} />}

            {submittedQuery && !isLoading && !error && data?.results?.length === 0 && (
                <p className={style.message}>🔍 Nothing found for "{submittedQuery}"</p>
            )}

            {submittedQuery && !isLoading && !error && data?.results && data.results.length > 0 && (
                <>
                    <div className={style.moviesGrid}>
                        {data.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
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
        </div>
    );
};