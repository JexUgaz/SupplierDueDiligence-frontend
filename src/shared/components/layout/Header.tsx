import {
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import logo from "@/assets/images/logo_icon.webp";
import { useAuth } from "@/shared/hooks/useAuth";

const Header = () => {
  const { logout, user } = useAuth();
  return (
    <header className="bg-white shadow-md py-4 px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logo}
              alt="Nexora Consulting"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-nexora-darkest tracking-tight truncate">
                Nexora Consulting
              </h1>
              <p className="text-xs text-nexora-dark hidden sm:block">
                Due Diligence and Proactive Risk Management
              </p>
            </div>
          </div>

          <button
            className="sm:hidden text-nexora-darkest hover:text-nexora-dark transition cursor-pointer"
            aria-label="Log out"
            onClick={logout}
          >
            <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-sm text-nexora-dark">
          <div className="flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6 text-nexora-accent" />
            <div className="flex flex-col items-center truncate leading-tight">
              <span className="font-medium">{user?.username}</span>
              <span className="text-xs text-gray-500 truncate">
                {user?.email}
              </span>
            </div>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-1 bg-nexora-darkest text-nexora-light rounded hover:bg-nexora-dark transition text-sm cursor-pointer"
            onClick={logout}
          >
            <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
            <span className="hidden md:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export { Header };
