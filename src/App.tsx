import "./App.css";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import CatalogPage from "./pages/CatalogPage";
import IncensePage from "./pages/IncensePage";
import MyCollectionPage from "./pages/MyCollectionPage";
import FavouritePage from "./pages/FavouritePage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <div className="background">
        <Header />

        <Routes>
          <Route path="/" element={<CatalogPage />}></Route>
          <Route path="/incense/:id" element={<IncensePage />}></Route>
          <Route path="/my-collection" element={<MyCollectionPage />}></Route>
          <Route path="/favourite" element={<FavouritePage />}></Route>
          <Route path="/friends" element={<FriendsPage />}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
