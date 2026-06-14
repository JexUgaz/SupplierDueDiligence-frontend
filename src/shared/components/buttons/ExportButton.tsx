import { cn } from "@/shared/helpers/utils";
import type { LucideIcon } from "lucide-react";

interface ExportButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
}

export const ExportButton = ({
  label,
  icon: Icon,
  onClick,
  disabled,
}: ExportButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-nexora-gray-light cursor-pointer",
        "bg-white px-4 py-2 text-sm font-medium text-nexora-darkest",
        "hover:bg-nexora-light transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:text-white hover:bg-nexora-accent",
      )}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};
