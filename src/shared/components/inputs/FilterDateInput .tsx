interface FilterDateInputProps {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterDateInput = ({
  id,
  label,
  value,
  onChange,
  className = "",
}: FilterDateInputProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-xs md:text-sm font-semibold text-nexora-text mb-2 select-none"
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => e.currentTarget.showPicker?.()}
        className={`p-2.5 text-[13px] md:text-sm rounded-lg shadow-sm
          bg-nexora-white text-nexora-text 
          border border-nexora-gray-light
          focus:ring-nexora-accent focus:border-nexora-accent 
          outline-none cursor-pointer ${className}`}
      />
    </div>
  );
};

export default FilterDateInput;
