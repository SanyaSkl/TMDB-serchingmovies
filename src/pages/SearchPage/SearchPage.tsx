import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {useGetSearchMoviesQuery} from "../../api/tmdbApi.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage.tsx";
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import style from "./SearchPage.module.css";

export const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [submittedQuery, setSubmittedQuery] = useState("");

    const {data, isLoading, error} = useGetSearchMoviesQuery(
        {query: submittedQuery, page},
        {skip: !submittedQuery}
    );

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    const handleSearch = () => {
        setSubmittedQuery(search);
        setPage(1);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className={style.searchPage}>
            {/* Блок поиска */}
            <div className={style.searchContainer}>
                <input
                    className={style.searchInput}
                    type="text"
                    placeholder="Search movie title..."
                    value={search}
                    onChange={handleChangeText}
                    onKeyDown={handleKeyDown}
                />
                <button className={style.searchButton} onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* Подсказка под поиском */}
            {submittedQuery === "" && (
                <p className={style.searchHint}>Enter the movie title to search</p>
            )}

            {/* Состояние загрузки */}
            {submittedQuery !== "" && isLoading && (
                <p className={style.message}>⏳ Loading...</p>
            )}

            {/* Компонент ошибки */}
            {submittedQuery !== "" && error && <ErrorMessage error={error}/>}

            {/* Пустой результат */}
            {submittedQuery !== "" && !isLoading && !error && data?.results?.length === 0 && (
                <p className={style.message}>
                    🔍 Nothing found for "{submittedQuery}"
                </p>
            )}

            {/* Результаты поиска */}
            {submittedQuery !== "" &&
                !isLoading &&
                !error &&
                data?.results &&
                data.results.length > 0 && (
                    <>
                        <div className={style.moviesGrid}>
                            {data.results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </div>

                        {/* Компонент пагинации */}
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