import "./CatalogPage.css"

import { IncenseCard } from "../components/IncenseCard";
import { incenses } from "../data/incenses";

export default function CatalogPage() {
  return (
    <main className="catalog__list">
      <section className="catalog__intro">
        <h1 className="catalog__title">Каталог <br/> благовоний</h1>
        <p className="catalog__subtitle">
          Единая библиотека - добавляй новые <br/> экземпляры в свою коллекцию.
        </p>
      </section>
      {incenses.map((item) => {
        return <IncenseCard incense={item} key={item.id}></IncenseCard>;
      })}
    </main>
  );
}
