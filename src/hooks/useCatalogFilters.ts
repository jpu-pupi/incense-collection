import { useState } from "react";
import { type Incense } from "../types/incense";

function getUniqueValues <T extends string> (values: T[]): T[] {
  const uniqueValues = new Set<T>(values);
  return [...uniqueValues];
}

export function useCatalogFilters(incenses: Incense[]) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedBaseTypes, setSelectedBaseTypes] = useState<Incense["baseType"][]>([]);
  const [selectedIncenseTypes, setSelectedIncenseTypes] = useState<Incense["incenseType"][]>([]);

  const countries = getUniqueValues(incenses.map((item) => item.country));
  const brands = getUniqueValues(incenses.map((item) => item.brand));
  const series = getUniqueValues(
    incenses
      .map((item) => item.series)
      .filter((item): item is string => {
        return typeof item === "string" && item.length > 0;
      }),
  );
  const baseTypes = getUniqueValues(incenses.map((item)=>item.baseType));
  const incenseTypes = getUniqueValues(incenses.map((item)=>item.incenseType));

  function matchesFilters(
    incense: Incense,
    ignoredGroup?: "country" | "brand" | "series"| "baseType"|"incenseType",
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
    const matchesBaseType =
      ignoredGroup === "baseType" ||
      selectedBaseTypes.length === 0 ||
      selectedBaseTypes.includes(incense.baseType);
    const matchesIncenseType = 
      ignoredGroup === "incenseType" ||
      selectedIncenseTypes.length === 0 ||
      selectedIncenseTypes.includes(incense.incenseType);
    return matchesCountry && matchesBrand && matchesSeries&&matchesBaseType&&matchesIncenseType;
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

  const incensesForBaseTypes = incenses.filter((item)=>matchesFilters(item, "baseType"));

  const availableBaseTypes = getUniqueValues(incensesForBaseTypes.map((item)=>item.baseType));

  const incensesForIncenseTypes = incenses.filter((item)=>matchesFilters(item, "incenseType"));

  const availableIncenseTypes =getUniqueValues(incensesForIncenseTypes.map((item)=>item.incenseType));

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

  function handleBaseTypeChange(baseType: Incense["baseType"], checked:boolean) {
    const nextBaseTypes= checked
      ? [...selectedBaseTypes, baseType]
      : selectedBaseTypes.filter((item)=>item !== baseType);
    setSelectedBaseTypes(nextBaseTypes);
  }

  function handleIncenseTypeChange(incenseType: Incense["incenseType"], checked:boolean) {
    const nextIncenseTypes= checked
      ? [...selectedIncenseTypes, incenseType]
      : selectedIncenseTypes.filter((item)=>item !== incenseType);
    setSelectedIncenseTypes(nextIncenseTypes);
  }

  const filteredIncenses = incenses.filter((item) => matchesFilters(item));

  function clearFilters() {
    setSelectedCountries([]);
    setSelectedBrands([]);
    setSelectedSeries([]);
    setSelectedBaseTypes([]);
    setSelectedIncenseTypes([]);
  }

  return {
    countries,
    brands,
    series,
    baseTypes,
    incenseTypes,
    selectedCountries,
    selectedBrands,
    selectedSeries,
    selectedBaseTypes,
    selectedIncenseTypes,
    handleCountryChange,
    handleBrandChange,
    handleSeriesChange,
    handleBaseTypeChange,
    handleIncenseTypeChange,
    filteredIncenses,
    clearFilters,
    availableCountries,
    availableBrands,
    availableSeries,
    availableBaseTypes,
    availableIncenseTypes,
  };
}
