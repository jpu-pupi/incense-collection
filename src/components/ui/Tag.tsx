import "./Tag.css";
type TagProps = {
  label: string;
  onRemove?: () => void;
};
export function Tag(props: TagProps) {
  return (
    <div className="tag">
      {props.label}
      {props.onRemove && (
        <button
          className="tag__remove"
          type="button"
          aria-label={`Удалить: ${props.label}`}
          onClick={props.onRemove}
        >
          <svg
            className="tag__icon-clear"
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
      )}
    </div>
  );
}
