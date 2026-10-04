import {NavLink} from 'react-router-dom'
import {Path} from '../../constants'
import style from './Header.module.css'
import {selectThemeMode, toggleTheme} from '../../store/themeSlice.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {useAppDispatch} from '../../hooks/useAppDispatch.ts'
import logo from './../../assets/logo.svg'

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()

    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <NavLink to={Path.Main} className={style.logoLink}>
                    <img src={logo} alt="TMDB Logo" className={style.logo}/>
                </NavLink>
                <nav className={style.nav}>
                    <NavLink to="/" className={({isActive}) =>
                        `${style.link} ${isActive ? style.linkActive : ''}`
                    }
                    >
                        Main
                    </NavLink>
                    <span className={style.separator}>|</span>

                    <NavLink
                        to="/category/popular" className={({isActive}) =>
                        `${style.link} ${isActive ? style.linkActive : ''}`
                    }
                    >
                        Category movies
                    </NavLink>
                    <span className={style.separator}>|</span>

                    <NavLink
                        to={Path.Filtered} className={({isActive}) =>
                        `${style.link} ${isActive ? style.linkActive : ''}`
                    }
                    >
                        Filtered movies
                    </NavLink>
                    <span className={style.separator}>|</span>

                    <NavLink
                        to={Path.Search} className={({isActive}) =>
                        `${style.link} ${isActive ? style.linkActive : ''}`
                    }
                    >
                        Search
                    </NavLink>
                    <span className={style.separator}>|</span>

                    <NavLink
                        to={Path.Favorites} className={({isActive}) =>
                        `${style.link} ${isActive ? style.linkActive : ''}`
                    }
                    >
                        Favorites
                    </NavLink>
                </nav>
                <button
                    className={style.themeButton}
                    onClick={handleToggleTheme}
                    aria-label="Toggle theme"
                >
                    {themeMode === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    )
}
