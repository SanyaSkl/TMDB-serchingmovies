import {useGetGenresQuery} from '../../api/tmdbApi';
import style from './GenreFilter.module.css';

type Props = {
    selectedGenres: number[];
    onToggle: (genreId: number) => void;
};

export const GenreFilter = ({selectedGenres, onToggle}: Props) => {
    const {data, isLoading, error, refetch} = useGetGenresQuery();

    if (isLoading) {
        return <div className={style.loading}>Loading genres...</div>;
    }

    if (error) {
        return (
            <div className={style.error}>
                <p>Failed to load genres</p>
                <button className={style.retryButton} onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={style.genresContainer}>
            {data?.genres.map((genre) => (
                <button
                    key={genre.id}
                    className={`${style.genreButton} ${
                        selectedGenres.includes(genre.id) ? style.active : ''
                    }`}
                    onClick={() => onToggle(genre.id)}
                    type="button"
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};