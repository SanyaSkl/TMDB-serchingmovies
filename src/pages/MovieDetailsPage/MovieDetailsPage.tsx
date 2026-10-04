import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useGetMovieCreditsQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery,} from '../../api/tmdbApi.ts'
import {ErrorMessage} from '../../components/ui/ErrorMessage/ErrorMessage.tsx'
import style from './MovieDetailsPage.module.css'
import {CastList} from '../../components/movie/CastList/CastList.tsx'
import {SimilarMovies} from '../../components/movie/SimilarMovies/SimilarMovies.tsx'
import {MovieDetailsHeader} from "../../components/movie/MovieDetailsHeader/MovieDetailsHeader.tsx";

export const MovieDetailsPage = () => {
    const {id} = useParams<{ id: string }>()
    const movieId = Number(id)
    const navigate = useNavigate()

    const {
        data: movie,
        isLoading: movieLoading,
        error: movieError,
    } = useGetMovieDetailsQuery(movieId)

    const {data: credits, isLoading: creditsLoading} = useGetMovieCreditsQuery(movieId, {
        skip: !movieId,
    })

    const {data: similar, isLoading: similarLoading} = useGetSimilarMoviesQuery(
        {id: movieId, page: 1},
        {skip: !movieId}
    )

    // Валидация ID
    if (isNaN(movieId) || movieId <= 0) {
        return <Navigate to="/not-found" replace/>
    }

    const isLoading = movieLoading || creditsLoading || similarLoading

    if (isLoading) {
        return <div className={style.loader}>Loading movie details...</div>
    }

    if (movieError) {
        return <ErrorMessage error={movieError} title="Failed to load movie:"/>
    }

    if (!movie) {
        return <Navigate to="/not-found" replace/>
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className={style.page}>
            <button className={style.backButton} onClick={handleGoBack} aria-label="Back to movies">
                Назад
            </button>
            <MovieDetailsHeader movie={movie}/>

            <div className={style.content}>
                {credits && credits.cast.length > 0 && <CastList cast={credits.cast}/>}

                {similar && similar.results.length > 0 && <SimilarMovies movies={similar.results}/>}
            </div>
        </div>
    )
}
