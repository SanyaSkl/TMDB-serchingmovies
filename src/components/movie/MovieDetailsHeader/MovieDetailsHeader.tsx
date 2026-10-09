import style from './MovieDetailsHeader.module.css'
import type {MovieDetails} from "@/validations";


type Props = {
    movie: MovieDetails
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

export const MovieDetailsHeader = ({movie}: Props) => {
    const backdropUrl = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : undefined

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placehold.co/300x450?text=No+Image'

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const formatCurrency = (amount: number) => {
        if (amount === 0) return 'N/A'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div
            className={style.header}
            style={backdropUrl ? {backgroundImage: `url(${backdropUrl})`} : undefined}
        >
            <div className={style.overlay}>
                <div className={style.content}>
                    <img src={posterUrl} alt={movie.title} className={style.poster} loading="lazy"/>
                    <div className={style.info}>
                        <h1 className={style.title}>
                            {movie.title}
                            <span className={style.year}>({releaseYear})</span>
                        </h1>

                        {movie.tagline && <p className={style.tagline}>"{movie.tagline}"</p>}

                        <div className={style.meta}>
                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                            <span>•</span>
                            {movie.runtime !== null && (
                                <span>{formatRuntime(movie.runtime)}</span>
                            )}
                            <span>•</span>
                            <span>{movie.status}</span>
                        </div>

                        <div className={style.genres}>
                            {movie.genres.map(genre => (
                                <span key={genre.id} className={style.genre}>
                  {genre.name}
                </span>
                            ))}
                        </div>

                        <p className={style.overview}>{movie.overview}</p>

                        <div className={style.stats}>
                            <div>
                                <span className={style.label}>Budget</span>
                                <span>{formatCurrency(movie.budget)}</span>
                            </div>
                            <div>
                                <span className={style.label}>Revenue</span>
                                <span>{formatCurrency(movie.revenue)}</span>
                            </div>
                            <div>
                                <span className={style.label}>Votes</span>
                                <span>{movie.vote_count.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}