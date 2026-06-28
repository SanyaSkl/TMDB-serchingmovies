import {useGetPopularMovieQuery} from "../api/tmdbApi.ts";


export const MainPage = () => {

    const {data, isLoading, error} = useGetPopularMovieQuery(1)

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }


    return (
        <div>Main Page {data?.results?.length}</div>
    )
}