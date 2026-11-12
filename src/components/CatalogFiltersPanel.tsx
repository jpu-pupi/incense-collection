import "./CatalogFiltersPanel.css";
import { CheckboxField } from "./ui/CheckboxField";

type CatalogFiltersPanelProps = {
  countries: string[];
  brands: string[];
  series: string[];
  onCountryChange: (country: string, checked: boolean) => void;
  onBrandChange: (brand: string, checked: boolean) => void;
  onSeriesChange: (series: string, checked: boolean) => void;
  selectedCountries: string[];
  selectedBrands: string[];
  selectedSeries: string[];
  onClear: () => void;
};
export function CatalogFiltersPanel(props: CatalogFiltersPanelProps) {
  return (
    <div className="catalog-filters__panel">
      <div className="catalog-filters__header">
        Фильтры ({props.selectedCountries.length + props.selectedBrands.length})
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
                checked={props.selectedSeries.includes(item)}
                onChange={(checked) => {
                  props.onSeriesChange(item, checked);
                }}
              />
            );
          })}
        </fieldset>
      </div>
    </div>
  );
}
