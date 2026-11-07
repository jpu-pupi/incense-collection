import"./Header.css"

export function Header () {
    return (
       <header className="header">
        <nav className="header__nav">
            <a className="header__link header__link_active">Каталог</a>
            <a className="header__link">Моя коллекция</a>
            <a className="header__link">Избранное</a>
            <a className="header__link">Друзья</a>
        </nav>
       </header> 
    )
}