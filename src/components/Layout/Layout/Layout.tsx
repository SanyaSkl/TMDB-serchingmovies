import {Outlet} from 'react-router-dom';
import {Footer} from '../Footer/Footer';
import {LoadingBar} from '../../ui/LoadingBar/LoadingBar';
import style from './Layout.module.css';
import {Header} from "../Header/Header.tsx";

export const Layout = () => {
    return (
        <div className={style.layout}>
            <Header/>
            <LoadingBar/>
            <main className={style.main}>
                <div className={style.pageContainer}>
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    );
};