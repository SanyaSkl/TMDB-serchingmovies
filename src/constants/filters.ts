export const GENRES = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'},
] as const;

export const SORT_OPTIONS = [
    {id: 'popularity.desc', label: 'Popularity (High to Low)'},
    {id: 'popularity.asc', label: 'Popularity (Low to High)'},
    {id: 'vote_average.desc', label: 'Rating (High to Low)'},
    {id: 'vote_average.asc', label: 'Rating (Low to High)'},
    {id: 'release_date.desc', label: 'Release Date (Newest)'},
    {id: 'release_date.asc', label: 'Release Date (Oldest)'},
    {id: 'revenue.desc', label: 'Revenue (High to Low)'},
] as const;

export type GenreId = typeof GENRES[number]['id'];
export type SortOptionId = typeof SORT_OPTIONS[number]['id'];