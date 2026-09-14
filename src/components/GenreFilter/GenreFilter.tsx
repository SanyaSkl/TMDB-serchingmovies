import {useGetGenresQuery} from '../../api/tmdbApi';
import style from './GenreFilter.module.css';

type Props = {
    selectedGenres: number[];
    onToggle: (genreId: number) => void;
};

export const GenreFilter = ({selectedGenres, onToggle}: Props) => {
    const {data, isLoading} = useGetGenresQuery();

    if (isLoading) return <div>Loading genres...</div>;

    return (
        <div className={style.genresContainer}>
            {data?.genres.map((genre) => (
                <button
                    key={genre.id}
                    className={`${style.genreButton} ${selectedGenres.includes(genre.id) ? style.active : ''}`}
                    onClick={() => onToggle(genre.id)}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};
