import {NavLink} from "react-router-dom";
import {Path} from "../../constants";
import style from "./Header.module.css";
import {selectThemeMode, toggleTheme} from "../../store/themeSlice.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import logo from "./../../assets/logo.svg"

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode);
    const dispatch = useAppDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className={style.header}>
            <div className={style.menu}>
                <div className={style.logo}>
                    <NavLink to={Path.Main}>
                        <img src={logo} alt="TMDB Logo"/>
                    </NavLink>
                </div>
                <nav className={style.nav}>
                    <NavLink to="/category/popular">Category</NavLink>
                    <NavLink to={Path.Filtered}>Filtered</NavLink>
                    <NavLink to={Path.Search}>Search</NavLink>
                    <NavLink to={Path.Favorites}>Favorites</NavLink>
                </nav>
            </div>
            <button
                className={style.themeToggle}
                onClick={handleToggleTheme}
                aria-label="Toggle theme"
            >
                {themeMode === "light" ? "🌙" : "☀️"}
            </button>
        </header>
    );
};