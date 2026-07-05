import {useGetPopularMovieQuery} from "../../api/tmdbApi.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";
import styles from "../../components/MovieCard/MovieCard.module.css"

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
            <div>Main Page {data?.results?.length}</div>
            <div className={styles.moviesCard}>
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    )
}