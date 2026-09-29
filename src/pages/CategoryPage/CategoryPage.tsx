import { Navigate, NavLink, useParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useGetCategoryMoviesQuery } from '../../api/tmdbApi.ts'
import { MovieCard } from '../../components/MovieCard/MovieCard.tsx'
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage.tsx'
import { Pagination } from '../../components/Pagination/Pagination.tsx'
import style from './CategoryPage.module.css'
import { CATEGORIES } from '../../constants/categories.ts'

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>()
  const [page, setPage] = useState(1)
  const currentCategory = category || 'popular'

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useGetCategoryMoviesQuery({
    category: currentCategory,
    page,
  })

  const isValidCategory = CATEGORIES.some(c => c.id === currentCategory)
  if (!isValidCategory && category) {
    return <Navigate to="/category/popular" />
  }

  if (isLoading) return <div className={style.loader}>Loading...</div>
  if (error) return <ErrorMessage error={error} title="Category error:" />

  return (
    <>
      <div className={style.buttonBlock}>
        {CATEGORIES.map(category => (
          <NavLink
            key={category.id}
            to={`/category/${category.id}`}
            className={({ isActive }) =>
              isActive ? `${style.categoryButton} ${style.active}` : style.categoryButton
            }
          >
            {category.label}
          </NavLink>
        ))}
      </div>

      <div className={style.categoryPage}>
        {data?.results?.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={data?.total_pages || 1}
        totalResults={data?.total_results}
        onPageChange={handlePageChange}
      />
    </>
  )
}
