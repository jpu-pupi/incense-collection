import "./SelectField.css";

type SelectOption = {
    value: string,
    label: string,
}

type SelectFieldProps  = {
    id: string,
    name: string,
    label: string,
    options: SelectOption[],
}

export function SelectField(props:SelectFieldProps) {
  return (
    <div className="select-field">
      <svg
      className="select-field__icon"
      aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        
      >
        <path
          d="M19 9L12 15L5 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <select
        className="select-field__select"
        name={props.name}
        id={props.id}
        aria-label={props.label}
      >
        {props.options.map((option)=>{
            return<option value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}
