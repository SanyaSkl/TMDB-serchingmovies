import {NavLink, useParams} from "react-router-dom";
import {useGetCategoryMoviesQuery} from "../../api/tmdbApi.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";
import style from "./CategoryPage.module.css";

export const CategoryPage = () => {

    const {category} = useParams<{ category: string }>()
    const {data, isLoading, error} = useGetCategoryMoviesQuery({category: category || 'popular', page: 1})

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    return (
        <>
            <div className={style.buttonBlock}>
                <NavLink to="/category/popular"
                         className={({isActive}) => isActive ? style.active : ""}>Popular Movies</NavLink>
                <NavLink to="/category/top_rated"
                         className={({isActive}) => isActive ? style.active : ""}>Top Rated Movies</NavLink>
                <NavLink to="/category/upcoming"
                         className={({isActive}) => isActive ? style.active : ""}>Upcoming Movies</NavLink>
                <NavLink to="/category/now_playing"
                         className={({isActive}) => isActive ? style.active : ""}>Now Playing Movies</NavLink>
            </div>
            <div className={style.categoryPage}>
                {data?.results?.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </>
    )
}