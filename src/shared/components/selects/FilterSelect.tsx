interface FilterSelectProps {
  value?: number | string;
  placeholder?: string;
  id?: string;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  className?: string;
  label: string;
  onChange: (value: string) => void;
}

const FilterSelect = ({
  id,
  value,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
  className = "",
  onChange,
}: FilterSelectProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-xs md:text-sm font-semibold text-nexora-text mb-2 select-none"
      >
        {label}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`p-2.5 text-[13px] md:text-sm rounded-lg shadow-sm
        bg-nexora-white text-nexora-text 
        border border-nexora-gray-light
        focus:ring-nexora-accent focus:border-nexora-accent 
        outline-none ${
          disabled ? "cursor-default" : "cursor-pointer"
        } ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
