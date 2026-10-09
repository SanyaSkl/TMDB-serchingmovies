import {Link} from 'react-router-dom';
import style from './MovieSection.module.css';
import {MovieGridSkeleton} from "../../skeletons";
import {MovieCard} from "../MovieCard/MovieCard.tsx";
import type {Movie} from "@/validations";


type Props = {
    title: string;
    movies: Movie[] | undefined;
    linkTo?: string;
    isLoading?: boolean;
};

export const MovieSection = ({title, movies, linkTo, isLoading}: Props) => {
    if (isLoading) {
        return (
            <section className={style.section}>
                <div className={style.section}>
                    <h2 className={style.sectionTitle}>{title}</h2>
                </div>
                <MovieGridSkeleton count={6}/>
            </section>
        )
    }

    if (!movies || movies.length === 0) return null;

    return (
        <section className={style.section}>
            <div className={style.section}>
                <h2 className={style.sectionTitle}>{title}</h2>
                {linkTo && (
                    <Link to={linkTo} className={style.viewAll}>
                        View all
                    </Link>
                )}
            </div>
            <div className={style.sectionGrid}>
                {movies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </section>
    );
};