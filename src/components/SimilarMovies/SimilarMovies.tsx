import style from "./SimilarMovies.module.css";
import type {Movie} from "../../types/movie.types.ts";
import {MovieCard} from "../MovieCard/MovieCard.tsx";

type Props = {
    movies: Movie[];
    title?: string;
};

export const SimilarMovies = ({ movies, title = "Similar Movies" }: Props) => {
    if (movies.length === 0) {
        return null;
    }

    return (
        <div className={style.similarSection}>
            <h3 className={style.sectionTitle}>{title}</h3>
            <div className={style.moviesGrid}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};