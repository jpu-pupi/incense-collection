import { Link } from "react-router";
import notFoundImage from "../assets/error_404.svg"

export function NotFoundPage() {
  return (
    <main>
      <img src={notFoundImage} alt="Страница не найдена"/>
      <h1>Страница не найдена</h1>
      <p>
        Упс, такой страницы не существует. Вернитесь на главную страницу.
      </p>
      <Link to={"/"}>На главную</Link>
    </main>
  );
}
