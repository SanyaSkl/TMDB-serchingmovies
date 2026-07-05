import {MovieDetailsPage} from "../../pages/MovieDetailsPage/MovieDetailsPage.tsx";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../../pages/MainPage/MainPage.tsx";
import {FavoritesPage} from "../../pages/FavoritesPage/FavoritesPage.tsx";
import {Layout} from "../Layout/Layout.tsx";
import {NotFoundPage} from "../../pages/NotFoundPage/NotFoundPage.tsx";
import {FilteredPage} from "../../pages/FilteredPage/FilteredPage.tsx";
import {SearchPage} from "../../pages/SearchPage/SearchPage.tsx";
import {CategoryPage} from "../../pages/CategoryPage/CategoryPage.tsx";
import {Path} from "../../constants.ts";


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>

                <Route index element={<MainPage/>}/>

                <Route path={Path.Category} element={<CategoryPage/>}/>
                <Route path={Path.Filtered} element={<FilteredPage/>}/>
                <Route path={Path.Search} element={<SearchPage/>}/>
                <Route path={Path.Favorites} element={<FavoritesPage/>}/>
                <Route path={Path.MovieDetailsPage} element={<MovieDetailsPage/>}/>

                <Route path={Path.NotFoundPage} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    )
}
