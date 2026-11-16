import "./CatalogFiltersPanel.css";
import { CheckboxField } from "./ui/CheckboxField";
import type { Incense } from "../types/incense";
import { baseTypeLabels, formsLabels, incenseTypeLabels } from "../constants/incenseLables";

type CatalogFiltersPanelProps = {
  countries: string[],
  brands: string[],
  series: string[],
  baseTypes: Incense["baseType"][],
  incenseTypes: Incense["incenseType"][],
  forms: Incense["form"][],
  onCountryChange: (country: string, checked: boolean) => void,
  onBrandChange: (brand: string, checked: boolean) => void,
  onSeriesChange: (series: string, checked: boolean) => void,
  onBaseTypeChange:(baseType: Incense["baseType"], checked: boolean) => void,
  onIncenseTypeChange:(baseType: Incense["incenseType"], checked: boolean) => void,
  onFormChange:(form: Incense["form"], checked: boolean) => void,
  selectedCountries: string[],
  selectedBrands: string[],
  selectedSeries: string[],
  selectedBaseTypes: Incense["baseType"][],
  selectedIncenseTypes: Incense["incenseType"][],
  selectedForms: Incense["form"][],
  onClear: () => void;

  availableCountries: string[],
  availableBrands: string[],
  availableSeries: string[],
  availableBaseTypes: Incense["baseType"][],
  availableIncenseTypes: Incense["incenseType"][],
  availableForms: Incense["form"][],
};

export function CatalogFiltersPanel(props: CatalogFiltersPanelProps) {
  return (
    <div className="catalog-filters__panel">
      <div className="catalog-filters__header">
        Фильтры ({props.selectedCountries.length + props.selectedBrands.length + props.selectedSeries.length + props.selectedBaseTypes.length + props.selectedIncenseTypes.length+props.selectedForms.length})
        <button
          type="button"
          className="catalog-filters__clear"
          onClick={props.onClear}
        >
          Сбросить все
          <svg
            className="catalog-filters__icon-clear"
            aria-hidden="true"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M0.999965 9.48532L5.24261 5.24268M5.24261 5.24268L9.48525 1.00004M5.24261 5.24268L9.48525 9.48532M5.24261 5.24268L0.999965 1.00004"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="catalog-filters__fieldset-container">
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Страна</legend>
          {props.countries.map((item) => {
            return (
              <CheckboxField
                label={item}
                value={item}
                key={item}
                disabled={(!props.availableCountries.includes(item))&&(!props.selectedCountries.includes(item))}
                checked={props.selectedCountries.includes(item)}
                onChange={(checked) => {
                  props.onCountryChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Бренд</legend>
          {props.brands.map((item) => {
            return (
              <CheckboxField
                label={item}
                value={item}
                key={item}
                disabled={(!props.availableBrands.includes(item))&&(!props.selectedBrands.includes(item))}
                checked={props.selectedBrands.includes(item)}
                onChange={(checked) => {
                  props.onBrandChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Серия</legend>
          {props.series.map((item) => {
            return (
              <CheckboxField
                label={item}
                value={item}
                key={item}
                disabled={(!props.availableSeries.includes(item))&&(!props.selectedSeries.includes(item))}
                checked={props.selectedSeries.includes(item)}
                onChange={(checked) => {
                  props.onSeriesChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Основа</legend>
          {props.baseTypes.map((item) => {
            return (
              <CheckboxField
                label={baseTypeLabels[item]}
                value={item}
                key={item}
                disabled={(!props.availableBaseTypes.includes(item))&&(!props.selectedBaseTypes.includes(item))}
                checked={props.selectedBaseTypes.includes(item)}
                onChange={(checked) => {
                  props.onBaseTypeChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Тип</legend>
          {props.incenseTypes.map((item) => {
            return (
              <CheckboxField
                label={incenseTypeLabels[item]}
                value={item}
                key={item}
                disabled={(!props.availableIncenseTypes.includes(item))&&(!props.selectedIncenseTypes.includes(item))}
                checked={props.selectedIncenseTypes.includes(item)}
                onChange={(checked) => {
                  props.onIncenseTypeChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
        <fieldset className="catalog-filters__fieldset">
          <legend className="catalog-filters__legend">Форма</legend>
          {props.forms.map((item) => {
            return (
              <CheckboxField
                label={formsLabels[item]}
                value={item}
                key={item}
                disabled={(!props.availableForms.includes(item))&&(!props.selectedForms.includes(item))}
                checked={props.selectedForms.includes(item)}
                onChange={(checked) => {
                  props.onFormChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
      </div>
    </div>
  );
}
