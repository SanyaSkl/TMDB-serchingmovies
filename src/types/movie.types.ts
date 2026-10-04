/** Описок фильмов: главная страница, страница поиска, категории, избранное. */
export type Movie = {
  backdrop_path: unknown
  id: number
  title: string
  /** Путь к постеру */
  poster_path: string | null
  /** Средний рейтинг */
  vote_average: number
  /** Дата выхода */
  release_date: string
  /** Описание сюжета */
  overview: string
}

/** Ответ со списком фильмов */
export type MovieResponse = {
  /** Текущая страница */
  page: number
  /** Массив фильмов */
  results: Movie[]
  /** Общее количество страниц */
  total_pages: number
  /** Общее количество фильмов */
  total_results: number
}

/** Расширенные типы для деталей фильма */
export type MovieDetails = Movie & {
  /** Путь к фоновому изображению */
  backdrop_path: string | null
  /** Длительность в минутах */
  runtime: number
  /** Статус */
  status: string
  /** Слоган фильма */
  tagline: string
  /** Бюджет в долларах */
  budget: number
  /** Сборы в долларах */
  revenue: number
  /** Массив жанров */
  genres: Genre[]
  /** Компании-производители */
  production_companies: ProductionCompany[]
  /** Страны производства */
  production_countries: ProductionCountry[]
  /** Языки озвучки */
  spoken_languages: SpokenLanguage[]
  /** Количество голосов */
  vote_count: number
}

/** Жанр */
export type Genre = {
  id: number
  name: string
}

/** Производственная компания */
export type ProductionCompany = {
  id: number
  /** Путь к логотипу компании */
  logo_path: string | null
  /** Название компании */
  name: string
  /**  Страна происхождения код */
  origin_country: string
}

/** Страна производства */
export type ProductionCountry = {
  /**  Код страны */
  iso_3166_1: string
  /**  Название страны */
  name: string
}

/** Язык озвучки */
export type SpokenLanguage = {
  /** Код языка */
  iso_639_1: string
  /** Название языка */
  name: string
}

/** Актёры */
export type Actor = {
  id: number
  /** Имя актёра */
  name: string
  /** Имя персонажа */
  character: string
  /** Путь к фото актера */
  profile_path: string | null
  /** Порядок в списке */
  order: number
}

/** Съемочная группа */
export type Crew = {
  id: number
  name: string
  /** Должность */
  job: string
  /** Отдел */
  department: string
}

/** Ответ с актерами и съемочной группой */
export type CreditsResponse = {
  id: number
  cast: Actor[]
  crew: Crew[]
}
