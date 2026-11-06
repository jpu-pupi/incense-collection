import "./CatalogPage.css"

import { SearchField } from "../components/SearchField";
import { CatalogFilters } from "../components/CatalogFilters";
import { IncenseCard } from "../components/IncenseCard";
import { incenses } from "../data/incenses";

export default function CatalogPage() {
  return (
    <main className="catalog">
      <section className="catalog__intro">
        <h1 className="catalog__title">Каталог <br/> благовоний</h1>
        <p className="catalog__subtitle">
          Единая библиотека - добавляй новые <br/> экземпляры в свою коллекцию.
        </p>
      </section>
      <SearchField/>
      <CatalogFilters count={incenses.length}/>
      <section className="catalog__list">
      {incenses.map((item) => {
        return <IncenseCard incense={item} key={item.id}></IncenseCard>;
      })}
      </section>
    </main>
  );
}
