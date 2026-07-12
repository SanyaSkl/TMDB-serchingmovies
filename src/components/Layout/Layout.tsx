import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../Footer/Footer.tsx";
import style from "./Layout.module.css"

export const Layout = () => {
    return (
        <div>
            <Header/>

            <main className={style.pageContainer}>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}