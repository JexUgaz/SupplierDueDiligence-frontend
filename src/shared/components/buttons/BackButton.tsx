import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";

interface BackButtonProps {
  fallbackTo?: string;
}

export const BackButton = ({ fallbackTo = "/app" }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const handleClick = () => navigate(from ?? fallbackTo);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "cursor-pointer py-1 px-1 md:px-2 rounded-md hover:bg-nexora-light focus:outline-none"
      }
    >
      <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};
