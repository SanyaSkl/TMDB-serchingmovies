import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../Footer/Footer.tsx";


export const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}