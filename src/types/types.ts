export type Movie = {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    overview: string
}

export type MovieResponse = {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}


