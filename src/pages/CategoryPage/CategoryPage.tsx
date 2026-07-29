import {NavLink, useParams} from "react-router-dom";
import {useState} from "react";
import {useGetCategoryMoviesQuery} from "../../api/tmdbApi.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage.tsx";
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import style from "./CategoryPage.module.css";
import {CATEGORIES} from "../../constants/categories.ts";


export const CategoryPage = () => {

    const {category} = useParams<{ category: string }>();
    const [page, setPage] = useState(1);
    const currentCategory = category || "popular";


    const {data, isLoading, error} = useGetCategoryMoviesQuery({
        category: currentCategory,
        page,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ErrorMessage error={error} title="Category error:"/>;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <>
            <div className={style.buttonBlock}>
                {CATEGORIES.map((category) => (
                    <NavLink
                        key={category.id}
                        to={`/category/${category.id}`}
                        className={({isActive}) => (isActive ? style.active : "")}
                    >
                        {category.label}
                    </NavLink>
                ))}
            </div>

            <div className={style.categoryPage}>
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={data?.total_pages || 1}
                totalResults={data?.total_results}
                onPageChange={handlePageChange}
            />
        </>
    );
};