import type {Movie} from "../../types/types.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {addFavorite, removeFavorite} from "../../store/favoritesSlice.ts";
import style from "./MovieCard.module.css"

type Props = {
    movie: Movie
}

export const MovieCard = ({movie}: Props) => {

    const dispatch = useAppDispatch()
    const favorites = useAppSelector(state => state.favorites)
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id)

    const handleFavorites = () => {
        if (isFavorite) dispatch(removeFavorite(movie.id))
        else dispatch(addFavorite(movie))
    }

    return (
        <div>
            {movie.poster_path === null ?
                <img src='https://placehold.co/200x300?text=No+Image' alt={'poster'}/> :
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'poster'}/>}
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average}</span>
            <button className={style.buttonLike} onClick={handleFavorites}>{isFavorite ? "❤️" : "🤍"}</button>
        </div>
    )
}