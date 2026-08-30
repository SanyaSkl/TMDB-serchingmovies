import { useState, useCallback } from "react";
import { useGetPopularMovieQuery } from "../../api/tmdbApi.ts";
import { MovieCard } from "../../components/MovieCard/MovieCard.tsx";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import style from "./MainPage.module.css";

export const MainPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGetPopularMovieQuery(page);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (isLoading) {
        return <div className={style.loader}>Loading popular movies...</div>;
    }

    if (error) {
        return <ErrorMessage error={error} title="Failed to load popular movies:" />;
    }

    return (
        <div className={style.mainPage}>
            <h2 className={style.pageTitle}>Trending Movies</h2>

            <div className={style.moviesRow}>
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Пагинация */}
            <Pagination
                currentPage={page}
                totalPages={data?.total_pages || 1}
                totalResults={data?.total_results}
                onPageChange={handlePageChange}
            />
        </div>
    );
};