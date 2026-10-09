import {Navigate, NavLink, useParams} from 'react-router-dom'
import {useState} from 'react'
import {useGetCategoryMoviesQuery} from '@/api/tmdbApi.ts'
import {Pagination} from '../../components/ui/Pagination/Pagination.tsx'
import style from './CategoryPage.module.css'
import {CATEGORIES} from '@/constants/categories.ts'
import {MovieGridSkeleton} from "@/components/skeletons";
import {MovieCard} from "@/components/movie/MovieCard/MovieCard.tsx";
import {ErrorMessage} from "@/components/ui/ErrorMessage/ErrorMessage.tsx";


export const CategoryPage = () => {
    const {category} = useParams<{ category: string }>()
    const [page, setPage] = useState(1)
    const currentCategory = category || 'popular'

    const {data, isLoading, error} = useGetCategoryMoviesQuery({
        category: currentCategory,
        page,
    })

    const isValidCategory = CATEGORIES.some(c => c.id === currentCategory)
    if (!isValidCategory && category) {
        return <Navigate to="/category/popular" replace/>
    }

    if (error) return <ErrorMessage error={error} title="Category error:"/>

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <>
            <div className={style.buttonBlock}>
                {CATEGORIES.map(category => (
                    <NavLink
                        key={category.id}
                        to={`/category/${category.id}`}
                        className={({isActive}) => (isActive ? style.active : '')}
                    >
                        {category.label}
                    </NavLink>
                ))}
            </div>

            {error && <ErrorMessage error={error} title="Category error:"/>}

            {isLoading && <MovieGridSkeleton count={12}/>}

            {!isLoading && !error && data && data.results.length > 0 && (
                <>
                    <div className={style.categoryPage}>
                        {data.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalPages={data?.total_pages || 1}
                        totalResults={data?.total_results}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </>
    )
}
