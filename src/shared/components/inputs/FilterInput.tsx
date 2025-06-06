import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";

interface FilterInputProps {
  id?: string;
  placeholder?: string;
  type?: "text" | "number";
  value?: string | number;
  step?: number;
  min?: number;
  max?: number;
  label: string;
  onChange: (value: string) => void;
  className?: string;
  debounceDelay?: number;
}

const FilterInput = ({
  id,
  placeholder,
  label,
  type = "text",
  value,
  step,
  min,
  max,
  onChange,
  className = "",
  debounceDelay = 0,
}: FilterInputProps) => {
  const [inputValue, setInputValue] = useState(value ?? "");

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    if (debouncedValue !== (value ?? "")) {
      onChange(String(debouncedValue));
    }
  }, [debouncedValue, onChange, value]);

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
        type={type}
        value={inputValue}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        onChange={(e) => setInputValue(e.target.value)}
        className={`p-2.5 text-[13px] md:text-sm rounded-lg shadow-sm
        bg-nexora-white text-nexora-text 
        border border-nexora-gray-light
        focus:ring-nexora-accent focus:border-nexora-accent 
        outline-none ${className}`}
      />
    </div>
  );
};

export default FilterInput;
