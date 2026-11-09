import "./IncenseCard.css";
import type { Incense } from "../types/incense";
import { Link } from "react-router";

type IncenseCardProps = {
  incense: Incense;
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
        <h2 className="incense-card__title">{props.incense.name}</h2>
        <p className="incense-card__brand">{props.incense.brand}</p>
        <p className="incense-card__series">{props.incense.series}</p>
        
        <Link to={`/incense/${props.incense.id}`}>Подробнее</Link>
      </div>
    </article>
  );
}
