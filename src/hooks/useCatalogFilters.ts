import { useState } from "react";
import { type Incense } from "../types/incense";

function getUniqueValues(values: string[]): string[] {
  const uniqueValues = new Set<string>(values);
  return [...uniqueValues];
}

export function useCatalogFilters(incenses: Incense[]) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

  const countries = getUniqueValues(incenses.map((item) => item.country));
  const brands = getUniqueValues(incenses.map((item) => item.brand));
  const series = getUniqueValues(
    incenses
      .map((item) => item.series)
      .filter((item): item is string => {
        return typeof item === "string" && item.length > 0;
      }),
  );

  function handleCountryChange(country: string, checked: boolean) {
    const nextCountries = checked
      ? [...selectedCountries, country]
      : selectedCountries.filter((item) => item !== country);
    setSelectedCountries(nextCountries);
  }

  function handleBrandChange(brand: string, checked: boolean) {
    const nextBrands = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((item) => item !== brand);
    setSelectedBrands(nextBrands);
  }

  function handleSeriesChange(series: string, checked: boolean) {
    const nextSeries = checked
      ? [...selectedSeries, series]
      : selectedSeries.filter((item) => item !== series);

    setSelectedSeries(nextSeries);
  }

  function matchesFilters(
    incense: Incense,
    ignoredGroup?: "country" | "brand" | "series",
  ): boolean {
    const matchesCountry =
      ignoredGroup === "country" ||
      selectedCountries.length === 0 ||
      selectedCountries.includes(incense.country);
    const matchesBrand =
      ignoredGroup === "brand" ||
      selectedBrands.length === 0 ||
      selectedBrands.includes(incense.brand);
    const matchesSeries =
      ignoredGroup === "series" ||
      selectedSeries.length === 0 ||
      (incense.series !== undefined && selectedSeries.includes(incense.series));

    return matchesCountry && matchesBrand && matchesSeries;
  }

  const incensesForCountries = incenses.filter((item) =>
    matchesFilters(item, "country"),
  );
  const availableCountries = getUniqueValues(
    incensesForCountries.map((item) => item.country),
  );

  const incensesForBrands = incenses.filter((item) =>
    matchesFilters(item, "brand"),
  );
  const availableBrands = getUniqueValues(
    incensesForBrands.map((item) => item.brand),
  );

  const incensesForSeries = incenses.filter((item) =>
    matchesFilters(item, "series"),
  );
  const availableSeries = getUniqueValues(
    incensesForSeries
      .map((item) => item.series)
      .filter((item): item is string => {
        return typeof item === "string" && item.length > 0;
      }),
  );

  const filteredIncenses = incenses.filter((item) => matchesFilters(item));

  function clearFilters() {
    setSelectedCountries([]);
    setSelectedBrands([]);
    setSelectedSeries([]);
  }

  return {
    countries,
    brands,
    series,
    selectedCountries,
    selectedBrands,
    selectedSeries,
    handleCountryChange,
    handleBrandChange,
    handleSeriesChange,
    filteredIncenses,
    clearFilters,
    availableCountries,
    availableBrands,
    availableSeries,
  };
}
