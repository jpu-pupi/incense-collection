import { useState } from "react";
import { type Incense } from "../types/incense";

export function useCatalogFilters(incenses: Incense[]) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const countriesSet = new Set<string>();
  incenses.forEach((item) => {
    countriesSet.add(item.country);
  });
  const countries = [...countriesSet];

  function handleCountryChange(country: string, checked: boolean) {
    const nextCountries = checked
      ? [...selectedCountries, country]
      : selectedCountries.filter((item) => item !== country);
    const availableIncenses = incenses.filter((item) => {
      if (nextCountries.length === 0) {
        return true;
      }
      return nextCountries.includes(item.country);
    });
    const availableBrands = availableIncenses.map((item) => item.brand);
    setSelectedCountries(nextCountries);
    setSelectedBrands(
      selectedBrands.filter((item) => availableBrands.includes(item)),
    );
  }

  function handleBrandChange(brand: string, checked: boolean) {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    }
  }

  const filteredIncenses = incenses.filter((item) => {
    if (selectedCountries.length === 0) {
      return true;
    }
    return selectedCountries.includes(item.country);
  });

  const brandsSet = new Set<string>();

  filteredIncenses.forEach((item) => {
    brandsSet.add(item.brand);
  });
  const brands = [...brandsSet];

  const brandFilteredIncenses = filteredIncenses.filter((item) => {
    if (selectedBrands.length === 0) {
      return true;
    }
    return selectedBrands.includes(item.brand);
  });

  function clearFilters() {
    setSelectedCountries([]);
    setSelectedBrands([]);
  }

  return {
    countries,
    brands,
    selectedCountries,
    selectedBrands,
    handleCountryChange,
    handleBrandChange,
    brandFilteredIncenses,
    clearFilters,
  };
}
