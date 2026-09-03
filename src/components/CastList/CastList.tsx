import style from "./CastList.module.css";
import type {Actor} from "../../types/movie.types.ts";

type Props = {
    cast: Actor[];
};

export const CastList = ({cast}: Props) => {
    // Показываем первых 6 актеров
    const displayedCast = cast.slice(0, 6);

    // Если актеров нет, ничего не рендерим
    if (!displayedCast.length) {
        return null;
    }

    return (
        <div className={style.castSection}>
            <h2>Актеры</h2>
            <div className={style.castList}>
                {displayedCast.map((actor) => (
                    <div key={actor.id} className={style.castItem}>
                        <img
                            src={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                    : "/placeholder-avatar.png"
                            }
                            alt={actor.name}
                        />
                        <div className={style.name}>{actor.name}</div>
                        <div className={style.character}>{actor.character}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};