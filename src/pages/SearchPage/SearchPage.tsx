import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetSearchMoviesQuery } from '@/api/tmdbApi.ts'
import style from './SearchPage.module.css'
import { MovieGridSkeleton } from '@/components/skeletons'
import { Pagination } from '@/components/ui/Pagination/Pagination.tsx'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar.tsx'
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx'
import { MovieCard } from '@/components/movie/MovieCard/MovieCard.tsx'

export const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('query') || ''

  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery)
  const [search, setSearch] = useState(urlQuery)
  const [submittedQuery, setSubmittedQuery] = useState(urlQuery)
  const [page, setPage] = useState(1)

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery)
    setSearch(urlQuery)
    setSubmittedQuery(urlQuery)
    setPage(1)
  }

  const { data, isLoading, error } = useGetSearchMoviesQuery(
    { query: submittedQuery, page },
    { skip: !submittedQuery }
  )

  const handleSearch = () => {
    setSubmittedQuery(search)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={style.searchPage}>
      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />

      {submittedQuery === '' && <p className={style.searchHint}>Enter the movie title to search</p>}
      {submittedQuery !== '' && isLoading && <MovieGridSkeleton count={12} />}
      {submittedQuery !== '' && error && <ErrorMessage error={error} title="Search error:" />}
      {submittedQuery !== '' && !isLoading && !error && data?.results?.length === 0 && (
        <p className={style.searchHint}>No results "{submittedQuery}" found for</p>
      )}
      {submittedQuery !== '' && data && data.results.length > 0 && (
        <>
          <div className={style.moviesGrid}>
            {data.results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            totalResults={data.total_results}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
