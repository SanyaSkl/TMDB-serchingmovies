import style from './CastList.module.css'
import type {Actor} from "../../../validations";


type Props = {
  cast: Actor[]
}

export const CastList = ({ cast }: Props) => {
  const displayedCast = cast.slice(0, 6)

  if (!displayedCast.length) {
    return null
  }

  return (
    <div className={style.castSection}>
      <h2>Actors</h2>
      <div className={style.castList}>
        {displayedCast.map(actor => (
          <div key={actor.id} className={style.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : '/placeholder-avatar.png'
              }
              alt={actor.name}
            />
            <div className={style.name}>{actor.name}</div>
            <div className={style.character}>{actor.character}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
