import {useGetPopularMovieQuery} from "../../api/tmdbApi.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";
import style from "./MainPage.module.css"

export const MainPage = () => {

    const {data, isLoading, error} = useGetPopularMovieQuery(1)

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    return (
        <>
            <h2>Trending</h2>
            {/*Main Page {data?.results.length}*/}
            <div className={style.moviesRow}>
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