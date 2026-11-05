import type { Incense } from "../types/incense"

type IncenseCardProps  = {
    incense: Incense
}

export function IncenseCard(props:IncenseCardProps) {
    return (
        
        <article>
            <img src={props.incense.photo} alt={`Благовония ${props.incense.brand} ${props.incense.name}`}/>
            <h2>{props.incense.name}</h2>
            <p>{props.incense.brand}</p>
            <p>{props.incense.series}</p>
          </article>
    )
}