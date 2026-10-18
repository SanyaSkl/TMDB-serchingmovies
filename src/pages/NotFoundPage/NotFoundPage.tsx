import { useNavigate } from 'react-router-dom'
import style from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={style.page}>
      <div className={style.content}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="404 — Page not found"
          className={style.image}
        />

        <h1 className={style.title}>404</h1>
        <p className={style.subtitle}>Oops! The page you're looking for doesn't exist.</p>

        <div className={style.actions}>
          <button type="button" className={style.backButton} onClick={handleGoBack}>
            ← Go back
          </button>

          <button type="button" className={style.homeButton} onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}
