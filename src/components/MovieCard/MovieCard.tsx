import type {Movie} from "../../types/types.ts";

type Props = {
    movie: Movie
}

export const MovieCard = ({movie}: Props) => {
    return (
        <div>
            {movie.poster_path === null ?
                <img src='https://placehold.co/200x300?text=No+Image' alt={'poster'}/> :
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'poster'}/>}
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average}</span>
            <button>❤️</button>
        </div>
    )
}