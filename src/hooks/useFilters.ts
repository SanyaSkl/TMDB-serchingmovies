import {useMemo, useState} from 'react';

type Filters = {
    genres: number[];
    sortBy: string;
    minRating: number;
    maxRating: number;
    minYear: string;
    maxYear: string;
};

const getCurrentYear = () => String(new Date().getFullYear());

const initialFilters: Filters = {
    genres: [],
    sortBy: 'popularity.desc',
    minRating: 0,
    maxRating: 10,
    minYear: '1900',
    maxYear: getCurrentYear(),
};

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    /** Обновление одного поля */
    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prev) => ({...prev, [key]: value}));
    };

    /** Сброс всех фильтров */
    const resetFilters = () => {
        setFilters(initialFilters);
    };

    /** Преобразование фильтров в параметры для API */
    const queryParams = useMemo(() => ({
        page: 1, // или передавать извне
        sort_by: filters.sortBy,
        with_genres: filters.genres.length > 0 ? filters.genres.join(',') : undefined,
        'vote_average.gte': filters.minRating > 0 ? filters.minRating : undefined,
        'vote_average.lte': filters.maxRating < 10 ? filters.maxRating : undefined,
        'release_date.gte': filters.minYear ? `${filters.minYear}-01-01` : undefined,
        'release_date.lte': filters.maxYear ? `${filters.maxYear}-12-31` : undefined,
    }), [filters]);

    return {filters, updateFilter, resetFilters, queryParams};
};