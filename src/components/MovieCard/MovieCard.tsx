
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {addFavorite, removeFavorite, selectIsFavorite} from "../../store/favoritesSlice.ts";
import style from "./MovieCard.module.css";
import React from "react";
import {Link} from "react-router-dom";
import type {Movie} from "../../types/movie.types.ts";

type Props = {
    movie: Movie;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://placehold.co/200x300?text=No+Image";

export const MovieCard = React.memo(({movie}: Props) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector((state) => selectIsFavorite(state, movie.id));

    const handleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE;

    return (
        <div className={style.moviesCard}>
            <Link to={`/movie/${movie.id}`}>
                <img src={posterUrl} alt={movie.title} loading="lazy"/>
            </Link>
            <h3>{movie.title}</h3>
            <span className={style.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
            <button className={style.buttonLike} onClick={handleFavorites}>
                {isFavorite ? "❤️" : "🤍"}
            </button>
        </div>
    );
});

MovieCard.displayName = "MovieCard";