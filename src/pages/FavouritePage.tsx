import { IncenseCard } from "../components/IncenseCard"
import { incenses } from "../data/incenses"
type FavouritePageProp = {
  favoriteIds: string[];
  onFavoriteToggle: (id:string) => void;
}
export default function FavouritePage (props: FavouritePageProp) {
    const favouriteIncenses = incenses.filter(item=>props.favoriteIds.includes(item.id));

    return(
        <main>{
            (favouriteIncenses.length !== 0) ? 
            favouriteIncenses.map(item =>(
                <IncenseCard
                            incense={item}
                            key={item.id}
                            isFavorite={props.favoriteIds.includes(item.id)}
                            onFavoriteToggle={()=>props.onFavoriteToggle(item.id)}
                          ></IncenseCard> )
            )
        : <p>Нет добавленных карточек</p>}
             
            
            
        </main>
    )
}