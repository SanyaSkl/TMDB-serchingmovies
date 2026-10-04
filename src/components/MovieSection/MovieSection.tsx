import type { Movie } from '../../types/movie.types';
import { Link } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';
import style from './MovieSection.module.css';

type Props = {
    title: string;
    movies: Movie[] | undefined;
    linkTo?: string;
};

export const MovieSection = ({ title, movies, linkTo }: Props) => {
    if (!movies || movies.length === 0) return null;

    return (
        <section className={style.section}>
            <div className={style.sectionHeader}>
                <h2 className={style.sectionTitle}>{title}</h2>
                {linkTo && (
                    <Link to={linkTo} className={style.viewAll}>
                        View all
                    </Link>
                )}
            </div>
            <div className={style.sectionGrid}>
                {movies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};