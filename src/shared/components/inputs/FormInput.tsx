import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  placeholder?: string;
  step?: number;
  type?: "text" | "email" | "number";
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormInput = ({
  label,
  placeholder,
  type = "text",
  register,
  step,
  error,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-[13px] md:text-sm font-medium text-nexora-text">
        {label}
        {register?.required && <span className="text-nexora-error"> *</span>}
      </label>

      <input
        type={type}
        step={step}
        placeholder={placeholder}
        {...register}
        className={`block w-full p-2.5 text-[13px] md:text-sm rounded-lg shadow-sm
          bg-nexora-light text-nexora-text 
          border ${error ? "border-nexora-error" : "border-nexora-gray-light"} 
          focus:ring-2 focus:ring-nexora-accent focus:border-nexora-accent 
          outline-none`}
      />

      {error && (
        <p className="mt-1 text-[13px] md:text-sm text-nexora-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
