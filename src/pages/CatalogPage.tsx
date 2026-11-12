import "./CatalogPage.css";

import { CatalogFiltersPanel } from "../components/CatalogFiltersPanel";
import { SearchField } from "../components/ui/SearchField";
import { IncenseCard } from "../components/IncenseCard";
import { incenses } from "../data/incenses";
import { Tag } from "../components/ui/Tag";
import { useState } from "react";
import { useCatalogFilters } from "../hooks/useCatalogFilters";

export default function CatalogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    countries,
    brands,
    series,
    selectedCountries,
    selectedBrands,
    selectedSeries,
    handleCountryChange,
    handleBrandChange,
    handleSeriesChange,
    seriesFilteredIncenses,
    clearFilters,
  } = useCatalogFilters(incenses);

  function normalizedSearchText(text: string) {
    return text.trim().toLowerCase();
  }
  const normalizedQuery = normalizedSearchText(searchQuery);

  const searchResult = seriesFilteredIncenses.filter((item) => {
    if (!normalizedQuery) {
      return true;
    }
    return (
      normalizedSearchText(item.name).includes(normalizedQuery) ||
      normalizedSearchText(item.country).includes(normalizedQuery) ||
      normalizedSearchText(item.brand).includes(normalizedQuery) ||
      (item.series&&normalizedSearchText(item.series).includes(normalizedQuery)) ||
      item.aromas.some((aroma) =>
        normalizedSearchText(aroma).includes(normalizedQuery),
      )
    );
  });

  const countryTags = selectedCountries.map((item) => {
    return {
      key: "country-" + item,
      label: item,
      onRemove: () => handleCountryChange(item, false),
    };
  });

  const brandsTags = selectedBrands.map((item) => {
    return {
      key: "brand-" + item,
      label: item,
      onRemove: () => handleBrandChange(item, false),
    };
  });

  const seriesTags = selectedSeries.map((item) => {
    return {
      key: "series-" + item,
      label: item,
      onRemove: () => handleSeriesChange(item, false),
    };
  });

  const tags = [...countryTags, ...brandsTags, ...seriesTags];

  return (
    <main className="catalog">
      <section className="catalog__intro">
        <h1 className="catalog__title">
          Каталог <br /> благовоний
        </h1>
        <p className="catalog__subtitle">
          Единая библиотека - добавляй новые <br /> экземпляры в свою коллекцию.
        </p>
      </section>
      <section className="catalog__filters">
        <button
          className="catalog__filters-toggle"
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className="catalog__filters-icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 5.81445V6.50427C22 7.54211 22 8.06103 21.7404 8.49121C21.4808 8.92139 21.0065 9.18837 20.058 9.72234L17.145 11.3622C16.5085 11.7204 16.1903 11.8996 15.9625 12.0974C15.488 12.5093 15.1959 12.9933 15.0636 13.587C15 13.872 15 14.2056 15 14.8727V17.5422C15 19.4517 15 20.4064 14.3321 20.8242C13.6641 21.242 12.7248 20.8748 10.8462 20.1404C9.95128 19.7905 9.50385 19.6156 9.25192 19.2611C9 18.9065 9 18.4518 9 17.5422L9 14.8727C9 14.2056 9 13.872 8.93644 13.587C8.80408 12.9933 8.51199 12.5093 8.03751 12.0974C7.80967 11.8996 7.49146 11.7204 6.85504 11.3622L3.94202 9.72234C2.99347 9.18837 2.5192 8.92139 2.2596 8.49121C2 8.06103 2 7.54211 2 6.50427V5.81445"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              opacity="0.5"
              d="M22 5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Фильтры
        </button>
        <SearchField
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={() => {
            setSearchQuery(searchInput);
          }}
        />
      </section>
      {isOpen && (
        <CatalogFiltersPanel
          countries={countries}
          brands={brands}
          series={series}
          selectedCountries={selectedCountries}
          selectedBrands={selectedBrands}
          selectedSeries={selectedSeries}
          onCountryChange={handleCountryChange}
          onBrandChange={handleBrandChange}
          onSeriesChange={handleSeriesChange}
          onClear={clearFilters}
        />
      )}
      <div className="catalog__selected-filters">
        {tags.map((item) => {
          return (
            <Tag label={item.label} key={item.key} onRemove={item.onRemove} />
          );
        })}
      </div>
      <section className="catalog__list">
        {searchResult.length ? (
          searchResult.map((item) => {
            return <IncenseCard incense={item} key={item.id}></IncenseCard>;
          })
        ) : (
          <p className="catalog__list-error">
            Ничего не найдено. Попробуй изменить запрос или фильтры.
          </p>
        )}
      </section>
    </main>
  );
}
