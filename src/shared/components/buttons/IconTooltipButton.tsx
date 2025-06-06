import type { ReactNode } from "react";

interface IconTooltipButtonProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const IconTooltipButton = ({
  label,
  icon,
  onClick,
  className = "",
}: IconTooltipButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group relative cursor-pointer ${className}`}
    >
      {icon}
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </button>
  );
};
