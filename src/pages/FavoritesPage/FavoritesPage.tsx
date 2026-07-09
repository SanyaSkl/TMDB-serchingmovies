import {useAppSelector} from "../../hooks/useAppSelector.ts";
import type {Movie} from "../../types/types.ts";
import {MovieCard} from "../../components/MovieCard/MovieCard.tsx";


export const FavoritesPage = () => {

    const favorites = useAppSelector(state => state.favorites)

    if (favorites.length === 0) {
        return <div>
            No favorites yet
        </div>
    }
    return (
        <div>
            {favorites.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    )
}