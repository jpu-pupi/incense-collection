import "./CatalogPage.css"

import { CatalogFilters } from "../components/CatalogFilters";
import { SearchField } from "../components/ui/SearchField";
import { IncenseCard } from "../components/IncenseCard";
import { incenses } from "../data/incenses";

import { useState } from "react";

export default function CatalogPage() {
  const [isOpen, setIsOpen]= useState(false);
  return (
    <main className="catalog">
      <section className="catalog__intro">
        <h1 className="catalog__title">Каталог <br/> благовоний</h1>
        <p className="catalog__subtitle">
          Единая библиотека - добавляй новые <br/> экземпляры в свою коллекцию.
        </p>
      </section>
      <section className="catalog__filters">
      <CatalogFilters
      isOpen={isOpen}
      onClick={()=>setIsOpen(prev=>!prev)}/>
      <SearchField/>
      </section>
      <section className="catalog__list">
      {incenses.map((item) => {
        return <IncenseCard incense={item} key={item.id}></IncenseCard>;
      })}
      </section>
    </main>
  );
}
