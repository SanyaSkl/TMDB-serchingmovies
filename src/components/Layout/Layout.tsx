import { Header } from '../Header/Header.tsx'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer.tsx'
import style from './Layout.module.css'

export const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />

      <main className={style.main}>
        <div className={style.pageContainer}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
