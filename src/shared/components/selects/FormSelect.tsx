import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  disabled?: boolean;
  label: string;
  placeholder?: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormSelect = ({
  disabled = false,
  label,
  placeholder = "Select an option",
  options,
  register,
  error,
}: FormSelectProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-[13px] md:text-sm font-medium text-nexora-text">
        {label}
        {register?.required && <span className="text-nexora-error"> *</span>}
      </label>

      <select
        {...register}
        className={`block w-full p-2.5 text-[13px] md:text-sm rounded-lg shadow-sm
          bg-nexora-light text-nexora-text 
          border ${
            error ? "border-nexora-error" : "border-nexora-gray-light"
          } ${disabled ? `cursor-default` : `cursor-pointer`}
          focus:ring-2 focus:ring-nexora-accent focus:border-nexora-accent 
          outline-none`}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-[13px] md:text-sm text-nexora-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
