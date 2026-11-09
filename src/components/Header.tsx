import "./Header.css";
import { Link, NavLink } from "react-router";
import { ProfileIcon } from "./ui/ProfileIcon";

type NavLinkState = {
  isActive: boolean;
};

function getNavLinkClassName(state: NavLinkState) {
  return state.isActive ? "header__link header__link_active" : "header__link";
}

export function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to={"/"} className={getNavLinkClassName}>
          Каталог
        </NavLink>
        <NavLink to={"/my-collection"} className={getNavLinkClassName}>
          Моя коллекция
        </NavLink>
        <NavLink to={"/favourite"} className={getNavLinkClassName}>
          Избранное
        </NavLink>
        <NavLink to={"/friends"} className={getNavLinkClassName}>
          Друзья
        </NavLink>
      </nav>
      <Link to={"/profile"}>
        <ProfileIcon className="header__profile_icon"></ProfileIcon>
      </Link>
    </header>
  );
}
