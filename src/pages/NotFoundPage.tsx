import './NotFoundPage.css'
import { Link } from "react-router";
import notFoundImage from "../assets/error_404.svg"

export function NotFoundPage() {
  return (
    <main className='not-found-page'>
      <img className='not-found-page__image' src={notFoundImage} alt=""/>
      <h1 className='not-found-page__title'>Страница не найдена</h1>
      <p className='not-found-page__subtitle'>
        Упс, такой страницы не существует. Вернитесь на главную страницу.
      </p>
      <Link className='not-found-page__link' to={"/"}>На главную</Link>
    </main>
  );
}
