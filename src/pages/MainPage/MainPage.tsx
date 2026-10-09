import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCategoryMoviesQuery, useGetPopularMovieQuery } from '@/api/tmdbApi.ts'
import style from './MainPage.module.css'
import { HeroSkeleton } from '@/components/skeletons'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar.tsx'
import { MovieSection } from '@/components/movie/MovieSection/MovieSection.tsx'

export const MainPage = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const { data: popular, isLoading: popularLoading } = useGetPopularMovieQuery(1)
  const { data: topRated, isLoading: topRatedLoading } = useGetCategoryMoviesQuery({
    category: 'top_rated',
    page: 1,
  })
  const { data: upcoming, isLoading: upcomingLoading } = useGetCategoryMoviesQuery({
    category: 'upcoming',
    page: 1,
  })
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useGetCategoryMoviesQuery({
    category: 'now_playing',
    page: 1,
  })

  const [heroSeed] = useState(() => Math.random())

  const heroBackdrop = useMemo(() => {
    if (!popular?.results?.length) return null
    const moviesWithBackdrop = popular.results.filter(m => m.backdrop_path)
    if (!moviesWithBackdrop.length) return null
    const index = Math.floor(heroSeed * moviesWithBackdrop.length)
    return moviesWithBackdrop[index].backdrop_path
  }, [popular, heroSeed])

  const handleSearch = () => {
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <>
      <section
        className={style.hero}
        style={
          heroBackdrop
            ? {
                '--hero-backdrop': `url(https://image.tmdb.org/t/p/original${heroBackdrop})`,
              }
            : undefined
        }
      >
        {popularLoading ? (
          <HeroSkeleton />
        ) : (
          <div className={style.content}>
            <h1 className={style.title}>Welcome</h1>
            <h2 className={style.subtitle}>Browse highlighted titles from TMDB</h2>

            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder="Search Movies"
              buttonText="Search"
            />
          </div>
        )}
      </section>

      <div className={style.page}>
        <MovieSection
          title="Popular Movies"
          movies={popular?.results}
          linkTo="/category/popular"
          isLoading={popularLoading}
        />
        <MovieSection
          title="Top Rated Movies"
          movies={topRated?.results}
          linkTo="/category/top_rated"
          isLoading={topRatedLoading}
        />
        <MovieSection
          title="Upcoming Movies"
          movies={upcoming?.results}
          linkTo="/category/upcoming"
          isLoading={upcomingLoading}
        />
        <MovieSection
          title="Now Playing Movies"
          movies={nowPlaying?.results}
          linkTo="/category/now_playing"
          isLoading={nowPlayingLoading}
        />
      </div>
    </>
  )
}
