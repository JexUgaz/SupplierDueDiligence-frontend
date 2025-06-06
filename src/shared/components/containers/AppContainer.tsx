import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { AuthDispatcher } from "@/shared/helpers/AuthDispatcher";

export const AppContainer = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();

  useEffect(() => {
    AuthDispatcher.setLogoutCallback(logout);
  }, [logout]);

  return <>{children}</>;
};
