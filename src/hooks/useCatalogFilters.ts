import { useState } from "react";
import { type Incense } from "../types/incense";

export function useCatalogFilters(incenses: Incense[]) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

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
  };

  function handleBrandChange(brand: string, checked: boolean) {
    const nextBrands = checked?[...selectedBrands, brand]: selectedBrands.filter((item)=>item !== brand);
     const availableIncenses = filteredIncenses.filter((item)=> {
      if (nextBrands.length===0) {
        return true
      }
      return nextBrands.includes(item.brand);
     });

     const availableSeries =availableIncenses.map((item)=>item.series);
     setSelectedBrands(nextBrands);
     setSelectedSeries(selectedSeries.filter((item)=> availableSeries.includes(item))
     );
  };

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

  const seriesFilteredIncenses = brandFilteredIncenses.filter((item)=>{
    if (selectedSeries.length === 0) {
      return true;
    } else if (!item.series) {
      return false
    } return selectedSeries.includes(item.series);
  })

  const seriesSet = new Set<string>();
  
  brandFilteredIncenses.forEach((item) => {
    if (item.series) {
      seriesSet.add(item.series);
    }
  });

  const series = [...seriesSet];

  function handleSeriesChange (series:string, checked: boolean) {
    const nextSeries = checked?[...selectedSeries, series]
      : selectedSeries.filter((item) => item !== series)

      setSelectedSeries(nextSeries);
  }



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
    brandFilteredIncenses,
    seriesFilteredIncenses,
    clearFilters,
  };
}
