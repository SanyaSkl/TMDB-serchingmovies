import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { MovieCard } from '../../components/MovieCard/MovieCard.tsx'
import style from './FavoritesPage.module.css'
import { selectFavorites } from '../../store/favoritesSlice.ts'

export const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavorites)

  if (favorites.length === 0) {
    return (
      <div className={style.emptyState}>
        <h2>No favorites yet</h2>
        <p>Start adding movies to your favorites list!</p>
      </div>
    )
  }

  return (
    <div className={style.favoritePage}>
      <h2 className={style.pageTitle}>My Favorites ({favorites.length})</h2>
      <div className={style.moviesPage}>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
