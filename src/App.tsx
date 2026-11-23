import "./App.css";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import CatalogPage from "./pages/CatalogPage";
import IncensePage from "./pages/IncensePage";
import MyCollectionPage from "./pages/MyCollectionPage";
import FavouritePage from "./pages/FavouritePage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useState } from "react";


function App() {

const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

function handleFavouriteToggle (id: string) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(item =>item!==id))
    } else setFavoriteIds([...favoriteIds, id])
  }
  return (
    <>
      <div className="background">
        <Header />

        <Routes>
          <Route path="/" element={<CatalogPage favoriteIds={favoriteIds} onFavoriteToggle={handleFavouriteToggle} />}></Route>
          <Route path="/incense/:id" element={<IncensePage />}></Route>
          <Route path="/my-collection" element={<MyCollectionPage />}></Route>
          <Route path="/favourite" element={<FavouritePage favoriteIds={favoriteIds} onFavoriteToggle={handleFavouriteToggle} />}></Route>
          <Route path="/friends" element={<FriendsPage />}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
