import {NavLink} from "react-router-dom";
import {Path} from "../../constants";



export const Header = () => {
    return (
        <div>
            <NavLink to="/">
                <img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg' alt="Logo"/>
            </NavLink>
            <header>
                <nav>
                    <NavLink to={Path.Category}>Category </NavLink>
                    <NavLink to={Path.Filtered}>Filtered </NavLink>
                    <NavLink to={Path.Search}>Search </NavLink>
                    <NavLink to={Path.Favorites}>Favorites</NavLink>
                </nav>
            </header>
            <span>Тема🚦</span>
        </div>
    )
}