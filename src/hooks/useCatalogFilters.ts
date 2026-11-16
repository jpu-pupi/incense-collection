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
  const [selectedForms, setSelectedForms] = useState<Incense["form"][]>([]);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);

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
  const forms = getUniqueValues(incenses.map((item)=>item.form));
  const aromas = getUniqueValues(incenses.flatMap((item)=>item.aromas));

  function matchesFilters(
    incense: Incense,
    ignoredGroup?: "country" | "brand" | "series"| "baseType"|"incenseType"|"form"|"aromas",
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
    const matchesForm = 
      ignoredGroup === "form" ||
      selectedForms.length === 0 ||
      selectedForms.includes(incense.form);
    const matchesAromas = 
      ignoredGroup === "aromas" ||
      selectedAromas.length === 0 ||
      incense.aromas.some((aroma)=>selectedAromas.includes(aroma));
    return matchesCountry && matchesBrand && matchesSeries&&matchesBaseType&&matchesIncenseType&&matchesForm&&matchesAromas;
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

  const incensesForForms = incenses.filter((item)=>matchesFilters(item, "form"));

  const availableForms =getUniqueValues(incensesForForms.map((item)=>item.form));

  const incensesForAromas = incenses.filter((item)=>matchesFilters(item, "aromas"));

  const availableAromas =getUniqueValues(incensesForAromas.flatMap((item)=>item.aromas));

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

  function handleFormChange(form: Incense["form"], checked:boolean) {
    const nextForms= checked
      ? [...selectedForms, form]
      : selectedForms.filter((item)=>item !== form);
    setSelectedForms(nextForms);
  }

  function handleAromaChange(aroma: string, checked:boolean) {
    const nextAromas= checked
      ? [...selectedAromas, aroma]
      : selectedAromas.filter((item)=>item !== aroma);
    setSelectedAromas(nextAromas);
  }

  const filteredIncenses = incenses.filter((item) => matchesFilters(item));

  function clearFilters() {
    setSelectedCountries([]);
    setSelectedBrands([]);
    setSelectedSeries([]);
    setSelectedBaseTypes([]);
    setSelectedIncenseTypes([]);
    setSelectedForms([]);
    setSelectedAromas([]);
  }

  return {
    countries,
    brands,
    series,
    baseTypes,
    incenseTypes,
    forms,
    aromas,
    selectedCountries,
    selectedBrands,
    selectedSeries,
    selectedBaseTypes,
    selectedIncenseTypes,
    selectedForms,
    selectedAromas,
    handleCountryChange,
    handleBrandChange,
    handleSeriesChange,
    handleBaseTypeChange,
    handleIncenseTypeChange,
    handleFormChange,
    handleAromaChange,
    filteredIncenses,
    clearFilters,
    availableCountries,
    availableBrands,
    availableSeries,
    availableBaseTypes,
    availableIncenseTypes,
    availableForms,
    availableAromas,
  };
}
