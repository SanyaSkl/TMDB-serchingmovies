import { useAppDispatch } from '@/hooks/useAppDispatch.ts'
import { useAppSelector } from '@/hooks/useAppSelector.ts'
import { addFavorite, removeFavorite, selectIsFavorite } from '@/store/favoritesSlice.ts'
import style from './MovieCard.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import type { Movie } from '@/validations'

type Props = {
    movie: Movie
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const PLACEHOLDER_IMAGE = 'https://placehold.co/200x300?text=No+Image'

export const MovieCard = React.memo(({ movie }: Props) => {
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector(state => selectIsFavorite(state, movie.id))

    const handleFavorites = (e: React.MouseEvent) => {
        e.preventDefault() // Останавливаем переход по ссылке, если кликнули на сердечко
        if (isFavorite) {
            dispatch(removeFavorite(movie.id))
        } else {
            dispatch(addFavorite(movie))
        }
    }

    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : ''

    // Динамический цвет для рейтинга (как на TMDB: зеленый, желтый, красный)
    const getRatingColor = (rating: number) => {
        if (rating >= 7) return '#21d07a' // Зеленый
        if (rating >= 5) return '#d2d531' // Желтый
        return '#db2360' // Красный
    }

    return (
        <div className={style.cardWrapper}>
            {/* Контейнер постера */}
            <div className={style.posterWrapper}>
                <Link to={`/movie/${movie.id}`}>
                    <img src={posterUrl} alt={movie.title} loading="lazy" />
                </Link>

                {/* Кружок с рейтингом в правом нижнем углу */}
                <div
                    className={style.ratingCircle}
                    style={{ borderColor: getRatingColor(movie.vote_average) }}
                >
                    {movie.vote_average.toFixed(1)}
                </div>

                {/* Кнопка избранного, появляется при наведении */}
                <button className={style.favoriteButton} onClick={handleFavorites}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>

            {/* Информация под карточкой */}
            <div className={style.info}>
                <h3 className={style.title}>{movie.title}</h3>
                <span className={style.date}>{releaseYear}</span>
            </div>
        </div>
    )
})

MovieCard.displayName = 'MovieCard'