import "./IncenseCard.css";
import type { Incense } from "../types/incense";
import { Link } from "react-router";

type IncenseCardProps = {
  incense: Incense;
  isFavorite: boolean;
  onFavoriteToggle: ()=>void;
};

export function IncenseCard(props: IncenseCardProps) {
  return (
    <article className="incense-card">
      {props.incense.photo ? (
        <img
          className="incense-card__image"
          src={props.incense.photo}
          alt={`Благовония ${props.incense.brand} ${props.incense.name}`}
        />
      ) : (
        <div className="incense-card__placeholder">Нет фото</div>
      )}

      <div className="incense-card__info">
        <button
          type="button"
          className="incense-card__favourite"
          aria-pressed={props.isFavorite}
          aria-label="Добавить в избранное"
          onClick={props.onFavoriteToggle}
        >
          <svg
            className="incense-card__favourite-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path 
              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2px"
            />
          </svg>
        </button>
        <h2 className="incense-card__title">{props.incense.name}</h2>
        <p className="incense-card__brand">{props.incense.brand}</p>
        <p className="incense-card__series">{props.incense.series}</p>

        <Link to={`/incense/${props.incense.id}`}>Подробнее</Link>
      </div>
    </article>
  );
}
