import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "cancel" | "danger";
  loading?: boolean;
}

const Loading = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
);

const FormButton = ({
  loading = false,
  variant = "default",
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-default flex items-center justify-center gap-2 text-[13px] md:text-sm";

  const isCancel = variant === "cancel";
  const isDanger = variant === "danger";
  const prefixAccentVariant = isDanger ? "nexora-error" : "nexora-accent";
  const prefixDarkestVariant = isDanger ? "nexora-error" : "nexora-darkest";

  const variantClasses = isCancel
    ? "border border-nexora-error text-nexora-error hover:bg-nexora-error-light focus:ring-nexora-error-light"
    : `bg-${prefixAccentVariant} hover:bg-${prefixDarkestVariant} focus:ring-${prefixDarkestVariant} text-white`;

  const type = props.type ?? (variant === "default" ? "submit" : "button");
  const isDisabled = loading || props.disabled;
  const opacityClass = isDisabled ? "opacity-50" : "";

  return (
    <button
      {...props}
      type={type}
      className={`${baseClasses} ${variantClasses} ${opacityClass} ${
        props.className ?? ""
      }`}
      disabled={isDisabled}
    >
      {loading && <Loading />}
      {children}
    </button>
  );
};

export default FormButton;
