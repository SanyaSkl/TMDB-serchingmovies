import {NavLink} from "react-router-dom";
import {Path} from "../../constants.ts";



export const Header = () => {
    return (
        <div>
            <NavLink to="/">
                <img src='' alt="Logo"/>
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